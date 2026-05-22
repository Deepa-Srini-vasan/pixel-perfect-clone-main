import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, Target, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";
import hero1 from "@/assets/plumtek-img/PROJECT-03-421x450.jpg";
import hero2 from "@/assets/plumtek-img/project2-01-421x450.jpg";
import { useState } from "react";
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

const galleryItems = [
  { image: gallery1, title: "Premium Chrome Faucet",    category: "Taps, Faucets & Accessories" },
  { image: gallery2, title: "PPR Cold Water Pipe",      category: "PPR, PP-RCT Pipes" },
  { image: gallery3, title: "PPR Equal Tee",            category: "PPR Fittings" },
  { image: gallery4, title: "PERT Pushfit Connector",   category: "PERT & Push Fittings" },
  { image: gallery5, title: "HDPE High Pressure Pipe",  category: "HDPE & MDPE Fittings" },
  { image: gallery6, title: "PPR 90 Degree Elbow",      category: "PPR Fittings" },
  { image: gallery7, title: "Heavy Duty Garden Hose",   category: "Hoses" },
  { image: gallery8, title: "Ergonomic Mixer Tap",      category: "Taps, Faucets & Accessories" },
];

const milestones = [
  { year: "2022", text: "First Manufacturer in INDIA to introduce Pushfit – PLUMTEK FASTFIT" },
  { year: "2020", text: "Started Manufacturing MDPE pipes & Fittings" },
  { year: "2019", text: "Incorporated as Euroaqua Plumtek Private Limited" },
  { year: "2016", text: "Started Operation in SRILANKA" },
  { year: "2015", text: "Brand PLUMTEK started manufacturing TAPS & VALVES" },
  { year: "2013", text: "Started overseas Production – Uganda, Africa" },
  { year: "2011", text: "Started Manufacturing PVC braided hose" },
  { year: "2008", text: "Started Manufacturing PPR pipe fittings" },
  { year: "2004", text: "South India's first company for PPR pipe" },
  { year: "2002", text: "Manufactured PVC Suction & Garden hose" },
  { year: "1998", text: "Started Sakkthi Polymers" },
];

const values = [
  { title: "Quality",     desc: "Every product is engineered to exceed expectations – quality is in the essence of Euroaqua Plumtek.",        Icon: Award,    accent: "from-amber-500 to-orange-400",  bg: "bg-amber-50",  color: "text-amber-600" },
  { title: "Bonding",     desc: "25+ years of trust. Our relationships with partners and customers are our greatest asset.",                  Icon: Users,    accent: "from-blue-500 to-cyan-400",    bg: "bg-blue-50",   color: "text-blue-600"  },
  { title: "Dedication",  desc: "Committed to the growing plumbing industry, expanding our range to meet every project's demands.",           Icon: Target,   accent: "from-emerald-500 to-teal-400", bg: "bg-emerald-50", color: "text-emerald-600"},
  { title: "Innovation",  desc: "Pioneering solutions that work at all temperatures and environments – built for tomorrow's challenges.",     Icon: Lightbulb,accent: "from-purple-500 to-violet-400",bg: "bg-purple-50",  color: "text-purple-600"},
];

const TABS = ["view all", "Taps, Faucets & Accessories", "PPR, PP-RCT Pipes", "PPR Fittings", "PERT & Push Fittings", "HDPE & MDPE Fittings", "Hoses"];

