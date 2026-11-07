"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoSlider({
  photos,
  prevLabel,
  nextLabel,
}: {
  photos: string[];
  prevLabel: string;
  nextLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const n = (i + photos.length) % photos.length;
      el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    },
    [photos.length]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
    >
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className="relative shrink-0 w-full snap-center aspect-[4/3] sm:aspect-[16/9] bg-[#0a2342]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="200px"
              aria-hidden
              className="object-cover blur-2xl scale-110 opacity-60"
              unoptimized={src.endsWith(".svg")}
            />
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-contain"
              priority={i === 0}
              unoptimized={src.endsWith(".svg")}
            />
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label={prevLabel}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0a2342]/70 text-white hover:bg-[#0a2342] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label={nextLabel}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0a2342]/70 text-white hover:bg-[#0a2342] transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`${i + 1} / ${photos.length}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#c8a951]" : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
