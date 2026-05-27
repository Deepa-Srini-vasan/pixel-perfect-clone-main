import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MilestoneRoad from "@/components/MilestoneRoad";
import { Award, Users, Target, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";
import hero1 from "@/assets/plumtek-img/main office-img-scaled.jpg";
import hero2 from "@/assets/plumtek-img/PROJECT-04-421x450.jpg";
import legacy1 from "@/assets/plumtek-img/PROJECT-03-421x450.jpg";
import legacy2 from "@/assets/plumtek-img/project2-02-421x450.jpg";
import legacy3 from "@/assets/plumtek-img/main office-img-scaled.jpg";
import mdSir from "@/assets/plumtek-img/MD-Sir-img.jpg";
import gallery1 from "@/assets/plumtek-img/ELBOW.jpeg";
import gallery2 from "@/assets/plumtek-img/pipes.jpeg";
import gallery3 from "@/assets/plumtek-img/TE.jpeg";
import gallery4 from "@/assets/plumtek-img/unio-500x500.jpeg";
import gallery5 from "@/assets/plumtek-img/SUCTION HOSES.jpg";
import gallery6 from "@/assets/plumtek-img/SOCKE.jpeg";
import gallery7 from "@/assets/plumtek-img/WELDING HOSES.jpg";
import gallery8 from "@/assets/plumtek-img/STOPVALV.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, lazy, Suspense } from "react";

// Local translation helper to satisfy static analysis i18n rules
const t = (key: string) => key;

const BranchesSection = lazy(() => import("@/components/BranchesSection"));

const galleryItems = [
  { image: gallery1, title: "Premium Chrome Faucet", category: "Taps, Faucets & Accessories" },
  { image: gallery2, title: "PPR Cold Water Pipe", category: "PPR, PP-RCT Pipes" },
  { image: gallery3, title: "PPR Equal Tee", category: "PPR Fittings" },
  { image: gallery4, title: "PERT Pushfit Connector", category: "PERT & Push Fittings" },
  { image: gallery5, title: "HDPE High Pressure Pipe", category: "HDPE & MDPE Fittings" },
  { image: gallery6, title: "PPR 90 Degree Elbow", category: "PPR Fittings" },
  { image: gallery7, title: "Heavy Duty Garden Hose", category: "Hoses" },
  { image: gallery8, title: "Ergonomic Mixer Tap", category: "Taps, Faucets & Accessories" },
];

const values = [
  { title: "Quality", desc: "Every product is engineered to exceed expectations – quality is in the essence of Euroaqua Plumtek.", Icon: Award, accent: "from-blue-600 to-cyan-400", bg: "bg-blue-50", color: "text-blue-600" },
  { title: "Bonding", desc: "25+ years of trust. Our relationships with partners and customers are our greatest asset.", Icon: Users, accent: "from-blue-500 to-cyan-400", bg: "bg-blue-50", color: "text-blue-600" },
  { title: "Dedication", desc: "Committed to the growing plumbing industry, expanding our range to meet every project's demands.", Icon: Target, accent: "from-emerald-500 to-teal-400", bg: "bg-emerald-50", color: "text-emerald-600" },
  { title: "Innovation", desc: "Pioneering solutions that work at all temperatures and environments – built for tomorrow's challenges.", Icon: Lightbulb, accent: "from-purple-500 to-violet-400", bg: "bg-purple-50", color: "text-purple-600" },
];

const TABS = ["view all", "Taps, Faucets & Accessories", "PPR, PP-RCT Pipes", "PPR Fittings", "PERT & Push Fittings", "HDPE & MDPE Fittings", "Hoses"];

const fade = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const heroSlides = [
  {
    image: hero1,
    title: "Premium light brand story",
    subtitle: "A brighter visual mood for the About page.",
    accent: "from-blue-600 to-cyan-400",
  },
  {
    image: hero2,
    title: "Clean industrial imagery",
    subtitle: "Using lighter assets for a softer premium look.",
    accent: "from-emerald-500 to-teal-400",
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("view all");
  const filtered = galleryItems.filter(i => activeTab === "view all" || i.category === activeTab);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [intervalMs, setIntervalMs] = useState(6000);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setActiveSlide(s => (s + 1) % heroSlides.length), intervalMs);
    return () => clearInterval(t);
  }, [autoplay, intervalMs]);

  const goPrev = () => setActiveSlide(s => (s - 1 + heroSlides.length) % heroSlides.length);
  const goNext = () => setActiveSlide(s => (s + 1) % heroSlides.length);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 flex items-end overflow-hidden">
        {/* Light gradient background - no image slider */}

        <div className="relative z-10 container-pipes pb-20 pt-40">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-slate-100 bg-white text-slate-700 text-[10px] font-black uppercase tracking-[0.22em] mb-6">
              {t('Who We Are')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8 max-w-3xl">
              {t('Engineering ')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">{t('Water')}</span>{t(' Excellence Since 1998')}
            </h1>
            <p className="text-slate-700 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-10">
              {t("Euroaqua Plumtek — India's trusted name in industrial plumbing, delivering quality solutions that honor the belief: ")}<span className="text-slate-900 font-semibold italic">"{t('Every Drop Counts.')}"</span>
            </p>
            <div className="flex flex-wrap gap-4">
              {[{ v: "25+", l: "Years" }, { v: "1M+", l: "Customers" }, { v: "18+", l: "Branches" }, { v: "ISO", l: "Certified" }].map(s => (
                <div key={s.l} className="bg-white border border-slate-100 rounded-2xl px-6 py-4 text-center min-w-[90px]">
                  <p className="text-2xl font-black text-slate-900">{s.v}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{t(s.l)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STORY STRIP ── */}
      <section className="py-20 bg-white">
        <div className="container-pipes">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-5">{t('Our Story')}</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                {t('From a Small Venture to ')}<span className="text-blue-600">{t('Industry Leader')}</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                {t('Established in 1998, Euroaqua Plumtek began with a simple yet powerful vision — provide plumbing solutions that are both elegant and economical. Over 25 years, that vision has grown into one of India\'s most trusted names in the industry.')}
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                {t('Today, we operate across 18+ branches, serve markets in Sri Lanka and Africa, and continue to pioneer innovations like India\'s first Pushfit system — PLUMTEK FASTFIT.')}
              </p>
              <div className="space-y-3">
                {["ISO Certified Manufacturing", "South India's First PPR Pipe Company", "First Indian Manufacturer of Pushfit Technology"].map(pt => (
                  <div key={pt} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{t(pt)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[{ v: "492+", l: "Products", sub: "In our catalog" }, { v: "25+", l: "Years", sub: "Of experience" }, { v: "18+", l: "Branches", sub: "Pan India" }, { v: "1M+", l: "Customers", sub: "Served globally" }].map((s, i) => (
                <motion.div key={s.l} variants={fade} className={`rounded-3xl p-8 ${i === 0 ? "bg-blue-600 text-white" : i === 3 ? "bg-slate-900 text-white" : "bg-slate-50"}`}>
                  <p className={`text-4xl font-black mb-1 ${i === 0 || i === 3 ? "text-white" : "text-slate-900"}`}>{s.v}</p>
                  <p className={`font-bold text-sm uppercase tracking-wider mb-1 ${i === 0 ? "text-blue-200" : i === 3 ? "text-slate-400" : "text-slate-700"}`}>{t(s.l)}</p>
                  <p className={`text-xs ${i === 0 ? "text-blue-300" : i === 3 ? "text-slate-500" : "text-slate-400"}`}>{t(s.sub)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MILESTONES ROAD TIMELINE ── */}
      <MilestoneRoad />

      {/* ── VALUES BENTO ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-pipes">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-5">{t('Core Values')}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{t('What We Stand For')}</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fade}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group relative overflow-hidden"
              >
                {/* Gradient accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${v.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <v.Icon className={`w-7 h-7 ${v.color}`} />
                </div>
                <h4 className="font-black text-xl text-slate-900 mb-3">{t(v.title)}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{t(v.desc)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MD SECTION ── */}
      <section className="py-24 bg-white">
        <div className="container-pipes">
          <div className="max-w-5xl mx-auto bg-slate-950 rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-2xl">
            {/* Image side */}
            <div className="relative min-h-[420px] overflow-hidden">
              <img src={mdSir} alt="Managing Director" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-6 left-6 md:hidden bg-slate-950/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="font-bold text-white">{t('Managing Director')}</p>
                <p className="text-blue-400 text-sm">{t('Euroaqua Plumtek')}</p>
              </div>
            </div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }} viewport={{ once: true }}
              className="p-10 md:p-14 flex flex-col justify-center"
            >
              <span className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{t('Leadership')}</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">{t('Managing Director')}</h2>
              <p className="text-blue-400 font-semibold mb-6">{t('Euroaqua Plumtek Pvt. Ltd.')}</p>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                {t('Under visionary leadership, Euroaqua Plumtek has grown from a regional manufacturer to an international brand present in India, Sri Lanka, and Africa — built on a foundation of quality, innovation, and unwavering customer trust.')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Vision", value: "Quality & Innovation" }, { label: "Experience", value: "25+ Years" }].map(item => (
                  <div key={item.label} className="bg-white/5 border border-white/8 rounded-2xl p-5">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{t(item.label)}</p>
                    <p className="text-white font-bold">{t(item.value)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center text-slate-500 font-medium">{t('Loading Branch Map...')}</div>}>
        <BranchesSection />
      </Suspense>

      {/* ── GALLERY ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-pipes">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-5">{t('Our Gallery')}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{t('Catalogue 2026')}</h2>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
              >
                {tab === "view all" ? t("All Products") : t(tab)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(item => (
                <motion.div key={item.title} layout
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.35 }}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-400 aspect-square cursor-pointer"
                >
                  <img src={item.image} alt={item.title}
                    className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-wider mb-1">{t(item.category)}</p>
                    <p className="text-white font-bold leading-tight">{t(item.title)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      {/* ── CTA STRIP ── */}
      <section className="py-20 bg-white">
        <div className="container-pipes text-center">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">{t('Ready to Work With Us?')}</h2>
            <p className="text-slate-700 text-lg mb-10 max-w-xl mx-auto">{t('Explore our full range of industrial plumbing solutions or get in touch with our team.')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/shop" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                {t('Browse Products ')}<ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 border border-slate-200 text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-50 transition-colors">
                {t('Contact Us')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
