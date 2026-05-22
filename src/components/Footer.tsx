import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about" },
  { label: "Our Store",  to: "/shop" },
  { label: "Catalogs",   to: "/catalogs" },
  { label: "Contact Us", to: "/contact" },
];

const categories = [
  "Baths", "Bidets", "Faucets", "Toilets", "Washbasins", "Accessories",
];

const socials = [
  { label: "F", name: "Facebook" },
  { label: "T", name: "Twitter" },
  { label: "I", name: "Instagram" },
  { label: "Y", name: "YouTube" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-slate-950 text-slate-400" aria-label="Site footer">

      {/* ── Newsletter Banner ── */}
      <div className="border-b border-slate-800/60">
        <div className="container-pipes py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg leading-tight">
                Subscribe to Updates
              </h3>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Get the latest deals and news to your inbox.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-sm"
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              required
              className="flex-1 bg-slate-900 border border-slate-700 border-r-0
                         px-4 py-3 text-[13px] text-white placeholder:text-slate-500
                         rounded-l-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3
                         rounded-r-xl transition-colors duration-200 flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container-pipes py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" aria-label="Plumtek – Home" className="inline-block mb-5">
              <img
                src={logo}
                alt="PLUMtek"
                className="h-11 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-6 max-w-[280px]">
              Premium quality industrial plumbing products and solutions. Expert craftsmanship,
              innovative designs, and 25 years of trusted experience.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ label, name }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-600
                             flex items-center justify-center rounded-xl text-[11px] font-bold text-slate-400 hover:text-white
                             transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold text-white text-[14px] mb-6 uppercase tracking-[0.1em]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-blue-400 group transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-bold text-white text-[14px] mb-6 uppercase tracking-[0.1em]">
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-blue-400 group transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-heading font-bold text-white text-[14px] mb-6 uppercase tracking-[0.1em]">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[13px]">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-500 leading-relaxed">
                  Edappadi Main road, Kuppanoor (P.O),<br />
                  Sankari (T.K), Pin: 637 301,<br />
                  Salem, Tamil Nadu.
                </span>
              </li>
              <li className="flex items-center gap-3 text-[13px]">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="tel:+919842742936" className="text-slate-500 hover:text-blue-400 transition-colors">
                  +91 98427 42936
                </a>
              </li>
              <li className="flex items-center gap-3 text-[13px]">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="mailto:support@euroaquappr.com" className="text-slate-500 hover:text-blue-400 transition-colors">
                  support@euroaquappr.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-[13px]">
                <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-slate-500">Mon – Fri 8:00 – 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-800/60">
        <div className="container-pipes py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]">
          <p className="text-slate-600">
            © {new Date().getFullYear()} PLUMtek. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-slate-600 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-600 hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
