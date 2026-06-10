import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function generateInvoiceNo() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const time = String(now.getTime()).slice(-5);

  return `SKT${year}${month}${day}${time}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("ORDER BODY:", body);

    const invoiceNo = generateInvoiceNo();

    const orderData = {
      invoice_no: invoiceNo,

      customer_name: body.name,
      business_name: body.business || null,
      phone: body.phone,
      email: body.email || null,

      material: body.material,
      design_code: body.designCode || null,
      shape: body.shape,
      size: body.size,
      quantity: Number(body.quantity),

      delivery_method: body.deliveryMethod,
      address: body.address || null,
      design_notes: body.designDescription || null,

      status: "New",
      payment_status: "Unpaid",
    };

    console.log("ORDER DATA TO INSERT:", orderData);

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
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
      order: data,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "API route crashed",
        error: String(error),
      },
      { status: 500 }
    );
  }
}