import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("stickerkita_admin")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const allowedUpdates: {
      status?: string;
      payment_status?: string;
    } = {};

    if (body.status) {
      allowedUpdates.status = body.status;
    }

    if (body.payment_status) {
      allowedUpdates.payment_status = body.payment_status;
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update(allowedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      order: data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    );
  }
}