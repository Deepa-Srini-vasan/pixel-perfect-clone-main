import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import bgImage3d from "@/assets/3d-assets/hero1.png";
import { fetchProducts, type ApiProduct } from "@/lib/api";
import { resolveProductImage } from "@/lib/catalog-assets";

const InnovativeProducts = () => {
  const ref = useRef<HTMLElement>(null);
  const { data } = useQuery<{ products: ApiProduct[] }>({
    queryKey: ["innovative-products"],
    queryFn: () => fetchProducts(),
  });
  const products = (data?.products ?? []).filter((product) => product.isFeatured).slice(0, 2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll("[data-animate]");
            items.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("animate-visible");
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-right-bottom opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage3d})`, backgroundRepeat: 'no-repeat' }}
      />
      <div className="container-pipes relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div className="pr-0 lg:pr-12">
            <p className="text-primary text-xs font-bold uppercase tracking-[5px] mb-6" data-animate>
              plumbing excellence
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-10 leading-[1.05] tracking-tighter" data-animate>
              Innovative <br />
              <span className="text-foreground/80">Solutions</span>
            </h2>
            <div
              className="w-24 h-1.5 bg-primary mb-12 rounded-full"
              data-animate
            />
            <p
              className="text-muted-foreground leading-relaxed text-xl mb-8 font-medium max-w-lg"
              data-animate
            >
              We provide top-quality plumbing products designed with modern
              aesthetics and high-performance functionality.
            </p>
            <div className="flex items-start gap-6 mb-12" data-animate>
              <div className="w-1 bg-primary/10 h-full self-stretch rounded-full" />
              <p className="text-muted-foreground leading-relaxed text-lg italic">
                From contemporary faucets to luxury bathtubs, every product
                is crafted to elevate your experience while ensuring
                durability and performance.
              </p>
            </div>
            <div data-animate>
              <Link
                to="/shop"
                className="inline-flex items-center gap-4 bg-foreground text-background px-10 py-5 text-sm font-semibold uppercase tracking-[2px] hover:bg-primary hover:text-primary-foreground transition-all duration-500 rounded-full shadow-lg"
              >
                Go to Catalogue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-animate>
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                image={resolveProductImage(product.imageKey, product.imageData)}
                name={product.name}
                slug={product.slug}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovativeProducts;
