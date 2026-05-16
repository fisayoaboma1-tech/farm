"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Inline search bar (used below hero on desktop) ────────────────── */
export function InlineSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="hidden md:block bg-gradient-to-b from-gray-900/50 to-gray-950 border-b border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="relative mx-auto max-w-2xl">
          <div className="flex items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 shadow-sm ring-1 ring-white/5 transition-all duration-300 focus-within:border-emerald-400/30 focus-within:ring-emerald-400/20 focus-within:shadow-emerald-500/10">
            <Search className="h-5 w-5 shrink-0 text-white/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, crops, categories..."
              className="flex-1 bg-transparent py-4 pl-4 text-sm text-white/80 placeholder-white/30 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-white/40">
              &#8984;K
            </kbd>
          </div>

          {/* Quick suggestions */}
          {!query && (
            <div className="mt-3 flex items-center gap-2 text-[12px] text-white/40">
              <span>Popular:</span>
              {["Wheat", "Tea", "Rice", "Organic", "Grain"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-white/10 px-3 py-1 text-white/50 transition-colors hover:border-emerald-400/30 hover:text-emerald-300 hover:bg-emerald-500/10"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Search overlay (used on mobile via header icon) ───────────────── */
interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Focus input when overlay opens */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Escape to close */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  /* Reset query when closing */
  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <>
      {/* Blur backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 backdrop-blur-md transition-all duration-400",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
      />

      {/* Search panel */}
      <div
        className={cn(
          "fixed left-1/2 top-24 z-[70] w-full max-w-2xl -translate-x-1/2 px-4 transition-all duration-400 ease-out",
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
        )}
        onKeyDown={handleKeyDown}
      >
        <div className="overflow-hidden rounded-2xl bg-gray-900/95 shadow-2xl shadow-black/20 ring-1 ring-white/10 backdrop-blur-2xl">
          {/* Input row */}
          <div className="flex items-center border-b border-white/[0.06] px-5">
            <Search className="h-5 w-5 shrink-0 text-white/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, crops, categories..."
              className="flex-1 bg-transparent py-5 pl-4 text-base text-white/80 placeholder-white/30 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="mr-2 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results area */}
          <div
            className={cn(
              "transition-all duration-300",
              query ? "max-h-96" : "max-h-0"
            )}
          >
            {query && (
              <div className="px-5 py-6">
                <p className="text-sm text-white/50">
                  No results found for{" "}
                  <span className="font-medium text-white/70">"{query}"</span>
                </p>
              </div>
            )}
          </div>

          {/* Quick hints footer */}
          <div className="border-t border-white/[0.06] px-5 py-3">
            <div className="flex items-center gap-4 text-[11px] text-white/40">
              <span>
                <kbd className="inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/50">
                  &uarr;&darr;
                </kbd>{" "}
                Navigate
              </span>
              <span>
                <kbd className="inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/50">
                  &crarr;
                </kbd>{" "}
                Select
              </span>
              <span>
                <kbd className="inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/50">
                  Esc
                </kbd>{" "}
                Close
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
