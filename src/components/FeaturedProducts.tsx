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
        image: categoryImageLookup[cat.name] ?? categoryImageLookup.Hoses,
        featured: i === 0,
      }));
    }
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return unique.slice(0, 5).map((cat, i) => ({
      rawName: cat,
      name: normalizeCategoryName(cat),
      image: categoryImageLookup[cat] ?? categoryImageLookup.Hoses,
      featured: i === 0,
    }));
  }, [categoriesList, products]);

  const featured = categoryCards[0] ?? {
    rawName: "Products",
    name: "Industrial Products",
    image: categoryImageLookup.Hoses,
    featured: true,
  };
  const others = categoryCards.slice(1);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white" aria-label="Featured categories">
      <div className="container-pipes">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3">
              Top-Rated Categories
            </p>
            <h2 className="font-heading font-bold text-slate-900 leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              Choose the Category<br className="hidden sm:block" /> You're Interested In
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-blue-600 hover:text-blue-700 group shrink-0"
          >
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* ── Category Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5 auto-rows-auto"
        >
          {/* Large featured card – spans 2 rows */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-1 lg:row-span-2 group relative rounded-3xl overflow-hidden
                       bg-slate-50 border border-slate-100 hover:border-blue-100
                       shadow-[0_2px_12px_rgba(15,23,42,0.04)]
                       hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]
                       transition-all duration-500 flex flex-col min-h-[420px]"
          >
            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-10 pt-12">
              <img
                src={featured.image}
                alt={featured.name}
                loading="lazy"
                decoding="async"
                className="w-full max-h-[400px] object-contain
                           transition-transform duration-700 ease-out
                           group-hover:scale-110"
              />
            </div>

            {/* Caption */}
            <div className="p-8 border-t border-slate-100 bg-white">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 mb-1.5">
                Featured Category
              </p>
              <h3 className="font-heading font-bold text-slate-900 text-2xl mb-4 group-hover:text-blue-600 transition-colors">
                {featured.name}
              </h3>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.1em] text-slate-700 hover:text-blue-600 group/link transition-colors"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1.5" />
              </Link>
            </div>
          </motion.div>

          {/* 4 smaller cards */}
          {others.map((cat) => (
            <motion.div key={cat.rawName} variants={cardVariants}>
              <Link
                to="/shop"
                className="group flex flex-col h-full rounded-3xl overflow-hidden
                           bg-slate-50 border border-slate-100 hover:border-blue-100
                           shadow-[0_2px_8px_rgba(15,23,42,0.04)]
                           hover:shadow-[0_16px_48px_rgba(15,23,42,0.1)]
                           transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex-1 flex items-center justify-center min-h-[180px] p-8">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="max-w-[75%] max-h-[140px] object-contain
                               transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="px-6 py-5 border-t border-slate-100 bg-white flex items-center justify-between">
                  <h3 className="font-heading font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
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
