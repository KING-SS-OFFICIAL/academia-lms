import HeroSection from "@/components/home/HeroSection";
import Specializations from "@/components/home/Specializations";
import WhyChoose from "@/components/home/WhyChoose";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Specializations />
      <WhyChoose />
      <StatsSection />
      <CTASection />
      <MobileBottomNav />
    </>
  );
}
