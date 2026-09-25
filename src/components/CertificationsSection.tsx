import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import MascotGreeting from "@/assets/3d-assets/mascot_cert_download_hd.png";
import isoLogo from "@/assets/3d-assets/iso.png";
import bisLogo from "@/assets/3d-assets/bureau-of-indian-standards-bis-logo-png_seeklogo-676929.png";
import ceLogo from "@/assets/3d-assets/ce-seeklogo.png";
import wrasLogo from "@/assets/3d-assets/wras-water-regulations-advisory-scheme-seeklogo.png";

import clientBg from "@/assets/3d-assets/bg-2.png";

const certs = [
  {
    code: "ISO 9001",
    title: "Quality Management",
    body: "Certified Quality Management System ensuring consistent product standards at every stage.",
    logo: isoLogo,
    year: "2001",
    colorClass: "text-blue-600",
    lightBg: "bg-blue-50",
    borderClass: "border-blue-100",
    hoverBorder: "hover:border-blue-400",
    glowColor: "rgba(37,99,235,0.12)",
    ribbonText: "Quality System",
    accent: "#2563EB",
    ribbonBg: "bg-blue-50",
  },
  {
    code: "BIS Certified",
    title: "Bureau of Indian Standards",
    body: "Products certified under BIS for compliance with national safety and quality norms.",
    logo: bisLogo,
    year: "2005",
    colorClass: "text-blue-600",
    lightBg: "bg-blue-50",
    borderClass: "border-blue-100",
    hoverBorder: "hover:border-blue-400",
    glowColor: "rgba(37,99,235,0.12)",
    ribbonText: "Safety Assured",
    accent: "#2563EB",
    ribbonBg: "bg-blue-50",
  },
  {
    code: "CE Marking",
    title: "European Conformity",
    body: "Export-ready products meeting European Union safety, health, and environmental standards.",
    logo: ceLogo,
    year: "2014",
    colorClass: "text-blue-600",
    lightBg: "bg-blue-50",
    borderClass: "border-blue-100",
    hoverBorder: "hover:border-blue-400",
    glowColor: "rgba(37,99,235,0.12)",
    ribbonText: "EU Compliant",
    accent: "#2563EB",
    ribbonBg: "bg-blue-50",
  },
  {
    code: "WRAS Approved",
    title: "Water Regulations Approval",
    body: "Fittings approved under UK Water Regulations Advisory Scheme for safe water supply.",
    logo: wrasLogo,
    year: "2018",
    colorClass: "text-blue-600",
    lightBg: "bg-blue-50",
    borderClass: "border-blue-100",
    hoverBorder: "hover:border-blue-400",
    glowColor: "rgba(37,99,235,0.12)",
    ribbonText: "Water Safety",
    accent: "#2563EB",
    ribbonBg: "bg-blue-50",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-10 sm:py-16 lg:py-24 relative overflow-hidden text-left">
      {/* Background image matching the section above */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${clientBg})` }}
      />
      {/* Subtle white overlay for text legibility */}
      <div className="absolute inset-0 bg-white/30" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-blue-400/50 bg-white/80 backdrop-blur-sm text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3 sm:mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Certifications
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-tight">
            Quality You Can <span className="text-blue-600 relative">
              Trust
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-blue-600/50 rounded-full" />
            </span>
          </h2>
          <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Internationally recognised certifications reflect our relentless commitment to product excellence and safety.
          </p>
        </motion.div>

        {/* Cards Grid - 2 Columns on Mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12"
        >
          {certs.map((cert) => (
            <motion.div
              key={cert.code}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 40px ${cert.glowColor}`,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className={`group bg-white rounded-2xl sm:rounded-[28px] border ${cert.borderClass} ${cert.hoverBorder} shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 overflow-hidden relative cursor-pointer flex flex-col justify-between`}
            >
              {/* Colored top accent bar */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${cert.accent}, ${cert.accent}80)` }} />

              {/* Card Body */}
              <div className="p-3.5 sm:p-6 flex flex-col items-center text-center h-full">

                {/* Certificate Logo Container */}
                <motion.div
                  className={`w-12 h-12 sm:w-18 sm:h-18 rounded-xl sm:rounded-[20px] ${cert.lightBg} border ${cert.borderClass} flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden shrink-0`}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={cert.logo}
                    alt={`${cert.code} logo`}
                    className="w-7 h-7 sm:w-11 sm:h-11 object-contain relative z-10 drop-shadow-xs"
                  />
                </motion.div>

                {/* Certification Code Title */}
                <h3 className={`font-black text-slate-900 text-xs sm:text-[16px] mb-0.5 leading-snug group-hover:${cert.colorClass} transition-colors duration-200`}>
                  {cert.code}
                </h3>

                {/* Since Label */}
                <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] mb-2 sm:mb-3 ${cert.colorClass} opacity-80`}>
                  Since {cert.year}
                </p>

                {/* Details Body */}
                <p className="text-slate-500 text-[11px] sm:text-[13px] leading-tight sm:leading-relaxed font-medium flex-1 hidden sm:block">
                  {cert.body}
                </p>

                {/* Ribbon Label at Bottom */}
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-slate-100 w-full flex items-center justify-center">
                  <div
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${cert.ribbonBg} text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${cert.colorClass}`}
                  >
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    {cert.ribbonText}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#022561] text-white rounded-2xl sm:rounded-3xl overflow-visible shadow-xl shadow-blue-900/15"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#011840] via-[#022561] to-[#0a3d8f] rounded-2xl sm:rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)] rounded-2xl sm:rounded-3xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-8 p-5 sm:p-8 lg:p-10 lg:pl-64">

            {/* Mascot on Left (desktop) */}
            <div className="absolute left-2 lg:left-6 bottom-0 w-[170px] h-[190px] lg:w-[230px] lg:h-[250px] pointer-events-none z-20 hidden md:block">
              <motion.img
                src={MascotGreeting}
                alt="Plumtek Certified Quality Mascot"
                className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                initial={{ y: 10, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Banner Text */}
            <div className="text-center lg:text-left flex-1">
              <p className="text-blue-300 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">
                Certificate Download
              </p>
              <h3 className="text-white text-base sm:text-xl lg:text-[26px] font-black leading-snug max-w-lg">
                View All Certifications & Compliance Documents
              </h3>
            </div>

            {/* Checkmarks */}
            <div className="flex flex-col gap-2 text-[11px] sm:text-[12px] font-bold text-blue-100 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shrink-0 w-full sm:w-auto">
              {["All certificates in one place", "Verified & up-to-date", "Easy download & sharing"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-2 shrink-0 w-full sm:w-auto">
              <motion.a
                href="/catalogs"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-extrabold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-colors duration-200 shadow-md text-xs sm:text-[13px] tracking-wide"
              >
                Download Now
                <Download className="w-4 h-4 text-blue-600" />
              </motion.a>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-blue-300">
                <FileText className="w-3 h-3" />
                <span>PDF Format</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CertificationsSection;
