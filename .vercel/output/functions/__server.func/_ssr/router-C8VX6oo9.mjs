import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Package, f as ArrowLeftRight, l as House, n as TriangleAlert, u as ClipboardList } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C8VX6oo9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "خطایی رخ داد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function AppMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "7",
				width: "18",
				height: "20",
				rx: "3",
				fill: "currentColor",
				opacity: "0.18"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10",
				y: "4",
				width: "18",
				height: "20",
				rx: "3",
				fill: "currentColor",
				opacity: "0.9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 10h10M14 14h10M14 18h6",
				stroke: "#f6f1e8",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var DAY = 864e5;
function createSeed(now = Date.now()) {
	return {
		items: [
			{
				id: "it-crepe-navy",
				name: "کرپ مازراتی سرمه‌ای",
				sku: "DB-F-001",
				category: "fabric",
				unit: "meter",
				quantity: 48,
				minQuantity: 12,
				color: "سرمه‌ای",
				widthCm: 150,
				composition: "پلی‌استر کرپ",
				location: "قفسه آ-۱",
				supplier: "پارچه‌سرای نساج",
				unitPrice: 285e3,
				notes: "برای مانتو اداری. عرض کامل، بدون رگه.",
				createdAt: now - 40 * DAY,
				updatedAt: now - 1 * DAY
			},
			{
				id: "it-crepe-black",
				name: "کرپ مازراتی مشکی",
				sku: "DB-F-002",
				category: "fabric",
				unit: "meter",
				quantity: 21,
				minQuantity: 12,
				color: "مشکی",
				widthCm: 150,
				composition: "پلی‌استر کرپ",
				location: "قفسه آ-۱",
				supplier: "پارچه‌سرای نساج",
				unitPrice: 285e3,
				notes: "",
				createdAt: now - 40 * DAY,
				updatedAt: now - 2 * DAY
			},
			{
				id: "it-linen-beige",
				name: "لینن طبیعی بژ",
				sku: "DB-F-003",
				category: "fabric",
				unit: "meter",
				quantity: 36,
				minQuantity: 10,
				color: "بژ",
				widthCm: 140,
				composition: "کتان / لینن",
				location: "قفسه آ-۲",
				supplier: "کتان شرق",
				unitPrice: 42e4,
				notes: "آب‌رفت حدود ۳ درصد. قبل برش بخار بزنید.",
				createdAt: now - 28 * DAY,
				updatedAt: now - 3 * DAY
			},
			{
				id: "it-cotton-stripe",
				name: "کتان راه‌راه آبی",
				sku: "DB-F-004",
				category: "fabric",
				unit: "meter",
				quantity: 8,
				minQuantity: 10,
				color: "آبی راه‌راه",
				widthCm: 145,
				composition: "پنبه ۱۰۰٪",
				location: "قفسه آ-۲",
				supplier: "کتان شرق",
				unitPrice: 31e4,
				notes: "",
				createdAt: now - 20 * DAY,
				updatedAt: now - 1 * DAY
			},
			{
				id: "it-satin-lining",
				name: "ساتن آستر کرم",
				sku: "DB-F-005",
				category: "fabric",
				unit: "meter",
				quantity: 62,
				minQuantity: 15,
				color: "کرم",
				widthCm: 150,
				composition: "پلی‌استر ساتن",
				location: "قفسه آ-۳",
				supplier: "پارچه‌سرای نساج",
				unitPrice: 145e3,
				notes: "آستر مانتو و کت.",
				createdAt: now - 35 * DAY,
				updatedAt: now - 6 * DAY
			},
			{
				id: "it-velvet",
				name: "مخمل کبریتی خردلی",
				sku: "DB-F-006",
				category: "fabric",
				unit: "meter",
				quantity: 6.5,
				minQuantity: 8,
				color: "خردلی",
				widthCm: 140,
				composition: "مخمل کبریتی",
				location: "قفسه آ-۳",
				supplier: "مخمل پارس",
				unitPrice: 56e4,
				notes: "موجودی کم — برای کت پاییزه رزرو شده.",
				createdAt: now - 18 * DAY,
				updatedAt: now - 1 * DAY
			},
			{
				id: "it-denim",
				name: "جین آبی تیره",
				sku: "DB-F-007",
				category: "fabric",
				unit: "meter",
				quantity: 15,
				minQuantity: 8,
				color: "آبی تیره",
				widthCm: 155,
				composition: "پنبه جین ۱۲ اونس",
				location: "قفسه آ-۴",
				supplier: "جین‌باف",
				unitPrice: 39e4,
				notes: "",
				createdAt: now - 14 * DAY,
				updatedAt: now - 4 * DAY
			},
			{
				id: "it-thread-black",
				name: "نخ پلی‌استر ۴۰/۲ مشکی",
				sku: "DB-T-001",
				category: "thread",
				unit: "spool",
				quantity: 24,
				minQuantity: 6,
				color: "مشکی",
				location: "کشو ن-۱",
				supplier: "نخ‌تاب",
				unitPrice: 38e3,
				notes: "قرقره ۵۰۰۰ متری صنعتی.",
				createdAt: now - 50 * DAY,
				updatedAt: now - 8 * DAY
			},
			{
				id: "it-thread-navy",
				name: "نخ پلی‌استر ۴۰/۲ سرمه‌ای",
				sku: "DB-T-002",
				category: "thread",
				unit: "spool",
				quantity: 11,
				minQuantity: 6,
				color: "سرمه‌ای",
				location: "کشو ن-۱",
				supplier: "نخ‌تاب",
				unitPrice: 38e3,
				notes: "",
				createdAt: now - 50 * DAY,
				updatedAt: now - 5 * DAY
			},
			{
				id: "it-thread-cream",
				name: "نخ پلی‌استر ۴۰/۲ کرم",
				sku: "DB-T-003",
				category: "thread",
				unit: "spool",
				quantity: 4,
				minQuantity: 6,
				color: "کرم",
				location: "کشو ن-۱",
				supplier: "نخ‌تاب",
				unitPrice: 38e3,
				notes: "",
				createdAt: now - 22 * DAY,
				updatedAt: now - 2 * DAY
			},
			{
				id: "it-zip-hidden",
				name: "زیپ مخفی ۲۰ سانتی مشکی",
				sku: "DB-Z-001",
				category: "zipper",
				unit: "piece",
				quantity: 80,
				minQuantity: 20,
				color: "مشکی",
				location: "کشو ز-۱",
				supplier: "یراق‌دوز",
				unitPrice: 12e3,
				notes: "",
				createdAt: now - 30 * DAY,
				updatedAt: now - 9 * DAY
			},
			{
				id: "it-zip-metal",
				name: "زیپ فلزی ۵۰ سانتی برنز",
				sku: "DB-Z-002",
				category: "zipper",
				unit: "piece",
				quantity: 18,
				minQuantity: 10,
				color: "برنز",
				location: "کشو ز-۱",
				supplier: "یراق‌دوز",
				unitPrice: 45e3,
				notes: "برای کت و پالتو.",
				createdAt: now - 16 * DAY,
				updatedAt: now - 3 * DAY
			},
			{
				id: "it-btn-shell",
				name: "دکمه صدفی ۱۸ میلی",
				sku: "DB-B-001",
				category: "button",
				unit: "piece",
				quantity: 240,
				minQuantity: 80,
				color: "طبیعی",
				location: "کشو د-۱",
				supplier: "یراق‌دوز",
				unitPrice: 2500,
				notes: "بسته ۱۰۰ تایی باز شده.",
				createdAt: now - 45 * DAY,
				updatedAt: now - 12 * DAY
			},
			{
				id: "it-btn-black",
				name: "دکمه پایه‌دار مشکی ۲۲",
				sku: "DB-B-002",
				category: "button",
				unit: "piece",
				quantity: 64,
				minQuantity: 40,
				color: "مشکی",
				location: "کشو د-۱",
				supplier: "یراق‌دوز",
				unitPrice: 4e3,
				notes: "",
				createdAt: now - 25 * DAY,
				updatedAt: now - 7 * DAY
			},
			{
				id: "it-interfacing",
				name: "لایی چسبی ۹۰ سانتی",
				sku: "DB-I-001",
				category: "interfacing",
				unit: "meter",
				quantity: 18,
				minQuantity: 8,
				color: "سفید",
				widthCm: 90,
				composition: "لایی چسبی سبک",
				location: "قفسه آ-۵",
				supplier: "لایی‌باف",
				unitPrice: 95e3,
				notes: "یقه و جیب مانتو.",
				createdAt: now - 33 * DAY,
				updatedAt: now - 4 * DAY
			},
			{
				id: "it-elastic",
				name: "کش شلواری ۲ سانتی",
				sku: "DB-R-001",
				category: "trim",
				unit: "meter",
				quantity: 30,
				minQuantity: 10,
				color: "سفید",
				location: "کشو خ-۱",
				supplier: "یراق‌دوز",
				unitPrice: 18e3,
				notes: "",
				createdAt: now - 19 * DAY,
				updatedAt: now - 6 * DAY
			},
			{
				id: "it-bias",
				name: "نوار اریب کتان کرم",
				sku: "DB-R-002",
				category: "trim",
				unit: "meter",
				quantity: 12,
				minQuantity: 8,
				color: "کرم",
				location: "کشو خ-۱",
				supplier: "کتان شرق",
				unitPrice: 22e3,
				notes: "",
				createdAt: now - 11 * DAY,
				updatedAt: now - 2 * DAY
			},
			{
				id: "it-lace",
				name: "گیپور سفید حاشیه",
				sku: "DB-R-003",
				category: "trim",
				unit: "meter",
				quantity: 7,
				minQuantity: 5,
				color: "سفید",
				location: "کشو خ-۲",
				supplier: "خرج‌کار گل‌دوز",
				unitPrice: 85e3,
				notes: "عرض ۶ سانتی.",
				createdAt: now - 9 * DAY,
				updatedAt: now - 1 * DAY
			},
			{
				id: "it-needle",
				name: "سوزن صنعتی DB×1",
				sku: "DB-K-001",
				category: "tool",
				unit: "pack",
				quantity: 8,
				minQuantity: 3,
				color: "نقره‌ای",
				location: "کشو ابزار",
				supplier: "ماشین‌دوز صنعت",
				unitPrice: 65e3,
				notes: "بسته ۱۰ تایی، سایز ۱۴.",
				createdAt: now - 60 * DAY,
				updatedAt: now - 15 * DAY
			},
			{
				id: "it-magnet",
				name: "دکمه مغناطیسی پالتو",
				sku: "DB-B-003",
				category: "button",
				unit: "piece",
				quantity: 9,
				minQuantity: 12,
				color: "مشکی",
				location: "کشو د-۲",
				supplier: "یراق‌دوز",
				unitPrice: 18e3,
				notes: "کمبود — سفارش بعدی را زود بزنید.",
				createdAt: now - 7 * DAY,
				updatedAt: now - 1 * DAY
			}
		],
		movements: [
			{
				id: "mv-1",
				itemId: "it-crepe-navy",
				type: "in",
				quantity: 50,
				reason: "خرید جدید",
				createdAt: now - 12 * DAY
			},
			{
				id: "mv-2",
				itemId: "it-crepe-navy",
				type: "out",
				quantity: 2,
				reason: "نمونه",
				createdAt: now - 8 * DAY
			},
			{
				id: "mv-3",
				itemId: "it-cotton-stripe",
				type: "out",
				quantity: 6,
				reason: "مصرف سفارش",
				orderId: "wo-shirt-linen",
				createdAt: now - 3 * DAY
			},
			{
				id: "mv-4",
				itemId: "it-thread-cream",
				type: "out",
				quantity: 2,
				reason: "مصرف سفارش",
				createdAt: now - 2 * DAY
			},
			{
				id: "mv-5",
				itemId: "it-velvet",
				type: "out",
				quantity: 3.5,
				reason: "مصرف سفارش",
				orderId: "wo-velvet-coat",
				createdAt: now - 1 * DAY
			},
			{
				id: "mv-6",
				itemId: "it-linen-beige",
				type: "in",
				quantity: 20,
				reason: "خرید جدید",
				createdAt: now - 3 * DAY
			},
			{
				id: "mv-7",
				itemId: "it-magnet",
				type: "out",
				quantity: 6,
				reason: "مصرف سفارش",
				createdAt: now - 1 * DAY
			},
			{
				id: "mv-8",
				itemId: "it-zip-metal",
				type: "in",
				quantity: 20,
				reason: "خرید جدید",
				createdAt: now - 5 * DAY
			}
		],
		orders: [
			{
				id: "wo-manteau",
				title: "مانتو اداری سرمه‌ای",
				customer: "فروشگاه نسیم",
				status: "cutting",
				dueDate: isoPlus(now, 5),
				lines: [
					{
						itemId: "it-crepe-navy",
						quantity: 18
					},
					{
						itemId: "it-satin-lining",
						quantity: 16
					},
					{
						itemId: "it-thread-navy",
						quantity: 2
					},
					{
						itemId: "it-interfacing",
						quantity: 4
					},
					{
						itemId: "it-btn-black",
						quantity: 24
					}
				],
				notes: "۸ عدد، قد ۱۱۵، سایز ۳۶ تا ۴۴. یقه ایستاده.",
				consumed: false,
				createdAt: now - 4 * DAY,
				updatedAt: now - 1 * DAY
			},
			{
				id: "wo-shirt-linen",
				title: "شومیز لینن بژ",
				customer: "آتلیه مهتاب",
				status: "sewing",
				dueDate: isoPlus(now, 2),
				lines: [
					{
						itemId: "it-linen-beige",
						quantity: 14
					},
					{
						itemId: "it-thread-cream",
						quantity: 2
					},
					{
						itemId: "it-btn-shell",
						quantity: 36
					}
				],
				notes: "۱۲ عدد. آستین بلند، دکمه صدفی.",
				consumed: true,
				createdAt: now - 6 * DAY,
				updatedAt: now - 2 * DAY
			},
			{
				id: "wo-velvet-coat",
				title: "کت مخمل خردلی",
				customer: "سفارش شخصی — خانم رضایی",
				status: "draft",
				dueDate: isoPlus(now, 12),
				lines: [
					{
						itemId: "it-velvet",
						quantity: 4
					},
					{
						itemId: "it-satin-lining",
						quantity: 3.5
					},
					{
						itemId: "it-zip-metal",
						quantity: 2
					},
					{
						itemId: "it-magnet",
						quantity: 4
					}
				],
				notes: "۲ عدد. مغزی خردلی، آستر کرم.",
				consumed: false,
				createdAt: now - 2 * DAY,
				updatedAt: now - 2 * DAY
			}
		]
	};
}
function isoPlus(now, days) {
	const d = new Date(now + days * DAY);
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${d.getFullYear()}-${m}-${day}`;
}
var CATEGORY_LABEL = {
	fabric: "پارچه",
	thread: "نخ",
	zipper: "زیپ",
	button: "دکمه",
	interfacing: "لایی",
	trim: "خرج‌کار",
	tool: "ابزار"
};
var UNIT_LABEL = {
	meter: "متر",
	piece: "عدد",
	spool: "قرقره",
	kg: "کیلو",
	pack: "بسته",
	roll: "رول"
};
var MOVEMENT_LABEL = {
	in: "ورود",
	out: "خروج",
	adjust: "اصلاح"
};
var ORDER_STATUS_LABEL = {
	draft: "پیش‌نویس",
	cutting: "برش",
	sewing: "دوخت",
	done: "تمام",
	cancelled: "لغو"
};
var SKU_PREFIX = {
	fabric: "F",
	thread: "T",
	zipper: "Z",
	button: "B",
	interfacing: "I",
	trim: "R",
	tool: "K"
};
var IN_REASONS = [
	"خرید جدید",
	"برگشت از سفارش",
	"هدیه تأمین‌کننده",
	"اصلاح موجودی"
];
var OUT_REASONS = [
	"مصرف سفارش",
	"ضایعات برش",
	"نمونه",
	"اصلاح موجودی"
];
var seed = createSeed(17258e8);
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function nextSku(items, category) {
	const prefix = `DB-${SKU_PREFIX[category]}-`;
	let max = 0;
	for (const item of items) {
		if (!item.sku.startsWith(prefix)) continue;
		const n = Number(item.sku.slice(prefix.length));
		if (Number.isFinite(n) && n > max) max = n;
	}
	return `${prefix}${String(max + 1).padStart(3, "0")}`;
}
function parseDraft(draft, items, existing) {
	const now = Date.now();
	const width = draft.widthCm.trim() ? Number(draft.widthCm) : void 0;
	const price = draft.unitPrice.trim() ? Number(draft.unitPrice) : 0;
	return {
		id: existing?.id ?? uid("it"),
		name: draft.name.trim(),
		sku: existing?.sku ?? nextSku(items, draft.category),
		category: draft.category,
		unit: draft.unit,
		quantity: Number(draft.quantity) || 0,
		minQuantity: Number(draft.minQuantity) || 0,
		color: draft.color.trim(),
		widthCm: Number.isFinite(width) ? width : void 0,
		composition: draft.composition.trim() || void 0,
		location: draft.location.trim(),
		supplier: draft.supplier.trim(),
		unitPrice: Number.isFinite(price) ? price : 0,
		notes: draft.notes.trim(),
		createdAt: existing?.createdAt ?? now,
		updatedAt: now
	};
}
var useInventory = create()(persist((set, get) => ({
	items: seed.items,
	movements: seed.movements,
	orders: seed.orders,
	addItem: (draft) => {
		const item = parseDraft(draft, get().items);
		set((s) => ({ items: [item, ...s.items] }));
		return item;
	},
	updateItem: (id, draft) => {
		set((s) => ({ items: s.items.map((item) => item.id === id ? parseDraft(draft, s.items, item) : item) }));
	},
	deleteItem: (id) => {
		set((s) => ({
			items: s.items.filter((item) => item.id !== id),
			movements: s.movements.filter((m) => m.itemId !== id),
			orders: s.orders.map((order) => ({
				...order,
				lines: order.lines.filter((line) => line.itemId !== id)
			}))
		}));
	},
	recordMovement: ({ itemId, type, quantity, reason, orderId }) => {
		if (!quantity || quantity <= 0) return {
			ok: false,
			error: "مقدار باید بزرگ‌تر از صفر باشد."
		};
		const item = get().items.find((i) => i.id === itemId);
		if (!item) return {
			ok: false,
			error: "کالا پیدا نشد."
		};
		const delta = type === "out" ? -quantity : quantity;
		const nextQty = roundQty(item.quantity + delta);
		if (nextQty < 0) return {
			ok: false,
			error: "موجودی برای این خروج کافی نیست."
		};
		const now = Date.now();
		const movement = {
			id: uid("mv"),
			itemId,
			type,
			quantity,
			reason: reason.trim() || (type === "in" ? "ورود کالا" : "خروج کالا"),
			orderId,
			createdAt: now
		};
		set((s) => ({
			items: s.items.map((i) => i.id === itemId ? {
				...i,
				quantity: nextQty,
				updatedAt: now
			} : i),
			movements: [movement, ...s.movements]
		}));
		return { ok: true };
	},
	addOrder: ({ title, customer, dueDate, notes, lines }) => {
		const now = Date.now();
		const order = {
			id: uid("wo"),
			title: title.trim(),
			customer: customer.trim(),
			status: "draft",
			dueDate: dueDate || void 0,
			lines: lines.filter((l) => l.quantity > 0),
			notes: notes.trim(),
			consumed: false,
			createdAt: now,
			updatedAt: now
		};
		set((s) => ({ orders: [order, ...s.orders] }));
		return order;
	},
	updateOrderStatus: (id, status) => {
		set((s) => ({ orders: s.orders.map((o) => o.id === id ? {
			...o,
			status,
			updatedAt: Date.now()
		} : o) }));
	},
	consumeOrder: (id) => {
		const order = get().orders.find((o) => o.id === id);
		if (!order) return {
			ok: false,
			error: "سفارش پیدا نشد.",
			shortages: []
		};
		if (order.consumed) return {
			ok: false,
			error: "مواد این سفارش قبلاً از انبار کم شده.",
			shortages: []
		};
		const items = get().items;
		const shortages = [];
		for (const line of order.lines) {
			const item = items.find((i) => i.id === line.itemId);
			if (!item) continue;
			if (item.quantity < line.quantity) shortages.push({
				item,
				need: line.quantity,
				have: item.quantity
			});
		}
		if (shortages.length) return {
			ok: false,
			error: "برای ثبت مصرف، موجودی کافی نیست.",
			shortages
		};
		const now = Date.now();
		const newMovements = order.lines.map((line) => ({
			id: uid("mv"),
			itemId: line.itemId,
			type: "out",
			quantity: line.quantity,
			reason: "مصرف سفارش",
			orderId: order.id,
			createdAt: now
		}));
		set((s) => ({
			items: s.items.map((item) => {
				const line = order.lines.find((l) => l.itemId === item.id);
				if (!line) return item;
				return {
					...item,
					quantity: roundQty(item.quantity - line.quantity),
					updatedAt: now
				};
			}),
			movements: [...newMovements, ...s.movements],
			orders: s.orders.map((o) => o.id === id ? {
				...o,
				consumed: true,
				status: o.status === "draft" ? "cutting" : o.status,
				updatedAt: now
			} : o)
		}));
		return { ok: true };
	},
	deleteOrder: (id) => {
		set((s) => ({ orders: s.orders.filter((o) => o.id !== id) }));
	}
}), {
	name: "dokhtban-inventory",
	skipHydration: true,
	partialize: (state) => ({
		items: state.items,
		movements: state.movements,
		orders: state.orders
	})
}));
function roundQty(n) {
	return Math.round(n * 100) / 100;
}
function lowStockItems(items) {
	return items.filter((i) => i.quantity <= i.minQuantity).sort((a, b) => a.quantity / Math.max(a.minQuantity, 1) - b.quantity / Math.max(b.minQuantity, 1));
}
function fabricMeters(items) {
	return items.filter((i) => i.category === "fabric").reduce((sum, i) => sum + i.quantity, 0);
}
function stockValue(items) {
	return items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
}
var NAV = [
	{
		to: "/",
		label: "خانه",
		icon: House,
		exact: true
	},
	{
		to: "/stock",
		label: "موجودی",
		icon: Package,
		exact: false
	},
	{
		to: "/move",
		label: "گردش",
		icon: ArrowLeftRight,
		exact: false
	},
	{
		to: "/orders",
		label: "سفارش",
		icon: ClipboardList,
		exact: false
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		useInventory.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				dir: "rtl",
				toastOptions: { classNames: { toast: "font-sans !bg-surface !text-fg !border-border" } }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-5xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-e border-border bg-surface px-4 py-6 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-8 flex flex-col gap-1",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150", isActive(pathname, item) ? "bg-primary text-primary-fg" : "text-muted hover:bg-surface-2 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "size-4",
									strokeWidth: 1.8
								}), item.label]
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-auto text-xs leading-relaxed text-subtle",
							children: [
								"انبار کارگاه خیاطی",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"موجودی، گردش کالا و سفارش دوخت"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col pb-[4.5rem] md:pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 px-4 py-4 md:px-8 md:py-8",
						children
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto grid max-w-lg grid-cols-4 px-1 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))]",
					children: NAV.map((item) => {
						const active = isActive(pathname, item);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-medium", active ? "text-primary" : "text-subtle"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "size-5",
								strokeWidth: active ? 2.2 : 1.7
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
function Brand({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-9 items-center justify-center rounded-lg bg-primary text-primary-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppMark, { className: "size-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold",
				children: "دوخت‌بان"
			}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted",
				children: "انبار کارگاه خیاطی"
			})]
		})]
	});
}
function isActive(pathname, item) {
	if (item.exact) return pathname === item.to;
	return pathname === item.to || pathname.startsWith(item.to + "/");
}
var styles_default = "/assets/styles-llnCfuBC.css";
var APP_NAME = "دوخت‌بان";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#2c4a3c"
			},
			{
				name: "description",
				content: "انبارداری کارگاه خیاطی: موجودی پارچه و یراق، گردش کالا و سفارش دوخت"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-K0keMaog.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./move-DD-poWgX.mjs");
var Route$4 = createFileRoute("/move")({
	validateSearch: (s) => ({
		type: s.type === "out" ? "out" : "in",
		itemId: typeof s.itemId === "string" ? s.itemId : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./orders.index-MoYVsHL3.mjs");
var Route$3 = createFileRoute("/orders/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./orders._orderId-DvJ34j59.mjs");
var Route$2 = createFileRoute("/orders/$orderId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./stock.index-CI1bV0OA.mjs");
var Route$1 = createFileRoute("/stock/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./stock._itemId-DwNNrb0D.mjs");
var Route = createFileRoute("/stock/$itemId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var MoveRoute = Route$4.update({
	id: "/move",
	path: "/move",
	getParentRoute: () => Route$6
});
var OrdersIndexRoute = Route$3.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => Route$6
});
var OrdersOrderIdRoute = Route$2.update({
	id: "/orders/$orderId",
	path: "/orders/$orderId",
	getParentRoute: () => Route$6
});
var StockIndexRoute = Route$1.update({
	id: "/stock/",
	path: "/stock/",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	MoveRoute,
	OrdersOrderIdRoute,
	StockItemIdRoute: Route.update({
		id: "/stock/$itemId",
		path: "/stock/$itemId",
		getParentRoute: () => Route$6
	}),
	OrdersIndexRoute,
	StockIndexRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { fabricMeters as a, useInventory as c, MOVEMENT_LABEL as d, ORDER_STATUS_LABEL as f, cn as h, Route$4 as i, CATEGORY_LABEL as l, UNIT_LABEL as m, Route as n, lowStockItems as o, OUT_REASONS as p, Route$2 as r, stockValue as s, router_exports as t, IN_REASONS as u };
