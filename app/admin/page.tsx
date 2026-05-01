"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image_url: string;
  availability: string;
};

type InstagramPost = {
  id: string;
  caption: string;
  image_url: string;
  post_link: string;
};

const emptyProduct = {
  name: "",
  price: "",
  category: "ready",
  description: "",
  image_url: "",
  availability: "available",
};

const orderStatuses = [
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [instagramForm, setInstagramForm] = useState({
    caption: "",
    image_url: "",
    post_link: "",
  });

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function fetchData() {
    setLoading(true);

    const ordersRes = await fetch("/api/admin/orders");

    if (ordersRes.status === 401) {
      router.push("/admin/login");
      return;
    }

    const ordersData = await ordersRes.json();
    setOrders(Array.isArray(ordersData) ? ordersData : []);

    const productsRes = await fetch("/api/admin/products");
    const productsData = await productsRes.json();
    setProducts(Array.isArray(productsData) ? productsData : []);

    const instaRes = await fetch("/api/admin/instagram");
    const instaData = await instaRes.json();
    setInstagramPosts(Array.isArray(instaData) ? instaData : []);

    setLoading(false);
  }

  async function handleImageUpload(file: File, type: "product" | "instagram") {
    setMessage("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Image upload failed");
      return;
    }

    if (type === "product") {
      setProductForm((prev) => ({ ...prev, image_url: data.url }));
    } else {
      setInstagramForm((prev) => ({ ...prev, image_url: data.url }));
    }

    setMessage("Image uploaded successfully.");
  }

  function startEditProduct(product: Product) {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "ready",
      description: product.description || "",
      image_url: product.image_url || "",
      availability: product.availability || "available",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEditProduct() {
    setEditingProductId(null);
    setProductForm(emptyProduct);
    setMessage("");
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();

    const method = editingProductId ? "PUT" : "POST";
    setMessage(editingProductId ? "Updating product..." : "Adding product...");

    const res = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingProductId,
        ...productForm,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Could not save product");
      return;
    }

    setProductForm(emptyProduct);
    setEditingProductId(null);
    setMessage(
      editingProductId
        ? "Product updated successfully."
        : "Product added successfully."
    );

    fetchData();
  }

  async function deleteProduct(id: string) {
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchData();
  }

  async function addInstagramPost(e: React.FormEvent) {
    e.preventDefault();

    if (!instagramForm.image_url) {
      setMessage("Please upload image first.");
      return;
    }

    if (instagramPosts.length >= 4) {
      setMessage("Only 4 Instagram posts are allowed.");
      return;
    }

    setMessage("Adding Instagram post...");

    const res = await fetch("/api/admin/instagram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(instagramForm),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Could not add Instagram post");
      return;
    }

    setInstagramForm({
      caption: "",
      image_url: "",
      post_link: "",
    });

    setMessage("Instagram post added successfully.");
    fetchData();
  }

  async function deleteInstagramPost(id: string) {
    await fetch("/api/admin/instagram", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchData();
  }

  async function updateOrderStatus(id: string, status: string) {
    setMessage("Updating order status...");

    const res = await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Could not update order status");
      return;
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );

    setMessage("Order status updated.");
  }

  async function deleteOrder(id: string) {
    await fetch("/api/admin/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchData();
  }

  function statusBadge(status: string) {
    const cleanStatus = status || "pending";

    if (cleanStatus === "completed") return "bg-[#C2D4BF] text-[#3d5e38]";
    if (cleanStatus === "in_progress") return "bg-[#E6D5BF] text-[#6B4A32]";
    if (cleanStatus === "contacted") return "bg-[#F0D5C8] text-[#A05530]";
    return "bg-[#FAF8F3] text-[#9B8E84]";
  }

  useEffect(() => {
    fetchData();
  }, []);

  const inputClass =
    "w-full rounded-xl border border-[#E6D5BF] bg-[#FAF8F3] px-4 py-3 text-sm outline-none focus:border-[#C4714B]";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] px-6 md:px-16 py-12">
        <p className="text-[#9B8E84]">Loading admin dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] px-6 md:px-16 py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C4714B]">
            Loopbelle
          </p>
          <h1 className="mt-2 text-4xl font-light text-[#2E1B0E]">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="rounded-full border border-[#C4714B] px-5 py-2 text-sm text-[#C4714B]"
          >
            Refresh
          </button>

          <button
            onClick={logout}
            className="rounded-full bg-[#2E1B0E] px-5 py-2 text-sm text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {message && (
        <p className="mt-6 rounded-xl bg-white px-4 py-3 text-sm text-[#6B4A32] border border-[#E6D5BF]">
          {message}
        </p>
      )}

      <section className="mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-2xl font-light text-[#2E1B0E]">
            {editingProductId ? "Edit Product" : "Manage Products"}
          </h2>

          {editingProductId && (
            <button
              onClick={cancelEditProduct}
              className="rounded-full border border-[#E6D5BF] px-5 py-2 text-sm text-[#6B4A32]"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form
          onSubmit={saveProduct}
          className="mt-5 rounded-3xl border border-[#E6D5BF] bg-white p-6 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Product name"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              className={inputClass}
              required
            />

            <input
              placeholder="Price e.g. ₹1,200"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              className={inputClass}
              required
            />

            <select
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
              className={inputClass}
            >
              <option value="ready">Ready to Ship</option>
              <option value="custom">Made to Order</option>
            </select>

            <select
              value={productForm.availability}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  availability: e.target.value,
                })
              }
              className={inputClass}
            >
              <option value="available">Available</option>
              <option value="sold_out">Sold Out</option>
            </select>

            <div className="rounded-xl border border-[#E6D5BF] bg-[#FAF8F3] p-4 md:col-span-2">
              <label className="block text-sm text-[#6B4A32] mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, "product");
                }}
                className="w-full text-sm text-[#6B4A32]"
              />

              {productForm.image_url && (
                <img
                  src={productForm.image_url}
                  alt="Product preview"
                  className="mt-4 h-32 w-full rounded-xl object-cover"
                />
              )}
            </div>
          </div>

          <textarea
            placeholder="Product description"
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            className={`${inputClass} mt-4 min-h-[100px]`}
          />

          <button className="mt-5 rounded-full bg-[#C4714B] px-7 py-3 text-sm font-medium text-white hover:bg-[#A05530] transition">
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-[#E6D5BF] bg-white shadow-sm"
            >
              <div className="h-48 bg-[#F0D5C8]">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-[#9B8E84]">
                    No image
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg text-[#2E1B0E]">{product.name}</h3>
                <p className="mt-1 text-sm text-[#C4714B]">{product.price}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F7F2EA] px-3 py-1 text-[11px] text-[#6B4A32]">
                    {product.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] ${
                      product.availability === "sold_out"
                        ? "bg-red-50 text-red-500"
                        : "bg-[#C2D4BF] text-[#3d5e38]"
                    }`}
                  >
                    {product.availability === "sold_out"
                      ? "Sold Out"
                      : "Available"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-[#9B8E84]">
                  {product.description}
                </p>

                <div className="mt-5 flex gap-4">
                  <button
                    onClick={() => startEditProduct(product)}
                    className="text-sm text-[#C4714B] hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-[#9B8E84]">No products added yet.</p>
          )}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-light text-[#2E1B0E]">
              Instagram Posts
            </h2>
            <p className="mt-1 text-sm text-[#9B8E84]">
              Add up to 4 curated posts for the homepage.
            </p>
          </div>

          <span className="rounded-full bg-white border border-[#E6D5BF] px-4 py-2 text-xs text-[#6B4A32]">
            {instagramPosts.length}/4 posts
          </span>
        </div>

        <form
          onSubmit={addInstagramPost}
          className="mt-5 rounded-3xl border border-[#E6D5BF] bg-white p-6 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Caption"
              value={instagramForm.caption}
              onChange={(e) =>
                setInstagramForm({ ...instagramForm, caption: e.target.value })
              }
              className={inputClass}
            />

            <input
              placeholder="Instagram post link"
              value={instagramForm.post_link}
              onChange={(e) =>
                setInstagramForm({
                  ...instagramForm,
                  post_link: e.target.value,
                })
              }
              className={inputClass}
            />

            <div className="rounded-xl border border-[#E6D5BF] bg-[#FAF8F3] p-4 md:col-span-2">
              <label className="block text-sm text-[#6B4A32] mb-2">
                Instagram Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, "instagram");
                }}
                className="w-full text-sm text-[#6B4A32]"
              />

              {instagramForm.image_url && (
                <img
                  src={instagramForm.image_url}
                  alt="Instagram preview"
                  className="mt-4 h-40 w-full rounded-xl object-cover"
                />
              )}
            </div>
          </div>

          <button className="mt-5 rounded-full bg-[#C4714B] px-7 py-3 text-sm font-medium text-white hover:bg-[#A05530] transition">
            Add Instagram Post
          </button>
        </form>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden rounded-3xl border border-[#E6D5BF] bg-white shadow-sm"
            >
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.caption || "Instagram post"}
                  className="aspect-square w-full object-cover"
                />
              )}

              <div className="p-4">
                <p className="text-sm text-[#6B4A32] line-clamp-2">
                  {post.caption || "No caption"}
                </p>

                <button
                  onClick={() => deleteInstagramPost(post.id)}
                  className="mt-4 text-sm text-red-500 hover:underline"
                >
                  Delete post
                </button>
              </div>
            </div>
          ))}

          {instagramPosts.length === 0 && (
            <p className="text-[#9B8E84]">No Instagram posts yet.</p>
          )}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-light text-[#2E1B0E]">
          Customer Orders
        </h2>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {orders.map((order) => {
            const currentStatus = order.status || "pending";

            return (
              <div
                key={order.id}
                className="rounded-3xl border border-[#E6D5BF] bg-white p-6 shadow-sm"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-lg text-[#2E1B0E]">{order.name}</h3>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${statusBadge(
                        currentStatus
                      )}`}
                    >
                      {currentStatus.replace("_", " ")}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4 text-sm text-[#6B4A32] space-y-1">
                  <p>Phone: {order.phone}</p>
                  <p>Email: {order.email || "—"}</p>
                  <p>Item: {order.item_type}</p>
                  <p>Size: {order.size || "—"}</p>
                  <p>Deadline: {order.deadline || "—"}</p>
                </div>

                <div className="mt-4 rounded-xl bg-[#FAF8F3] p-4 text-sm text-[#6B4A32]">
                  {order.description}
                </div>

                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-[0.16em] text-[#9B8E84] mb-2">
                    Update Status
                  </label>

                  <select
                    value={currentStatus}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className={inputClass}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
            <p className="text-[#9B8E84]">No custom orders yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}