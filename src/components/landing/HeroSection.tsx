import Link from "next/link";
import { IMG } from "@/lib/placeholders";

export function HeroSection() {
  return (
    <section className="relative min-h-[900px] flex items-center justify-center overflow-hidden px-6">
      <div className="hero-gradient absolute inset-0 z-0" />

      {/* Asymmetric floating card — left */}
      <div className="absolute -left-20 bottom-20 w-64 h-80 bg-surface-container-low p-6 rounded-xl rotate-[-12deg] shadow-2xl hidden lg:block opacity-40 pointer-events-none">
        <div className="w-full h-40 bg-surface-container rounded-lg mb-4 overflow-hidden">
          <img src={IMG.scenePen} alt="Fountain pen and paper" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-3/4 bg-primary-container/20 rounded" />
          <div className="h-2 w-full bg-primary-container/20 rounded" />
          <div className="h-2 w-1/2 bg-primary-container/20 rounded" />
        </div>
      </div>

      {/* Asymmetric floating card — right */}
      <div className="absolute -right-10 top-40 w-72 h-48 bg-surface-container-high p-6 rounded-xl rotate-[8deg] shadow-2xl hidden lg:block opacity-30 pointer-events-none">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-primary-container/40" />
          <div className="space-y-2 flex-1">
            <div className="h-2 w-1/2 bg-on-surface/20 rounded" />
            <div className="h-2 w-full bg-on-surface/10 rounded" />
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl w-full text-center space-y-12">
        <div className="space-y-6">
          <span className="text-primary font-label uppercase tracking-[0.4em] text-sm font-bold block">
            The Digital Manuscript
          </span>
          <h1 className="font-headline text-6xl md:text-9xl font-black text-on-surface tracking-tighter leading-[0.9] text-glow">
            WRITE <span className="text-primary-container">BOLD.</span>
            <br />
            LIVE FOREVER.
          </h1>
          <p className="max-w-2xl mx-auto font-body text-xl text-on-surface-variant leading-relaxed opacity-80">
            Join the next evolution of digital storytelling. A high-octane
            editorial space where every word is a performance and every story is
            a masterpiece.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/register"
            className="w-full sm:w-auto px-12 py-5 bg-gradient-to-br from-primary-container to-on-primary-fixed-variant text-on-primary font-headline font-black text-xl rounded-md hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] transition-all active:scale-95 uppercase"
          >
            START WRITING
          </Link>
          <Link
            href="/#featured"
            className="w-full sm:w-auto px-12 py-5 bg-surface-container-highest text-primary font-headline font-bold text-xl rounded-md border border-outline-variant/10 hover:bg-surface-bright transition-all uppercase"
          >
            EXPLORE MANUSCRIPTS
          </Link>
        </div>
      </div>
    </section>
  );
}
