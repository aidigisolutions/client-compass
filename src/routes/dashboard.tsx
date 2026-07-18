import { createFileRoute, Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { CheckCircle2, Clock, ListTodo, TrendingUp, ArrowUpRight, Circle, Wallet, RefreshCw, Users as UsersIcon, Activity, Rocket, Timer, ArrowRight } from "lucide-react";
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

  const activeClients = state.clients.filter((c) => c.status === "active");
  const packageRevenue = "₹60,000";
  const upcomingRenewals = state.clients.filter((c) => {
    if (!c.renewalDate) return false;
    const days = Math.round((new Date(c.renewalDate).getTime() - Date.now()) / 86_400_000);
    return days >= 0 && days <= 45;
  }).length;
  const recentActivity = [...state.tasks]
    .filter((t) => t.status === "completed")
    .slice(0, 5);

  // Shopify one-time setup project overview
  const shopifySvc = state.services.find((s) => s.name === "Shopify Website Management");
  const shopifyTasks = shopifySvc
    ? state.tasks.filter((t) => t.serviceId === shopifySvc.id && (t.taskType ?? "setup") === "setup")
    : [];
  const shopifyDone = shopifyTasks.filter((t) => t.status === "completed").length;
  const shopifyPct = shopifyTasks.length ? Math.round((shopifyDone / shopifyTasks.length) * 100) : 0;
  const shopifyPending = shopifyTasks.length - shopifyDone;
  const projectEnd = new Date("2026-08-08T00:00:00");
  const today0 = new Date(); today0.setHours(0,0,0,0);
  const remainingDays = Math.max(0, Math.ceil((projectEnd.getTime() - today0.getTime()) / 86_400_000));
  const nextTask = [...shopifyTasks]
    .filter((t) => t.status !== "completed")
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <AppShell title="Dashboard" subtitle={`Welcome back. Here's your agency at a glance — ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}.`}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Tasks" value={todaysTasks.length} hint={`${todaysTasks.filter(t => t.status === "completed").length} done`} accent="primary" icon={ListTodo} />
        <StatCard label="Completed" value={completed.length} hint="All time" accent="success" icon={CheckCircle2} />
        <StatCard label="Pending" value={pending.length} hint={`${inProgress.length} in progress`} accent="warning" icon={Clock} />
        <StatCard label="Monthly Progress" value={`${monthPct}%`} hint={`${monthCompleted} / ${monthTasks.length} tasks`} accent="info" icon={TrendingUp} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Clients" value={activeClients.length} hint="Currently engaged" accent="primary" icon={UsersIcon} />
        <StatCard label="Monthly Revenue" value={packageRevenue} hint="Active packages" accent="success" icon={Wallet} />
        <StatCard label="Package Value" value={packageRevenue} hint="Premium Digital Marketing" accent="info" icon={Wallet} />
        <StatCard label="Upcoming Renewals" value={upcomingRenewals} hint="Within 45 days" accent="warning" icon={RefreshCw} />
      </div>

      {/* Shopify One-Time Project Snapshot */}
      {shopifySvc && (
        <div className="mt-6 rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center text-white" style={{ background: "var(--gradient-primary)" }}>
                <Rocket className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold">One-Time Shopify Website Setup</h2>
                <p className="text-xs text-muted-foreground">Hrishi Tatva · 20 Jul → 8 Aug 2026 · {shopifyPct === 100 ? "Completed" : "In Progress"}</p>
              </div>
            </div>
            <Link to="/clients/$clientId" params={{ clientId: "hrishi-tatva" }} className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              Open workspace <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MiniStat icon={TrendingUp} label="Project Progress" value={`${shopifyPct}%`} hint={`${shopifyDone}/${shopifyTasks.length} tasks`} />
            <MiniStat icon={Clock} label="Pending Tasks" value={shopifyPending} hint="Setup backlog" />
            <MiniStat icon={Timer} label="Remaining Days" value={remainingDays} hint="Until 8 Aug 2026" />
            <MiniStat icon={CheckCircle2} label="Completion" value={`${shopifyPct}%`} hint={shopifyPct === 100 ? "Ready to launch" : "Keep going"} />
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${shopifyPct}%`, background: "var(--gradient-primary)" }} />
          </div>
          {nextTask && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed border-border px-3 py-2.5">
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Next Task</div>
                <div className="text-sm font-medium truncate">{nextTask.title}</div>
              </div>
              <span className="text-[11px] text-muted-foreground shrink-0">{new Date(nextTask.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
          )}
        </div>
      )}

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

      {/* Recent activity */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base font-semibold">Recent Activity</h2>
        </div>
        {recentActivity.length === 0 ? (
          <div className="text-sm text-muted-foreground">No completed tasks yet.</div>
        ) : (
          <ul className="space-y-2">
            {recentActivity.map((t) => {
              const service = state.services.find((s) => s.id === t.serviceId);
              return (
                <li key={t.id} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[oklch(0.5_0.17_155)] shrink-0" />
                  <span className="flex-1 truncate">{t.title}</span>
                  <span className="text-[11px] text-muted-foreground truncate">{service?.name}</span>
                  <span className="text-[11px] text-muted-foreground shrink-0">{new Date(t.date).toLocaleDateString()}</span>
                </li>
              );
            })}
          </ul>
        )}
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

function MiniStat({ icon: Icon, label, value, hint }: { icon: ComponentType<{ className?: string }>; label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-lg border border-border/60 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 text-xl font-bold">{value}</div>
      {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}