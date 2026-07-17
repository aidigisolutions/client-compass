import { useSyncExternalStore } from "react";

export type TaskStatus = "todo" | "in_progress" | "completed";

export interface Task {
  id: string;
  clientId: string;
  serviceId: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  status: TaskStatus;
  createdAt: string;
}

export interface Service {
  id: string;
  clientId: string;
  name: string;
  color: string;
}

export interface Note {
  id: string;
  clientId: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  monthlyPackage?: string;
  renewalDate?: string;
  assignedEmployee?: string;
  clientNotes?: string;
  status: "active" | "paused" | "archived";
  startDate: string;
  avatarColor: string;
}

export interface CrmState {
  clients: Client[];
  services: Service[];
  tasks: Task[];
  notes: Note[];
}

const STORAGE_KEY = "aidigi-crm-state-v2";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildSeed(): CrmState {
  const clientId = "hrishi-tatva";
  const client: Client = {
    id: clientId,
    name: "Hrishi Tatva",
    company: "Hrishi Tatva",
    email: "hrishitatva@gmail.com",
    phone: "+91 8521513057",
    website: "https://hrishitatva.in",
    monthlyPackage: "₹60,000",
    renewalDate: "2026-08-20",
    assignedEmployee: "Megha Kumari",
    clientNotes: "Monthly Digital Marketing Client.",
    status: "active",
    startDate: "2026-07-20",
    avatarColor: "oklch(0.62 0.22 290)",
  };

  const serviceDefs = [
    { name: "Shopify Website Management", color: "oklch(0.65 0.19 155)" },
    { name: "Amazon Account Management", color: "oklch(0.7 0.2 55)" },
    { name: "Social Media Management", color: "oklch(0.62 0.22 320)" },
    { name: "Meta Ads Management", color: "oklch(0.58 0.22 260)" },
    { name: "Google Business Profile Management", color: "oklch(0.72 0.18 90)" },
    { name: "Monthly Marketing Strategy", color: "oklch(0.62 0.2 200)" },
  ];
  const services: Service[] = serviceDefs.map((s) => ({
    id: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    clientId,
    name: s.name,
    color: s.color,
  }));

  const shopifyId = services[0].id;
  const shopifyTasksByDay: string[][] = [
    ["Kickoff & requirements gathering", "Collect brand assets & references", "Set up Shopify store account"],
    ["Choose & install theme", "Configure store settings & currency", "Set up domain and DNS"],
    ["Create product categories", "Add first 10 products with images", "Write product descriptions"],
    ["Design homepage hero section", "Build featured collections layout", "Add testimonials section"],
    ["Build About page", "Build Contact page with form", "Set up FAQ page"],
    ["Configure payment gateway", "Set up shipping zones & rates", "Configure tax settings"],
    ["Add remaining products", "Optimize product images", "Set up product variants"],
    ["Install essential apps", "Set up abandoned cart recovery", "Configure email notifications"],
    ["Mobile responsiveness testing", "Cross-browser QA", "Fix layout bugs"],
    ["Set up Google Analytics 4", "Install Meta Pixel", "Add Google Search Console"],
    ["SEO on-page optimization", "Add meta titles & descriptions", "Generate sitemap.xml"],
    ["Final QA walkthrough", "Client review call", "Launch store live"],
  ];

  const tasks: Task[] = [];
  const start = new Date("2026-07-20T00:00:00");
  shopifyTasksByDay.forEach((dayTasks, dayOffset) => {
    const d = new Date(start);
    d.setDate(start.getDate() + dayOffset);
    dayTasks.forEach((title, i) => {
      const status: TaskStatus =
        dayOffset < 3 ? "completed" : dayOffset === 3 ? (i === 0 ? "completed" : "in_progress") : "todo";
      tasks.push({
        id: uid(),
        clientId,
        serviceId: shopifyId,
        title,
        date: iso(d),
        status,
        createdAt: new Date().toISOString(),
      });
    });
  });

  const notes: Note[] = [
    {
      id: uid(),
      clientId,
      title: "Engagement summary",
      body: "Monthly Digital Marketing Client. Package ₹60,000/month covering Shopify, Amazon, Social Media, Meta Ads, GBP, and Monthly Marketing Strategy.",
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      clientId,
      title: "Renewal reminder",
      body: "Project started 20 July 2026. Renewal due 20 August 2026. Assigned: Megha Kumari.",
      createdAt: new Date().toISOString(),
    },
  ];

  return { clients: [client], services, tasks, notes };
}

function load(): CrmState {
  if (typeof window === "undefined") return buildSeed();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = buildSeed();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as CrmState;
  } catch {
    return buildSeed();
  }
}

let state: CrmState = typeof window === "undefined" ? buildSeed() : load();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  listeners.forEach((l) => l());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return state;
}

export function useCrm() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const crm = {
  reset() {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    state = load();
    persist();
  },
  updateTaskStatus(id: string, status: TaskStatus) {
    state = { ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)) };
    persist();
  },
  toggleTaskComplete(id: string) {
    state = {
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t,
      ),
    };
    persist();
  },
  addTask(input: Omit<Task, "id" | "createdAt" | "status"> & { status?: TaskStatus }) {
    const task: Task = {
      id: uid(),
      createdAt: new Date().toISOString(),
      status: input.status ?? "todo",
      ...input,
    };
    state = { ...state, tasks: [task, ...state.tasks] };
    persist();
  },
  deleteTask(id: string) {
    state = { ...state, tasks: state.tasks.filter((t) => t.id !== id) };
    persist();
  },
  addNote(input: Omit<Note, "id" | "createdAt">) {
    const note: Note = { id: uid(), createdAt: new Date().toISOString(), ...input };
    state = { ...state, notes: [note, ...state.notes] };
    persist();
  },
  deleteNote(id: string) {
    state = { ...state, notes: state.notes.filter((n) => n.id !== id) };
    persist();
  },
  addClient(input: Omit<Client, "id">) {
    const client: Client = { id: uid(), ...input };
    state = { ...state, clients: [...state.clients, client] };
    persist();
  },
};

// Auth (MVP, client-side only)
const AUTH_KEY = "aidigi-crm-auth";
export const auth = {
  isAuthed(): boolean {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(AUTH_KEY) === "yes";
  },
  login(email: string, password: string): boolean {
    if (email && password.length >= 4) {
      window.localStorage.setItem(AUTH_KEY, "yes");
      return true;
    }
    return false;
  },
  logout() {
    window.localStorage.removeItem(AUTH_KEY);
  },
};