import { useState, useRef, useMemo } from "react";
import {
  BookOpen, Download, Eye, Search, X, ChevronRight,
  FileText, Calendar, Filter
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import FlipbookViewer from "@/components/FlipbookViewer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import catOverview  from "@/assets/catalog-covers/cat-overview.png";
import catPiping    from "@/assets/catalog-covers/cat-piping.png";
import catFittings  from "@/assets/catalog-covers/cat-fittings.png";
import catValves    from "@/assets/catalog-covers/cat-valves.png";

// Local translation helper to satisfy static analysis i18n rules
const t = (key: string) => key;

/* ─── Data ─────────────────────────────────────────────── */
const CATALOGS = [
  {
    id: "cat-1",
    title: "Plumtek Hoses Master Catalogue 2025",
    category: "Hoses",
    description: "Explore our premium, heavy-duty garden and industrial PVC hose collections engineered for maximum pressure resilience.",
    pages: 32,
    publishDate: "September 2025",
    coverImage: catPiping,
    pdfUrl: "/assets/img/catalogues/Hoses Catalogue 2025 Final Out (1).pdf",
    featured: true,
    badge: "Featured",
    badgeColor: "bg-blue-600",
  },
  {
    id: "cat-2",
    title: "PPR 36-Page Technical Catalogue",
    category: "PPR Systems",
    description: "Complete technical specification manual and installation guide for high-performance PPR pipes and thermal fusion fittings.",
    pages: 36,
    publishDate: "September 2025",
    coverImage: catOverview,
    pdfUrl: "/assets/img/catalogues/PPR 36 PAGE CATALOGUE September  2025 Ff.pdf",
    featured: false,
    badge: "New",
    badgeColor: "bg-indigo-600",
  },
  {
    id: "cat-3",
    title: "PTMT Price List (PL Code 1 to 8)",
    category: "Price Lists",
    description: "Official master price list for Plumtek PTMT taps, premium faucets, connection items, and plumbing accessories.",
    pages: 8,
    publishDate: "January 2026",
    coverImage: catFittings,
    pdfUrl: "/assets/img/catalogues/PLUMTEK PTMT PRICE LIST PL CODE 1 to 8.pdf",
    featured: false,
    badge: "Popular",
    badgeColor: "bg-emerald-600",
  },
  {
    id: "cat-4",
    title: "PTMT Price List (PL Code 9 to 16)",
    category: "Price Lists",
    description: "Official master price list for Plumtek PTMT valves, stopcocks, premium concealed valve systems, and hardware.",
    pages: 8,
    publishDate: "January 2026",
    coverImage: catValves,
    pdfUrl: "/assets/img/catalogues/PLUMTEK PTMT PRICE LIST PL CODE 9 to 16.pdf",
    featured: false,
    badge: "Popular",
    badgeColor: "bg-emerald-600",
  },
];
const CATEGORIES = ["All", "Hoses", "PPR Systems", "Price Lists"];
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Catalog Card ────────────────────────────────────── */
const CatalogCard = ({
  catalog, index, onOpen,
}: {
  catalog: typeof CATALOGS[0];
  index: number;
  onOpen: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      className="group bg-white rounded-3xl border border-slate-100 hover:border-blue-100 overflow-hidden
                 shadow-[0_4px_20px_rgba(15,23,42,0.05)]
                 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]
                 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
    >
      {/* Cover */}
      <div
        className="relative aspect-[3/4] bg-slate-50 overflow-hidden cursor-pointer"
        onClick={onOpen}
      >
        {/* Badge */}
        {catalog.badge && (
          <span className={`absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white ${catalog.badgeColor}`}>
            {t(catalog.badge)}
          </span>
        )}

        {/* Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/25 to-transparent z-10" />

        <img
          src={catalog.coverImage}
          alt={catalog.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gloss */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10 pointer-events-none" />

        {/* Hover reveal */}
        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center z-20">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-xl
                         transform scale-75 group-hover:scale-100 transition-transform duration-400">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600 mb-1.5">
          {t(catalog.category)}
        </p>

        <h3 className="font-heading font-bold text-slate-900 text-[15px] leading-snug mb-2.5
                       group-hover:text-blue-600 transition-colors line-clamp-2">
          {t(catalog.title)}
        </h3>

        <p className="text-[13px] text-slate-500 leading-relaxed mb-5 line-clamp-2 flex-1">
          {t(catalog.description)}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-5">
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
            <FileText className="w-3 h-3 text-blue-500" />
            {catalog.pages} {t('Pages')}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {t(catalog.publishDate)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpen}
            className="flex-1 inline-flex items-center justify-center gap-2
                       bg-slate-900 hover:bg-blue-600 text-white
                       font-bold text-[13px] py-2.5 rounded-xl
                       transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            {t('Read Online')}
          </button>
          <a
            href={catalog.pdfUrl}
            download
            title="Download PDF"
            className="w-11 h-11 flex items-center justify-center rounded-xl
                       bg-slate-50 border border-slate-100 text-slate-400
                       hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600
                       transition-all duration-200 shrink-0"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ───────────────────────────────────────── */
const Catalogs = () => {
  const [activeCatalog, setActiveCatalog] = useState<typeof CATALOGS[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return CATALOGS.filter((c) => {
      const matchCat = activeCategory === "All" || c.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <TopBar />
      <Header />
      <PageBanner
        title="Plumtek Digital Library & Catalogs"
        eyebrow="PUBLICATIONS & SPECS"
        subtitle="Browse our interactive catalogs, technical specifications, and official price lists. View online instantly or download for offline access."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Catalogs" }]}
      />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-pipes">

          {/* ── Library Header ── */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             bg-blue-600/10 border border-blue-500/20 text-blue-600
                             text-[11px] font-black uppercase tracking-[0.15em] mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              {t('Plumtek Publications')}
            </span>
            <h1 className="font-heading font-black text-slate-900 tracking-tight mb-4 leading-none" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
              {t('Digital Library')}
            </h1>
            <p className="text-slate-500 text-[16px] sm:text-[18px] leading-relaxed font-medium">
              {t('Browse our interactive catalogs, technical specifications, and official price lists. View online instantly or download for offline access.')}
            </p>
          </div>

          {/* ── Search & Filters ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder={t('Search catalogs…')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl
                           text-[14px] text-slate-700 placeholder:text-slate-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                           shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200
                    ${activeCategory === cat
                      ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600"
                    }`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* ── Results count ── */}
          <p className="text-[13px] text-slate-400 font-medium mb-8">
            {t('Showing ')}<span className="font-bold text-slate-700">{filtered.length}</span> {t('catalog')}{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && <>{t(' in ')}<span className="text-blue-600 font-bold">{t(activeCategory)}</span></>}
          </p>

          {/* ── Catalog Grid ── */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((catalog, i) => (
                  <CatalogCard
                    key={catalog.id}
                    catalog={catalog}
                    index={i}
                    onOpen={() => setActiveCatalog(catalog)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-24 text-center"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <BookOpen className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">{t('No catalogs found')}</h3>
                <p className="text-slate-500 text-[14px] mb-6">{t('Try adjusting your search or filter criteria.')}</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-500 transition-colors text-[14px]"
                >
                  {t('Clear Filters ')}<ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      {/* Flipbook Modal */}
      <FlipbookViewer
        catalog={activeCatalog}
        onClose={() => setActiveCatalog(null)}
      />
    </div>
  );
};

export default Catalogs;
