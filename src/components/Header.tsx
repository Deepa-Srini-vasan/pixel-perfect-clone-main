import { Search, Menu, X, Package } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home",      to: "/" },
  { label: "About",     to: "/about" },
  { label: "Store",     to: "/shop" },
  { label: "Catalogs",  to: "/catalogs" },
  { label: "Contact",   to: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled]       = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();

  /* Detect scroll for header shadow boost */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

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
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
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
          ))}
        </nav>

        {/* ── Desktop Search + Shop CTA ── */}
        <div className="hidden lg:flex items-center gap-3">
          <form onSubmit={handleSearch} role="search" className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="search"
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
            aria-label="Shop"
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
          ${mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
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
            {navItems.map((item) => (
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
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
