export default function Story() {
  return (
    <section id="story" className="bg-[#F7F2EA] px-6 md:px-20 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-[#C4714B]">
            ✦ About Loopbelle
          </span>

          <h2 className="mt-3 text-4xl md:text-6xl font-light leading-tight text-[#2E1B0E]">
            Crafted with intention, <br />
            worn with <span className="italic text-[#C4714B]">love.</span>
          </h2>

          <p className="mt-6 text-[#9B8E84] leading-relaxed max-w-xl">
            Every piece starts as a skein of yarn and a spark of imagination.
            Loopbelle was born from a love of slow fashion — making things that
            last, feel personal, and carry warmth in every stitch.
          </p>

          <p className="mt-5 text-[#9B8E84] leading-relaxed max-w-xl">
            Each order is handmade with careful attention to detail, thoughtful
            colours, and soft yarns chosen to make every piece feel special.
          </p>

          {/* Founder + Credit */}
          <div className="mt-10 border-l-2 border-[#C4714B] pl-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C4714B]">
              
            </p>

            <h3 className="mt-3 text-3xl md:text-4xl font-light text-[#2E1B0E]">
              Swasthi Sangoli
            </h3>

            <p className="mt-1 text-sm text-[#9B8E84]">
              Founder & Creative Head
            </p>

            <div className="mt-6 pt-5 border-t border-[#E6D5BF]">
              <p className="text-s text-[#9B8E84]">
                Website & digital experience by{" "}
                <span className="font-medium text-[#6B4A32]">
                  Prasad More
                </span>
              </p>

              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#9B8E84]">
                Tech Partner
              </p>
            </div>
          </div>

          <a
            href="#order"
            className="inline-block mt-8 bg-[#C4714B] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#A05530] transition"
          >
            Start Custom Order
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            ["200+", "Happy Customers", "Across India"],
            ["4.2★", "Average Rating", "From happy buyers"],
            ["100%", "Handmade", "No machines, just care"],
            ["7–21", "Days", "Typical custom timeline"],
          ].map(([num, label, desc], index) => (
            <div
              key={label}
              className={`rounded-3xl p-6 min-h-44 flex flex-col justify-between ${
                index === 0
                  ? "bg-[#C4714B] text-white"
                  : index === 1
                  ? "bg-[#C2D4BF] text-[#3d5e38]"
                  : index === 2
                  ? "bg-[#E6D5BF] text-[#2E1B0E]"
                  : "bg-[#2E1B0E] text-[#F7F2EA]"
              }`}
            >
              <span className="text-4xl md:text-5xl font-light">{num}</span>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-80">
                  {label}
                </p>
                <p className="mt-2 text-sm opacity-75">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}