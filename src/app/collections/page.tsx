import Link from "next/link";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="space-y-8 max-w-lg">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-24 h-24 mx-auto text-primary-container/20 fill-current"
          >
            <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
          </svg>
          <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface uppercase">
            Collections are{" "}
            <span className="text-primary-container">Coming Soon.</span>
          </h1>
          <p className="text-on-surface-variant text-lg opacity-70">
            Curate your favourite manuscripts into themed reading lists. We&apos;re
            putting the finishing touches on this feature.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all"
            >
              Browse Stories
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
