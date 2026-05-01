"use client";

import { useEffect, useState } from "react";

type InstagramPost = {
  id: string;
  caption: string;
  image_url: string;
  post_link: string;
};

export default function Instagram() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/instagram");

      let data: any = [];

      try {
        data = await res.json();
      } catch {
        data = [];
      }

      setPosts(Array.isArray(data) ? data.slice(0, 4) : []);
    }

    fetchPosts();
  }, []);

  const placeholders = [
    "New Drops",
    "Custom Pieces",
    "Behind the Scenes",
    "Happy Customers",
  ];

  return (
    <section
      id="instagram"
      className="bg-[#F7F2EA] px-6 md:px-20 py-28 text-center"
    >
      {/* Heading */}
      <span className="text-xs tracking-[0.2em] uppercase text-[#C4714B]">
        ✦ Follow Along
      </span>

      <h2 className="mt-3 text-4xl md:text-6xl font-light leading-tight text-[#2E1B0E]">
        Latest from our{" "}
        <span className="italic text-[#C4714B]">Instagram.</span>
      </h2>

      <p className="mt-5 text-[#9B8E84] max-w-lg mx-auto leading-relaxed">
        New drops, custom pieces, behind-the-scenes craft, and happy customer moments.
      </p>

      {/* Grid */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
        {posts.length > 0
          ? posts.map((post) => (
              <a
                key={post.id}
                href={post.post_link || "https://instagram.com/loopbelle.co"}
                target="_blank"
                className="group relative aspect-square overflow-hidden rounded-2xl bg-[#F0D5C8] transition hover:scale-[0.98]"
              >
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.caption || "Instagram post"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[#6B4A32]">
                    Instagram Post
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#C4714B]/85 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="text-center px-4">
                    <p className="text-white text-xs tracking-[0.18em] uppercase">
                      View Post
                    </p>
                    {post.caption && (
                      <p className="mt-2 text-white/80 text-xs normal-case tracking-normal line-clamp-2">
                        {post.caption}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))
          : placeholders.map((caption, index) => (
              <div
                key={caption}
                className={`group relative aspect-square overflow-hidden rounded-2xl border border-[#E6D5BF] ${
                  index % 3 === 0
                    ? "bg-[#F0D5C8]"
                    : index % 3 === 1
                    ? "bg-[#E6D5BF]"
                    : "bg-[#C2D4BF]"
                }`}
              >
                {/* Inner subtle frame */}
                <div className="absolute inset-4 rounded-2xl border border-white/40" />

                {/* Soft glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-20 w-20 rounded-full bg-white/25 blur-2xl" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
                  <p className="font-serif text-lg md:text-xl italic text-[#2E1B0E]/80">
                    {caption}
                  </p>

                  <span className="mt-4 h-px w-10 bg-[#C4714B]/40" />

                  <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-[#6B4A32]/50">
                    Coming Soon
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* CTA */}
      <div className="mt-20 md:mt-24">
        <a
          href="https://instagram.com/loopbelle.co"
          target="_blank"
          className="inline-block border border-[#C4714B] text-[#C4714B] px-8 py-3 rounded-full text-sm hover:bg-[#C4714B] hover:text-white transition"
        >
          Follow @loopbelle.co →
        </a>
      </div>
    </section>
  );
}