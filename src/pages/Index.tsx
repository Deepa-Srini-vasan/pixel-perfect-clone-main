import { lazy, Suspense, useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import VideoHero from "../components/VideoHero";
import HeroSlider from "../components/HeroSlider";
import FeaturesBar from "@/components/FeaturesBar";
import InnovativeProducts from "@/components/InnovativeProducts";
import FeaturedProducts from "@/components/FeaturedProducts";
import PopularProducts from "@/components/PopularProducts";
import StatsCounter from "@/components/StatsCounter";
import OurBrands from "@/components/OurBrands";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import IndustriesServed from "@/components/IndustriesServed";
import WhyChoosePlumtek from "@/components/WhyChoosePlumtek";
import CertificationsSection from "@/components/CertificationsSection";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <TopBar />
      <Header />
      <main className="relative">
        <div data-reveal="up">
          <VideoHero />
        </div>
        <div data-reveal="up">
          <HeroSlider />
        </div>
        {/* Ambient background mesh */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse 600px 400px at 10% 20%, hsla(22,100%,48%,0.03), transparent),
              radial-gradient(ellipse 500px 500px at 90% 70%, hsla(38,100%,55%,0.02), transparent),
              radial-gradient(ellipse 400px 300px at 50% 50%, hsla(22,100%,48%,0.01), transparent)
            `,
          }}
        />

        <div data-reveal="up" data-reveal-delay="70">
          <FeaturesBar />
        </div>
        <div data-reveal="up" data-reveal-delay="100">
          <FeaturedProducts />
        </div>
        <div data-reveal="left" data-reveal-delay="120">
          <InnovativeProducts />
        </div>

        <div data-reveal="up" data-reveal-delay="150">
          <PopularProducts />
        </div>

        {/* ── NEW: Industries Served ── */}
        <div data-reveal="up" data-reveal-delay="160">
          <IndustriesServed />
        </div>

        <div data-reveal="zoom" data-reveal-delay="170">
          <StatsCounter />
        </div>

        {/* ── NEW: Why Choose Plumtek ── */}
        <div data-reveal="up" data-reveal-delay="175">
          <WhyChoosePlumtek />
        </div>

        <div data-reveal="up" data-reveal-delay="180">
          <OurBrands />
        </div>
        <div data-reveal="right" data-reveal-delay="190">
          <Testimonials />
        </div>

        {/* ── NEW: Certifications ── */}
        <div data-reveal="up" data-reveal-delay="200">
          <CertificationsSection />
        </div>

        <div data-reveal="up" data-reveal-delay="220">
          <CtaBanner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