const fade = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const About = () => {
  const [activeTab, setActiveTab] = useState("view all");
  const filtered = galleryItems.filter(i => activeTab === "view all" || i.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] bg-slate-950 flex items-end overflow-hidden">
        {/* Background images */}
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative overflow-hidden">
            <img src={hero1} alt="Plumtek project" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="relative overflow-hidden">
            <img src={hero2} alt="Plumtek solutions" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
        </div>

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 container-pipes pb-20 pt-40">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.22em] mb-6">
              Who We Are
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-8 max-w-3xl">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Water</span> Excellence Since 1998
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-10">
              Euroaqua Plumtek — India's trusted name in industrial plumbing, delivering quality solutions that honor the belief: <span className="text-white font-semibold italic">"Every Drop Counts."</span>
            </p>
            <div className="flex flex-wrap gap-4">
              {[{ v: "25+", l: "Years" }, { v: "1M+", l: "Customers" }, { v: "18+", l: "Branches" }, { v: "ISO", l: "Certified" }].map(s => (
                <div key={s.l} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center min-w-[90px]">
                  <p className="text-2xl font-black text-white">{s.v}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{s.l}</p>
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
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-5">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                From a Small Venture to <span className="text-blue-600">Industry Leader</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                Established in 1998, Euroaqua Plumtek began with a simple yet powerful vision — provide plumbing solutions that are both elegant and economical. Over 25 years, that vision has grown into one of India's most trusted names in the industry.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Today, we operate across 18+ branches, serve markets in Sri Lanka and Africa, and continue to pioneer innovations like India's first Pushfit system — PLUMTEK FASTFIT.
              </p>
              <div className="space-y-3">
                {["ISO Certified Manufacturing", "South India's First PPR Pipe Company", "First Indian Manufacturer of Pushfit Technology"].map(pt => (
                  <div key={pt} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[{ v: "492+", l: "Products", sub: "In our catalog" }, { v: "25+", l: "Years", sub: "Of experience" }, { v: "18+", l: "Branches", sub: "Pan India" }, { v: "1M+", l: "Customers", sub: "Served globally" }].map((s, i) => (
                <motion.div key={s.l} variants={fade} className={`rounded-3xl p-8 ${i === 0 ? "bg-blue-600 text-white" : i === 3 ? "bg-slate-900 text-white" : "bg-slate-50"}`}>
                  <p className={`text-4xl font-black mb-1 ${i === 0 || i === 3 ? "text-white" : "text-slate-900"}`}>{s.v}</p>
                  <p className={`font-bold text-sm uppercase tracking-wider mb-1 ${i === 0 ? "text-blue-200" : i === 3 ? "text-slate-400" : "text-slate-700"}`}>{s.l}</p>
                  <p className={`text-xs ${i === 0 ? "text-blue-300" : i === 3 ? "text-slate-500" : "text-slate-400"}`}>{s.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-28 bg-slate-950 overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-700/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container-pipes relative z-10">
          {/* Header */}
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-6">Our Legacy</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
              Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Milestones</span>
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-base">25+ years of growth, innovation, and industry firsts.</p>
          </motion.div>

          {/* Vertical alternating timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Centre spine */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent hidden md:block" />

            <div className="space-y-10">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.05 }}
                    viewport={{ once: true, margin: "-60px" }}
                    className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Card — takes 45% width on md+ */}
                    <div className={`w-full md:w-[45%] group ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                      <div className="relative bg-white/4 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/8 hover:border-blue-500/40 transition-all duration-400 overflow-hidden">
                        {/* Top gradient on hover */}
                        <div className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

                        {/* Year badge */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl md:text-4xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 leading-none">
                            {m.year}
                          </span>
                          {i === 0 && (
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              Latest
                            </span>
                          )}
                          {i === milestones.length - 1 && (
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Founded
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed">{m.text}</p>
                      </div>
                    </div>

                    {/* Centre dot — hidden on mobile */}
                    <div className="hidden md:flex w-[10%] justify-center relative z-10">
                      <div className="w-5 h-5 rounded-full bg-blue-500 border-4 border-slate-950 shadow-[0_0_20px_rgba(59,130,246,0.7)] group-hover:scale-125 transition-transform duration-300" />
                    </div>

                    {/* Year echo — decorative large number on opposite side */}
                    <div className={`hidden md:flex w-[45%] items-center ${isLeft ? "pl-10" : "pr-10 justify-end"}`}>
                      <span className="text-[72px] font-black text-white/4 tabular-nums leading-none select-none pointer-events-none">
                        {m.year}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES BENTO ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-pipes">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-5">Core Values</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">What We Stand For</h2>
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
                <h4 className="font-black text-xl text-slate-900 mb-3">{v.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/80 hidden md:block" />
              <div className="absolute bottom-6 left-6 md:hidden bg-slate-950/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="font-bold text-white">Managing Director</p>
                <p className="text-blue-400 text-sm">Euroaqua Plumtek</p>
              </div>
            </div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }} viewport={{ once: true }}
              className="p-10 md:p-14 flex flex-col justify-center"
            >
              <span className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Leadership</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">Managing Director</h2>
              <p className="text-blue-400 font-semibold mb-6">Euroaqua Plumtek Pvt. Ltd.</p>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                Under visionary leadership, Euroaqua Plumtek has grown from a regional manufacturer to an international brand present in India, Sri Lanka, and Africa — built on a foundation of quality, innovation, and unwavering customer trust.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Vision", value: "Quality & Innovation" }, { label: "Experience", value: "25+ Years" }].map(item => (
                  <div key={item.label} className="bg-white/5 border border-white/8 rounded-2xl p-5">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
                    <p className="text-white font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-pipes">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-5">Our Gallery</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Catalogue 2026</h2>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                {tab === "view all" ? "All Products" : tab}
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
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-wider mb-1">{item.category}</p>
                    <p className="text-white font-bold leading-tight">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-20 bg-blue-600">
        <div className="container-pipes text-center">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Ready to Work With Us?</h2>
            <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">Explore our full range of industrial plumbing solutions or get in touch with our team.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/shop" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-xl shadow-blue-700/30">
                Browse Products <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
                Contact Us
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
