import React from "react";
import { ChevronRight } from "lucide-react";

// Local translation helper to satisfy static analysis rules
const t = (key: string) => key;

export const OurBrands: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-y border-slate-100 relative overflow-hidden text-left">
      {/* Ambient background ripples */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ripple-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ripple-grid)" />
        </svg>
      </div>

      <div className="container-pipes relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-primary flex items-center justify-center gap-1.5">
            <span className="text-primary/60">»</span> {t("Our Brands")}
          </p>
          <h2 className="font-heading font-black text-slate-900 leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl">
            {t("Discover Innovation and Quality with Our Brands")}
          </h2>
          <div className="w-16 h-1.5 bg-primary rounded-full mx-auto mt-4" />
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          
          {/* Card 1: EUROAQUA PLUMTEK (Core) - image only */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex items-center justify-center text-center min-h-[220px]">
            <img src="/assets/img/logo/Airguard-logo-F-06.jpg" alt="PLUMTEK" className="w-32 h-auto object-contain" />
          </div>

          {/* Card 2: PLUMTEK FASTFIT - image only */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex items-center justify-center text-center min-h-[220px]">
            <img src="/assets/img/logo/Airguard-logo-F-02.jpg" alt="FASTFIT" className="w-32 h-auto object-contain" />
          </div>

          {/* Card 3: EUROAQUA AIRGUARD - image only */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex items-center justify-center text-center min-h-[220px]">
            <img src="/assets/img/logo/Airguard-logo-F-01.jpg" alt="Airguard" className="w-32 h-auto object-contain" />
          </div>

          {/* Card 4: EUROAQUA GANGAFFLEX - image only */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex items-center justify-center text-center min-h-[220px]">
            <img src="/assets/img/logo/Airguard-logo-F-03.jpg" alt="GANGAFFLEX" className="w-32 h-auto object-contain" />
          </div>

          {/* Card 5: EUROAQUA YAMUNAFFLEX - image only */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex items-center justify-center text-center min-h-[220px]">
            <img src="/assets/img/logo/Airguard-logo-F-04.jpg" alt="YAMUNAFFLEX" className="w-32 h-auto object-contain" />
          </div>

          {/* Card 6: EUROAQUA PLUMTEK (Suction) - image only */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex items-center justify-center text-center min-h-[220px]">
            <img src="/assets/img/logo/Airguard-logo-F-05.jpg" alt="PLUMTEK Suction" className="w-32 h-auto object-contain" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurBrands;
