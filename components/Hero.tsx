export default function Hero() {
  return (
    <section className="w-full px-4 py-12 md:px-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <p className="mb-4 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            Mirrorcoat, waterproof & transparent stickers
          </p>

          <h1 className="mx-auto max-w-xl text-4xl font-bold leading-tight md:mx-0 md:text-6xl">
            Custom Stickers Made Simple.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#6F625A] md:mx-0 md:mt-6 md:text-lg md:leading-8">
            Choose from mirrorcoat, mirrorcoat with gloss, waterproof, and transparent 
            stickers for your business labels, packaging, gifts, and product branding.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <a
              href="/order"
              className="w-full rounded-full bg-[#FD7C03] px-8 py-4 text-center font-semibold text-white shadow-md transition hover:opacity-90 sm:w-auto"
            >
              Start Order
            </a>

            <a
              href="#products"
              className="w-full rounded-full bg-[#FD7C03] px-8 py-4 text-center font-semibold text-white shadow-md transition hover:opacity-90 sm:w-auto"
            >
              View Stickers
            </a>
          </div>
        </div>

        <div className="w-full rounded-[1.5rem] bg-white p-4 shadow-xl md:rounded-[2rem] md:p-8">
          <div className="rounded-[1.25rem] bg-[#FFE1C2] p-5 text-center md:rounded-[1.5rem] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FD7C03] md:text-sm">
              Sticker Preview
            </p>

            <div className="mx-auto mt-6 flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full bg-white shadow-lg md:mt-8 md:max-w-[280px]">
              <div className="px-4 text-center">
                <p className="text-2xl font-bold md:text-3xl">StickerKita</p>
                <p className="mt-2 text-xs text-[#6F625A] md:text-sm">
                  Premium custom stickers
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-[#6F625A] md:mt-8 md:text-sm">
              Design playground coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}