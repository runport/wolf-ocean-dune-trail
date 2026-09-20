import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_LABEL, UNIT_LABEL } from "@/lib/inventory/labels";
import type { Category, Item, ItemDraft, Unit } from "@/lib/inventory/types";
import { CATEGORIES, UNITS } from "@/lib/inventory/types";

const DEFAULT_UNIT: Record<Category, Unit> = {
  fabric: "meter",
  thread: "spool",
  zipper: "piece",
  button: "piece",
  interfacing: "meter",
  trim: "meter",
  tool: "pack",
};

export const emptyDraft: ItemDraft = {
  name: "",
  category: "fabric",
  unit: "meter",
  quantity: 0,
  minQuantity: 0,
  color: "",
  widthCm: "150",
  composition: "",
  location: "",
  supplier: "",
  unitPrice: "",
  notes: "",
};

export function draftFromItem(item: Item): ItemDraft {
  return {
    name: item.name,
    category: item.category,
    unit: item.unit,
    quantity: item.quantity,
    minQuantity: item.minQuantity,
    color: item.color,
    widthCm: item.widthCm != null ? String(item.widthCm) : "",
    composition: item.composition ?? "",
    location: item.location,
    supplier: item.supplier,
    unitPrice: item.unitPrice ? String(item.unitPrice) : "",
    notes: item.notes,
  };
}

export function ItemForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: ItemDraft;
  submitLabel: string;
  onSubmit: (draft: ItemDraft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<ItemDraft>(initial ?? emptyDraft);
  const showFabric = draft.category === "fabric" || draft.category === "interfacing";

  function set<K extends keyof ItemDraft>(key: K, value: ItemDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!draft.name.trim()) return;
        onSubmit(draft);
      }}
    >
      <Field label="نام کالا">
        <Input
          required
          value={draft.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="مثلاً کرپ مازراتی سرمه‌ای"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="گروه">
          <NativeSelect
            value={draft.category}
            onChange={(e) => {
              const category = e.target.value as Category;
              setDraft((d) => ({
                ...d,
                category,
                unit: DEFAULT_UNIT[category],
              }));
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="واحد">
          <NativeSelect
            value={draft.unit}
            onChange={(e) => set("unit", e.target.value as Unit)}
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {UNIT_LABEL[u]}
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="موجودی فعلی">
          <Input
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={draft.quantity}
            onChange={(e) => set("quantity", Number(e.target.value))}
          />
        </Field>
        <Field label="حداقل موجودی">
          <Input
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={draft.minQuantity}
            onChange={(e) => set("minQuantity", Number(e.target.value))}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="رنگ">
          <Input
            value={draft.color}
            onChange={(e) => set("color", e.target.value)}
            placeholder="سرمه‌ای"
          />
        </Field>
        <Field label="قفسه / محل">
          <Input
            value={draft.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="قفسه آ-۱"
          />
        </Field>
      </div>
      {showFabric ? (
        <div className="grid grid-cols-2 gap-3">
          <Field label="عرض (سانتی‌متر)">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              value={draft.widthCm}
              onChange={(e) => set("widthCm", e.target.value)}
            />
          </Field>
          <Field label="جنس">
            <Input
              value={draft.composition}
              onChange={(e) => set("composition", e.target.value)}
              placeholder="پنبه، کرپ، لینن"
            />
          </Field>
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        <Field label="تأمین‌کننده">
          <Input
            value={draft.supplier}
            onChange={(e) => set("supplier", e.target.value)}
          />
        </Field>
        <Field label="قیمت واحد (تومان)">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            value={draft.unitPrice}
            onChange={(e) => set("unitPrice", e.target.value)}
          />
        </Field>
      </div>
      <Field label="یادداشت">
        <Textarea
          value={draft.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
        />
      </Field>
      <div className="mt-2 flex gap-2">
        <Button type="submit" className="flex-1">
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          انصراف
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
