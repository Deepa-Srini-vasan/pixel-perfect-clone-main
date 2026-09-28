import { useState } from "react";
import { X, User, Phone, Mail, FileText, ArrowRight, CheckCircle2, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitEnquiry } from "@/lib/api";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EstimateModal = ({ isOpen, onClose }: EstimateModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    requirements: "",
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
        subject: "Estimate Request — " + form.projectType,
        message: "Project Type: " + form.projectType + "\n\nRequirements:\n" + form.requirements,
        type: "general",
      });
      setSubmitStatus("success");
      setForm({ name: "", email: "", phone: "", projectType: "", requirements: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    "Residential Building",
    "Commercial Project",
    "Industrial Installation",
    "Infrastructure / Government",
    "Agricultural / HDPE",
    "Other",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="est-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            key="est-modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 rounded-t-3xl px-7 py-7 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                  Free Estimate
                </span>
                <h2 className="text-2xl font-black text-white leading-tight mb-1">
                  Request an Estimate
                </h2>
                <p className="text-blue-100 text-sm font-medium">
                  Tell us your project requirements and we'll provide a custom quotation.
                </p>
              </div>

              <div className="px-7 py-7">
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Estimate Request Sent!</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                      Our sales team will prepare your custom estimate and reach out within 24 hours.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
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
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="tel" placeholder="Phone Number *" required value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" placeholder="Email Address *" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
                    </div>

                    <div className="relative">
                      <Ruler className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        required
                        value={form.projectType}
                        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none"
                      >
                        <option value="" disabled>Project Type *</option>
                        {projectTypes.map((pt) => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <textarea
                        placeholder="Describe your requirements — pipe sizes, quantities, pressure ratings, project location… *"
                        rows={5} required value={form.requirements}
                        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.01]">
                      {isSubmitting ? "Submitting…" : "Get My Estimate"}
                      {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center font-medium">
                      Free estimate — no obligation. Our team responds within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EstimateModal;
