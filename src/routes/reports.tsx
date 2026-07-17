import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatCard } from "@/components/app-shell";
import { useCrm } from "@/lib/crm-store";
import { CheckCircle2, Clock, ListTodo, Users } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — AI DiGi CRM" }] }),
  component: Reports,
});

function Reports() {
  const state = useCrm();
  const total = state.tasks.length;
  const done = state.tasks.filter((t) => t.status === "completed").length;
  const inProg = state.tasks.filter((t) => t.status === "in_progress").length;
  const todo = state.tasks.filter((t) => t.status === "todo").length;

  // last 14 days activity
  const days: { date: string; done: number; total: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const dayTasks = state.tasks.filter((t) => t.date === key);
    days.push({ date: key, done: dayTasks.filter((t) => t.status === "completed").length, total: dayTasks.length });
  }
  const maxTotal = Math.max(1, ...days.map((d) => d.total));

  return (
    <AppShell title="Reports" subtitle="Performance snapshots across clients and services.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Clients" value={state.clients.length} accent="primary" icon={Users} />
        <StatCard label="Completed" value={done} hint={`${total ? Math.round((done/total)*100) : 0}% of total`} accent="success" icon={CheckCircle2} />
        <StatCard label="In Progress" value={inProg} accent="warning" icon={Clock} />
        <StatCard label="Pending" value={todo} accent="info" icon={ListTodo} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-base font-semibold mb-1">Last 14 days</h3>
          <p className="text-xs text-muted-foreground mb-5">Tasks scheduled vs completed each day.</p>
          <div className="flex items-end gap-1.5 h-40">
            {days.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col-reverse gap-0.5 h-full">
                  <div className="rounded-t" style={{ height: `${(d.done / maxTotal) * 100}%`, background: "var(--gradient-primary)" }} />
                  <div className="rounded-t opacity-30" style={{ height: `${((d.total - d.done) / maxTotal) * 100}%`, background: "var(--primary)" }} />
                </div>
                <div className="text-[9px] text-muted-foreground">{new Date(d.date).getDate()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-base font-semibold mb-1">Service breakdown</h3>
          <p className="text-xs text-muted-foreground mb-5">Task distribution by service line.</p>
          <div className="space-y-3">
            {state.services.map((s) => {
              const svcTasks = state.tasks.filter((t) => t.serviceId === s.id);
              const svcDone = svcTasks.filter((t) => t.status === "completed").length;
              const pct = svcTasks.length ? Math.round((svcDone/svcTasks.length)*100) : 0;
              return (
                <div key={s.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                      {s.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{svcDone}/{svcTasks.length} · {pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}