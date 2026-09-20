import type { Category, MovementType, OrderStatus, Unit } from "./types";

export const CATEGORY_LABEL: Record<Category, string> = {
  fabric: "پارچه",
  thread: "نخ",
  zipper: "زیپ",
  button: "دکمه",
  interfacing: "لایی",
  trim: "خرج‌کار",
  tool: "ابزار",
};

export const UNIT_LABEL: Record<Unit, string> = {
  meter: "متر",
  piece: "عدد",
  spool: "قرقره",
  kg: "کیلو",
  pack: "بسته",
  roll: "رول",
};

export const UNIT_SHORT: Record<Unit, string> = {
  meter: "م",
  piece: "عدد",
  spool: "قرقره",
  kg: "ک‌گ",
  pack: "بسته",
  roll: "رول",
};

export const MOVEMENT_LABEL: Record<MovementType, string> = {
  in: "ورود",
  out: "خروج",
  adjust: "اصلاح",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  draft: "پیش‌نویس",
  cutting: "برش",
  sewing: "دوخت",
  done: "تمام",
  cancelled: "لغو",
};

export const SKU_PREFIX: Record<Category, string> = {
  fabric: "F",
  thread: "T",
  zipper: "Z",
  button: "B",
  interfacing: "I",
  trim: "R",
  tool: "K",
};

export const IN_REASONS = ["خرید جدید", "برگشت از سفارش", "هدیه تأمین‌کننده", "اصلاح موجودی"];
export const OUT_REASONS = ["مصرف سفارش", "ضایعات برش", "نمونه", "اصلاح موجودی"];
