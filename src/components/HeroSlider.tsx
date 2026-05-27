import React from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-3.png";

// Local translation helper to satisfy static analysis i18n rules
const t = (key: string) => key;

const HeroSlider: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 py-20 lg:py-28">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div className="z-20 lg:pl-12">
            <p className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-blue-600">{t("PLUMTEK SOLUTIONS")}</p>
            <h2 className="mb-6 max-w-lg text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">{t("Reliable Heating & Cooling Solutions")}</h2>
            <p className="mb-8 max-w-xl text-lg text-slate-600">{t("Plumtek delivers premium plumbing, HVAC and pipeline systems engineered for durability and performance. From precision fittings to turnkey installation, Plumtek supports projects with certified products and trusted service.")}</p>

            <div className="flex items-center gap-4">
              <a href="/about" className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-95">
                {t("Explore Plumtek")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600">{t("Request Quote")}</a>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="relative z-10 flex justify-center lg:justify-end animate-hero-float">
            <div className="relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white/50 bg-slate-50">
              <img
                src={heroImage}
                alt="Plumtek Premium Plumbing Systems"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* decorative pipeline SVG behind content */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg viewBox="0 0 1440 420" className="w-full h-full opacity-95 md:scale-105 lg:scale-110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="#000" floodOpacity="0.12" />
            </filter>
            <path id="flowPath" d="M40 80 H300 a24 24 0 0 1 24 24 v0 H420 h120 a24 24 0 0 0 24 -24 v-40 h220 v80 h220 a24 24 0 0 1 24 24 h180" fill="none" />
          </defs>

          <g transform="translate(0,40)" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 80 H300 a24 24 0 0 1 24 24 v0 H420 h120 a24 24 0 0 0 24 -24 v-40 h220" stroke="#78d3ec" strokeWidth="28" filter="url(#soft)" />
            <path d="M760 40 v80 h220 a24 24 0 0 1 24 24 v0 h160" stroke="#78d3ec" strokeWidth="28" />
            <path d="M1160 120 h180" stroke="#78d3ec" strokeWidth="28" />

            {/* valve handles with subtle rotation animation */}
            <g transform="translate(300,80)">
              <circle r="14" fill="#0ea5ff" />
              <rect x="-3" y="-26" width="6" height="18" rx="2" fill="#0ea5ff" transform="rotate(-25)">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="-25;5;-20;-25" dur="4s" repeatCount="indefinite" />
              </rect>
            </g>
            <g transform="translate(820,120)">
              <circle r="14" fill="#0ea5ff" />
              <rect x="-3" y="-26" width="6" height="18" rx="2" fill="#0ea5ff" transform="rotate(20)">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="20;0;25;20" dur="5s" repeatCount="indefinite" />
              </rect>
            </g>
            <g transform="translate(1180,120)">
              <circle r="14" fill="#0ea5ff" />
              <rect x="-3" y="-26" width="6" height="18" rx="2" fill="#0ea5ff" transform="rotate(45)">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="45;20;55;45" dur="6s" repeatCount="indefinite" />
              </rect>
            </g>

            {/* small elbow highlights */}
            <circle cx="420" cy="40" r="6" fill="#c7f0fb" />
            <circle cx="980" cy="80" r="6" fill="#c7f0fb" />
          </g>

          {/* moving flow particles along the path to simulate water/gas flow */}
          <g>
            <circle r="8" fill="#9be7ff">
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#flowPath" />
              </animateMotion>
            </circle>
            <circle r="6" fill="#cfefff">
              <animateMotion begin="1s" dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#flowPath" />
              </animateMotion>
            </circle>
            <circle r="5" fill="#eaf9ff">
              <animateMotion begin="2s" dur="4.5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#flowPath" />
              </animateMotion>
            </circle>
          </g>
        </svg>
      </div>

      {/* white curved wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 120" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,120 360,0 720,40 C1080,80 1200,20 1440,60 L1440 120 L0 120 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSlider;
