import { useSyncExternalStore } from "react";

export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface TaskComment {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface Task {
  id: string;
  clientId: string;
  serviceId: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  status: TaskStatus;
  createdAt: string;
  taskType?: "setup" | "recurring";
  priority?: TaskPriority;
  assignedTo?: string;
  progress?: number; // 0..100
  comments?: TaskComment[];
  attachments?: string[];
  completedBy?: string;
  completedAt?: string;
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
  secondaryEmail?: string;
  phone?: string;
  company?: string;
  website?: string;
  monthlyPackage?: string;
  renewalDate?: string;
  assignedEmployee?: string;
  team?: { name: string; role: string; status?: string }[];
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
const STORAGE_KEY_V3 = "aidigi-crm-state-v3";
const STORAGE_KEY_V4 = "aidigi-crm-state-v4";

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
    email: "support@hrishitatva.in",
    secondaryEmail: "hrishitatva@gmail.com",
    phone: "+91 7834974917",
    website: "https://hrishitatva.in",
    monthlyPackage: "₹60,000",
    renewalDate: "2026-08-20",
    assignedEmployee: "Megha Kumari",
    team: [
      { name: "Megha Kumari", role: "Owner", status: "Active" },
      { name: "Ankit", role: "Marketing Manager", status: "Active" },
      { name: "Kamal", role: "Designer & Developer", status: "Active" },
    ],
    clientNotes: "Monthly Digital Marketing Client.",
    status: "active",
    startDate: "2026-07-20",
    avatarColor: "oklch(0.62 0.22 290)",
  };

  const serviceDefs = [
    { name: "Shopify Website Management", color: "oklch(0.65 0.19 155)" },
    { name: "Amazon Account Management", color: "oklch(0.7 0.2 55)" },
    { name: "Meta Ads Management", color: "oklch(0.58 0.22 260)" },
    { name: "Social Media Management", color: "oklch(0.62 0.22 320)" },
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
  const shopifySchedule: { day: string; title: string; tasks: string[] }[] = [
    { day: "2026-07-20", title: "Website Audit", tasks: ["Homepage Analysis", "Theme Analysis", "Navigation Review", "Collection Review", "Product Review", "Broken Link Check", "Current Performance Analysis"] },
    { day: "2026-07-21", title: "Homepage Layout Improvement", tasks: ["Header Design", "Footer Design", "Announcement Bar", "Sticky Header", "Homepage Banner Review", "Homepage UX Improvements"] },
    { day: "2026-07-22", title: "Collection Optimization", tasks: ["Category Structure", "Product Collections", "Search Optimization", "Product Filters", "Menu Optimization"] },
    { day: "2026-07-23", title: "Product SEO", tasks: ["SEO Titles", "Meta Descriptions", "Image ALT Tags", "URL Optimization", "Internal Linking"] },
    { day: "2026-07-24", title: "Product Images", tasks: ["Lifestyle Images", "Gallery Images", "Image Compression", "Image Naming", "Featured Images"] },
    { day: "2026-07-25", title: "Trust Badges", tasks: ["COD Banner", "Secure Checkout", "WhatsApp Button", "Contact Section", "Support Information"] },
    { day: "2026-07-26", title: "Payment Gateway Testing", tasks: ["Shipping Settings", "COD Testing", "Order Testing", "Checkout Testing", "Email Notification Testing"] },
    { day: "2026-07-27", title: "Meta Pixel Installation", tasks: ["Google Analytics 4", "Google Tag Manager", "Conversion Tracking", "Events Verification"] },
    { day: "2026-07-28", title: "Google Search Console", tasks: ["XML Sitemap", "Robots.txt", "Schema Markup", "Index Verification"] },
    { day: "2026-07-29", title: "Website Speed Optimization", tasks: ["Mobile Optimization", "Desktop Optimization", "App Cleanup", "Performance Testing"] },
    { day: "2026-07-30", title: "FAQ Page", tasks: ["Return Policy", "Shipping Policy", "Privacy Policy", "Terms & Conditions Review"] },
    { day: "2026-07-31", title: "Product Review App", tasks: ["Testimonials", "Customer Reviews", "Social Proof", "Homepage Trust Section"] },
    { day: "2026-08-01", title: "Coupon System", tasks: ["Discount Setup", "Bundle Offers", "Upsell Products", "Cross Sell Products"] },
    { day: "2026-08-02", title: "Blog Setup", tasks: ["Blog Categories", "SEO Blog Structure", "Author Information"] },
    { day: "2026-08-03", title: "Email Marketing Setup", tasks: ["Newsletter Popup", "Abandoned Cart", "Customer Notification"] },
    { day: "2026-08-04", title: "Security Check", tasks: ["Backup Setup", "Spam Protection", "Store Health Check"] },
    { day: "2026-08-05", title: "Final SEO Audit", tasks: ["Performance Audit", "Accessibility Check", "Responsive Testing"] },
    { day: "2026-08-06", title: "Bug Fixing", tasks: ["UI Improvements", "Cross Browser Testing", "Final Optimization"] },
    { day: "2026-08-07", title: "Internal QA", tasks: ["Client Demo Preparation", "Pending Improvements"] },
    { day: "2026-08-08", title: "Final Testing", tasks: ["Final Quality Check", "Client Approval", "Project Delivery"] },
  ];

  const team = ["Megha Kumari", "Ankit", "Kamal"];
  const tasks: Task[] = [];
  shopifySchedule.forEach((day, dayIdx) => {
    // Day header task
    tasks.push({
      id: uid(),
      clientId,
      serviceId: shopifyId,
      title: day.title,
      description: `Day ${dayIdx + 1} focus area — ${day.title}.`,
      date: day.day,
      status: "todo",
      taskType: "setup",
      priority: dayIdx < 10 ? "high" : "medium",
      assignedTo: team[dayIdx % team.length],
      progress: 0,
      comments: [],
      attachments: [],
      createdAt: new Date().toISOString(),
    });
    day.tasks.forEach((sub, i) => {
      tasks.push({
        id: uid(),
        clientId,
        serviceId: shopifyId,
        title: sub,
        description: `${day.title} — ${sub}.`,
        date: day.day,
        status: "todo",
        taskType: "setup",
        priority: i === 0 ? "high" : "medium",
        assignedTo: team[(dayIdx + i) % team.length],
        progress: 0,
        comments: [],
        attachments: [],
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
    // migrate: force reseed for v4 Shopify workflow update
    const raw = window.localStorage.getItem(STORAGE_KEY_V4);
    if (!raw) {
      const seed = buildSeed();
      window.localStorage.setItem(STORAGE_KEY_V4, JSON.stringify(seed));
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY_V3);
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
    window.localStorage.setItem(STORAGE_KEY_V4, JSON.stringify(state));
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
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY_V3);
      window.localStorage.removeItem(STORAGE_KEY_V4);
    }
    state = load();
    persist();
  },
  updateTask(id: string, patch: Partial<Task>) {
    state = { ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) };
    persist();
  },
  updateTaskStatus(id: string, status: TaskStatus) {
    state = {
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              progress: status === "completed" ? 100 : status === "in_progress" ? Math.max(t.progress ?? 0, 25) : t.progress,
              completedAt: status === "completed" ? new Date().toISOString() : undefined,
              completedBy: status === "completed" ? t.assignedTo : undefined,
            }
          : t,
      ),
    };
    persist();
  },
  toggleTaskComplete(id: string) {
    state = {
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "completed" ? "todo" : "completed",
              progress: t.status === "completed" ? 0 : 100,
              completedAt: t.status === "completed" ? undefined : new Date().toISOString(),
              completedBy: t.status === "completed" ? undefined : t.assignedTo,
            }
          : t,
      ),
    };
    persist();
  },
  addTaskComment(id: string, comment: Omit<TaskComment, "id" | "createdAt">) {
    state = {
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === id
          ? { ...t, comments: [...(t.comments ?? []), { id: uid(), createdAt: new Date().toISOString(), ...comment }] }
          : t,
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