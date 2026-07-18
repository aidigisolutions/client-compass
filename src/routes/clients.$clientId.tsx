import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type ComponentType } from "react";
import { AppShell } from "@/components/app-shell";
import { useCrm, crm, type TaskStatus } from "@/lib/crm-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Mail, Phone, Building2, CalendarDays, Trash2, ArrowLeft, Globe, Wallet, RefreshCw, Users, AtSign, Lock, Flame, User as UserIcon, Rocket, Timer } from "lucide-react";
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
  const [activeMode, setActiveMode] = useState<"setup" | "recurring">("setup");
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");

  if (!client) {
    return (
      <AppShell title="Client not found">
        <Link to="/clients" className="text-primary text-sm">← Back to clients</Link>
      </AppShell>
    );
  }

  const activeSvc = services.find((s) => s.id === activeService);
  const isShopify = activeSvc?.name === "Shopify Website Management";
  const shopifySetupTasks = state.tasks.filter((t) => t.clientId === client.id && t.serviceId === activeService && (t.taskType ?? "setup") === "setup");
  const shopifySetupDone = shopifySetupTasks.filter((t) => t.status === "completed").length;
  const shopifySetupPct = shopifySetupTasks.length ? Math.round((shopifySetupDone / shopifySetupTasks.length) * 100) : 0;
  const setupComplete = shopifySetupPct === 100;
  const recurringLocked = isShopify && !setupComplete;

  // Project meta (Shopify)
  const projectStart = new Date("2026-07-20T00:00:00");
  const projectEnd = new Date("2026-08-08T00:00:00");
  const today0 = new Date(); today0.setHours(0,0,0,0);
  const remainingDays = Math.max(0, Math.ceil((projectEnd.getTime() - today0.getTime()) / 86_400_000));

  // Guard: if recurring locked and user is on recurring tab, force setup
  useEffect(() => {
    if (recurringLocked && activeMode === "recurring") setActiveMode("setup");
  }, [recurringLocked, activeMode]);

  const svcTasks = state.tasks
    .filter((t) => {
      if (t.clientId !== client.id || t.serviceId !== activeService) return false;
      const tt = t.taskType ?? "setup";
      return tt === activeMode;
    })
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
    crm.addTask({ clientId: client!.id, serviceId: activeService, title: newTask.trim(), date: newDate, taskType: activeMode });
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
                <InfoRow icon={Building2} label={client.company ?? "—"} />
                <InfoRow icon={Globe} label={client.website ?? "—"} />
                <InfoRow icon={Phone} label={client.phone ?? "—"} />
                <InfoRow icon={Mail} label={client.email ?? "—"} />
                <InfoRow icon={AtSign} label={client.secondaryEmail ?? "—"} />
                <InfoRow icon={Wallet} label={client.monthlyPackage ? `${client.monthlyPackage} / Month` : "—"} />
                <InfoRow icon={CalendarDays} label={`Client Since ${new Date(client.startDate).toLocaleDateString()}`} />
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

      {/* Assigned Team */}
      {client.team && client.team.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 mb-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-base font-semibold">Assigned Team</h3>
            <span className="text-xs text-muted-foreground">· {client.team.length} members</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {client.team.map((m) => {
              const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div key={m.name} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                  <div
                    className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold truncate">{m.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{m.role}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.65_0.17_155_/_0.15)] text-[oklch(0.45_0.17_155)] px-2 py-0.5 text-[10px] font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.5_0.17_155)]" />
                    {m.status ?? "Active"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Services & tasks */}
      <div className="rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="border-b border-border p-6 pb-0">
          <h3 className="text-base font-semibold">Services & Daily Tasks</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">Each service has a One-Time Setup workspace and a Recurring Monthly workspace.</p>
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
          {/* Shopify One-Time Setup banner */}
          {isShopify && (
            <div className="mb-5 grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl border border-border p-5 text-white relative overflow-hidden" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80">
                  <Rocket className="h-3.5 w-3.5" /> One-Time Shopify Website Setup
                </div>
                <h4 className="mt-1 text-xl font-bold">Premium Shopify Launch Project</h4>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <MetaCell label="Start" value="20 Jul 2026" />
                  <MetaCell label="Duration" value="20 Working Days" />
                  <MetaCell label="Status" value={setupComplete ? "Completed" : "In Progress"} />
                  <MetaCell label="Completion" value={`${shopifySetupPct}%`} />
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all" style={{ width: `${shopifySetupPct}%` }} />
                </div>
              </div>
              <div className={`rounded-xl border p-5 ${setupComplete ? "border-[oklch(0.65_0.17_155)] bg-[oklch(0.65_0.17_155_/_0.08)]" : "border-dashed border-border bg-muted/30"}`}>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {setupComplete ? <Rocket className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />} Monthly Management
                </div>
                <div className="mt-1 text-base font-semibold">{setupComplete ? "Unlocked" : "Locked"}</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {setupComplete
                    ? "Recurring monthly tasks are now available."
                    : "Recurring monthly tasks unlock automatically once the One-Time Setup reaches 100% completion."}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Remaining Days:</span>
                  <span className="font-semibold">{remainingDays}</span>
                </div>
              </div>
            </div>
          )}

          {/* Setup vs Recurring workspace tabs */}
          <div className="mb-5 inline-flex rounded-lg border border-border bg-muted/40 p-1">
            {(["setup", "recurring"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  if (mode === "recurring" && recurringLocked) return;
                  setActiveMode(mode);
                }}
                disabled={mode === "recurring" && recurringLocked}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition inline-flex items-center gap-1.5 ${
                  activeMode === mode
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                } ${mode === "recurring" && recurringLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {mode === "recurring" && recurringLocked && <Lock className="h-3 w-3" />}
                {mode === "setup" ? "One-Time Setup" : "Recurring Monthly Tasks"}
              </button>
            ))}
          </div>

          {/* Add task */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <Input
              placeholder={activeMode === "setup" ? "Add a one-time setup task…" : "Add a recurring monthly task…"}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="flex-1"
            />
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
                  <ul className="space-y-1">
                    {items.map((t) => (
                      <li key={t.id} className="rounded-md border border-transparent hover:border-border hover:bg-muted/40 transition">
                        <div className="flex items-center gap-3 px-2 py-1.5">
                          <Checkbox checked={t.status === "completed"} onCheckedChange={() => crm.toggleTaskComplete(t.id)} />
                          <button
                            onClick={() => { setExpanded(expanded === t.id ? null : t.id); setCommentDraft(""); }}
                            className={`flex-1 text-left text-sm ${t.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                          >
                            {t.title}
                          </button>
                          <PriorityChip priority={t.priority} />
                          {t.assignedTo && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                              <UserIcon className="h-3 w-3" /> {t.assignedTo}
                            </span>
                          )}
                          <StatusBadge status={t.status} />
                        </div>
                        {expanded === t.id && (
                          <div className="border-t border-border/60 px-3 py-3 grid gap-3 md:grid-cols-2 bg-muted/30">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Description</div>
                              <p className="text-xs">{t.description ?? "—"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <label className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Priority</span>
                                <select
                                  value={t.priority ?? "medium"}
                                  onChange={(e) => crm.updateTask(t.id, { priority: e.target.value as "low"|"medium"|"high" })}
                                  className="bg-card border border-border rounded px-2 py-1"
                                >
                                  <option value="low">Low</option>
                                  <option value="medium">Medium</option>
                                  <option value="high">High</option>
                                </select>
                              </label>
                              <label className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Assigned</span>
                                <select
                                  value={t.assignedTo ?? ""}
                                  onChange={(e) => crm.updateTask(t.id, { assignedTo: e.target.value })}
                                  className="bg-card border border-border rounded px-2 py-1"
                                >
                                  <option value="">—</option>
                                  {(client.team ?? []).map((m) => (
                                    <option key={m.name} value={m.name}>{m.name}</option>
                                  ))}
                                </select>
                              </label>
                              <label className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Due Date</span>
                                <Input type="date" value={t.date} onChange={(e) => crm.updateTask(t.id, { date: e.target.value })} className="h-8 text-xs" />
                              </label>
                              <label className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Progress: {t.progress ?? 0}%</span>
                                <input
                                  type="range" min={0} max={100} step={5}
                                  value={t.progress ?? 0}
                                  onChange={(e) => crm.updateTask(t.id, { progress: Number(e.target.value) })}
                                />
                              </label>
                            </div>
                            <div className="md:col-span-2">
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Comments</div>
                              <ul className="space-y-1 mb-2">
                                {(t.comments ?? []).map((c) => (
                                  <li key={c.id} className="text-xs bg-card border border-border rounded p-2">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{c.author}</span>
                                      <span className="text-[10px] text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="mt-0.5">{c.body}</div>
                                  </li>
                                ))}
                                {(t.comments ?? []).length === 0 && <li className="text-[11px] text-muted-foreground">No comments yet.</li>}
                              </ul>
                              <div className="flex gap-2">
                                <Input value={commentDraft} onChange={(e) => setCommentDraft(e.target.value)} placeholder="Add a comment…" className="h-8 text-xs" />
                                <Button size="sm" onClick={() => { if (commentDraft.trim()) { crm.addTaskComment(t.id, { author: t.assignedTo ?? "Team", body: commentDraft.trim() }); setCommentDraft(""); } }}>Post</Button>
                              </div>
                              {t.completedAt && (
                                <div className="mt-2 text-[11px] text-muted-foreground">
                                  ✓ Completed by {t.completedBy ?? "—"} on {new Date(t.completedAt).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-white/70">{label}</div>
      <div className="mt-0.5 font-semibold">{value}</div>
    </div>
  );
}

function PriorityChip({ priority }: { priority?: "low" | "medium" | "high" }) {
  if (!priority) return null;
  const map = {
    low: { cls: "bg-muted text-muted-foreground", label: "Low" },
    medium: { cls: "bg-[oklch(0.78_0.16_75_/_0.15)] text-[oklch(0.5_0.16_75)]", label: "Medium" },
    high: { cls: "bg-[oklch(0.7_0.2_25_/_0.15)] text-[oklch(0.5_0.2_25)]", label: "High" },
  } as const;
  const m = map[priority];
  return (
    <span className={`hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${m.cls}`}>
      <Flame className="h-2.5 w-2.5" /> {m.label}
    </span>
  );
}