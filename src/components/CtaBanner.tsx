import { useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import ctaBg from "@/assets/3d-assets/hero1.png";

const ease = [0.16, 1, 0.3, 1] as const;

const CtaBanner = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-44 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-105"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />

      {/* Dark overlay + blue glow */}
      <div className="absolute inset-0 bg-slate-950/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-transparent to-transparent" />

      {/* Top / bottom gradient borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <div className="relative z-10 container-pipes text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-400 mb-6"
        >
          Get in Touch
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          className="font-heading font-black text-white leading-[0.95] tracking-tight mb-12"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Estimates are Provided<br className="hidden md:block" /> for Your Vision!
        </motion.h2>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* Primary CTA */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500
                       text-white font-bold tracking-wide px-10 py-4 rounded-full
                       shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_40px_-12px_rgba(37,99,235,0.5)]
                       hover:shadow-[0_24px_48px_-12px_rgba(37,99,235,0.65)]
                       transition-all duration-300 hover:-translate-y-0.5 text-[15px]"
          >
            Request an Estimate
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Phone link */}
          <a
            href="tel:+919842742936"
            className="inline-flex items-center gap-4 group"
          >
            <div
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
                         group-hover:border-blue-400/60 group-hover:bg-blue-500/10
                         transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-slate-400 uppercase tracking-[0.15em] font-bold mb-0.5">
                Call Our Team
              </span>
              <span className="block font-heading font-black text-xl text-white tracking-tight">
                +91 98427 42936
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
