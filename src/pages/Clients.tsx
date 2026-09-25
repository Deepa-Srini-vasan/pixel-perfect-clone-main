import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Quote,
  Star,
  Phone,
  ArrowRight,
  Factory,
  Hotel,
  Home,
  Droplets,
  CheckCircle,
  ShieldCheck,
  Users,
  Award,
  Globe,
} from "lucide-react";
import { useState } from "react";
import plumtekBg from "@/assets/3d-assets/plumtek-bg.png";
import bgPlumtekSection02 from "@/assets/3d-assets/bg-plumtek-section-02.png";
import imgVoice from "@/assets/3d-assets/img-voice.png";

/* ─── Static Data ─── */
const clientLogos = [
  { name: "Sree Balaji Enterprises", location: "Salem", segment: "Plumbing Dealers" },
  { name: "Kannan Constructions", location: "Coimbatore", segment: "Builders & Contractors" },
  { name: "Vignesh Sanitary Supplies", location: "Erode", segment: "Sanitary Retail" },
  { name: "Sri Sakthi Engineering", location: "Madurai", segment: "Industrial Projects" },
  { name: "Blue River Infra", location: "Bengaluru", segment: "Infrastructure" },
  { name: "Hari Plumbing Solutions", location: "Tirupur", segment: "Service & Installation" },
  { name: "Priya Constructions", location: "Chennai", segment: "Builders & Contractors" },
  { name: "Vel Kumar Infra", location: "Trichy", segment: "Infrastructure" },
  { name: "Lakshmi Plumbing Co.", location: "Hyderabad", segment: "Plumbing Dealers" },
  { name: "SKM Facilities", location: "Pune", segment: "Facility Management" },
  { name: "Global Infra Ltd.", location: "Mumbai", segment: "Infrastructure" },
  { name: "Kovai Water Tech", location: "Coimbatore", segment: "Water Treatment" },
];

