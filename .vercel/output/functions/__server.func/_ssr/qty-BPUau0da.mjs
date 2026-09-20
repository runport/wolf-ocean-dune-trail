import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as UNIT_LABEL } from "./router-C8VX6oo9.mjs";
import { r as formatFa } from "./format-P17We8ba.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qty-BPUau0da.js
var import_jsx_runtime = require_jsx_runtime();
function QtyText({ qty, unit, className }) {
	const digits = qty % 1 === 0 ? 0 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: formatFa(qty, digits)
			}),
			" ",
			UNIT_LABEL[unit]
		]
	});
}
//#endregion
export { QtyText as t };
