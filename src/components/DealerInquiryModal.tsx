import { useState } from "react";
import { X, Building2, User, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitEnquiry } from "@/lib/api";

interface DealerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DealerInquiryModal = ({ isOpen, onClose }: DealerInquiryModalProps) => {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      await submitEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: "Dealer/Distributor Inquiry from " + form.businessName + " — " + form.city,
        message: "Business Name: " + form.businessName + "\nCity: " + form.city + "\n\n" + form.message,
        type: "dealer",
      });
      setSubmitStatus("success");
      setForm({ name: "", businessName: "", email: "", phone: "", city: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Attractive dealer margins",
    "Marketing & branding support",
    "Technical training programs",
    "Priority inventory allocation",
    "Dedicated account manager",
    "Pan-India logistics network",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gradient-to-r from-[#0f2b66] via-[#12337a] to-[#0a1c42] rounded-t-3xl px-8 py-8 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                  Partner With Us
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-1">
                  Dealer &amp; Distributor Inquiry
                </h2>
                <p className="text-blue-200 text-sm font-medium">
                  Fill in the form below and our dealer network team will reach out within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                <div className="md:col-span-2 bg-slate-50 border-r border-slate-100 px-6 py-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 mb-5">
                    Why Partner With Us?
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-[13px] font-medium leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2">Direct Contact</p>
                    <a href="tel:+917373073333" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors">
                      <Phone className="w-4 h-4" />
                      +91 73730 73333
                    </a>
                    <a href="tel:+919280043815" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors mt-1">
                      <Phone className="w-4 h-4" />
                      +91 92800 43815
                    </a>
                  </div>
                </div>

                <div className="md:col-span-3 px-6 py-8">
                  {submitStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center h-full text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">Inquiry Received!</h3>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                        Thank you for your interest in becoming a Plumtek dealer. Our team will contact you within 24 hours.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitStatus === "error" && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                          {errorMessage || "Failed to submit. Please try again."}
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="Your Name *" required value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                        </div>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="Business / Shop Name *" required value={form.businessName}
                            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="tel" placeholder="Phone Number *" required value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="email" placeholder="Email Address *" required value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                        </div>
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="City / District *" required value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                      </div>
                      <textarea
                        placeholder="Tell us about your business and interest in dealership… (optional)"
                        rows={4} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none" />
                      <button type="submit" disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.01]">
                        {isSubmitting ? "Submitting…" : "Submit Dealer Inquiry"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                      </button>
                      <p className="text-[11px] text-slate-400 text-center font-medium">
                        Our dealer network team will reach out within 24 hours.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DealerInquiryModal;
