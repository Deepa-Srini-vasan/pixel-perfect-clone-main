import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import hero1 from "@/assets/3d-assets/hero1.png";
import hero2 from "@/assets/3d-assets/pipe_set.png";
import hero3 from "@/assets/3d-assets/valve.png";

const slides = [
  {
    image: hero1,
    subtitle: "Shop Collection",
    title: "Reliable Pipes & Fittings",
    description:
      "Premium plumbing solutions",
    cta: "Shop Now",
  },
  {
    image: hero2,
    subtitle: "Featured Range",
    title: "Durable Pipe Systems",
    description:
      "Professional-grade materials",
    cta: "Shop Now",
  },
  {
    image: hero3,
    subtitle: "Precision Control",
    title: "Industrial Valves",
    description:
      "Excellence in flow management",
    cta: "Shop Now",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((value) => (value + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== current) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const activeSlide = slides[current];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Premium cinematic lighting effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10" />

      {/* Large brand title background - premium watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="font-heading text-[25vw] font-black leading-none tracking-tighter bg-gradient-to-r from-blue-900/4 to-cyan-900/4 bg-clip-text text-transparent select-none whitespace-nowrap">
            PREMIUM
          </h2>
        </div>
      </div>

      <div className="container-pipes relative h-full min-h-screen py-16 md:py-20 lg:py-24 flex items-center">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 w-full">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center z-10 max-w-2xl">
            {/* Premium Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200/50 w-fit mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">Premium Collection</span>
            </div>

            {/* Subtitle */}
            <p className={`text-xs md:text-sm font-semibold uppercase tracking-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {activeSlide.subtitle}
            </p>

            {/* Main Title - Premium Typography */}
            <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] -tracking-[0.015em] bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-900 bg-clip-text text-transparent mb-6 font-black">
                {activeSlide.title}
              </h1>
            </div>
            
            {/* Description - Premium style */}
            <p className={`text-base md:text-lg text-slate-600 leading-relaxed transition-all duration-300 mb-10 max-w-md font-light ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {activeSlide.description}
            </p>

            {/* CTA Buttons - Premium design */}
            <div className={`flex gap-4 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <a
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-sm font-bold uppercase tracking-[1.5px] text-white rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 hover:from-blue-700 hover:to-cyan-700"
              >
                {activeSlide.cta}
                <ArrowRight className="h-5 w-5" />
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-[1.5px] text-blue-600 rounded-full transition-all duration-300 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right: Image + Thumbnails - Premium styling */}
          <div className="relative flex flex-col items-center justify-center lg:items-end z-10">
            {/* Main Product Image - Premium frame */}
            <div className={`relative w-full max-w-2xl transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {/* Premium glow effect */}
              <div className="absolute -inset-16 bg-gradient-to-br from-blue-400/20 via-cyan-400/10 to-transparent rounded-3xl blur-3xl" />
              <div className="absolute -inset-12 bg-gradient-to-tr from-cyan-300/15 to-blue-300/15 rounded-3xl blur-2xl" />
              
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-xl border border-blue-200/30 p-8 shadow-2xl">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Thumbnail Rail - Premium design */}
            <div className="mt-10 lg:mt-0 flex flex-row lg:flex-col gap-4 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  type="button"
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 flex-shrink-0 backdrop-blur-sm border ${
                    index === current
                      ? 'ring-2 ring-blue-500 ring-offset-2 w-32 h-32 shadow-xl shadow-blue-500/20 bg-white/90'
                      : 'w-28 h-28 opacity-60 hover:opacity-80 border-blue-200/50 bg-white/60 hover:border-blue-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
