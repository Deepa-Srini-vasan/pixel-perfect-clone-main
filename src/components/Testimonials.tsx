import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import imgVoice from "@/assets/3d-assets/img-voice.png";

// Premium diamond sparkle divider icon
const DiamondSpark = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="white" opacity="0.6" />
  </svg>
);

const testimonials = [
  {
    name: "Michael Roberts",
    role: "Homeowner",
    initials: "MR",
    text: "Exceptional quality products and outstanding service. The faucets and fixtures we purchased have completely transformed our bathroom. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Interior Designer",
    initials: "SJ",
    text: "I've been recommending this store to all my clients. The range of products is impressive, and the quality speaks for itself. A true one-stop shop for plumbing needs.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Contractor",
    initials: "DC",
    text: "As a contractor, I need reliable suppliers. This team delivers on time, every time. The products are durable and the pricing is very competitive.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Architect",
    initials: "PS",
    text: "Premium product range with excellent finish and quality. Our clients are always satisfied with the plumbing fixtures we source from Plumtek. Great partnership!",
    rating: 5,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const Testimonials = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  return (
    <section
      ref={ref}
      className="relative py-6 sm:py-16 lg:py-24 overflow-hidden text-left"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2952 40%, #1a3a6e 70%, #0d1f42 100%)" }}
      aria-label="Client testimonials"
    >
      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/60 to-slate-950/80 pointer-events-none" />
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-4 sm:mb-12"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-3">
            <div className="h-px w-6 sm:w-12 bg-blue-400/40" />
            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-blue-300 flex items-center gap-1.5">
              <span className="text-blue-300 tracking-widest">CLIENT</span>
              <DiamondSpark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400" />
              <span className="text-blue-200 tracking-widest">VOICES</span>
            </span>
            <div className="h-px w-6 sm:w-12 bg-blue-400/40" />
          </div>

          <h2 className="font-heading font-black text-white tracking-tight leading-tight text-xl sm:text-4xl lg:text-[46px]">
            What Our <span className="text-blue-300">Clients Say</span>
          </h2>

          <div className="mx-auto mt-1.5 sm:mt-2 w-10 sm:w-16 h-0.5 bg-blue-400/60 rounded-full" />
        </motion.div>

        {/* Main Testimonial Area with Mascot + Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="relative flex items-center justify-center gap-4 sm:gap-6"
        >
          {/* Prev Button - Hidden on Mobile & Small Viewports */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden md:flex w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-blue-100 transition-all duration-200 shrink-0 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Review Card Wrapper - Minimized compact width on Mobile */}
          <div className="relative w-[75%] max-w-[290px] sm:w-full sm:max-w-2xl lg:max-w-3xl flex flex-col pt-3 sm:pt-0 mx-auto">

            {/* Otter Mascot Image — Scaled to fit Mobile & Desktop */}
            <motion.div
              className="absolute -top-5 left-1 sm:-left-16 sm:top-auto sm:-bottom-2 w-[48px] sm:w-[140px] lg:w-[200px] z-20 pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease }}
            >
              <img
                src={imgVoice}
                alt="Aqua Otter Mascot"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Review Container Card */}
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-blue-100/80 shadow-[0_8px_24px_rgba(15,23,42,0.1)] px-3.5 py-4 sm:px-10 sm:py-10 md:px-14 md:py-12 text-center overflow-hidden z-10">

              {/* Big quote mark */}
              <div className="absolute top-1 left-2 sm:top-6 sm:left-8 text-[36px] sm:text-[100px] leading-none font-black text-blue-100/80 select-none pointer-events-none font-serif">
                "
              </div>

              {/* Animated testimonial content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease }}
                  className="relative z-10"
                >
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-1.5 sm:mb-5">
                    {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-5 sm:h-5 fill-blue-500 text-blue-500" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-slate-700 text-[11px] sm:text-base md:text-[17px] leading-relaxed sm:leading-[1.8] mb-2.5 sm:mb-6 font-medium px-1 sm:px-0">
                    "{testimonials[active].text}"
                  </p>

                  {/* Divider */}
                  <div className="flex items-center justify-center mb-2.5 sm:mb-6">
                    <div className="flex items-center gap-1.5">
                      <div className="h-px w-4 sm:w-8 bg-gradient-to-r from-transparent to-blue-400 rounded-full" />
                      <DiamondSpark className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-blue-500" />
                      <div className="h-px w-4 sm:w-8 bg-gradient-to-l from-transparent to-blue-400 rounded-full" />
                    </div>
                  </div>

                  {/* Author avatar + name */}
                  <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center font-black text-white text-[10px] sm:text-[13px] shadow-sm shadow-blue-600/30">
                      {testimonials[active].initials}
                    </div>
                    <div>
                      <p className="font-heading font-black text-slate-900 text-[11px] sm:text-[15px]">
                        {testimonials[active].name}
                      </p>
                      <p className="text-[9px] sm:text-[12px] text-slate-400 font-semibold">
                        {testimonials[active].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View testimonial ${i + 1}`}
                  className={`h-[3px] rounded-full transition-all duration-300
                    ${i === active ? "w-4 sm:w-8 bg-blue-400" : "w-2 sm:w-4 bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
          </div>

          {/* Next Button - Hidden on Mobile & Small Viewports */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden md:flex w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-blue-100 transition-all duration-200 shrink-0 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
