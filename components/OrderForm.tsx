"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrderForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const orderData = {
      name: String(form.get("name")),
      phone: String(form.get("phone")),
      email: String(form.get("email")),
      item_type: String(form.get("item_type")),
      size: String(form.get("size")),
      deadline: String(form.get("deadline")) || null,
      description: String(form.get("description")),
      status: "pending",
    };

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select("id")
      .single();

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setOrderId(data.id);
    setSubmitted(true);
  }

  function saveTrackingId() {
    if (!orderId) return;

    localStorage.setItem("loopbelle_order_id", orderId);
    window.location.href = "/track-order";
  }

  if (submitted) {
    return (
      <section id="order" className="px-6 md:px-20 py-24 bg-[#FAF8F3] text-center">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#E6D5BF] p-8 shadow-sm">
          <div className="text-5xl mb-4">🧶</div>

          <h2 className="text-3xl font-light text-[#2E1B0E]">
            We’ve got your request!
          </h2>

          <p className="mt-4 text-[#9B8E84] leading-relaxed">
            Loopbelle will contact you within 24 hours. You can also track this
            request status on this device.
          </p>

          <div className="mt-6 rounded-2xl bg-[#FAF8F3] border border-[#E6D5BF] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#C4714B]">
              Request ID
            </p>
            <p className="mt-2 text-sm text-[#6B4A32] break-all">{orderId}</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={saveTrackingId}
              className="rounded-full bg-[#C4714B] px-7 py-3 text-sm text-white hover:bg-[#A05530] transition"
            >
              Track My Request
            </button>

            <a
              href="/"
              className="rounded-full border border-[#E6D5BF] px-7 py-3 text-sm text-[#6B4A32] hover:border-[#C4714B] transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full border border-[#E6D5BF] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C4714B] bg-[#FAF8F3]";

  return (
    <section id="order" className="px-6 md:px-20 py-24 bg-[#FAF8F3]">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-[#C4714B]">
            ✦ Custom Request
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-light text-[#2E1B0E]">
            Let’s make something <br />
            <span className="italic text-[#C4714B]">just for you.</span>
          </h2>

          <p className="mt-6 text-[#9B8E84] leading-relaxed max-w-md">
            Share your idea, size, colors, and timeline — we’ll craft it with care.
          </p>

          <div className="mt-6 bg-[#F0D5C8] p-5 rounded-xl text-sm text-[#6B4A32]">
            💛 Turnaround: 7–21 days <br />
            💳 Payment: 50% advance after confirmation
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" placeholder="Your Name" className={inputClass} required />
            <input name="phone" placeholder="WhatsApp Number" className={inputClass} required />
          </div>

          <input name="email" placeholder="Email Address" className={inputClass} />

          <div className="grid md:grid-cols-2 gap-4">
            <select name="item_type" className={inputClass} required>
              <option value="">Item Type</option>
              <option>Cardigan</option>
              <option>Bag</option>
              <option>Amigurumi</option>
              <option>Co-ord Set</option>
              <option>Wall Art</option>
              <option>Hair Accessories</option>
              <option>Gift Set</option>
              <option>Other</option>
            </select>

            <select name="size" className={inputClass}>
              <option value="">Size</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>Custom</option>
              <option>Not applicable</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-[#9B8E84] block mb-1">
              Preferred Delivery Date
            </label>
            <input name="deadline" type="date" className={inputClass} />
          </div>

          <textarea
            name="description"
            placeholder="Describe your idea..."
            className={`${inputClass} min-h-[110px]`}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#C4714B] text-white py-3 rounded-full hover:bg-[#A05530] transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Request →"}
          </button>

          <p className="text-xs text-[#9B8E84] text-center">
            After submitting, you can save this request on your device to track status.
          </p>
        </form>
      </div>
    </section>
  );
}