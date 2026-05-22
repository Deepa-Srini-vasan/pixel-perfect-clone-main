import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Phone, MapPin, Clock, Mail, User } from "lucide-react";
import { useState } from "react";
import { apiUrl, submitEnquiry } from "@/lib/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
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
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        subject: form.subject,
        message: form.message,
      });
      setSubmitStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <PageBanner
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Contact Us" },
        ]}
      />
      <main>
        {/* Google Map */}
        <div className="w-full h-[500px] bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.5!2d77.8673461!3d11.4895526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba95e4784d49ce5%3A0xb43852a024c02059!2sSakkthi%20Polymers!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>

        {/* Contact Details + Form */}
        <section className="py-20">
          <div className="container-pipes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left - Contact Details */}
              <div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                  Contact Details
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground">Edappadi Main road,
Kuppanoor (P.O)
Sankari (T.K)
Pin Code : 637 301
Salem (D.T)
Tamil Nadu.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground">+ 91 98427 42936 <br/> +91 99650 05555 <br/> +91 73730 73333</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground">support@euroaquappr.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">Working Hours</h4>
                      <p className="text-muted-foreground">Mon - Fri 8:00 - 18:00 / Sunday 8:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Contact Form */}
              <div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                      Thank you! Your enquiry has been submitted successfully. We'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {errorMessage || "Failed to submit enquiry. Please try again."}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Name *"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />

                  <textarea
                    placeholder="Message *"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="agree" className="mt-1" required />
                    <label htmlFor="agree" className="text-sm text-muted-foreground">
                      I agree that my data is collected and stored.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-[2px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Estimates CTA */}
        <section className="bg-primary py-16">
          <div className="container-pipes text-center">
            <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
              Estimates are Provided for Work!
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Replacement, remodeling shower and water lines along with fixtures.
            </p>
            <a
              href="#"
              className="inline-block bg-primary-foreground text-primary px-8 py-3 text-sm font-semibold uppercase tracking-[2px] hover:opacity-90 transition-opacity"
            >
              Request an Estimate
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
