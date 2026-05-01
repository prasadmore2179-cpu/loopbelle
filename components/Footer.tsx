export default function Footer() {
  return (
    <footer className="bg-[#1E0F07] px-6 md:px-20 py-12 text-[#9B8E84]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div>
          <h2 className="text-2xl text-[#C4714B]">
            Loop<span className="italic text-[#F7F2EA]">belle</span>
          </h2>
          <p className="mt-2 text-xs">Handcrafted crochet with love.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-xs uppercase tracking-widest">
          <a href="/#shop" className="hover:text-[#E8A882] transition">Shop</a>
          <a href="/products" className="hover:text-[#E8A882] transition">Products</a>
          <a href="/#order" className="hover:text-[#E8A882] transition">Custom Order</a>
          <a href="/track-order" className="hover:text-[#E8A882] transition">Track Order</a>
          <a href="/#faq" className="hover:text-[#E8A882] transition">FAQ</a>
          <a href="/privacy" className="hover:text-[#E8A882] transition">Privacy</a>
        </div>

        <div className="flex gap-3 items-center">
          <a
            href="https://instagram.com/loopbelle.co"
            target="_blank"
            className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-xs hover:border-[#C4714B] hover:text-[#C4714B] transition"
          >
            ig
          </a>

          <a
            href="https://wa.me/916362539200"
            target="_blank"
            className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-xs hover:border-[#C4714B] hover:text-[#C4714B] transition"
          >
            wa
          </a>

          <a
            href="mailto:loopbelle@gmail.com"
            className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-xs hover:border-[#C4714B] hover:text-[#C4714B] transition"
          >
            em
          </a>

          <a
            href="/admin/login"
            aria-label="Admin login"
            className="h-9 w-9 rounded-full border border-white/5 flex items-center justify-center text-[11px] text-[#3f2818] hover:text-[#E8A882] hover:border-white/15 transition"
          >
            🔒
          </a>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-center md:text-left">
        <p>© {new Date().getFullYear()} Loopbelle. All rights reserved.</p>

        <p>
          Owned by <span className="text-[#E8A882]">Swasthi Sangoli</span>
        </p>

        <p className="text-[#6B4A32]">
          Website by <span className="text-[#9B8E84]">Prasad More</span>
        </p>
      </div>
    </footer>
  );
}