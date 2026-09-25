type SeoMeta = {
  title: string;
  description: string;
  pathname?: string;
};

const DEFAULT_TITLE = "Euro Plumber Tech Private Limited | Plumbing Products & Support";
const DEFAULT_DESCRIPTION =
  "Euro Plumber Tech Private Limited offers dependable plumbing products, concise guidance, and rapid inquiry support for homes, projects, and industrial installations.";

const PAGE_SEO: Record<string, SeoMeta> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: "About Euro Plumber Tech | Plumbing Products & Support",
    description: "Learn about Euro Plumber Tech Private Limited's product range, trusted service approach, and growing client network.",
  },
  "/contact": {
    title: "Contact Euro Plumber Tech | Product Support & Quote Requests",
    description: "Get in touch with Euro Plumber Tech Private Limited for product inquiries, technical support, and quotation requests.",
  },
  "/careers": {
    title: "Careers at Euro Plumber Tech | Join Our Team",
    description: "Explore current careers at Euro Plumber Tech Private Limited and build your future with a trusted plumbing partner.",
  },
  "/shop": {
    title: "Shop Euro Plumber Tech Products | Valves, Pipes & Fittings",
    description: "Browse dependable plumbing products, valves, fittings, and piping solutions from Euro Plumber Tech Private Limited.",
  },
  "/catalogs": {
    title: "Euro Plumber Tech Catalogs | Digital Product & Price Lists",
    description: "View Euro Plumber Tech Private Limited digital catalogs, technical brochures, and price lists for plumbing products.",
  },
};

const getSiteUrl = () => {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://www.plumtek.com";
};

const resolveSeo = (pathname: string): SeoMeta => {
  const pageMeta = PAGE_SEO[pathname] ?? PAGE_SEO["/"];
  return {
    ...pageMeta,
    pathname,
  };
};

export const applySeo = (pathname: string) => {
  const seo = resolveSeo(pathname);
  const canonicalUrl = `${getSiteUrl()}${pathname === "/" ? "/" : pathname}`;

  document.title = seo.title;

  const setMeta = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  const setProperty = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("property", property);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  const setLink = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement("link");
      element.setAttribute("rel", rel);
      document.head.appendChild(element);
    }
    element.setAttribute("href", href);
  };

  setMeta("description", seo.description);
  setMeta("robots", "index,follow,max-image-preview:large");
  setProperty("og:title", seo.title);
  setProperty("og:description", seo.description);
  setProperty("og:url", canonicalUrl);
  setProperty("og:type", "website");
  setProperty("twitter:title", seo.title);
  setProperty("twitter:description", seo.description);
  setLink("canonical", canonicalUrl);
};
