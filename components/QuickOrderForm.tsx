"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants";

type CartItem = {
  id: number;
  material: string;
  designCode: string;
  shape: string;
  size: string;
  quantity: number;
  price: number;
};

const PRICE_PER_1000 = 59;

export default function QuickOrderForm() {
  const [customerData, setCustomerData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    deliveryMethod: "",
    address: "",
    designDescription: "",
  });

  const [itemData, setItemData] = useState({
    material: "",
    designCode: "",
    shape: "",
    size: "",
    quantity: "",
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCustomerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateItemPrice = (quantity: number) => {
    const blocks = Math.ceil(quantity / 1000);
    return blocks * PRICE_PER_1000;
  };

  const addToCart = () => {
    if (
      !itemData.material ||
      !itemData.shape ||
      !itemData.size ||
      !itemData.quantity
    ) {
      alert("Please complete the sticker item details first.");
      return;
    }

    const quantity = Number(itemData.quantity);

    if (quantity <= 0) {
      alert("Quantity must be more than 0.");
      return;
    }

    const newItem: CartItem = {
      id: Date.now(),
      material: itemData.material,
      designCode: itemData.designCode || "Own design / Not selected",
      shape: itemData.shape,
      size: itemData.size,
      quantity,
      price: calculateItemPrice(quantity),
    };

    setCart([...cart, newItem]);

    setItemData({
      material: "",
      designCode: "",
      shape: "",
      size: "",
      quantity: "",
    });
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const generateWhatsAppMessage = (invoiceNo: string) => {
    const cartDetails = cart
      .map(
        (item, index) => `
*Item ${index + 1}*
Material: ${item.material}
Design Code: ${item.designCode}
Shape: ${item.shape}
Size: ${item.size}
Quantity: ${item.quantity} pcs
Price: RM${item.price.toFixed(2)}`
      )
      .join("\n");

    const message = `*NEW STICKERKITA ORDER*

    *Invoice Code*
    ${invoiceNo}

*Customer Details*
Name: ${customerData.name}
Business/Brand: ${customerData.business || "-"}
Phone: ${customerData.phone}
Email: ${customerData.email || "-"}

*Cart Details*
${cartDetails}

*Order Summary*
Total Items: ${cart.length}
Total Amount: RM${totalAmount.toFixed(2)}

*Delivery Details*
Delivery Method: ${customerData.deliveryMethod}
Address: ${customerData.address || "-"}

*Design Notes*
${customerData.designDescription || "-"}

Please confirm the invoice and payment details.`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Please add at least one sticker item to cart.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...customerData,
          cartItems: cart,
          itemCount: cart.length,
          subtotal: totalAmount,
          totalDue: totalAmount,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(`Order could not be saved: ${result.message}`);
        return;
      }

      const invoiceNo = result.invoiceNo || result.order?.invoice_no;

      const whatsappNumber = BRAND.whatsapp;
      const url = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(
        invoiceNo
      )}`;

      window.location.href = url;
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Details */}
      <section>
        <h3 className="mb-4 text-xl font-bold">Customer Details</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={customerData.name}
            onChange={handleCustomerChange}
            required
          />

          <input
            type="text"
            name="business"
            placeholder="Business / Brand Name"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={customerData.business}
            onChange={handleCustomerChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={customerData.phone}
            onChange={handleCustomerChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={customerData.email}
            onChange={handleCustomerChange}
          />
        </div>
      </section>

      {/* Add Sticker Item */}
      <section className="rounded-[2rem] bg-[#FFF7EF] p-5 md:p-6">
        <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold">Add Sticker Item</h3>
            <p className="mt-1 text-sm text-[#6F625A]">
              Add one or more sticker items before submitting your order.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-bold text-[#FD7C03]">
            RM59 / 1000 pcs
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="material"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={itemData.material}
            onChange={handleItemChange}
          >
            <option value="">Select Sticker Material</option>
            <option value="Mirrorcoat">Mirrorcoat - RM59 / 1000 pcs</option>
            <option value="Transparent White Ink">
              Transparent White Ink - RM59 /  500 pcs
            </option>
            <option value="Waterproof">Waterproof - RM59 / 1000 pcs</option>
            <option value="Transparent">Transparent - RM59 / 1000 pcs</option>
          </select>

          <input
            type="text"
            name="designCode"
            placeholder="Design Code e.g. CT-002"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={itemData.designCode}
            onChange={handleItemChange}
          />

          <select
            name="shape"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={itemData.shape}
            onChange={handleItemChange}
          >
            <option value="">Select Shape</option>
            <option value="Circle">Circle</option>
            <option value="Square">Square</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Oval">Oval</option>
            <option value="Custom Size">Custom Size</option>
          </select>

          <input
            type="text"
            name="size"
            placeholder="Size e.g. 4cm / 5x5cm"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={itemData.size}
            onChange={handleItemChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity / pcs"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={itemData.quantity}
            onChange={handleItemChange}
            min="1"
          />

          <button
            type="button"
            onClick={addToCart}
            className="rounded-full bg-[#2B1B12] px-8 py-4 font-semibold text-white transition hover:opacity-90"
          >
            Add to Cart
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#6F625A]">
          Price is calculated at RM59 per 1000 pcs. Quantity below 1000 pcs is
          still counted as one 1000 pcs block.
        </p>
      </section>

      {/* Cart Summary */}
      <section>
        <h3 className="mb-4 text-xl font-bold">Cart Summary</h3>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#EAD8C8] bg-white p-6 text-center text-sm text-[#6F625A]">
            No sticker item added yet.
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="rounded-3xl border border-[#EAD8C8] bg-white p-5"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p className="mb-2 text-sm font-bold text-[#FD7C03]">
                      Item {index + 1}
                    </p>

                    <h4 className="text-lg font-bold">{item.material}</h4>

                    <p className="mt-2 text-sm leading-6 text-[#6F625A]">
                      Design: {item.designCode}
                      <br />
                      Shape: {item.shape}
                      <br />
                      Size: {item.size}
                      <br />
                      Quantity: {item.quantity} pcs
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xl font-bold text-[#FD7C03]">
                      RM{item.price.toFixed(2)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 text-sm font-semibold text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-[#2B1B12] p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Total Amount</p>
                <p className="text-2xl font-bold">
                  RM{totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Delivery Details */}
      <section>
        <h3 className="mb-4 text-xl font-bold">Delivery Details</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="deliveryMethod"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            value={customerData.deliveryMethod}
            onChange={handleCustomerChange}
            required
          >
            <option value="">Delivery Method *</option>
            <option value="Postage">Postage</option>
            <option value="Self Pickup">Self Pickup</option>
            <option value="Runner / Local Delivery">
              Runner / Local Delivery
            </option>
          </select>
        </div>

        <textarea
          name="address"
          placeholder="Delivery Address"
          className="mt-4 w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
          rows={3}
          value={customerData.address}
          onChange={handleCustomerChange}
        />

        <textarea
          name="designDescription"
          placeholder="Overall design notes. Example: Use soft pink theme, add halal logo, change brand name, etc."
          className="mt-4 w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
          rows={4}
          value={customerData.designDescription}
          onChange={handleCustomerChange}
        />
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#FD7C03] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting Order..." : "Submit Order via WhatsApp →"}
      </button>

      <p className="text-center text-xs leading-5 text-[#6F625A]">
        Your order will be saved in our system first. After that, WhatsApp will
        open with your full order details.
      </p>
    </form>
  );
}