import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth } from "@/lib/crm-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI DiGi Solutions CRM — Agency Operations Hub" },
      { name: "description", content: "Modern CRM built for AI DiGi Solutions to manage clients, tasks, and campaigns across every service line." },
      { property: "og:title", content: "AI DiGi Solutions CRM" },
      { property: "og:description", content: "Client, task, and campaign management for AI DiGi Solutions." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    navigate({ to: auth.isAuthed() ? "/dashboard" : "/login", replace: true });
  }, [navigate]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-sm text-muted-foreground">{ready ? "Redirecting…" : "Loading…"}</div>
    </div>
  );
}
