import { BRAND } from "@/lib/constants";

export default function OrderCTA() {
  const whatsappMessage = encodeURIComponent(
    `Hai StickerKita, saya berminat untuk membuat tempahan sticker.

Boleh bantu saya semak harga dan pilihan material?

Detail tempahan:
- Jenis sticker:
- Saiz:
- Bentuk:
- Kuantiti:
- Ada design sendiri / nak pilih design sedia ada:

Terima kasih.`
  );

  return (
    <section id="order" className="px-6 py-20 md:px-16">
      <div className="rounded-[2rem] bg-[#2B1B12] px-8 py-16 text-center text-white md:px-16">
        <h2 className="text-4xl font-bold">Sedia untuk cetak sticker anda??</h2>

        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Hantarkan butiran pelekat anda kepada kami, dan kami akan membantu anda memilih bahan, saiz, kuantiti, serta kemasan yang terbaik untuk produk atau pembungkusan anda.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#FD7C03] px-8 py-4 font-semibold text-white transition hover:opacity-90"
          >
            Order melalui WhatsApp
          </a>

          <a
            href={`mailto:${BRAND.email}`}
            className="rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#2B1B12]"
          >
            Email Kami
          </a>
        </div>
      </div>
    </section>
  );
}