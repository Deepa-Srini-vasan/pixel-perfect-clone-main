import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  slug?: string;
  category?: string;
  shortDescription?: string;
}

const ProductCard = memo(({ image, name, slug, category, shortDescription }: ProductCardProps) => {
  const link = slug ? `/product/${slug}` : "/shop";

  const desc =
    shortDescription ||
    `Premium industrial-grade product engineered for reliability and long-term performance.`;

  return (
    <article
      data-testid={`product-card-${slug}`}
      className="
        group relative flex flex-col w-full bg-white
        rounded-2xl overflow-hidden
        border border-slate-100
        shadow-[0_2px_16px_rgba(15,23,42,0.06)]
        hover:shadow-[0_24px_64px_rgba(15,23,42,0.13)]
        hover:-translate-y-2
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        will-change-transform
      "
    >
      {/* ── Image Hero ── */}
      <Link
        to={link}
        tabIndex={-1}
        aria-hidden
        className="relative block overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
        style={{ paddingBottom: "68%" }}
      >
        {/* Soft radial glow behind product */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-blue-100/60 blur-3xl" />
        </div>

        {/* Product image */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          data-testid="product-image"
          className="
            absolute inset-0 w-full h-full
            object-contain p-8
            mix-blend-multiply
            transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.08]
          "
        />

        {/* Hover overlay — subtle blue wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-2">

        {/* Category */}
        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-500">
          {category ?? "Industrial"}
        </span>

        {/* Product name */}
        <Link
          to={link}
          data-testid="product-name"
          className="
            font-bold text-[15px] leading-snug text-slate-900
            hover:text-blue-600 transition-colors duration-200
            line-clamp-2
          "
        >
          {name}
        </Link>

        {/* Short description */}
        <p className="text-slate-400 text-[12.5px] leading-relaxed line-clamp-2 mt-0.5 flex-1">
          {desc}
        </p>

        {/* CTA */}
        <Link
          to={link}
          data-testid="view-product-btn"
          className="
            mt-4 inline-flex items-center justify-center gap-2
            w-full px-5 py-3 rounded-xl
            text-[13px] font-bold tracking-wide
            bg-slate-900 text-white
            hover:bg-blue-600
            shadow-[0_4px_14px_rgba(15,23,42,0.14)]
            hover:shadow-[0_8px_24px_rgba(37,99,235,0.30)]
            transition-all duration-300
          "
        >
          View Product
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
