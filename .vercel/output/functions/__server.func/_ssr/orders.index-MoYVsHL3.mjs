import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useInventory, f as ORDER_STATUS_LABEL, m as UNIT_LABEL } from "./router-C8VX6oo9.mjs";
import { n as formatDue } from "./format-P17We8ba.mjs";
import { n as NativeSelect, t as Button } from "./native-select-BGjvY081.mjs";
import { n as Label, t as Input } from "./label-C6nURGYH.mjs";
import { t as Badge } from "./badge-Dpa3UnXz.mjs";
import { a as DrawerHeader, i as DrawerDescription, n as DrawerBody, o as DrawerTitle, r as DrawerContent, s as Textarea, t as Drawer$1 } from "./textarea-DwwPDfwc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.index-MoYVsHL3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_VARIANT = {
	draft: "default",
	cutting: "warn",
	sewing: "primary",
	done: "ok",
	cancelled: "danger"
};
function OrdersPage() {
	const orders = useInventory((s) => s.orders);
	const items = useInventory((s) => s.items);
	const addOrder = useInventory((s) => s.addOrder);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [customer, setCustomer] = (0, import_react.useState)("");
	const [dueDate, setDueDate] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([{
		itemId: items[0]?.id ?? "",
		quantity: 1
	}]);
	const sorted = (0, import_react.useMemo)(() => {
		const rank = {
			cutting: 0,
			sewing: 1,
			draft: 2,
			done: 3,
			cancelled: 4
		};
		return [...orders].sort((a, b) => rank[a.status] - rank[b.status]);
	}, [orders]);
	function resetForm() {
		setTitle("");
		setCustomer("");
		setDueDate("");
		setNotes("");
		setLines([{
			itemId: items[0]?.id ?? "",
			quantity: 1
		}]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: "سفارش دوخت"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "مواد هر کار را از انبار کم کنید"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: "shrink-0",
					onClick: () => setOpen(true),
					"aria-label": "سفارش جدید",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				})]
			}),
			sorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface-2 px-4 py-10 text-center text-sm text-muted",
				children: "هنوز سفارشی ثبت نشده."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: sorted.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/orders/$orderId",
					params: { orderId: order.id },
					className: "flex items-start justify-between gap-3 rounded-xl bg-surface p-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: order.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted",
								children: [
									order.customer || "بدون مشتری",
									" · موعد ",
									formatDue(order.dueDate)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-subtle",
								children: [
									order.lines.length,
									" قلم مواد",
									order.consumed ? " · مصرف ثبت شده" : ""
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: STATUS_VARIANT[order.status],
						children: ORDER_STATUS_LABEL[order.status]
					})]
				}) }, order.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open,
				onOpenChange: (v) => {
					setOpen(v);
					if (!v) resetForm();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: "سفارش جدید" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "نام کار و مواد مورد نیاز را وارد کنید." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-3",
					onSubmit: (e) => {
						e.preventDefault();
						if (!title.trim()) return;
						const order = addOrder({
							title,
							customer,
							dueDate,
							notes,
							lines: lines.filter((l) => l.itemId && l.quantity > 0)
						});
						toast.success(`${order.title} ثبت شد`);
						setOpen(false);
						resetForm();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "عنوان کار",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "مانتو اداری سرمه‌ای × ۸"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "مشتری",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: customer,
								onChange: (e) => setCustomer(e.target.value),
								placeholder: "فروشگاه یا نام مشتری"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "موعد",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: dueDate,
								onChange: (e) => setDueDate(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "مواد مصرفی"
								}),
								lines.map((line, index) => {
									const it = items.find((i) => i.id === line.itemId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-[1fr_5.5rem] gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
												value: line.itemId,
												onChange: (e) => {
													const next = [...lines];
													next[index] = {
														...next[index],
														itemId: e.target.value
													};
													setLines(next);
												},
												children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: i.id,
													children: i.name
												}, i.id))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: .1,
												step: "any",
												value: line.quantity,
												onChange: (e) => {
													const next = [...lines];
													next[index] = {
														...next[index],
														quantity: Number(e.target.value)
													};
													setLines(next);
												},
												"aria-label": "مقدار"
											}),
											it ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "col-span-2 text-[11px] text-subtle",
												children: [
													"واحد: ",
													UNIT_LABEL[it.unit],
													" · موجود ",
													it.quantity
												]
											}) : null
										]
									}, index);
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setLines((ls) => [...ls, {
										itemId: items[0]?.id ?? "",
										quantity: 1
									}]),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "قلم دیگر"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "یادداشت",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								rows: 3
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "flex-1",
								children: "ثبت سفارش"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "flex-1",
								onClick: () => setOpen(false),
								children: "انصراف"
							})]
						})
					]
				}) })] })
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
export { OrdersPage as component };
