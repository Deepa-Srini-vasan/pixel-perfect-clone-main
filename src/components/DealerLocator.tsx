import { useState, useMemo } from "react";
import { MapPin, Phone, User, Search, ChevronDown, Building2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DealerEntry {
  id: number;
  name: string;
  contact: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  type: "Branch" | "Dealer" | "Distributor";
  products: string;
}

const DEALERS: DealerEntry[] = [
  { id: 1, name: "Plumtek Salem Head Office", contact: "Dealer Network Manager", phone: "+91 73730 73333", address: "Edappadi Main Road, Kuppanoor (P.O), Sankari (T.K), Pin: 637 301", state: "Tamil Nadu", city: "Salem", type: "Branch", products: "All Products" },
  { id: 2, name: "Plumtek Chennai Branch", contact: "Branch Manager", phone: "+91 92800 43815", address: "Anna Salai, Teynampet, Chennai, Pin: 600 018", state: "Tamil Nadu", city: "Chennai", type: "Branch", products: "All Products" },
  { id: 3, name: "Plumtek Coimbatore Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Race Course Road, Coimbatore, Pin: 641 018", state: "Tamil Nadu", city: "Coimbatore", type: "Branch", products: "All Products" },
  { id: 4, name: "Plumtek Madurai Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Bypass Road, Madurai, Pin: 625 010", state: "Tamil Nadu", city: "Madurai", type: "Branch", products: "All Products" },
  { id: 5, name: "Plumtek Trichy Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Lawson's Road, Trichy, Pin: 620 001", state: "Tamil Nadu", city: "Trichy", type: "Branch", products: "All Products" },
  { id: 6, name: "Plumtek Erode Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Brough Road, Erode, Pin: 638 001", state: "Tamil Nadu", city: "Erode", type: "Branch", products: "All Products" },
  { id: 7, name: "Plumtek Bangalore Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Residency Road, Bangalore, Pin: 560 025", state: "Karnataka", city: "Bangalore", type: "Branch", products: "All Products" },
  { id: 8, name: "Plumtek Hubli Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Koppikar Road, Hubli, Pin: 580 020", state: "Karnataka", city: "Hubli", type: "Branch", products: "All Products" },
  { id: 9, name: "Plumtek Ernakulam Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "MG Road, Ernakulam, Pin: 682 011", state: "Kerala", city: "Ernakulam", type: "Branch", products: "All Products" },
  { id: 10, name: "Plumtek Hyderabad Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "SD Road, Secunderabad, Pin: 500 003", state: "Telangana", city: "Secunderabad", type: "Branch", products: "All Products" },
  { id: 11, name: "Plumtek Vijayawada Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "MG Road, Vijayawada, Pin: 520 001", state: "Andhra Pradesh", city: "Vijayawada", type: "Branch", products: "All Products" },
  { id: 12, name: "Plumtek Delhi Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Karol Bagh, New Delhi, Pin: 110 005", state: "Delhi", city: "Delhi", type: "Branch", products: "All Products" },
  { id: 13, name: "Plumtek Kolkata Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Park Street, Kolkata, Pin: 700 016", state: "West Bengal", city: "Kolkata", type: "Branch", products: "All Products" },
  { id: 14, name: "Plumtek Patna Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Exhibition Road, Patna, Pin: 800 001", state: "Bihar", city: "Patna", type: "Branch", products: "All Products" },
  { id: 15, name: "Plumtek Bhubaneswar Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "Janpath, Bhubaneswar, Pin: 751 001", state: "Odisha", city: "Bhubaneswar", type: "Branch", products: "All Products" },
  { id: 16, name: "Plumtek Pune Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "FC Road, Shivajinagar, Pune, Pin: 411 005", state: "Maharashtra", city: "Pune", type: "Branch", products: "All Products" },
  { id: 17, name: "Plumtek Gujarat Branch", contact: "Branch Manager", phone: "+91 73730 73333", address: "C.G. Road, Ahmedabad, Pin: 380 009", state: "Gujarat", city: "Ahmedabad", type: "Branch", products: "All Products" },
  { id: 18, name: "Plumtek Sri Lanka Office", contact: "Country Manager", phone: "+94 11 234 5678", address: "Colombo 03, Sri Lanka", state: "Sri Lanka", city: "Colombo", type: "Branch", products: "All Products" },
];

const STATES = ["All States", ...Array.from(new Set(DEALERS.map((d) => d.state))).sort()];

const typeBadgeClass: Record<string, string> = {
  Branch: "bg-blue-600 text-white",
  Dealer: "bg-emerald-600 text-white",
  Distributor: "bg-violet-600 text-white",
};

const DealerLocator = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = useMemo(() => {
    const base = selectedState === "All States"
      ? DEALERS.map((d) => d.city)
      : DEALERS.filter((d) => d.state === selectedState).map((d) => d.city);
    return ["All Cities", ...Array.from(new Set(base)).sort()];
  }, [selectedState]);

  const filtered = useMemo(() => {
    return DEALERS.filter((d) => {
      const matchState = selectedState === "All States" || d.state === selectedState;
      const matchCity = selectedCity === "All Cities" || d.city === selectedCity;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.state.toLowerCase().includes(q);
      return matchState && matchCity && matchSearch;
    });
  }, [selectedState, selectedCity, searchQuery]);

  const resetFilters = () => {
    setSelectedState("All States");
    setSelectedCity("All Cities");
    setSearchQuery("");
  };

  const hasFilters = selectedState !== "All States" || selectedCity !== "All Cities" || searchQuery;

  return (
    <section className="py-14 sm:py-20 bg-slate-50/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_50%_-100px,rgba(37,99,235,0.05),transparent)] pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-600 text-[11px] font-black uppercase tracking-[0.18em] mb-4">
            <MapPin className="w-3.5 h-3.5" /> Dealer Locator
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-tight mb-3">
            Find a Branch <span className="text-blue-600">Near You</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto font-medium leading-relaxed">
            18+ branches across India and Sri Lanka. Filter by state and city to locate your nearest Plumtek point of contact.
          </p>
        </motion.div>

        {/* Search + Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(15,23,42,0.06)] p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by city, state, or branch name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>

          {/* State Dropdown */}
          <div className="relative min-w-[180px]">
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setSelectedCity("All Cities"); }}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none pr-10"
            >
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="relative min-w-[160px]">
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none pr-10"
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {hasFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 text-sm font-bold transition-colors whitespace-nowrap shrink-0 px-2">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </motion.div>

        {/* Results Count */}
        <p className="text-[13px] text-slate-400 font-medium mb-6">
          Showing <span className="font-bold text-slate-700">{filtered.length}</span> location{filtered.length !== 1 ? "s" : ""}
          {selectedState !== "All States" && <> in <span className="text-blue-600 font-bold">{selectedCity !== "All Cities" ? selectedCity + ", " : ""}{selectedState}</span></>}
        </p>

        {/* Dealer Cards Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={selectedState + selectedCity + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((dealer, i) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 shadow-[0_4px_20px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col gap-4"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className={`ml-auto px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 ${typeBadgeClass[dealer.type]}`}>
                      {dealer.type}
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="font-black text-slate-900 text-[15px] leading-snug mb-0.5">{dealer.name}</h3>
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">{dealer.products}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2.5 text-[13px]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium leading-snug">{dealer.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-600 font-medium">{dealer.contact}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`tel:${dealer.phone}`} className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                        {dealer.phone}
                      </a>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/${dealer.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi, I'm contacting regarding Plumtek products. Branch: " + dealer.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-[13px] py-2.5 rounded-xl transition-all duration-300"
                  >
                    Contact Branch
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-2">No locations found</h3>
              <p className="text-slate-500 text-sm mb-5">Try adjusting your state or city filter.</p>
              <button onClick={resetFilters} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-500 transition-colors">
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default DealerLocator;
