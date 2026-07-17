import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useCrm, crm } from "@/lib/crm-store";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar — AI DiGi CRM" }] }),
  component: CalendarPage,
});

function CalendarPage() {
  const state = useCrm();
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selected, setSelected] = useState<string>(new Date().toISOString().slice(0, 10));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7) cells.push(null);

  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const tasksByDate = state.tasks.reduce<Record<string, typeof state.tasks>>((acc, t) => {
    (acc[t.date] ||= []).push(t);
    return acc;
  }, {});

  const selectedTasks = tasksByDate[selected] ?? [];

  return (
    <AppShell title="Calendar" subtitle="Plan and review daily work across all clients.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">
              {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <div className="flex items-center gap-1">
              <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="p-1.5 rounded-md hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setCursor(new Date())} className="text-xs px-2 py-1 rounded-md hover:bg-muted">Today</button>
              <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="p-1.5 rounded-md hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="text-center py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i} className="aspect-square" />;
              const key = iso(d);
              const dayTasks = tasksByDate[key] ?? [];
              const done = dayTasks.filter((t) => t.status === "completed").length;
              const isToday = key === new Date().toISOString().slice(0, 10);
              const isSelected = key === selected;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(key)}
                  className={`aspect-square rounded-md border p-1.5 flex flex-col items-start text-left transition ${
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className={`text-xs font-semibold ${isToday ? "text-primary" : ""}`}>{d.getDate()}</span>
                  {dayTasks.length > 0 && (
                    <div className="mt-auto flex items-center gap-1 flex-wrap">
                      {dayTasks.slice(0, 3).map((t) => {
                        const svc = state.services.find((s) => s.id === t.serviceId);
                        return <span key={t.id} className="h-1.5 w-1.5 rounded-full" style={{ background: svc?.color, opacity: t.status === "completed" ? 0.4 : 1 }} />;
                      })}
                      {dayTasks.length > 3 && <span className="text-[9px] text-muted-foreground">+{dayTasks.length - 3}</span>}
                    </div>
                  )}
                  {dayTasks.length > 0 && (
                    <span className="text-[9px] text-muted-foreground mt-0.5">{done}/{dayTasks.length}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 h-fit" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected</div>
          <h3 className="mt-1 text-lg font-bold">
            {new Date(selected).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h3>
          <div className="mt-4 space-y-1">
            {selectedTasks.length === 0 && <div className="text-sm text-muted-foreground py-4">No tasks on this day.</div>}
            {selectedTasks.map((t) => {
              const svc = state.services.find((s) => s.id === t.serviceId);
              return (
                <div key={t.id} className="flex items-start gap-2 rounded-md px-2 py-2 hover:bg-muted/60">
                  <Checkbox checked={t.status === "completed"} onCheckedChange={() => crm.toggleTaskComplete(t.id)} className="mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-medium ${t.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                    <div className="text-[10px] mt-0.5 font-medium" style={{ color: svc?.color }}>{svc?.name}</div>
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