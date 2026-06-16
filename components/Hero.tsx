export default function Hero() {
  const contactItems = [
    {
      label: "www.stickerkita.my",
      icon: "🌐",
    },
    {
      label: "+60 10-663 0045",
      icon: "☎",
    },
    {
      label: "32, Jln Bpm 5, Taman Bukit Piatu Mutiara, 75150 Melaka",
      icon: "📍",
    },
  ];

  const servicePoints = [
    {
      title: "Tempahan Sesuaian yang Mudah",
      icon: "order",
    },
    {
      title: "Bahan Berkualiti & Kemasan Halus",
      icon: "quality",
    },
    {
      title: "Sesuai untuk Jenama & Pembungkusan",
      icon: "package",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F7F5] px-4 py-10 md:px-12 lg:px-16">
      {/* Soft background pattern */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute left-1/3 top-10 h-96 w-96 rotate-45 bg-white/60 blur-2xl" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/70 to-transparent" />
      </div>

      {/* Decorative orange and black shapes */}
      <div className="absolute bottom-0 right-0 hidden h-52 w-80 bg-[#1F1F1F] lg:block" />
      <div className="absolute bottom-16 right-8 hidden h-32 w-48 -skew-x-12 bg-[#EF6C00] lg:block" />
      <div className="absolute right-10 top-16 hidden h-24 w-24 rotate-45 border-[18px] border-[#EF6C00] border-l-transparent border-b-transparent lg:block" />
      <div className="absolute bottom-20 right-[38%] hidden h-24 w-24 rotate-45 bg-[#FD7C03] lg:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left content */}
        <div>
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="/images/stickerkita-logo.png"
              alt="StickerKita logo"
              className="w-[280px] max-w-full md:w-[430px] lg:w-[520px]"
            />
          </div>

          {/* Service points */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {servicePoints.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 text-left"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1F1F1F] text-white shadow-md">
                  {item.icon === "order" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                      <path d="M8 16l2 2 5-5" />
                    </svg>
                  )}

                  {item.icon === "quality" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                      fill="currentColor"
                    >
                      <path d="M5 5h14v11H9l-4 4V5z" />
                      <path
                        d="M15.5 9.5c-3.5.3-6.1 2.4-7.2 5.7 3.6-.2 6.4-2.2 7.2-5.7z"
                        fill="#1F1F1F"
                      />
                    </svg>
                  )}

                  {item.icon === "package" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2 3 7l9 5 9-5-9-5z" />
                      <path d="M3 7v10l9 5 9-5V7" />
                      <path d="M12 12v10" />
                    </svg>
                  )}
                </div>

                <p className="text-base font-medium leading-6 text-[#2B1B12]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* QR and contact */}
          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row lg:items-start">
            {/* QR placeholder */}
            <div className="flex h-36 w-36 shrink-0 items-center justify-center border-4 border-white bg-white shadow-md">
              <img
                src="/images/qr/whatsapp-qr.png"
                alt="StickerKita WhatsApp QR"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-3 sm:justify-start"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F1F1F] text-sm text-white">
                    {item.icon}
                  </div>

                  <p className="max-w-sm text-sm font-medium leading-5 text-[#2B1B12] md:text-base">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right shop picture */}
        <div className="relative hidden min-h-[380px] items-center justify-center lg:flex">
          <div className="relative z-10 h-[330px] w-[430px]">
            <div
              className="absolute inset-0 bg-[#1F1F1F]"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            />

            <div
              className="absolute inset-[16px] overflow-hidden bg-white"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            >
              <img
                src="/images/hero/shop-front.jpg"
                alt="StickerKita shop front"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute bottom-6 left-8 h-40 w-10 -rotate-45 bg-[#1F1F1F]" />
        </div>
      </div>
    </section>
  );
}