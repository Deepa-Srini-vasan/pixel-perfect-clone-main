import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import visionImg from "@/assets/3d-assets/hero1.png";
import missionImg from "@/assets/3d-assets/pipe_set.png";

const banners = [
  {
    title: "Our Mission",
    desc: "To provide complete bath solutions for domestic and industrial plumbing needs with products that combine quality, innovation, and affordability.",
    bg: "bg-primary",
    image: missionImg,
    link: "/about",
    linkText: "Learn More",
  },
  {
    title: "Our Vision",
    desc: "To be India's most trusted plumbing solutions provider, known for quality, reliability, and customer satisfaction.",
    bg: "bg-foreground",
    image: visionImg,
    link: "/about",
    linkText: "Read More",
  },
];

const PromoBanners = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll("[data-animate]");
            items.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("animate-visible");
              }, i * 200);
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
    <section ref={ref} className="py-24">
      <div className="container-pipes grid grid-cols-1 md:grid-cols-2 gap-8">
        {banners.map((b) => (
          <div
            key={b.title}
            data-animate
            className={`${b.bg} text-primary-foreground overflow-hidden group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <span className="text-primary-foreground/60 text-xs font-bold uppercase tracking-[3px] mb-3">Our Focus</span>
                <h4 className="font-heading font-bold text-3xl mb-4 leading-tight">
                  {b.title}
                </h4>
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-8">
                  {b.desc}
                </p>
                <Link
                  to={b.link}
                  className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[2px] text-primary-foreground hover:text-white transition-all group/link"
                >
                  {b.linkText}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                </Link>
              </div>
              <div className="flex items-center justify-center bg-gray-100 overflow-hidden relative min-h-[250px] lg:min-h-0">
                <img
                  src={b.image}
                  alt={b.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
