export default function Contact() {
  return (
    <section id="contact" className="bg-[#2E1B0E] px-6 md:px-20 py-24 text-white">
      
      <span className="text-xs tracking-[0.2em] uppercase text-[#E8A882]">
        ✦ Say Hello
      </span>

      <h2 className="mt-3 text-4xl md:text-6xl font-light leading-tight">
        Let’s <span className="italic text-[#C4714B]">connect.</span>
      </h2>

      <p className="mt-5 text-[#9B8E84] max-w-lg">
        Prefer a quick chat? Choose your way to reach us.
      </p>

      {/* CONTACT CARDS */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">

        {/* WhatsApp */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
          <div className="text-2xl">💬</div>
          <h3 className="mt-3 text-xl">WhatsApp</h3>
          <p className="mt-2 text-sm text-[#9B8E84]">
            Fastest way to reach us.
          </p>
          <a
            href="https://wa.me/916362539200"
            target="_blank"
            className="mt-4 inline-block text-[#E8A882] text-sm"
          >
            Chat now →
          </a>
        </div>

        {/* Instagram */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
          <div className="text-2xl">📸</div>
          <h3 className="mt-3 text-xl">Instagram</h3>
          <p className="mt-2 text-sm text-[#9B8E84]">
            DM us with your ideas.
          </p>
          <a
            href="https://instagram.com/loopbelle.co"
            target="_blank"
            className="mt-4 inline-block text-[#E8A882] text-sm"
          >
            Open Instagram →
          </a>
        </div>

        {/* Email */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
          <div className="text-2xl">✉️</div>
          <h3 className="mt-3 text-xl">Email</h3>
          <p className="mt-2 text-sm text-[#9B8E84]">
            For detailed enquiries.
          </p>
          <a
            href="mailto:loopbelle@gmail.com"
            className="mt-4 inline-block text-[#E8A882] text-sm"
          >
            Send email →
          </a>
        </div>

      </div>

      {/* FOOT NOTE */}
      <div className="mt-12 border-t border-white/10 pt-6 text-sm text-[#9B8E84] flex flex-wrap gap-4 justify-between">
        <span>Response: Mon–Sat, 10am – 7pm</span>
        <span>Based in India</span>
        <span>Ships pan-India</span>
      </div>

    </section>
  );
}