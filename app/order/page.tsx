import QuickOrderForm from "@/components/QuickOrderForm";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#FFF7EF] px-4 py-12 text-[#2B1B12] md:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            StickerKita Order Form
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            Place Your Sticker Order
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Fill in your sticker details below. We will confirm the price,
            invoice, and payment details through WhatsApp.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-xl md:p-10">
          <QuickOrderForm />
        </div>
      </div>
    </main>
  );
}