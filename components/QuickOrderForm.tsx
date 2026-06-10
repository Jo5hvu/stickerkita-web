"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants";

export default function QuickOrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    material: "",
    designCode: "",
    size: "",
    shape: "",
    quantity: "",
    deliveryMethod: "",
    address: "",
    designDescription: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateWhatsAppMessage = (savedOrderNumber: string) => {
    const message = `*NEW STICKERKITA ORDER #${savedOrderNumber}*

*Customer Details*
Name: ${formData.name}
Business/Brand: ${formData.business || "-"}
Phone: ${formData.phone}
Email: ${formData.email || "-"}

*Sticker Details*
Material: ${formData.material}
Design Code: ${formData.designCode || "Own design / Not selected"}
Shape: ${formData.shape}
Size: ${formData.size}
Quantity: ${formData.quantity} pcs

*Delivery Details*
Delivery Method: ${formData.deliveryMethod}
Address: ${formData.address || "-"}

*Design Notes*
${formData.designDescription || "-"}

Order saved in system. Please confirm price and payment.`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Save to Supabase
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        alert("Order could not be saved. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Step 2: Store order number for display
      setOrderNumber(result.orderNumber);

      // Step 3: Send WhatsApp message with order number
      const whatsappNumber = BRAND.whatsapp;
      const url = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(result.orderNumber)}`;

      window.open(url, "_blank");

      // Step 4: Optional - Reset form after successful submission
      setFormData({
        name: "",
        business: "",
        phone: "",
        email: "",
        material: "",
        designCode: "",
        size: "",
        shape: "",
        quantity: "",
        deliveryMethod: "",
        address: "",
        designDescription: "",
      });

    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message if order was saved
  if (orderNumber) {
    return (
      <div className="rounded-2xl bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-green-800">Order Received!</h3>
        <p className="mb-4 text-green-700">
          Your order number: <strong className="text-lg">{orderNumber}</strong>
        </p>
        <p className="text-sm text-green-600">
          WhatsApp has opened with your order details. Please send your design file there.
        </p>
        <button
          onClick={() => setOrderNumber(null)}
          className="mt-6 rounded-full bg-[#FD7C03] px-6 py-2 text-white"
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Customer Details */}
      <div>
        <h3 className="mb-4 text-xl font-bold">Customer Details</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="business"
            placeholder="Business / Brand Name"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.business}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Sticker Details */}
      <div>
        <h3 className="mb-4 text-xl font-bold">Sticker Details</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="material"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.material}
            onChange={handleChange}
            required
          >
            <option value="">Select Sticker Material *</option>
            <option value="Mirrorcoat">Mirrorcoat</option>
            <option value="Mirrorcoat + Gloss">Mirrorcoat + Gloss</option>
            <option value="Waterproof">Waterproof</option>
            <option value="Transparent">Transparent</option>
          </select>

          <input
            type="text"
            name="designCode"
            placeholder="Design Code e.g. MS-001 / CT-002"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.designCode}
            onChange={handleChange}
          />

          <select
            name="shape"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.shape}
            onChange={handleChange}
            required
          >
            <option value="">Select Shape *</option>
            <option value="Circle">Circle</option>
            <option value="Square">Square</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Oval">Oval</option>
            <option value="Custom Size">Custom Size</option>
          </select>

          <input
            type="text"
            name="size"
            placeholder="Size e.g. 4cm / 5cm / 5x5cm *"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.size}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity / pcs *"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />

          <select
            name="deliveryMethod"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={formData.deliveryMethod}
            onChange={handleChange}
            required
          >
            <option value="">Delivery Method *</option>
            <option value="Postage">Postage</option>
            <option value="Self Pickup">Self Pickup</option>
            <option value="Runner / Local Delivery">Runner / Local Delivery</option>
          </select>
        </div>
      </div>

      {/* Address */}
      <textarea
        name="address"
        placeholder="Delivery Address"
        className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
        rows={3}
        value={formData.address}
        onChange={handleChange}
      />

      {/* Design Notes */}
      <textarea
        name="designDescription"
        placeholder="Design notes. Example: Change name to Soft Cookies, use soft pink theme, add halal logo, etc."
        className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
        rows={4}
        value={formData.designDescription}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#FD7C03] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Saving Order..." : "Send Order via WhatsApp →"}
      </button>

      <p className="text-center text-xs leading-5 text-[#6F625A]">
        Your order will be saved in our system. WhatsApp will open with order details.
        Please send your design file separately in WhatsApp.
      </p>
    </form>
  );
}