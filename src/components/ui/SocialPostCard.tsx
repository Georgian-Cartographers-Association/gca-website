"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

type SocialPost = {
  _id: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  platform: "facebook" | "instagram" | "youtube";
  postUrl: string;
  publishedAt: string;
  thumbnailUrl?: string;
};

function buildEmbedSrc(platform: string, postUrl: string): string {
  if (platform === "facebook") {
    return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
      postUrl
    )}&show_text=true&width=560`;
  }
  if (platform === "youtube") {
    const match = postUrl.match(/[?&]v=([^&]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return postUrl;
}

const PLATFORM_META: Record<
  string,
  { label: string; color: string; logo: string }
> = {
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/240px-2021_Facebook_icon.svg.png",
  },
  instagram: {
    label: "Instagram",
    color: "#E1306C",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/240px-Instagram_icon.png",
  },
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/240px-YouTube_full-color_icon_%282017%29.svg.png",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SocialPostCard({
  post,
  locale,
}: {
  post: SocialPost;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("news");
  const meta = PLATFORM_META[post.platform] ?? PLATFORM_META.facebook;
  const title = locale === "en" && post.titleEn ? post.titleEn : post.title;
  const description =
    locale === "en" && post.descriptionEn
      ? post.descriptionEn
      : post.description;
  const embedSrc = buildEmbedSrc(post.platform, post.postUrl);

  return (
    <>
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#0a2342]/5 flex flex-col">
        <div className="relative h-44 w-full bg-[#f0f4f8] flex items-center justify-center overflow-hidden">
          {post.thumbnailUrl ? (
            <Image
              src={post.thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: meta.color + "20" }}
            >
              <img src={meta.logo} alt={meta.label} className="w-10 h-10 object-contain" />
            </div>
          )}

          <span
            className="absolute top-3 right-3 flex items-center gap-1.5 text-white text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: meta.color }}
          >
            <img src={meta.logo} alt="" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
            {meta.label}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <time className="text-xs text-[#0a2342]/40 mb-2 block">
            {formatDate(post.publishedAt)}
          </time>
          <h2 className="font-bold text-[#0a2342] font-serif text-base leading-snug mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-[#0a2342]/60 leading-relaxed line-clamp-3 mb-4">
              {description}
            </p>
          )}

          <div className="mt-auto flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="flex-1 text-center text-sm font-semibold text-white py-2 px-4 rounded transition-colors"
              style={{ backgroundColor: meta.color }}
            >
              {t("view_post")}
            </button>
            <a
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded border border-[#0a2342]/15 text-[#0a2342]/50 hover:text-[#0a2342] transition-colors"
              title={t("open_in_new")}
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </article>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-5 py-4 rounded-t-xl"
              style={{ backgroundColor: meta.color }}
            >
              <div className="flex items-center gap-2 text-white">
                <img src={meta.logo} alt="" className="w-5 h-5 object-contain brightness-0 invert" />
                <span className="font-semibold text-sm">{meta.label} · {formatDate(post.publishedAt)}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 flex justify-center bg-[#f8f5ef]">
              <iframe
                src={embedSrc}
                width="560"
                height="600"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="max-w-full rounded"
                loading="lazy"
              />
            </div>

            <div className="px-5 py-3 border-t border-[#0a2342]/10 flex justify-between items-center">
              <span className="text-xs text-[#0a2342]/40">{title}</span>
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: meta.color }}
              >
                <ExternalLink size={12} />
                {meta.label}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
