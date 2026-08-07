import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import MascotImage from "@/assets/3d-assets/plumtek.png";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";

const TEXT = {
  brandDesc: "Euro Plumber Tech Private Limited delivers reliable plumbing products, expert advice, and fast inquiry support for homes, projects, and industrial installations.",
  quickLinks: "Quick Links",
  productRange: "Product Range",
  contactInfo: "Contact Info",
  address: "Edappadi Main road, Kuppanoor (P.O), Sankari (T.K), Pin: 637 301, Salem, Tamil Nadu.",
  phone: "+91 98427 42936",
  email: "support@euroaquappr.com",
  hours: "Mon - Fri 8:00 - 18:00",
  rights: "© 2025 Euro Plumber Tech Private Limited. All rights reserved.",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions"
};

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Store", to: "/shop" },
  { label: "Catalogs", to: "/catalogs" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact" },
];

const categories = [
  { label: "Pipes", to: "/shop?category=ppr-pipes" },
  { label: "Fittings", to: "/shop?category=ppr-fittings" },
  { label: "Valves", to: "/shop?category=valves" },
  { label: "Accessories", to: "/shop?category=accessories" },
];

const socials = [
  { icon: Facebook, name: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, name: "Twitter", href: "https://twitter.com" },
  { icon: Instagram, name: "Instagram", href: "https://instagram.com" },
  { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com" },
];

const Footer = () => {
  return (
    <footer className="relative bg-white text-slate-650 overflow-hidden border-t border-slate-100 z-10" aria-label="Site footer">
      
      {/* ── Background Water Wave SVG Graphic (matching the reference image wave style) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-0 opacity-70">
        <svg viewBox="0 0 1440 200" fill="none" className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0,120 C320,180 640,60 960,130 C1280,200 1440,120 1440,120 L1440,200 L0,200 Z" fill="url(#wave-grad-1)" opacity="0.3"/>
          <path d="M0,90 C480,180 720,80 1440,100 L1440,200 L0,200 Z" fill="url(#wave-grad-2)" opacity="0.5"/>
          <defs>
            <linearGradient id="wave-grad-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="container mx-auto px-6 max-w-7xl py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <Link to="/" aria-label="Plumtek – Home" className="inline-block mb-6">
              <img src={logo} alt="PLUMtek" className="h-12 w-auto opacity-95" />
            </Link>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-6 font-medium max-w-md">
              {TEXT.brandDesc}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200
                             flex items-center justify-center rounded-2xl text-blue-600 hover:text-blue-700
                             transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 text-[14px] uppercase tracking-wider mb-2">
              {TEXT.quickLinks}
            </h4>
            <div className="w-8 h-[3px] bg-blue-600 rounded-full mb-6" />
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label} className="border-b border-slate-100 last:border-0">
                  <Link
                    to={link.to}
                    className="flex justify-between items-center py-2.5 text-[14px] text-slate-600 hover:text-blue-600 transition-colors duration-250 font-medium group"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Range Column */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 text-[14px] uppercase tracking-wider mb-2">
              {TEXT.productRange}
            </h4>
            <div className="w-8 h-[3px] bg-blue-600 rounded-full mb-6" />
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.label} className="border-b border-slate-100 last:border-0">
                  <Link
                    to={cat.to}
                    className="flex justify-between items-center py-2.5 text-[14px] text-slate-600 hover:text-blue-600 transition-colors duration-250 font-medium group"
                  >
                    <span>{cat.label}</span>
                    <ChevronRight className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-4 relative pb-16 lg:pb-0">
            <h4 className="font-bold text-slate-900 text-[14px] uppercase tracking-wider mb-2">
              {TEXT.contactInfo}
            </h4>
            <div className="w-8 h-[3px] bg-blue-600 rounded-full mb-6" />
            <ul className="space-y-4 max-w-sm">
              <li className="flex items-start gap-3.5 text-[14px]">
                <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4.5 h-4.5" />
                </span>
                <span className="text-slate-600 leading-relaxed font-medium">
                  {TEXT.address}
                </span>
              </li>
              <li className="flex items-center gap-3.5 text-[14px]">
                <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </span>
                <a href={`tel:${TEXT.phone}`} className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                  {TEXT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-[14px]">
                <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <a href={`mailto:${TEXT.email}`} className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                  {TEXT.email}
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-[14px]">
                <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </span>
                <span className="text-slate-600 font-medium">{TEXT.hours}</span>
              </li>
            </ul>

            {/* Mascot Otter standing inside footer (hidden on tablet/mobile size) */}
            <div className="absolute right-[-40px] bottom-[-24px] w-[180px] h-[180px] pointer-events-none z-10 hidden xl:block">
              <img src={MascotImage} alt="Ollie the Mascot" className="w-full h-full object-contain" />
              {/* Chat Bubble pointing at Ollie */}
             
            </div>

          </div>

        </div>
      </div>

      {/* ── Bottom Dark Navy Blue Bar ── */}
      <div className="bg-[#031b4e] text-white/80 py-6 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-semibold">
          <p className="tracking-wide">
            {TEXT.rights}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">{TEXT.privacy}</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white transition-colors">{TEXT.terms}</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
