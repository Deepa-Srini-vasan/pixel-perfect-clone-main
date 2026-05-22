import { ChevronUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

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
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a
                href="https://wa.me/919842742936"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group relative"
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle className="w-8 h-8 fill-current" />
                <span className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    WhatsApp Us
                </span>
            </a>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group relative ${showBackToTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                    }`}
                aria-label="Back to top"
            >
                <ChevronUp className="w-8 h-8" />
                <span className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Back to Top
                </span>
            </button>
        </div>
    );
};

export default FloatingButtons;
