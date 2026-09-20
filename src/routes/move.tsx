import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { QtyText } from "@/components/qty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { formatDateTime } from "@/lib/format";
import { IN_REASONS, MOVEMENT_LABEL, OUT_REASONS } from "@/lib/inventory/labels";
import { useInventory } from "@/lib/inventory/store";
import type { MovementType } from "@/lib/inventory/types";
import { cn } from "@/lib/utils";

type MoveSearch = {
  type: "in" | "out";
  itemId?: string;
};

export const Route = createFileRoute("/move")({
  validateSearch: (s: Record<string, unknown>): MoveSearch => ({
    type: s.type === "out" ? "out" : "in",
    itemId: typeof s.itemId === "string" ? s.itemId : undefined,
  }),
  component: MovePage,
});

function MovePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const items = useInventory((s) => s.items);
  const movements = useInventory((s) => s.movements);
  const recordMovement = useInventory((s) => s.recordMovement);

  const [itemId, setItemId] = useState(search.itemId ?? items[0]?.id ?? "");
  const [qty, setQty] = useState("1");
  const [reason, setReason] = useState(
    search.type === "out" ? OUT_REASONS[0] : IN_REASONS[0],
  );
  const [customReason, setCustomReason] = useState("");

  const type = search.type;
  const reasons = type === "out" ? OUT_REASONS : IN_REASONS;
  const item = items.find((i) => i.id === itemId);
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name, "fa")),
    [items],
  );

  useEffect(() => {
    if (search.itemId) setItemId(search.itemId);
  }, [search.itemId]);

  function setType(next: "in" | "out") {
    setReason(next === "out" ? OUT_REASONS[0] : IN_REASONS[0]);
    setCustomReason("");
    void navigate({
      search: (prev) => ({ ...prev, type: next }),
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">گردش کالا</h1>
        <p className="mt-1 text-sm text-muted">ورود به انبار یا مصرف از قفسه</p>
      </header>

      <div className="grid grid-cols-2 rounded-xl bg-surface-2 p-1">
        <Toggle active={type === "in"} onClick={() => setType("in")}>
          ورود
        </Toggle>
        <Toggle active={type === "out"} onClick={() => setType("out")}>
          خروج
        </Toggle>
      </div>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const quantity = Number(qty);
          const why = reason === "دیگر" ? customReason : reason;
          const result = recordMovement({
            itemId,
            type,
            quantity,
            reason: why,
          });
          if (!result.ok) {
            toast.error(result.error);
            return;
          }
          toast.success(type === "in" ? "ورود ثبت شد" : "خروج ثبت شد");
          setQty("1");
        }}
      >
        <label className="flex flex-col gap-1.5">
          <Label>کالا</Label>
          <NativeSelect
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          >
            {sortedItems.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </NativeSelect>
        </label>

        {item ? (
          <p className="text-sm text-muted">
            موجودی فعلی:{" "}
            <QtyText qty={item.quantity} unit={item.unit} className="font-medium text-fg" />
            {item.location ? ` · ${item.location}` : ""}
          </p>
        ) : null}

        <label className="flex flex-col gap-1.5">
          <Label>مقدار</Label>
          <Input
            type="number"
            inputMode="decimal"
            min={0.1}
            step="any"
            required
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <Label>بابت</Label>
          <NativeSelect
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
            <option value="دیگر">سایر…</option>
          </NativeSelect>
        </label>

        {reason === "دیگر" ? (
          <Input
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="توضیح کوتاه"
            required
          />
        ) : null}

        <Button type="submit" className="mt-1 h-12">
          {type === "in" ? "ثبت ورود" : "ثبت خروج"}
        </Button>
      </form>

      <section className="space-y-2">
        <h2 className="text-base font-semibold">گردش‌های اخیر</h2>
        <ul>
          {movements.slice(0, 12).map((m) => {
            const it = items.find((i) => i.id === m.itemId);
            if (!it) return null;
            const inbound = m.type !== "out";
            return (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{it.name}</p>
                  <p className="text-xs text-muted">
                    {MOVEMENT_LABEL[m.type as MovementType]} · {m.reason} ·{" "}
                    {formatDateTime(m.createdAt)}
                  </p>
                </div>
                <QtyText
                  qty={m.quantity}
                  unit={it.unit}
                  className={cn("text-sm font-medium", inbound ? "text-ok" : "text-danger")}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-lg text-sm font-medium transition-colors duration-150",
        active ? "bg-primary text-primary-fg shadow-sm" : "text-muted",
      )}
    >
      {children}
    </button>
  );
}
