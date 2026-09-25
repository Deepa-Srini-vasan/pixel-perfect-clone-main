declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, target: string | number | Date | undefined, parameters?: Record<string, unknown>) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

export const isAnalyticsEnabled = () => Boolean(GA_MEASUREMENT_ID);

export const initializeAnalytics = () => {
  if (!isAnalyticsEnabled() || typeof window === "undefined") return;

  const scriptId = "ga-script";
  if (document.getElementById(scriptId)) return;

  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });
};

export const trackPageView = (path: string) => {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    page_referrer: document.referrer || undefined,
  });
};

export const trackEvent = (action: string, category = "engagement", label?: string) => {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });
};
