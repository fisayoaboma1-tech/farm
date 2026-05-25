"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  LogOut,
  TrendingUp,
  Users,
  X,
  Sun,
  Moon,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Clock,
  Inbox,
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  description: string;
  createdAt: string;
  read: boolean;
}

interface Stats {
  total: number;
  unread: number;
  thisMonth: number;
}

const statConfig = [
  {
    key: "total",
    label: "Total Messages",
    icon: Inbox,
    accent: "text-emerald-400",
    line: "bg-emerald-500",
  },
  {
    key: "thisMonth",
    label: "This Month",
    icon: TrendingUp,
    accent: "text-blue-400",
    line: "bg-blue-500",
  },
  {
    key: "readRate",
    label: "Read Rate",
    icon: Users,
    accent: "text-violet-400",
    line: "bg-violet-500",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState<ContactMessage | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const popupRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) setPopupMessage(null);
      if (confirmRef.current && !confirmRef.current.contains(e.target as Node)) setShowLogoutConfirm(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_darkMode");
      if (stored !== null) setDarkMode(stored === "true");
    }
    fetchMessages();
  }, []);

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("admin_darkMode", String(next));
      return next;
    });
  }

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      const mapped = (data.messages || []).map((m: Record<string, unknown>) => ({
        id: m.id as string,
        name: m.name as string,
        email: m.email as string,
        phone: (m.phone as string) || null,
        subject: m.subject as string,
        description: m.description as string,
        createdAt: (m.created_at as string) || (m.createdAt as string),
        read: Boolean(m.read),
      }));
      setMessages(mapped);
      setStats(data.stats || { total: 0, unread: 0, thisMonth: 0 });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !currentRead }),
      });
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m)));
      setStats((prev) => ({ ...prev, unread: currentRead ? prev.unread + 1 : prev.unread - 1 }));
    } catch {
      // silent
    }
  };

  const confirmLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // silent
    }
    await new Promise((r) => setTimeout(r, 1000));
    if (typeof window !== "undefined") sessionStorage.removeItem("admin_authenticated");
    window.location.href = "/admin/login";
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return `${Math.floor(diff / (1000 * 60))}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!mounted) return null;

  const readRate = stats.total > 0 ? Math.round(((stats.total - stats.unread) / stats.total) * 100) : 0;
  const statValues = {
    total: stats.total,
    unread: stats.unread,
    thisMonth: stats.thisMonth,
    readRate: `${readRate}%`,
  };

  const b = (dark: string, light: string) => (darkMode ? dark : light);
  const totalPages = Math.max(1, Math.ceil(messages.length / itemsPerPage));
  const paginatedMessages = messages.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }
    return pages;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-[#05080C]" : "bg-[#F5F5F7]"}`}>
      {/* ── Ambient gradient orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className={`absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full blur-[300px] transition-opacity duration-1000 ${darkMode ? "opacity-[0.06]" : "opacity-[0.04]"}`}
          style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }} />
        <div className={`absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full blur-[250px] transition-opacity duration-1000 ${darkMode ? "opacity-[0.04]" : "opacity-[0.03]"}`}
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
      </div>

      {/* ── Header ── */}
      <header className={`relative z-10 border-b transition-colors duration-500 ${
        darkMode ? "border-white/[0.04] bg-[#05080C]/80" : "border-black/[0.04] bg-[#F5F5F7]/80"
      } backdrop-blur-2xl`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-500 ${
              darkMode ? "bg-emerald-500/10 ring-1 ring-emerald-500/20" : "bg-emerald-100 ring-1 ring-emerald-200"
            }`}>
              <Sprout className={`h-5 w-5 ${b("text-emerald-400", "text-emerald-600")}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-semibold tracking-tight ${b("text-white", "text-[#1D1D1F]")}`}>Dashboard</span>
              <span className={`text-[10px] font-medium tracking-wider ${b("text-white/25", "text-black/30")}`}>MULIARAYA</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${
              darkMode
                ? "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/70"
                : "border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-black/[0.12] hover:text-black/70"
            }`}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${
                darkMode
                  ? "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                  : "border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-10 sm:pt-14 sm:px-8">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${b("text-white", "text-[#1D1D1F]")}`}>Messages</h1>
          <p className={`mt-2 text-sm ${b("text-white/30", "text-black/40")}`}>Monitor and manage contact form submissions</p>
        </motion.div>

        {/* ── Stats Grid ── */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {statConfig.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                darkMode
                  ? "border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08] hover:bg-white/[0.03]"
                  : "border-black/[0.04] bg-white/60 hover:border-black/[0.08] hover:bg-white/80"
              }`}
            >
              {/* Top accent line */}
              <div className={`absolute left-0 right-0 top-0 h-0.5 ${stat.line} opacity-30`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${b("text-white/30", "text-black/30")}`}>
                    {stat.label}
                  </span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                    darkMode ? "bg-white/[0.04] ring-1 ring-white/[0.06]" : "bg-black/[0.03] ring-1 ring-black/[0.06]"
                  }`}>
                    <stat.icon className={`h-4 w-4 ${stat.accent}`} />
                  </div>
                </div>
                <p className={`text-3xl sm:text-4xl font-bold tracking-tight ${b("text-white", "text-[#1D1D1F]")}`}>
                  {statValues[stat.key as keyof typeof statValues]}
                </p>
                <p className={`mt-1.5 text-[11px] font-medium ${stat.accent}`}>
                  {stat.key === "total" ? "All time" : stat.key === "thisMonth" ? "This period" : "Completion rate"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Messages table card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
            darkMode ? "border-white/[0.04] bg-white/[0.02]" : "border-black/[0.04] bg-white/60"
          }`}
        >
          {/* Card header */}
          <div className={`flex items-center justify-between border-b px-6 py-4 sm:px-6 ${
            darkMode ? "border-white/[0.04]" : "border-black/[0.04]"
          }`}>
            <div>
              <h2 className={`text-sm font-semibold ${b("text-white", "text-[#1D1D1F]")}`}>All Inquiries</h2>
              <p className={`mt-0.5 text-[11px] ${b("text-white/25", "text-black/30")}`}>
                {messages.length} message{messages.length !== 1 ? "s" : ""} total
              </p>
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider ${
              darkMode ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-emerald-300 bg-emerald-50 text-emerald-600"
            }`}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
          </div>

          {/* Loading / Empty / Table */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className={`h-7 w-7 animate-spin rounded-full border-2 ${darkMode ? "border-white/[0.06] border-t-white/40" : "border-black/[0.08] border-t-black/40"}`} />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${darkMode ? "bg-white/[0.04] ring-1 ring-white/[0.06]" : "bg-black/[0.03] ring-1 ring-black/[0.06]"}`}>
                <Inbox className={`h-6 w-6 ${b("text-white/20", "text-black/20")}`} />
              </div>
              <p className={`text-sm font-medium ${b("text-white/50", "text-black/50")}`}>No messages yet</p>
              <p className={`mt-1 text-xs ${b("text-white/20", "text-black/20")}`}>Contact form submissions will appear here</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b text-left text-[10px] font-semibold uppercase tracking-widest ${
                      darkMode ? "border-white/[0.04] text-white/30" : "border-black/[0.04] text-black/30"
                    }`}>
                      <th className="px-6 py-4 w-6"></th>
                      <th className="px-3 py-4">Name</th>
                      <th className="px-3 py-4">Email</th>
                      <th className="px-3 py-4">Phone</th>
                      <th className="px-3 py-4">Subject</th>
                      <th className="px-3 py-4">Message</th>
                      <th className="px-3 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMessages.map((msg, i) => (
                      <motion.tr
                        key={msg.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.015 }}
                        onClick={() => toggleRead(msg.id, msg.read)}
                        className={`border-b text-sm transition-all duration-150 cursor-pointer ${
                          darkMode
                            ? `border-white/[0.02] hover:bg-white/[0.03] ${!msg.read ? "bg-emerald-500/[0.015]" : ""}`
                            : `border-black/[0.03] hover:bg-black/[0.02] ${!msg.read ? "bg-emerald-500/[0.04]" : ""}`
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className={`inline-flex h-2 w-2 rounded-full transition-all ${
                            msg.read ? b("bg-white/15", "bg-black/15") : "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.35)]"
                          }`} />
                        </td>
                        <td className={`px-3 py-4 font-medium ${b("text-white/85", "text-[#1D1D1F]")}`}>{msg.name}</td>
                        <td className={`px-3 py-4 ${b("text-white/45", "text-black/45")}`}>{msg.email}</td>
                        <td className={`px-3 py-4 ${b("text-white/35", "text-black/35")}`}>{msg.phone || "—"}</td>
                        <td className={`max-w-[140px] truncate px-3 py-4 ${b("text-white/70", "text-black/70")}`}>{msg.subject}</td>
                        <td className="px-3 py-4">
                          <button onClick={(e) => { e.stopPropagation(); setPopupMessage(popupMessage?.id === msg.id ? null : msg); }}
                            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                              darkMode
                                ? "border-white/[0.06] bg-white/[0.03] text-white/45 hover:border-white/[0.12] hover:text-white/75"
                                : "border-black/[0.06] bg-black/[0.02] text-black/45 hover:border-black/[0.12] hover:text-black/75"
                            }`}>
                            <Eye className="h-3 w-3" /> View
                          </button>
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-xs ${b("text-white/35", "text-black/35")}`}>
                          <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{formatDate(msg.createdAt)}</div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className={`md:hidden divide-y ${darkMode ? "divide-white/[0.04]" : "divide-black/[0.04]"}`}>
                {paginatedMessages.map((msg, i) => (
                  <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.015 }}
                    onClick={() => toggleRead(msg.id, msg.read)}
                    className={`p-4 transition-all duration-150 cursor-pointer ${!msg.read ? (darkMode ? "bg-emerald-500/[0.015]" : "bg-emerald-500/[0.04]") : ""}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className={`shrink-0 inline-flex h-2 w-2 rounded-full ${
                          msg.read ? b("bg-white/15", "bg-black/15") : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.35)]"
                        }`} />
                        <div className="min-w-0 flex-1">
                          <h3 className={`text-sm font-medium truncate ${b("text-white/85", "text-[#1D1D1F]")}`}>{msg.name}</h3>
                          <p className={`text-[11px] truncate ${b("text-white/35", "text-black/35")}`}>{msg.subject}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 text-[10px] ${b("text-white/25", "text-black/25")}`}>{formatDate(msg.createdAt)}</span>
                    </div>
                    <div className="ml-5 flex items-center gap-2 mb-2">
                      <span className={`text-[11px] truncate ${b("text-white/45", "text-black/45")}`}>{msg.email}</span>
                      {msg.phone && <span className={`text-[11px] ${b("text-white/25", "text-black/25")}`}>· {msg.phone}</span>}
                    </div>
                    <div className="ml-5">
                      <button onClick={(e) => { e.stopPropagation(); setPopupMessage(popupMessage?.id === msg.id ? null : msg); }}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                          darkMode
                            ? "border-white/[0.06] bg-white/[0.03] text-white/45 hover:border-white/[0.12] hover:text-white/75"
                            : "border-black/[0.06] bg-black/[0.02] text-black/45 hover:border-black/[0.12] hover:text-black/75"
                        }`}>
                        <Eye className="h-3 w-3" /> View Message
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {!loading && messages.length > itemsPerPage && (
            <div className={`flex items-center justify-between border-t px-6 py-4 ${darkMode ? "border-white/[0.04]" : "border-black/[0.04]"}`}>
              <span className={`text-[11px] ${b("text-white/25", "text-black/25")}`}>Page {page} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs transition-all duration-200 ${
                    darkMode
                      ? "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/70 disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white/[0.06]"
                      : "border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-black/[0.12] hover:text-black/70 disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-black/[0.06]"
                  }`}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {getPageNumbers().map((p, idx) => p === "ellipsis" ? (
                  <span key={`e-${idx}`} className={`px-1 text-[11px] ${b("text-white/15", "text-black/15")}`}>...</span>
                ) : (
                  <button key={p} onClick={() => setPage(p)}
                    className={`flex h-8 min-w-[32px] items-center justify-center rounded-xl px-2.5 text-xs font-medium transition-all duration-200 ${
                      p === page
                        ? "bg-emerald-500 text-white shadow-sm"
                        : darkMode
                        ? "border border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/70"
                        : "border border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-black/[0.12] hover:text-black/70"
                    }`}>{p}</button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs transition-all duration-200 ${
                    darkMode
                      ? "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/70 disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white/[0.06]"
                      : "border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-black/[0.12] hover:text-black/70 disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-black/[0.06]"
                  }`}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* ── Message Detail Modal ── */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setPopupMessage(null)}>
            <motion.div ref={popupRef} initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${
                darkMode ? "border-white/[0.08] bg-[#0A0E14] shadow-black/60" : "border-black/[0.06] bg-white shadow-black/5"
              }`}>
              <div className={`flex items-start justify-between border-b px-6 py-5 ${darkMode ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                <div className="min-w-0 flex-1 pr-4">
                  <h3 className={`text-sm font-semibold truncate ${b("text-white", "text-[#1D1D1F]")}`}>{popupMessage.subject}</h3>
                  <p className={`mt-1 text-xs ${b("text-white/40", "text-black/40")}`}>
                    From {popupMessage.name} · {popupMessage.email}{popupMessage.phone && ` · ${popupMessage.phone}`}
                  </p>
                </div>
                <button onClick={() => setPopupMessage(null)} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                  darkMode ? "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/70" : "border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-black/[0.12] hover:text-black/70"
                }`}><X className="h-4 w-4" /></button>
              </div>
              <div className="px-6 py-5">
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${b("text-white/80", "text-black/70")}`}>{popupMessage.description}</p>
              </div>
              <div className={`flex items-center justify-between border-t px-6 py-4 ${darkMode ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                <span className={`text-[11px] ${b("text-white/25", "text-black/25")}`}>
                  {new Date(popupMessage.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                <button onClick={() => { toggleRead(popupMessage.id, popupMessage.read); setPopupMessage(null); }}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-[11px] font-medium transition-all duration-200 ${
                    darkMode ? "border-white/[0.06] bg-white/[0.03] text-white/45 hover:border-white/[0.12] hover:text-white/75" : "border-black/[0.06] bg-black/[0.02] text-black/45 hover:border-black/[0.12] hover:text-black/75"
                  }`}>
                  {popupMessage.read ? <><EyeOff className="h-3.5 w-3.5" /> Mark Unread</> : <><Eye className="h-3.5 w-3.5" /> Mark Read</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Logout Confirm Modal ── */}
      <AnimatePresence>
        {showLogoutConfirm && !loggingOut && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <motion.div ref={confirmRef} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-sm overflow-hidden rounded-2xl border p-6 shadow-2xl ${
                darkMode ? "border-white/[0.08] bg-[#0A0E14] shadow-black/60" : "border-black/[0.06] bg-white shadow-black/5"
              }`}>
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${darkMode ? "bg-red-500/10 ring-1 ring-red-500/20" : "bg-red-50 ring-1 ring-red-200"}`}>
                  <AlertTriangle className={`h-7 w-7 ${b("text-red-400", "text-red-500")}`} />
                </div>
                <h3 className={`text-base font-semibold ${b("text-white", "text-[#1D1D1F]")}`}>Sign Out</h3>
                <p className={`mt-1.5 text-xs leading-relaxed ${b("text-white/45", "text-black/45")}`}>
                  Are you sure you want to sign out? You'll need to log in again.
                </p>
                <div className="mt-6 flex w-full gap-3">
                  <button onClick={() => setShowLogoutConfirm(false)} className={`flex-1 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    darkMode ? "border-white/[0.06] bg-white/[0.03] text-white/60 hover:border-white/[0.12] hover:text-white/80" : "border-black/[0.06] bg-black/[0.02] text-black/60 hover:border-black/[0.12] hover:text-black/80"
                  }`}>Cancel</button>
                  <button onClick={confirmLogout} className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-200 hover:bg-red-600 active:scale-[0.98]">Yes, Sign Out</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Logging Out Overlay ── */}
      <AnimatePresence>
        {loggingOut && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-lg">
            <div className={`h-10 w-10 animate-spin rounded-full border-2 ${darkMode ? "border-white/[0.06] border-t-emerald-400" : "border-white/15 border-t-emerald-400"}`} />
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 text-sm font-medium text-white/70">Signing out</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}