import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSeed } from "./seed";
import { SKU_PREFIX } from "./labels";
import type {
  Category,
  Item,
  ItemDraft,
  Movement,
  MovementType,
  OrderLine,
  OrderStatus,
  WorkOrder,
} from "./types";

const seed = createSeed(1_725_800_000_000);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function nextSku(items: Item[], category: Category) {
  const prefix = `DB-${SKU_PREFIX[category]}-`;
  let max = 0;
  for (const item of items) {
    if (!item.sku.startsWith(prefix)) continue;
    const n = Number(item.sku.slice(prefix.length));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

function parseDraft(draft: ItemDraft, items: Item[], existing?: Item): Item {
  const now = Date.now();
  const width = draft.widthCm.trim() ? Number(draft.widthCm) : undefined;
  const price = draft.unitPrice.trim() ? Number(draft.unitPrice) : 0;
  return {
    id: existing?.id ?? uid("it"),
    name: draft.name.trim(),
    sku: existing?.sku ?? nextSku(items, draft.category),
    category: draft.category,
    unit: draft.unit,
    quantity: Number(draft.quantity) || 0,
    minQuantity: Number(draft.minQuantity) || 0,
    color: draft.color.trim(),
    widthCm: Number.isFinite(width) ? width : undefined,
    composition: draft.composition.trim() || undefined,
    location: draft.location.trim(),
    supplier: draft.supplier.trim(),
    unitPrice: Number.isFinite(price) ? price : 0,
    notes: draft.notes.trim(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export type Shortage = { item: Item; need: number; have: number };

type InventoryState = {
  items: Item[];
  movements: Movement[];
  orders: WorkOrder[];
  addItem: (draft: ItemDraft) => Item;
  updateItem: (id: string, draft: ItemDraft) => void;
  deleteItem: (id: string) => void;
  recordMovement: (input: {
    itemId: string;
    type: MovementType;
    quantity: number;
    reason: string;
    orderId?: string;
  }) => { ok: true } | { ok: false; error: string };
  addOrder: (input: {
    title: string;
    customer: string;
    dueDate?: string;
    notes: string;
    lines: OrderLine[];
  }) => WorkOrder;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  consumeOrder: (id: string) => { ok: true } | { ok: false; error: string; shortages: Shortage[] };
  deleteOrder: (id: string) => void;
};

export const useInventory = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: seed.items,
      movements: seed.movements,
      orders: seed.orders,
      addItem: (draft) => {
        const item = parseDraft(draft, get().items);
        set((s) => ({ items: [item, ...s.items] }));
        return item;
      },

      updateItem: (id, draft) => {
        set((s) => ({
          items: s.items.map((item) =>
            item.id === id ? parseDraft(draft, s.items, item) : item,
          ),
        }));
      },

      deleteItem: (id) => {
        set((s) => ({
          items: s.items.filter((item) => item.id !== id),
          movements: s.movements.filter((m) => m.itemId !== id),
          orders: s.orders.map((order) => ({
            ...order,
            lines: order.lines.filter((line) => line.itemId !== id),
          })),
        }));
      },

      recordMovement: ({ itemId, type, quantity, reason, orderId }) => {
        if (!quantity || quantity <= 0) return { ok: false, error: "مقدار باید بزرگ‌تر از صفر باشد." };
        const item = get().items.find((i) => i.id === itemId);
        if (!item) return { ok: false, error: "کالا پیدا نشد." };
        const delta = type === "out" ? -quantity : quantity;
        const nextQty = roundQty(item.quantity + delta);
        if (nextQty < 0) return { ok: false, error: "موجودی برای این خروج کافی نیست." };
        const now = Date.now();
        const movement: Movement = {
          id: uid("mv"),
          itemId,
          type,
          quantity,
          reason: reason.trim() || (type === "in" ? "ورود کالا" : "خروج کالا"),
          orderId,
          createdAt: now,
        };
        set((s) => ({
          items: s.items.map((i) =>
            i.id === itemId ? { ...i, quantity: nextQty, updatedAt: now } : i,
          ),
          movements: [movement, ...s.movements],
        }));
        return { ok: true };
      },

      addOrder: ({ title, customer, dueDate, notes, lines }) => {
        const now = Date.now();
        const order: WorkOrder = {
          id: uid("wo"),
          title: title.trim(),
          customer: customer.trim(),
          status: "draft",
          dueDate: dueDate || undefined,
          lines: lines.filter((l) => l.quantity > 0),
          notes: notes.trim(),
          consumed: false,
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },

      updateOrderStatus: (id, status) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, status, updatedAt: Date.now() } : o,
          ),
        }));
      },

      consumeOrder: (id) => {
        const order = get().orders.find((o) => o.id === id);
        if (!order) return { ok: false, error: "سفارش پیدا نشد.", shortages: [] };
        if (order.consumed) return { ok: false, error: "مواد این سفارش قبلاً از انبار کم شده.", shortages: [] };
        const items = get().items;
        const shortages: Shortage[] = [];
        for (const line of order.lines) {
          const item = items.find((i) => i.id === line.itemId);
          if (!item) continue;
          if (item.quantity < line.quantity) {
            shortages.push({ item, need: line.quantity, have: item.quantity });
          }
        }
        if (shortages.length) {
          return { ok: false, error: "برای ثبت مصرف، موجودی کافی نیست.", shortages };
        }
        const now = Date.now();
        const newMovements: Movement[] = order.lines.map((line) => ({
          id: uid("mv"),
          itemId: line.itemId,
          type: "out" as const,
          quantity: line.quantity,
          reason: "مصرف سفارش",
          orderId: order.id,
          createdAt: now,
        }));
        set((s) => ({
          items: s.items.map((item) => {
            const line = order.lines.find((l) => l.itemId === item.id);
            if (!line) return item;
            return {
              ...item,
              quantity: roundQty(item.quantity - line.quantity),
              updatedAt: now,
            };
          }),
          movements: [...newMovements, ...s.movements],
          orders: s.orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  consumed: true,
                  status: o.status === "draft" ? "cutting" : o.status,
                  updatedAt: now,
                }
              : o,
          ),
        }));
        return { ok: true };
      },

      deleteOrder: (id) => {
        set((s) => ({ orders: s.orders.filter((o) => o.id !== id) }));
      },
    }),
    {
      name: "dokhtban-inventory",
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        movements: state.movements,
        orders: state.orders,
      }),
    },
  ),
);

export function roundQty(n: number) {
  return Math.round(n * 100) / 100;
}

export function lowStockItems(items: Item[]) {
  return items
    .filter((i) => i.quantity <= i.minQuantity)
    .sort((a, b) => a.quantity / Math.max(a.minQuantity, 1) - b.quantity / Math.max(b.minQuantity, 1));
}

export function fabricMeters(items: Item[]) {
  return items
    .filter((i) => i.category === "fabric")
    .reduce((sum, i) => sum + i.quantity, 0);
}

export function stockValue(items: Item[]) {
  return items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
}

export function itemById(items: Item[], id: string) {
  return items.find((i) => i.id === id);
}
