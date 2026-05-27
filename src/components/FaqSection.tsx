import React, { useState } from 'react';
import { ChevronDown, HelpCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEXT = {
  sectionTitle: "Frequently Asked Questions",
  sectionSubtitle: "Contractor & Engineering Support",
  sectionDesc: "Get technical answers regarding standard codes, temperature parameters, and installation practices for plumbing systems.",
  catalogQuestion: "Need certified flow charts or structural piping catalogs?",
  catalogSubtext: "Download our full catalog library instantly.",
  catalogButton: "Go to Catalogs"
};

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "What is the critical difference between CPVC and UPVC?",
    a: "CPVC (Chlorinated Polyvinyl Chloride) is treated with extra chlorination during production. This raises its glass transition temperature, making CPVC highly resistant to heat up to 93°C (200°F)—perfect for hot domestic water distribution. UPVC (Unplasticized Polyvinyl Chloride) does not contain this added chlorination, meaning it remains rigid and highly impact resistant but is restricted to cold fluid supply up to 60°C (140°F)."
  },
  {
    q: "Are Plumtek pipes completely lead-free and drinking water safe?",
    a: "Yes, our entire CPVC and UPVC catalog is strictly formulated to be 100% lead-free. Plasticizers or heavy-metal stabilizers are replaced with premium organic/tin alternatives, fulfilling NSF/ANSI 61 and IS 15778 health requirements. It prevents toxic compounds from leaching into potable drinking water."
  },
  {
    q: "How does the solvent cement cold-fusion process work?",
    a: "Solvent welding is not a simple glue bond. The solvent cement chemically softens the plastic outer shell of the pipe and the interior of the fitting. When joined, the polymer chains of both parts intertwine and fuse together. As the solvent evaporates, it forms a cold-fusion molecular joint that is stronger than the pipe itself, preventing leaks permanently."
  },
  {
    q: "How should contractors manage thermal expansion in long piping runs?",
    a: "Like all thermoplastics, CPVC and UPVC expand and contract slightly under ambient temperature changes. For long piping runs, thermal expansion loops, offset connections, or structural expansion joints must be installed. This allows the pipes to move freely without stress build-up on fittings and joints."
  },
  {
    q: "Can CPVC or UPVC pipes be used in underground outdoor environments?",
    a: "Absolutely. UPVC is highly rigid and can handle deep underground loads comfortably. CPVC is also rated for buried cold/hot transit. For outdoor aboveground applications exposed to direct sunlight, our pipes are treated with premium UV stabilizers. However, applying a layer of water-based latex paint is recommended by engineering standards for lifetime UV protection."
  }
];

const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white border-b border-slate-200/50 text-left">
      <div className="container-pipes">
        
        {/* ── Section Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
            {TEXT.sectionTitle}
          </p>
          <h2 className="font-heading font-black text-slate-900 leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl">
            {TEXT.sectionSubtitle}
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            {TEXT.sectionDesc}
          </p>
        </div>

        {/* ── Accordion List ── */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 flex justify-between items-center text-left gap-4 font-heading font-black text-[14.5px] text-slate-800 focus:outline-none hover:bg-slate-100/40 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-primary' : 'text-slate-400'}`} />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                {/* Answer Box */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[300px] border-t border-slate-200/40' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-[13px] text-slate-500 font-medium leading-relaxed bg-white">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 bg-slate-50 p-6 rounded-3xl border border-slate-200/50 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <p className="text-xs text-slate-500 font-bold text-left leading-normal">
              {TEXT.catalogQuestion} <br className="hidden sm:block" />
              {TEXT.catalogSubtext}
            </p>
          </div>
          <Link
            to="/catalogs"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-sm transition-all duration-300 shrink-0"
          >
            {TEXT.catalogButton}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
