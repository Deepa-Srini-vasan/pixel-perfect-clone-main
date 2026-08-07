import { useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import ctaBg from "@/assets/3d-assets/cta-bg.png";
import MascotImage from "@/assets/3d-assets/2.png";

const ease = [0.16, 1, 0.3, 1] as const;

const CtaBanner = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative py-8 sm:py-16 lg:py-28 overflow-hidden bg-slate-950"
      aria-label="Call to action"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-105 opacity-85 z-0"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />

      {/* Dark overlay fading out towards the right */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-0" />

      {/* Top / bottom gradient borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">

          {/* Left Content Area */}
          <div className="lg:col-span-7 text-left flex flex-col items-start z-10">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-blue-400 mb-2 sm:mb-4"
            >
              Get in Touch
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="font-heading font-black text-white leading-[1.1] sm:leading-[1.05] tracking-tight mb-3 sm:mb-5 text-2xl sm:text-4xl lg:text-[54px]"
            >
              Estimates are Provided<br />
              for Your <span className="text-blue-500">Vision!</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.14, ease }}
              className="text-slate-300 text-xs sm:text-base leading-relaxed mb-5 sm:mb-8 font-medium max-w-xl"
            >
              Euroaqua Plumtek offers full technical guidance, prompt quotations, and factory-direct dispatch for all commercial and residential plumbing inquiries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4"
            >
              {/* Primary CTA */}
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700
                           text-white font-extrabold tracking-wide px-7 py-3 sm:py-4 rounded-full
                           shadow-lg shadow-blue-600/30 hover:scale-[1.02]
                           transition-all duration-300 text-xs sm:text-sm shrink-0"
              >
                Request an Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Phone link pill */}
              <a
                href="tel:+919842742936"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/20 bg-slate-900/60 hover:bg-slate-900/80
                           text-white font-extrabold px-6 py-2.5 sm:py-3 rounded-full hover:scale-[1.02] transition-all duration-300 text-xs sm:text-sm"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                </div>
                <div className="text-left leading-tight pr-1">
                  <span className="block text-[8px] text-slate-400 uppercase tracking-widest font-black mb-0.5">
                    Call Our Team
                  </span>
                  <span className="block text-[13px] sm:text-[14px] text-white font-black tracking-wide">
                    +91 98427 42936
                  </span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right Column placeholder (desktop only) */}
          <div className="hidden lg:block lg:col-span-5 lg:h-[450px] pointer-events-none" />

        </div>
      </div>

      {/* Mascot Ollie (Desktop / Tablet only) */}
      <div className="absolute bottom-0 right-0 lg:right-[2%] w-[620px] h-[620px] lg:w-[660px] lg:h-[660px] z-10 select-none hidden lg:block">
        <div className="relative w-full h-full">
          <img
            src={MascotImage}
            alt="Plumtek Mascot Ollie"
            className="w-full h-full object-contain"
          />

          {/* Ollie Speech Bubble */}
          <div className="absolute top-12 left-[-20px] bg-white border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.15)] rounded-[22px] px-4 py-3 text-center text-xs font-black text-slate-800 leading-tight w-[160px] z-30">
            <p className="text-slate-500 font-bold mb-0.5">Let's build</p>
            <p className="font-black text-slate-900">something <span className="text-blue-600">amazing</span></p>
            <p className="font-black text-slate-900">together!</p>
            <div className="absolute bottom-[-5px] right-8 w-2.5 h-2.5 bg-white border-b border-r border-slate-100 rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
