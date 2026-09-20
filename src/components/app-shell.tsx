import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ClipboardList,
  House,
  Package,
} from "lucide-react";
import { Toaster } from "sonner";
import { AppMark } from "@/components/app-mark";
import { cn } from "@/lib/utils";
import { useInventory } from "@/lib/inventory/store";

const NAV = [
  { to: "/", label: "خانه", icon: House, exact: true },
  { to: "/stock", label: "موجودی", icon: Package, exact: false },
  { to: "/move", label: "گردش", icon: ArrowLeftRight, exact: false },
  { to: "/orders", label: "سفارش", icon: ClipboardList, exact: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void useInventory.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Toaster
        position="top-center"
        dir="rtl"
        toastOptions={{
          classNames: {
            toast: "font-sans !bg-surface !text-fg !border-border",
          },
        }}
      />
      <div className="mx-auto flex min-h-dvh max-w-5xl">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-e border-border bg-surface px-4 py-6 md:flex">
          <Brand />
          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
                  isActive(pathname, item)
                    ? "bg-primary text-primary-fg"
                    : "text-muted hover:bg-surface-2 hover:text-fg",
                )}
              >
                <item.icon className="size-4" strokeWidth={1.8} />
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto text-xs leading-relaxed text-subtle">
            انبار کارگاه خیاطی
            <br />
            موجودی، گردش کالا و سفارش دوخت
          </p>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-[4.5rem] md:pb-0">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:hidden">
            <Brand compact />
          </header>
          <main className="flex-1 px-4 py-4 md:px-8 md:py-8">
            {children}
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-sm md:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-4 px-1 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))]">
          {NAV.map((item) => {
            const active = isActive(pathname, item);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-medium",
                    active ? "text-primary" : "text-subtle",
                  )}
                >
                  <item.icon
                    className="size-5"
                    strokeWidth={active ? 2.2 : 1.7}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-fg">
        <AppMark className="size-6" />
      </span>
      <div className="leading-tight">
        <div className="font-semibold">دوخت‌بان</div>
        {compact ? null : (
          <div className="text-xs text-muted">انبار کارگاه خیاطی</div>
        )}
      </div>
    </div>
  );
}

function isActive(
  pathname: string,
  item: { to: string; exact: boolean },
) {
  if (item.exact) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(item.to + "/");
}
