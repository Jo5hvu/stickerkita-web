"use client";

import { useState } from "react";

type CartItem = {
  id: string;
  invoice_no: string;
  customer_name: string;
  business_name: string | null;
  phone: string;
  email: string | null;
  material: string;
  design_code: string | null;
  shape: string;
  size: string;
  quantity: number;
  delivery_method: string;
  address: string | null;
  design_notes: string | null;
  status: string;
  payment_status: string;
  cart_items: Array<{
    material: string;
    shape: string;
    size: string;
    quantity: number;
    designCode: string;
  }> | null;
  item_count: number | null;
  subtotal: number | null;
  total_due: number | null;
  created_at: string;
};

const orderStatuses = [
  "New",
  "Waiting Quotation",
  "Waiting Payment",
  "Designing",
  "Pending Approval",
  "Printing",
  "Ready for Pickup",
  "Ready to Ship",
  "Completed",
  "Cancelled",
];

const paymentStatuses = ["Unpaid", "Deposit Paid", "Paid", "Refunded"];

export default function AdminOrdersTable({ orders }: { orders: CartItem[] }) {
  const [orderList, setOrderList] = useState(orders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateOrder = async (
    id: string,
    field: "status" | "payment_status",
    value: string
  ) => {
    setUpdatingId(id);

    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [field]: value,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message || "Failed to update order.");
        return;
      }

      setOrderList((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id ? { ...order, [field]: value } : order
        )
      );
    } catch (error) {
      alert("Something went wrong while updating the order.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (orderList.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold">No orders yet</h2>
        <p className="mt-2 text-sm text-[#6F625A]">
          New customer orders will appear here after they submit the order form.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
          <thead className="bg-[#2B1B12] text-white">
            <tr>
              <th className="p-4">Invoice</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Sticker Details</th>
              <th className="p-4">Design</th>
              <th className="p-4">Delivery</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Total</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {orderList.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#EAD8C8] align-top hover:bg-[#FFF7EF]"
              >
                {/* Invoice Column */}
                <td className="p-4 font-bold text-[#FD7C03]">
                  {order.invoice_no}
                </td>

                {/* Customer Column */}
                <td className="p-4">
                  <p className="font-semibold">{order.customer_name}</p>
                  <p className="text-xs text-[#6F625A]">
                    {order.business_name || "-"}
                  </p>
                  <p className="text-xs text-[#6F625A]">
                    {order.email || "-"}
                  </p>
                </td>

                {/* Phone Column */}
                <td className="p-4">
                  <a
                    href={`https://wa.me/6${order.phone.replace(/^0/, "")}`}
                    target="_blank"
                    className="font-semibold text-[#FD7C03] hover:underline"
                  >
                    {order.phone}
                  </a>
                </td>

                {/* Sticker Details Column - REPLACED WITH NEW CODE */}
                <td className="p-4">
                  <p className="font-semibold">
                    {order.item_count || 1} item(s)
                  </p>

                  <div className="mt-2 space-y-2">
                    {(order.cart_items || []).map((item, index) => (
                      <div key={index} className="text-xs leading-5 text-[#6F625A]">
                        <span className="font-bold text-[#2B1B12]">
                          {index + 1}. {item.material}
                        </span>
                        <br />
                        {item.shape}, {item.size}, {item.quantity} pcs
                        <br />
                        Design: {item.designCode}
                      </div>
                    ))}
                  </div>
                </td>

                {/* Design Column */}
                <td className="p-4">
                  <p className="font-semibold">{order.design_code || "-"}</p>
                  <p className="max-w-[180px] text-xs leading-5 text-[#6F625A]">
                    {order.design_notes || "-"}
                  </p>
                </td>

                {/* Delivery Column */}
                <td className="p-4">
                  <p className="font-semibold">{order.delivery_method}</p>
                  <p className="max-w-[180px] whitespace-pre-line text-xs leading-5 text-[#6F625A]">
                    {order.address || "-"}
                  </p>
                </td>

                {/* Order Status Column */}
                <td className="p-4">
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) =>
                      updateOrder(order.id, "status", e.target.value)
                    }
                    className="rounded-full border border-[#EAD8C8] bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-[#FD7C03] disabled:opacity-50"
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Payment Status Column */}
                <td className="p-4">
                  <select
                    value={order.payment_status}
                    disabled={updatingId === order.id}
                    onChange={(e) =>
                      updateOrder(order.id, "payment_status", e.target.value)
                    }
                    className="rounded-full border border-[#EAD8C8] bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-[#FD7C03] disabled:opacity-50"
                  >
                    {paymentStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Total Price Column - NEW */}
                <td className="p-4 font-bold text-[#FD7C03]">
                  RM{Number(order.total_due || 0).toFixed(2)}
                </td>

                {/* Date Column */}
                <td className="p-4 text-xs text-[#6F625A]">
                  {new Date(order.created_at).toLocaleDateString("en-MY", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}