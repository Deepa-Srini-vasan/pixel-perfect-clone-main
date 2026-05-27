import { ArrowRight, Phone, Globe, Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import blueprintBg from "@/assets/3d-assets/blueprint.png";
import pipeFittings from "@/assets/3d-assets/pipe_fittings.png";
import pipeSet from "@/assets/3d-assets/pipe_set.png";

const BlueprintHero = () => {
  return (
    <section className="relative w-full min-h-[800px] bg-[#d35400] overflow-hidden font-sans">
      {/* Blueprint Background */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <img
          src={blueprintBg}
          alt=""
          className="w-full h-full object-cover scale-110 rotate-1"
        />
      </div>

      <div className="container-pipes relative z-10 pt-20 pb-12 flex flex-col h-full min-h-[800px]">
        {/* Top Header Row */}
        <div className="flex justify-between items-start mb-16">
          <div className="bg-white p-4 rounded-sm shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-[#a01a1d] font-black text-2xl tracking-tighter uppercase italic">FLOREX</span>
              <span className="text-[#2d5a27] font-bold text-lg uppercase tracking-widest">GREEN™</span>
            </div>
            <div className="text-[10px] font-bold text-gray-500 tracking-[3px] -mt-1 uppercase">Fit-N-Fit</div>
          </div>

          <div className="text-right text-white">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="text-sm font-bold tracking-wider">7041432278</span>
              <div className="bg-white/10 p-1 rounded-full"><Phone className="w-4 h-4" /></div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs font-medium opacity-80 underline">https://florexgreen.page</span>
              <div className="bg-white/10 p-1 rounded-full"><Globe className="w-4 h-4" /></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 relative z-20">
            <div className="space-y-0 relative">
              <h1 className="text-[#f9c74f] text-[80px] md:text-[120px] font-black leading-[0.8] tracking-tighter uppercase drop-shadow-2xl">
                PIPE
              </h1>
              <h1 className="text-[#f9c74f] text-[80px] md:text-[120px] font-black leading-[0.8] tracking-tighter uppercase drop-shadow-2xl">
                FITTINGS
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="h-2 w-24 bg-white rounded-full" />
                <span className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase">SWR</span>
              </div>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px] select-none">
              {/* Back ambient glows */}
              <div className="absolute inset-0 bg-white/25 blur-[120px] rounded-full scale-75 z-0" />
              
              {/* Main SWR Fittings Image */}
              <div className="relative z-10 animate-float-slow">
                <img
                  src={pipeFittings}
                  alt="SWR Pipe Fittings"
                  className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)] hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Dynamic 3D Pipe Image overlapping on the side! */}
              <div className="absolute -left-12 -bottom-10 w-[55%] z-20 animate-float-delayed">
                <img
                  src={pipeSet}
                  alt="3D SWR Pipe Set"
                  className="w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Social Floating Icons */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 text-white/60">
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-auto border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 bg-white/5 py-4 px-8 rounded-full border border-white/10">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg text-[#d35400] font-black text-2xl">PG</div>
            <div>
              <div className="text-white font-bold tracking-[2px] text-lg uppercase leading-tight">P.CHATTERJEE & SON</div>
              <div className="text-white/40 text-[10px] font-bold uppercase tracking-[1px]">Premium Plumbing Solutions</div>
            </div>
          </div>

          <button className="bg-black text-white px-12 py-5 rounded-sm font-black uppercase tracking-[3px] text-sm hover:bg-[#f9c74f] hover:text-black transition-all duration-500 shadow-2xl group flex items-center gap-4">
            SHOP NOW
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>

          <div className="flex gap-4">
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-lg grayscale opacity-50"><Linkedin className="w-6 h-6" /></div>
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-lg grayscale opacity-50"><Globe className="w-6 h-6" /></div>
          </div>
        </div>
      </div>

      {/* Background Dots Pattern */}
      <div className="absolute left-8 bottom-32 opacity-20 hidden lg:block">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlueprintHero;
