import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ArrowUpFromLine, p as ArrowDownToLine, r as Trash2, s as Pencil } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useInventory, d as MOVEMENT_LABEL, h as cn, l as CATEGORY_LABEL, n as Route } from "./router-C8VX6oo9.mjs";
import { i as formatToman, r as formatFa, t as formatDateTime } from "./format-P17We8ba.mjs";
import { t as QtyText } from "./qty-BPUau0da.mjs";
import { t as Button } from "./native-select-BGjvY081.mjs";
import { t as Badge } from "./badge-Dpa3UnXz.mjs";
import { t as Card } from "./card-CTiAu3jK.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BbVFB4Bm.mjs";
import { a as DrawerHeader, i as DrawerDescription, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./textarea-DwwPDfwc.mjs";
import { t as colorSwatch } from "./colors-CV9WOLQ3.mjs";
import { n as draftFromItem, t as ItemForm } from "./item-form-CSkFg1ie.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock._itemId-DwNNrb0D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ItemDetailPage() {
	const { itemId } = Route.useParams();
	const navigate = useNavigate();
	const item = useInventory((s) => s.items.find((i) => i.id === itemId));
	const movements = useInventory((s) => s.movements.filter((m) => m.itemId === itemId));
	const updateItem = useInventory((s) => s.updateItem);
	const deleteItem = useInventory((s) => s.deleteItem);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "این کالا پیدا نشد."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/stock",
			className: "mt-3 inline-block text-sm text-primary",
			children: "بازگشت به موجودی"
		})]
	});
	const low = item.quantity <= item.minQuantity;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-16 shrink-0 rounded-xl border border-border",
					style: { background: colorSwatch(item.color) }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: item.sku
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-semibold leading-snug",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "primary",
									children: CATEGORY_LABEL[item.category]
								}),
								item.color ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: item.color }) : null,
								low ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "danger",
									children: "کمبود"
								}) : null
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "موجودی فعلی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 text-3xl font-semibold tabular-nums", low && "text-danger"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
							qty: item.quantity,
							unit: item.unit
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-subtle",
						children: ["حداقل: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
							qty: item.minQuantity,
							unit: item.unit
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/move",
						search: {
							type: "in",
							itemId: item.id
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "size-4" }), "ورود"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/move",
						search: {
							type: "out",
							itemId: item.id
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpFromLine, { className: "size-4" }), "خروج"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "قفسه",
						value: item.location || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "تأمین‌کننده",
						value: item.supplier || "—"
					}),
					item.widthCm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "عرض",
						value: `${formatFa(item.widthCm)} سانتی`
					}) : null,
					item.composition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "جنس",
						value: item.composition
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "قیمت واحد",
						value: item.unitPrice ? formatToman(item.unitPrice) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "ارزش موجودی",
						value: item.unitPrice ? formatToman(item.unitPrice * item.quantity) : "—"
					})
				]
			}),
			item.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted",
				children: item.notes
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: () => setEditing(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "ویرایش"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "text-danger",
					onClick: () => setConfirm(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "حذف"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "تاریخچه گردش"
				}), movements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "هنوز گردشی برای این کالا نیست."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: movements.slice(0, 20).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 border-b border-border py-3 text-sm last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium",
						children: [
							MOVEMENT_LABEL[m.type],
							" · ",
							m.reason
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: formatDateTime(m.createdAt)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyText, {
						qty: m.quantity,
						unit: item.unit,
						className: m.type === "out" ? "text-danger" : "text-ok"
					})]
				}, m.id)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open: editing,
				onOpenChange: setEditing,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: "ویرایش کالا" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: item.sku })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemForm, {
					initial: draftFromItem(item),
					submitLabel: "ذخیره تغییرات",
					onCancel: () => setEditing(false),
					onSubmit: (draft) => {
						updateItem(item.id, draft);
						toast.success("تغییرات ذخیره شد");
						setEditing(false);
					}
				}) })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: confirm,
				onOpenChange: setConfirm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "حذف کالا؟" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"«",
					item.name,
					"» از انبار و تاریخچه گردش آن پاک می‌شود."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						className: "flex-1",
						onClick: () => {
							deleteItem(item.id);
							toast.success("کالا حذف شد");
							navigate({ to: "/stock" });
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
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-3 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-medium",
			children: value
		})]
	});
}
//#endregion
export { ItemDetailPage as component };
