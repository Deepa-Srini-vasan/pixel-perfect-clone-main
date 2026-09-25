import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import mascotVideo from "@/assets/3d-assets/Otter_mascot_rides_wave,_lands_202608061350.mp4";

const MascotVideoSection = () => {
  return (
    <section className="py-8 sm:py-16 lg:py-24 bg-white text-left font-sans">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-[32px] border border-slate-900/10 shadow-2xl min-h-[280px] sm:min-h-[460px] lg:min-h-[540px] flex items-center">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/Otter_mascot_rides_water_wave_20260925121034.mp4" type="video/mp4" />
          </video>

          {/* Dark Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent z-10" />

          {/* Foreground Text Content */}
          <div className="relative z-20 container mx-auto px-4 sm:px-8 lg:px-14 py-6 sm:py-12 max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-blue-400/30 bg-blue-500/20 text-cyan-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-4 backdrop-blur-md">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300 animate-pulse" />
                <span>PLUMTEK BRAND EXPERIENCE</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-[54px] font-black text-white leading-[1.08] tracking-tight mb-2 sm:mb-4">
                Riding the Wave of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Water Innovation
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-200 text-xs sm:text-base leading-relaxed font-medium mb-4 sm:mb-8 max-w-xl">
                Experience Ollie the mascot in 3D action! From high-pressure PPR systems to sleek ergonomic faucets, Euroaqua Plumtek provides world-class fluid technology.
              </p>

              {/* CTA Button */}
              <div>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-[0_0_25px_rgba(37,99,235,0.5)] border border-blue-400/40 transition-all duration-300 hover:scale-105 group"
                >
                  <span>EXPLORE OUR RANGE</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MascotVideoSection;
