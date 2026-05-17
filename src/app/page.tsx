import { auth } from "@/lib/auth";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import FeaturesSection from "@/components/features-section";
import ProductsSection from "@/components/products-section";
import OurProcessSection from "@/components/our-process";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex-1">
      <HeroSection
        isAuthenticated={!!session?.user}
        user={session?.user}
      />
      <div className="content-visibility-auto">
        <ServicesSection />
      </div>
      <div className="content-visibility-auto">
        <FeaturesSection />
      </div>
      <div className="content-visibility-auto">
        <ProductsSection />
      </div>
      <div className="content-visibility-auto">
        <OurProcessSection />
      </div>
    </main>
  );
}
