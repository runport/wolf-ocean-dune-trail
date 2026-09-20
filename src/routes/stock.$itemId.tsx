import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowUpFromLine, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { draftFromItem, ItemForm } from "@/components/item-form";
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
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatDateTime, formatFa, formatToman } from "@/lib/format";
import { colorSwatch } from "@/lib/inventory/colors";
import { CATEGORY_LABEL, MOVEMENT_LABEL } from "@/lib/inventory/labels";
import { useInventory } from "@/lib/inventory/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stock/$itemId")({
  component: ItemDetailPage,
});

function ItemDetailPage() {
  const { itemId } = Route.useParams();
  const navigate = useNavigate();
  const item = useInventory((s) => s.items.find((i) => i.id === itemId));
  const movements = useInventory((s) => s.movements.filter((m) => m.itemId === itemId));
  const updateItem = useInventory((s) => s.updateItem);
  const deleteItem = useInventory((s) => s.deleteItem);
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);

  if (!item) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">این کالا پیدا نشد.</p>
        <Link to="/stock" className="mt-3 inline-block text-sm text-primary">
          بازگشت به موجودی
        </Link>
      </div>
    );
  }

  const low = item.quantity <= item.minQuantity;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3">
        <span
          className="size-16 shrink-0 rounded-xl border border-border"
          style={{ background: colorSwatch(item.color) }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">{item.sku}</p>
          <h1 className="text-xl font-semibold leading-snug">{item.name}</h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="primary">{CATEGORY_LABEL[item.category]}</Badge>
            {item.color ? <Badge>{item.color}</Badge> : null}
            {low ? <Badge variant="danger">کمبود</Badge> : null}
          </div>
        </div>
      </div>

      <Card className="p-5">
        <p className="text-sm text-muted">موجودی فعلی</p>
        <p className={cn("mt-1 text-3xl font-semibold tabular-nums", low && "text-danger")}>
          <QtyText qty={item.quantity} unit={item.unit} />
        </p>
        <p className="mt-1 text-xs text-subtle">
          حداقل: <QtyText qty={item.minQuantity} unit={item.unit} />
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button asChild>
          <Link to="/move" search={{ type: "in", itemId: item.id }}>
            <ArrowDownToLine className="size-4" />
            ورود
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/move" search={{ type: "out", itemId: item.id }}>
            <ArrowUpFromLine className="size-4" />
            خروج
          </Link>
        </Button>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <Info label="قفسه" value={item.location || "—"} />
        <Info label="تأمین‌کننده" value={item.supplier || "—"} />
        {item.widthCm ? <Info label="عرض" value={`${formatFa(item.widthCm)} سانتی`} /> : null}
        {item.composition ? <Info label="جنس" value={item.composition} /> : null}
        <Info
          label="قیمت واحد"
          value={item.unitPrice ? formatToman(item.unitPrice) : "—"}
        />
        <Info
          label="ارزش موجودی"
          value={item.unitPrice ? formatToman(item.unitPrice * item.quantity) : "—"}
        />
      </dl>

      {item.notes ? (
        <p className="rounded-xl bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted">
          {item.notes}
        </p>
      ) : null}

      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={() => setEditing(true)}>
          <Pencil className="size-4" />
          ویرایش
        </Button>
        <Button variant="outline" className="text-danger" onClick={() => setConfirm(true)}>
          <Trash2 className="size-4" />
          حذف
        </Button>
      </div>

      <section className="space-y-2">
        <h2 className="text-base font-semibold">تاریخچه گردش</h2>
        {movements.length === 0 ? (
          <p className="text-sm text-muted">هنوز گردشی برای این کالا نیست.</p>
        ) : (
          <ul>
            {movements.slice(0, 20).map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 border-b border-border py-3 text-sm last:border-0"
              >
                <div>
                  <p className="font-medium">{MOVEMENT_LABEL[m.type]} · {m.reason}</p>
                  <p className="text-xs text-muted">{formatDateTime(m.createdAt)}</p>
                </div>
                <QtyText
                  qty={m.quantity}
                  unit={item.unit}
                  className={m.type === "out" ? "text-danger" : "text-ok"}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <Drawer open={editing} onOpenChange={setEditing}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>ویرایش کالا</DrawerTitle>
            <DrawerDescription>{item.sku}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <ItemForm
              initial={draftFromItem(item)}
              submitLabel="ذخیره تغییرات"
              onCancel={() => setEditing(false)}
              onSubmit={(draft) => {
                updateItem(item.id, draft);
                toast.success("تغییرات ذخیره شد");
                setEditing(false);
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف کالا؟</DialogTitle>
            <DialogDescription>
              «{item.name}» از انبار و تاریخچه گردش آن پاک می‌شود.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex gap-2">
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => {
                deleteItem(item.id);
                toast.success("کالا حذف شد");
                void navigate({ to: "/stock" });
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface p-3 shadow-card">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
