import Link from "next/link";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="space-y-8 max-w-lg">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-20 h-20 mx-auto text-primary-container/20 fill-current">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
          </svg>
          <h1 className="font-headline text-4xl font-black tracking-tighter uppercase">
            Terms of <span className="text-primary-container">Service</span>
          </h1>
          <p className="text-on-surface-variant text-lg opacity-70">
            We&apos;re drafting our terms. Check back soon.
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
