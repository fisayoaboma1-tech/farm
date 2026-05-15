"use client";

const products = [
  { name: "Starches", description: "High-quality starch products for food and industrial use." },
  { name: "Cereals", description: "Rice, maize, wheat supplied in bulk with quality assurance." },
  { name: "Dairy", description: "Fresh and processed dairy under strict standards." },
  { name: "Fruit Purées", description: "Natural purées for beverages and food production." },
  { name: "Honey", description: "Pure natural honey from trusted apiaries." },
  { name: "Rubber", description: "High-grade natural rubber for industrial use." },
  { name: "Sugar", description: "Refined sugar for industrial and commercial use." },
  { name: "Animal Feed", description: "Balanced feed for livestock growth and productivity." },
  { name: "Cheese", description: "Quality cheese meeting international standards." },
  { name: "Flour", description: "Finely milled flour for baking and food production." },
  { name: "Fruits", description: "Fresh export-quality fruits from certified farms." },
  { name: "Meat", description: "Fresh and processed meat under strict hygiene control." },
  { name: "Shrimp & Seafood", description: "Premium seafood for global markets." },
  { name: "Vegetables", description: "Fresh vegetables carefully sourced and supplied." },
  { name: "Barley", description: "High-quality barley for food and brewing industries." },
  { name: "Coffee Beans", description: "Premium coffee beans with rich aroma and flavor." },
  { name: "Fish", description: "Fresh and dried fish for local and export markets." },
  { name: "Grains", description: "Bulk grain supply with consistent quality." },
  { name: "Milk", description: "Fresh milk processed under strict safety standards." },
  { name: "Soyabean", description: "High-grade soybeans for oil and feed production." },
  { name: "Butter", description: "Quality butter processed to global standards." },
  { name: "Cotton", description: "Premium cotton for textile manufacturing." },
  { name: "Fruit Juice", description: "Natural juices with preserved nutrients and taste." },
  { name: "Herbs", description: "Fresh and dried herbs for culinary use." },
  { name: "Palm Oil", description: "Refined and crude palm oil for global use." },
  { name: "Spices", description: "Premium spices for aroma, flavor, and quality." },
];

export default function ProductsGridSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 pb-20 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]"
            >
              <h3 className="text-sm font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                {product.name}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/50">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}