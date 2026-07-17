import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Layers, CheckCircle2, Users as UsersIcon, Sparkles } from "lucide-react";
import { AppShell, StatCard } from "@/components/app-shell";
import { servicesCatalog, categoryAccent } from "@/lib/services-catalog";
import { useCrm } from "@/lib/crm-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "AI DiGi Services — AI DiGi CRM" }] }),
  component: ServicesPage,
});

function ServicesPage() {
  const state = useCrm();
  const totalServices = servicesCatalog.reduce((n, c) => n + c.items.length, 0);
  const totalCategories = servicesCatalog.length;
  const activeClients = state.clients.filter((c) => c.status === "active").length;
  const completedProjects = state.tasks.filter((t) => t.status === "completed").length;

  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(servicesCatalog.map((c, i) => [c.name, i < 2])),
  );

  return (
    <AppShell
      title="AI DiGi Services"
      subtitle="The full catalog of services offered by AI DiGi Solutions."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Services" value={totalServices} hint={`${totalCategories} categories`} accent="primary" icon={Layers} />
        <StatCard label="Service Categories" value={totalCategories} hint="End-to-end coverage" accent="info" icon={Sparkles} />
        <StatCard label="Active Clients" value={activeClients} hint="Currently engaged" accent="success" icon={UsersIcon} />
        <StatCard label="Completed Projects" value={completedProjects} hint="Tasks delivered" accent="warning" icon={CheckCircle2} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {servicesCatalog.map((cat) => {
          const color = categoryAccent[cat.name] ?? "oklch(0.52 0.22 285)";
          const isOpen = !!open[cat.name];
          return (
            <div
              key={cat.name}
              className="rounded-xl border border-border bg-card overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <button
                onClick={() => setOpen((s) => ({ ...s, [cat.name]: !s[cat.name] }))}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/40 transition text-left"
              >
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in oklab, ${color} 15%, transparent)`, color }}
                >
                  <Layers className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">{cat.items.length} services</div>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-border/60">
                  <ul className="grid gap-1.5 sm:grid-cols-2 mt-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-foreground/80">
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}