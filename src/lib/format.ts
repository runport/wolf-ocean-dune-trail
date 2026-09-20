export function formatFa(n: number, fractionDigits = 0) {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(n);
}

export function formatToman(n: number) {
  return `${formatFa(Math.round(n))} تومان`;
}

export function formatDate(ts: number) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(ts));
}

export function formatDateTime(ts: number) {
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

export function formatDue(iso?: string) {
  if (!iso) return "بدون موعد";
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
  }).format(new Date(iso + "T12:00:00"));
}
