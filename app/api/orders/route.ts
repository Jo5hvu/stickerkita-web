import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function getMalaysiaDateParts() {
  const now = new Date();

  const malaysiaDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })
  );

  const day = String(malaysiaDate.getDate()).padStart(2, "0");
  const month = String(malaysiaDate.getMonth() + 1).padStart(2, "0");

  const startOfDay = new Date(malaysiaDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(malaysiaDate);
  endOfDay.setHours(23, 59, 59, 999);

  return {
    day,
    month,
    startOfDay,
    endOfDay,
  };
}

async function generateInvoiceNo() {
  const { day, month, startOfDay, endOfDay } = getMalaysiaDateParts();

  const { count, error } = await supabaseAdmin
    .from("orders")
    .select("id", { count: "exact", head: true })
    .gte("created_at", startOfDay.toISOString())
    .lte("created_at", endOfDay.toISOString());

  if (error) {
    throw new Error(error.message);
  }

  const dailyOrderNumber = (count || 0) + 1;
  const runningNumber = String(dailyOrderNumber).padStart(2, "0");

  return `STK${day}${month}1${runningNumber}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const invoiceNo = await generateInvoiceNo();

    const cartItems = body.cartItems || [];
    const firstItem = cartItems[0];

    const orderData = {
      invoice_no: invoiceNo,

      customer_name: body.name,
      business_name: body.business || null,
      phone: body.phone,
      email: body.email || null,

      material: firstItem?.material || "-",
      design_code: firstItem?.designCode || null,
      shape: firstItem?.shape || "-",
      size: firstItem?.size || "-",
      quantity: firstItem?.quantity || 0,

      cart_items: cartItems,
      item_count: body.itemCount || cartItems.length,

      delivery_method: body.deliveryMethod,
      address: body.address || null,
      design_notes: body.designDescription || null,

      status: "New",
      payment_status: "Unpaid",

      subtotal: body.subtotal || 0,
      deposit: 0,
      shipping_fee: 0,
      total_due: body.totalDue || body.subtotal || 0,
    };

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
      invoiceNo: data.invoice_no,
      order: data,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while saving the order.",
      },
      { status: 500 }
    );
  }
}