import React from 'react';
import { Award, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

const TEXT = {
  sectionTitle: "Quality Assurance & Compliance",
  sectionSubtitle: "Engineering Compliance Standards",
  sectionDesc: "Plumtek systems are manufactured in state-of-the-art facilities and undergo extensive physical testing to satisfy strict global ASTM and BIS piping code regulations.",
  verifiedLabel: "100% Verified",
  verifiedSubtext: "Third-party lab tested",
  specLabel: "SPECIFICATION:",
  labTitle: "Facility Lab Testing",
  labSubtitle: "Physical Quality Control Criteria",
  labDesc: "Before batch packaging, random pipes are subjected to extreme destructive stresses in our on-site laboratories.",
  test1Title: "Hydrostatic Pressure",
  test1Desc: "Pipes are pressured under elevated water load for up to 1000 hours to ensure stress-rupture thresholds exceed standards.",
  test2Title: "Crush & Flattening",
  test2Desc: "Pipes are compressed between heavy plates to verify ductile elasticity and ensure absolute zero fracturing or wall delamination.",
  test3Title: "Heat Reversion",
  test3Desc: "Heating test ensures materials contain zero extrusion stresses, avoiding thermal warping or structural cracking when heated.",
  test4Title: "Tensile & Elongation",
  test4Desc: "Extruded plastics are pulled to measure elongation break-limits, verifying excellent molecular polymer blending."
};

interface CertificationItem {
  code: string;
  title: string;
  scope: string;
  metrics: string;
}

const certificationsList: CertificationItem[] = [
  {
    code: "ASTM D2846",
    title: "CPVC Standard Specification",
    scope: "Covers chlorinated poly(vinyl chloride) plastic hot- and cold-water distribution system components made in one standard dimension ratio.",
    metrics: "Rated: 400 PSI @ 23°C / 100 PSI @ 82°C"
  },
  {
    code: "ASTM D1785",
    title: "UPVC Schedule 40 & 80 Specs",
    scope: "Covers dimensions, tolerances, and pressure ratings for rigid polyvinyl chloride (PVC) pipes in Schedule 40, Schedule 80 configurations.",
    metrics: "Rated: Up to 850 PSI (Schedule 80)"
  },
  {
    code: "IS 15778",
    title: "Bureau of Indian Standards (BIS)",
    scope: "Specifies strict requirements for chlorinated polyvinyl chloride (CPVC) pipes for potable hot and cold water supply.",
    metrics: "Class 1 (82°C) & Class 2 (60°C) Compliant"
  },
  {
    code: "ISO 9001:2015",
    title: "Quality Management Systems",
    scope: "Globally recognized standard for quality control, raw material traceabilities, and manufacturing precision injection molding.",
    metrics: "Certified Manufacturing Facilities"
  }
];

const Certifications: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/50 text-left">
      <div className="container-pipes">
        
        {/* ── Section Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              {TEXT.sectionTitle}
            </p>
            <h2 className="font-heading font-black text-slate-900 leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl">
              {TEXT.sectionSubtitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              {TEXT.sectionDesc}
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="flex items-center gap-3 bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm w-full lg:w-fit">
              <ShieldCheck className="w-10 h-10 text-emerald-600 shrink-0" />
              <div className="text-left">
                <p className="text-[14px] font-black text-slate-800 leading-none">{TEXT.verifiedLabel}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{TEXT.verifiedSubtext}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Certifications Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {certificationsList.map((cert, idx) => (
            <div key={idx} className="bg-white border border-slate-200/60 rounded-[28px] p-8 shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-all duration-300">
              <div className="space-y-4">
                
                {/* Standard Code Label */}
                <div className="flex justify-between items-center">
                  <span className="text-[12.5px] font-black text-primary bg-primary/5 border border-primary/10 rounded-lg py-1 px-3">
                    {cert.code}
                  </span>
                  <Award className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-slate-800 text-[16px] tracking-tight">
                    {cert.title}
                  </h3>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed font-medium">
                    {cert.scope}
                  </p>
                </div>

              </div>

              {/* Technical Spec metrics bottom line */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-extrabold text-slate-400">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>{TEXT.specLabel}</span>
                <span className="text-slate-700">{cert.metrics}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Visual Laboratory Testing Parameters ── */}
        <div className="bg-white border border-slate-200/60 rounded-[32px] p-8 shadow-sm text-left relative overflow-hidden">
          {/* visual details */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-secondary">
                {TEXT.labTitle}
              </p>
              <h3 className="font-heading font-black text-slate-800 text-2xl tracking-tight leading-tight">
                {TEXT.labSubtitle}
              </h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                {TEXT.labDesc}
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 text-secondary flex items-center justify-center shrink-0 font-black text-xs">
                  01
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{TEXT.test1Title}</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium mt-1 leading-normal">
                    {TEXT.test1Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 text-secondary flex items-center justify-center shrink-0 font-black text-xs">
                  02
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{TEXT.test2Title}</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium mt-1 leading-normal">
                    {TEXT.test2Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 text-secondary flex items-center justify-center shrink-0 font-black text-xs">
                  03
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{TEXT.test3Title}</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium mt-1 leading-normal">
                    {TEXT.test3Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 text-secondary flex items-center justify-center shrink-0 font-black text-xs">
                  04
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{TEXT.test4Title}</h4>
                  <p className="text-[11.5px] text-slate-400 font-medium mt-1 leading-normal">
                    {TEXT.test4Desc}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
