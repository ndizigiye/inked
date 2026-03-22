import Link from "next/link";
import { IMG } from "@/lib/placeholders";

export function HeroSection() {
  return (
    <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden px-6 py-8">
      <div className="hero-gradient absolute inset-0 z-0" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-4">
        <div className="space-y-2">
          <span className="text-primary font-label uppercase tracking-[0.5em] text-[10px] font-black block">
            The Digital Manuscript
          </span>
          <h1 className="font-headline text-4xl md:text-7xl font-black text-on-surface tracking-tighter leading-[0.9] text-glow">
            WRITE <span className="text-primary-container">BOLD.</span>
            <br />
            LIVE FOREVER.
          </h1>
          <p className="max-w-md mx-auto font-body text-sm text-on-surface-variant leading-relaxed opacity-70">
            Join the next evolution of digital storytelling. A high-octane
            editorial space where every word is a performance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-br from-primary-container to-[#7a3000] text-on-primary font-headline font-black text-sm rounded hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] transition-all active:scale-95 uppercase"
          >
            START WRITING
          </Link>
          <Link
            href="/#featured"
            className="w-full sm:w-auto px-8 py-3 bg-surface-container-highest/50 text-primary font-headline font-bold text-sm rounded border border-outline-variant/10 hover:bg-surface-bright transition-all uppercase"
          >
            EXPLORE MANUSCRIPTS
          </Link>
        </div>
      </div>

      {/* Subtle floating card — left */}
      <div className="absolute -left-10 bottom-4 w-40 h-52 bg-surface-container-low p-4 rounded-lg rotate-[-8deg] shadow-2xl hidden lg:block opacity-20 border border-white/5">
        <div className="w-full h-24 bg-surface-container rounded mb-3 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.scenePen} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-3/4 bg-primary-container/20 rounded" />
          <div className="h-1.5 w-full bg-primary-container/20 rounded" />
        </div>
      </div>
    </section>
  );
}
