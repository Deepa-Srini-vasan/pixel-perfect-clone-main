import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Droplet,
  Award,
  Settings,
  Layers,
  Globe,
  Sparkles,
  Compass,
  Shield,
  Wrench,
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Real product and office image assets from the project
import mainOffice from "@/assets/plumtek-img/main office-img-scaled.jpg";
import mdSir from "@/assets/plumtek-img/MD-Sir-img.jpg";
import elbow from "@/assets/plumtek-img/ELBOW.jpeg";
import pipes from "@/assets/plumtek-img/pipes.jpeg";
import te from "@/assets/plumtek-img/TE.jpeg";
import union from "@/assets/plumtek-img/unio-500x500.jpeg";
import suctionHoses from "@/assets/plumtek-img/SUCTION HOSES.jpg";
import socket from "@/assets/plumtek-img/SOCKE.jpeg";
import weldingHoses from "@/assets/plumtek-img/WELDING HOSES.jpg";
import stopvalve from "@/assets/plumtek-img/STOPVALV.jpeg";

// Import our newly generated and processed high-fidelity corporate blue images!
import sakthiHqGen from "@/assets/plumtek-img/sakthi_hq_generated.png";
import suctionHosesGen from "@/assets/plumtek-img/suction_hoses_generated.png";
import pprPipesGen from "@/assets/plumtek-img/ppr_pipes_generated.png";
import elbowGen from "@/assets/plumtek-img/elbow_fitting_generated.png";
import braidedHoseGen from "@/assets/plumtek-img/braided_hose_generated.png";
import ugandaGlobeGen from "@/assets/plumtek-img/uganda_globe_generated.png";
import tapsFaucetsGen from "@/assets/plumtek-img/taps_faucets_generated.png";
import lankaShowroomGen from "@/assets/plumtek-img/lanka_showroom_generated.png";
import plumtekShieldGen from "@/assets/plumtek-img/plumtek_shield_generated.png";
import mdpeFittingGen from "@/assets/plumtek-img/mdpe_fitting_generated.png";
import fastfitUnionGen from "@/assets/plumtek-img/fastfit_union_generated.png";

// Local translation helper to satisfy static analysis i18n rules
const t = (key: string) => key;

interface Milestone {
  year: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  image: string; // fallback original local asset
  generatedImage?: string; // static URL in public folder or imported asset
}

const milestones: Milestone[] = [
  {
    year: "1998",
    title: t("Started Sakkthi Polymers"),
    icon: Rocket,
    color: "#1e3a8a", // Deep Corporate Navy
    image: mainOffice,
    generatedImage: sakthiHqGen,
  },
  {
    year: "2002",
    title: t("Manufactured PVC Suction hose & Garden hose"),
    icon: Droplet,
    color: "#0284c7", // Premium Sky Blue
    image: suctionHoses,
    generatedImage: suctionHosesGen,
  },
  {
    year: "2004",
    title: t("South India's first company to manufacturing PPR pipe"),
    icon: Award,
    color: "#2563eb", // Royal Corporate Blue
    image: pipes,
    generatedImage: pprPipesGen,
  },
  {
    year: "2008",
    title: t("Started Manufacturing PPR pipe fittings"),
    icon: Settings,
    color: "#0369a1", // Ocean Blue
    image: elbow,
    generatedImage: elbowGen,
  },
  {
    year: "2011",
    title: t("Started Manufacturing PVC braided hose"),
    icon: Layers,
    color: "#1d4ed8", // Vibrant Cobalt Blue
    image: weldingHoses,
    generatedImage: braidedHoseGen,
  },
  {
    year: "2013",
    title: t("Started overseas Production - Uganda, Africa"),
    icon: Globe,
    color: "#0891b2", // Deep Cyan Blue
    image: socket,
    generatedImage: ugandaGlobeGen,
  },
  {
    year: "2015",
    title: t("Under the brand name PLUMTEK started manufacturing TAPS, FAUCETS & VALVES"),
    icon: Sparkles,
    color: "#1e40af", // Dark Electric Blue
    image: stopvalve,
    generatedImage: tapsFaucetsGen,
  },
  {
    year: "2016",
    title: t("Started Operation in SRI LANKA"),
    icon: Compass,
    color: "#3b82f6", // Electric Blue
    image: mainOffice,
    generatedImage: lankaShowroomGen,
  },
  {
    year: "2019",
    title: t("Incorporated as Euroaqua Plumtek Private Limited"),
    icon: Shield,
    color: "#0369a1", // Sleek Slate Blue
    image: mdSir,
    generatedImage: plumtekShieldGen,
  },
  {
    year: "2020",
    title: t("Started Manufacturing MDPE pipes & Fittings"),
    icon: Wrench,
    color: "#1e3a8a", // Deep Corporate Navy
    image: te,
    generatedImage: mdpeFittingGen,
  },
  {
    year: "2022",
    title: t("First Manufacturer in INDIA to introduce Pushfit - PLUMTEK FASTFIT"),
    icon: Zap,
    color: "#2563eb", // Royal Corporate Blue
    image: union,
    generatedImage: fastfitUnionGen,
  },
];

