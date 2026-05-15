"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Inline search bar (used below hero on desktop) ────────────────── */
export function InlineSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="hidden md:block bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="relative mx-auto max-w-2xl">
          <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 focus-within:border-emerald-300 focus-within:ring-emerald-200/50 focus-within:shadow-md">
            <Search className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, crops, categories..."
              className="flex-1 bg-transparent py-4 pl-4 text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-400">
              &#8984;K
            </kbd>
          </div>

          {/* Quick suggestions */}
          {!query && (
            <div className="mt-3 flex items-center gap-2 text-[12px] text-gray-400">
              <span>Popular:</span>
              {["Wheat", "Tea", "Rice", "Organic", "Grain"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-gray-200 px-3 py-1 transition-colors hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
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
        <div className="overflow-hidden rounded-2xl bg-white/95 shadow-2xl shadow-black/20 ring-1 ring-black/5 backdrop-blur-2xl">
          {/* Input row */}
          <div className="flex items-center border-b border-gray-100 px-5">
            <Search className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, crops, categories..."
              className="flex-1 bg-transparent py-5 pl-4 text-base text-gray-900 placeholder-gray-400 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="mr-2 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
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
                <p className="text-sm text-gray-500">
                  No results found for{" "}
                  <span className="font-medium text-gray-700">"{query}"</span>
                </p>
              </div>
            )}
          </div>

          {/* Quick hints footer */}
          <div className="border-t border-gray-100 px-5 py-3">
            <div className="flex items-center gap-4 text-[11px] text-gray-400">
              <span>
                <kbd className="inline-flex items-center rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                  &uarr;&darr;
                </kbd>{" "}
                Navigate
              </span>
              <span>
                <kbd className="inline-flex items-center rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                  &crarr;
                </kbd>{" "}
                Select
              </span>
              <span>
                <kbd className="inline-flex items-center rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
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
