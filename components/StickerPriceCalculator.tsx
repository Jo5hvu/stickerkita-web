"use client";

import { useState } from "react";
import {
  calculateStickerPriceDetailed,
  getMaterialGroup,
} from "@/lib/stickerPricing";

const MIN_WIDTH_MM = 10;
const MAX_WIDTH_MM = 308;
const MIN_HEIGHT_MM = 10;
const MAX_HEIGHT_MM = 460;

const SHEET_WIDTH_MM = 308;
const SHEET_HEIGHT_MM = 460;

export default function StickerPriceCalculator() {
  const [formData, setFormData] = useState({
    material: "Mirrorcoat",
    shape: "Circle",
    width: "50",
    height: "50",
    quantity: "1000",
  });

  const widthMm = Number(formData.width) || 0;
  const heightMm = Number(formData.height) || 0;
  const quantity = Number(formData.quantity) || 0;

  const widthCm = widthMm / 10;
  const heightCm = heightMm / 10;

  const isWidthValid = widthMm >= MIN_WIDTH_MM && widthMm <= MAX_WIDTH_MM;
  const isHeightValid = heightMm >= MIN_HEIGHT_MM && heightMm <= MAX_HEIGHT_MM;
  const isSizeValid = isWidthValid && isHeightValid;

  const pcsPerRow = isSizeValid ? Math.floor(SHEET_WIDTH_MM / widthMm) : 0;
  const pcsPerColumn = isSizeValid ? Math.floor(SHEET_HEIGHT_MM / heightMm) : 0;
  const pcsPerSheet = pcsPerRow * pcsPerColumn;

  const sheetQty =
    pcsPerSheet > 0 && quantity > 0 ? Math.ceil(quantity / pcsPerSheet) : 0;

  const materialGroup = getMaterialGroup(formData.material);

  const priceResult =
    isSizeValid && quantity > 0
      ? calculateStickerPriceDetailed(
          materialGroup,
          widthCm,
          heightCm,
          quantity
        )
      : null;

  const totalPrice = priceResult?.price || 0;

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
            Instant price estimate
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Calculate Your Sticker Price
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Enter your sticker size and quantity to estimate how many stickers
            fit in one sheet and your estimated price.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator Form */}
          <div className="rounded-[2rem] border border-[#EAD8C8] bg-[#FFF7EF] p-5 md:p-8">
            <h3 className="mb-6 text-2xl font-bold">Sticker Details</h3>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Sticker Material
                </label>

                <select
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
                >
                  <option value="Mirrorcoat">Mirrorcoat</option>
                  <option value="Mirrorcoat + Gloss">Mirrorcoat + Gloss</option>
                  <option value="Waterproof">Waterproof</option>
                  <option value="Transparent">Transparent</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Sticker Shape
                </label>

                <select
                  name="shape"
                  value={formData.shape}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
                >
                  <option value="Circle">Circle</option>
                  <option value="Square">Square</option>
                  <option value="Rectangle">Rectangle</option>
                  <option value="Oval">Oval</option>
                  <option value="Custom Size">Custom Size</option>
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Width{" "}
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

                  {!isWidthValid && widthMm > 0 && (
                    <p className="mt-2 text-xs text-red-500">
                      Width must be between 10mm and 308mm.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Height{" "}
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

                  {!isHeightValid && heightMm > 0 && (
                    <p className="mt-2 text-xs text-red-500">
                      Height must be between 10mm and 460mm.
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
                    Qty per sheet: {pcsPerSheet} pcs | Sheets needed:{" "}
                    {sheetQty}
                  </p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Quantity <span className="text-red-500">*</span>
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
            <h3 className="text-2xl font-bold">Estimated Result</h3>

            <div className="mt-6 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Material</p>
              <p className="mt-1 text-xl font-bold">{formData.material}</p>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Size</p>
              <p className="mt-1 text-xl font-bold">
                {formData.width || "-"}mm × {formData.height || "-"}mm
              </p>

              <p className="mt-2 text-sm text-white/70">
                Price size used:{" "}
                {priceResult?.sizeUsed ? `${priceResult.sizeUsed}cm` : "-"}
              </p>

              <p className="mt-1 text-xs text-white/60">
                Method: {priceResult?.pricingMethod || "-"}
              </p>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Quantity per sheet</p>
              <p className="mt-1 text-xl font-bold">
                {pcsPerSheet > 0 ? pcsPerSheet : 0} pcs / sheet
              </p>

              <p className="mt-2 text-sm text-white/70">
                W: {pcsPerRow} pcs, H: {pcsPerColumn} pcs
              </p>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-white/70">Sheet quantity</p>
              <p className="mt-1 text-xl font-bold">
                {sheetQty} sheet{sheetQty > 1 ? "s" : ""}
              </p>
            </div>

            <div className="mt-6 rounded-3xl bg-[#FD7C03] p-6">
              <p className="text-sm font-semibold text-white/80">
                Total Estimate
              </p>

              {priceResult?.price ? (
                <>
                  <p className="mt-2 text-4xl font-bold">
                    RM{totalPrice.toFixed(2)}
                  </p>

                  <p className="mt-2 text-xs text-white/80">
                    {priceResult.message}
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-2 text-3xl font-bold">Custom Quote</p>

                  <p className="mt-2 text-xs text-white/80">
                    {priceResult?.message ||
                      "Please enter valid size and quantity."}
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={goToOrderPage}
              disabled={!isSizeValid || quantity <= 0}
              className="mt-6 w-full rounded-full bg-white px-8 py-4 font-semibold text-[#2B1B12] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue to Order
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-white/60">
              Final price may be confirmed again by admin before invoice is
              issued.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}