import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Package,
  Scissors,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { QtyText } from "@/components/qty";
import { formatDateTime, formatFa, formatToman } from "@/lib/format";
import { CATEGORY_LABEL, MOVEMENT_LABEL, ORDER_STATUS_LABEL } from "@/lib/inventory/labels";
import {
  fabricMeters,
  lowStockItems,
  stockValue,
  useInventory,
} from "@/lib/inventory/store";
import { colorSwatch } from "@/lib/inventory/colors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const items = useInventory((s) => s.items);
  const movements = useInventory((s) => s.movements);
  const orders = useInventory((s) => s.orders);
  const low = lowStockItems(items);
  const openOrders = orders.filter((o) => o.status !== "done" && o.status !== "cancelled");
  const meters = fabricMeters(items);
  const value = stockValue(items);

  return (
    <div className="flex flex-col gap-5">
      <header className="space-y-1">
        <p className="text-sm text-muted">نمای کلی انبار</p>
        <h1 className="text-2xl font-semibold tracking-tight">کارگاه امروز</h1>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          label="اقلام فعال"
          value={formatFa(items.length)}
          icon={Package}
        />
        <Stat
          label="کمبود"
          value={formatFa(low.length)}
          icon={AlertTriangle}
          warn={low.length > 0}
        />
        <Stat
          label="متر پارچه"
          value={formatFa(Math.round(meters))}
          icon={Scissors}
        />
        <Stat
          label="سفارش باز"
          value={formatFa(openOrders.length)}
          icon={ArrowUpFromLine}
        />
      </section>

      <Card className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div>
          <p className="text-sm text-muted">ارزش تقریبی موجودی</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{formatToman(value)}</p>
        </div>
        <p className="text-xs leading-relaxed text-subtle sm:max-w-44 sm:text-left">
          بر اساس آخرین قیمت واحد هر کالا
        </p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/move"
          search={{ type: "in" }}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-fg"
        >
          <ArrowDownToLine className="size-4" />
          ورود کالا
        </Link>
        <Link
          to="/move"
          search={{ type: "out" }}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-surface px-4 text-sm font-medium text-fg shadow-card"
        >
          <ArrowUpFromLine className="size-4" />
          خروج / مصرف
        </Link>
      </div>

      <section className="space-y-3">
        <SectionHead
          title="هشدار کمبود"
          href="/stock"
          action={low.length ? `${formatFa(low.length)} کالا` : "همه کافی"}
        />
        {low.length === 0 ? (
          <EmptyLine text="همه اقلام بالای حداقل موجودی هستند." />
        ) : (
          <ul className="flex flex-col gap-2">
            {low.slice(0, 5).map((item) => (
              <li key={item.id}>
                <Link
                  to="/stock/$itemId"
                  params={{ itemId: item.id }}
                  className="flex items-center gap-3 rounded-xl bg-surface p-3 shadow-card"
                >
                  <Swatch name={item.color} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-xs text-muted">
                      {CATEGORY_LABEL[item.category]} · {item.location || "بدون قفسه"}
                    </p>
                  </div>
                  <div className="text-left">
                    <QtyText
                      qty={item.quantity}
                      unit={item.unit}
                      className="text-sm font-medium text-danger"
                    />
                    <p className="text-xs text-subtle">
                      حداقل <QtyText qty={item.minQuantity} unit={item.unit} />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <SectionHead title="سفارش‌های باز" href="/orders" action="همه" />
        {openOrders.length === 0 ? (
          <EmptyLine text="سفارش بازی ثبت نشده." />
        ) : (
          <ul className="flex flex-col gap-2">
            {openOrders.slice(0, 4).map((order) => (
              <li key={order.id}>
                <Link
                  to="/orders/$orderId"
                  params={{ orderId: order.id }}
                  className="flex items-center justify-between gap-3 rounded-xl bg-surface p-3 shadow-card"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{order.title}</p>
                    <p className="text-xs text-muted">{order.customer}</p>
                  </div>
                  <Badge
                    variant={
                      order.status === "sewing"
                        ? "primary"
                        : order.status === "cutting"
                          ? "warn"
                          : "default"
                    }
                  >
                    {ORDER_STATUS_LABEL[order.status]}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <SectionHead title="آخرین گردش" href="/move" action="ثبت جدید" />
        {movements.length === 0 ? (
          <EmptyLine text="گردش کالایی ثبت نشده." />
        ) : (
          <ul className="flex flex-col">
            {movements.slice(0, 6).map((m) => {
              const item = items.find((i) => i.id === m.itemId);
              if (!item) return null;
              const inbound = m.type !== "out";
              return (
                <li
                  key={m.id}
                  className="flex items-center gap-3 border-b border-border py-3 last:border-0"
                >
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg",
                      inbound ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger",
                    )}
                  >
                    {inbound ? (
                      <ArrowDownToLine className="size-4" />
                    ) : (
                      <ArrowUpFromLine className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted">
                      {MOVEMENT_LABEL[m.type]} · {m.reason} · {formatDateTime(m.createdAt)}
                    </p>
                  </div>
                  <QtyText
                    qty={m.quantity}
                    unit={item.unit}
                    className={cn(
                      "text-sm font-medium tabular-nums",
                      inbound ? "text-ok" : "text-danger",
                    )}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  warn,
}: {
  label: string;
  value: string;
  icon: typeof Package;
  warn?: boolean;
}) {
  return (
    <Card className="p-3">
      <Icon className={cn("size-4", warn ? "text-danger" : "text-muted")} />
      <p className="mt-3 text-2xl font-semibold tabular-nums leading-none">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </Card>
  );
}

function SectionHead({
  title,
  href,
  action,
}: {
  title: string;
  href: "/stock" | "/orders" | "/move";
  action: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="text-base font-semibold">{title}</h2>
      <Link to={href} className="text-sm text-primary">
        {action}
      </Link>
    </div>
  );
}

function EmptyLine({ text }: { text: string }) {
  return (
    <p className="rounded-xl bg-surface-2 px-4 py-6 text-center text-sm text-muted">
      {text}
    </p>
  );
}

function Swatch({ name }: { name: string }) {
  return (
    <span
      className="size-10 shrink-0 rounded-lg border border-border"
      style={{ background: colorSwatch(name) }}
      title={name}
    />
  );
}
