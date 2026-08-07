import { motion } from "framer-motion";
import MascotImg from "@/assets/3d-assets/1.png";
import {
  ShieldCheck,
  Award,
  Globe,
  Lightbulb,
  Headphones,
  Truck,
  Trophy,
  Package,
} from "lucide-react";

const sectors = [
  {
    icon: ShieldCheck,
    title: "ISO Certified Quality",
    desc: "Every product manufactured to strict ISO standards — ensuring unmatched consistency and safety.",
    glowClass: "bg-blue-50 text-blue-600 border border-blue-100",
  },
  {
    icon: Award,
    title: "25+ Years of Excellence",
    desc: "A trusted name since 1998 — two and a half decades of industry-leading experience.",
    glowClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  },
  {
    icon: Globe,
    title: "Pan India & Export Ready",
    desc: "18+ branches across India with active exports to Sri Lanka, Africa, and other global markets.",
    glowClass: "bg-purple-50 text-purple-600 border border-purple-100",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "Creators of India's first Pushfit system — PLUMTEK FASTFIT — and South India's first PPR pipe manufacturer.",
    glowClass: "bg-orange-50 text-orange-600 border border-orange-100",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Technical sales support, installation guidance, and rapid response — every step of the project.",
    glowClass: "bg-cyan-50 text-cyan-600 border border-cyan-100",
  },
  {
    icon: Truck,
    title: "Reliable Supply Chain",
    desc: "In-house manufacturing + a robust logistics network ensures on-time delivery, every time.",
    glowClass: "bg-sky-50 text-sky-600 border border-sky-100",
  },
  {
    icon: Trophy,
    title: "Industry Recognition",
    desc: "Multiple national awards for manufacturing excellence and product innovation across categories.",
    glowClass: "bg-amber-50 text-amber-600 border border-amber-100",
  },
  {
    icon: Package,
    title: "492+ Products",
    desc: "One of the widest portfolios in the plumbing sector — covering pipes, fittings, taps, hoses, and more.",
    glowClass: "bg-pink-50 text-pink-600 border border-pink-100",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const IndustriesServed = () => (
  <section className="relative overflow-hidden text-left">
    {/* ── TOP SECTION (LIGHT BG) ── */}
    <div className="py-8 sm:py-16 lg:py-20 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Hexagon Pattern Grid on Left */}
      <div className="absolute left-0 top-0 bottom-0 w-72 pointer-events-none opacity-30">
        <svg className="w-full h-full text-blue-200" viewBox="0 0 200 600" fill="none" stroke="currentColor" strokeWidth="0.8">
          <pattern id="hex-pattern-ind" width="30" height="51.96" patternUnits="userSpaceOnUse">
            <path d="M15 0 L30 8.66 L30 25.98 L15 34.64 L0 25.98 L0 8.66 Z M15 25.98 L30 34.64 L30 51.96 L15 60.62 L0 51.96 L0 34.64 Z" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-pattern-ind)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-7 text-left"
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 backdrop-blur-sm text-blue-600 text-[10px] font-black uppercase tracking-[0.18em] mb-3 sm:mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              INDUSTRIES WE SERVE
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.08]">
              Trusted Across<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400">
                Every Sector
              </span>
            </h2>

            {/* Paragraph */}
            <p className="mt-2.5 sm:mt-5 text-slate-600 text-xs sm:text-base md:text-lg leading-relaxed max-w-xl font-medium">
              From residential complexes to large-scale infrastructure, Plumtek delivers solutions engineered for every industry vertical.
            </p>
          </motion.div>

          {/* Right Mascot Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative z-10 max-w-[180px] sm:max-w-[320px] lg:max-w-[440px] drop-shadow-[0_15px_30px_rgba(37,99,235,0.15)]">
              <img
                src={MascotImg}
                alt="Plumtek Mascot Ollie"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ── WAVE SEPARATOR TRANSITION ── */}
    <div className="w-full overflow-hidden leading-none relative z-10 -mt-1 -mb-1 pointer-events-none">
      <svg
        className="relative block w-full h-[40px] sm:h-[60px] md:h-[90px] text-[#0f2b66]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
      </svg>
    </div>

    {/* ── BOTTOM SECTION (DEEP ROYAL BLUE WITH WHITE CARDS) ── */}
    <div className="bg-gradient-to-b from-[#0f2b66] via-[#12337a] to-[#0a1c42] py-8 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* 8 White Feature Cards Grid - 2 Columns on Mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-12"
        >
          {sectors.map((sec) => (
            <motion.div
              key={sec.title}
              variants={fade}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl sm:rounded-[24px] p-3.5 sm:p-7 border border-white/20 shadow-md hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col text-left cursor-default justify-between"
            >
              <div>
                {/* Glowing Icon Container */}
                <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2.5 sm:mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300 ${sec.glowClass}`}>
                  <sec.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Title */}
                <h3 className="font-black text-slate-900 text-xs sm:text-[17px] mb-1 sm:mb-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                  {sec.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-[11px] sm:text-[13px] leading-relaxed font-medium hidden sm:block">
                  {sec.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default IndustriesServed;
