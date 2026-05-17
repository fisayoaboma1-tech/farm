"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { subscribeHighlight } from "@/hooks/use-search-highlight";

const productCardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

interface ProductsSectionProps {
  showHeader?: boolean;
}

export default function ProductsSection({ showHeader = true }: ProductsSectionProps) {
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const productRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const blinkTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const setProductRef = useCallback(
    (name: string) => (el: HTMLDivElement | null) => {
      if (el) productRefs.current.set(name, el);
      else productRefs.current.delete(name);
    },
    []
  );

  useEffect(() => {
    return subscribeHighlight((productName) => {
      // Clear any existing blink timer for this product
      const existing = blinkTimers.current.get(productName);
      if (existing) clearTimeout(existing);

      // Remove highlight from any previously highlighted product
      setHighlightedProduct((prev) => {
        if (prev && prev !== productName) {
          const oldEl = productRefs.current.get(prev);
          if (oldEl) {
            oldEl.style.boxShadow = "";
            oldEl.style.borderColor = "";
          }
        }
        return productName;
      });

      // Scroll to the product
      const el = productRefs.current.get(productName);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });

        // Apply green border glow
        el.style.boxShadow = "0 0 0 2px #10b981, 0 0 20px rgba(16, 185, 129, 0.3)";
        el.style.borderColor = "#10b981";
        el.style.transition = "box-shadow 0.3s ease, border-color 0.3s ease";

        // Remove after 3 seconds
        const timer = setTimeout(() => {
          el.style.boxShadow = "";
          el.style.borderColor = "";
          setHighlightedProduct((current) =>
            current === productName ? null : current
          );
          blinkTimers.current.delete(productName);
        }, 3000);

        blinkTimers.current.set(productName, timer);
      }
    });
  }, []);

  return (
    <section
      id="products-section"
      className={`relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 ${showHeader ? "py-20 sm:py-28" : "pb-20 sm:pb-28"}`}
    >
      {/* ── Grain texture overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* ── Subtle ambient glow ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Section header ── */}
        {showHeader && (
          <motion.div
            className="mx-auto max-w-xl text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.span
              className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70"
              variants={fadeScale}
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400/40" />
              Our Products
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400/40" />
            </motion.span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Agricultural Products & Trading Solutions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
              MULIARAYA provides reliable sourcing, supply,
              and distribution of high-quality agricultural products.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/40 sm:text-base">
              We connect farmers, producers, and global markets through efficient
              and sustainable trading solutions.
            </p>
          </motion.div>
        )}

        {/* ── Products grid ── */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              ref={setProductRef(product.name)}
              id={`product-${product.name.replace(/\s+/g, "-").toLowerCase()}`}
              custom={i}
              variants={productCardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]"
              style={{
                boxShadow:
                  highlightedProduct === product.name
                    ? "0 0 0 2px #10b981, 0 0 20px rgba(16, 185, 129, 0.3)"
                    : undefined,
                borderColor:
                  highlightedProduct === product.name ? "#10b981" : undefined,
              }}
            >
              {/* Product image — large width, good height */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content — below image */}
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-sm font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                  {product.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/50">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}