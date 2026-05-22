import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, ShieldCheck, Factory, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Premium easing curve (Apple-like spring) ─── */
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { delay, duration: 0.85, ease },
});

const trustPills = [
  { icon: ShieldCheck, label: 'ISO 9001 Certified' },
  { icon: Zap,         label: '25+ Years Experience' },
  { icon: Wrench,      label: '1200+ SKUs In Stock' },
];

const IndustrialVideoHero: React.FC = () => (
  <div className="relative w-full min-h-[calc(100vh-80px)] flex items-end bg-slate-950 overflow-hidden">

    {/* ── Background Video Layer ── */}
    <div className="absolute inset-0">
      <video
        autoPlay muted loop playsInline
        poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="https://cdn.coverr.co/videos/coverr-industrial-factory-machine-working-5246/1080p.mp4" type="video/mp4" />
      </video>

      {/* Multi-stop cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

      {/* Subtle blue accent glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none" />
    </div>

    {/* ── Hero Content ── */}
    <div className="relative z-20 w-full max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 pb-20 pt-32 lg:pt-0 lg:pb-32">

      {/* Trust pills row */}
      <motion.div
        {...fadeUp(0)}
        className="flex flex-wrap gap-2.5 mb-8"
      >
        {trustPills.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase
                       bg-white/5 border border-white/10 text-blue-300 backdrop-blur-sm
                       hover:bg-blue-600/20 hover:border-blue-500/30 transition-colors duration-300"
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </span>
        ))}
      </motion.div>

      {/* Main heading */}
      <motion.h1
        {...fadeUp(0.1)}
        className="font-heading font-black text-white leading-[0.94] tracking-[-0.03em] mb-6"
        style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', maxWidth: '820px' }}
      >
        Engineered for{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400"
          style={{ backgroundSize: '200%', animation: 'shimmer 4s linear infinite' }}
        >
          Maximum Flow
        </span>{' '}
        &amp; Durability
      </motion.h1>

      {/* Sub-copy */}
      <motion.p
        {...fadeUp(0.2)}
        className="text-slate-300/90 font-body leading-[1.75] mb-10"
        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', maxWidth: '580px' }}
      >
        Plumtek delivers world-class industrial piping, heavy-duty valves, and premium fittings designed
        to withstand the highest pressures and extreme conditions in any manufacturing environment.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        {...fadeUp(0.3)}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
      >
        <Link
          to="/shop"
          className="group inline-flex items-center justify-center gap-3
                     bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                     text-white font-bold tracking-wide
                     px-8 py-4 rounded-full
                     shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_40px_-12px_rgba(37,99,235,0.5)]
                     hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_24px_48px_-12px_rgba(37,99,235,0.65)]
                     transition-all duration-300 hover:-translate-y-0.5 text-[15px]"
        >
          <Factory className="w-5 h-5" />
          Explore Products
          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>

        <Link
          to="/catalogs"
          className="inline-flex items-center justify-center gap-3
                     bg-white/5 hover:bg-white/10 active:bg-white/15
                     text-white border border-white/15 hover:border-white/30
                     font-bold tracking-wide px-8 py-4 rounded-full
                     backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 text-[15px]"
        >
          <Wrench className="w-5 h-5" />
          View Catalogs
        </Link>
      </motion.div>

      {/* Bottom metric strip */}
      <motion.div
        {...fadeUp(0.45)}
        className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-x-10 gap-y-4"
      >
        {[
          { num: '1200+', label: 'Products' },
          { num: '50K+',  label: 'Customers' },
          { num: '98%',   label: 'Satisfaction' },
          { num: '25yrs', label: 'Experience' },
        ].map(({ num, label }) => (
          <div key={label}>
            <p className="text-2xl font-heading font-black text-white tracking-tight leading-none">{num}</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-[0.12em] font-bold mt-1">{label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default IndustrialVideoHero;
