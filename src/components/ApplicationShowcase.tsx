import React, { useState } from 'react';
import { Home, Droplet, Factory, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEXT = {
  sectionTitle: "Versatile Engineered Applications",
  sectionSubtitle: "Where Plumtek Excels",
  sectionDesc: "Our piping systems are custom-engineered to meet the strict demands of different fluid environments, ranging from drinking water to heavy chemical transit.",
  benefitsTitle: "Engineering Benefits",
  viewProductsButton: "View Related Products"
};

interface AppCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  header: string;
  body: string;
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
}

const appCategories: AppCategory[] = [
  {
    id: "residential",
    icon: Home,
    title: "Potable Water",
    subtitle: "Residential & Commercial",
    header: "Lead-Free Hot & Cold Water Distribution",
    body: "Safe drinking water is the foundation of living spaces. Our premium SDR 11 CPVC pipes and fittings are NSF/ANSI 61 and IS 15778 approved, entirely lead-free, and formulated to resist high temperature domestic water lines up to 93°C with zero chemical leaching.",
    metrics: [
      { label: "Temp Limit", value: "93°C / 200°F" },
      { label: "Toxicity", value: "0% Leaching" },
      { label: "Design Life", value: "50+ Years" }
    ],
    bulletPoints: [
      "Rigid construction prevents sagging and thermal bending.",
      "Completely scale-resistant internal surfaces maintain pressure.",
      "Excellent resistance to highly chlorinated domestic water sanitizers."
    ]
  },
  {
    id: "agricultural",
    icon: Droplet,
    title: "Agricultural Sizing",
    subtitle: "Irrigation & Borewell",
    header: "High Pressure Farming & Flow Distribution",
    body: "Agricultural plumbing systems operate under relentless high-pressure water delivery and rough external UV rays. Our Schedule 40 UPVC line offers thick-walled durability and smooth internal flow coefficient (C=150) to optimize irrigation pump yields and minimize energy drag.",
    metrics: [
      { label: "Flow Coefficient", value: "C = 150 (Ideal)" },
      { label: "UV Guard", value: "High Shield" },
      { label: "Chemicals", value: "Fertilizer Safe" }
    ],
    bulletPoints: [
      "Optimized flow dynamics reduces horsepower requirements.",
      "High impact resistance prevents fractures in rocky terrains.",
      "Heavy duty joint solvents prevent blowouts in heavy surges."
    ]
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Process Piping",
    subtitle: "Chemicals & Processing",
    header: "Corrosive Chemical & High Heat Transit",
    body: "Corrosive industrial chemical routing calls for advanced physical stability. Plumtek industrial Schedule 80 systems are meticulously engineered to handle highly concentrated acids, alkalis, saline solutions, and high-heat process liquids with zero degradation.",
    metrics: [
      { label: "Class Rating", value: "Schedule 80" },
      { label: "Corrosion", value: "100% Resistant" },
      { label: "Wall Profile", value: "Extra Heavy" }
    ],
    bulletPoints: [
      "Excellent mechanical strength enables long support spacing.",
      "Lead-free, non-toxic, and chemically inert properties.",
      "Resilient under extreme physical impact and pressure surges."
    ]
  },
  {
    id: "sewerage",
    icon: Trash2,
    title: "Gravity Drainage",
    subtitle: "Sewerage & Waste",
    header: "Acoustic, Clog-Free Gravity Sanitation",
    body: "Modern sewerage requires swift, silent, leak-free sanitation lines. Our gravity drainage systems utilize precise socket dimensions and smooth joint paths to ensure gravity sewage moves instantly, resisting deep-earth pressure loads without deformation.",
    metrics: [
      { label: "Friction Loss", value: "Near-Zero" },
      { label: "Earth Load", value: "Deform-Proof" },
      { label: "Seal Type", value: "High Grade O-Ring" }
    ],
    bulletPoints: [
      "Ultra-smooth internal lining prevents organic waste build-ups.",
      "Excellent acoustic dampening reduces drain noises in walls.",
      "Double sealing systems ensure zero subsoil contamination."
    ]
  }
];

const ApplicationShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("residential");

  const currentApp = appCategories.find(c => c.id === activeTab) || appCategories[0];

  return (
    <section className="py-24 bg-white border-b border-slate-200/50 text-left">
      <div className="container-pipes">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
            {TEXT.sectionTitle}
          </p>
          <h2 className="font-heading font-black text-slate-900 leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl">
            {TEXT.sectionSubtitle}
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            {TEXT.sectionDesc}
          </p>
        </div>

        {/* ── Tabs & Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Tab Selectors */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 hide-scrollbar shrink-0">
            {appCategories.map((app) => {
              const Icon = app.icon;
              const isSelected = app.id === activeTab;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveTab(app.id)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 w-[240px] lg:w-full shrink-0 focus:outline-none ${isSelected
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/10'
                      : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200/60 text-slate-700'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isSelected ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-slate-200 text-primary shadow-sm'
                    }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-heading font-black text-[14.5px] leading-tight tracking-tight ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {app.title}
                    </h3>
                    <p className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {app.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Card */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200/60 rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden animate-slide-in">
            {/* Ambient detail */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-6">

              {/* Category Subtitle */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  {currentApp.subtitle}
                </p>
                <h3 className="font-heading font-black text-slate-800 text-2xl md:text-3xl tracking-tight mt-1">
                  {currentApp.header}
                </h3>
              </div>

              {/* Main Copy */}
              <p className="text-[14px] md:text-[15px] text-slate-500 font-medium leading-relaxed">
                {currentApp.body}
              </p>

              {/* Core metrics badges */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200/60">
                {currentApp.metrics.map((m, idx) => (
                  <div key={idx} className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                    <p className="text-[15px] md:text-[17px] font-heading font-black text-slate-800 mt-1">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Custom Bullet List */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  {TEXT.benefitsTitle}
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentApp.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600 font-bold leading-tight">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explore Button */}
              <div className="pt-4 flex">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 font-heading font-black text-primary hover:text-primary/90 text-xs uppercase tracking-wider group"
                >
                  {TEXT.viewProductsButton}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ApplicationShowcase;
