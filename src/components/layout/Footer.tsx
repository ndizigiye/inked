export function Footer() {
  return (
    <footer className="bg-[#131313] w-full py-8 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 space-y-4 md:space-y-0 w-full max-w-[1920px] mx-auto">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-lg font-black text-[#ffb693] opacity-50 uppercase tracking-tighter font-headline">
            inked
          </span>
          <p className="font-label text-[9px] uppercase tracking-[0.2em] text-[#9ccaff] opacity-40 mt-1">
            © 2024 inked. The Digital Manuscript.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 font-label text-[9px] uppercase tracking-widest font-black">
          <a
            href="#"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Guidelines
          </a>
          <a
            href="#"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Help
          </a>
        </div>

        <div className="flex gap-4">
          <span className="material-symbols-outlined text-[#ffb693] opacity-40 hover:opacity-100 cursor-pointer transition-opacity text-[18px]">
            share
          </span>
          <span className="material-symbols-outlined text-[#ffb693] opacity-40 hover:opacity-100 cursor-pointer transition-opacity text-[18px]">
            language
          </span>
        </div>
      </div>
    </footer>
  );
}
