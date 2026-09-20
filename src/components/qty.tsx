import { formatFa } from "@/lib/format";
import { UNIT_LABEL } from "@/lib/inventory/labels";
import type { Unit } from "@/lib/inventory/types";

export function QtyText({
  qty,
  unit,
  className,
}: {
  qty: number;
  unit: Unit;
  className?: string;
}) {
  const digits = qty % 1 === 0 ? 0 : 1;
  return (
    <span className={className}>
      <span className="tabular-nums">{formatFa(qty, digits)}</span>{" "}
      {UNIT_LABEL[unit]}
    </span>
  );
}
