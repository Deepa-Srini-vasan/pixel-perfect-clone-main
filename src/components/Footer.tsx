import { Phone, MapPin, Clock, ArrowRight, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const TEXT = {
  brandDesc: "Precision engineered CPVC, UPVC and high-pressure piping systems. Designed for extreme durability, zero leaks, and sustainable drinking water delivery.",
  quickLinks: "Quick Links",
  productRange: "Product Range",
  contactInfo: "Contact Info",
  address: "Edappadi Main road, Kuppanoor (P.O), Sankari (T.K), Pin: 637 301, Salem, Tamil Nadu.",
  email: "support@euroaquappr.com",
  hours: "Mon – Fri 8:00 – 18:00",
  rights: "© 2026 PLUMtek Solutions. Precision engineering. All rights reserved.",
  privacy: "Privacy Policy",
  terms: "Terms of Service"
};

const quickLinks = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about" },
  { label: "Our Store",  to: "/shop" },
  { label: "Catalogs",   to: "/catalogs" },
  { label: "Contact Us", to: "/contact" },
];

const categories = [
  "Pipes", "Fittings", "Valves", "Accessories",
];

const socials = [
  { icon: Facebook, name: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, name: "Twitter", href: "https://twitter.com" },
  { icon: Instagram, name: "Instagram", href: "https://instagram.com" },
  { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com" },
];

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/50" aria-label="Site footer">

      {/* ── Main footer grid ── */}
      <div className="container-pipes py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" aria-label="Plumtek – Home" className="inline-block mb-6">
              <img
                src={logo}
                alt="PLUMtek"
                className="h-11 w-auto opacity-95"
              />
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-6 max-w-[300px] font-medium">
              {TEXT.brandDesc}
            </p>
            
            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 bg-white hover:bg-primary border border-slate-200 hover:border-primary
                             flex items-center justify-center rounded-xl text-slate-400 hover:text-white
                             transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold text-slate-800 text-[13px] mb-6 uppercase tracking-[0.15em]">
              {TEXT.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-primary group transition-colors duration-200 font-medium"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-bold text-slate-800 text-[13px] mb-6 uppercase tracking-[0.15em]">
              {TEXT.productRange}
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-primary group transition-colors duration-200 font-medium"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-heading font-bold text-slate-800 text-[13px] mb-6 uppercase tracking-[0.15em]">
              {TEXT.contactInfo}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[13px]">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-slate-500 leading-relaxed font-medium">
                  {TEXT.address}
                </span>
              </li>
              <li className="flex items-center gap-3 text-[13px]">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+919842742936" className="text-slate-500 hover:text-primary transition-colors font-medium">
                  +91 98427 42936
                </a>
              </li>
              <li className="flex items-center gap-3 text-[13px]">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`mailto:${TEXT.email}`} className="text-slate-500 hover:text-primary transition-colors font-medium">
                  {TEXT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[13px]">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-slate-500 font-medium">{TEXT.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-200/50 bg-white">
        <div className="container-pipes py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-medium text-slate-500">
          <p className="flex items-center gap-1.5">
            {TEXT.rights}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">{TEXT.privacy}</a>
            <span className="text-slate-300">|</span>
            <a href="#" className="hover:text-primary transition-colors">{TEXT.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
