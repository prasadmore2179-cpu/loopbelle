import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FAF8F3] px-6 md:px-20 pt-32">
          <p className="text-[#9B8E84]">Loading products...</p>
        </main>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}