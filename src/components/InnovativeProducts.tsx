import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  Settings,
  Award,
  ArrowRight,
} from "lucide-react";
import bgPlumtekSection02 from "@/assets/3d-assets/bg-plumtek-section-02.png";

const features = [
  {
    icon: ShieldCheck,
    label: "Durable & Reliable",
  },
  {
    icon: Droplets,
    label: "Leak-Proof Assurance",
  },
  {
    icon: Settings,
    label: "Advanced Tech",
  },
  {
    icon: Award,
    label: "Tested & Certified",
  },
];

const cards = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    desc: "Manufactured using the finest raw materials to deliver unmatched quality.",
    link: "/about",
  },
  {
    icon: Settings,
    title: "Modern Design",
    desc: "Contemporary designs that blend aesthetics with maximum functionality.",
    link: "/shop",
  },
  {
    icon: Droplets,
    title: "Leak Proof",
    desc: "Engineered for zero leakage and long-lasting performance you can trust.",
    link: "/catalogs",
  },
  {
    icon: Award,
    title: "Tested & Certified",
    desc: "All products are rigorously tested and certified to international standards.",
    link: "/about",
  },
];

const InnovativeProducts = () => {
  return (
    <section
      className="py-10 sm:py-16 lg:py-24 relative overflow-hidden text-left bg-white bg-cover bg-right-top bg-no-repeat max-sm:!bg-none"
      style={{ backgroundImage: `url(${bgPlumtekSection02})` }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Top Hero Layout */}
        <div className="max-w-2xl mb-8 sm:mb-14">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-4">
            <span className="w-6 sm:w-8 h-[2px] bg-[#2563eb]" />
            <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.25em] text-[#2563eb]">
              PLUMBING EXCELLENCE
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-[68px] font-black text-[#0f172a] tracking-tight leading-[1.08] mb-2">
            Innovative <span className="text-[#2563eb]">Solutions</span>
          </h2>

          {/* Underline accent */}
          <div className="w-12 sm:w-14 h-1 bg-[#2563eb] rounded-full mb-4 sm:mb-6" />

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-base max-w-[500px] leading-relaxed font-medium mb-5 sm:mb-8">
            We provide top-quality plumbing products designed with modern aesthetics and high-performance functionality.
          </p>

          {/* 4 Feature Badges in 2x2 grid on mobile */}
          <div className="grid grid-cols-2 sm:flex items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            {features.map((feat) => (
              <div key={feat.label} className="flex items-center gap-2.5 sm:flex-col sm:items-center sm:text-center sm:pr-6 sm:border-r sm:border-slate-200/80 sm:last:border-0 sm:last:pr-0">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0 shadow-xs">
                  <feat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 leading-tight">
                  {feat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Go to Catalogue Button */}
          <div>
            <Link
              to="/catalogs"
              className="inline-flex items-center gap-2.5 bg-[#2563eb] hover:bg-blue-700 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-md shadow-blue-600/30 transition-all duration-300 hover:scale-105 group"
            >
              <span>GO TO CATALOGUE</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── 4 White Feature Cards Row - 2 Columns on Mobile ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between text-left h-full"
            >
              <div>
                {/* Icon Container */}
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] mb-3 sm:mb-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <c.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>

                {/* Title */}
                <h3 className="font-black text-[#0f172a] text-xs sm:text-xl mb-1 sm:mb-3 group-hover:text-blue-600 transition-colors">
                  {c.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-[11px] sm:text-[13px] leading-snug sm:leading-relaxed font-medium mb-3 sm:mb-6 hidden sm:block">
                  {c.desc}
                </p>
              </div>

              {/* Learn More Link */}
              <Link
                to={c.link}
                className="inline-flex items-center gap-1.5 text-[#2563eb] font-extrabold text-[10px] sm:text-xs hover:gap-2.5 transition-all group/link"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InnovativeProducts;
