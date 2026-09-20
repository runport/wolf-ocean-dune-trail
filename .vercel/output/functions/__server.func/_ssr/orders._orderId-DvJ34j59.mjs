import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useInventory, f as ORDER_STATUS_LABEL, h as cn, l as CATEGORY_LABEL, r as Route$2 } from "./router-C8VX6oo9.mjs";
import { n as formatDue, r as formatFa } from "./format-P17We8ba.mjs";
import { t as QtyText } from "./qty-BPUau0da.mjs";
import { n as NativeSelect, t as Button } from "./native-select-BGjvY081.mjs";
import { t as Badge } from "./badge-Dpa3UnXz.mjs";
import { t as Card } from "./card-CTiAu3jK.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BbVFB4Bm.mjs";
import { n as ORDER_STATUSES } from "./types-DYW9547k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._orderId-DvJ34j59.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_VARIANT = {
	draft: "default",
	cutting: "warn",
	sewing: "primary",
	done: "ok",
	cancelled: "danger"
};
function OrderDetailPage() {
	const { orderId } = Route$2.useParams();
	const navigate = useNavigate();
	const order = useInventory((s) => s.orders.find((o) => o.id === orderId));
	const items = useInventory((s) => s.items);
	const updateOrderStatus = useInventory((s) => s.updateOrderStatus);
	const consumeOrder = useInventory((s) => s.consumeOrder);
	const deleteOrder = useInventory((s) => s.deleteOrder);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [shortages, setShortages] = (0, import_react.useState)(null);
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "این سفارش پیدا نشد."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/orders",
			className: "mt-3 inline-block text-sm text-primary",
			children: "بازگشت به سفارش‌ها"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: order.customer || "بدون مشتری"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-semibold leading-snug",
						children: order.title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: STATUS_VARIANT[order.status],
					children: ORDER_STATUS_LABEL[order.status]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "وضعیت کار"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: order.status,
							onChange: (e) => {
								const status = e.target.value;
								updateOrderStatus(order.id, status);
								toast.success("وضعیت به‌روز شد");
							},
							children: ORDER_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: ORDER_STATUS_LABEL[s]
							}, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["موعد ", formatDue(order.dueDate)]
					}),
					order.consumed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ok",
						children: "مواد این سفارش از انبار کم شده است."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-warn",
						children: "مصرف مواد هنوز ثبت نشده."
					})
				]
			}),
			order.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted",
				children: order.notes
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "لیست مواد"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: order.lines.map((line) => {
						const item = items.find((i) => i.id === line.itemId);
						if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-xl bg-surface p-3 text-sm text-muted shadow-card",
							children: "کالای حذف‌شده"
						}, line.itemId);
						const short = item.quantity < line.quantity && !order.consumed;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/stock/$itemId",
							params: { itemId: item.id },
							className: "flex items-center justify-between gap-3 rounded-xl bg-surface p-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [CATEGORY_LABEL[item.category], item.location ? ` · ${item.location}` : ""]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
									qty: line.quantity,
									unit: item.unit,
									className: cn("font-semibold", short && "text-danger")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-subtle",
									children: ["موجود ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
										qty: item.quantity,
										unit: item.unit
									})]
								})]
							})]
						}) }, line.itemId);
					})
				})]
			}),
			!order.consumed && order.status !== "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "h-12",
				onClick: () => {
					const result = consumeOrder(order.id);
					if (!result.ok) {
						setShortages(result.shortages);
						toast.error(result.error);
						return;
					}
					toast.success("مصرف مواد از انبار ثبت شد");
				},
				children: "ثبت مصرف مواد از انبار"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "text-danger",
				onClick: () => setConfirm(true),
				children: "حذف سفارش"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!shortages,
				onOpenChange: (v) => !v && setShortages(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "موجودی کافی نیست" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "این اقلام برای این سفارش کم دارند. اول ورود کالا بزنید یا مقدار را کم کنید." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: (shortages ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-danger",
								children: [
									"نیاز ",
									formatFa(s.need, s.need % 1 ? 1 : 0),
									" / موجود",
									" ",
									formatFa(s.have, s.have % 1 ? 1 : 0)
								]
							})]
						}, s.item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						onClick: () => setShortages(null),
						children: "متوجه شدم"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: confirm,
				onOpenChange: setConfirm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "حذف سفارش؟" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"«",
					order.title,
					"» پاک می‌شود. موجودی انبار تغییر نمی‌کند."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						className: "flex-1",
						onClick: () => {
							deleteOrder(order.id);
							toast.success("سفارش حذف شد");
							navigate({ to: "/orders" });
						},
						children: "حذف"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: () => setConfirm(false),
						children: "انصراف"
					})]
				})] })
			})
		]
	});
}
//#endregion
export { OrderDetailPage as component };
