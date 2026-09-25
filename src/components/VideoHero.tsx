import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const VideoHero = () => {
  return (
    <section className="relative w-full h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background Video - Positioned to keep the subject on the right */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-right lg:object-center"
        >
          <source src="/Otter_mascot_rides_water_wave_20260925121034.mp4" type="video/mp4" />
        </video>
        {/* Stronger gradient on the left side to ensure text is readable, fades out before reaching the right subject */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent lg:w-3/4 z-10" />
      </div>

      {/* Content Container - Strictly bound to left half on large screens */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 flex items-center h-full">
        <div className="w-full lg:w-[55%] flex flex-col items-start justify-center text-left pt-20 pb-10 lg:py-0">
          
          {/* Animated Badge */}
          <div className="animate-hero-fade-up mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-blue-100 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Elegant & Economic
            </span>
          </div>

          {/* Main Title - Built with Tailwind to guarantee white text */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 animate-hero-pop drop-shadow-2xl leading-[1.1] tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Plumtek</span> Innovation
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-10 max-w-xl animate-hero-fade-up delay-100 font-medium leading-relaxed drop-shadow-md">
            Engineered for excellence. We deliver unmatched durability, reliability, and precision plumbing solutions for every scale.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto animate-hero-fade-up delay-200">
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 hover:shadow-blue-600/50 focus:outline-none w-full sm:w-auto"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-1 hover:bg-white/10 hover:border-white/40 focus:outline-none w-full sm:w-auto"
            >
              <Play className="mr-2 h-5 w-5 fill-white" />
              Watch Reel
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative badge to hide bottom-right watermark */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-3 pr-5 rounded-2xl shadow-2xl animate-hero-fade-up delay-300">
        <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-sm font-bold tracking-wide">ISO 9001:2015</span>
          <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Certified Quality</span>
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