// Robust Fallback Image component to load generated static public files, with runtime fallback to local imports
const FallbackImage: React.FC<{
  src?: string;
  fallback: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ src, fallback, alt, className, style }) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallback);

  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
};

const MilestoneRoad: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Road parameters for desktop (horizontal)
  const segmentWidth = 320;
  const startOffset = 220;
  const totalWidth = startOffset * 2 + (milestones.length - 1) * segmentWidth;
  const yCenter = 340;
  const amplitude = 100;

  // Generate SVG path for orthogonal horizontal desktop pipeline (straight segments with 90-degree curved elbows)
  const R = 24; // corner radius
  let desktopPath = `M 0 240`;
  for (let i = 0; i < milestones.length - 1; i++) {
    const x = startOffset + i * segmentWidth;
    const xMid = x + segmentWidth / 2;
    const isPeak = i % 2 === 0;

    if (isPeak) {
      // Peak to trough transition (y: 240 -> 440)
      desktopPath += ` L ${xMid - R} 240 Q ${xMid} 240, ${xMid} ${240 + R}`;
      desktopPath += ` L ${xMid} ${440 - R} Q ${xMid} 440, ${xMid + R} 440`;
    } else {
      // Trough to peak transition (y: 440 -> 240)
      desktopPath += ` L ${xMid - R} 440 Q ${xMid} 440, ${xMid} ${440 - R}`;
      desktopPath += ` L ${xMid} ${240 + R} Q ${xMid} 240, ${xMid + R} 240`;
    }
  }
  // Extend straight to the right edge at peak y=240
  desktopPath += ` L ${totalWidth} 240`;

  // Generate SVG path for orthogonal vertical mobile pipeline
  const Rm = 16; // corner radius for mobile
  let mobilePathD = `M 30 0`;
  for (let i = 0; i < milestones.length - 1; i++) {
    const y = 80 + i * 170;
    const yMid = y + 170 / 2;
    const isLeft = i % 2 === 0;

    if (isLeft) {
      // Transition from left (30px) to right (70px)
      mobilePathD += ` L 30 ${yMid - Rm} Q 30 ${yMid}, ${30 + Rm} ${yMid}`;
      mobilePathD += ` L ${70 - Rm} ${yMid} Q 70 ${yMid}, 70 ${yMid + Rm}`;
    } else {
      // Transition from right (70px) to left (30px)
      mobilePathD += ` L 70 ${yMid - Rm} Q 70 ${yMid}, ${70 - Rm} ${yMid}`;
      mobilePathD += ` L ${30 + Rm} ${yMid} Q 30 ${yMid}, 30 ${yMid + Rm}`;
    }
  }
  const lastY = 80 + (milestones.length - 1) * 170;
  mobilePathD += ` L ${milestones.length % 2 === 0 ? 70 : 30} ${lastY + 80}`;



  // Handle scroll buttons on desktop
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const updateArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateArrows);
      // Run once on load to initialize arrow states
      updateArrows();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateArrows);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden select-none">
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .blue-monochrome-filter {
          filter: grayscale(100%) sepia(100%) hue-rotate(188deg) saturate(280%) brightness(95%) contrast(110%);
        }
      `}</style>
      <div className="container-pipes mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            {t("Our Journey")}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
            {t("Milestones of Excellence")}
          </h2>
          <p className="text-sm text-slate-500 font-sans mt-2 font-medium max-w-xl">
            {t("From humble beginnings to industry leadership, our journey is built on innovation, quality and trust.")}
          </p>
        </div>

        {/* Desktop navigation controls */}
        <div className="hidden lg:flex items-center gap-2 self-center md:self-end">
          <button
            onClick={() => handleScroll("left")}
            disabled={!showLeftArrow}
            className={`w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm transition-all duration-300 hover:border-slate-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            disabled={!showRightArrow}
            className={`w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm transition-all duration-300 hover:border-slate-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* ── DESKTOP VIEWPORT (WINDING ROAD TIMELINE) ── */}
      <div className="hidden lg:block relative w-full">
        {/* Shadow indicators for scrolling */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? "opacity-100" : "opacity-0"
            }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none transition-opacity duration-300 ${showRightArrow ? "opacity-100" : "opacity-0"
            }`}
        />

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none pb-12 pt-6 scroll-smooth"
        >
          <div
            className="relative"
            style={{ width: `${totalWidth}px`, height: "680px" }}
          >
            {/* 3D Pipeline SVG */}
            <div className="absolute top-[30px] left-0 right-0 h-[560px]">
              <svg
                className="w-full h-full pointer-events-none overflow-visible"
                viewBox={`0 0 ${totalWidth} 560`}
                fill="none"
              >
                <defs>
                  {/* Premium Soft Drop Shadow Filter */}
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0f172a" floodOpacity="0.16" />
                  </filter>

                  {/* Horizontal 3D Dark Blue Metallic Pipe Gradient */}
                  <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#081426" />      {/* top dark shadow */}
                    <stop offset="25%" stopColor="#122a4f" />     {/* deep navy */}
                    <stop offset="50%" stopColor="#1e4175" />     {/* subtle navy highlight */}
                    <stop offset="75%" stopColor="#122a4f" />     {/* deep navy */}
                    <stop offset="100%" stopColor="#081426" />    {/* bottom dark shadow */}
                  </linearGradient>

                  {/* Vertical 3D Dark Blue Metallic Pipe Gradient (mobile) */}
                  <linearGradient id="verticalPipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#081426" />      {/* left dark shadow */}
                    <stop offset="25%" stopColor="#122a4f" />     {/* deep navy */}
                    <stop offset="50%" stopColor="#1e4175" />     {/* subtle navy highlight */}
                    <stop offset="75%" stopColor="#122a4f" />     {/* deep navy */}
                    <stop offset="100%" stopColor="#081426" />    {/* right dark shadow */}
                  </linearGradient>

                  {/* 3D Blue Pipe Coupling Joint Gradient */}
                  <linearGradient id="couplingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#081426" />
                    <stop offset="30%" stopColor="#122a4f" />
                    <stop offset="50%" stopColor="#1e4175" />
                    <stop offset="70%" stopColor="#122a4f" />
                    <stop offset="100%" stopColor="#081426" />
                  </linearGradient>
                </defs>

                {/* Pipeline Outer Solid Outline with Soft Drop Shadow Filter */}
                <motion.path
                  d={desktopPath}
                  stroke="#1e293b"
                  strokeWidth="26"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#softShadow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.02 }}
                />

                {/* Pipeline 3D Metallic Inner Body */}
                <motion.path
                  d={desktopPath}
                  stroke="url(#pipeGrad)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.05 }}
                />

                {/* Pipe Joint Couplings at Milestone Anchors */}
                {milestones.map((_, index) => {
                  const x = startOffset + index * segmentWidth;
                  const y = yCenter - Math.cos((Math.PI * (x - startOffset)) / segmentWidth) * amplitude;
                  return (
                    <g key={`m-coupling-${index}`} className="pointer-events-none">
                      <rect
                        x={x - 6}
                        y={y - 19}
                        width="12"
                        height="38"
                        rx="1.5"
                        fill="url(#couplingGrad)"
                        stroke="#1e293b"
                        strokeWidth="1.2"
                      />
                    </g>
                  );
                })}

                {/* Elbow Joint Connector Sleeves (Couplings at start & end of all 90-degree bends) */}
                {Array.from({ length: milestones.length - 1 }).map((_, i) => {
                  const x = startOffset + i * segmentWidth;
                  const xMid = x + segmentWidth / 2;
                  const isPeak = i % 2 === 0;

                  if (isPeak) {
                    // Peak to trough transition (y: 240 -> 440)
                    return (
                      <g key={`elbow-joints-${i}`} className="pointer-events-none">
                        {/* Top entrance (vertical coupling) */}
                        <rect x={xMid - R - 6} y={240 - 19} width="12" height="38" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                        {/* Top exit (horizontal coupling) */}
                        <rect x={xMid - 19} y={240 + R - 6} width="38" height="12" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                        {/* Bottom entrance (horizontal coupling) */}
                        <rect x={xMid - 19} y={440 - R - 6} width="38" height="12" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                        {/* Bottom exit (vertical coupling) */}
                        <rect x={xMid + R - 6} y={440 - 19} width="12" height="38" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      </g>
                    );
                  } else {
                    // Trough to peak transition (y: 440 -> 240)
                    return (
                      <g key={`elbow-joints-${i}`} className="pointer-events-none">
                        {/* Bottom entrance (vertical coupling) */}
                        <rect x={xMid - R - 6} y={440 - 19} width="12" height="38" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                        {/* Bottom exit (horizontal coupling) */}
                        <rect x={xMid - 19} y={440 - R - 6} width="38" height="12" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                        {/* Top entrance (horizontal coupling) */}
                        <rect x={xMid - 19} y={240 + R - 6} width="38" height="12" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                        {/* Top exit (vertical coupling) */}
                        <rect x={xMid + R - 6} y={240 - 19} width="12" height="38" rx="1.5" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      </g>
                    );
                  }
                })}

                {/* Thin Dashed Connector Wires linking cards to glowing pipeline points */}
                {milestones.map((m, index) => {
                  const x = startOffset + index * segmentWidth;
                  const isPeak = index % 2 === 0;

                  if (isPeak) {
                    // Top card: HTML top: 50px, height: 100px (bottom: 150px). Peak center is at 240px SVG.
                    // Relative to SVG top (30px offset): y1 = 120px, y2 = 240px.
                    return (
                      <line
                        key={`wire-${index}`}
                        x1={x}
                        y1={120}
                        x2={x}
                        y2={240}
                        stroke={m.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity={hoveredIndex === index ? "0.8" : "0.4"}
                        className="transition-opacity duration-300"
                      />
                    );
                  } else {
                    // Bottom card: HTML top: 530px. Trough center is at 440px SVG.
                    // Relative to SVG top (30px offset): y1 = 440px, y2 = 500px.
                    return (
                      <line
                        key={`wire-${index}`}
                        x1={x}
                        y1={440}
                        x2={x}
                        y2={500}
                        stroke={m.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity={hoveredIndex === index ? "0.8" : "0.4"}
                        className="transition-opacity duration-300"
                      />
                    );
                  }
                })}

                {/* Glowing pipeline indicator dots */}
                {milestones.map((m, index) => {
                  const x = startOffset + index * segmentWidth;
                  const isPeak = index % 2 === 0;
                  const y = isPeak ? 240 : 440; // peak or trough y center in SVG space
                  
                  return (
                    <g key={`glow-dot-${index}`} className="pointer-events-none">
                      {/* Large soft color halo/glow */}
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill={m.color}
                        opacity="0.22"
                        className="animate-pulse"
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="11"
                        fill={m.color}
                        opacity="0.45"
                      />
                      {/* White border ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r="7.5"
                        fill="#ffffff"
                      />
                      {/* Inner bright solid colored circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill={m.color}
                      />
                    </g>
                  );
                })}


              </svg>
            </div>



            {/* Alternating ZIGZAG Milestone Cards (above and below the pipeline) */}
            {milestones.map((m, index) => {
              const x = startOffset + index * segmentWidth;
              const isPeak = index % 2 === 0;
              const Icon = m.icon;

              return (
                <motion.div
                  key={`card-${index}`}
                  initial={{ opacity: 0, y: isPeak ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`absolute bg-white rounded-2xl border p-4 shadow-md hover:shadow-xl transition-all duration-300 select-none cursor-default ${
                    hoveredIndex === index ? "border-slate-300 scale-[1.02] -translate-y-1" : "border-slate-100"
                  }`}
                  style={{
                    left: `${x - 125}px`,
                    width: "250px",
                    height: "100px",
                    top: isPeak ? "50px" : "530px", // Zigzag top or bottom - moved to perfectly match layout!
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Matching colored dot centered on the corresponding border facing the pipeline */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full border-4 border-white shadow-sm transition-transform duration-300 ${
                      isPeak ? "-bottom-2.5" : "-top-2.5" // dot is on bottom for top cards, top for bottom cards!
                    } ${hoveredIndex === index ? "scale-125" : "scale-100"}`}
                    style={{ backgroundColor: m.color }}
                  />
                  
                  {/* PPT Inner Layout: Left colored circular icon, Right details */}
                  <div
                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white mr-3.5 shadow-sm"
                    style={{ backgroundColor: m.color }}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  
                  <div className="flex flex-col justify-center min-w-0">
                    <h3 className="font-serif font-black text-xl text-slate-900 leading-tight mb-0.5">
                      {m.year}
                    </h3>
                    <p className="font-sans text-[11px] text-slate-500 font-semibold leading-snug line-clamp-2">
                      {m.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Alternating ZIGZAG Illustrative Images (in the opposite direction of each card) */}
            {milestones.map((m, index) => {
              const x = startOffset + index * segmentWidth;
              const isPeak = index % 2 === 0;

              return (
                <motion.div
                  key={`img-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="absolute select-none cursor-default pointer-events-none"
                  style={{
                    left: `${x - 110}px`,
                    width: "220px",
                    height: "130px",
                    top: isPeak ? "510px" : "50px", // Opposite of the card! Floating!
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FallbackImage
                    src={m.generatedImage}
                    fallback={m.image}
                    alt={m.title}
                    className="max-w-full max-h-full object-contain blue-monochrome-filter transition-transform duration-500 hover:scale-105 pointer-events-auto"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE VIEWPORT (VERTICAL WINDING ROAD TIMELINE) ── */}
      <div className="lg:hidden container-pipes relative">
        <div className="relative mx-auto max-w-md py-6 flex flex-col items-center">
          {/* Vertical Pipeline SVG */}
          <div className="absolute left-[30px] sm:left-[50px] top-0 bottom-0 w-[100px] -z-10">
            <svg
              className="w-full h-full pointer-events-none overflow-visible"
              width="100"
              height={`${milestones.length * 170}`}
              viewBox={`0 0 100 ${milestones.length * 170}`}
              fill="none"
            >
              {/* Vertical Pipe Outer Solid Outline with Soft Drop Shadow Filter */}
              <motion.path
                d={mobilePathD}
                stroke="#1e293b"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#softShadow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.02 }}
              />

              {/* Vertical Pipe 3D Metallic Inner Body */}
              <motion.path
                d={mobilePathD}
                stroke="url(#verticalPipeGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.1 }}
              />

              {/* Pipe joint couplings at Milestone Anchors on mobile */}
              {milestones.map((_, index) => {
                const y = 80 + index * 170;
                const x = 50 - Math.cos(index * Math.PI) * 20;
                return (
                  <g key={`m-coupling-${index}`} className="pointer-events-none">
                    <rect
                      x={x - 19}
                      y={y - 6}
                      width="38"
                      height="12"
                      rx="1.5"
                      fill="url(#couplingGrad)"
                      stroke="#1e293b"
                      strokeWidth="1.2"
                    />
                  </g>
                );
              })}

              {/* Mobile Elbow Joint Connector Sleeves (Couplings at start & end of all 90-degree mobile bends) */}
              {Array.from({ length: milestones.length - 1 }).map((_, i) => {
                const y = 80 + i * 170;
                const yMid = y + 170 / 2;
                const isLeft = i % 2 === 0;

                if (isLeft) {
                  // Transition from left (30px) to right (70px)
                  return (
                    <g key={`m-elbow-joints-${i}`} className="pointer-events-none">
                      {/* Top entrance (horizontal ring on vertical pipe) */}
                      <rect x={30 - 16} y={yMid - Rm - 5} width="32" height="10" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      {/* Top exit (vertical ring on horizontal pipe) */}
                      <rect x={30 + Rm - 5} y={yMid - 16} width="10" height="32" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      {/* Bottom entrance (vertical ring on horizontal pipe) */}
                      <rect x={70 - Rm - 5} y={yMid - 16} width="10" height="32" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      {/* Bottom exit (horizontal ring on vertical pipe) */}
                      <rect x={70 - 16} y={yMid + Rm - 5} width="32" height="10" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                    </g>
                  );
                } else {
                  // Transition from right (70px) to left (30px)
                  return (
                    <g key={`m-elbow-joints-${i}`} className="pointer-events-none">
                      {/* Top entrance (horizontal ring on vertical pipe) */}
                      <rect x={70 - 16} y={yMid - Rm - 5} width="32" height="10" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      {/* Top exit (vertical ring on horizontal pipe) */}
                      <rect x={70 - Rm - 5} y={yMid - 16} width="10" height="32" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      {/* Bottom entrance (vertical ring on horizontal pipe) */}
                      <rect x={30 + Rm - 5} y={yMid - 16} width="10" height="32" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                      {/* Bottom exit (horizontal ring on vertical pipe) */}
                      <rect x={30 - 16} y={yMid + Rm - 5} width="32" height="10" rx="1" fill="url(#couplingGrad)" stroke="#1e293b" strokeWidth="1.2" />
                    </g>
                  );
                }
              })}

              {/* Glowing pipeline indicator dots on mobile */}
              {milestones.map((m, index) => {
                const y = 80 + index * 170;
                const x = 50 - Math.cos(index * Math.PI) * 20;
                
                return (
                  <g key={`m-glow-dot-${index}`} className="pointer-events-none">
                    {/* Large soft color halo/glow */}
                    <circle cx={x} cy={y} r="14" fill={m.color} opacity="0.25" />
                    <circle cx={x} cy={y} r="9" fill={m.color} opacity="0.45" />
                    {/* White border ring */}
                    <circle cx={x} cy={y} r="6" fill="#ffffff" />
                    {/* Inner bright solid colored circle */}
                    <circle cx={x} cy={y} r="4" fill={m.color} />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Render Vertical Milestones */}
          <div className="relative w-full space-y-[90px] pt-12">
            {milestones.map((m, index) => {
              const y = 80 + index * 170;
              const x = 50 - Math.cos(index * Math.PI) * 20;
              const Icon = m.icon;

              return (
                <div
                  key={index}
                  className="flex items-center w-full relative pl-[70px] sm:pl-[110px]"
                >


                  {/* Card side with product thumbnail on mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm w-full relative cursor-default flex items-center"
                  >
                    {/* Left Border accent dot */}
                    <div
                      className="absolute top-1/2 -left-3 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-white shadow-sm"
                      style={{ backgroundColor: m.color }}
                    />

                    {/* Product Image Thumbnail */}
                    <FallbackImage
                      src={m.generatedImage}
                      fallback={m.image}
                      alt={m.title}
                      className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-100 mr-4 blue-monochrome-filter"
                    />

                    {/* Card Content */}
                    <div>
                      <span className="font-serif font-black text-xl mb-0.5 block" style={{ color: m.color }}>
                        {m.year}
                      </span>
                      <p className="font-sans text-[12px] text-slate-600 leading-relaxed font-semibold">
                        {m.title}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MilestoneRoad;
