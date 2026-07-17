import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useCrm, crm } from "@/lib/crm-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Notes — AI DiGi CRM" }] }),
  component: NotesPage,
});

function NotesPage() {
  const state = useCrm();
  const [clientId, setClientId] = useState(state.clients[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function add() {
    if (!title.trim() || !clientId) return;
    crm.addNote({ clientId, title: title.trim(), body: body.trim() });
    setTitle(""); setBody("");
  }

  const notes = state.notes.filter((n) => !clientId || n.clientId === clientId);

  return (
    <AppShell title="Notes" subtitle="Meeting notes, decisions, and context per client.">
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="rounded-xl border border-border bg-card p-6 h-fit" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="text-sm font-semibold mb-4">New note</h3>
          <div className="space-y-3">
            <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm">
              {state.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Write your note…" rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
            <Button onClick={add} className="w-full gap-1.5" style={{ background: "var(--gradient-primary)" }}><Plus className="h-4 w-4" /> Save note</Button>
          </div>
        </div>

        <div className="space-y-3">
          {notes.length === 0 && <div className="text-sm text-muted-foreground text-center py-16 rounded-xl border border-dashed border-border">No notes yet for this client.</div>}
          {notes.map((n) => {
            const client = state.clients.find((c) => c.id === n.clientId);
            return (
              <div key={n.id} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-semibold">{n.title}</h4>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{client?.name} · {new Date(n.createdAt).toLocaleDateString()}</div>
                  </div>
                  <button onClick={() => crm.deleteNote(n.id)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {n.body && <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">{n.body}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}