import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal], [data-animate]";

export const useScrollReveal = () => {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    if (elements.length === 0) {
      return;
    }

    const markVisible = (element: HTMLElement) => {
      const delay = element.dataset.revealDelay;

      if (delay) {
        element.style.setProperty("--reveal-delay", `${delay}ms`);
      }

      if (element.hasAttribute("data-animate")) {
        element.classList.add("animate-visible");
      }

      if (element.hasAttribute("data-reveal")) {
        element.classList.add("is-visible");
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach(markVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          markVisible(element);
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((element) => {
      const delay = element.dataset.revealDelay;

      if (delay) {
        element.style.setProperty("--reveal-delay", `${delay}ms`);
      }

      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};