import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as CATEGORY_LABEL, m as UNIT_LABEL } from "./router-C8VX6oo9.mjs";
import { n as NativeSelect, t as Button } from "./native-select-BGjvY081.mjs";
import { n as Label, t as Input } from "./label-C6nURGYH.mjs";
import { r as UNITS, t as CATEGORIES } from "./types-DYW9547k.mjs";
import { s as Textarea } from "./textarea-DwwPDfwc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/item-form-CSkFg1ie.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_UNIT = {
	fabric: "meter",
	thread: "spool",
	zipper: "piece",
	button: "piece",
	interfacing: "meter",
	trim: "meter",
	tool: "pack"
};
var emptyDraft = {
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
	notes: ""
};
function draftFromItem(item) {
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
		notes: item.notes
	};
}
function ItemForm({ initial, submitLabel, onSubmit, onCancel }) {
	const [draft, setDraft] = (0, import_react.useState)(initial ?? emptyDraft);
	const showFabric = draft.category === "fabric" || draft.category === "interfacing";
	function set(key, value) {
		setDraft((d) => ({
			...d,
			[key]: value
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3",
		onSubmit: (e) => {
			e.preventDefault();
			if (!draft.name.trim()) return;
			onSubmit(draft);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "نام کالا",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: draft.name,
					onChange: (e) => set("name", e.target.value),
					placeholder: "مثلاً کرپ مازراتی سرمه‌ای"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "گروه",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: draft.category,
						onChange: (e) => {
							const category = e.target.value;
							setDraft((d) => ({
								...d,
								category,
								unit: DEFAULT_UNIT[category]
							}));
						},
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: CATEGORY_LABEL[c]
						}, c))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "واحد",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: draft.unit,
						onChange: (e) => set("unit", e.target.value),
						children: UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: u,
							children: UNIT_LABEL[u]
						}, u))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "موجودی فعلی",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						inputMode: "decimal",
						min: 0,
						step: "any",
						value: draft.quantity,
						onChange: (e) => set("quantity", Number(e.target.value))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "حداقل موجودی",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						inputMode: "decimal",
						min: 0,
						step: "any",
						value: draft.minQuantity,
						onChange: (e) => set("minQuantity", Number(e.target.value))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "رنگ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.color,
						onChange: (e) => set("color", e.target.value),
						placeholder: "سرمه‌ای"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "قفسه / محل",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.location,
						onChange: (e) => set("location", e.target.value),
						placeholder: "قفسه آ-۱"
					})
				})]
			}),
			showFabric ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "عرض (سانتی‌متر)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						inputMode: "numeric",
						min: 0,
						value: draft.widthCm,
						onChange: (e) => set("widthCm", e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "جنس",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.composition,
						onChange: (e) => set("composition", e.target.value),
						placeholder: "پنبه، کرپ، لینن"
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "تأمین‌کننده",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.supplier,
						onChange: (e) => set("supplier", e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "قیمت واحد (تومان)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						inputMode: "numeric",
						min: 0,
						value: draft.unitPrice,
						onChange: (e) => set("unitPrice", e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "یادداشت",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft.notes,
					onChange: (e) => set("notes", e.target.value),
					rows: 3
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "flex-1",
					children: submitLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: onCancel,
					children: "انصراف"
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { draftFromItem as n, emptyDraft as r, ItemForm as t };
