"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sprout, ArrowLeft, Mail } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "sent">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your admin email.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/admin/login`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setStep("sent");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/5 blur-[200px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-emerald-600/5 blur-[150px]" />

      {/* Grain texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Back to login button */}
      <div className="fixed left-1/2 top-8 z-20 -translate-x-1/2">
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-gray-950/80 px-6 py-3 text-sm font-medium text-white/50 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:text-white/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="rounded-2xl border border-white/[0.06] bg-gray-950/90 p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <Sprout className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Reset Password</h1>
              <p className="text-[11px] text-white/40">
                {step === "email"
                  ? "Verify your email"
                  : "Reset link sent to your email"}
              </p>
            </div>
          </div>

          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="mb-1.5 block text-[11px] font-medium tracking-wide uppercase text-white/40"
                >
                  Admin Email
                </label>
                <div className="group relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 transition-colors duration-300 group-focus-within:text-emerald-400/60" />
                  <input
                    id="reset-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 pl-11 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-emerald-400/30 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-400/10"
                    autoComplete="off"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-500/8 px-3.5 py-2.5 text-xs font-medium text-red-400"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/15 transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-400/25 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>
          )}

          {step === "sent" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-white">Reset Link Sent</h2>
              <p className="mt-1.5 text-xs text-white/40 leading-relaxed">
                Check your email inbox for a password reset link. If you don't see it, check your spam folder.
              </p>
              <Link
                href="/admin/login"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/15 transition-all duration-300 hover:bg-emerald-400 active:scale-[0.98]"
              >
                Back to Login
              </Link>
            </motion.div>
          )}

        </div>

        <p className="mt-5 text-center text-[11px] text-white/20">
          Authorized personnel only
        </p>
      </motion.div>
    </div>
  );
}