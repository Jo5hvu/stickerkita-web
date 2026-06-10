import { BRAND } from "@/lib/constants";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-16">
        <a href="#" className="flex min-w-0 items-center">
          <img
            src="/images/stickerkita-logo.png"
            alt="StickerKita logo"
            className="w-32 md:w-44"
          />
        </a>

        <div className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#products" className="hover:text-[#FD7C03]">
            Products
          </a>
          <a href="#designs" className="hover:text-[#FD7C03]">
            Designs
          </a>
          <a href="#templates" className="hover:text-[#FD7C03]">
            Templates
          </a>
          <a href="#how-it-works" className="hover:text-[#FD7C03]">
            How It Works
          </a>
          <a href="#terms-process" className="hover:text-[#FD7C03]">
            Process
          </a>
          <a href="#faq" className="hover:text-[#FD7C03]">
            FAQ
          </a>
          <a href="#order" className="hover:text-[#FD7C03]">
            Order
          </a>
        </div>

        <a
          href={`https://wa.me/${BRAND.whatsapp}`}
          target="_blank"
          className="shrink-0 rounded-full bg-[#FD7C03] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 md:px-5 md:text-sm"
        >
          Get Quote
        </a>
      </div>
    </nav>
  );
}