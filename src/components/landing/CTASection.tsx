import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-12 px-8 text-center">
      <div className="max-w-3xl mx-auto p-8 bg-surface-container rounded-2xl border border-white/5 space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <h2 className="font-headline text-3xl font-black leading-tight uppercase">
          YOUR LEGACY{" "}
          <span className="text-primary-container">STARTS HERE.</span>
        </h2>
        <p className="text-on-surface-variant text-sm opacity-70 max-w-lg mx-auto">
          Stop archiving your thoughts in private docs. Give them the stage they
          deserve.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/register"
            className="px-8 py-3 bg-gradient-to-r from-primary-container to-[#7a3000] text-on-primary font-black text-[11px] uppercase tracking-widest hover:shadow-[0_0_25px_rgba(255,107,0,0.35)] hover:scale-105 transition-all rounded"
          >
            SIGN UP FREE
          </Link>
          <Link
            href="/#featured"
            className="px-8 py-3 bg-transparent border-2 border-white/25 text-on-surface font-black text-[11px] uppercase tracking-widest hover:border-white/50 hover:bg-surface-bright transition-all rounded"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
