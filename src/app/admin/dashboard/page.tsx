"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, LogOut, Mail, MessageSquare, Users, TrendingUp, X, Sun, Moon, Menu, AlertTriangle } from "lucide-react";

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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [popupMessageId, setPopupMessageId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const popupRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupMessageId(null);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
      if (confirmRef.current && !confirmRef.current.contains(e.target as Node)) {
        setShowLogoutConfirm(false);
      }
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

  // Reset to page 1 when messages change
  const prevTotalPages = useRef(1);
  useEffect(() => {
    const total = Math.max(1, Math.ceil(messages.length / 10));
    if (page > total) setPage(1);
    prevTotalPages.current = total;
  }, [messages, page]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("admin_darkMode", String(next));
      return next;
    });
  };

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
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
      );
      setStats((prev) => ({
        ...prev,
        unread: currentRead ? prev.unread + 1 : prev.unread - 1,
      }));
    } catch {
      // silent
    }
  };

  const confirmLogout = async () => {
    setLoggingOut(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_authenticated");
    }
    router.push("/admin/login");
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!mounted) return null;

  const statCards = [
    { label: "Total Messages", value: String(stats.total), icon: Mail, change: `${stats.total} received` },
    { label: "This Month", value: String(stats.thisMonth), icon: TrendingUp, change: "new this month" },
    { label: "Contact Rate", value: stats.total > 0 ? `${Math.round((stats.unread / stats.total) * 100)}%` : "0%", icon: Users, change: "unread rate" },
  ];

  const txt = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass;

  const totalPages = Math.max(1, Math.ceil(messages.length / itemsPerPage));
  const paginatedMessages = messages.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Build visible page numbers: show up to 3 pages around current
  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const visiblePages = getPageNumbers();

  return (
    <>
      <style jsx>{`
        .loader-out {
          width: 70px;
          aspect-ratio: 1;
          background:
            radial-gradient(farthest-side,#ffa516 90%,#0000) center/16px 16px,
            radial-gradient(farthest-side,green   90%,#0000) bottom/12px 12px;
          background-repeat: no-repeat;
          animation: l17 1s infinite linear;
          position: relative;
        }
        .loader-out::before {    
          content:"";
          position: absolute;
          width: 8px;
          aspect-ratio: 1;
          inset: auto 0 16px;
          margin: auto;
          background: #ccc;
          border-radius: 50%;
          transform-origin: 50% calc(100% + 10px);
          animation: inherit;
          animation-duration: 0.5s;
        }
        @keyframes l17 { 
          100%{transform: rotate(1turn)}
        }
        .toggle-track {
          width: 44px;
          height: 24px;
          border-radius: 999px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .toggle-thumb {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          position: absolute;
          top: 3px;
          transition: transform 0.3s ease, background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        {/* Top bar */}
        <header className={`border-b transition-colors duration-500 ${
          darkMode
            ? "border-white/[0.06] bg-gray-950/80 backdrop-blur-md"
            : "border-gray-200 bg-white/80 backdrop-blur-md"
        }`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                darkMode
                  ? "bg-emerald-500/10 ring-1 ring-emerald-500/20"
                  : "bg-emerald-100 ring-1 ring-emerald-200"
              }`}>
                <Sprout className={`h-5 w-5 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
              </div>
              <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Admin Dashboard</span>
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
              onClick={toggleDarkMode}
                className={txt(
                  "relative inline-flex h-8 w-11 items-center rounded-full border border-white/[0.10] bg-white/[0.04] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15]",
                  "relative inline-flex h-8 w-11 items-center rounded-full border border-gray-200 bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:border-gray-300"
                )}
                aria-label="Toggle theme"
              >
                <span className={txt(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-white shadow-sm transition-all duration-300 translate-x-0.5",
                  "inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all duration-300 translate-x-[18px]"
                )}>
                  {darkMode ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                </span>
              </button>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className={txt(
                  "inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/60 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400",
                  "inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                )}
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden relative" ref={mobileMenuRef}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={txt(
                  "inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-white/60 hover:bg-white/[0.08] hover:text-white/80",
                  "inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
              {mobileMenuOpen && (
                <div className={`absolute right-0 top-full mt-2 w-40 rounded-xl border shadow-2xl p-2 z-50 ${
                  darkMode
                    ? "border-white/[0.08] bg-gray-900 shadow-black/40"
                    : "border-gray-200 bg-white shadow-gray-200/50"
                }`}>
                  <button
                    onClick={() => { toggleDarkMode(); setMobileMenuOpen(false); }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-300 ${
                      darkMode
                        ? "text-white/60 hover:bg-white/[0.06] hover:text-white/80"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                  <div className={`my-1 border-t ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`} />
                  <button
                    onClick={() => { setShowLogoutConfirm(true); setMobileMenuOpen(false); }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-300 ${
                      darkMode
                        ? "text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
                        : "text-red-500/70 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-6xl px-6 py-10">
          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className={txt("text-2xl font-semibold tracking-tight text-white", "text-2xl font-semibold tracking-tight text-gray-900")}>
              Emails Received
            </h1>
            <p className={txt("mt-1 text-sm text-white/60", "mt-1 text-sm text-gray-600")}>
              Manage contact form submissions and inquiries.
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={txt(
                  "rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]",
                  "rounded-xl border border-gray-200 bg-white p-5 transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={txt("text-xs font-semibold uppercase tracking-wider text-white/60", "text-xs font-semibold uppercase tracking-wider text-gray-600")}>
                    {stat.label}
                  </span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${
                    darkMode
                      ? "bg-white/[0.04] ring-white/[0.06]"
                      : "bg-gray-100 ring-gray-200"
                  }`}>
                    <stat.icon className={txt("h-4 w-4 text-white/40", "h-4 w-4 text-gray-400")} />
                  </div>
                </div>
                <p className={txt("mt-3 text-3xl font-bold tracking-tight text-white", "mt-3 text-3xl font-bold tracking-tight text-gray-900")}>
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-500">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          {/* Messages table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={txt(
              "mt-8 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]",
              "mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            )}
          >
            <div className={txt("p-5 border-b border-white/[0.06]", "p-5 border-b border-gray-200")}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={txt("text-sm font-semibold text-white", "text-sm font-semibold text-gray-900")}>All Inquiries</h2>
                  <p className={txt("mt-0.5 text-[11px] text-white/60", "mt-0.5 text-[11px] text-gray-600")}>
                    {messages.length} message{messages.length !== 1 ? "s" : ""} total
                  </p>
                </div>
                <span className={txt(
                  "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400",
                  "inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600"
                )}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Mail className={txt("h-8 w-8 text-white/30", "h-8 w-8 text-gray-300")} />
                <p className={txt("mt-3 text-sm text-white/50", "mt-3 text-sm text-gray-500")}>No messages yet</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={txt("border-b border-white/[0.04]", "border-b border-gray-200")}>
                        <th className={txt("px-5 py-3.5 font-semibold text-white/80", "px-5 py-3.5 font-semibold text-gray-700")}>Status</th>
                        <th className={txt("px-5 py-3.5 font-semibold text-white/80", "px-5 py-3.5 font-semibold text-gray-700")}>Name</th>
                        <th className={txt("px-5 py-3.5 font-semibold text-white/80", "px-5 py-3.5 font-semibold text-gray-700")}>Email</th>
                        <th className={txt("px-5 py-3.5 font-semibold text-white/80", "px-5 py-3.5 font-semibold text-gray-700")}>Phone</th>
                        <th className={txt("px-5 py-3.5 font-semibold text-white/80", "px-5 py-3.5 font-semibold text-gray-700")}>Subject</th>
                        <th className={txt("px-5 py-3.5 font-semibold text-white/80", "px-5 py-3.5 font-semibold text-gray-700")}>Description</th>
                        <th className={txt("px-5 py-3.5 font-semibold text-white/80", "px-5 py-3.5 font-semibold text-gray-700")}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedMessages.map((msg, i) => (
                        <motion.tr
                          key={msg.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.02 }}
                          onClick={() => toggleRead(msg.id, msg.read)}
                          className={txt(
                            `border-b border-white/[0.02] transition-colors duration-300 hover:bg-white/[0.03] cursor-pointer ${!msg.read ? "bg-emerald-500/[0.02]" : ""}`,
                            `border-b border-gray-100 transition-colors duration-300 hover:bg-gray-50 cursor-pointer ${!msg.read ? "bg-emerald-50/50" : ""}`
                          )}
                        >
                          <td className="px-5 py-4">
                            <span className={txt(
                              `inline-flex h-2 w-2 rounded-full ${msg.read ? "bg-white/30" : "bg-emerald-400"}`,
                              `inline-flex h-2 w-2 rounded-full ${msg.read ? "bg-gray-300" : "bg-emerald-400"}`
                            )} />
                          </td>
                          <td className={txt("px-5 py-4 font-medium text-white/80", "px-5 py-4 font-medium text-gray-800")}>{msg.name}</td>
                          <td className={txt("px-5 py-4 text-white/60", "px-5 py-4 text-gray-600")}>{msg.email}</td>
                          <td className={txt("px-5 py-4 text-white/60", "px-5 py-4 text-gray-600")}>{msg.phone || "—"}</td>
                          <td className={txt("px-5 py-4 text-white/70", "px-5 py-4 text-gray-700")}>{msg.subject}</td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="sr-only">{msg.description}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); setPopupMessageId(popupMessageId === msg.id ? null : msg.id); }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-500 transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400"
                            >
                              View Description
                            </button>
                            {popupMessageId === msg.id && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setPopupMessageId(null)} />}
                            {popupMessageId === msg.id && (
                              <div ref={popupRef} className={txt("fixed z-50 border border-white/[0.10] bg-gray-900 rounded-xl shadow-2xl shadow-black/40 p-5 max-w-lg w-[90vw]", "fixed z-50 border border-gray-200 bg-white rounded-xl shadow-2xl shadow-gray-200/50 p-5 max-w-lg w-[90vw]")} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <h4 className={txt("text-sm font-semibold text-white/90", "text-sm font-semibold text-gray-900")}>{msg.subject}</h4>
                                  <button onClick={() => setPopupMessageId(null)} className={txt("shrink-0 rounded-lg p-1 text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all", "shrink-0 rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all")}><X className="h-4 w-4" /></button>
                                </div>
                                <p className={txt("text-xs text-white/90 leading-relaxed whitespace-pre-wrap break-words", "text-xs text-gray-800 leading-relaxed whitespace-pre-wrap break-words")}>{msg.description}</p>
                              </div>
                            )}
                          </td>
                          <td className={txt("px-5 py-4 whitespace-nowrap text-white/50", "px-5 py-4 whitespace-nowrap text-gray-500")}>{formatDate(msg.createdAt)}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className={txt("md:hidden divide-y divide-white/[0.04]", "md:hidden divide-y divide-gray-200")}>
                  {paginatedMessages.map((msg, i) => (
                    <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                      onClick={() => toggleRead(msg.id, msg.read)}
                      className={txt(`p-4 transition-colors duration-300 cursor-pointer ${!msg.read ? "bg-emerald-500/[0.02]" : ""}`, `p-4 transition-colors duration-300 cursor-pointer ${!msg.read ? "bg-emerald-50/50" : ""}`)}
                    >
                      {/* mobile content - shortened for brevity but keeping same structure */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className={txt(`shrink-0 inline-flex h-2 w-2 rounded-full ${msg.read ? "bg-white/30" : "bg-emerald-400"}`, `shrink-0 inline-flex h-2 w-2 rounded-full ${msg.read ? "bg-gray-300" : "bg-emerald-400"}`)} />
                          <h3 className={txt("text-sm font-semibold truncate text-white/90", "text-sm font-semibold truncate text-gray-800")}>{msg.name}</h3>
                        </div>
                        <span className={txt("shrink-0 text-[10px] text-white/50", "shrink-0 text-[10px] text-gray-500")}>{formatDate(msg.createdAt)}</span>
                      </div>
                      <div className="ml-4 space-y-1.5">
                        <p className={txt("text-[11px] text-white/60", "text-[11px] text-gray-600")}><span className={txt("text-white/40", "text-gray-500")}>Email:</span> {msg.email}</p>
                        {msg.phone && <p className={txt("text-[11px] text-white/60", "text-[11px] text-gray-600")}><span className={txt("text-white/40", "text-gray-500")}>Phone:</span> {msg.phone}</p>}
                        <p className={txt("text-[11px] text-white/70", "text-[11px] text-gray-700")}><span className={txt("text-white/40", "text-gray-500")}>Subject:</span> {msg.subject}</p>
                        <button onClick={(e) => { e.stopPropagation(); setPopupMessageId(popupMessageId === msg.id ? null : msg.id); }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-500 transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400 mt-2">View Description</button>
                        {popupMessageId === msg.id && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setPopupMessageId(null)} />}
                        {popupMessageId === msg.id && (
                          <div ref={popupRef} className={txt("fixed z-50 border border-white/[0.10] bg-gray-900 rounded-xl shadow-2xl shadow-black/40 p-5 max-w-lg w-[90vw]", "fixed z-50 border border-gray-200 bg-white rounded-xl shadow-2xl shadow-gray-200/50 p-5 max-w-lg w-[90vw]")} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h4 className={txt("text-sm font-semibold text-white/90", "text-sm font-semibold text-gray-900")}>{msg.subject}</h4>
                              <button onClick={() => setPopupMessageId(null)} className={txt("shrink-0 rounded-lg p-1 text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all", "shrink-0 rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all")}><X className="h-4 w-4" /></button>
                            </div>
                            <p className={txt("text-xs text-white/90 leading-relaxed whitespace-pre-wrap break-words", "text-xs text-gray-800 leading-relaxed whitespace-pre-wrap break-words")}>{msg.description}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Pagination */}
          {!loading && messages.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={txt(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition-all duration-300 hover:bg-white/[0.08] hover:text-white/80 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
                )}
                aria-label="Previous page"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              {visiblePages.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={txt(
                    `inline-flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2.5 text-xs font-medium transition-all duration-300 ${
                      p === page
                        ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                        : "border border-white/[0.08] bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white/80"
                    }`,
                    `inline-flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2.5 text-xs font-medium transition-all duration-300 ${
                      p === page
                        ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                        : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={txt(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition-all duration-300 hover:bg-white/[0.08] hover:text-white/80 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
                )}
                aria-label="Next page"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </main>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutConfirm && !loggingOut && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <motion.div ref={confirmRef} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className={txt("w-full max-w-sm rounded-2xl border border-white/[0.10] bg-gray-900 p-6 shadow-2xl shadow-black/40", "w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl shadow-gray-200/50")}>
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${darkMode ? "bg-red-500/10" : "bg-red-50"}`}>
                    <AlertTriangle className={txt("h-7 w-7 text-red-400", "h-7 w-7 text-red-500")} />
                  </div>
                  <h3 className={txt("text-base font-semibold text-white", "text-base font-semibold text-gray-900")}>Sign Out</h3>
                  <p className={txt("mt-1.5 text-xs text-white/60 leading-relaxed max-w-[260px]", "mt-1.5 text-xs text-gray-500 leading-relaxed max-w-[260px]")}>Are you sure you want to sign out? You will need to log in again to access the dashboard.</p>
                  <div className="mt-6 flex w-full gap-3">
                    <button onClick={() => setShowLogoutConfirm(false)} className={txt("flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/60 transition-all duration-300 hover:bg-white/[0.08] hover:text-white/80", "flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-gray-800")}>Cancel</button>
                    <button onClick={confirmLogout} className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-red-600 shadow-lg shadow-red-500/20">Yes, Sign Out</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logging Out Spinner */}
        <AnimatePresence>
          {loggingOut && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
              <div className="loader-out" />
              <p className={txt("mt-6 text-sm font-medium text-white/70", "mt-6 text-sm font-medium text-gray-200")}>Signing out...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}