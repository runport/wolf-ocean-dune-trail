//#region node_modules/.nitro/vite/services/ssr/assets/format-P17We8ba.js
function formatFa(n, fractionDigits = 0) {
	return new Intl.NumberFormat("fa-IR", {
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: fractionDigits
	}).format(n);
}
function formatToman(n) {
	return `${formatFa(Math.round(n))} تومان`;
}
function formatDateTime(ts) {
	return new Intl.DateTimeFormat("fa-IR", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(ts));
}
function formatDue(iso) {
	if (!iso) return "بدون موعد";
	return new Intl.DateTimeFormat("fa-IR", {
		month: "short",
		day: "numeric"
	}).format(/* @__PURE__ */ new Date(iso + "T12:00:00"));
}
//#endregion
export { formatToman as i, formatDue as n, formatFa as r, formatDateTime as t };
