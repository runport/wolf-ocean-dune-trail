import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useInventory, d as MOVEMENT_LABEL, h as cn, i as Route$4, p as OUT_REASONS, u as IN_REASONS } from "./router-C8VX6oo9.mjs";
import { t as formatDateTime } from "./format-P17We8ba.mjs";
import { t as QtyText } from "./qty-BPUau0da.mjs";
import { n as NativeSelect, t as Button } from "./native-select-BGjvY081.mjs";
import { n as Label, t as Input } from "./label-C6nURGYH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/move-DD-poWgX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MovePage() {
	const search = Route$4.useSearch();
	const navigate = Route$4.useNavigate();
	const items = useInventory((s) => s.items);
	const movements = useInventory((s) => s.movements);
	const recordMovement = useInventory((s) => s.recordMovement);
	const [itemId, setItemId] = (0, import_react.useState)(search.itemId ?? items[0]?.id ?? "");
	const [qty, setQty] = (0, import_react.useState)("1");
	const [reason, setReason] = (0, import_react.useState)(search.type === "out" ? OUT_REASONS[0] : IN_REASONS[0]);
	const [customReason, setCustomReason] = (0, import_react.useState)("");
	const type = search.type;
	const reasons = type === "out" ? OUT_REASONS : IN_REASONS;
	const item = items.find((i) => i.id === itemId);
	const sortedItems = (0, import_react.useMemo)(() => [...items].sort((a, b) => a.name.localeCompare(b.name, "fa")), [items]);
	(0, import_react.useEffect)(() => {
		if (search.itemId) setItemId(search.itemId);
	}, [search.itemId]);
	function setType(next) {
		setReason(next === "out" ? OUT_REASONS[0] : IN_REASONS[0]);
		setCustomReason("");
		navigate({ search: (prev) => ({
			...prev,
			type: next
		}) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "گردش کالا"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "ورود به انبار یا مصرف از قفسه"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 rounded-xl bg-surface-2 p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					active: type === "in",
					onClick: () => setType("in"),
					children: "ورود"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					active: type === "out",
					onClick: () => setType("out"),
					children: "خروج"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault();
					const quantity = Number(qty);
					const result = recordMovement({
						itemId,
						type,
						quantity,
						reason: reason === "دیگر" ? customReason : reason
					});
					if (!result.ok) {
						toast.error(result.error);
						return;
					}
					toast.success(type === "in" ? "ورود ثبت شد" : "خروج ثبت شد");
					setQty("1");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "کالا" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: itemId,
							onChange: (e) => setItemId(e.target.value),
							required: true,
							children: sortedItems.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i.id,
								children: i.name
							}, i.id))
						})]
					}),
					item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"موجودی فعلی:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
								qty: item.quantity,
								unit: item.unit,
								className: "font-medium text-fg"
							}),
							item.location ? ` · ${item.location}` : ""
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "مقدار" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							inputMode: "decimal",
							min: .1,
							step: "any",
							required: true,
							value: qty,
							onChange: (e) => setQty(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "بابت" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: reason,
							onChange: (e) => setReason(e.target.value),
							children: [reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: r,
								children: r
							}, r)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "دیگر",
								children: "سایر…"
							})]
						})]
					}),
					reason === "دیگر" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: customReason,
						onChange: (e) => setCustomReason(e.target.value),
						placeholder: "توضیح کوتاه",
						required: true
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-1 h-12",
						children: type === "in" ? "ثبت ورود" : "ثبت خروج"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "گردش‌های اخیر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: movements.slice(0, 12).map((m) => {
					const it = items.find((i) => i.id === m.itemId);
					if (!it) return null;
					const inbound = m.type !== "out";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 border-b border-border py-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: it.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									MOVEMENT_LABEL[m.type],
									" · ",
									m.reason,
									" ·",
									" ",
									formatDateTime(m.createdAt)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
							qty: m.quantity,
							unit: it.unit,
							className: cn("text-sm font-medium", inbound ? "text-ok" : "text-danger")
						})]
					}, m.id);
				}) })]
			})
		]
	});
}
function Toggle({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 rounded-lg text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-fg shadow-sm" : "text-muted"),
		children
	});
}
//#endregion
export { MovePage as component };
