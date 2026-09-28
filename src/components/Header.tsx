import { Search, Menu, X, Package, ChevronDown, Droplets, Wrench, Layers } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

/* ── Category Mega-Menu Data ─────────────────────────────── */
const PRODUCT_CATEGORIES = [
  {
    name: "Taps & Faucets",
    slug: "taps-faucets-accessories",
    icon: Droplets,
    color: "text-blue-600 bg-blue-50",
    sub: ["Square Taps", "Vibrant", "Monalisa", "Bath Accessories", "Health Faucets", "Ball Valves"],
  },
  {
    name: "Hoses",
    slug: "hoses",
    icon: Wrench,
    color: "text-emerald-600 bg-emerald-50",
    sub: ["Industrial Hose", "Garden Hose"],
  },
  {
    name: "Pipes & Fittings",
    slug: "ppr-pipes",
    icon: Layers,
    color: "text-violet-600 bg-violet-50",
    sub: ["HDPE Pipes", "PPR Pipes", "PRT Pipes"],
  },
];

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Product Varieties", to: "/shop", hasMega: true },
  { label: "Clients", to: "/clients" },
  { label: "Catalogs", to: "/catalogs" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

/* ── MegaMenu Component ──────────────────────────────────── */
const MegaMenu = ({ onClose }: { onClose: () => void }) => (
  <div
    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.14)] border border-slate-100 p-6 z-50 grid grid-cols-3 gap-4"
    onMouseLeave={onClose}
  >
    {PRODUCT_CATEGORIES.map((cat) => (
      <div key={cat.name} className="flex flex-col">
        {/* Category Header */}
        <Link
          to={`/shop?category=${cat.slug}`}
          onClick={onClose}
          className="flex items-center gap-2.5 mb-3 group"
        >
          <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.color} shrink-0 group-hover:scale-110 transition-transform`}>
            <cat.icon className="w-4.5 h-4.5" />
          </span>
          <span className="font-black text-slate-900 text-[13px] tracking-tight group-hover:text-blue-600 transition-colors">
            {cat.name}
          </span>
        </Link>
        {/* Sub-categories */}
        <ul className="space-y-1 pl-[46px]">
          {cat.sub.map((sub) => (
            <li key={sub}>
              <Link
                to={`/shop?category=${cat.slug}&sub=${encodeURIComponent(sub)}`}
                onClick={onClose}
                className="text-[12.5px] text-slate-500 hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5 group/sub"
              >
                <span className="w-1 h-1 rounded-full bg-slate-300 group-hover/sub:bg-blue-500 transition-colors shrink-0" />
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}

    {/* Bottom CTA */}
    <div className="col-span-3 mt-3 pt-4 border-t border-slate-100 flex items-center justify-between">
      <p className="text-[12px] text-slate-400 font-medium">492+ products across all categories</p>
      <Link
        to="/shop"
        onClick={onClose}
        className="inline-flex items-center gap-1.5 text-[12px] font-extrabold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
      >
        View All Products
        <ChevronDown className="w-3 h-3 -rotate-90" />
      </Link>
    </div>
  </div>
);

/* ── Header ─────────────────────────────────────────────── */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [location.pathname]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/shop?search=${encodeURIComponent(q)}`);
      setSearchQuery("");
      setMobileOpen(false);
    }
  }, [searchQuery, navigate]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        bg-white/80 backdrop-blur-xl border-b
        ${scrolled
          ? "border-slate-200/60 shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
          : "border-slate-100/40"
        }`}
    >
      <div className="container-pipes flex items-center justify-between h-[72px] gap-6">

        {/* ── Logo ── */}
        <Link to="/" className="flex-shrink-0 flex items-center" aria-label="Plumtek – Home">
          <img src={logo} alt="PLUMtek" className="h-12 w-auto" />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-8 relative" aria-label="Main navigation">
          {navItems.map((item) =>
            item.hasMega ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <Link
                  to={item.to}
                  className={`relative py-1 flex items-center gap-1 text-[13px] font-semibold tracking-[0.06em] transition-colors duration-200
                    ${isActive(item.to)
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
                </Link>
                {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={`relative py-1 text-[13px] font-semibold tracking-[0.06em] transition-colors duration-200
                  ${isActive(item.to)
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* ── Desktop Search + Shop CTA ── */}
        <div className="hidden lg:flex items-center gap-3">
          <form onSubmit={handleSearch} role="search" className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="search"
              data-testid="header-search"
              aria-label="Search products"
              placeholder="Search SKUs, products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full
                         text-[13px] text-slate-700 placeholder:text-slate-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                         transition-all duration-200 w-[200px] focus:w-[240px]"
            />
          </form>

          <Link
            to="/shop"
            aria-label="Product Varieties"
            className="w-9 h-9 flex items-center justify-center rounded-full
                       bg-blue-50 text-blue-600
                       hover:bg-blue-600 hover:text-white
                       border border-blue-100 hover:border-blue-600
                       transition-all duration-200"
          >
            <Package className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-blue-600 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Nav Panel ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out
          ${mobileOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div className="border-t border-slate-100 bg-white/95 backdrop-blur-xl">
          {/* Mobile search */}
          <div className="px-4 pt-4 pb-3">
            <form onSubmit={handleSearch} role="search" className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                aria-label="Search products"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
                           text-[14px] text-slate-700 placeholder:text-slate-400
                           focus:outline-none focus:border-blue-400"
              />
            </form>
          </div>

          {/* Mobile links */}
          <nav className="px-4 pb-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) =>
              item.hasMega ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[14px] font-semibold transition-colors duration-200
                      ${isActive(item.to) ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="ml-3 mt-1 mb-2 border-l-2 border-blue-100 pl-3 flex flex-col gap-1">
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <div key={cat.name} className="mb-1">
                          <Link
                            to={`/shop?category=${cat.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-1.5 text-[13px] font-bold text-slate-700 hover:text-blue-600"
                          >
                            <cat.icon className="w-3.5 h-3.5 text-blue-500" />
                            {cat.name}
                          </Link>
                          <div className="flex flex-wrap gap-1 pl-5">
                            {cat.sub.map((sub) => (
                              <Link
                                key={sub}
                                to={`/shop?category=${cat.slug}&sub=${encodeURIComponent(sub)}`}
                                onClick={() => setMobileOpen(false)}
                                className="text-[11px] text-slate-500 hover:text-blue-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 font-medium"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center px-3 py-3 rounded-xl text-[14px] font-semibold transition-colors duration-200
                    ${isActive(item.to)
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