const industries = [
  { icon: Building2, label: "Builders & Contractors", count: 240, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
  { icon: Factory, label: "Industrial Projects", count: 85, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
  { icon: Hotel, label: "Hospitality", count: 62, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  { icon: Home, label: "Residential", count: 500, color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
  { icon: Droplets, label: "Water Treatment", count: 38, color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
];

const testimonials = [
  {
    name: "Ramesh Kumar",
    company: "Kannan Constructions, Coimbatore",
    rating: 5,
    text: "Plumtek's PPR pipes have been our go-to for 8 years. Consistent quality, fast delivery, and the technical support team is always on call. Couldn't ask for more from a supplier.",
  },
  {
    name: "Suresh Babu",
    company: "Sree Balaji Enterprises, Salem",
    rating: 5,
    text: "As a dealer, the margins are fair and the products sell themselves. Customers love the FASTFIT pushfit system — zero callbacks on installation issues.",
  },
  {
    name: "Meena Krishnan",
    company: "Blue River Infra, Bengaluru",
    rating: 5,
    text: "We've used Plumtek on three large infrastructure projects. Their bulk supply capability and consistent product quality across batches is what keeps us coming back.",
  },
  {
    name: "Arjun Selvam",
    company: "Global Infra Ltd., Mumbai",
    rating: 5,
    text: "The CE-certified range gave us confidence to specify Plumtek on export projects. Full documentation support and responsive account management made the process seamless.",
  },
];

const successStories = [
  {
    title: "500-Unit Residential Township",
    client: "Kannan Constructions",
    location: "Coimbatore, Tamil Nadu",
    scope: "Complete PPR pipe & fitting supply for a premium 500-unit residential complex.",
    result: "Project delivered on time with zero rework. 100% leak-free installation verified.",
    tags: ["PPR Pipes", "PPR Fittings", "PERT Push-Fit"],
  },
  {
    title: "5-Star Hotel Plumbing Fit-Out",
    client: "Horizon Hospitality Group",
    location: "Chennai, Tamil Nadu",
    scope: "Premium faucets, valves, and piping for a 280-room luxury hotel project.",
    result: "Zero punch list items on final inspection. Client specified Plumtek for Phase 2 expansion.",
    tags: ["Taps & Faucets", "Valves", "PPR Pipes"],
  },
  {
    title: "Municipal Water Distribution",
    client: "Kovai Water Tech",
    location: "Coimbatore District",
    scope: "HDPE pipes for a 40km rural water distribution project for the municipal corporation.",
    result: "40km pipeline completed in 6 months. Currently serving 12,000+ households.",
    tags: ["HDPE Pipes", "HDPE Fittings"],
  },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-600 fill-slate-600"}`}
        />
      ))}
    </div>
  );
}

const TABS = ["All", "Plumbing Dealers", "Builders & Contractors", "Industrial Projects", "Infrastructure", "Facility Management"];

const Clients = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const filtered = activeTab === "All"
    ? clientLogos
    : clientLogos.filter((c) => c.segment === activeTab);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      <TopBar />
      <Header />

      <main>
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
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-5 sm:w-6 h-[2px] bg-blue-500" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
                  TRUSTED PARTNERS & CLIENTS
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.1] mb-2 sm:mb-3">
                A Growing Network of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                  Trusted Partners
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed font-medium mb-4 sm:mb-6">
                Euroaqua Plumtek serves dealers, builders, contractors, and project managers across India and internationally — backed by 25+ years of reliable supply and expert support.
              </p>

              {/* Stats & CTA Row */}
              <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                {[
                  { icon: ShieldCheck, v: "500+", l: "DEALER PARTNERS" },
                  { icon: MapPin, v: "18+", l: "STATES COVERED" },
                  { icon: Users, v: "1M+", l: "END CUSTOMERS" },
                  { icon: Globe, v: "15+", l: "EXPORT COUNTRIES" },
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

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider py-2 sm:py-2.5 px-5 sm:px-6 rounded-full shadow-md shadow-blue-600/40 border border-blue-400/40 transition-all duration-300 hover:scale-105 group mt-1 sm:mt-0"
                >
                  <span>BECOME A DEALER</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. INDUSTRIES SERVED / INDUSTRY SEGMENTS (ROYAL BLUE GRID) ── */}
        <section className="py-8 sm:py-16 lg:py-24 bg-[#0f2b66] text-left relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <motion.div
              variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-6 sm:mb-16"
            >
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-cyan-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] mb-2 sm:mb-4">
                INDUSTRY SEGMENTS
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Industries We Serve</h2>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6"
            >
              {industries.map((ind) => (
                <motion.div
                  key={ind.label}
                  variants={fade}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl sm:rounded-[24px] p-3.5 sm:p-6 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 text-center group flex flex-col items-center justify-between"
                >
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border ${ind.bg} flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <ind.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${ind.color}`} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-xs sm:text-base leading-tight mb-1">{ind.label}</p>
                    <p className="text-blue-600 font-black text-lg sm:text-2xl mb-0.5">{ind.count}+</p>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Clients</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 3. CLIENT LOGOS GRID / OUR CLIENT BASE (LIGHT BG WITH 3D BG ASSET) ── */}
        <section
          className="py-8 sm:py-16 lg:py-24 relative overflow-hidden text-left bg-white bg-cover bg-right-top bg-no-repeat max-sm:!bg-none"
          style={{ backgroundImage: `url(${bgPlumtekSection02})` }}
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <motion.div
              variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-6 sm:mb-12"
            >
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] mb-2 sm:mb-4">
                OUR CLIENT BASE
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-6">Companies That Trust Us</h2>

              {/* Filter tabs */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-6">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              {filtered.map((client, i) => (
                <motion.div
                  key={client.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group bg-white rounded-2xl sm:rounded-[24px] border border-slate-100 p-3.5 sm:p-6 shadow-xs sm:shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    {/* Initial Badge */}
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm sm:text-xl shadow-xs">
                      {client.name.charAt(0)}
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 truncate max-w-[55%]">
                      {client.segment}
                    </span>
                  </div>

                  <div>
                    <p className="font-black text-slate-900 text-xs sm:text-base leading-snug mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {client.name}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-slate-500 text-[10px] sm:text-xs font-semibold">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{client.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 4. TESTIMONIALS SECTION ── */}
        <section className="py-8 sm:py-16 lg:py-24 bg-gradient-to-b from-[#0a1628] via-[#0d1f42] to-[#050e1d] relative text-white overflow-hidden text-left">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <motion.div
              variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-6 sm:mb-16"
            >
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-cyan-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] mb-2 sm:mb-4">
                CLIENT TESTIMONIALS
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">What Our Clients Say</h2>
            </motion.div>

            {/* Active Testimonial Card */}
            <div className="relative max-w-4xl mx-auto mb-6 sm:mb-12">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 lg:p-12 shadow-xl relative z-10 text-left"
              >
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500/30 absolute top-4 right-4 sm:top-8 sm:right-8" />
                <StarRating rating={testimonials[activeTestimonial].rating} />
                <p className="text-slate-200 text-xs sm:text-lg md:text-xl leading-relaxed mt-3 sm:mt-6 mb-4 sm:mb-8 font-medium italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div>
                  <p className="text-white font-black text-sm sm:text-lg">{testimonials[activeTestimonial].name}</p>
                  <p className="text-cyan-300 text-xs sm:text-sm font-semibold">{testimonials[activeTestimonial].company}</p>
                </div>
              </motion.div>
            </div>

            {/* Testimonial Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTestimonial(i)}
                  className={`text-left rounded-xl sm:rounded-[20px] p-3 sm:p-5 border transition-all duration-300 ${
                    i === activeTestimonial
                      ? "bg-blue-600/30 border-blue-400 text-white shadow-md"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <StarRating rating={t.rating} />
                  <p className="text-[11px] sm:text-xs mt-2 line-clamp-2 font-medium">{t.text}</p>
                  <p className="text-white font-black text-[11px] sm:text-xs mt-2 truncate">{t.name}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. SUCCESS STORIES ── */}
        <section className="py-8 sm:py-16 lg:py-24 bg-white text-left">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <motion.div
              variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-6 sm:mb-16"
            >
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] mb-2 sm:mb-4">
                SUCCESS STORIES
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Projects We're Proud Of</h2>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-4 sm:gap-8"
            >
              {successStories.map((story) => (
                <motion.div
                  key={story.title}
                  variants={fade}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl sm:rounded-[28px] border border-slate-100 shadow-md hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-600 to-cyan-400" />
                    <div className="p-4 sm:p-8">
                      <div className="flex items-center gap-2 mb-2 sm:mb-4">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-600">{story.client}</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-base sm:text-xl leading-tight mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">{story.title}</h3>
                      <div className="flex items-center gap-1.5 mb-3 sm:mb-4 text-slate-500 text-xs sm:text-sm font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        <span>{story.location}</span>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-medium">{story.scope}</p>
                      
                      <div className="flex items-start gap-2.5 sm:gap-3 bg-emerald-50 border border-emerald-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-emerald-800 text-[11px] sm:text-xs font-bold leading-relaxed">{story.result}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 sm:px-8 sm:pb-8 flex flex-wrap gap-1.5 sm:gap-2">
                    {story.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-extrabold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 6. BECOME A DEALER CTA ── */}
        <section className="py-24 bg-slate-50 text-left">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-gradient-to-r from-[#0f2b66] via-[#12337a] to-[#0a1c42] rounded-[32px] p-10 md:p-16 grid md:grid-cols-[1fr_auto] gap-10 items-center shadow-2xl border border-white/10 text-white"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-[11px] font-black uppercase tracking-[0.22em] mb-5">
                  PARTNER WITH US
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                  Become an Authorised Dealer
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                  Join 500+ dealers across India. Competitive margins, marketing support, technical training, and priority inventory allocation.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  {["Attractive margins", "Marketing support", "Technical training", "Dedicated account manager"].map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                >
                  <span>Dealer Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/6379665268?text=${encodeURIComponent("Hi, I'm interested in becoming an authorised dealer for Euro Plumber Tech (Plumtek).")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Clients;
