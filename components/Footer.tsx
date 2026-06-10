import { BRAND } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[#EAD8C8] bg-white px-6 py-10 md:px-16">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <img
            src="/images/stickerkita-logo.png"
            alt="StickerKita logo"
            className="w-36 md:w-44"
          />
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#6F625A]">
            Premium custom stickers for brands, packaging, events, and small
            businesses.
          </p>
        </div>

        <div>
          <h4 className="font-bold">Quick Links</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#6F625A]">
            <a href="#products" className="hover:text-[#FD7C03]">
              Products
            </a>
            <a href="#templates" className="hover:text-[#FD7C03]">
              Templates
            </a>
            <a href="#how-it-works" className="hover:text-[#FD7C03]">
              How It Works
            </a>
            <a href="#order" className="hover:text-[#FD7C03]">
              Order
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold">Contact</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#6F625A]">
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              className="hover:text-[#FD7C03]"
            >
              WhatsApp: +{BRAND.whatsapp}
            </a>
            <a href={`mailto:${BRAND.email}`} className="hover:text-[#FD7C03]">
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-[#6F625A]">
        © 2026 StickerKita. All rights reserved.
      </p>
    </footer>
  );
}