import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAdmin } from "../actions";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import AdminOrdersTable from "@/components/AdminOrdersTable";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("stickerkita_admin")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFF7EF] px-4 py-12 text-[#2B1B12] md:px-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Admin Orders</h1>
          <p className="mt-4 text-red-600">
            Failed to load orders: {error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF7EF] px-4 py-8 text-[#2B1B12] md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03]">
              Admin Dashboard
            </p>

            <h1 className="text-3xl font-bold md:text-5xl">
              StickerKita Orders
            </h1>

            <p className="mt-3 text-sm text-[#6F625A]">
              Monitor customer orders, update order status, and track payment
              progress.
            </p>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-full border border-[#EAD8C8] bg-white px-6 py-3 text-sm font-semibold transition hover:border-[#FD7C03]"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm text-[#6F625A]">Total Orders</p>
            <p className="mt-2 text-3xl font-bold">{orders?.length || 0}</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm text-[#6F625A]">New Orders</p>
            <p className="mt-2 text-3xl font-bold">
              {orders?.filter((order) => order.status === "New").length || 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm text-[#6F625A]">Printing</p>
            <p className="mt-2 text-3xl font-bold">
              {orders?.filter((order) => order.status === "Printing").length ||
                0}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm text-[#6F625A]">Unpaid</p>
            <p className="mt-2 text-3xl font-bold">
              {orders?.filter((order) => order.payment_status === "Unpaid")
                .length || 0}
            </p>
          </div>
        </div>

        <AdminOrdersTable orders={orders || []} />
      </div>
    </main>
  );
}