import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import { AppShell } from "@/components/app-shell";
import { useCrm, crm, type TaskStatus } from "@/lib/crm-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Mail, Phone, Building2, CalendarDays, Trash2, ArrowLeft, Globe, Wallet, RefreshCw, UserCircle2 } from "lucide-react";
import { StatusBadge } from "./dashboard";

export const Route = createFileRoute("/clients/$clientId")({
  head: () => ({ meta: [{ title: "Client — AI DiGi CRM" }] }),
  component: ClientDetail,
});

function ClientDetail() {
  const { clientId } = Route.useParams();
  const state = useCrm();
  const navigate = useNavigate();
  const client = state.clients.find((c) => c.id === clientId);
  const services = state.services.filter((s) => s.clientId === clientId);
  const [activeService, setActiveService] = useState<string>(services[0]?.id ?? "");
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));

  if (!client) {
    return (
      <AppShell title="Client not found">
        <Link to="/clients" className="text-primary text-sm">← Back to clients</Link>
      </AppShell>
    );
  }

  const svcTasks = state.tasks
    .filter((t) => t.clientId === client.id && t.serviceId === activeService)
    .sort((a, b) => a.date.localeCompare(b.date));

  const monthPrefix = new Date().toISOString().slice(0, 7);
  const monthTasks = state.tasks.filter((t) => t.clientId === client.id && t.date.startsWith(monthPrefix));
  const monthDone = monthTasks.filter((t) => t.status === "completed").length;

  const grouped = svcTasks.reduce<Record<string, typeof svcTasks>>((acc, t) => {
    (acc[t.date] ||= []).push(t);
    return acc;
  }, {});

  function handleAdd() {
    if (!newTask.trim() || !activeService) return;
    crm.addTask({ clientId: client!.id, serviceId: activeService, title: newTask.trim(), date: newDate });
    setNewTask("");
  }

  return (
    <AppShell
      title={client.name}
      subtitle={`${services.length} services · Started ${new Date(client.startDate).toLocaleDateString()}`}
      action={
        <Button variant="outline" size="sm" onClick={() => navigate({ to: "/clients" })} className="gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" /> All clients
        </Button>
      }
    >
      {/* Client info card */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0" style={{ background: "var(--gradient-primary)" }}>
              {client.name.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{client.name}</h2>
                <span className="text-[10px] uppercase font-medium tracking-wider px-1.5 py-0.5 rounded bg-[oklch(0.65_0.17_155_/_0.15)] text-[oklch(0.45_0.17_155)]">{client.status}</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
                <InfoRow icon={Mail} label={client.email ?? "—"} />
                <InfoRow icon={Phone} label={client.phone ?? "—"} />
                <InfoRow icon={Building2} label={client.company ?? "—"} />
                <InfoRow icon={Globe} label={client.website ?? "—"} />
                <InfoRow icon={Wallet} label={client.monthlyPackage ? `${client.monthlyPackage} / month` : "—"} />
                <InfoRow icon={UserCircle2} label={client.assignedEmployee ?? "—"} />
                <InfoRow icon={CalendarDays} label={`Since ${new Date(client.startDate).toLocaleDateString()}`} />
                <InfoRow icon={RefreshCw} label={client.renewalDate ? `Renews ${new Date(client.renewalDate).toLocaleDateString()}` : "—"} />
              </div>
              {client.clientNotes && (
                <p className="mt-4 text-xs text-muted-foreground border-t border-border pt-3">{client.clientNotes}</p>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border p-6 text-white overflow-hidden relative" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
          <div className="text-xs uppercase tracking-widest text-white/70">This month</div>
          <div className="mt-2 text-4xl font-bold">{monthDone}<span className="text-lg text-white/70">/{monthTasks.length}</span></div>
          <div className="mt-1 text-sm text-white/80">Tasks completed</div>
          <div className="mt-4 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${monthTasks.length ? (monthDone/monthTasks.length)*100 : 0}%` }} />
          </div>
        </div>
      </div>

      {/* Services & tasks */}
      <div className="rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="border-b border-border p-6 pb-0">
          <h3 className="text-base font-semibold">Services & Daily Tasks</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">Track daily work per service line.</p>
          <Tabs value={activeService} onValueChange={setActiveService}>
            <TabsList className="h-auto flex-wrap justify-start bg-transparent p-0 gap-1">
              {services.map((s) => {
                const tCount = state.tasks.filter((t) => t.serviceId === s.id).length;
                return (
                  <TabsTrigger
                    key={s.id}
                    value={s.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-xs font-medium"
                  >
                    <span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ background: s.color }} />
                    {s.name} <span className="ml-1 opacity-60">{tCount}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6">
          {/* Add task */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <Input placeholder="Add a task…" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} className="flex-1" />
            <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="sm:w-44" />
            <Button onClick={handleAdd} className="gap-1.5" style={{ background: "var(--gradient-primary)" }}><Plus className="h-4 w-4" /> Add</Button>
          </div>

          {/* Kanban-style columns */}
          <div className="grid gap-4 lg:grid-cols-3 mb-8">
            {(["todo", "in_progress", "completed"] as TaskStatus[]).map((status) => {
              const items = svcTasks.filter((t) => t.status === status);
              const meta = {
                todo: { title: "To Do", accent: "oklch(0.5 0.03 260)" },
                in_progress: { title: "In Progress", accent: "oklch(0.55 0.16 75)" },
                completed: { title: "Completed", accent: "oklch(0.45 0.17 155)" },
              }[status];
              return (
                <div key={status} className="rounded-lg bg-muted/40 p-3">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: meta.accent }} />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: meta.accent }}>{meta.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((t) => (
                      <div key={t.id} className="group bg-card rounded-md border border-border p-3">
                        <div className="text-sm font-medium">{t.title}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <div className="flex items-center gap-1">
                            <select
                              value={t.status}
                              onChange={(e) => crm.updateTaskStatus(t.id, e.target.value as TaskStatus)}
                              className="text-[10px] bg-transparent border border-border rounded px-1 py-0.5"
                            >
                              <option value="todo">To Do</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                            <button onClick={() => crm.deleteTask(t.id)} className="p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {items.length === 0 && <div className="text-[11px] text-muted-foreground text-center py-4">Nothing here</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily grouped checklist */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Daily checklist</h4>
            <div className="space-y-4">
              {Object.entries(grouped).map(([date, items]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs font-semibold text-foreground">
                      {new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                    </div>
                    <div className="flex-1 border-t border-dashed border-border" />
                    <div className="text-[10px] text-muted-foreground">
                      {items.filter((i) => i.status === "completed").length}/{items.length}
                    </div>
                  </div>
                  <ul className="space-y-0.5">
                    {items.map((t) => (
                      <li key={t.id} className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/60">
                        <Checkbox checked={t.status === "completed"} onCheckedChange={() => crm.toggleTaskComplete(t.id)} />
                        <span className={`flex-1 text-sm ${t.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{t.title}</span>
                        <StatusBadge status={t.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {Object.keys(grouped).length === 0 && <div className="text-sm text-muted-foreground text-center py-8">No tasks yet for this service.</div>}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function InfoRow({ icon: Icon, label }: { icon: ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
      <span className="truncate text-foreground/80">{label}</span>
    </div>
  );
}