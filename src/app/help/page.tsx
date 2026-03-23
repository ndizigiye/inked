import Link from "next/link";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Help Center" };

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="space-y-8 max-w-lg">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-20 h-20 mx-auto text-primary-container/20 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
          <h1 className="font-headline text-4xl font-black tracking-tighter uppercase">
            Help <span className="text-primary-container">Center</span>
          </h1>
          <p className="text-on-surface-variant text-lg opacity-70">
            Our documentation is on the way.
          </p>
          <Link href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
