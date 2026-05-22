import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";

/* ─── Count-up hook ──────────────────────────────── */
const useCountUp = (target: number, isVisible: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible || target === 0) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, isVisible]);
  return count;
};

/* ─── Stat item ──────────────────────────────────── */
const StatItem = ({
  value, suffix, label, isVisible,
}: { value: number; suffix: string; label: string; isVisible: boolean }) => {
  const count = useCountUp(value, isVisible);
  return (
    <div className="text-center group">
      <div
        className="font-heading font-black text-white tabular-nums leading-none tracking-tight mb-3"
        style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
      >
        {count.toLocaleString()}
        <span className="text-blue-400 ml-1" style={{ fontSize: "0.65em" }}>{suffix}</span>
      </div>

      <div className="w-8 h-[2px] bg-blue-500/40 mx-auto mb-3 group-hover:w-14 transition-all duration-500 rounded-full" />

      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
    </div>
  );
};

/* ─── Skeleton shimmer ───────────────────────────── */
const StatSkeleton = () => (
  <div className="text-center">
    <div className="h-16 w-28 bg-white/5 rounded-xl animate-pulse mx-auto mb-3" />
    <div className="w-8 h-[2px] bg-white/10 mx-auto mb-3" />
    <div className="h-3 w-24 bg-white/5 rounded-full animate-pulse mx-auto" />
  </div>
);

/* ─── Main component ─────────────────────────────── */
const StatsCounter = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { if (inView) setIsVisible(true); }, [inView]);

  // Fetch real total product count from API
  const { data } = useQuery({
    queryKey: ["stats-total-products"],
    queryFn: () => fetchProducts("", "", 1, 1, "latest"),
    staleTime: 1000 * 60 * 10,
  });

  const totalProducts = data?.total ?? 0;

  const stats = [
    {
      value: totalProducts,
      suffix: "+",
      label: "Products Available",
      ready: totalProducts > 0,
    },
    { value: 98,   suffix: "%", label: "Customer Satisfaction", ready: true },
    { value: 25,   suffix: "+", label: "Years of Experience",   ready: true },
    { value: 50,   suffix: "K", label: "Happy Customers",       ready: true },
  ];

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36 bg-slate-950 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-cyan-500/8 blur-[80px]" />
      </div>

      {/* Border glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative z-10 container-pipes">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">
            By the Numbers
          </p>
          <h2
            className="font-heading font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Trusted by Thousands of<br className="hidden sm:block" /> Industrial Professionals
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((stat) =>
            stat.ready ? (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isVisible={isVisible}
              />
            ) : (
              <StatSkeleton key={stat.label} />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;
