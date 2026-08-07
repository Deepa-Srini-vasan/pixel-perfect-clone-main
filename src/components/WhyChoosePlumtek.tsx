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
  Building2,
  MapPin,
  Users,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "ISO Certified Quality",
    desc: "Every product manufactured to strict ISO standards — ensuring unmatched consistency and safety.",
  },
  {
    icon: Award,
    title: "25+ Years of Excellence",
    desc: "A trusted name since 1998 — two and a half decades of industry-leading manufacturing experience.",
  },
  {
    icon: Globe,
    title: "Pan India & Export Ready",
    desc: "18+ branches across India with active exports to Sri Lanka, Africa, and other international markets.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "Creators of India's first Pushfit system — PLUMTEK FASTFIT — and South India's first PPR pipe manufacturer.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Technical sales support, installation guidance, and rapid response — every step of the project.",
  },
  {
    icon: Truck,
    title: "Reliable Supply Chain",
    desc: "In-house manufacturing + a robust logistics network ensures on-time delivery, every time.",
  },
  {
    icon: Trophy,
    title: "Industry Recognition",
    desc: "Multiple national awards for manufacturing excellence and product innovation across categories.",
  },
  {
    icon: Package,
    title: "492+ Products",
    desc: "One of the widest portfolios in the plumbing sector — covering pipes, fittings, taps, hoses, and more.",
  },
];

const stats = [
  {
    icon: Building2,
    value: "25+",
    label: "Years of Excellence",
  },
  {
    icon: MapPin,
    value: "18+",
    label: "Branches Across India",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Countries Exported",
  },
  {
    icon: Package,
    value: "492+",
    label: "Products & Solutions",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Happy Customers",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const WhyChoosePlumtek = () => (
  <section
    className="py-10 sm:py-16 lg:py-24 relative overflow-hidden text-left"
    style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2952 40%, #1a3a6e 70%, #0d1f42 100%)" }}
  >
    {/* Blue gradient overlay & ambient glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/60 to-slate-950/80 pointer-events-none" />
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" />

    {/* Hexagon Pattern Grid on Left */}
    <div className="absolute left-0 top-0 bottom-0 w-72 pointer-events-none opacity-20">
      <svg className="w-full h-full text-blue-300" viewBox="0 0 200 600" fill="none" stroke="currentColor" strokeWidth="0.8">
        <pattern id="hex-pattern" width="30" height="51.96" patternUnits="userSpaceOnUse">
          <path d="M15 0 L30 8.66 L30 25.98 L15 34.64 L0 25.98 L0 8.66 Z M15 25.98 L30 34.64 L30 51.96 L15 60.62 L0 51.96 L0 34.64 Z" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
      </svg>
    </div>

    <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

      {/* Top Header + Mascot Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-6 sm:mb-16">
        
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-7 text-left"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-blue-400/30 bg-blue-500/20 text-blue-200 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] mb-3 sm:mb-5 shadow-xs">
            WHY CHOOSE PLUMTEK
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-[52px] font-black text-white tracking-tight leading-[1.08]">
            Engineering Excellence.<br />
            Building <span className="text-blue-300">Trust.</span>
          </h2>

          {/* Paragraph */}
          <p className="mt-2.5 sm:mt-5 text-blue-100/80 text-xs sm:text-base md:text-lg leading-relaxed max-w-xl font-medium">
            For over 25 years, we have delivered world-class plumbing solutions backed by innovation, quality, and unwavering commitment to our customers.
          </p>

          {/* Line accent + Tagline */}
          <div className="mt-4 sm:mt-6 pt-1 sm:pt-2">
            <div className="w-8 sm:w-10 h-0.5 bg-blue-400/60 rounded-full mb-2 sm:mb-3" />
            <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-blue-300">
              BUILT TO LAST. DESIGNED TO PERFORM.
            </p>
          </div>
        </motion.div>

        {/* Right Mascot + Glow Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          viewport={{ once: true }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          <div className="relative z-10 max-w-[160px] sm:max-w-[380px] lg:max-w-[440px] drop-shadow-[0_15px_30px_rgba(37,99,235,0.18)]">
            <img
              src={MascotImg}
              alt="Plumtek Mascot Ollie"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>

      {/* 8 Feature Cards Grid - 2 Columns on Mobile */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.05 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-12"
      >
        {reasons.map((r) => (
          <motion.div
            key={r.title}
            variants={fade}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group bg-white rounded-2xl sm:rounded-[24px] p-3.5 sm:p-7 border border-slate-100 shadow-md hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col text-left cursor-default justify-between"
          >
            <div>
              {/* Icon Container */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-2.5 sm:mb-5 shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <r.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Title */}
              <h3 className="font-black text-slate-900 text-xs sm:text-[17px] mb-1 sm:mb-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                {r.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-[11px] sm:text-[13px] leading-relaxed font-medium hidden sm:block">
                {r.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Stats Pill Banner - Responsive Grid on Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-100 shadow-md p-4 sm:p-6 lg:px-10 lg:py-6 grid grid-cols-2 sm:flex items-center justify-between flex-wrap gap-4 sm:gap-6"
      >
        {stats.map((s, idx) => (
          <div key={s.label} className="flex items-center gap-2.5 sm:gap-4">
            {/* Icon Box */}
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>

            {/* Stat Text */}
            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-2xl font-black text-blue-600 tracking-tight leading-none mb-0.5">
                {s.value}
              </span>
              <span className="text-[10px] sm:text-[12px] font-bold text-slate-500 whitespace-nowrap">
                {s.label}
              </span>
            </div>

            {/* Vertical Divider (except last) */}
            {idx < stats.length - 1 && (
              <div className="hidden lg:block w-px h-10 bg-slate-100 ml-6" />
            )}
          </div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default WhyChoosePlumtek;
