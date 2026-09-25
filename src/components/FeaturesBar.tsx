import { Award, Truck, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Award,
    title: "High Quality",
    desc: "Committed to quality in every essence — ISO-grade manufacturing for ultimate reliability.",
  },
  {
    icon: Truck,
    title: "25 Years Bonding",
    desc: "Trusted since 1998, we're stepping into our 25th year of excellence in the plumbing industry.",
  },
  {
    icon: Shield,
    title: "Dedication",
    desc: "Growing our product range to meet the needs of India's most demanding industrial markets.",
  },
  {
    icon: Headphones,
    title: "Innovation",
    desc: "Innovative plumbing solutions for all temperatures and environments — engineered with you.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const FeaturesBar = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative bg-white border-b border-slate-100"
      aria-label="Key features"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="container mx-auto px-4 sm:px-6 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                   divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            className="group flex items-start gap-4 sm:gap-5 py-6 px-4 sm:py-8 sm:px-6 lg:px-8
                       hover:bg-slate-50/80 transition-colors duration-300 cursor-default"
          >
            <div
              className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl
                         bg-blue-50 text-blue-600
                         group-hover:bg-blue-600 group-hover:text-white
                         transition-all duration-400 shadow-xs"
            >
              <f.icon className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-[15px] mb-1 tracking-tight">
                {f.title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesBar;
