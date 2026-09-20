export const CATEGORIES = [
  "fabric",
  "thread",
  "zipper",
  "button",
  "interfacing",
  "trim",
  "tool",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const UNITS = ["meter", "piece", "spool", "kg", "pack", "roll"] as const;
export type Unit = (typeof UNITS)[number];

export const MOVEMENT_TYPES = ["in", "out", "adjust"] as const;
export type MovementType = (typeof MOVEMENT_TYPES)[number];

export const ORDER_STATUSES = [
  "draft",
  "cutting",
  "sewing",
  "done",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type Item = {
  id: string;
  name: string;
  sku: string;
  category: Category;
  unit: Unit;
  quantity: number;
  minQuantity: number;
  color: string;
  widthCm?: number;
  composition?: string;
  location: string;
  supplier: string;
  unitPrice: number;
  notes: string;
  createdAt: number;
  updatedAt: number;
};

export type Movement = {
  id: string;
  itemId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  orderId?: string;
  createdAt: number;
};

export type OrderLine = {
  itemId: string;
  quantity: number;
};

export type WorkOrder = {
  id: string;
  title: string;
  customer: string;
  status: OrderStatus;
  dueDate?: string;
  lines: OrderLine[];
  notes: string;
  consumed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type ItemDraft = {
  name: string;
  category: Category;
  unit: Unit;
  quantity: number;
  minQuantity: number;
  color: string;
  widthCm: string;
  composition: string;
  location: string;
  supplier: string;
  unitPrice: string;
  notes: string;
};
