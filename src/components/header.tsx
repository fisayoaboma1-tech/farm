"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sprout, TextAlignJustify, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PRODUCTS", href: "/products" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isElevated = scrolled || menuOpen;

  return (
    <>
      {/* ---- Two layers crossfade on opacity for silky 60fps ---- */}

      {/* Layer 1: Default state — full-width bar with border */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-opacity duration-700",
          isElevated ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="flex h-14 sm:h-16 w-full items-center border-b border-transparent bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center px-5">
            {/* Logo — left on mobile, left on desktop */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <Sprout className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-xs sm:text-lg font-semibold tracking-tight text-gray-900">
                Sultana Agro
              </span>
            </Link>

            {/* Spacer to push nav/hamburger to the right */}
            <div className="flex-1" />

            {/* Desktop nav - right aligned */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[13px] font-medium tracking-wider text-gray-700 transition-colors duration-200 hover:text-black"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Hamburger icon — right on mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 text-gray-800 hover:text-black transition-colors duration-200"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <TextAlignJustify className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Layer 2: Scrolled state — centered glass card */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 transition-opacity duration-700",
          isElevated ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-4 flex h-14 sm:h-16 w-full max-w-3xl items-center rounded-2xl bg-white/75 px-5 shadow-lg shadow-green-900/10 backdrop-blur-xl ring-0">
          {/* Logo — left on mobile, left on desktop */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <Sprout className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-xs sm:text-lg font-semibold tracking-tight text-gray-900">
                Sultana Agro
              </span>
            </Link>

          {/* Spacer to push nav/hamburger to the right */}
          <div className="flex-1" />

          {/* Desktop nav - right aligned */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium tracking-wider text-gray-700 transition-colors duration-200 hover:text-black"
              >
                {l.label}
              </Link>
            ))}
          </nav>

            {/* Hamburger icon — right on mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 text-gray-800 hover:text-black transition-colors duration-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
                <TextAlignJustify className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay — slides down from under the header */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel — starts below header with a gap */}
        <div
          className={cn(
            "absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/20 border border-white/20 ring-1 ring-black/5 overflow-hidden transition-all duration-500 ease-out",
            menuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4"
          )}
        >
          {/* Decorative gradient line */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600" />

          {/* Nav links with icons */}
          <nav className="px-4 pt-4 pb-2 space-y-0.5">
            {navLinks.map((l, i) => {
              const icons: Record<string, React.ReactNode> = {
                HOME: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                ABOUT: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                PRODUCTS: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                CONTACT: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              };

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "group flex items-center gap-4 w-full rounded-2xl px-4 py-3.5 text-sm font-semibold tracking-wider text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-800 hover:shadow-sm active:scale-[0.98]",
                    menuOpen && "animate-in"
                  )}
                  style={{
                    animationDelay: menuOpen ? `${i * 80}ms` : "0ms",
                    animationFillMode: "backwards",
                  }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-all duration-300 group-hover:bg-green-100 group-hover:text-green-600">
                    {icons[l.label] || null}
                  </span>
                  <span className="flex-1">{l.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Bottom CTA section */}
          <div className="border-t border-gray-100 px-6 py-5">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
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
