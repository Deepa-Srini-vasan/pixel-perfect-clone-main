import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { fetchProducts, fetchCategories, type ApiProduct } from "@/lib/api";
import { categoryImageLookup, normalizeCategoryName } from "@/lib/catalog-assets";

const ease = [0.16, 1, 0.3, 1] as const;

const FeaturedProducts = () => {
  const ref  = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const { data: productsData } = useQuery<{ products: ApiProduct[] }>({
    queryKey: ["featured-products"],
    queryFn: () => fetchProducts(),
  });
  const products = productsData?.products ?? [];

  const { data: categoriesData } = useQuery({
    queryKey: ["featured-categories"],
    queryFn: () => fetchCategories(),
  });
  const categoriesList = categoriesData?.categories ?? [];

  const categoryCards = useMemo(() => {
    if (categoriesList.length > 0) {
      return categoriesList.slice(0, 5).map((cat, i) => ({
        rawName: cat.name,
        name: normalizeCategoryName(cat.name),
        image: categoryImageLookup.get(cat.name) ?? categoryImageLookup.get("Hoses"),
        featured: i === 0,
      }));
    }
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return unique.slice(0, 5).map((cat, i) => ({
      rawName: cat,
      name: normalizeCategoryName(cat),
      image: categoryImageLookup.get(cat) ?? categoryImageLookup.get("Hoses"),
      featured: i === 0,
    }));
  }, [categoriesList, products]);

  const featured = categoryCards[0] ?? {
    rawName: "Products",
    name: "Industrial Products",
    image: categoryImageLookup.get("Hoses"),
    featured: true,
  };
  const others = categoryCards.slice(1);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <section ref={ref} className="py-10 sm:py-16 lg:py-24 bg-white text-left" aria-label="Featured categories">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-6 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-blue-600" />
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                Top-Rated Categories
              </p>
            </div>
            <h2 className="font-heading font-bold text-slate-900 leading-tight tracking-tight text-2xl sm:text-4xl lg:text-[44px]">
              Choose the Category<br className="hidden sm:block" /> You're Interested In
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-blue-600 hover:text-blue-700 group shrink-0"
          >
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* ── Category Grid - 2 columns on mobile ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 sm:gap-5 auto-rows-auto"
        >
          {/* Large featured card – spans 2 cols on mobile, 2 rows on desktop */}
          <motion.div
            variants={cardVariants}
            className="col-span-2 md:col-span-1 lg:col-span-1 lg:row-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden
                       bg-gradient-to-b from-[#0f2b66] via-[#12337a] to-[#0a1c42] border border-blue-900/50
                       hover:border-blue-400/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[220px] sm:min-h-[440px]"
          >
            {/* SVG Background Pattern */}
            <svg className="absolute inset-0 w-full h-full text-blue-300/10 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
              <pattern id="hex-cat-main" width="30" height="51.96" patternUnits="userSpaceOnUse">
                <path d="M15 0 L30 8.66 L30 25.98 L15 34.64 L0 25.98 L0 8.66 Z M15 25.98 L30 34.64 L30 51.96 L15 60.62 L0 51.96 L0 34.64 Z" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hex-cat-main)" />
            </svg>

            {/* Glowing Blue Radial Backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-blue-500/20 blur-3xl" />
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-10 pt-6 sm:pt-12 relative z-10">
              <img
                src={featured.image}
                alt={featured.name}
                loading="lazy"
                decoding="async"
                className="w-full max-h-[160px] sm:max-h-[380px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]
                           transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>

            {/* Caption */}
            <div className="p-4 sm:p-8 border-t border-white/10 bg-white/5 backdrop-blur-md relative z-10">
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300 mb-0.5 sm:mb-1">
                Featured Category
              </p>
              <h3 className="font-heading font-bold text-white text-base sm:text-2xl mb-2 sm:mb-4 group-hover:text-cyan-300 transition-colors">
                {featured.name}
              </h3>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-[11px] sm:text-[13px] font-extrabold uppercase tracking-[0.1em] text-sky-300 hover:text-white group/link transition-colors"
              >
                Shop Now
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-1.5" />
              </Link>
            </div>
          </motion.div>

          {/* 4 smaller cards - 2 column grid on mobile */}
          {others.map((cat) => (
            <motion.div key={cat.rawName} variants={cardVariants}>
              <Link
                to="/shop"
                className="group flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden relative
                           bg-gradient-to-b from-[#0f2b66] via-[#12337a] to-[#0a1c42] border border-blue-900/50
                           hover:border-blue-400/50 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* SVG Background Pattern */}
                <svg className="absolute inset-0 w-full h-full text-blue-300/10 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <pattern id={`hex-cat-${cat.rawName}`} width="30" height="51.96" patternUnits="userSpaceOnUse">
                    <path d="M15 0 L30 8.66 L30 25.98 L15 34.64 L0 25.98 L0 8.66 Z M15 25.98 L30 34.64 L30 51.96 L15 60.62 L0 51.96 L0 34.64 Z" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#hex-cat-${cat.rawName})`} />
                </svg>

                {/* Glowing Backdrop */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-blue-500/15 blur-xl" />
                </div>

                <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[180px] p-4 sm:p-8 relative z-10">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="max-w-[80%] max-h-[90px] sm:max-h-[140px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]
                               transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="px-3.5 py-3 sm:px-6 sm:py-5 border-t border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between relative z-10">
                  <h3 className="font-heading font-bold text-white text-xs sm:text-base group-hover:text-cyan-300 transition-colors truncate pr-1">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 group-hover:text-white transition-all group-hover:translate-x-1 shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
