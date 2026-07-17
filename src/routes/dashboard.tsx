import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, ListTodo, TrendingUp, ArrowUpRight, Circle } from "lucide-react";
import { AppShell, StatCard } from "@/components/app-shell";
import { useCrm, crm } from "@/lib/crm-store";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AI DiGi CRM" }] }),
  component: Dashboard,
});

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function Dashboard() {
  const state = useCrm();
  const today = todayStr();
  const todaysTasks = state.tasks.filter((t) => t.date === today);
  const completed = state.tasks.filter((t) => t.status === "completed");
  const pending = state.tasks.filter((t) => t.status !== "completed");
  const inProgress = state.tasks.filter((t) => t.status === "in_progress");

  // monthly progress: tasks in current month
  const monthPrefix = today.slice(0, 7);
  const monthTasks = state.tasks.filter((t) => t.date.startsWith(monthPrefix));
  const monthCompleted = monthTasks.filter((t) => t.status === "completed").length;
  const monthPct = monthTasks.length ? Math.round((monthCompleted / monthTasks.length) * 100) : 0;

  const upcoming = [...state.tasks]
    .filter((t) => t.date >= today && t.status !== "completed")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <AppShell title="Dashboard" subtitle={`Welcome back. Here's your agency at a glance — ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}.`}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Tasks" value={todaysTasks.length} hint={`${todaysTasks.filter(t => t.status === "completed").length} done`} accent="primary" icon={ListTodo} />
        <StatCard label="Completed" value={completed.length} hint="All time" accent="success" icon={CheckCircle2} />
        <StatCard label="Pending" value={pending.length} hint={`${inProgress.length} in progress`} accent="warning" icon={Clock} />
        <StatCard label="Monthly Progress" value={`${monthPct}%`} hint={`${monthCompleted} / ${monthTasks.length} tasks`} accent="info" icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Today's tasks */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold">Today's Tasks</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Scheduled for {new Date().toLocaleDateString()}</p>
            </div>
            <Link to="/tasks" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {todaysTasks.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No tasks scheduled for today. Enjoy the calm.
            </div>
          ) : (
            <ul className="space-y-1">
              {todaysTasks.map((t) => {
                const service = state.services.find((s) => s.id === t.serviceId);
                return (
                  <li key={t.id} className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/60 transition group">
                    <Checkbox checked={t.status === "completed"} onCheckedChange={() => crm.toggleTaskComplete(t.id)} className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-medium truncate ${t.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: service?.color + "22", color: service?.color }}>
                          <Circle className="h-1.5 w-1.5 fill-current" /> {service?.name}
                        </span>
                        <StatusBadge status={t.status} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Monthly progress by service */}
        <div className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-base font-semibold">Monthly Progress</h2>
          <p className="text-xs text-muted-foreground mt-0.5 mb-5">By service — {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          <div className="space-y-4">
            {state.services.map((s) => {
              const svcMonth = monthTasks.filter((t) => t.serviceId === s.id);
              const done = svcMonth.filter((t) => t.status === "completed").length;
              const pct = svcMonth.length ? Math.round((done / svcMonth.length) * 100) : 0;
              if (svcMonth.length === 0) return null;
              return (
                <div key={s.id}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground">{done}/{svcMonth.length}</span>
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

      {/* Upcoming */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="text-base font-semibold mb-4">Upcoming</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {upcoming.map((t) => {
            const service = state.services.find((s) => s.id === t.serviceId);
            return (
              <div key={t.id} className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2.5">
                <div className="flex flex-col items-center justify-center h-10 w-10 rounded-md bg-muted shrink-0">
                  <span className="text-[9px] font-medium uppercase text-muted-foreground">{new Date(t.date).toLocaleDateString("en-US", { month: "short" })}</span>
                  <span className="text-sm font-bold leading-none">{new Date(t.date).getDate()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{t.title}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{service?.name}</div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

export function StatusBadge({ status }: { status: "todo" | "in_progress" | "completed" }) {
  const map = {
    todo: { label: "To Do", cls: "bg-muted text-muted-foreground" },
    in_progress: { label: "In Progress", cls: "bg-[oklch(0.78_0.16_75_/_0.15)] text-[oklch(0.5_0.16_75)]" },
    completed: { label: "Completed", cls: "bg-[oklch(0.65_0.17_155_/_0.15)] text-[oklch(0.45_0.17_155)]" },
  } as const;
  const s = map[status];
  return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${s.cls}`}>{s.label}</span>;
}