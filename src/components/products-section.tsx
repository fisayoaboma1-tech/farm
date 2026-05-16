"use client";

import { motion } from "framer-motion";

const products = [
  {
    name: "Starches",
    description: "High-quality starch products for food and industrial use.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956938/WhatsApp_Image_2026-05-16_at_7.41.25_PM_nxsycb.jpg",
  },
  {
    name: "Cereals",
    description: "Rice, maize, wheat supplied in bulk with quality assurance.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956938/WhatsApp_Image_2026-05-16_at_7.41.25_PM_1_fervjr.jpg",
  },
  {
    name: "Dairy",
    description: "Fresh and processed dairy under strict standards.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956939/WhatsApp_Image_2026-05-16_at_7.41.26_PM_girs4a.jpg",
  },
  {
    name: "Fruit Purées",
    description: "Natural purées for beverages and food production.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956939/WhatsApp_Image_2026-05-16_at_7.41.27_PM_3_mjyl5d.jpg",
  },
  {
    name: "Honey",
    description: "Pure natural honey from trusted apiaries.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956938/WhatsApp_Image_2026-05-16_at_7.41.26_PM_2_zkdsow.jpg",
  },
  {
    name: "Rubber",
    description: "High-grade natural rubber for industrial use.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956938/WhatsApp_Image_2026-05-16_at_7.41.26_PM_3_mdujkz.jpg",
  },
  {
    name: "Sugar",
    description: "Refined sugar for industrial and commercial use.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956938/WhatsApp_Image_2026-05-16_at_7.41.26_PM_4_kxml8p.jpg",
  },
  {
    name: "Animal Feed",
    description: "Balanced feed for livestock growth and productivity.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956939/WhatsApp_Image_2026-05-16_at_7.41.27_PM_pjlcxi.jpg",
  },
  {
    name: "Cheese",
    description: "Quality cheese meeting international standards.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956939/WhatsApp_Image_2026-05-16_at_7.41.27_PM_1_qp88ji.jpg",
  },
  {
    name: "Flour",
    description: "Finely milled flour for baking and food production.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956939/WhatsApp_Image_2026-05-16_at_7.41.27_PM_2_narhho.jpg",
  },
  {
    name: "Fruits",
    description: "Fresh export-quality fruits from certified farms.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Meat",
    description: "Fresh and processed meat under strict hygiene control.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956940/WhatsApp_Image_2026-05-16_at_7.41.28_PM_y7xfvn.jpg",
  },
  {
    name: "Shrimp & Seafood",
    description: "Premium seafood for global markets.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956939/WhatsApp_Image_2026-05-16_at_7.41.28_PM_1_ma4uu2.jpg",
  },
  {
    name: "Vegetables",
    description: "Fresh vegetables carefully sourced and supplied.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956940/WhatsApp_Image_2026-05-16_at_7.41.28_PM_2_lo8bpe.jpg",
  },
  {
    name: "Barley",
    description: "High-quality barley for food and brewing industries.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956940/WhatsApp_Image_2026-05-16_at_7.41.28_PM_y7xfvn.jpg",
  },
  {
    name: "Coffee Beans",
    description: "Premium coffee beans with rich aroma and flavor.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956941/WhatsApp_Image_2026-05-16_at_7.41.29_PM_a7jvry.jpg",
  },
  {
    name: "Fish",
    description: "Fresh and dried fish for local and export markets.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956940/WhatsApp_Image_2026-05-16_at_7.41.29_PM_1_i2dwut.jpg",
  },
  {
    name: "Grains",
    description: "Bulk grain supply with consistent quality.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956940/WhatsApp_Image_2026-05-16_at_7.41.29_PM_2_fsdbk6.jpg",
  },
  {
    name: "Milk",
    description: "Fresh milk processed under strict safety standards.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778958170/WhatsApp_Image_2026-05-16_at_8.02.25_PM_aelana.jpg",
  },
  {
    name: "Soyabean",
    description: "High-grade soybeans for oil and feed production.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778958099/WhatsApp_Image_2026-05-16_at_8.00.58_PM_rjsixp.jpg",
  },
  {
    name: "Butter",
    description: "Quality butter processed to global standards.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956942/WhatsApp_Image_2026-05-16_at_7.41.30_PM_zvb7rl.jpg",
  },
  {
    name: "Cotton",
    description: "Premium cotton for textile manufacturing.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956940/WhatsApp_Image_2026-05-16_at_7.41.29_PM_3_suzbzv.jpg",
  },
  {
    name: "Fruit Juice",
    description: "Natural juices with preserved nutrients and taste.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956941/WhatsApp_Image_2026-05-16_at_7.41.30_PM_2_ybqpx0.jpg",
  },
  {
    name: "Herbs",
    description: "Fresh and dried herbs for culinary use.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956941/WhatsApp_Image_2026-05-16_at_7.41.30_PM_3_bkljeq.jpg",
  },
  {
    name: "Palm Oil",
    description: "Refined and crude palm oil for global use.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956942/WhatsApp_Image_2026-05-16_at_7.41.30_PM_4_bmw37i.jpg",
  },
  {
    name: "Spices",
    description: "Premium spices for aroma, flavor, and quality.",
    image: "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778956942/WhatsApp_Image_2026-05-16_at_7.41.31_PM_hmsmbd.jpg",
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

interface ProductsSectionProps {
  showHeader?: boolean;
}

export default function ProductsSection({ showHeader = true }: ProductsSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 ${showHeader ? "py-20 sm:py-28" : "pb-20 sm:pb-28"}`}>
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