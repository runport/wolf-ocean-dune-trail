import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Search, o as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useInventory, h as cn, l as CATEGORY_LABEL } from "./router-C8VX6oo9.mjs";
import { t as QtyText } from "./qty-BPUau0da.mjs";
import { t as Button } from "./native-select-BGjvY081.mjs";
import { t as Input } from "./label-C6nURGYH.mjs";
import { t as Badge } from "./badge-Dpa3UnXz.mjs";
import { t as CATEGORIES } from "./types-DYW9547k.mjs";
import { a as DrawerHeader, i as DrawerDescription, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./textarea-DwwPDfwc.mjs";
import { t as colorSwatch } from "./colors-CV9WOLQ3.mjs";
import { r as emptyDraft, t as ItemForm } from "./item-form-CSkFg1ie.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock.index-CI1bV0OA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StockPage() {
	const items = useInventory((s) => s.items);
	const addItem = useInventory((s) => s.addItem);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim();
		return items.filter((item) => category === "all" ? true : item.category === category).filter((item) => {
			if (!q) return true;
			return [
				item.name,
				item.sku,
				item.color,
				item.location,
				item.supplier
			].join(" ").includes(q);
		}).sort((a, b) => {
			const aLow = a.quantity <= a.minQuantity ? 0 : 1;
			const bLow = b.quantity <= b.minQuantity ? 0 : 1;
			if (aLow !== bLow) return aLow - bLow;
			return a.name.localeCompare(b.name, "fa");
		});
	}, [
		items,
		query,
		category
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: "موجودی انبار"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "پارچه، نخ، یراق و ابزار کارگاه"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: "shrink-0",
					onClick: () => setOpen(true),
					"aria-label": "کالای جدید",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "جستجو نام، رنگ، قفسه یا کد",
					className: "pr-10"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: category === "all",
					onClick: () => setCategory("all"),
					children: "همه"
				}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: category === c,
					onClick: () => setCategory(c),
					children: CATEGORY_LABEL[c]
				}, c))]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface-2 px-4 py-10 text-center text-sm text-muted",
				children: "کالایی با این فیلتر پیدا نشد."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemRow, { item }) }, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: "کالای جدید" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "به قفسه انبار اضافه کنید." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemForm, {
					initial: emptyDraft,
					submitLabel: "ثبت کالا",
					onCancel: () => setOpen(false),
					onSubmit: (draft) => {
						const item = addItem(draft);
						toast.success(`${item.name} ثبت شد`);
						setOpen(false);
					}
				}) })] })
			})
		]
	});
}
function ItemRow({ item }) {
	const low = item.quantity <= item.minQuantity;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/stock/$itemId",
		params: { itemId: item.id },
		className: "flex items-center gap-3 rounded-xl bg-surface p-3 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-11 shrink-0 rounded-lg border border-border",
				style: { background: colorSwatch(item.color) },
				title: item.color
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: item.name
					}), low ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "danger",
						children: "کمبود"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 truncate text-xs text-muted",
					children: [
						item.sku,
						" · ",
						CATEGORY_LABEL[item.category],
						item.location ? ` · ${item.location}` : ""
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
				qty: item.quantity,
				unit: item.unit,
				className: cn("text-sm font-semibold", low ? "text-danger" : "text-fg")
			})
		]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-fg" : "bg-surface text-muted shadow-card"),
		children
	});
}
//#endregion
export { StockPage as component };
