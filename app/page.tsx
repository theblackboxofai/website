import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { StatsSection } from "@/components/layout/sections/stats";

export const metadata = {
  title: "Black Box",
  description: "Decentralized AI powered by poor security",
  openGraph: {
    type: "website",
    title: "Black Box",
    description: "Decentralized AI powered by poor security",
  }
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
