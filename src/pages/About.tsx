import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MilestoneRoad from "@/components/MilestoneRoad";
import {
  Award,
  Users,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Rocket,
  Factory,
  Package,
  FlaskConical,
  Map,
  Globe,
  Calendar,
  Smile,
  ShieldCheck,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gallery1 from "@/assets/plumtek-img/ELBOW.jpeg";
import gallery2 from "@/assets/plumtek-img/pipes.jpeg";
import gallery3 from "@/assets/plumtek-img/TE.jpeg";
import gallery4 from "@/assets/plumtek-img/unio-500x500.jpeg";
import gallery5 from "@/assets/plumtek-img/SUCTION HOSES.jpg";
import gallery6 from "@/assets/plumtek-img/SOCKE.jpeg";
import gallery7 from "@/assets/plumtek-img/WELDING HOSES.jpg";
import gallery8 from "@/assets/plumtek-img/STOPVALV.jpeg";
import mdSir from "@/assets/plumtek-img/MD-Sir-img.jpg";
import plumtekBg from "@/assets/3d-assets/plumtek-bg.png";
import bgPlumtekSection02 from "@/assets/3d-assets/bg-plumtek-section-02.png";
import { Link } from "react-router-dom";
import { useState, lazy, Suspense } from "react";

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
  { title: "Quality", desc: "Every product is engineered to exceed expectations — quality is in the essence of Euroaqua Plumtek.", Icon: Award, glow: "bg-blue-50 text-blue-600 border-blue-100" },
  { title: "Bonding", desc: "25+ years of trust. Our relationships with partners and customers are our greatest asset.", Icon: Users, glow: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { title: "Dedication", desc: "Committed to the growing plumbing industry, expanding our range to meet every project's demands.", Icon: Target, glow: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { title: "Innovation", desc: "Pioneering solutions that work at all temperatures and environments — built for tomorrow's challenges.", Icon: Lightbulb, glow: "bg-purple-50 text-purple-600 border-purple-100" },
];

const TABS = ["view all", "Taps, Faucets & Accessories", "PPR, PP-RCT Pipes", "PPR Fittings", "PERT & Push Fittings", "HDPE & MDPE Fittings", "Hoses"];

const fade = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const About = () => {
  const [activeTab, setActiveTab] = useState("view all");
  const filtered = galleryItems.filter(i => activeTab === "view all" || i.category === activeTab);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      <TopBar />
      <Header />

      {/* ── 1. HERO BANNER ── */}
      <section
        className="relative py-6 sm:py-12 lg:py-16 min-h-0 sm:min-h-[30vh] lg:min-h-[38vh] flex items-center bg-slate-950 bg-cover bg-center bg-no-repeat overflow-hidden text-left"
        style={{ backgroundImage: `url(${plumtekBg})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 sm:w-6 h-[2px] bg-blue-500" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
                ABOUT EUROAQUA PLUMTEK
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.1] mb-2 sm:mb-3">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Water Excellence</span> Since 1998
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed font-medium mb-4 sm:mb-6">
              Quality plumbing solutions for every need. Engineered for performance, built for trust. Euroaqua Plumtek delivers India's most dependable pipes, fittings, taps & hoses.
            </p>

            {/* Stats & CTA Row */}
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              {[
                { icon: ShieldCheck, v: "25+", l: "YEARS" },
                { icon: Users, v: "1M+", l: "CUSTOMERS" },
                { icon: MapPin, v: "18+", l: "BRANCHES" },
                { icon: Award, v: "ISO", l: "CERTIFIED" },
              ].map((s, idx, arr) => (
                <div
                  key={s.l}
                  className={`flex items-center gap-2 ${
                    idx < arr.length - 1 ? "sm:border-r sm:border-white/15 sm:pr-6" : ""
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-sky-400 shrink-0">
                    <s.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-black text-white leading-none mb-0.5">{s.v}</p>
                    <p className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider text-slate-300 leading-none">{s.l}</p>
                  </div>
                </div>
              ))}

              <Link
                to="/catalogs"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider py-2 sm:py-2.5 px-5 sm:px-6 rounded-full shadow-md shadow-blue-600/40 border border-blue-400/40 transition-all duration-300 hover:scale-105 group mt-1 sm:mt-0"
              >
                <span>GO TO CATALOGUE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. OUR STORY SECTION ── */}
      <section
        className="py-8 sm:py-16 lg:py-24 relative overflow-hidden text-left bg-white bg-cover bg-right-top bg-no-repeat max-sm:!bg-none"
        style={{ backgroundImage: `url(${bgPlumtekSection02})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] mb-3 sm:mb-5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                OUR STORY
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3 sm:mb-6">
                From a Small Venture to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Industry Leader</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-6 font-medium">
                Established in 1998, Euroaqua Plumtek began with a simple yet powerful vision — provide plumbing solutions that are both elegant and economical. Over 25 years, that vision has grown into one of India's most trusted names in the plumbing industry.
              </p>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed mb-4 sm:mb-8 font-medium">
                Today, we operate across 18+ branches, serve active export markets in Sri Lanka, Africa, and beyond, and continue to pioneer innovations like South India's first PPR pipe manufacturer and India's first Pushfit system — PLUMTEK FASTFIT.
              </p>

              <div className="space-y-2.5 sm:space-y-3.5 mb-5 sm:mb-8">
                {[
                  "ISO 9001 Certified Manufacturing Standards",
                  "South India's First PPR Pipe Manufacturing Pioneer",
                  "First Indian Manufacturer of Pushfit Technology",
                  "18+ Branches Across India & Global Export Ready",
                ].map((pt) => (
                  <div key={pt} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-slate-800 font-bold text-xs sm:text-sm">{t(pt)}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-6 py-3 sm:px-7 sm:py-3.5 rounded-full shadow-md shadow-blue-600/30 transition-all duration-300 hover:scale-105 group"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right Cards Grid */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-3 sm:gap-5">
              {[
                { v: "492+", l: "Products & SKUs", sub: "Widest catalog in South Asia", bg: "bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg" },
                { v: "25+", l: "Years Experience", sub: "Pioneering plumbing trust", bg: "bg-white border border-slate-100 text-slate-900 shadow-sm" },
                { v: "18+", l: "Pan-India Branches", sub: "Fast & reliable logistics", bg: "bg-white border border-slate-100 text-slate-900 shadow-sm" },
                { v: "1M+", l: "Happy Customers", sub: "Residential & Commercial", bg: "bg-gradient-to-b from-slate-900 to-[#071329] text-white shadow-lg" },
              ].map((s) => (
                <motion.div
                  key={s.l}
                  variants={fade}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-2xl sm:rounded-[24px] p-4 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 ${s.bg}`}
                >
                  <p className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-1 sm:mb-2">{s.v}</p>
                  <div>
                    <p className="font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-0.5">{t(s.l)}</p>
                    <p className="text-[10px] sm:text-xs font-medium opacity-80">{t(s.sub)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. VISION & MISSION SECTION (ROYAL BLUE GRADIENT) ── */}
      <section className="py-8 sm:py-16 lg:py-24 bg-gradient-to-b from-[#0f2b66] via-[#12337a] to-[#0a1c42] relative overflow-hidden text-left">
        {/* Ambient Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-6 sm:mb-16">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-cyan-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] mb-2 sm:mb-4">
              OUR DIRECTION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">{t('Vision & Mission')}</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                label: "Our Vision",
                text: "To be the most trusted and innovative plumbing solutions company in South Asia — setting new benchmarks in quality, sustainability, and customer service that the entire industry aspires to match.",
                Icon: Target,
                accent: "from-blue-400 to-cyan-300",
              },
              {
                label: "Our Mission",
                text: "To manufacture world-class plumbing products that combine engineering excellence with economic value — ensuring every home, building, and infrastructure project has access to reliable, safe, and durable water solutions.",
                Icon: Rocket,
                accent: "from-cyan-300 to-emerald-400",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fade}
                whileHover={{ y: -4 }}
                className="bg-white/[0.05] backdrop-blur-md border border-white/15 rounded-2xl sm:rounded-[28px] p-5 sm:p-8 lg:p-10 shadow-xl hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 text-left"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 mb-3 sm:mb-6 shrink-0 shadow-inner">
                  <item.Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-white font-black text-lg sm:text-2xl mb-2 sm:mb-4">{t(item.label)}</h3>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-base font-medium">{t(item.text)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. INFRASTRUCTURE & MANUFACTURING EXCELLENCE ── */}
      <section className="py-8 sm:py-16 lg:py-24 bg-slate-50/50 relative overflow-hidden text-left">
        {/* Subtle SVG Grid Background Pattern */}
        <svg className="absolute inset-0 w-full h-full text-blue-600/[0.04] pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <pattern id="infra-svg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#infra-svg-grid)" />
        </svg>

        {/* Ambient Blue Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-6 sm:mb-16">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] mb-2 sm:mb-4 shadow-xs">
              INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">{t('Manufacturing Excellence')}</h2>
            <p className="mt-2 sm:mt-4 text-slate-600 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              {t('State-of-the-art manufacturing facilities with ISO-certified processes — where quality is engineered into every single product.')}
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { metric: "50,000 sq.ft", label: "Manufacturing Area", Icon: Factory },
              { metric: "492+", label: "Product SKUs", Icon: Package },
              { metric: "ISO 9001", label: "Quality Certified", Icon: Award },
              { metric: "100%", label: "In-house Testing", Icon: FlaskConical },
              { metric: "18+", label: "State Coverage", Icon: Map },
              { metric: "15+", label: "Export Countries", Icon: Globe },
              { metric: "25+", label: "Years Experience", Icon: Calendar },
              { metric: "1000+", label: "Happy Clients", Icon: Smile },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fade}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-[24px] border border-blue-100/90 p-3.5 sm:p-6 flex flex-col items-center text-center shadow-xs sm:shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:shadow-xl hover:shadow-blue-500/15 hover:border-blue-400 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border border-blue-200/80 bg-blue-50/90 text-blue-600 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:scale-110 shadow-xs transition-all duration-300">
                  <item.Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <p className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors">{item.metric}</p>
                <p className="text-[9px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">{t(item.label)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. MILESTONE ROAD TIMELINE ── */}
      <MilestoneRoad />

      {/* ── 6. CORE VALUES SECTION ── */}
      <section className="py-8 sm:py-16 lg:py-24 bg-slate-50 relative overflow-hidden text-left">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-6 sm:mb-16">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-4">
              CORE VALUES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">{t('What We Stand For')}</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fade}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-8 border border-slate-100 shadow-xs sm:shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:shadow-xl hover:border-blue-200 transition-all duration-300 group flex flex-col justify-between text-left"
              >
                <div>
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ${v.glow}`}>
                    <v.Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h4 className="font-black text-base sm:text-2xl text-slate-900 mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors">{t(v.title)}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{t(v.desc)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. LEADERSHIP & MD MESSAGE ── */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white text-left">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#071329] via-[#0b1c3d] to-[#040c1e] rounded-[32px] overflow-hidden grid md:grid-cols-12 shadow-2xl border border-white/10">
            
            {/* Image side */}
            <div className="md:col-span-5 relative min-h-[380px] overflow-hidden">
              <img src={mdSir} alt="Managing Director" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071329] via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-6 left-6 md:hidden">
                <p className="font-extrabold text-white text-lg">{t('Managing Director')}</p>
                <p className="text-cyan-300 text-xs font-bold uppercase tracking-wider">{t('Euroaqua Plumtek')}</p>
              </div>
            </div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="md:col-span-7 p-8 lg:p-12 flex flex-col justify-center text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-cyan-300 text-[10px] font-black uppercase tracking-[0.2em] mb-5 w-fit">
                LEADERSHIP VISION
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">{t('Managing Director')}</h2>
              <p className="text-sky-300 font-bold mb-6 text-sm">{t('Euroaqua Plumtek Pvt. Ltd.')}</p>

              <blockquote className="text-slate-300 leading-relaxed mb-8 text-base font-medium italic border-l-2 border-blue-500 pl-4">
                {t('"Under visionary leadership, Euroaqua Plumtek has grown from a regional manufacturer to an international brand present in India, Sri Lanka, and Africa — built on a foundation of quality, innovation, and unwavering customer trust."')}
              </blockquote>

              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Core Vision", value: "Quality & Innovation" }, { label: "Experience", value: "25+ Years" }].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-cyan-300 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{t(item.label)}</p>
                    <p className="text-white font-black text-sm">{t(item.value)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 8. PAN INDIA PRESENCE SECTION ── */}
      <Suspense fallback={<div className="py-20 text-center text-slate-500 font-medium">{t('Loading Branch Map...')}</div>}>
        <BranchesSection />
      </Suspense>

      {/* ── 9. PRODUCT GALLERY ── */}
      <section className="py-24 bg-slate-50/80 relative text-left overflow-hidden">
        {/* SVG Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.55] pointer-events-none">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gallery-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.12" />
                <circle cx="40" cy="40" r="1.5" fill="#2563eb" fillOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gallery-grid-pattern)" />
          </svg>
        </div>

        {/* Ambient Blue Blur Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-600 text-[11px] font-black uppercase tracking-[0.22em] mb-4 shadow-sm">
              PRODUCT GALLERY
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{t('Catalogue Showcase')}</h2>
            <p className="mt-3 text-slate-600 text-base max-w-xl mx-auto font-medium">
              {t('Explore Euroaqua Plumtek’s high-precision pipes, fittings, faucets, and fluid conveyance products.')}
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-white/90 backdrop-blur-md border border-blue-100 text-slate-700 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {tab === "view all" ? t("All Products") : t(tab)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
                  transition={{ duration: 0.35 }}
                  className="group relative bg-white/90 backdrop-blur-md rounded-[24px] overflow-hidden border border-blue-100/90 shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-400 transition-all duration-300 aspect-square cursor-pointer flex items-center justify-center p-6 text-left"
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 z-10">
                    <div className="flex justify-end">
                      <div className="w-9 h-9 rounded-full bg-blue-600 border border-blue-400/50 flex items-center justify-center text-white shadow-lg">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="text-cyan-300 text-[10px] font-black uppercase tracking-wider mb-1">{t(item.category)}</p>
                      <p className="text-white font-extrabold text-sm leading-snug">{t(item.title)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA STRIP ── */}
      <section className="py-24 bg-gradient-to-b from-[#071329] via-[#0b1c3d] to-[#040c1e] text-white relative overflow-hidden text-left">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">{t('Ready to Work With Us?')}</h2>
            <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium">
              {t('Explore our full range of industrial plumbing solutions or get in touch with our expert sales team.')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
