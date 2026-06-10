import { BRAND } from "@/lib/constants";

export default function OrderCTA() {
  return (
    <section id="order" className="px-6 py-20 md:px-16">
      <div className="rounded-[2rem] bg-[#2B1B12] px-8 py-16 text-center text-white md:px-16">
        <h2 className="text-4xl font-bold">Ready to print your stickers?</h2>

        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Send us your sticker details and we will help you choose the best
          material, size, quantity, and finishing for your product or packaging.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            className="rounded-full bg-[#FD7C03] px-8 py-4 font-semibold text-white transition hover:opacity-90"
          >
            Order via WhatsApp
          </a>

          <a
            href={`mailto:${BRAND.email}`}
            className="rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#2B1B12]"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}