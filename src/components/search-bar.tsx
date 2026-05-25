"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { products, type Product } from "@/data/products";
import { dispatchHighlight } from "@/hooks/use-search-highlight";

/* ── Inline search bar (used overlaid on hero on desktop) ──────────── */
export function InlineSearch({ overlay = false }: { overlay?: boolean }) {
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = useCallback((product: Product) => {
    setQuery("");
    setFocusedIndex(-1);
    dispatchHighlight(product.name);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[focusedIndex]);
    }
  };
 
  return overlay ? (
    /* ── Overlay variant (floating on top of hero) ── */
    <div className="absolute left-0 right-0 top-0 z-30 hidden md:block">
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:pt-24">
        <div className="relative mx-auto max-w-2xl">
          <div className="flex items-center rounded-2xl border border-white/15 bg-black/50 px-5 shadow-lg ring-1 ring-white/10 transition-all duration-300 focus-within:border-emerald-400/40 focus-within:ring-emerald-400/30 focus-within:shadow-emerald-500/20 backdrop-blur-lg">
            <Search className="h-5 w-5 shrink-0 text-white/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setFocusedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search products, crops, categories..."
              className="flex-1 bg-transparent py-4 pl-4 text-sm text-white/80 placeholder-white/30 outline-none"
            />                                  
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setFocusedIndex(-1);
                }}
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

          {/* Quick suggestions when no query */}
          {!query && (
            <div className="mt-3 flex items-center gap-2 text-[12px] text-white/50">
              <span>Popular:</span>
              {["Starches", "Spices", "Herbs"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-white/15 px-3 py-1 text-white/60 transition-colors hover:border-emerald-400/40 hover:text-emerald-300 hover:bg-emerald-500/15"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Recommendation dropdown */}
          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/[0.06] bg-gray-900/95 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <ul className="max-h-72 overflow-y-auto py-2">
                {results.map((product, i) => (
                  <li
                    key={product.name}
                    onClick={() => handleSelect(product)}
                    onMouseEnter={() => setFocusedIndex(i)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 px-4 py-3 text-sm transition-colors",
                      i === focusedIndex
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-[11px] text-white/40 line-clamp-1">
                        {product.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* No results message */}
          {query.trim() && results.length === 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/[0.06] bg-gray-900/95 px-5 py-6 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <p className="text-sm text-white/50">
                No products found for{" "}
                <span className="font-medium text-white/70">"{query}"</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    /* ── Standalone variant (used outside hero) ── */
    <section className="hidden md:block bg-gradient-to-b from-gray-900/50 to-gray-950 border-b border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="relative mx-auto max-w-2xl">
          <div className="flex items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 shadow-sm ring-1 ring-white/5 transition-all duration-300 focus-within:border-emerald-400/30 focus-within:ring-emerald-400/20 focus-within:shadow-emerald-500/10">
            <Search className="h-5 w-5 shrink-0 text-white/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setFocusedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search products, crops, categories..."
              className="flex-1 bg-transparent py-4 pl-4 text-sm text-white/80 placeholder-white/30 outline-none"
            />                                  
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setFocusedIndex(-1);
                }}
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

          {/* Quick suggestions when no query */}
          {!query && (
            <div className="mt-3 flex items-center gap-2 text-[12px] text-white/40">
              <span>Popular:</span>
              {["Starches", "Spices", "Herbs"].map((tag) => (
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

          {/* Recommendation dropdown */}
          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/[0.06] bg-gray-900/95 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <ul className="max-h-72 overflow-y-auto py-2">
                {results.map((product, i) => (
                  <li
                    key={product.name}
                    onClick={() => handleSelect(product)}
                    onMouseEnter={() => setFocusedIndex(i)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 px-4 py-3 text-sm transition-colors",
                      i === focusedIndex
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-[11px] text-white/40 line-clamp-1">
                        {product.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* No results message */}
          {query.trim() && results.length === 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/[0.06] bg-gray-900/95 px-5 py-6 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <p className="text-sm text-white/50">
                No products found for{" "}
                <span className="font-medium text-white/70">"{query}"</span>
              </p>
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

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
    setFocusedIndex(-1);
    onClose();
  };

  const handleSelect = useCallback(
    (product: Product) => {
      setQuery("");
      setFocusedIndex(-1);
      onClose();
      dispatchHighlight(product.name);
    },
    [onClose]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[focusedIndex]);
    }
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
              onChange={(e) => {
                setQuery(e.target.value);
                setFocusedIndex(-1);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search products, crops, categories..."
              className="flex-1 bg-transparent py-5 pl-4 text-base text-white/80 placeholder-white/30 outline-none"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setFocusedIndex(-1);
                }}
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
          {(query && results.length > 0) || (query && results.length === 0) ? (
            <div className="transition-all duration-300 max-h-96">
              {query && results.length > 0 && (
                <ul className="max-h-72 overflow-y-auto py-2">
                  {results.map((product, i) => (
                    <li
                      key={product.name}
                      onClick={() => handleSelect(product)}
                      onMouseEnter={() => setFocusedIndex(i)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 px-5 py-3 text-sm transition-colors",
                        i === focusedIndex
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                      )}
                    >
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-[11px] text-white/40 line-clamp-1">
                          {product.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {query && results.length === 0 && (
                <div className="px-5 py-6 text-center">
                  <p className="text-sm text-white/50">
                    No products found for{" "}
                    <span className="font-medium text-white/70">"{query}"</span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-h-0" />
          )}

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