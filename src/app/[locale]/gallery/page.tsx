import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import PhotoSlider from "@/components/ui/PhotoSlider";
import gallery from "@/data/gallery.json";

type Album = {
  id: string;
  title: string;
  titleEn?: string;
  albumUrl?: string;
  photos: string[];
};

const albums: Album[] = gallery.albums;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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

      <div className="bg-[#f8f5ef] py-16 space-y-20">
        {albums.map((album) => (
          <section key={album.id} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#0a2342] mb-3">
              {locale === "en" && album.titleEn ? album.titleEn : album.title}
            </h2>
            <div className="w-16 h-1 bg-[#c8a951] rounded mb-8" />
            <PhotoSlider
              photos={album.photos}
              prevLabel={t("prev")}
              nextLabel={t("next")}
            />
            {album.albumUrl && (
              <div className="mt-8 text-center">
                <a
                  href={album.albumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#0a2342] text-white hover:bg-[#12335f] transition-colors"
                >
                  {t("full_album")}
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
