"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sprout, TextAlignEnd, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PRODUCTS", href: "/products" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 border-b border-white/[0.06] bg-black">
        <div className="mx-auto flex w-full max-w-6xl items-center px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <Sprout className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            <span className="text-sm sm:text-lg font-semibold tracking-tight text-white/90">
              Sultana Agro
            </span>
          </Link>

          <div className="flex-1" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-[13px] font-medium tracking-wider text-white/50 transition-colors duration-200 hover:text-white/90 group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-white/60 hover:text-white/90 transition-colors duration-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <TextAlignEnd className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-green-950/80 to-gray-950/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Grain texture */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/10 blur-[150px]" />

        <div
          className={cn(
            "absolute top-16 left-4 right-4 bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/40 border border-white/[0.06] ring-1 ring-white/[0.04] overflow-hidden transition-all duration-500 ease-out",
            menuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4"
          )}
        >
          {/* Gradient line */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400/60 via-green-500 to-emerald-600/60" />

          <nav className="px-6 pt-6 pb-3 space-y-1">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "group flex items-center w-full rounded-xl px-5 py-4 text-base font-medium tracking-[0.15em] text-white/50 transition-all duration-300 hover:bg-white/[0.03] hover:text-white hover:pl-7",
                  menuOpen && "animate-in"
                )}
                style={{
                  animationDelay: menuOpen ? `${i * 80}ms` : "0ms",
                  animationFillMode: "backwards",
                }}
              >
                <span className="flex-1">{l.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/[0.06] px-6 py-5">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-600/20 px-5 py-3.5 text-sm font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20 transition-all duration-300 hover:bg-emerald-500/30 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
