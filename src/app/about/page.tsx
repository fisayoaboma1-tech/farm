import AboutHeroSection from "@/components/about-hero";
import AboutValuesSection from "@/components/about-values";
import AboutJourneySection from "@/components/about-journey";
import AboutCertificationsSection from "@/components/about-certifications";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHeroSection />
      <div className="content-visibility-auto">
        <AboutValuesSection />
      </div>
      <div className="content-visibility-auto">
        <AboutJourneySection />
      </div>
      <div className="content-visibility-auto">
        <AboutCertificationsSection />
      </div>
    </main>
  );
}