"use client";

import { useState } from "react";

const MIN_WIDTH_MM = 10;
const MAX_WIDTH_MM = 308;
const MIN_HEIGHT_MM = 10;
const MAX_HEIGHT_MM = 460;

const SHEET_WIDTH_MM = 308;
const SHEET_HEIGHT_MM = 460;

// Base pricing
const BASE_PRICE = 59;
const DEFAULT_UNIT = 1000; // pcs per block for normal materials
const SPECIAL_UNIT = 500;   // pcs per block for Transparent White Ink

// Material-specific pricing configuration
const getPricePerUnit = (material: string): number => {
  return material === "Transparent White Ink" ? SPECIAL_UNIT : DEFAULT_UNIT;
};

// Shape multiplier: Custom Shape = +20%
const getShapeMultiplier = (shape: string): number => {
  return shape === "Custom Shape" ? 1.2 : 1;
};

export default function StickerPriceCalculator() {
  const [formData, setFormData] = useState({
    material: "Mirrorcoat",
    shape: "Circle",
    width: "50",
    height: "50",
    quantity: "1000",
  });

  const width = Number(formData.width) || 0;
  const height = Number(formData.height) || 0;
  const quantity = Number(formData.quantity) || 0;

  const isWidthValid = width >= MIN_WIDTH_MM && width <= MAX_WIDTH_MM;
  const isHeightValid = height >= MIN_HEIGHT_MM && height <= MAX_HEIGHT_MM;
  const isSizeValid = isWidthValid && isHeightValid;

  const pcsPerRow = isSizeValid ? Math.floor(SHEET_WIDTH_MM / width) : 0;
  const pcsPerColumn = isSizeValid ? Math.floor(SHEET_HEIGHT_MM / height) : 0;
  const pcsPerSheet = pcsPerRow * pcsPerColumn;

  const sheetQty =
    pcsPerSheet > 0 && quantity > 0 ? Math.ceil(quantity / pcsPerSheet) : 0;

  // Dynamic pricing based on material and shape
  const unitPcs = getPricePerUnit(formData.material);
  const multiplier = getShapeMultiplier(formData.shape);
  const totalPrice = (quantity / unitPcs) * BASE_PRICE * multiplier;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const goToOrderPage = () => {
    const params = new URLSearchParams({
      material: formData.material,
      shape: formData.shape,
      width: formData.width,
      height: formData.height,
      quantity: formData.quantity,
      price: totalPrice.toString(),
      pcsPerSheet: pcsPerSheet.toString(),
      sheetQty: sheetQty.toString(),
    });

    window.location.href = `/order?${params.toString()}`;
  };

  return (
    <section id="calculator" className="w-full bg-white px-4 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            Angaran Harga Segera
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Kira Harga Sticker Anda
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Masukkan saiz dan kuantiti pelekat anda untuk menganggarkan berapa banyak pelekat yang muat dalam satu helaian serta anggaran harga pesanan anda.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator Form */}
          <div className="rounded-[2rem] border border-[#EAD8C8] bg-[#FFF7EF] p-5 md:p-8">
            <h3 className="mb-6 text-2xl font-bold">Sticker Details</h3>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Material Sticker
                </label>

                <select
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
                >
                  <option value="Mirrorcoat">Mirrorcoat</option>
                  <option value="Transparent White Ink">
                    Transparent White Ink
                  </option>
                  <option value="Waterproof">Waterproof</option>
                  <option value="Transparent">Transparent</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Bentuk Sticker
                </label>

                <select
                  name="shape"
                  value={formData.shape}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
                >
                  <option value="Circle">Bulat</option>
                  <option value="Square">Petak</option>
                  <option value="Rectangle">Segi empat tepat</option>
                  <option value="Oval">Bujur</option>
                  <option value="Custom Shape">Custom Bentuk</option>
                </select>
                {formData.shape === "Custom Shape" && (
                  <p className="mt-2 text-xs text-amber-600">
                    ⚡ Bentuk custom tambah +20% kepada harga asas.
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Lebar{" "}
                    <span className="text-[#6F625A]">
                      Min: 10mm, Max: 308mm
                    </span>
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="width"
                    min={MIN_WIDTH_MM}
                    max={MAX_WIDTH_MM}
                    value={formData.width}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
                  />

                  {!isWidthValid && width > 0 && (
                    <p className="mt-2 text-xs text-red-500">
                      Lebar mesti diantara 10mm dan 308mm.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Tinggi{" "}
                    <span className="text-[#6F625A]">
                      Min: 10mm, Max: 460mm
                    </span>
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="height"
                    min={MIN_HEIGHT_MM}
                    max={MAX_HEIGHT_MM}
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
                  />

                  {!isHeightValid && height > 0 && (
                    <p className="mt-2 text-xs text-red-500">
                      Tinggi mesti diantara 10mm dan 460mm.
                    </p>
                  )}
                </div>
              </div>

              {isSizeValid && pcsPerSheet > 0 && (
                <div className="rounded-2xl bg-white p-4 text-sm font-medium text-[#2B1B12]">
                  <p>
                    W: {pcsPerRow}, H: {pcsPerColumn} pcs
                  </p>
                  <p className="mt-1">
                    Qty per sheet: {pcsPerSheet} pcs | Helaian yang diperlukan:{" "}
                    {sheetQty}
                  </p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Kuantiti <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
                />
              </div>

              <p className="text-xs leading-5 text-red-500">
                Kuantiti tempahan sticker ini untuk 1 design sahaja. Sekiranya
                anda mahu menempah lebih dari 1 design, add to cart order
                pertama dahulu dan ulang semula belian.
              </p>
            </div>
          </div>

          {/* Result Card */}
          <div className="rounded-[2rem] bg-[#2B1B12] p-5 text-white md:p-8">
            <h3 className="text-2xl font-bold">Anggaran kos</h3>

            <div className="mt-6 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Material</p>
              <p className="mt-1 text-xl font-bold">{formData.material}</p>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Bentuk</p>
              <p className="mt-1 text-xl font-bold">
                {formData.shape}
                {formData.shape === "Custom Shape" && (
                  <span className="ml-2 text-sm font-normal text-amber-300">
                    (+20%)
                  </span>
                )}
              </p>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Size</p>
              <p className="mt-1 text-xl font-bold">
                {formData.width || "-"}mm × {formData.height || "-"}mm
              </p>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Kuantiti per helaian</p>
              <p className="mt-1 text-xl font-bold">
                {pcsPerSheet > 0 ? pcsPerSheet : 0} pcs / helaian
              </p>

              <p className="mt-2 text-sm text-white/70">
                W: {pcsPerRow} pcs, H: {pcsPerColumn} pcs
              </p>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Kuantiti helaian</p>
              <p className="mt-1 text-xl font-bold">
                {sheetQty} helaian{sheetQty > 1 ? "" : ""}
              </p>
            </div>

            <div className="mt-6 rounded-3xl bg-[#FD7C03] p-6">
              <p className="text-sm font-semibold text-white/80">
                Jumlah anggaran
              </p>

              <p className="mt-2 text-4xl font-bold">
                RM{totalPrice.toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-white/80">
                RM{BASE_PRICE} / {getPricePerUnit(formData.material)} pcs
                {multiplier !== 1 && " • +20% custom shape fee"}
              </p>
            </div>

            <button
              type="button"
              onClick={goToOrderPage}
              disabled={!isSizeValid || quantity <= 0}
              className="mt-6 w-full rounded-full bg-white px-8 py-4 font-semibold text-[#2B1B12] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Teruskan untuk pesan
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-white/60">
              Harga akhir mungkin akan disahkan semula oleh pentadbir sebelum invois dikeluarkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}