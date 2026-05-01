"use client";

import { useState } from "react";

const faqData = {
  care: [
    ["How do I wash my crochet piece?", "Hand wash in cold water with gentle detergent. Do not wring. Lay flat to dry in shade."],
    ["Can I dry it in sunlight?", "Shade drying is better because direct sunlight may fade colours over time."],
    ["Will crochet items stretch?", "Some stretch is natural. Store folded instead of hanging to maintain shape."],
    ["How should I store it?", "Keep it in a clean, dry place. Avoid plastic bags for long storage."],
  ],
  shipping: [
    ["How long does delivery take?", "Ready-to-ship items usually dispatch in 2–3 business days."],
    ["Do you ship across India?", "Yes, Loopbelle ships across India."],
    ["Will I get tracking?", "Yes, tracking details will be shared after dispatch."],
    ["Do you offer urgent delivery?", "Rush orders may be possible depending on item and location."],
  ],
  orders: [
    ["How long do custom orders take?", "Most custom pieces take 7–21 days depending on design complexity."],
    ["Can I choose colours?", "Yes, you can share your preferred colours or reference photos."],
    ["Can I request my size?", "Yes, custom sizing is available for wearable pieces."],
    ["Can I change my order later?", "Small changes may be possible before work begins."],
  ],
  payment: [
    ["Is online payment available?", "Razorpay online payments are coming soon."],
    ["How do I pay now?", "For now, payment is handled manually after confirmation on WhatsApp or Instagram."],
    ["Is advance payment needed?", "Custom orders usually require 50% advance to begin work."],
    ["Are refunds available?", "Ready-to-ship returns depend on condition. Custom orders are usually non-refundable."],
  ],
};

type Category = keyof typeof faqData;

export default function FAQ() {
  const [category, setCategory] = useState<Category>("care");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories: { key: Category; label: string }[] = [
    { key: "care", label: "🧺 Care & Washing" },
    { key: "shipping", label: "📦 Shipping" },
    { key: "orders", label: "✏️ Custom Orders" },
    { key: "payment", label: "💳 Payment" },
  ];

  return (
    <section id="faq" className="bg-[#FAF8F3] px-6 md:px-20 py-24">
      <span className="text-xs tracking-[0.2em] uppercase text-[#C4714B]">
        ✦ Questions Answered
      </span>

      <h2 className="mt-3 text-4xl md:text-6xl font-light leading-tight text-[#2E1B0E]">
        Everything you <br />
        need to <span className="italic text-[#C4714B]">know.</span>
      </h2>

      <div className="mt-12 grid lg:grid-cols-[0.8fr_1.6fr] gap-12">
        <div className="flex lg:flex-col gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setCategory(cat.key);
                setOpenIndex(0);
              }}
              className={`whitespace-nowrap text-left px-5 py-3 rounded-2xl text-sm transition ${
                category === cat.key
                  ? "bg-[#C4714B] text-white"
                  : "bg-[#F7F2EA] text-[#6B4A32] hover:bg-[#E6D5BF]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-[#F7F2EA] rounded-3xl border border-[#E6D5BF] overflow-hidden">
          {faqData[category].map(([question, answer], index) => {
            const isOpen = openIndex === index;

            return (
              <div key={question} className="border-b border-[#E6D5BF] last:border-b-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg text-[#2E1B0E]">{question}</span>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center bg-white text-[#C4714B] transition ${
                      isOpen ? "rotate-45 bg-[#C4714B] text-white" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-[#9B8E84]">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}