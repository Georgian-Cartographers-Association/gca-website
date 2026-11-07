import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import PhotoSlider from "@/components/ui/PhotoSlider";
import gallery from "@/data/gallery.json";

export default async function GalleryPage() {
  const t = await getTranslations("gallery");

  return (
    <div>
      <section className="bg-[#0a2342] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif">{t("title")}</h1>
        </div>
      </section>

      <section className="py-16 bg-[#f8f5ef]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhotoSlider
            photos={gallery.photos}
            prevLabel={t("prev")}
            nextLabel={t("next")}
          />
          {gallery.albumUrl && (
            <div className="mt-10 text-center">
              <a
                href={gallery.albumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#0a2342] text-white hover:bg-[#12335f] transition-colors"
              >
                {t("full_album")}
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
