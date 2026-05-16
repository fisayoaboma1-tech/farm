import ProductsHeroSection from "@/components/products-hero";
import ProductsSection from "@/components/products-section";

export default function ProductsPage() {
  return (
    <main className="flex-1">
      <ProductsHeroSection />
      <ProductsSection showHeader={false} />
    </main>
  );
}