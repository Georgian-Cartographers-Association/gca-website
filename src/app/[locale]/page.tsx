import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import NewsPreview from "@/components/sections/NewsPreview";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <Stats />
      <NewsPreview locale={locale} />
    </>
  );
}
