import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { useTranslations } from "next-intl";

type PostMeta = {
  slug: string;
  title: string;
  titleEn?: string;
  publishedAt: string;
  category?: string;
  excerpt?: string;
  excerptEn?: string;
  thumbnailUrl?: string;
};

function getLatestPosts(count = 3): PostMeta[] {
  const dir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), ...data } as PostMeta;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsPreview({ locale }: { locale: string }) {
  const t = useTranslations("blog");
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-[#f8f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("latest")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2342] font-serif">
              {t("latest_title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden md:inline-flex text-[#0a2342] border border-[#0a2342]/30 px-5 py-2 rounded text-sm hover:bg-[#0a2342] hover:text-white transition-colors"
          >
            {t("all_posts")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#0a2342]/5"
            >
              <div className="h-2 bg-[#c8a951]" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {post.category && (
                    <span className="text-xs bg-[#0a2342]/10 text-[#0a2342] px-2 py-1 rounded">
                      {post.category}
                    </span>
                  )}
                  <time className="text-xs text-[#0a2342]/50">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                <h3 className="font-bold text-[#0a2342] mb-3 leading-snug font-serif text-lg">
                  {locale === "en" && post.titleEn ? post.titleEn : post.title}
                </h3>
                <p className="text-sm text-[#0a2342]/65 mb-5 leading-relaxed line-clamp-3">
                  {locale === "en" && post.excerptEn ? post.excerptEn : post.excerpt}
                </p>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="text-sm text-[#c8a951] font-semibold hover:underline"
                >
                  {t("read_more")} →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex text-[#0a2342] border border-[#0a2342]/30 px-5 py-2 rounded text-sm hover:bg-[#0a2342] hover:text-white transition-colors"
          >
            {t("all_posts")}
          </Link>
        </div>
      </div>
    </section>
  );
}
