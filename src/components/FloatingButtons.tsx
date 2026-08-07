import { ChevronUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import AIChatbot from "./AIChatbot";

const FloatingButtons = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3.5 pointer-events-none">
            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 pointer-events-auto group relative ${
                    showBackToTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
                }`}
                aria-label="Back to top"
            >
                <ChevronUp className="w-6 h-6" />
                <span className="absolute right-full mr-4 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Back to Top
                </span>
            </button>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/6379665268"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 pointer-events-auto group relative"
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span className="absolute right-full mr-4 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    WhatsApp Us
                </span>
            </a>

            {/* Chatbot Launcher (Bottom position) */}
            <div className="pointer-events-auto">
                <AIChatbot />
            </div>
        </div>
    );
};

export default FloatingButtons;
