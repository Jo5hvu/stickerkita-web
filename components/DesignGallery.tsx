"use client";

import { useState } from "react";
import { designCategories, designs } from "@/data/designs";

type Design = {
  code: string;
  name: string;
  category: string;
  image: string;
};

export default function DesignGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  const filteredDesigns =
    activeCategory === "all"
      ? designs
      : designs.filter((design) => design.category === activeCategory);

  const formatCategoryName = (category: string) => {
    return category
      .replace("-", " & ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <section id="designs" className="w-full bg-[#FFF7EF] px-4 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            Design gallery
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Choose Your Sticker Design
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Browse ready-made sticker design ideas. Click on any design to view
            it larger, then use the design code when placing your order.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeCategory === "all"
                ? "bg-[#FD7C03] text-white"
                : "bg-white text-[#2B1B12] hover:bg-[#FFE1C2]"
            }`}
          >
            All
          </button>

          {designCategories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-[#FD7C03] text-white"
                  : "bg-white text-[#2B1B12] hover:bg-[#FFE1C2]"
              }`}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>

        {/* Design Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDesigns.map((design) => (
            <div
              key={design.code}
              className="overflow-hidden rounded-3xl border border-[#EAD8C8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setSelectedDesign(design)}
                className="group block w-full"
              >
                <div className="relative aspect-square overflow-hidden bg-[#FFF7EF]">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#2B1B12]">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              </button>

              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#FD7C03]">
                  {design.code}
                </p>

                <h3 className="mt-1 text-lg font-bold">{design.name}</h3>

                <a
                  href={`/order?design=${design.code}`}
                  className="mt-4 inline-block w-full rounded-full bg-[#FD7C03] px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Order This Design
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {selectedDesign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedDesign(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#2B1B12] shadow-md hover:bg-[#FFE1C2]"
            >
              ×
            </button>

            <div className="flex max-h-[75vh] items-center justify-center overflow-hidden rounded-2xl bg-[#FFF7EF]">
              <img
                src={selectedDesign.image}
                alt={selectedDesign.name}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#FD7C03]">
                  {selectedDesign.code}
                </p>

                <h3 className="text-xl font-bold">{selectedDesign.name}</h3>
              </div>

              <a
                href={`/order?design=${selectedDesign.code}`}
                className="rounded-full bg-[#FD7C03] px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                Order This Design
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}