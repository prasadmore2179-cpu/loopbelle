"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type OrderStatus = {
  id: string;
  name: string;
  item_type: string;
  status: string;
  created_at: string;
};

const steps = [
  { key: "pending", label: "Pending" },
  { key: "contacted", label: "Contacted" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedId = localStorage.getItem("loopbelle_order_id");

    if (savedId) {
      setOrderId(savedId);
      fetchOrder(savedId);
    }
  }, []);

  async function fetchOrder(id: string) {
    setMessage("Checking status...");

    const res = await fetch(`/api/order-status?id=${id}`);
    const data = await res.json();

    if (!res.ok) {
      setOrder(null);
      setMessage(data.error || "Order not found");
      return;
    }

    setOrder(data);
    setMessage("");
  }

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();

    if (!orderId.trim()) {
      setMessage("Please enter your request ID.");
      return;
    }

    localStorage.setItem("loopbelle_order_id", orderId.trim());
    fetchOrder(orderId.trim());
  }

  function clearTracking() {
    localStorage.removeItem("loopbelle_order_id");
    setOrderId("");
    setOrder(null);
    setMessage("Tracking removed from this device.");
  }

  const currentIndex = order
    ? steps.findIndex((step) => step.key === (order.status || "pending"))
    : -1;

  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <Navbar />

      <section className="px-6 md:px-20 pt-32 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-[#C4714B]">
            ✦ Track Request
          </span>

          <h1 className="mt-3 text-4xl md:text-6xl font-light text-[#2E1B0E]">
            Track your <span className="italic text-[#C4714B]">order.</span>
          </h1>

          <p className="mt-5 text-[#9B8E84] leading-relaxed">
            Enter your request ID to check the latest status of your custom order.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-3xl border border-[#E6D5BF] p-6 md:p-8 shadow-sm">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-3">
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter request ID"
              className="flex-1 rounded-xl border border-[#E6D5BF] bg-[#FAF8F3] px-4 py-3 text-sm outline-none focus:border-[#C4714B]"
            />

            <button className="rounded-full bg-[#C4714B] px-7 py-3 text-sm text-white hover:bg-[#A05530] transition">
              Track
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-xl bg-[#FAF8F3] border border-[#E6D5BF] px-4 py-3 text-sm text-[#6B4A32]">
              {message}
            </p>
          )}

          {order && (
            <div className="mt-8">
              <div className="rounded-2xl bg-[#FAF8F3] border border-[#E6D5BF] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#C4714B]">
                  Request Details
                </p>

                <div className="mt-4 grid gap-2 text-sm text-[#6B4A32]">
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Item:</strong> {order.item_type}</p>
                  <p>
                    <strong>Submitted:</strong>{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium text-[#2E1B0E]">
                  Current Status
                </p>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {steps.map((step, index) => {
                    const active = index <= currentIndex;

                    return (
                      <div
                        key={step.key}
                        className={`rounded-2xl border p-4 text-center ${
                          active
                            ? "bg-[#C4714B] border-[#C4714B] text-white"
                            : "bg-[#FAF8F3] border-[#E6D5BF] text-[#9B8E84]"
                        }`}
                      >
                        <div
                          className={`mx-auto h-8 w-8 rounded-full flex items-center justify-center text-xs ${
                            active
                              ? "bg-white text-[#C4714B]"
                              : "bg-white text-[#9B8E84]"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <p className="mt-3 text-sm">{step.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={clearTracking}
                className="mt-8 text-sm text-[#9B8E84] hover:text-[#C4714B]"
              >
                Remove tracking from this device
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}