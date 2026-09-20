import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { emptyDraft, ItemForm } from "@/components/item-form";
import { QtyText } from "@/components/qty";
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
import { colorSwatch } from "@/lib/inventory/colors";
import { CATEGORY_LABEL } from "@/lib/inventory/labels";
import { useInventory } from "@/lib/inventory/store";
import { CATEGORIES, type Category, type Item } from "@/lib/inventory/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stock/")({ component: StockPage });

function StockPage() {
  const items = useInventory((s) => s.items);
  const addItem = useInventory((s) => s.addItem);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim();
    return items
      .filter((item) => (category === "all" ? true : item.category === category))
      .filter((item) => {
        if (!q) return true;
        const hay = [item.name, item.sku, item.color, item.location, item.supplier].join(" ");
        return hay.includes(q);
      })
      .sort((a, b) => {
        const aLow = a.quantity <= a.minQuantity ? 0 : 1;
        const bLow = b.quantity <= b.minQuantity ? 0 : 1;
        if (aLow !== bLow) return aLow - bLow;
        return a.name.localeCompare(b.name, "fa");
      });
  }, [items, query, category]);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">موجودی انبار</h1>
          <p className="mt-1 text-sm text-muted">پارچه، نخ، یراق و ابزار کارگاه</p>
        </div>
        <Button size="icon" className="shrink-0" onClick={() => setOpen(true)} aria-label="کالای جدید">
          <Plus className="size-5" />
        </Button>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو نام، رنگ، قفسه یا کد"
          className="pr-10"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          همه
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {CATEGORY_LABEL[c]}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl bg-surface-2 px-4 py-10 text-center text-sm text-muted">
          کالایی با این فیلتر پیدا نشد.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((item) => (
            <li key={item.id}>
              <ItemRow item={item} />
            </li>
          ))}
        </ul>
      )}

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>کالای جدید</DrawerTitle>
            <DrawerDescription>به قفسه انبار اضافه کنید.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <ItemForm
              initial={emptyDraft}
              submitLabel="ثبت کالا"
              onCancel={() => setOpen(false)}
              onSubmit={(draft) => {
                const item = addItem(draft);
                toast.success(`${item.name} ثبت شد`);
                setOpen(false);
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function ItemRow({ item }: { item: Item }) {
  const low = item.quantity <= item.minQuantity;
  return (
    <Link
      to="/stock/$itemId"
      params={{ itemId: item.id }}
      className="flex items-center gap-3 rounded-xl bg-surface p-3 shadow-card"
    >
      <span
        className="size-11 shrink-0 rounded-lg border border-border"
        style={{ background: colorSwatch(item.color) }}
        title={item.color}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{item.name}</p>
          {low ? <Badge variant="danger">کمبود</Badge> : null}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted">
          {item.sku} · {CATEGORY_LABEL[item.category]}
          {item.location ? ` · ${item.location}` : ""}
        </p>
      </div>
      <QtyText
        qty={item.quantity}
        unit={item.unit}
        className={cn("text-sm font-semibold", low ? "text-danger" : "text-fg")}
      />
    </Link>
  );
}

function Chip({
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
        "h-9 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
        active ? "bg-primary text-primary-fg" : "bg-surface text-muted shadow-card",
      )}
    >
      {children}
    </button>
  );
}
