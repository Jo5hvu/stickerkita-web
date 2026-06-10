import { templates } from "@/data/templates";

export default function Templates() {
  return (
    <section id="templates" className="px-6 py-16 md:px-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold">Sticker Templates</h2>
        <p className="mt-4 text-[#6F625A]">
          Download basic templates to prepare your sticker artwork before printing.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
        {templates.map((template) => (
          <div
            key={template.name}
            className="rounded-3xl border border-[#EAD8C8] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FFE1C2]">
              <span className="text-2xl font-bold text-[#FD7C03]">
                {template.name.charAt(0)}
              </span>
            </div>

            <h3 className="font-bold">{template.name}</h3>

            <p className="mt-3 text-xs leading-5 text-[#6F625A]">
              {template.description}
            </p>

            <a
              href={template.file}
              download
              className="mt-4 inline-block text-sm font-semibold text-[#FD7C03]"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}