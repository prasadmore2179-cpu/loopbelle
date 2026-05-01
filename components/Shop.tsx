"use client";

import { useEffect, useState } from "react";
import {
  getWhatsAppLink,
  getInstagramLink,
  getEmailLink,
} from "@/lib/contact";

type Product = {
  id: string;
  name: string;
  price: string;
  category: "ready" | "custom";
  description: string;
  image_url?: string;
  availability?: "available" | "sold_out";
};

function createProductMessage(product: Product) {
  return `Hi Loopbelle,

I'm interested in this product:

Product: ${product.name}
Type: ${product.category === "ready" ? "Ready to Ship" : "Made to Order"}
Price: ${product.price}
Status: ${product.availability === "sold_out" ? "Sold Out" : "Available"}
Details: ${product.description}

Please confirm availability, final price, and payment details.`;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<"ready" | "custom">("ready");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  async function fetchProducts() {
    const res = await fetch("/api/products");

    let data: any = [];
    try {
      data = await res.json();
    } catch {
      data = [];
    }

    setProducts(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function copyMessage() {
    if (!selectedProduct) return;
    await navigator.clipboard.writeText(createProductMessage(selectedProduct));
    alert("Message copied! Paste it in Instagram DM.");
  }

  const filtered = products.filter((p) => p.category === tab).slice(0, 4);

  return (
    <section id="shop" className="bg-[#FAF8F3] px-6 md:px-20 py-24">
      <span className="text-xs tracking-[0.2em] uppercase text-[#C4714B]">
        ✦ The Collection
      </span>

      <h2 className="mt-3 text-4xl md:text-6xl font-light text-[#2E1B0E]">
        Shop <span className="italic text-[#C4714B]">Loopbelle</span>
      </h2>

      <p className="mt-4 max-w-xl text-[#9B8E84] leading-relaxed">
        Explore ready-to-ship pieces or custom handmade crochet crafted just for you.
      </p>

      <div className="mt-10 inline-flex border border-[#E6D5BF] rounded-full overflow-hidden">
        <button
          onClick={() => setTab("ready")}
          className={`px-6 py-3 text-xs uppercase tracking-widest transition ${
            tab === "ready" ? "bg-[#C4714B] text-white" : "text-[#9B8E84]"
          }`}
        >
          Ready to Ship
        </button>

        <button
          onClick={() => setTab("custom")}
          className={`px-6 py-3 text-xs uppercase tracking-widest transition ${
            tab === "custom" ? "bg-[#C4714B] text-white" : "text-[#9B8E84]"
          }`}
        >
          Made to Order
        </button>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-[#F7F2EA] border border-[#E6D5BF] rounded-3xl overflow-hidden hover:-translate-y-1 transition shadow-sm"
          >
            <div className="relative h-64 bg-[#F0D5C8] flex items-center justify-center overflow-hidden">
              {product.availability === "sold_out" && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-white px-4 py-2 text-xs text-red-500 shadow-sm">
                  Sold Out
                </span>
              )}

              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className={`w-full h-full object-cover ${
                    product.availability === "sold_out" ? "opacity-70" : ""
                  }`}
                />
              ) : (
                <span className="text-sm text-[#9B8E84]">No image</span>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl text-[#2E1B0E]">{product.name}</h3>

              <p className="mt-2 text-sm text-[#9B8E84] line-clamp-2">
                {product.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-[#C4714B] font-medium">
                  ₹{product.price.replace(/[^0-9]/g, "")}
                </span>

                <button
                  disabled={product.availability === "sold_out"}
                  onClick={() => setSelectedProduct(product)}
                  className="text-xs uppercase tracking-widest border border-[#C4714B] text-[#C4714B] px-4 py-2 rounded-full hover:bg-[#C4714B] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#C4714B]"
                >
                  {product.availability === "sold_out"
                    ? "Sold Out"
                    : product.category === "ready"
                    ? "Ready to Ship"
                    : "Order Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[#9B8E84]">No products yet.</p>
      )}

      <div className="mt-12 text-center">
        <a
          href="/products"
          className="inline-block rounded-full border border-[#C4714B] px-8 py-3 text-sm text-[#C4714B] hover:bg-[#C4714B] hover:text-white transition"
        >
          Explore More →
        </a>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#FAF8F3] max-w-md w-full rounded-3xl p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-5 text-[#6B4A32]"
            >
              ✕
            </button>

            <div className="h-44 rounded-2xl bg-[#F0D5C8] overflow-hidden flex items-center justify-center mb-5">
              {selectedProduct.image_url ? (
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#9B8E84]">No image</span>
              )}
            </div>

            <h3 className="text-2xl text-[#2E1B0E]">
              {selectedProduct.name}
            </h3>

            <p className="mt-2 text-sm text-[#9B8E84]">
              {selectedProduct.description}
            </p>

            <div className="mt-5 text-sm text-[#6B4A32] space-y-1">
              <p>
                <strong>Type:</strong>{" "}
                {selectedProduct.category === "ready"
                  ? "Ready to Ship"
                  : "Made to Order"}
              </p>
              <p>
                <strong>Price:</strong> {selectedProduct.price}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedProduct.availability === "sold_out"
                  ? "Sold Out"
                  : "Available"}
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={getWhatsAppLink(createProductMessage(selectedProduct))}
                target="_blank"
                className="text-center bg-[#C4714B] text-white py-3 rounded-full"
              >
                Continue on WhatsApp
              </a>

              <button
                onClick={copyMessage}
                className="border border-[#C4714B] text-[#C4714B] py-3 rounded-full"
              >
                Copy Message for Instagram
              </button>

              <a
                href={getInstagramLink()}
                target="_blank"
                className="text-center border border-[#E6D5BF] text-[#6B4A32] py-3 rounded-full"
              >
                Open Instagram DM
              </a>

              <a
                href={getEmailLink(
                  `Order enquiry: ${selectedProduct.name}`,
                  createProductMessage(selectedProduct)
                )}
                className="text-center border border-[#E6D5BF] text-[#6B4A32] py-3 rounded-full"
              >
                Send Email
              </a>
            </div>

            <p className="mt-4 text-xs text-[#9B8E84] text-center">
              Online payment via Razorpay coming soon.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}