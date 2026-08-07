import React from "react";
import { ArrowRight, MessageSquare, Handshake, Globe, Package, Users } from "lucide-react";
import MascotGreeting from "@/assets/3d-assets/plumtek.png";

// Import product bubble cutouts
import TapImage from "@/assets/3d-assets/tap.png";
import ShowerImage from "@/assets/3d-assets/shower.png";
import ValveImage from "@/assets/3d-assets/valve.png";
import PipeFittingsImage from "@/assets/3d-assets/pipe_fittings.png";
import CoilImage from "@/assets/3d-assets/coil.png";
import TeeImage from "@/assets/3d-assets/tee.png";

const FaucetIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-1.5 1.5M3 16.5v-3.75A3.75 3.75 0 016.75 9h5.25m0 0a3.75 3.75 0 013.75 3.75V16.5m-3.75-7.5V6.75a3 3 0 00-3-3h-1.5m10.5 6.75H21a.75.75 0 000-1.5h-1.5m0 1.5v3.75a1.5 1.5 0 01-1.5 1.5h-1.5" />
  </svg>
);

const ShowerIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M5 12H3M21 12h-2M18.36 5.64l-1.42 1.42M7.05 16.95l-1.42 1.42M5.64 5.64l1.42 1.42M16.95 16.95l1.42 1.42" />
  </svg>
);

const ValveIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PipesIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const HoseIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0 7.5 7.5 0 00-15 0z" />
  </svg>
);

const AccessoriesIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const categories = [
  { name: "Faucets", slug: "taps-faucets-accessories", icon: FaucetIcon },
  { name: "Showers", slug: "taps-faucets-accessories", icon: ShowerIcon },
  { name: "Valves", slug: "taps-faucets-accessories", icon: ValveIcon },
  { name: "Pipes & Fittings", slug: "ppr-fittings", icon: PipesIcon },
  { name: "Hoses", slug: "taps-faucets-accessories", icon: HoseIcon },
  { name: "Accessories", slug: "taps-faucets-accessories", icon: AccessoriesIcon },
];

const HeroSlider: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-20 border-b border-slate-100">
      {/* Light soft curved mesh overlay background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50/70 via-transparent to-transparent opacity-60 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0/40_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0/40_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
          
          {/* Left Column Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            <span className="mb-3 sm:mb-4 inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-blue-100 bg-blue-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 shrink-0">
              Euro Plumber Tech Private Limited
            </span>
            
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.1] sm:leading-[1.05] tracking-tight">
              Engineering <span className="text-blue-600">Reliable</span><br className="hidden sm:block" />
              Flow Solutions.
            </h1>
            
            <p className="mb-6 sm:mb-8 max-w-xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-500 font-medium">
              From premium fittings and valves to speedy product advice, Euro Plumber Tech Private Limited combines advanced plumbing engineering with centralized inquiry management.
            </p>

            {/* CTA Buttons - Full Width Responsive on Mobile */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a 
                href="/shop" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-blue-600 hover:bg-blue-750 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Our Range
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-6 py-3.5 text-sm font-extrabold text-slate-700 transition-all duration-300 hover:-translate-y-0.5"
              >
                Request Quote
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </a>
            </div>

            {/* Trust/Stats Cards Row - Perfectly Aligned Grid on Mobile */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100/90 shadow-[0_8px_30px_rgba(15,23,42,0.03)] p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 items-center justify-between gap-4 sm:gap-4 mb-8">
              <div className="flex flex-col items-center text-center">
                <Handshake className="w-5 h-5 text-blue-600 mb-1.5" />
                <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900">25+</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Years of<br />Excellence</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="w-5 h-5 text-blue-600 mb-1.5" />
                <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900">20+</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Countries<br />Served</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Package className="w-5 h-5 text-blue-600 mb-1.5" />
                <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900">500+</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Premium<br />Products</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="w-5 h-5 text-blue-600 mb-1.5" />
                <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900">100K+</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Happy<br />Customers</span>
              </div>
            </div>

            {/* Shop By Category Row - Clean Mobile 2/3/6 Grid */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider">Shop By Category</h3>
                <a href="/shop" className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                  View All
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 w-full">
                {categories.map((cat, idx) => (
                  <a
                    key={idx}
                    href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                    className="flex flex-col items-center gap-1.5 bg-slate-50/70 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl p-2.5 text-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white shadow-xs text-blue-600 shrink-0">
                      <cat.icon />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 leading-tight truncate w-full">{cat.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Mascot Image */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[260px] sm:h-[340px] lg:h-[650px] z-10 select-none mt-4 lg:mt-0">
            <div className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[440px] md:h-[440px] z-10">
              <img 
                src={MascotGreeting} 
                alt="Plumtek Mascot Ollie" 
                className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(37,99,235,0.18)]"
              />
            </div>

            {/* Floating Bubbles Columns - Desktop only */}
            <div className="hidden lg:block">
              {/* Faucets */}
              <div className="absolute top-[6%] left-[8%] flex flex-col items-center gap-1.5 animate-float-slow z-20">
                <div className="w-[76px] h-[76px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src={TapImage} alt="Faucet" className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Faucets</span>
              </div>

              {/* Valves */}
              <div className="absolute top-[38%] left-[2%] flex flex-col items-center gap-1.5 animate-float-mid z-20">
                <div className="w-[76px] h-[76px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src={ValveImage} alt="Valves" className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Valves</span>
              </div>

              {/* Pipes */}
              <div className="absolute top-[70%] left-[10%] flex flex-col items-center gap-1.5 animate-float-fast z-20">
                <div className="w-[76px] h-[76px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src={PipeFittingsImage} alt="Pipes" className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Pipes</span>
              </div>

              {/* Showers */}
              <div className="absolute top-[8%] right-[8%] flex flex-col items-center gap-1.5 animate-float-mid z-20">
                <div className="w-[76px] h-[76px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src={ShowerImage} alt="Showers" className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Showers</span>
              </div>

              {/* Hoses */}
              <div className="absolute top-[40%] right-[2%] flex flex-col items-center gap-1.5 animate-float-slow z-20">
                <div className="w-[76px] h-[76px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src={CoilImage} alt="Hoses" className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Hoses</span>
              </div>

              {/* Fittings */}
              <div className="absolute top-[72%] right-[10%] flex flex-col items-center gap-1.5 animate-float-fast z-20">
                <div className="w-[76px] h-[76px] bg-white rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src={TeeImage} alt="Fittings" className="w-full h-full object-contain" />
                </div>
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Fittings</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
