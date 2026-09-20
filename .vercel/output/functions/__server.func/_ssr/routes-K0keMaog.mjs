import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Scissors, c as Package, d as ArrowUpFromLine, n as TriangleAlert, p as ArrowDownToLine } from "../_libs/lucide-react.mjs";
import { a as fabricMeters, c as useInventory, d as MOVEMENT_LABEL, f as ORDER_STATUS_LABEL, h as cn, l as CATEGORY_LABEL, o as lowStockItems, s as stockValue } from "./router-C8VX6oo9.mjs";
import { i as formatToman, r as formatFa, t as formatDateTime } from "./format-P17We8ba.mjs";
import { t as QtyText } from "./qty-BPUau0da.mjs";
import { t as Badge } from "./badge-Dpa3UnXz.mjs";
import { t as Card } from "./card-CTiAu3jK.mjs";
import { t as colorSwatch } from "./colors-CV9WOLQ3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-K0keMaog.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const items = useInventory((s) => s.items);
	const movements = useInventory((s) => s.movements);
	const orders = useInventory((s) => s.orders);
	const low = lowStockItems(items);
	const openOrders = orders.filter((o) => o.status !== "done" && o.status !== "cancelled");
	const meters = fabricMeters(items);
	const value = stockValue(items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "نمای کلی انبار"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "کارگاه امروز"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "اقلام فعال",
						value: formatFa(items.length),
						icon: Package
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "کمبود",
						value: formatFa(low.length),
						icon: TriangleAlert,
						warn: low.length > 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "متر پارچه",
						value: formatFa(Math.round(meters)),
						icon: Scissors
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "سفارش باز",
						value: formatFa(openOrders.length),
						icon: ArrowUpFromLine
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "ارزش تقریبی موجودی"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-lg font-semibold tabular-nums",
					children: formatToman(value)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-subtle sm:max-w-44 sm:text-left",
					children: "بر اساس آخرین قیمت واحد هر کالا"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/move",
					search: { type: "in" },
					className: "flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "size-4" }), "ورود کالا"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/move",
					search: { type: "out" },
					className: "flex min-h-14 items-center justify-center gap-2 rounded-xl bg-surface px-4 text-sm font-medium text-fg shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpFromLine, { className: "size-4" }), "خروج / مصرف"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "هشدار کمبود",
					href: "/stock",
					action: low.length ? `${formatFa(low.length)} کالا` : "همه کافی"
				}), low.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyLine, { text: "همه اقلام بالای حداقل موجودی هستند." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: low.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stock/$itemId",
						params: { itemId: item.id },
						className: "flex items-center gap-3 rounded-xl bg-surface p-3 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, { name: item.color }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										CATEGORY_LABEL[item.category],
										" · ",
										item.location || "بدون قفسه"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
									qty: item.quantity,
									unit: item.unit,
									className: "text-sm font-medium text-danger"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-subtle",
									children: ["حداقل ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
										qty: item.minQuantity,
										unit: item.unit
									})]
								})]
							})
						]
					}) }, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "سفارش‌های باز",
					href: "/orders",
					action: "همه"
				}), openOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyLine, { text: "سفارش بازی ثبت نشده." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: openOrders.slice(0, 4).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/orders/$orderId",
						params: { orderId: order.id },
						className: "flex items-center justify-between gap-3 rounded-xl bg-surface p-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: order.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: order.customer
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: order.status === "sewing" ? "primary" : order.status === "cutting" ? "warn" : "default",
							children: ORDER_STATUS_LABEL[order.status]
						})]
					}) }, order.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "آخرین گردش",
					href: "/move",
					action: "ثبت جدید"
				}), movements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyLine, { text: "گردش کالایی ثبت نشده." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					children: movements.slice(0, 6).map((m) => {
						const item = items.find((i) => i.id === m.itemId);
						if (!item) return null;
						const inbound = m.type !== "out";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 border-b border-border py-3 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-9 items-center justify-center rounded-lg", inbound ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"),
									children: inbound ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpFromLine, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											MOVEMENT_LABEL[m.type],
											" · ",
											m.reason,
											" · ",
											formatDateTime(m.createdAt)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
									qty: m.quantity,
									unit: item.unit,
									className: cn("text-sm font-medium tabular-nums", inbound ? "text-ok" : "text-danger")
								})
							]
						}, m.id);
					})
				})]
			})
		]
	});
}
function Stat({ label, value, icon: Icon, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", warn ? "text-danger" : "text-muted") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-2xl font-semibold tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: label
			})
		]
	});
}
function SectionHead({ title, href, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-base font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: href,
			className: "text-sm text-primary",
			children: action
		})]
	});
}
function EmptyLine({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-xl bg-surface-2 px-4 py-6 text-center text-sm text-muted",
		children: text
	});
}
function Swatch({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "size-10 shrink-0 rounded-lg border border-border",
		style: { background: colorSwatch(name) },
		title: name
	});
}
//#endregion
export { Home as component };
