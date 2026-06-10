import { loginAdmin } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF7EF] px-4 text-[#2B1B12]">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03]">
            Admin Access
          </p>

          <h1 className="text-3xl font-bold">StickerKita Admin</h1>

          <p className="mt-3 text-sm leading-6 text-[#6F625A]">
            Enter your admin password to view and manage customer orders.
          </p>
        </div>

        {params.error && (
          <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
            Incorrect password. Please try again.
          </div>
        )}

        <form action={loginAdmin} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white p-4 outline-none focus:border-[#FD7C03]"
            required
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#FD7C03] px-8 py-4 font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}