import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, ShieldCheck, Users, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";
import plumtekBg from "@/assets/3d-assets/plumtek-bg.png";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: { label: string; to?: string }[];
  ctaText?: string;
  ctaLink?: string;
  stats?: { icon?: any; v: string; l: string }[];
}

const defaultStats = [
  { icon: ShieldCheck, v: "25+", l: "YEARS" },
  { icon: Users, v: "1M+", l: "CUSTOMERS" },
  { icon: MapPin, v: "18+", l: "BRANCHES" },
  { icon: Award, v: "ISO", l: "CERTIFIED" },
];

const PageBanner = ({
  title,
  subtitle = "Quality plumbing solutions for every need. Engineered for performance, built for trust.",
  eyebrow,
  breadcrumbs,
  ctaText,
  ctaLink,
  stats = defaultStats,
}: PageBannerProps) => {
  return (
    <div className="relative overflow-hidden text-left bg-slate-950 font-sans">
      {/* ── Compact Dark Blue Hero Banner ── */}
      <section
        className="relative py-6 sm:py-10 lg:py-14 min-h-0 sm:min-h-[26vh] lg:min-h-[32vh] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${plumtekBg})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-medium text-slate-300 mb-3">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                    {crumb.to ? (
                      <Link to={crumb.to} className="hover:text-cyan-300 transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white font-bold">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
                {eyebrow || title.toUpperCase()}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.1] mb-2.5">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed font-medium mb-5">
                {subtitle}
              </p>
            )}

            {/* Stats & CTA Compact Row */}
            <div className="flex items-center gap-5 sm:gap-6 flex-wrap">
              {stats && stats.length > 0 && (
                <div className="flex items-center gap-5 flex-wrap">
                  {stats.map((s, idx, arr) => {
                    const IconComp = s.icon || ShieldCheck;
                    return (
                      <div
                        key={s.l}
                        className={`flex items-center gap-2.5 ${
                          idx < arr.length - 1 ? "sm:border-r sm:border-white/15 sm:pr-5" : ""
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-sky-400 shrink-0">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black text-white leading-none mb-0.5">{s.v}</p>
                          <p className="text-[8px] font-black uppercase tracking-wider text-slate-300 leading-none">{s.l}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* CTA Button */}
              {ctaText && ctaLink && (
                <Link
                  to={ctaLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-6 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/40 transition-all duration-300 hover:scale-105 group"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PageBanner;
