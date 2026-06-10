"use client";

import { useState } from "react";
import { designs, designCategories } from "@/data/designs";

export default function DesignGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDesigns =
    selectedCategory === "All"
      ? designs
      : designs.filter((design) => design.category === selectedCategory);

  return (
    <section id="designs" className="bg-white px-4 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            Ready-made sticker designs
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Product Design Gallery
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Browse our sticker design categories and choose your preferred
            design code when placing an order.
          </p>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {designCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-[#FD7C03] text-white"
                  : "bg-[#FFF7EF] text-[#2B1B12] hover:bg-[#FFE1C2]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDesigns.map((design) => (
            <div
              key={design.code}
              className="overflow-hidden rounded-3xl border border-[#EAD8C8] bg-[#FFF7EF] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-64 items-center justify-center bg-white p-4">
                <img
                  src={design.image}
                  alt={design.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#FFE1C2] px-3 py-1 text-xs font-bold text-[#FD7C03]">
                    {design.code}
                  </span>

                  <span className="text-xs text-[#6F625A]">
                    {design.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold">{design.name}</h3>

                <p className="mt-3 text-sm leading-6 text-[#6F625A]">
                  Choose this design code and customize it with your brand name,
                  logo, message, color, or size.
                </p>

                <a
                  href="/order"
                  className="mt-5 inline-block rounded-full bg-[#FD7C03] px-5 py-2 text-sm font-semibold text-white"
                >
                  Order This Design
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}