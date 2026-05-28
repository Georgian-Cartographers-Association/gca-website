import socialPostsData from "@/data/socialPosts.json";
import { SocialPostCard } from "@/components/ui/SocialPostCard";
import { getTranslations } from "next-intl/server";

type SocialPost = {
  id: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  platform: "facebook" | "instagram" | "youtube";
  postUrl: string;
  publishedAt: string;
  thumbnailUrl: string | null;
  pinned?: boolean;
};

const posts: SocialPost[] = socialPostsData as SocialPost[];
const sortedPosts = [...posts]
  .sort((a, b) => {
    const pinnedA = a.pinned ? 1 : 0;
    const pinnedB = b.pinned ? 1 : 0;
    if (pinnedA !== pinnedB) return pinnedB - pinnedA;
    return b.publishedAt.localeCompare(a.publishedAt);
  })
  .slice(0, 9);

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("news");

  return (
    <div>
      <section className="bg-[#0a2342] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{t("title")}</h1>
          <p className="text-white/60 max-w-xl">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📱</div>
              <p className="text-[#0a2342]/50 text-lg">{t("no_posts")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map((post) => (
                <SocialPostCard
                  key={post.id}
                  post={{ ...post, _id: post.id, thumbnailUrl: post.thumbnailUrl ?? undefined }}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
