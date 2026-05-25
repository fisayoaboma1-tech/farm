"use client";

import { useEffect, useState, FormEvent, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sprout, Eye, EyeOff, ArrowLeft, Lock, Mail, Sun, Moon, Sparkles } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_darkMode");
      if (stored !== null) setDarkMode(stored === "true");
    }
  }, []);

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("admin_darkMode", String(next));
      return next;
    });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError || !data?.session) {
        setError(signInError?.message || "Invalid credentials.");
        setLoading(false);
        return;
      }

      const verifyRes = await fetch("/api/auth/verify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.user.id }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.valid) {
        setError("You do not have admin access.");
        try { await supabase.auth.signOut(); } catch {}
        setLoading(false);
        return;
      }

      sessionStorage.setItem("admin_authenticated", "true");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        input, textarea, select { font-size: 16px !important; }
        ::selection { background: rgba(16,185,129,0.3); color: inherit; }
      `}</style>

      <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 transition-all duration-700 ${
        darkMode ? "bg-[#05080C]" : "bg-[#F5F5F7]"
      }`}>
        {/* ── Ambient glow orbs ── */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className={`absolute left-1/4 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[300px] transition-opacity duration-1000 ${
            darkMode ? "opacity-[0.08]" : "opacity-[0.06]"
          }`} style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }} />
          <div className={`absolute -right-1/3 bottom-0 h-[600px] w-[600px] rounded-full blur-[250px] transition-opacity duration-1000 ${
            darkMode ? "opacity-[0.05]" : "opacity-[0.04]"
          }`} style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
        </div>

        {/* ── Top bar: back + dark toggle ── */}
        <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-6 sm:px-8">
          <Link
            href="/"
            className={`group inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-medium backdrop-blur-xl transition-all duration-300 ${
              darkMode
                ? "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/70"
                : "border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-black/[0.12] hover:text-black/70"
            }`}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Home
          </Link>

          <button
            onClick={toggleDarkMode}
            className={`flex h-9 w-9 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
              darkMode
                ? "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/70"
                : "border-black/[0.06] bg-black/[0.02] text-black/40 hover:border-black/[0.12] hover:text-black/70"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* ── Login card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[420px]"
        >
          <div className={`rounded-3xl border p-8 sm:p-10 shadow-2xl backdrop-blur-2xl transition-colors duration-700 ${
            darkMode
              ? "border-white/[0.06] bg-[#0A0E14]/90"
              : "border-black/[0.06] bg-white/80"
          }`}>
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 ${
                darkMode
                  ? "bg-emerald-500/10 ring-1 ring-emerald-500/20"
                  : "bg-emerald-100 ring-1 ring-emerald-200"
              }`}>
                <Sprout className={`h-6 w-6 transition-colors duration-500 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
              </div>
              <h1 className={`text-lg font-semibold tracking-tight transition-colors duration-500 ${
                darkMode ? "text-white" : "text-[#1D1D1F]"
              }`}>
                Admin Portal
              </h1>
              <p className={`mt-1 text-sm transition-colors duration-500 ${
                darkMode ? "text-white/35" : "text-black/40"
              }`}>
                Sign in to manage your platform
              </p>
            </div>

            {/* Divider */}
            <div className={`mb-7 h-px transition-colors duration-500 ${
              darkMode ? "bg-white/[0.04]" : "bg-black/[0.06]"
            }`} />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="admin-email"
                  className={`block text-[11px] font-semibold uppercase tracking-widest transition-colors duration-500 ${
                    darkMode ? "text-white/35" : "text-black/40"
                  }`}
                >
                  Email
                </label>
                <div className="group relative">
                  <Mail className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-300 ${
                    darkMode
                      ? "text-white/20 group-focus-within:text-emerald-400/60"
                      : "text-black/20 group-focus-within:text-emerald-500/60"
                  }`} />
                  <input
                    id="admin-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@domain.com"
                    className={`w-full rounded-2xl border px-4 py-3.5 pl-12 text-sm outline-none transition-all duration-300 ${
                      darkMode
                        ? "border-white/[0.06] bg-white/[0.03] text-white placeholder-white/20 focus:border-emerald-400/30 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-400/10"
                        : "border-black/[0.06] bg-black/[0.02] text-[#1D1D1F] placeholder-black/20 focus:border-emerald-400/40 focus:bg-white focus:ring-1 focus:ring-emerald-400/15"
                    }`}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="admin-password"
                    className={`block text-[11px] font-semibold uppercase tracking-widest transition-colors duration-500 ${
                      darkMode ? "text-white/35" : "text-black/40"
                    }`}
                  >
                    Password
                  </label>
                </div>
                <div className="group relative">
                  <Lock className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-300 ${
                    darkMode
                      ? "text-white/20 group-focus-within:text-emerald-400/60"
                      : "text-black/20 group-focus-within:text-emerald-500/60"
                  }`} />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full rounded-2xl border px-4 py-3.5 pl-12 pr-12 text-sm outline-none transition-all duration-300 ${
                      darkMode
                        ? "border-white/[0.06] bg-white/[0.03] text-white placeholder-white/20 focus:border-emerald-400/30 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-400/10"
                        : "border-black/[0.06] bg-black/[0.02] text-[#1D1D1F] placeholder-black/20 focus:border-emerald-400/40 focus:bg-white focus:ring-1 focus:ring-emerald-400/15"
                    }`}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                      darkMode ? "text-white/20 hover:text-white/50" : "text-black/20 hover:text-black/50"
                    }`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/admin/forgot-password"
                  className={`text-[11px] font-medium transition-all duration-200 ${
                    darkMode ? "text-white/30 hover:text-emerald-400" : "text-black/30 hover:text-emerald-600"
                  }`}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    className={`rounded-2xl px-4 py-3 text-xs font-medium ${
                      darkMode ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-500"
                    }`}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`relative w-full rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 active:scale-[0.98] disabled:opacity-50 ${
                  darkMode
                    ? "bg-emerald-500 shadow-emerald-500/15 hover:bg-emerald-400 hover:shadow-emerald-400/25"
                    : "bg-emerald-500 shadow-emerald-500/15 hover:bg-emerald-400 hover:shadow-emerald-400/25"
                }`}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2.5">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Signing in...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Sign In
                    <Sparkles className="h-3.5 w-3.5 opacity-60" />
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className={`mt-6 text-center text-[11px] font-medium tracking-wide transition-colors duration-500 ${
            darkMode ? "text-white/15" : "text-black/20"
          }`}>
            Authorized personnel only
          </p>
        </motion.div>

        {/* ── Loading overlay ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-lg"
            >
              <div className="relative">
                <div className={`h-12 w-12 animate-spin rounded-full border-[2.5px] ${
                  darkMode ? "border-white/[0.06] border-t-emerald-400" : "border-white/[0.15] border-t-emerald-400"
                }`} />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6 text-sm font-medium text-white/70"
              >
                Signing in
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}