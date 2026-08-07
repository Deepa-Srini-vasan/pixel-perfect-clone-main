import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, PlayCircle, ZoomIn, FileDown, Phone, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button }   from "@/components/ui/button";
import { toast }    from "@/components/ui/use-toast";
import { fetchProductBySlug, productBySlugQueryKey, submitEnquiry } from "@/lib/api";
import { resolveProductImage } from "@/lib/catalog-assets";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Skeleton loader ── */
const ProductSkeleton = () => (
  <div className="min-h-screen bg-slate-50/50">
    <TopBar />
    <Header />
    <div className="container-pipes py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-slate-100 rounded-3xl animate-pulse" />
        <div className="space-y-4 pt-4">
          <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse" />
          <div className="h-9 w-3/4 bg-slate-100 rounded-full animate-pulse" />
          <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse" />
          <div className="h-4 w-2/3 bg-slate-100 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const ProductDetails = () => {
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: productBySlugQueryKey(slug ?? ""),
    queryFn:  () => fetchProductBySlug(slug ?? ""),
    enabled:  Boolean(slug),
  });
  const product = data?.product;

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    fullName: "", companyName: "", email: "", phone: "", quantity: "", message: "",
  });

  const updateField = (field: keyof typeof quoteForm, value: string) =>
    setQuoteForm((p) => ({ ...p, [field]: value }));

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitEnquiry({
        name:    quoteForm.fullName,
        email:   quoteForm.email,
        phone:   quoteForm.phone,
        subject: `Quote Request – ${product?.name ?? "Product"}`,
        message: [
          `Product: ${product?.name ?? ""}`,
          `Company: ${quoteForm.companyName || "N/A"}`,
          `Quantity: ${quoteForm.quantity}`,
          quoteForm.message ? `\nDetails:\n${quoteForm.message}` : "",
        ].filter(Boolean).join("\n"),
      });
      toast({ title: "Quote request sent ✓", description: `We'll contact you shortly about ${product?.name}.` });
      setIsQuoteOpen(false);
      setQuoteForm({ fullName: "", companyName: "", email: "", phone: "", quantity: "", message: "" });
    } catch {
      toast({ title: "Failed to send", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <ProductSkeleton />;

  if (!product) return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar />
      <Header />
      <PageBanner title="Product Not Found" breadcrumbs={[
        { label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: "Not Found" }
      ]} />
      <main className="py-24">
        <div className="container-pipes text-center">
          <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Product Not Found</h2>
          <p className="text-slate-500 mb-8">This product is unavailable or the link is incorrect.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-blue-600 text-white
                       px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-colors"
          >
            Back to Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  const imageUrl = resolveProductImage(product.imageKey, product.imageData);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar />
      <Header />
      <PageBanner
        title={product.name}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: product.name },
        ]}
      />

      <main className="py-14 lg:py-20 pb-28 lg:pb-20">
        <div className="container-pipes grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Image Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            className="lg:sticky top-24 bg-white rounded-3xl border border-slate-100
                       shadow-[0_4px_32px_rgba(15,23,42,0.06)] p-8 overflow-hidden group"
          >
            <button
              onClick={() => setZoomed(!zoomed)}
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-white border border-slate-100 rounded-full
                         flex items-center justify-center text-slate-400 hover:text-blue-600
                         shadow-sm transition-colors opacity-0 group-hover:opacity-100"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <img
              src={imageUrl}
              alt={product.name}
              loading="eager"
              className={`w-full aspect-square object-contain mix-blend-multiply
                         transition-transform duration-700 ease-out
                         ${zoomed ? "scale-125 cursor-zoom-out" : "group-hover:scale-110 cursor-zoom-in"}`}
            />
          </motion.div>

          {/* ── Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Category label */}
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 mb-3">
              {product.category}
            </p>

            {/* Name */}
            <h1
              className="font-heading font-bold text-slate-900 leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              {product.name}
            </h1>

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-slate-600 text-[17px] font-medium leading-relaxed mb-3">
                {product.shortDescription}
              </p>
            )}

            {/* Long description */}
            {product.description && (
              <p className="text-slate-500 leading-[1.8] mb-8 text-[15px]">
                {product.description}
              </p>
            )}

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <div className="mb-8 space-y-2.5">
                {product.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 text-[14px] text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            )}

            {/* Specs table */}
            {product.specs?.length > 0 && (
              <div className="rounded-2xl border border-slate-100 overflow-hidden mb-10">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-2 text-[13px] ${i < product.specs.length - 1 ? "border-b border-slate-100" : ""}`}
                  >
                    <p className="px-5 py-3.5 text-slate-500 bg-slate-50 font-medium">{spec.label}</p>
                    <p className="px-5 py-3.5 text-slate-800 font-semibold bg-white">{spec.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ── PDF Download ── */}
            {(product as any).pdfUrl && (
              <a
                href={(product as any).pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-slate-200 bg-white
                           text-slate-700 font-bold px-5 py-2.5 rounded-xl text-[13px] mb-4
                           transition-all duration-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50"
              >
                <FileDown className="w-4 h-4 text-blue-600" />
                Download Technical PDF
              </a>
            )}

            <a
              href={`https://wa.me/6379665268?text=${encodeURIComponent(
                `Hi, I'm interested in ${product.name} (${product.category}). Please share details and availability.`
              )}`}
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).gtag) {
                  (window as any).gtag("event", "whatsapp_inquiry_click", {
                    event_category: "Inquiry",
                    event_label: product.name,
                  });
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-emerald-200 bg-emerald-50
                         text-emerald-700 font-bold px-5 py-2.5 rounded-xl text-[13px] mb-6
                         transition-all duration-200 hover:bg-emerald-100"
            >
              <Phone className="w-4 h-4" />
              Ask on WhatsApp
            </a>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {product.videoUrl ? (
                <a
                  href={product.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 border border-blue-200 bg-blue-50
                             text-blue-700 font-bold px-7 py-3.5 rounded-full text-[14px]
                             transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-100"
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch Installation Video
                </a>
              ) : null}

              {/* Quote Dialog */}
              <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500
                               text-white font-bold px-8 py-3.5 rounded-full
                               shadow-[0_8px_24px_-8px_rgba(37,99,235,0.5)]
                               hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.6)]
                               transition-all duration-300 hover:-translate-y-0.5 text-[14px]"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </DialogTrigger>

                <DialogContent className="w-[92vw] sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-4 sm:p-6">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold">Request a Quote</DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">
                      Submit your requirements and our team will contact you with pricing.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-3.5 sm:gap-4 mt-2">
                    {/* Selected product */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 sm:px-4 sm:py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-0.5">
                        Selected Product
                      </p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-slate-800">{product.name}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="grid gap-1.5">
                        <label className="text-[12px] sm:text-[13px] font-semibold text-slate-700" htmlFor="fullName">Full Name</label>
                        <Input id="fullName" value={quoteForm.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Your name" required />
                      </div>
                      <div className="grid gap-1.5">
                        <label className="text-[12px] sm:text-[13px] font-semibold text-slate-700" htmlFor="company">Company</label>
                        <Input id="company" value={quoteForm.companyName} onChange={(e) => updateField("companyName", e.target.value)} placeholder="Company name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="grid gap-1.5">
                        <label className="text-[12px] sm:text-[13px] font-semibold text-slate-700" htmlFor="email">Email</label>
                        <Input id="email" type="email" value={quoteForm.email} onChange={(e) => updateField("email", e.target.value)} placeholder="name@company.com" required />
                      </div>
                      <div className="grid gap-1.5">
                        <label className="text-[12px] sm:text-[13px] font-semibold text-slate-700" htmlFor="phone">Phone</label>
                        <Input id="phone" type="tel" value={quoteForm.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+91 ..." required />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[12px] sm:text-[13px] font-semibold text-slate-700" htmlFor="qty">Quantity</label>
                      <Input id="qty" value={quoteForm.quantity} onChange={(e) => updateField("quantity", e.target.value)} placeholder="e.g. 250 units" required />
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[12px] sm:text-[13px] font-semibold text-slate-700" htmlFor="msg">Additional Details</label>
                      <Textarea id="msg" value={quoteForm.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Specs, delivery location, timeline..." rows={3} />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={submitting} className="w-full sm:w-auto rounded-full py-3 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500">
                        {submitting ? "Sending…" : "Send Request"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Secondary: Continue browsing */}
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 border border-slate-200 hover:border-blue-200
                           text-slate-600 hover:text-blue-600 bg-white font-bold
                           px-7 py-3.5 rounded-full text-[14px]
                           transition-all duration-300 hover:-translate-y-0.5
                           shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                Continue Browsing
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* ── Mobile Sticky CTA ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50
                   bg-white/95 backdrop-blur-md border-t border-slate-100
                   px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.1)]
                   flex items-center gap-3"
      >
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
            {product.category}
          </span>
          <span className="block text-[13px] font-bold text-slate-900 truncate">
            {product.name}
          </span>
        </div>
        <button
          onClick={() => setIsQuoteOpen(true)}
          className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white
                     px-6 py-3 rounded-full text-[13px] font-bold
                     shadow-[0_4px_16px_rgba(37,99,235,0.35)]
                     transition-all duration-200 active:scale-95"
        >
          Add to Quote
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
