import { products } from "@/data/products";

export default function Products() {
  return (
    <section id="products" className="w-full px-4 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            Material Sticker
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Pilih Jenis Sticker Anda
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Kami menyediakan bahan pelekat yang berbeza bergantung pada produk, bajet, kemasan, dan kegunaan anda.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex h-full flex-col rounded-3xl border border-[#EAD8C8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <span className="mb-3 w-fit rounded-full bg-[#FFE1C2] px-3 py-1 text-xs font-semibold text-[#FD7C03]">
                {product.tag}
              </span>

              <h3 className="text-xl font-bold">{product.name}</h3>

              <div className="mt-3 rounded-2xl bg-[#FFF7EF] px-4 py-3">
                <p className="text-sm text-[#6F625A]">Starting price</p>
                <p className="text-xl font-bold text-[#FD7C03]">{product.price}</p>
              </div>
              
              <p className="mt-4 flex-1 text-sm leading-6 text-[#6F625A]">
                {product.description}
              </p>

              <div className="mt-5">
                <p className="mb-2 text-sm font-bold">Best for:</p>

                <div className="flex flex-wrap gap-2">
                  {product.bestFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#EAD8C8] px-3 py-1 text-xs text-[#6F625A]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="/order"
                className="mt-6 inline-block rounded-full bg-[#FD7C03] px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                Pilih jenis ini
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}