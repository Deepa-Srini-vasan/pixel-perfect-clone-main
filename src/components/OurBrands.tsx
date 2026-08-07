import React from "react";

const t = (key: string) => key;

export const OurBrands: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-y border-slate-100 relative overflow-hidden text-left">
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

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-blue-600 flex items-center justify-center gap-1.5">
            <span className="text-blue-600/60">»</span> {t("Our Brands")}
          </p>
          <h2 className="font-heading font-black text-slate-900 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("Discover Innovation and Quality with Our Brands")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 rounded-full mx-auto mt-3" />
        </div>

        {/* Brands Grid - 2 Column Grid on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          
          {/* Card 1: EUROAQUA PLUMTEK */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[160px]">
            <img src="/assets/img/logo/Airguard-logo-F-06.jpg" alt="PLUMTEK" className="max-h-12 sm:max-h-16 w-auto object-contain" />
          </div>

          {/* Card 2: PLUMTEK FASTFIT */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[160px]">
            <img src="/assets/img/logo/Airguard-logo-F-02.jpg" alt="FASTFIT" className="max-h-12 sm:max-h-16 w-auto object-contain" />
          </div>

          {/* Card 3: EUROAQUA AIRGUARD */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[160px]">
            <img src="/assets/img/logo/Airguard-logo-F-01.jpg" alt="Airguard" className="max-h-12 sm:max-h-16 w-auto object-contain" />
          </div>

          {/* Card 4: EUROAQUA GANGAFFLEX */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[160px]">
            <img src="/assets/img/logo/Airguard-logo-F-03.jpg" alt="GANGAFFLEX" className="max-h-12 sm:max-h-16 w-auto object-contain" />
          </div>

          {/* Card 5: EUROAQUA YAMUNAFFLEX */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[160px]">
            <img src="/assets/img/logo/Airguard-logo-F-04.jpg" alt="YAMUNAFFLEX" className="max-h-12 sm:max-h-16 w-auto object-contain" />
          </div>

          {/* Card 6: EUROAQUA PLUMTEK (Suction) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[160px]">
            <img src="/assets/img/logo/Airguard-logo-F-05.jpg" alt="PLUMTEK Suction" className="max-h-12 sm:max-h-16 w-auto object-contain" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurBrands;
