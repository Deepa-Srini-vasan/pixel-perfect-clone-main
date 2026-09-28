import { useState } from "react";
import { X, Building2, User, Phone, Mail, MapPin, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitEnquiry } from "@/lib/api";

interface DealerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUSINESS_ROLES = ["Dealer", "Distributor"];
const PRODUCT_RANGES = [
  "Hoses",
  "Taps & Faucets",
  "Pipes & Fittings (HDPE/PPR/PRT)",
];

const benefits = [
  "Attractive & competitive margins",
  "Marketing & branding support",
  "Technical training programs",
  "Priority inventory allocation",
  "Dedicated account manager",
  "Pan-India logistics network",
];

const DealerInquiryModal = ({ isOpen, onClose }: DealerInquiryModalProps) => {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    businessRole: "",
    productRange: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (form: any) => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!/^\+?[0-9]{10,15}$/.test(form.phone)) errors.phone = "Valid phone number is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Valid email is required.";
    if (!form.city.trim()) errors.city = "Location (City) is required.";
    if (!form.businessRole) errors.businessRole = "Please select a business role.";
    if (!form.productRange) errors.productRange = "Please select a product range.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please correct the highlighted fields.");
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");
    try {
      await submitEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: "Dealer/Distributor Inquiry — " + form.businessRole + " | " + form.productRange,
        message:
          "Business Name: " + form.businessName +
          "\nCity: " + form.city +
          "\nRole: " + form.businessRole +
          "\nProduct Interest: " + form.productRange +
          (form.message ? "\n\nAdditional Notes:\n" + form.message : ""),
        type: "dealer",
      });
      setSubmitStatus("success");
      setForm({ name: "", businessName: "", email: "", phone: "", city: "", businessRole: "", productRange: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[93vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[#0f2b66] via-[#12337a] to-[#0d1f4e] rounded-t-3xl px-8 py-7 text-white">
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
                  Dealer &amp; Distributor Enrollment
                </h2>
                <p className="text-blue-200 text-sm font-medium">
                  Join 500+ authorised partners across India. Our team will reach out within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Benefits sidebar */}
                <div className="md:col-span-2 bg-slate-50 border-r border-slate-100 px-6 py-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-5">
                    Why Partner With Plumtek?
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-[13px] font-medium leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-5 border-t border-slate-200">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-2.5">Direct Contact</p>
                    <a href="tel:+917373073333" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors mb-1">
                      <Phone className="w-3.5 h-3.5" /> +91 73730 73333
                    </a>
                    <a href="tel:+919280043815" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors">
                      <Phone className="w-3.5 h-3.5" /> +91 92800 43815
                    </a>
                  </div>
                </div>

                {/* Form */}
                <div className="md:col-span-3 px-6 py-8">
                  {submitStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">Enrollment Received!</h3>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                        Thank you for your interest in becoming a Plumtek authorised partner. Our dealer network team will contact you within 24 hours.
                      </p>
                      <button onClick={onClose} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors">
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

                      {/* Name + Business Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="Your Name *" required value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${fieldErrors.name ? 'border-red-400' : 'border-slate-200'} rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all`} />
                        </div>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="Business / Shop Name *" required value={form.businessName}
                            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                        </div>
                      </div>

                      {/* Phone + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="tel" placeholder="Phone Number *" required value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${fieldErrors.phone ? 'border-red-400' : 'border-slate-200'} rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all`} />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="email" placeholder="Email Address *" required value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${fieldErrors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all`} />
                        </div>
                      </div>

                      {/* City */}
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="City / District *" required value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${fieldErrors.city ? 'border-red-400' : 'border-slate-200'} rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all`} />
                      </div>

                      {/* Dropdown 1: Business Role */}
                      <div className="relative">
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select required value={form.businessRole}
                          onChange={(e) => setForm({ ...form, businessRole: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none pr-10">
                          <option value="" disabled>Business Role *</option>
                          {BUSINESS_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>

                      {/* Dropdown 2: Product Range */}
                      <div className="relative">
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select required value={form.productRange}
                          onChange={(e) => setForm({ ...form, productRange: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none pr-10">
                          <option value="" disabled>Interested Product Range *</option>
                          {PRODUCT_RANGES.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>

                      {/* Message */}
                      <textarea
                        placeholder="Additional notes or questions… (optional)"
                        rows={3} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none" />

                      <button type="submit" disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.01]">
                        {isSubmitting ? "Submitting…" : "Submit Enrollment"}
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
