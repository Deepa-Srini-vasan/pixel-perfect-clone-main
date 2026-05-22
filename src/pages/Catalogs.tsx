import { useState, useRef, useMemo } from "react";
import {
  BookOpen, Download, Eye, Search, X, ChevronRight,
  FileText, Calendar, Star, Filter, Sparkles, ArrowRight
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FlipbookViewer from "@/components/FlipbookViewer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import catOverview  from "@/assets/catalog-covers/cat-overview.png";
import catPiping    from "@/assets/catalog-covers/cat-piping.png";
import catFittings  from "@/assets/catalog-covers/cat-fittings.png";
import catCorporate from "@/assets/catalog-covers/cat-corporate.png";
import catReducers  from "@/assets/catalog-covers/cat-reducers.png";
import catValves    from "@/assets/catalog-covers/cat-valves.png";

/* ─── Data ─────────────────────────────────────────────── */
const PDF = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

const CATALOGS = [
  {
    id: "cat-1",
    title: "Plumtek Product Overview 2026",
    category: "Full Range",
    description: "Complete overview of our latest industrial piping solutions, fittings, and hardware engineered for modern manufacturing.",
    pages: 14,
    publishDate: "May 2026",
    coverImage: catOverview,
    pdfUrl: PDF,
    featured: true,
    badge: "New",
    badgeColor: "bg-blue-600",
  },
  {
    id: "cat-2",
    title: "Heavy-Duty Piping Manual",
    category: "Piping",
    description: "Technical specifications, load limits, and installation guides for heavy-duty industrial pipes.",
    pages: 8,
    publishDate: "Jan 2026",
    coverImage: catPiping,
    pdfUrl: PDF,
    featured: false,
    badge: "Popular",
    badgeColor: "bg-amber-500",
  },
  {
    id: "cat-3",
    title: "Fittings & Valves Master Catalogue",
    category: "Fittings",
    description: "Our new range of ergonomic and precision-engineered fittings for all industrial environments.",
    pages: 22,
    publishDate: "Nov 2025",
    coverImage: catFittings,
    pdfUrl: PDF,
    featured: false,
    badge: null,
    badgeColor: "",
  },
  {
    id: "cat-4",
    title: "Plumtek Corporate Brochure",
    category: "Corporate",
    description: "Learn about our company history, mission, ISO certifications, and 25-year industrial footprint.",
    pages: 4,
    publishDate: "Aug 2025",
    coverImage: catCorporate,
    pdfUrl: "https://invalid-url.com/broken.pdf",
    featured: false,
    badge: null,
    badgeColor: "",
  },
  {
    id: "cat-5",
    title: "Pipe Reducers Technical Guide",
    category: "Piping",
    description: "Comprehensive guide to our full range of pipe reducers, dimensions, pressure ratings and use cases.",
    pages: 10,
    publishDate: "Mar 2026",
    coverImage: catReducers,
    pdfUrl: PDF,
    featured: false,
    badge: "New",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "cat-6",
    title: "Valve Selection & Sizing Guide",
    category: "Valves",
    description: "Expert selection guide for industrial stop valves, ball valves, and concealed valve systems.",
    pages: 18,
    publishDate: "Feb 2026",
    coverImage: catValves,
    pdfUrl: PDF,
    featured: false,
    badge: null,
    badgeColor: "",
  },
];

const CATEGORIES = ["All", "Full Range", "Piping", "Fittings", "Valves", "Corporate"];
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Featured Showcase Card ─────────────────────────── */
const FeaturedCard = ({ catalog, onOpen }: { catalog: typeof CATALOGS[0]; onOpen: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800
                 shadow-[0_40px_100px_rgba(0,0,0,0.35)] mb-20"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-blue-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-cyan-500/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Content */}
        <div className="p-10 lg:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             bg-blue-600/15 border border-blue-500/20 text-blue-400
                             text-[11px] font-black uppercase tracking-[0.15em]">
              <Sparkles className="w-3 h-3" />
              Featured Catalog
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
              {catalog.badge}
            </span>
          </div>

          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 mb-3">
            {catalog.category}
          </p>

          <h2 className="font-heading font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            {catalog.title}
          </h2>

          <p className="text-slate-400 text-[15px] leading-[1.75] mb-8 max-w-[480px]">
            {catalog.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-5 mb-10">
            <span className="flex items-center gap-2 text-[12px] font-semibold text-slate-500">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              {catalog.pages} Pages
            </span>
            <span className="flex items-center gap-2 text-[12px] font-semibold text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              {catalog.publishDate}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500
                         text-white font-bold px-7 py-3.5 rounded-full
                         shadow-[0_8px_24px_-4px_rgba(37,99,235,0.5)]
                         hover:shadow-[0_12px_32px_-4px_rgba(37,99,235,0.65)]
                         transition-all duration-300 hover:-translate-y-0.5 text-[14px]"
            >
              <BookOpen className="w-4 h-4" />
              Read Online
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={catalog.pdfUrl}
              download
              className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/10
                         text-white border border-white/15 hover:border-white/25
                         font-bold px-7 py-3.5 rounded-full backdrop-blur-sm
                         transition-all duration-300 hover:-translate-y-0.5 text-[14px]"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Right: Cover preview */}
        <div className="relative flex items-center justify-center p-10 lg:p-14">
          {/* Book shadow */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/40 blur-xl rounded-full" />

          <div className="relative group cursor-pointer" onClick={onOpen}>
            {/* Book spine */}
            <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/50 to-transparent rounded-l-lg z-20" />

            {/* Cover */}
            <div className="relative overflow-hidden rounded-xl
                           shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
                           transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
              <img
                src={catalog.coverImage}
                alt={catalog.title}
                className="w-64 lg:w-72 aspect-[3/4] object-cover"
              />
              {/* Gloss overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Page stack effect */}
            <div className="absolute -right-2 top-1 bottom-1 w-3 bg-slate-300/20 rounded-r-sm" />
            <div className="absolute -right-3.5 top-2 bottom-2 w-2.5 bg-slate-400/10 rounded-r-sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
            {catalog.badge}
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
          {catalog.category}
        </p>

        <h3 className="font-heading font-bold text-slate-900 text-[15px] leading-snug mb-2.5
                       group-hover:text-blue-600 transition-colors line-clamp-2">
          {catalog.title}
        </h3>

        <p className="text-[13px] text-slate-500 leading-relaxed mb-5 line-clamp-2 flex-1">
          {catalog.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-5">
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
            <FileText className="w-3 h-3 text-blue-500" />
            {catalog.pages} Pages
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {catalog.publishDate}
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
            Read Online
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
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const featured = CATALOGS.find((c) => c.featured)!;

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

      {/* ── Cinematic Hero ── */}
      <div
        ref={heroRef}
        className="relative bg-slate-950 overflow-hidden"
        style={{ minHeight: "clamp(280px, 40vw, 440px)" }}
      >
        {/* Background texture */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(6,182,212,0.08) 0%, transparent 45%),
              repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.01) 35px, rgba(255,255,255,0.01) 70px)`
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="relative z-10 container-pipes flex flex-col justify-center h-full py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                             bg-blue-600/15 border border-blue-500/20 text-blue-400
                             text-[11px] font-black uppercase tracking-[0.15em] mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Digital Catalog Library
            </span>

            <h1
              className="font-heading font-black text-white leading-[0.95] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Explore Our Industrial<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Product Catalogs
              </span>
            </h1>

            <p className="text-slate-400 text-[15px] leading-relaxed max-w-[520px]">
              Browse our premium digital showroom — technical manuals, product overviews, and
              corporate brochures available as interactive flipbooks or PDF downloads.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-1 py-16 lg:py-24">
        <div className="container-pipes">

          {/* ── Featured Showcase ── */}
          <FeaturedCard catalog={featured} onOpen={() => setActiveCatalog(featured)} />

          {/* ── Search & Filters ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search catalogs…"
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
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Results count ── */}
          <p className="text-[13px] text-slate-400 font-medium mb-8">
            Showing <span className="font-bold text-slate-700">{filtered.length}</span> catalog{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && <> in <span className="text-blue-600 font-bold">{activeCategory}</span></>}
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
                <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">No catalogs found</h3>
                <p className="text-slate-500 text-[14px] mb-6">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-500 transition-colors text-[14px]"
                >
                  Clear Filters <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CTA Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease }}
            className="mt-20 rounded-3xl bg-slate-950 border border-slate-800 p-10 lg:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-[400px] h-[200px] bg-blue-600/10 blur-[80px]" />
            </div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="relative z-10">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">
                Need a Custom Quote?
              </p>
              <h2
                className="font-heading font-black text-white mb-5 tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                Can't Find What You're Looking For?
              </h2>
              <p className="text-slate-400 text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
                Our industrial specialists are ready to provide custom specifications and pricing for your exact requirements.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white
                             font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5
                             shadow-[0_8px_24px_-4px_rgba(37,99,235,0.5)] text-[14px]"
                >
                  Request Custom Catalog
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+919842742936"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white
                             font-semibold text-[14px] transition-colors"
                >
                  or call +91 98427 42936
                </a>
              </div>
            </div>
          </motion.div>
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
