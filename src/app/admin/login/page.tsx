"use client";

import { useEffect, useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sprout, Eye, EyeOff, ArrowLeft, Lock, Mail, Sun, Moon } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_darkMode");
      if (stored !== null) setDarkMode(stored === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("admin_darkMode", String(next));
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 2000));

    if (email === "admin" && password === "admin") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_authenticated", "true");
      }
      router.push("/admin/dashboard");
    } else {
      setError("Invalid admin credentials.");
    }

    setLoading(false);
  };

  const txt = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass;

  return (
    <>
      <style jsx global>{`
        /* Prevent iOS zoom on input focus */
        input, textarea, select {
          font-size: 16px !important;
        }
      `}</style>
      <style jsx>{`
        .loader {
          width: 50px;
          aspect-ratio: 1;
          --_c:no-repeat radial-gradient(farthest-side,#25b09b 92%,#0000);
          background: 
            var(--_c) top,
            var(--_c) left,
            var(--_c) right,
            var(--_c) bottom;
          background-size: 12px 12px;
          animation: l7 1s infinite;
        }
        @keyframes l7 {to{transform: rotate(.5turn)}}
      `}</style>

      <div className={`relative flex min-h-screen items-center justify-center overflow-hidden px-4 transition-colors duration-500 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        {/* Background glow */}
        <div className={`pointer-events-none absolute left-1/2 top-0 z-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[200px] transition-colors duration-500 ${darkMode ? "bg-emerald-500/5" : "bg-emerald-300/30"}`} />
        <div className={`pointer-events-none absolute -right-40 bottom-0 z-0 h-[400px] w-[400px] rounded-full blur-[150px] transition-colors duration-500 ${darkMode ? "bg-emerald-600/5" : "bg-emerald-400/20"}`} />

        {/* Grain texture */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

        {/* Subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Back to home + Dark/Light toggle */}
        <div className="fixed left-1/2 top-8 z-20 -translate-x-1/2 flex flex-col items-center">
          <Link
            href="/"
            className={txt(
              "inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-gray-950/80 px-6 py-3 text-sm font-medium text-white/50 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:text-white/80",
              "inline-flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white/80 px-6 py-3 text-sm font-medium text-gray-500 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-gray-300 hover:text-gray-800"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="pt-6 md:pt-3">
            <button
              onClick={toggleDarkMode}
              className={txt(
                "relative inline-flex h-8 w-14 items-center rounded-full border border-white/[0.10] bg-white/[0.04] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15]",
                "relative inline-flex h-8 w-14 items-center rounded-full border border-gray-200 bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:border-gray-300"
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
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[400px]"
        >
          {/* Card */}
          <div className={`rounded-2xl border p-8 shadow-2xl backdrop-blur-xl transition-colors duration-500 ${
            darkMode
              ? "border-white/[0.06] bg-gray-950/90"
              : "border-gray-200 bg-white/90 shadow-gray-200/50"
          }`}>
            {/* Logo */}
            <div className="mb-7 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-500 ${
                darkMode
                  ? "bg-emerald-500/10 ring-1 ring-emerald-500/20"
                  : "bg-emerald-100 ring-1 ring-emerald-200"
              }`}>
                <Sprout className={`h-5 w-5 transition-colors duration-500 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
              </div>
              <div>
                <h1 className={`text-sm font-semibold transition-colors duration-500 ${darkMode ? "text-white" : "text-gray-900"}`}>Admin Portal</h1>
                <p className={`text-[11px] transition-colors duration-500 ${darkMode ? "text-white/50" : "text-gray-500"}`}>Authenticate to continue</p>
              </div>
            </div>

            {/* Divider */}
            <div className={`mb-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-colors duration-500 ${darkMode ? "" : "via-gray-200"}`} />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="admin-email"
                  className={`mb-1.5 block text-[11px] font-semibold tracking-wide uppercase transition-colors duration-500 ${darkMode ? "text-white/50" : "text-gray-600"}`}
                >
                  Email
                </label>
                <div className="group relative">
                  <Mail className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-emerald-400/60 ${darkMode ? "text-white/20" : "text-gray-400"}`} />
                  <input
                    id="admin-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className={txt(
                      "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 pl-11 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-emerald-400/30 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-400/10",
                      "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-white focus:ring-1 focus:ring-emerald-400/20 shadow-sm"
                    )}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="admin-password"
                  className={`mb-1.5 block text-[11px] font-semibold tracking-wide uppercase transition-colors duration-500 ${darkMode ? "text-white/50" : "text-gray-600"}`}
                >
                  Password
                </label>
                <div className="group relative">
                  <Lock className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-emerald-400/60 ${darkMode ? "text-white/20" : "text-gray-400"}`} />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className={txt(
                      "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 pl-11 pr-11 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-emerald-400/30 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-400/10",
                      "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-white focus:ring-1 focus:ring-emerald-400/20 shadow-sm"
                    )}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? "text-white/20 hover:text-white/50" : "text-gray-400 hover:text-gray-600"}`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/admin/forgot-password"
                  className={`text-[11px] font-medium transition-colors ${darkMode ? "text-white/40 hover:text-emerald-400" : "text-gray-500 hover:text-emerald-600"}`}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg px-3.5 py-2.5 text-xs font-medium ${darkMode ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"}`}
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/15 transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-400/25 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Footer text */}
          <p className={`mt-5 text-center text-[11px] transition-colors duration-500 ${darkMode ? "text-white/20" : "text-gray-400"}`}>
            Authorized personnel only
          </p>
        </motion.div>
      </div>

      {/* Full-screen loading spinner overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <div className="loader" />
            <p className={`mt-6 text-sm font-medium transition-colors duration-500 ${darkMode ? "text-white/70" : "text-gray-200"}`}>Signing in...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}