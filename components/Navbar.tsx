"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const links = [
    { label: "Shop", href: "/#shop" },
    { label: "Custom Order", href: "/#order" },
    { label: "Track Order", href: "/track-order" },
    { label: "Our Story", href: "/#story" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  function startLogoPress() {
    pressTimer.current = setTimeout(() => {
      router.push("/admin/login");
    }, 900);
  }

  function stopLogoPress() {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F3] flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-2xl text-[#9B8E84]"
          >
            ✕
          </button>

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-4xl font-light text-[#2E1B0E] hover:text-[#C4714B] transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 py-5 bg-[#FAF8F3]/95 backdrop-blur-xl border-b border-[#C4714B]/15">
        <a
          href="/"
          onMouseDown={startLogoPress}
          onMouseUp={stopLogoPress}
          onMouseLeave={stopLogoPress}
          onTouchStart={startLogoPress}
          onTouchEnd={stopLogoPress}
        >
          <h1 className="font-serif text-[27px] md:text-[30px] leading-none tracking-[0.03em]">
            <span className="font-medium text-[#C4714B]">Loop</span>
            <span className="italic font-semibold text-[#2E1B0E]">belle</span>
          </h1>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.16em] text-[#6B4A32] hover:text-[#C4714B] transition"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/#order"
            className="rounded-full bg-[#C4714B] px-7 py-3 text-[12px] uppercase tracking-[0.12em] font-semibold text-white hover:bg-[#A05530] transition"
          >
            Order Now
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className="w-6 h-[1.5px] bg-[#2E1B0E]" />
          <span className="w-6 h-[1.5px] bg-[#2E1B0E]" />
          <span className="w-6 h-[1.5px] bg-[#2E1B0E]" />
        </button>
      </nav>
    </>
  );
}