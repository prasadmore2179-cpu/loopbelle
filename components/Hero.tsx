import Link from "next/link";
import {
  getWhatsAppLink,
  getInstagramLink,
  getEmailLink,
} from "@/lib/contact";

export default function Hero() {
  const message = `Hi Loopbelle,

I want to explore your crochet collection. Please share available designs and details.`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F7F2EA] px-6 md:px-16 pt-28 grid md:grid-cols-2 items-center">
      <div className="absolute -bottom-28 -right-28 h-[520px] w-[520px] rounded-full bg-[#F0D5C8]/55" />

      <div className="hidden md:block absolute top-[18%] left-1/2 h-[62%] w-px bg-gradient-to-b from-transparent via-[#E6D5BF] to-transparent" />

      <div className="relative z-10 max-w-xl">
        <span className="inline-block rounded-full border border-[#E8A882] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#C4714B]">
          ✦ Handcrafted with love
        </span>

        <h1 className="mt-7 text-[4.2rem] md:text-[5.6rem] font-light leading-[1.08] text-[#2E1B0E]">
          Every loop tells <br />a{" "}
          <span className="italic text-[#C4714B]">story</span>.
        </h1>

        <p className="mt-7 max-w-[440px] text-[16px] leading-[1.85] text-[#6B4A32]">
          Bespoke crochet pieces made with premium yarn — from 
          to playful amigurumi. Ready to ship or made just for you.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/#shop"
            className="rounded-full bg-[#C4714B] px-8 py-3.5 text-[13px] uppercase tracking-[0.1em] font-semibold text-white hover:bg-[#A05530] transition"
          >
            Browse Collection
          </a>

          <a
            href="/#order"
            className="rounded-full border border-[#6B4A32] px-8 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium text-[#2E1B0E] hover:border-[#C4714B] hover:text-[#C4714B] transition"
          >
            Custom Order
          </a>
        </div>

        <div className="mt-5 flex gap-3 text-xs text-[#9B8E84]">
          <a
            href={getWhatsAppLink(message)}
            target="_blank"
            className="hover:text-[#C4714B] transition"
          >
            WhatsApp
          </a>
          <span>·</span>
          <a
            href={getInstagramLink()}
            target="_blank"
            className="hover:text-[#C4714B] transition"
          >
            Instagram DM
          </a>
          <span>·</span>
          <a
            href={getEmailLink("Loopbelle enquiry", message)}
            className="hover:text-[#C4714B] transition"
          >
            Email
          </a>
        </div>
      </div>

      <div className="relative z-10 hidden md:grid grid-cols-2 grid-rows-2 gap-4 p-4">
        <Link
          href="/products?type=ready"
          className="relative row-span-2 min-h-[420px] rounded-[1.5rem] bg-[#F0D5C8] flex flex-col items-center justify-center hover:-translate-y-1 transition cursor-pointer"
        >
          <span className="text-5xl">🧶</span>
          <span className="mt-4 italic text-[#6B4A32]">Cozy Cardigans</span>
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#2E1B0E]">
            Ready to Ship
          </span>
        </Link>

        <Link
          href="/products?type=new"
          className="relative min-h-[205px] rounded-[1.5rem] bg-[#C2D4BF] flex flex-col items-center justify-center hover:-translate-y-1 transition cursor-pointer"
        >
          <span className="text-4xl">👜</span>
          <span className="mt-3 italic text-[#6B4A32]">Bags & Totes</span>
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#2E1B0E]">
            New Arrival
          </span>
        </Link>

        <Link
          href="/products?type=custom"
          className="relative min-h-[205px] rounded-[1.5rem] bg-[#E6D5BF] flex flex-col items-center justify-center hover:-translate-y-1 transition cursor-pointer"
        >
          <span className="text-4xl">🐨</span>
          <span className="mt-3 italic text-[#6B4A32]">Amigurumi</span>
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#2E1B0E]">
            Made to Order
          </span>
        </Link>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#9B8E84]">
        <div className="h-10 w-px bg-[#9B8E84]" />
        Scroll
      </div>
    </section>
  );
}