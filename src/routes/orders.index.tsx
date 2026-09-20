import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { formatDue } from "@/lib/format";
import { ORDER_STATUS_LABEL, UNIT_LABEL } from "@/lib/inventory/labels";
import { useInventory } from "@/lib/inventory/store";
import type { OrderLine } from "@/lib/inventory/types";

export const Route = createFileRoute("/orders/")({ component: OrdersPage });

const STATUS_VARIANT = {
  draft: "default",
  cutting: "warn",
  sewing: "primary",
  done: "ok",
  cancelled: "danger",
} as const;

function OrdersPage() {
  const orders = useInventory((s) => s.orders);
  const items = useInventory((s) => s.items);
  const addOrder = useInventory((s) => s.addOrder);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([{ itemId: items[0]?.id ?? "", quantity: 1 }]);

  const sorted = useMemo(() => {
    const rank = { cutting: 0, sewing: 1, draft: 2, done: 3, cancelled: 4 };
    return [...orders].sort((a, b) => rank[a.status] - rank[b.status]);
  }, [orders]);

  function resetForm() {
    setTitle("");
    setCustomer("");
    setDueDate("");
    setNotes("");
    setLines([{ itemId: items[0]?.id ?? "", quantity: 1 }]);
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">سفارش دوخت</h1>
          <p className="mt-1 text-sm text-muted">مواد هر کار را از انبار کم کنید</p>
        </div>
        <Button size="icon" className="shrink-0" onClick={() => setOpen(true)} aria-label="سفارش جدید">
          <Plus className="size-5" />
        </Button>
      </header>

      {sorted.length === 0 ? (
        <p className="rounded-xl bg-surface-2 px-4 py-10 text-center text-sm text-muted">
          هنوز سفارشی ثبت نشده.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sorted.map((order) => (
            <li key={order.id}>
              <Link
                to="/orders/$orderId"
                params={{ orderId: order.id }}
                className="flex items-start justify-between gap-3 rounded-xl bg-surface p-4 shadow-card"
              >
                <div className="min-w-0">
                  <p className="font-medium">{order.title}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {order.customer || "بدون مشتری"} · موعد {formatDue(order.dueDate)}
                  </p>
                  <p className="mt-1 text-xs text-subtle">
                    {order.lines.length} قلم مواد
                    {order.consumed ? " · مصرف ثبت شده" : ""}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANT[order.status]}>
                  {ORDER_STATUS_LABEL[order.status]}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Drawer
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) resetForm();
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>سفارش جدید</DrawerTitle>
            <DrawerDescription>نام کار و مواد مورد نیاز را وارد کنید.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!title.trim()) return;
                const order = addOrder({
                  title,
                  customer,
                  dueDate,
                  notes,
                  lines: lines.filter((l) => l.itemId && l.quantity > 0),
                });
                toast.success(`${order.title} ثبت شد`);
                setOpen(false);
                resetForm();
              }}
            >
              <Field label="عنوان کار">
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مانتو اداری سرمه‌ای × ۸"
                />
              </Field>
              <Field label="مشتری">
                <Input
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="فروشگاه یا نام مشتری"
                />
              </Field>
              <Field label="موعد">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Field>

              <div className="space-y-2">
                <p className="text-sm font-medium">مواد مصرفی</p>
                {lines.map((line, index) => {
                  const it = items.find((i) => i.id === line.itemId);
                  return (
                    <div key={index} className="grid grid-cols-[1fr_5.5rem] gap-2">
                      <NativeSelect
                        value={line.itemId}
                        onChange={(e) => {
                          const next = [...lines];
                          next[index] = { ...next[index], itemId: e.target.value };
                          setLines(next);
                        }}
                      >
                        {items.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                      </NativeSelect>
                      <Input
                        type="number"
                        min={0.1}
                        step="any"
                        value={line.quantity}
                        onChange={(e) => {
                          const next = [...lines];
                          next[index] = {
                            ...next[index],
                            quantity: Number(e.target.value),
                          };
                          setLines(next);
                        }}
                        aria-label="مقدار"
                      />
                      {it ? (
                        <p className="col-span-2 text-[11px] text-subtle">
                          واحد: {UNIT_LABEL[it.unit]} · موجود {it.quantity}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setLines((ls) => [...ls, { itemId: items[0]?.id ?? "", quantity: 1 }])
                  }
                >
                  <Plus className="size-4" />
                  قلم دیگر
                </Button>
              </div>

              <Field label="یادداشت">
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </Field>

              <div className="mt-1 flex gap-2">
                <Button type="submit" className="flex-1">
                  ثبت سفارش
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  انصراف
                </Button>
              </div>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
