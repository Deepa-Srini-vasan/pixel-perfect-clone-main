import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { fetchProducts, type ApiProduct } from "@/lib/api";
import { resolveProductImage } from "@/lib/catalog-assets";

const PopularProducts = () => {
  const ref = useRef<HTMLElement>(null);
  const { data } = useQuery<{ products: ApiProduct[] }>({
    queryKey: ["popular-products"],
    queryFn: () => fetchProducts(),
  });
  const products = (data?.products ?? []).slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll("[data-animate]");
            items.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("animate-visible");
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-32">
      <div className="container-pipes">
        <div className="text-center mb-20" data-animate>
          <p className="text-primary text-xs font-bold uppercase tracking-[5px] mb-4">Curated Choice</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">Popular Products</h2>
          <div className="w-20 h-1 bg-primary/20 mx-auto mt-8 flex justify-center">
            <div className="w-10 h-1 bg-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.name} data-animate>
              <ProductCard
                image={resolveProductImage(p.imageKey, p.imageData)}
                name={p.name}
                slug={p.slug}
                category={p.category}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12" data-animate>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[2px] text-foreground hover:text-primary transition-colors group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
