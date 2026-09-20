import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { QtyText } from "@/components/qty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NativeSelect } from "@/components/ui/native-select";
import { formatDue, formatFa } from "@/lib/format";
import { CATEGORY_LABEL, ORDER_STATUS_LABEL } from "@/lib/inventory/labels";
import { useInventory, type Shortage } from "@/lib/inventory/store";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/inventory/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/$orderId")({
  component: OrderDetailPage,
});

const STATUS_VARIANT = {
  draft: "default",
  cutting: "warn",
  sewing: "primary",
  done: "ok",
  cancelled: "danger",
} as const;

function OrderDetailPage() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const order = useInventory((s) => s.orders.find((o) => o.id === orderId));
  const items = useInventory((s) => s.items);
  const updateOrderStatus = useInventory((s) => s.updateOrderStatus);
  const consumeOrder = useInventory((s) => s.consumeOrder);
  const deleteOrder = useInventory((s) => s.deleteOrder);
  const [confirm, setConfirm] = useState(false);
  const [shortages, setShortages] = useState<Shortage[] | null>(null);

  if (!order) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">این سفارش پیدا نشد.</p>
        <Link to="/orders" className="mt-3 inline-block text-sm text-primary">
          بازگشت به سفارش‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted">{order.customer || "بدون مشتری"}</p>
          <h1 className="text-xl font-semibold leading-snug">{order.title}</h1>
        </div>
        <Badge variant={STATUS_VARIANT[order.status]}>
          {ORDER_STATUS_LABEL[order.status]}
        </Badge>
      </div>

      <Card className="flex flex-col gap-3 p-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-muted">وضعیت کار</span>
          <NativeSelect
            value={order.status}
            onChange={(e) => {
              const status = e.target.value as OrderStatus;
              updateOrderStatus(order.id, status);
              toast.success("وضعیت به‌روز شد");
            }}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {ORDER_STATUS_LABEL[s]}
              </option>
            ))}
          </NativeSelect>
        </label>
        <p className="text-sm text-muted">موعد {formatDue(order.dueDate)}</p>
        {order.consumed ? (
          <p className="text-sm text-ok">مواد این سفارش از انبار کم شده است.</p>
        ) : (
          <p className="text-sm text-warn">مصرف مواد هنوز ثبت نشده.</p>
        )}
      </Card>

      {order.notes ? (
        <p className="rounded-xl bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted">
          {order.notes}
        </p>
      ) : null}

      <section className="space-y-2">
        <h2 className="text-base font-semibold">لیست مواد</h2>
        <ul className="flex flex-col gap-2">
          {order.lines.map((line) => {
            const item = items.find((i) => i.id === line.itemId);
            if (!item) {
              return (
                <li
                  key={line.itemId}
                  className="rounded-xl bg-surface p-3 text-sm text-muted shadow-card"
                >
                  کالای حذف‌شده
                </li>
              );
            }
            const short = item.quantity < line.quantity && !order.consumed;
            return (
              <li key={line.itemId}>
                <Link
                  to="/stock/$itemId"
                  params={{ itemId: item.id }}
                  className="flex items-center justify-between gap-3 rounded-xl bg-surface p-3 shadow-card"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-xs text-muted">
                      {CATEGORY_LABEL[item.category]}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                  </div>
                  <div className="text-left text-sm">
                    <QtyText
                      qty={line.quantity}
                      unit={item.unit}
                      className={cn("font-semibold", short && "text-danger")}
                    />
                    <p className="text-xs text-subtle">
                      موجود <QtyText qty={item.quantity} unit={item.unit} />
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {!order.consumed && order.status !== "cancelled" ? (
        <Button
          className="h-12"
          onClick={() => {
            const result = consumeOrder(order.id);
            if (!result.ok) {
              setShortages(result.shortages);
              toast.error(result.error);
              return;
            }
            toast.success("مصرف مواد از انبار ثبت شد");
          }}
        >
          ثبت مصرف مواد از انبار
        </Button>
      ) : null}

      <Button variant="outline" className="text-danger" onClick={() => setConfirm(true)}>
        حذف سفارش
      </Button>

      <Dialog open={!!shortages} onOpenChange={(v) => !v && setShortages(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>موجودی کافی نیست</DialogTitle>
            <DialogDescription>
              این اقلام برای این سفارش کم دارند. اول ورود کالا بزنید یا مقدار را کم کنید.
            </DialogDescription>
          </DialogHeader>
          <ul className="mt-3 space-y-2 text-sm">
            {(shortages ?? []).map((s) => (
              <li key={s.item.id} className="flex justify-between gap-3">
                <span>{s.item.name}</span>
                <span className="tabular-nums text-danger">
                  نیاز {formatFa(s.need, s.need % 1 ? 1 : 0)} / موجود{" "}
                  {formatFa(s.have, s.have % 1 ? 1 : 0)}
                </span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 w-full" onClick={() => setShortages(null)}>
            متوجه شدم
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف سفارش؟</DialogTitle>
            <DialogDescription>
              «{order.title}» پاک می‌شود. موجودی انبار تغییر نمی‌کند.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex gap-2">
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => {
                deleteOrder(order.id);
                toast.success("سفارش حذف شد");
                void navigate({ to: "/orders" });
              }}
            >
              حذف
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setConfirm(false)}>
              انصراف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
