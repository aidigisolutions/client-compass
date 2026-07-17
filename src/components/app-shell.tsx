import { useEffect, useState, type ReactNode, type ComponentType } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ListChecks,
  StickyNote,
  BarChart3,
  LogOut,
  Sparkles,
  Search,
  Layers,
  Package,
} from "lucide-react";
import { auth } from "@/lib/crm-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/services", label: "AI DiGi Services", icon: Layers },
  { to: "/package", label: "Client Package", icon: Package },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/notes", label: "Notes", icon: StickyNote },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

export function AppShell({ children, title, subtitle, action }: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMounted(true);
    if (!auth.isAuthed()) {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex sticky top-0 h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-6 pt-6 pb-4">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight">AI DiGi</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/60">Solutions CRM</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent/40 p-3 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
                AD
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">Admin</div>
                <div className="text-[10px] text-sidebar-foreground/60 truncate">admin@aidigi.co</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              auth.logout();
              navigate({ to: "/login" });
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-4 px-6 md:px-10 py-5">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold tracking-tight truncate">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
            </div>
            <div className="hidden lg:flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 w-72">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search clients, tasks…" className="border-0 shadow-none h-6 p-0 focus-visible:ring-0" />
            </div>
            {action}
          </div>
          {/* Mobile nav */}
          <div className="md:hidden flex gap-1 overflow-x-auto px-4 pb-3">
            {nav.map((item) => {
              const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
              return (
                <Link key={item.to} to={item.to} className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}>
                  <item.icon className="h-3.5 w-3.5" />{item.label}
                </Link>
              );
            })}
          </div>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({ label, value, hint, accent, icon: Icon }: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "primary" | "success" | "warning" | "info";
  icon?: ComponentType<{ className?: string }>;
}) {
  const bg =
    accent === "success" ? "oklch(0.65 0.17 155 / 0.12)" :
    accent === "warning" ? "oklch(0.78 0.16 75 / 0.14)" :
    accent === "info" ? "oklch(0.68 0.18 200 / 0.12)" :
    "oklch(0.52 0.22 285 / 0.1)";
  const fg =
    accent === "success" ? "oklch(0.5 0.17 155)" :
    accent === "warning" ? "oklch(0.55 0.16 75)" :
    accent === "info" ? "oklch(0.5 0.18 200)" :
    "oklch(0.52 0.22 285)";
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        {Icon && (
          <div className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center" style={{ background: bg, color: fg }}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}

// Utility default export sensible fallback
export default AppShell;