import ProductsHeroSection from "@/components/products-hero";
import ProductsGridSection from "@/components/products-grid";

export default function ProductsPage() {
  return (
    <main className="flex-1">
      <ProductsHeroSection />
      <div className="content-visibility-auto">
        <ProductsGridSection />
      </div>
    </main>
  );
}