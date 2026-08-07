import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Search, X, Filter, LayoutGrid, ChevronLeft, ChevronRight, ListTree, TrendingUp, ArrowDownUp, Droplet, Wrench, Layers, Package } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import { fetchCategories, fetchProducts, type ApiProduct, type PaginatedProductsResponse } from "@/lib/api";
import type { Category } from "@/lib/category";
import { categoryImageLookup, resolveProductImage, normalizeCategoryName } from "@/lib/catalog-assets";
import { buildCategoryTree, type CategoryTreeItem } from "@/lib/category-tree";
import { motion, AnimatePresence } from "framer-motion";

const CategoryButton = ({
  category,
  depth,
  activeCategory,
  categoryCount,
  onSelect,
  isExpanded,
  onToggle,
  expandedCategoryIds,
}: {
  category: CategoryTreeItem;
  depth: number;
  activeCategory: string;
  categoryCount: (category: string) => number;
  onSelect: (category: string) => void;
  isExpanded: boolean;
  onToggle: (categoryId: number) => void;
  expandedCategoryIds: Set<number>;
}) => {
  const hasChildren = category.children.length > 0;

  return (
    <>
      <div
        onClick={() => {
          onSelect(category.category.name);
          if (hasChildren) {
            onToggle(category.category.id);
          }
        }}
        className={`group flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${
          activeCategory === category.category.name
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
        }`}
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            onSelect(category.category.name);
          }}
          type="button"
          className="flex-1 text-left"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            {getCategoryIcon(category.category.name, activeCategory === category.category.name)}
            <span className="truncate pr-2">{normalizeCategoryName(category.category.name)}</span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
            activeCategory === category.category.name ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
          }`}>
            {categoryCount(category.category.name) ?? 0}
          </span>
          {hasChildren ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggle(category.category.id);
              }}
              className={`rounded-full p-1 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              aria-label={isExpanded ? "Collapse subcategories" : "Expand subcategories"}
            >
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          ) : null}
        </div>
      </div>
      {hasChildren && isExpanded
        ? category.children.map((child) => (
            <CategoryButton
              key={child.category.id}
              category={child}
              depth={depth + 1}
              activeCategory={activeCategory}
              categoryCount={categoryCount}
              onSelect={onSelect}
              isExpanded={expandedCategoryIds.has(child.category.id)}
              onToggle={onToggle}
              expandedCategoryIds={expandedCategoryIds}
            />
          ))
        : null}
    </>
  );
};

const getCategoryIcon = (category: string, isActive: boolean) => {
  const iconClass = `w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white/80' : 'text-slate-400 group-hover:text-blue-500'}`;
  if (category === "All categories") return <LayoutGrid className={iconClass} />;
  
  const name = category.toLowerCase();
  if (name.includes('pipe') || name.includes('tube') || name.includes('hose')) return <Layers className={iconClass} />;
  if (name.includes('fitting') || name.includes('hardware') || name.includes('accessories')) return <Wrench className={iconClass} />;
  if (name.includes('valve') || name.includes('tap') || name.includes('water') || name.includes('tank')) return <Droplet className={iconClass} />;
  return <Package className={iconClass} />;
};

