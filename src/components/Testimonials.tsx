import { Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Michael Roberts",
    role: "Homeowner",
    initials: "MR",
    color: "bg-blue-600",
    text: "Exceptional quality products and outstanding service. The faucets and fixtures we purchased have completely transformed our bathroom. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Interior Designer",
    initials: "SJ",
    color: "bg-violet-600",
    text: "I've been recommending this store to all my clients. The range of products is impressive, and the quality speaks for itself. A true one-stop shop for plumbing needs.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Contractor",
    initials: "DC",
    color: "bg-emerald-600",
    text: "As a contractor, I need reliable suppliers. This team delivers on time, every time. The products are durable and the pricing is very competitive.",
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 bg-slate-50"
      aria-label="Client testimonials"
    >
      <div className="container-pipes">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3">
            Client Voices
          </p>
          <h2
            className="font-heading font-bold text-slate-900 tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative bg-white rounded-3xl border border-slate-100
                       shadow-[0_8px_40px_rgba(15,23,42,0.07)]
                       px-8 py-12 md:px-14 md:py-14 text-center overflow-hidden"
          >
            {/* Background quote mark */}
            <div className="absolute top-6 left-8 text-[120px] leading-none font-black text-slate-100 select-none pointer-events-none -z-0">
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blue-400 text-blue-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 text-base md:text-[17px] leading-[1.8] mb-8 font-medium">
                  "{testimonials[active].text}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-[13px] ${testimonials[active].color}`}>
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-slate-900 text-[15px]">
                      {testimonials[active].name}
                    </p>
                    <p className="text-[12px] text-slate-400 font-medium">
                      {testimonials[active].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View testimonial ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-400
                  ${i === active ? "w-8 bg-blue-600" : "w-4 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
