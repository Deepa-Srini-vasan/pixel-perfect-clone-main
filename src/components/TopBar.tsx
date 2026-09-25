import { Clock, Phone, MapPin, Mail } from "lucide-react";

const TopBar = () => (
  <div className="hidden md:block bg-slate-900 text-slate-300 text-[12px] font-medium border-b border-slate-800">
    <div className="container-pipes flex items-center justify-between h-9 gap-4">
      {/* Left: hours + phone + address */}
      <div className="flex items-center gap-5 overflow-hidden">
        <span className="flex items-center gap-1.5 shrink-0">
          <Clock className="w-3 h-3 text-blue-400" />
          Mon – Fri 8:00 – 18:00
        </span>
        <span className="text-slate-700">|</span>
        <a
          href="tel:+919842742936"
          className="flex items-center gap-1.5 hover:text-blue-400 transition-colors shrink-0"
        >
          <Phone className="w-3 h-3 text-blue-400" />
          +91 98427 42936
        </a>
        <span className="hidden lg:flex items-center gap-1.5 text-slate-400 truncate">
          <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
          Edappadi Main Rd, Kuppanoor, Salem, Tamil Nadu
        </span>
      </div>

      {/* Right: email */}
      <a
        href="mailto:support@euroaquappr.com"
        className="flex items-center gap-1.5 hover:text-blue-400 transition-colors shrink-0"
      >
        <Mail className="w-3 h-3 text-blue-400" />
        support@euroaquappr.com
      </a>
    </div>
  </div>
);

export default TopBar;
