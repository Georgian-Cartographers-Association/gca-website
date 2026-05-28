import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";

type PostMeta = {
  title: string;
  titleEn?: string;
  publishedAt: string;
  category?: string;
  thumbnailUrl?: string;
};

function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: data as PostMeta, content };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations("blog");
  const post = getPost(id);

  if (!post) {
    return (
      <div className="bg-[#f8f5ef] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#0a2342]/50 mb-4">{t("not_found")}</p>
          <Link href={`/${locale}/blog`} className="text-[#c8a951] hover:underline">
            ← {t("back")}
          </Link>
        </div>
      </div>
    );
  }

  const { meta, content } = post;
  const title = locale === "en" && meta.titleEn ? meta.titleEn : meta.title;

  return (
    <div className="bg-[#f8f5ef] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-[#0a2342]/60 hover:text-[#0a2342] text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> {t("back")}
        </Link>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {meta.thumbnailUrl && (
            <div className="relative h-72 w-full">
              <Image src={meta.thumbnailUrl} alt={title} fill className="object-cover" />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#0a2342]/60">
              {meta.category && (
                <span className="flex items-center gap-1.5">
                  <Tag size={14} />
                  <span className="bg-[#0a2342]/10 px-2 py-0.5 rounded">{meta.category}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(meta.publishedAt).toLocaleDateString("ka-GE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#0a2342] font-serif leading-tight mb-8">
              {title}
            </h1>

            <div className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-[#0a2342]
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-[#0a2342]/80 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-[#c8a951] prose-a:underline hover:prose-a:text-[#0a2342]
              prose-strong:text-[#0a2342]
              prose-ul:text-[#0a2342]/80 prose-ol:text-[#0a2342]/80
              prose-li:mb-1">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            <div className="mt-10 pt-8 border-t border-[#0a2342]/10">
              <p className="text-xs text-[#0a2342]/40 uppercase tracking-wider">{t("author")}</p>
              <p className="text-[#0a2342] font-semibold mt-1">{t("author_name")}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