const LIMIT = 24;

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All categories");
  const [sortBy, setSortBy]       = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<number>>(new Set());

  const location = useLocation();

  /* ── Parse global search param ── */
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const s = p.get("search");
    if (s) { setSearchQuery(s); setCurrentPage(1); }
  }, [location.search]);

  /* ── Reset to page 1 on any filter change ── */
  useEffect(() => { setCurrentPage(1); }, [activeCategory, sortBy, searchQuery]);

  /* ── Lock body scroll when mobile drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileFilterOpen]);

  const { data, isLoading: productsLoading } = useQuery({
    queryKey: ["shop-products", activeCategory, searchQuery, sortBy, currentPage] as const,
    queryFn: () => fetchProducts({
      search: searchQuery || undefined,
      category: activeCategory === "All categories" ? undefined : activeCategory,
      page: currentPage,
      limit: LIMIT,
      sort: sortBy as any,
    }),
    placeholderData: (prev: PaginatedProductsResponse | undefined) => prev,
    staleTime: 1000 * 60 * 2,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["shop-categories"],
    queryFn:  () => fetchCategories(),
    staleTime: 1000 * 60 * 10,
  });

  const products      = data?.products      ?? [];
  const total         = data?.total         ?? 0;
  const totalPages    = data?.totalPages    ?? 1;
  const categoryEntries = categoriesData?.categories ?? [];

  const categoryTree = useMemo(() => buildCategoryTree(categoryEntries as Category[]), [categoryEntries]);

  const toggleCategoryExpansion = (categoryId: number) => {
    setExpandedCategoryIds((current) => {
      const next = new Set(current);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const categories = ["All categories", ...categoryEntries.map((e) => e.name)];

  /* ── Category counts come from server categories endpoint ── */
  const categoryCount = useCallback((cat: string) => {
    if (cat === "All categories") return total;
    return categoryEntries.find((e) => e.name === cat)?.count ?? 0;
  }, [categoryEntries, total]);

  const clearFilters = useCallback(() => {
    setActiveCategory("All categories");
    setSearchQuery("");
    setSortBy("latest");
    setCurrentPage(1);
    setMobileFilterOpen(false);
  }, []);

  const activeFilterLabel = activeCategory === "All categories" ? "All" : normalizeCategoryName(activeCategory);

  /* ── Pagination helpers ── */
  const goToPage = (p: number) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <TopBar />
      <Header />
      <PageBanner
        title="Plumtek Product Store"
        eyebrow="OFFICIAL CATALOG STORE"
        subtitle="Explore our full collection of PPR pipes, fittings, faucets, hoses, and industrial valves. Filter by category, price, and technical specs."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Store" }]}
        ctaText="GO TO CATALOGUE"
        ctaLink="/catalogs"
      />
      
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="container-pipes flex flex-col lg:flex-row gap-8">
            
            {/* DESKTOP SIDEBAR */}
            <aside 
              className={`hidden lg:block sticky top-24 self-start h-fit max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden hide-scrollbar z-10 bg-white rounded-3xl border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-shrink-0 transition-[width] duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[80px]' : 'w-[320px]'}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  {!isSidebarCollapsed ? (
                    <motion.h2 
                      key="full-title"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, position: "absolute" }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 font-extrabold text-lg text-slate-900 whitespace-nowrap"
                    >
                      <Filter className="h-5 w-5 text-blue-600 shrink-0" />
                      Filters
                    </motion.h2>
                  ) : (
                    <motion.div
                      key="icon-title"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0, position: "absolute" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Filter className="h-6 w-6 text-blue-600 mx-auto cursor-pointer" onClick={() => setIsSidebarCollapsed(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isSidebarCollapsed ? (
                  <motion.div
                    key="collapsed-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-4 mt-2"
                  >
                    <button 
                      title="Search" 
                      onClick={() => setIsSidebarCollapsed(false)} 
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                    
                    <div className="w-6 h-px bg-slate-200 my-1 shrink-0" />
                    
                    {categories.map((category) => (
                      <button
                        key={category}
                        title={category === "All categories" ? "All Products" : normalizeCategoryName(category)}
                        onClick={() => setActiveCategory(category)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                          activeCategory === category
                            ? "bg-blue-600 shadow-md shadow-blue-600/20"
                            : "bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        {getCategoryIcon(category, activeCategory === category)}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap"
                  >
                    {(searchQuery || activeCategory !== "All categories" || sortBy !== "latest") && (
                      <button 
                        onClick={clearFilters} 
                        className="mb-6 w-full inline-flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 transition-colors hover:text-red-500 bg-slate-50 hover:bg-red-50 px-3 py-2.5 rounded-xl" 
                        type="button"
                      >
                        Clear All Filters
                      </button>
                    )}

                    {/* Search */}
                    <div className="mb-8">
                      <div className="relative group">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          placeholder="Search products..."
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-8">
                      <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400"><ListTree className="w-3.5 h-3.5 text-blue-500/70" /> Categories</h3>
                      <div className="space-y-1.5">
                        <button
                          key="all-categories"
                          onClick={() => setActiveCategory("All categories")}
                          type="button"
                          className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${
                            activeCategory === "All categories"
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold transform scale-[1.02]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            {getCategoryIcon("All categories", activeCategory === "All categories")}
                            <span className="truncate pr-2">All Products</span>
                          </div>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            activeCategory === "All categories" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            {total}
                          </span>
                        </button>
                        {categoryTree.map((category) => (
                          <CategoryButton
                            key={category.category.id}
                            category={category}
                            depth={0}
                            activeCategory={activeCategory}
                            categoryCount={categoryCount}
                            onSelect={setActiveCategory}
                            isExpanded={expandedCategoryIds.has(category.category.id)}
                            onToggle={toggleCategoryExpansion}
                            expandedCategoryIds={expandedCategoryIds}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Popular Ranges */}
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400"><TrendingUp className="w-3.5 h-3.5 text-blue-500/70" /> Popular Ranges</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {categoryEntries.slice(0, 4).map((category) => (
                          <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            type="button"
                            className="group rounded-2xl border border-slate-100 bg-white p-3 transition-all hover:border-blue-200 hover:shadow-md"
                          >
                            <div className="mb-3 aspect-square overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-2">
                              <img
                                src={categoryImageLookup.get(category.name) ?? categoryImageLookup.get("Hoses")}
                                alt={normalizeCategoryName(category.name)}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                              />
                            </div>
                            <p className="line-clamp-2 text-xs font-bold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors whitespace-normal">
                              {normalizeCategoryName(category.name)}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 z-0">
              
              {/* MOBILE FILTER TRIGGER */}
              <div className="lg:hidden sticky top-[4.5rem] z-40 mb-6">
                <button 
                  type="button" 
                  onClick={() => setMobileFilterOpen(true)} 
                  className="w-full flex items-center justify-between bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Filter className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-bold text-slate-900">Filters & Search</span>
                      <span className="text-xs text-slate-500">{activeFilterLabel} &bull; {total} items</span>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              {/* MOBILE FILTER MODAL/DRAWER */}
              <AnimatePresence>
                {mobileFilterOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setMobileFilterOpen(false)}
                      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
                    />
                    <motion.div 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl z-50 lg:hidden flex flex-col shadow-2xl overflow-hidden"
                    >
                      <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <h2 className="font-extrabold text-xl flex items-center gap-2">
                          <Filter className="h-5 w-5 text-blue-600" /> Filters
                        </h2>
                        <button 
                          onClick={() => setMobileFilterOpen(false)} 
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div>
                          <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Search</label>
                          <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                              value={searchQuery}
                              onChange={(event) => setSearchQuery(event.target.value)}
                              placeholder="Search products..."
                              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400"><ListTree className="w-3.5 h-3.5 text-blue-500/70" /> Categories</label>
                          <div className="space-y-2">
                            <button
                              key="all-categories-mobile"
                              onClick={() => setActiveCategory("All categories")}
                              type="button"
                              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                                activeCategory === "All categories"
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                  : "bg-slate-50 border border-slate-200 text-slate-600"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {getCategoryIcon("All categories", activeCategory === "All categories")}
                                All Products
                              </div>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                {total}
                              </span>
                            </button>
                            {categoryTree.map((category) => (
                              <CategoryButton
                                key={category.category.id}
                                category={category}
                                depth={0}
                                activeCategory={activeCategory}
                                categoryCount={categoryCount}
                                onSelect={setActiveCategory}
                                isExpanded={expandedCategoryIds.has(category.category.id)}
                                onToggle={toggleCategoryExpansion}
                                expandedCategoryIds={expandedCategoryIds}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400"><ArrowDownUp className="w-3.5 h-3.5 text-blue-500/70" /> Sort By</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: "latest", label: "Latest Arrivals" },
                              { id: "name-asc", label: "Name: A to Z" },
                              { id: "name-desc", label: "Name: Z to A" },
                            ].map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setSortBy(option.id)}
                                className={`px-4 py-3 rounded-xl text-sm font-semibold border ${
                                  sortBy === option.id 
                                    ? "border-blue-600 bg-blue-50 text-blue-700" 
                                    : "border-slate-200 bg-white text-slate-600"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-4">
                        <button 
                          onClick={clearFilters}
                          className="py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          Clear All
                        </button>
                        <button 
                          onClick={() => setMobileFilterOpen(false)}
                          className="py-3.5 rounded-xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                        >
                          Show Results
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* TOP HEADER RESULTS & SORT (DESKTOP) */}
              <div className="hidden lg:flex mb-8 items-center justify-between rounded-3xl border border-slate-100 bg-white p-4 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 mb-1">{activeCategory === "All categories" ? "All Products" : activeFilterLabel}</h1>
                  <p className="text-sm font-medium text-slate-500">
                    Showing{" "}
                    <span className="text-blue-600 font-bold">
                      {productsLoading ? "…" : `${(currentPage - 1) * LIMIT + 1}–${Math.min(currentPage * LIMIT, total)} of ${total}`}
                    </span>{" "}products
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400" htmlFor="shopSortBy">Sort by</label>
                  <div className="relative">
                    <select
                      id="shopSortBy"
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      <option value="latest">Latest Arrivals</option>
                      <option value="name-asc">Alphabetical (A-Z)</option>
                      <option value="name-desc">Alphabetical (Z-A)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* PRODUCT GRID */}
              {productsLoading ? (
                <div 
                  className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 ${
                    isSidebarCollapsed 
                      ? 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
                      : 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                  } transition-all duration-300`}
                >
                  {Array.from({ length: LIMIT }).map((_, i) => (
                    <div key={i} className="flex flex-col w-full h-[380px] sm:h-[400px] bg-white rounded-2xl border border-slate-100 p-5 overflow-hidden">
                      <div className="w-full aspect-square bg-slate-50 rounded-xl mb-5 animate-pulse" />
                      <div className="w-1/3 h-3 bg-slate-100 rounded-full mb-3 animate-pulse" />
                      <div className="w-3/4 h-4 bg-slate-100 rounded-full mb-2 animate-pulse" />
                      <div className="w-1/2 h-4 bg-slate-100 rounded-full mb-auto animate-pulse" />
                      <div className="w-full h-10 bg-slate-50 rounded-xl mt-4 animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : null}

              {!productsLoading && products.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-20 text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">No matching products found</h3>
                  <p className="mx-auto max-w-md text-slate-500 font-medium mb-8">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={clearFilters} 
                    className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:-translate-y-1"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              ) : !productsLoading && products.length > 0 ? (
                <>
                  <div 
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 ${
                      isSidebarCollapsed 
                        ? 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
                        : 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                    } transition-all duration-300`}
                  >
                    <AnimatePresence mode="popLayout">
                      {products.map((product) => (
                        <motion.div
                          key={product.slug}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="h-full"
                        >
                          <ProductCard
                            image={resolveProductImage(product.imageKey, product.imageData)}
                            name={product.name}
                            slug={product.slug}
                            category={product.category}
                            shortDescription={product.shortDescription}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* ── PAGINATION BAR ── */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Info */}
                      <p className="text-[13px] text-slate-500 font-medium">
                        Page <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
                        <span className="font-bold text-slate-900">{totalPages}</span>
                        {" "}·{" "}
                        <span className="text-blue-600 font-bold">{total}</span> total products
                      </p>

                      {/* Page buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500
                                     hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none
                                     transition-colors shadow-sm"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {pageNumbers().map((p, i) =>
                          p === "..." ? (
                            <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm font-bold">
                              …
                            </span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => goToPage(p as number)}
                              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                                p === currentPage
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105"
                                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                              }`}
                            >
                              {p}
                            </button>
                          )
                        )}

                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500
                                     hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none
                                     transition-colors shadow-sm"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
