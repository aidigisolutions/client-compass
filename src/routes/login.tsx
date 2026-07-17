import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/crm-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AI DiGi Solutions CRM" },
      { name: "description", content: "Sign in to your AI DiGi Solutions CRM workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@aidigi.co");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && auth.isAuthed()) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (auth.login(email, password)) {
      navigate({ to: "/dashboard", replace: true });
    } else {
      setError("Please enter a valid email and password (min 4 chars).");
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left: brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)",
        }} />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            <Sparkles className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight">AI DiGi Solutions</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">Agency CRM</div>
          </div>
        </div>
        <div className="relative space-y-6 max-w-md">
          <h2 className="text-5xl font-bold leading-[1.05] tracking-tight">
            Run your agency like a product team.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            One workspace for every client, every service line, every task — from Shopify launches to paid media performance.
          </p>
          <div className="flex gap-6 pt-4">
            {["Clients", "Services", "Tasks", "Reports"].map((k) => (
              <div key={k} className="text-[11px] uppercase tracking-[0.18em] text-white/70">{k}</div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-white/60">© 2026 AI DiGi Solutions</div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-sm font-bold">AI DiGi Solutions</div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your CRM workspace.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>
            {error && <div className="text-xs text-destructive">{error}</div>}
            <Button type="submit" className="w-full h-11 text-sm font-semibold" style={{ background: "var(--gradient-primary)" }}>
              Sign in to CRM
            </Button>
            <p className="text-[11px] text-muted-foreground text-center pt-2">
              Demo credentials pre-filled. Any email + 4+ char password works.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}