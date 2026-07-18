import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wallet,
  CalendarDays,
  RefreshCw,
  UserCircle2,
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  History,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { AppShell, StatCard } from "@/components/app-shell";
import { useCrm } from "@/lib/crm-store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/package")({
  head: () => ({ meta: [{ title: "Client Package — AI DiGi CRM" }] }),
  component: PackagePage,
});

const PACKAGE = {
  clientId: "hrishi-tatva",
  name: "Premium Digital Marketing Package",
  value: "₹60,000",
  currency: "INR",
  start: "2026-07-20",
  end: "2026-08-20",
  assignedEmployee: "Megha Kumari",
  status: "Active" as const,
  paymentStatus: "Paid" as const,
  invoiceStatus: "Sent" as const,
  invoiceNo: "AID-2026-0720",
  services: [
    "Shopify Website Management",
    "Amazon Account Management",
    "Meta Ads Management",
    "Social Media Management",
    "Google Business Profile Management",
    "Monthly Marketing Strategy",
  ],
  history: [
    { period: "Jun 2026 – Jul 2026", value: "₹60,000", status: "Completed" },
    { period: "May 2026 – Jun 2026", value: "₹60,000", status: "Completed" },
  ],
};

const SETUP = {
  status: "In Progress" as const,
  description:
    "The website is currently under development and needs to be professionally completed before starting monthly maintenance. This section represents all one-time implementation work.",
  charge: "₹45,000",
  startDate: "2026-07-20",
  expectedCompletion: "2026-08-15",
  paymentStatus: "50% Advance Received",
  clientApproval: "Pending Final Sign-off",
  completion: 40,
  remarks: "Shopify theme configured. Products and payment gateway pending.",
};

const RECURRING = {
  status: "Not Started" as const,
  description:
    "Monthly management will begin only after the One-Time Setup Project has been completed and approved. This section represents recurring monthly digital marketing services.",
  monthlyPackage: "₹60,000 / Month",
  monthlyStart: "2026-08-20",
  renewalDate: "2026-09-20",
  progress: 0,
  monthlyReport: "Not yet generated",
  monthlyPerformance: "Awaiting kickoff",
  paymentStatus: "Not Started",
};

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

