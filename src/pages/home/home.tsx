import { AboutUsSection } from "./components/reviews-section";
import { FeaturesSection } from "./components/features-section";
import { FAQsSection } from "./components/faqs-section";
import { HeroSection } from "./components/hero-section";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ClientsSection } from "./components/clients-section";

export const HomePage = () => {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <ClientsSection />
      <FeaturesSection />
      <AboutUsSection />
      <FAQsSection />
      <Footer />
    </div>
  );
};
