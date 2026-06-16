"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-white px-4 py-16 md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            Frequently Asked Questions
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Ada Pertanyaan Sebelum Membuat Pesanan?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Berikut adalah beberapa soalan lazim tentang bahan pelekat kami, proses reka bentuk, pembayaran, dan tempoh masa percetakan.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-3xl border border-[#EAD8C8] bg-[#FFF7EF] p-5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-bold text-[#2B1B12]">
                    {faq.question}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FD7C03] text-lg font-bold text-white">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-4 text-sm leading-6 text-[#6F625A] md:text-base">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}