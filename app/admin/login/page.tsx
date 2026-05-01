"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Wrong password");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] flex items-center justify-center px-6">
      <form onSubmit={login} className="bg-white p-8 rounded-3xl w-full max-w-sm">
        <h1 className="text-3xl font-light text-[#2E1B0E]">Admin Login</h1>

        <input
          type="password"
          placeholder="Enter admin password"
          className="mt-6 w-full border border-[#E6D5BF] rounded-xl px-4 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button className="mt-6 w-full bg-[#C4714B] text-white py-3 rounded-full">
          Login
        </button>
      </form>
    </main>
  );
}