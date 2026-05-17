"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sprout, TextAlignEnd, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchOverlay from "@/components/search-bar";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PRODUCTS", href: "/products" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 border-b"
        style={{
          background: "var(--header-bg)",
          borderColor: "var(--header-border)",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center px-5">
          {/* Logo — full page refresh on click */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Sprout
              className="h-5 w-5 sm:h-5 sm:w-5 transition-colors duration-300"
              style={{
                color: "var(--header-logo)",
              }}
            />
            <span
              className="text-sm sm:text-base font-display font-semibold tracking-wide transition-colors duration-300"
              style={{
                color: "var(--header-text-hover)",
              }}
            >
              ᴍᴜʟɪᴀʀᴀʏᴀ
            </span>
          </a>

          <div className="flex-1" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-[12px] font-medium tracking-wider transition-colors duration-300"
                style={{
                  color: "var(--header-text)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--header-text-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--header-text)")}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Search + hamburger - mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 transition-colors duration-200"
              style={{ color: "var(--header-icon)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--header-icon-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--header-icon)")}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-10 h-10 transition-colors duration-200"
              style={{
                color: "var(--header-icon)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--header-icon-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--header-icon)")}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <TextAlignEnd className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop — matches header aesthetic */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={cn(
            "absolute top-0 left-0 right-0 bg-gray-950/90 backdrop-blur-lg border-b border-white/[0.04] rounded-b-3xl shadow-2xl shadow-black/30 overflow-hidden transition-all duration-500 ease-out",
            menuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4"
          )}
        >
          <nav className="px-6 pt-20 pb-4 space-y-1">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "group flex items-center w-full rounded-lg px-4 py-3.5 text-sm font-medium tracking-wider text-white/50 transition-all duration-300 hover:bg-white/[0.04] hover:text-white/80",
                  menuOpen && "animate-in"
                )}
                style={{
                  animationDelay: menuOpen ? `${i * 60}ms` : "0ms",
                  animationFillMode: "backwards",
                }}
              >
                <span className="flex-1">{l.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-white/15 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-400/60"
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

          <div className="px-6 pb-6">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/[0.08] hover:text-white/80 active:scale-[0.98]"
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
