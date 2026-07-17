import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useCrm, crm, type TaskStatus } from "@/lib/crm-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Tasks — AI DiGi CRM" }] }),
  component: TasksBoard,
});

function TasksBoard() {
  const state = useCrm();
  const [filter, setFilter] = useState<"all" | string>("all");

  const filtered = useMemo(() => {
    return filter === "all" ? state.tasks : state.tasks.filter((t) => t.serviceId === filter);
  }, [state.tasks, filter]);

  const cols: { status: TaskStatus; title: string; accent: string }[] = [
    { status: "todo", title: "To Do", accent: "oklch(0.5 0.03 260)" },
    { status: "in_progress", title: "In Progress", accent: "oklch(0.55 0.16 75)" },
    { status: "completed", title: "Completed", accent: "oklch(0.45 0.17 155)" },
  ];

  return (
    <AppShell title="Tasks" subtitle="Kanban view across every service and client.">
      <div className="mb-5 flex flex-wrap gap-1.5">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>All services</FilterChip>
        {state.services.map((s) => (
          <FilterChip key={s.id} active={filter === s.id} onClick={() => setFilter(s.id)} color={s.color}>
            {s.name}
          </FilterChip>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {cols.map((col) => {
          const items = filtered.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="rounded-xl bg-card border border-border p-4" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: col.accent }} />
                  <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: col.accent }}>{col.title}</h3>
                </div>
                <span className="text-xs text-muted-foreground">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((t) => {
                  const service = state.services.find((s) => s.id === t.serviceId);
                  const client = state.clients.find((c) => c.id === t.clientId);
                  return (
                    <div key={t.id} className="group rounded-md border border-border bg-background p-3 hover:border-primary/40 transition">
                      <div className="flex items-start gap-2">
                        <Checkbox checked={t.status === "completed"} onCheckedChange={() => crm.toggleTaskComplete(t.id)} className="mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <div className={`text-sm font-medium ${t.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                          <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: (service?.color ?? "#888") + "22", color: service?.color }}>{service?.name}</span>
                            <span className="text-[10px] text-muted-foreground">· {client?.name}</span>
                            <span className="text-[10px] text-muted-foreground">· {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          </div>
                        </div>
                        <button onClick={() => crm.deleteTask(t.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-2 flex gap-1">
                        {(["todo", "in_progress", "completed"] as TaskStatus[]).filter(s => s !== t.status).map((s) => (
                          <button
                            key={s}
                            onClick={() => crm.updateTaskStatus(t.id, s)}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition"
                          >
                            → {s === "in_progress" ? "In progress" : s === "todo" ? "To do" : "Done"}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {items.length === 0 && <div className="text-[11px] text-muted-foreground text-center py-6">No tasks</div>}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}

function FilterChip({ active, onClick, children, color }: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border transition ${active ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
    >
      {color && <span className="inline-block h-1.5 w-1.5 rounded-full mr-1.5 align-middle" style={{ background: color }} />}
      {children}
    </button>
  );
}