function PackagePage() {
  const state = useCrm();
  const client = state.clients.find((c) => c.id === PACKAGE.clientId);

  const today = new Date();
  const start = new Date(PACKAGE.start);
  const end = new Date(PACKAGE.end);
  const totalDays = Math.max(1, daysBetween(start, end));
  const elapsed = Math.min(totalDays, Math.max(0, daysBetween(start, today)));
  const remaining = Math.max(0, daysBetween(today, end));
  const progress = Math.round((elapsed / totalDays) * 100);

  const clientTasks = state.tasks.filter((t) => t.clientId === PACKAGE.clientId);
  const totalTasks = clientTasks.length;
  const doneTasks = clientTasks.filter((t) => t.status === "completed").length;
  const workProgress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <AppShell
      title="Client Package"
      subtitle={client ? `${client.name} — ${PACKAGE.name}` : PACKAGE.name}
      action={
        <Button className="gap-2" style={{ background: "var(--gradient-primary)" }}>
          <RefreshCw className="h-4 w-4" /> Renew Package
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Package Value" value={PACKAGE.value} hint="Per month" accent="primary" icon={Wallet} />
        <StatCard label="Duration" value={`${totalDays} days`} hint={`${PACKAGE.start} → ${PACKAGE.end}`} accent="info" icon={CalendarDays} />
        <StatCard label="Days Remaining" value={remaining} hint={`${elapsed} of ${totalDays} elapsed`} accent="warning" icon={Clock} />
        <StatCard label="Renewal Date" value="20 Aug" hint="2026" accent="success" icon={RefreshCw} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Overview */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg flex items-center justify-center text-white" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Active Package</div>
                <div className="text-lg font-bold">{PACKAGE.name}</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.65_0.17_155_/_0.15)] text-[oklch(0.45_0.17_155)] px-2.5 py-1 text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.5_0.17_155)]" /> {PACKAGE.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoRow icon={UserCircle2} label="Assigned Employee" value={PACKAGE.assignedEmployee} />
            <InfoRow icon={CreditCard} label="Payment Status" value={PACKAGE.paymentStatus} tone="success" />
            <InfoRow icon={FileText} label="Invoice" value={`${PACKAGE.invoiceStatus} · ${PACKAGE.invoiceNo}`} />
            <InfoRow icon={CalendarDays} label="Renewal" value="20 August 2026" />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium">Package Progress</span>
              <span className="text-muted-foreground">{progress}% · {remaining} days left</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "var(--gradient-primary)" }} />
            </div>

            <div className="flex items-center justify-between text-xs mb-2 mt-5">
              <span className="font-medium">Work Completion</span>
              <span className="text-muted-foreground">{doneTasks}/{totalTasks} tasks</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${workProgress}%`, background: "oklch(0.65 0.17 155)" }} />
            </div>
          </div>
        </div>

        {/* Included services */}
        <div className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-base font-semibold">Included Services</h2>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">{PACKAGE.services.length} services in this package</p>
          <ul className="space-y-2">
            {PACKAGE.services.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[oklch(0.5_0.17_155)] mt-0.5 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          {client && (
            <Link
              to="/clients/$clientId"
              params={{ clientId: client.id }}
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Open workspace <ArrowUpRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Package Structure: two sections */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Section 1: One-Time Project Setup */}
        <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Section 1</div>
              <h2 className="text-lg font-bold mt-0.5">One-Time Project Setup</h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.7_0.16_75_/_0.18)] text-[oklch(0.45_0.16_75)] px-2.5 py-1 text-[11px] font-semibold">
              <Clock className="h-3 w-3" /> {SETUP.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{SETUP.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <PkgField label="One-Time Setup Charge" value={SETUP.charge} />
            <PkgField label="Payment Status" value={SETUP.paymentStatus} />
            <PkgField label="Setup Start Date" value={new Date(SETUP.startDate).toLocaleDateString()} />
            <PkgField label="Expected Completion" value={new Date(SETUP.expectedCompletion).toLocaleDateString()} />
            <PkgField label="Client Approval" value={SETUP.clientApproval} />
            <PkgField label="Setup Progress" value={`${SETUP.completion}%`} />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium">Setup Completion</span>
              <span className="text-muted-foreground">{SETUP.completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${SETUP.completion}%`, background: "var(--gradient-primary)" }} />
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Remarks</div>
            <div className="text-xs">{SETUP.remarks}</div>
          </div>
        </section>

        {/* Section 2: Recurring Monthly Management */}
        <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Section 2</div>
              <h2 className="text-lg font-bold mt-0.5">Recurring Monthly Management</h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[11px] font-semibold">
              <Clock className="h-3 w-3" /> {RECURRING.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{RECURRING.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <PkgField label="Monthly Package" value={RECURRING.monthlyPackage} />
            <PkgField label="Payment Status" value={RECURRING.paymentStatus} />
            <PkgField label="Monthly Start Date" value={new Date(RECURRING.monthlyStart).toLocaleDateString()} />
            <PkgField label="Renewal Date" value={new Date(RECURRING.renewalDate).toLocaleDateString()} />
            <PkgField label="Monthly Report" value={RECURRING.monthlyReport} />
            <PkgField label="Monthly Performance" value={RECURRING.monthlyPerformance} />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium">Monthly Progress</span>
              <span className="text-muted-foreground">{RECURRING.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${RECURRING.progress}%`, background: "oklch(0.65 0.17 155)" }} />
            </div>
          </div>
        </section>
      </div>

      {/* History */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base font-semibold">Package History</h2>
        </div>
        <div className="divide-y divide-border/60">
          {PACKAGE.history.map((h) => (
            <div key={h.period} className="flex items-center justify-between py-3 text-sm">
              <div>
                <div className="font-medium">{h.period}</div>
                <div className="text-xs text-muted-foreground">{PACKAGE.name}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{h.value}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">{h.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "success";
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2.5">
      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className={`text-sm font-semibold truncate ${tone === "success" ? "text-[oklch(0.45_0.17_155)]" : ""}`}>{value}</div>
      </div>
    </div>
  );
}

function PkgField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
    </div>
  );
}