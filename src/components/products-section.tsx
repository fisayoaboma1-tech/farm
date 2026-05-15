"use client";

import { motion } from "framer-motion";

const products = [
  {
    name: "Starches",
    description: "High-quality starch products for food and industrial use.",
    image: "https://images.unsplash.com/photo-1622484211143-e7e1b2e46e88?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Cereals",
    description: "Rice, maize, wheat supplied in bulk with quality assurance.",
    image: "https://images.unsplash.com/photo-1536304929837-5b2a6f3a03e2?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Dairy",
    description: "Fresh and processed dairy under strict standards.",
    image: "https://images.unsplash.com/photo-1628088062854-b1870b1e3c8b?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Fruit Purées",
    description: "Natural purées for beverages and food production.",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Honey",
    description: "Pure natural honey from trusted apiaries.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Rubber",
    description: "High-grade natural rubber for industrial use.",
    image: "https://images.unsplash.com/photo-1581088140497-7322f490d374?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Sugar",
    description: "Refined sugar for industrial and commercial use.",
    image: "https://images.unsplash.com/photo-1590534534499-3dcca6c64590?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Animal Feed",
    description: "Balanced feed for livestock growth and productivity.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef0c3e5f1?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Cheese",
    description: "Quality cheese meeting international standards.",
    image: "https://images.unsplash.com/photo-1552767059-ce1823656df1?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Flour",
    description: "Finely milled flour for baking and food production.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Fruits",
    description: "Fresh export-quality fruits from certified farms.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Meat",
    description: "Fresh and processed meat under strict hygiene control.",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Shrimp & Seafood",
    description: "Premium seafood for global markets.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Vegetables",
    description: "Fresh vegetables carefully sourced and supplied.",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Barley",
    description: "High-quality barley for food and brewing industries.",
    image: "https://images.unsplash.com/photo-1536304929837-5b2a6f3a03e2?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Coffee Beans",
    description: "Premium coffee beans with rich aroma and flavor.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Fish",
    description: "Fresh and dried fish for local and export markets.",
    image: "https://images.unsplash.com/photo-1533518463841-d62e1fc91373?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Grains",
    description: "Bulk grain supply with consistent quality.",
    image: "https://images.unsplash.com/photo-1536304929837-5b2a6f3a03e2?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Milk",
    description: "Fresh milk processed under strict safety standards.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Soyabean",
    description: "High-grade soybeans for oil and feed production.",
    image: "https://images.unsplash.com/photo-1604063155785-eeee881cad4a?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Butter",
    description: "Quality butter processed to global standards.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Cotton",
    description: "Premium cotton for textile manufacturing.",
    image: "https://images.unsplash.com/photo-1562184552-9972b7ce8e63?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Fruit Juice",
    description: "Natural juices with preserved nutrients and taste.",
    image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Herbs",
    description: "Fresh and dried herbs for culinary use.",
    image: "https://images.unsplash.com/photo-1585670149967-64cb1e0f0164?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Palm Oil",
    description: "Refined and crude palm oil for global use.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Spices",
    description: "Premium spices for aroma, flavor, and quality.",
    image: "https://images.unsplash.com/photo-1596098855309-ee8af7dac341?w=600&q=80&auto=format&fit=crop",
  },
];

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

export default function ProductsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 py-20 sm:py-28">
      {/* ── Grain texture overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* ── Subtle ambient glow ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Section header ── */}
        <motion.div
          className="mx-auto max-w-xl text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            className="inline-block text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70"
            variants={fadeScale}
          >
            Our Products
          </motion.span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Agricultural Products & Trading Solutions
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
            PT. Sultana Agro Lestari provides reliable sourcing, supply,
            and distribution of high-quality agricultural products.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/40 sm:text-base">
            We connect farmers, producers, and global markets through efficient
            and sustainable trading solutions.
          </p>
        </motion.div>

        {/* ── Products grid ── */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              custom={i}
              variants={productCardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]"
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