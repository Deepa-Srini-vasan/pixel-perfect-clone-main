import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Shield,
  Thermometer,
  Award,
  Package,
  Droplets,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";
import plumtekBg from "@/assets/3d-assets/plumtek-bg.png";
import faucetImg from "@/assets/3d-assets/shower.png";
import tapImg from "@/assets/3d-assets/tap.png";
import pipeImg from "@/assets/3d-assets/pipe_set.png";
import valveImg from "@/assets/3d-assets/valve.png";

const popularProducts = [
  {
    id: "1",
    name: "CPVC Brass Female Elbow",
    category: "FITTINGS",
    badge: "NEW",
    isHighlighted: false,
    rating: 5.0,
    desc: "Heavy-duty brass threaded elbow designed for zero-leak jointing.",
    image: faucetImg,
    slug: "cpvc-brass-female-elbow",
    features: [
      { icon: ShieldCheck, text: "High Pressure" },
      { icon: Droplets, text: "Zero Leak" },
      { icon: Award, text: "Lead Free" },
    ],
  },
  {
    id: "2",
    name: "Wall Mixer Vibrant",
    category: "TAPS & FIXTURES",
    badge: "POPULAR",
    isHighlighted: false,
    rating: 4.9,
    desc: "Sleek design with smooth operation and long life.",
    image: tapImg,
    slug: "wall-mixer-vibrant",
    features: [
      { icon: ShieldCheck, text: "Brass Body" },
      { icon: Sparkles, text: "Chrome Finish" },
      { icon: Shield, text: "Rust Proof" },
    ],
  },
  {
    id: "3",
    name: "CPVC Hot Water Pipe",
    category: "PIPES",
    badge: "BEST SELLER",
    isHighlighted: true,
    rating: 4.8,
    desc: "Engineered for high temperature and chemical resistance.",
    image: pipeImg,
    slug: "cpvc-hot-water-pipe",
    features: [
      { icon: Thermometer, text: "High Temp" },
      { icon: ShieldCheck, text: "Corrosion Proof" },
      { icon: Award, text: "ISO Certified" },
    ],
  },
  {
    id: "4",
    name: "Brass Ball Valve",
    category: "VALVES",
    rating: 4.7,
    desc: "Durable, leak-proof valves for residential & industrial use.",
    image: valveImg,
    slug: "brass-ball-valve",
    features: [
      { icon: Package, text: "Heavy Duty" },
      { icon: Droplets, text: "Leak Proof" },
      { icon: Clock, text: "Long Lasting" },
    ],
  },
];

const PopularProducts = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? popularProducts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % popularProducts.length);
  };

  return (
    <section
      className="py-10 sm:py-16 lg:py-24 relative overflow-hidden text-left bg-slate-950 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${plumtekBg})` }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-12"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <span className="text-cyan-400 tracking-widest text-[9px] sm:text-[10px]">• • •</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">
              CURATED CHOICE
            </span>
            <span className="text-cyan-400 tracking-widest text-[9px] sm:text-[10px]">• • •</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-[54px] font-black text-white tracking-tight leading-tight mb-2">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300">Products</span>
          </h2>

          {/* Underline accent */}
          <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-3" />

          {/* Subtitle */}
          <p className="mt-2 text-slate-300/90 text-xs sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Engineered for performance. Trusted by professionals.<br className="hidden sm:block" />
            Explore our most in-demand plumbing solutions.
          </p>
        </motion.div>

        {/* ── Carousel Wrapper with Arrow Controls ── */}
        <div className="relative flex items-center justify-center gap-4">

          {/* Previous Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous product"
            className="hidden md:flex w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 shrink-0 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 4 White Product Cards Grid - 2 Columns on Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full">
            {popularProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl sm:rounded-[24px] p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden bg-white text-left transition-all duration-300 shadow-md hover:shadow-xl ${
                  product.isHighlighted
                    ? "border-2 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                    : "border border-slate-100"
                }`}
              >
                {/* Best Seller Ribbon Tag */}
                {product.badge === "BEST SELLER" && (
                  <div className="absolute -right-10 top-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-[8px] sm:text-[9px] uppercase tracking-wider py-1 px-10 rotate-45 shadow-sm pointer-events-none z-30">
                    BEST SELLER
                  </div>
                )}

                <div>
                  {/* Top Product Image Preview Box */}
                  <div className="bg-gradient-to-b from-blue-100/60 via-blue-50/40 to-slate-50 border border-blue-100/80 rounded-xl sm:rounded-[20px] h-32 sm:h-48 md:h-52 flex items-center justify-center p-2.5 sm:p-4 relative overflow-hidden mb-2 sm:mb-4 group-hover:from-blue-100/80 transition-all duration-300">
                    
                    {/* Category Pill Tag */}
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-blue-600 text-white font-bold text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs z-10 truncate max-w-[80%]">
                      {product.category}
                    </span>

                    {/* New Tag Pill */}
                    {product.badge === "NEW" && (
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-emerald-500 text-white font-bold text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full z-10">
                        NEW
                      </span>
                    )}

                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500 relative z-10"
                    />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 mb-1.5 sm:mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-blue-500 text-blue-500"
                      />
                    ))}
                  </div>

                  {/* Product Title */}
                  <h3 className="font-black text-slate-900 text-xs sm:text-lg mb-1 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-[12px] sm:text-[12.5px] leading-relaxed font-medium mb-4 hidden sm:block">
                    {product.desc}
                  </p>

                  {/* 3 Bottom Feature Icons Row */}
                  <div className="hidden sm:grid grid-cols-3 gap-2 mb-6 pt-3 border-t border-slate-100">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <feat.icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 leading-tight">
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Explore Button */}
                <Link
                  to={`/product/${product.slug}`}
                  className={`w-full font-extrabold text-[10px] sm:text-[12px] py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 shadow-xs sm:shadow-md group/btn ${
                    product.isHighlighted
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-[#0b1d3d] hover:bg-blue-600 text-white"
                  }`}
                >
                  <span className="truncate">Explore Product</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next product"
            className="hidden md:flex w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 shrink-0 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Products CTA Link */}
        <div className="text-center mt-6 sm:mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors group"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
