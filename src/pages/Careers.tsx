import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { User, Mail, Phone, Briefcase, Clock, FileText, Send, CheckCircle, ArrowRight, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { CareerService, submitCareerApplication, type CareerApplicationPayload } from "@/lib/api";
import type { ApiCareerJob } from "@/types/career";

const fallbackPositions = [
  "Production Operator",
  "Quality Control Inspector",
  "Sales Executive",
  "Customer Support Representative",
  "Warehouse Associate",
  "Maintenance Technician",
  "HR Executive",
  "Finance Executive",
  "Other",
];

const Careers = () => {
  const [form, setForm] = useState<CareerApplicationPayload & { agree: boolean }>({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  /* ── Fetch Live Jobs Dynamically ── */
  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ["publicCareerJobs"],
    queryFn: () => CareerService.fetchPublicCareerJobs(),
    refetchOnWindowFocus: true,
  });

  const jobs: ApiCareerJob[] = jobsData?.jobs || [];
  const activeJobs = jobs.filter((j) => Number(j.is_active) === 1);

  const dynamicPositions = activeJobs.length > 0
    ? activeJobs.map((j) => j.title)
    : fallbackPositions;

  const handleSelectJob = (jobTitle: string, jobId?: number) => {
    setForm((prev) => ({
      ...prev,
      position: jobTitle,
      jobId: jobId || null,
    }));
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");

    if (!form.agree) {
      setSubmitStatus("error");
      setErrorMessage("Please agree to the terms before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitCareerApplication({
        jobId: form.jobId || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position,
        experience: form.experience,
        coverLetter: form.coverLetter,
      });
      setSubmitStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        coverLetter: "",
        agree: false,
      });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-left">
      <TopBar />
      <Header />
      <PageBanner
        title="Join Our Growing Team"
        eyebrow="CAREER OPPORTUNITIES"
        subtitle="Build the future of plumbing & fluid conveyance technology with Euroaqua Plumtek. Explore career roles, growth opportunities, and company culture."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Careers" },
        ]}
        ctaText="EXPLORE OPEN POSITIONS"
        ctaLink="#positions"
      />
      <main>
        {/* ── Open Positions Section (Dynamic from Database) ── */}
        <section id="positions" className="py-8 sm:py-16 lg:py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] mb-2 sm:mb-4">
                NOW HIRING
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-4 tracking-tight">
                Current Openings
              </h2>
              <p className="text-slate-300 text-xs sm:text-base md:text-lg">
                Explore our live job vacancies. Click 'Apply for Position' to send your profile directly to our HR recruitment team.
              </p>
            </div>

            {jobsLoading ? (
              <div className="py-8 sm:py-12 text-center text-slate-400">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs sm:text-sm font-medium">Loading live career openings...</p>
              </div>
            ) : activeJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                          {job.type.replace("-", " ")}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
                          {job.department}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-xl font-extrabold text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3 sm:mb-4">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{job.location}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                        {job.description}
                      </p>

                      {job.requirements && (
                        <div className="mb-4 sm:mb-6 p-2.5 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] sm:text-[11px] text-slate-300">
                          <span className="font-bold text-cyan-400 block mb-0.5 sm:mb-1">Key Requirements:</span>
                          <span className="line-clamp-2">{job.requirements}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleSelectJob(job.title, job.id)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl sm:rounded-2xl shadow-md transition-all hover:scale-[1.02]"
                    >
                      <span>Apply For Position</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 bg-slate-800/50 rounded-2xl sm:rounded-3xl border border-slate-700/60 max-w-xl mx-auto p-5 sm:p-8">
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-3 opacity-80" />
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">No Active Specific Listings</h3>
                <p className="text-xs text-slate-300 mb-4 sm:mb-6">
                  We are always looking for exceptional talent in manufacturing, engineering, and sales. Submit your resume below for future openings!
                </p>
                <a
                  href="#application-form"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 sm:py-3 sm:px-6 rounded-full"
                >
                  Submit General Application
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ── Why Join Section (Why Work at Plumtek?) ── */}
        <section className="py-8 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="text-center mb-6 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2 sm:mb-4">
                Why Work at Plumtek?
              </h2>
              <p className="text-slate-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
                We offer a dynamic work environment with opportunities for growth, learning, and making a real impact in India's fluid conveyance industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-8">
              <div className="text-center p-4 sm:p-8 border border-border rounded-2xl sm:rounded-3xl bg-slate-50/80 hover:shadow-lg transition-all">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2.5 sm:mb-4 text-blue-600">
                  <Briefcase className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-1 sm:mb-2 text-base sm:text-lg">Career Growth</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We invest in your professional development with training programs, hands-on experience, and clear advancement paths.
                </p>
              </div>
              <div className="text-center p-4 sm:p-8 border border-border rounded-2xl sm:rounded-3xl bg-slate-50/80 hover:shadow-lg transition-all">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2.5 sm:mb-4 text-blue-600">
                  <CheckCircle className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-1 sm:mb-2 text-base sm:text-lg">Competitive Benefits</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Comprehensive health coverage, paid time off, incentive bonuses, and safe operating environments.
                </p>
              </div>
              <div className="text-center p-4 sm:p-8 border border-border rounded-2xl sm:rounded-3xl bg-slate-50/80 hover:shadow-lg transition-all">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2.5 sm:mb-4 text-blue-600">
                  <Clock className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-1 sm:mb-2 text-base sm:text-lg">Work-Life Balance</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Structured schedules, supportive team culture, and zero-accident safety protocols across all manufacturing plants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Application Form Section ── */}
        <section id="application-form" className="py-8 sm:py-16 lg:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 md:p-12 shadow-xl">
              <div className="text-center mb-10">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-wider mb-3">
                  SUBMIT YOUR PROFILE
                </span>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-3">
                  Job Application Form
                </h2>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                  Fill out the form below and our Talent Acquisition team will review your qualifications and reach out promptly.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl flex items-start gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Application Received!</strong>
                      Thank you! Your profile has been submitted to Euroaqua Plumtek HR. We will review your details and contact you if shortlisted.
                    </div>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Submission Failed</strong>
                      {errorMessage || "Failed to submit application. Please check form details and try again."}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98427 42936"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Position Applied For *
                    </label>
                    <select
                      required
                      value={form.position}
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                    >
                      <option value="">Select a position...</option>
                      {dynamicPositions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 3 Years in Industrial Piping"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Cover Letter & Relevant Qualifications *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    placeholder="Briefly describe your background, technical skills, and availability..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-600 cursor-pointer select-none">
                    I confirm that the information provided is accurate and consent to Plumtek processing my details.
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 bg-gradient-to-b from-[#071329] via-[#0b1c3d] to-[#040c1e] text-white relative overflow-hidden text-left">
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-[11px] font-black uppercase tracking-[0.22em] mb-5">
              CAREER SUPPORT
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Have Questions About Working at Plumtek?
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Reach out to our Talent Acquisition team at{" "}
              <a href="mailto:hr@plumtek.com" className="text-cyan-300 font-bold underline hover:text-white transition-colors">
                hr@plumtek.com
              </a>{" "}
              or call us directly at +91 98427 42936.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:hr@plumtek.com"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>Email HR Team</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+919842742936"
                className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all"
              >
                <span>Call Recruitment</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
