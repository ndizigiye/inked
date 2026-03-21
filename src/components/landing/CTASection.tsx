import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-32 px-12 text-center">
      <div className="max-w-4xl mx-auto p-16 bg-surface-container rounded-3xl border-t border-primary-container/20 space-y-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <h2 className="font-headline text-5xl font-black">
          YOUR LEGACY{" "}
          <span className="text-primary-container">STARTS HERE.</span>
        </h2>
        <p className="text-on-surface-variant text-xl opacity-70">
          Stop archiving your thoughts in private docs. Give them the stage they
          deserve.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register"
            className="px-12 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest hover:scale-105 transition-all rounded"
          >
            SIGN UP FREE
          </Link>
          <Link
            href="/#featured"
            className="px-12 py-4 bg-transparent border-2 border-outline-variant text-on-surface font-bold uppercase tracking-widest hover:bg-surface-bright transition-all rounded"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
