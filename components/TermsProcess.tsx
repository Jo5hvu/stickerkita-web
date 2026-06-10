import { processSteps, terms } from "@/data/processSteps";

export default function TermsProcess() {
  return (
    <section id="terms-process" className="w-full px-4 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-[#FFE1C2] px-4 py-2 text-xs font-semibold text-[#FD7C03] md:text-sm">
            Order Guide
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Terms & Order Process
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6F625A] md:text-base">
            Please read the order process and terms before placing your sticker
            order so that your design and printing process can run smoothly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Process */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-2xl font-bold">Order Process</h3>

            <div className="space-y-5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FD7C03] text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h4 className="font-bold">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-[#6F625A]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="rounded-[2rem] bg-[#2B1B12] p-6 text-white shadow-sm md:p-8">
            <h3 className="mb-6 text-2xl font-bold">Important Terms</h3>

            <div className="space-y-4">
              {terms.map((term, index) => (
                <div key={term} className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FD7C03] text-xs font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-white/80">{term}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-white/10 p-5">
              <h4 className="font-bold text-white">Estimated Timeline</h4>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Design process: 1–3 working days. Printing process: 7–14
                working days after confirmation and full payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}