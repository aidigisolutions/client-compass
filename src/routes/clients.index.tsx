import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useCrm } from "@/lib/crm-store";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/clients/")({
  head: () => ({ meta: [{ title: "Clients — AI DiGi CRM" }] }),
  component: ClientsList,
});

function ClientsList() {
  const state = useCrm();
  return (
    <AppShell
      title="Clients"
      subtitle="Every account, service line, and engagement at a glance."
      action={<Button className="gap-1.5" style={{ background: "var(--gradient-primary)" }}><Plus className="h-4 w-4" /> New client</Button>}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {state.clients.map((c) => {
          const services = state.services.filter((s) => s.clientId === c.id);
          const tasks = state.tasks.filter((t) => t.clientId === c.id);
          const done = tasks.filter((t) => t.status === "completed").length;
          const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
          return (
            <Link
              key={c.id}
              to="/clients/$clientId"
              params={{ clientId: c.id }}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center text-base font-bold text-white shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  {c.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{c.name}</h3>
                    <span className="text-[10px] uppercase font-medium tracking-wider px-1.5 py-0.5 rounded bg-[oklch(0.65_0.17_155_/_0.15)] text-[oklch(0.45_0.17_155)]">{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.email}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {services.slice(0, 4).map((s) => (
                  <span key={s.id} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: s.color + "1e", color: s.color }}>
                    {s.name}
                  </span>
                ))}
                {services.length > 4 && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">+{services.length - 4}</span>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Overall progress</span>
                  <span className="font-medium">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--gradient-primary)" }} />
                </div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{services.length} services</span>
                  <span>·</span>
                  <span>{tasks.length} tasks</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}