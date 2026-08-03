import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section className="relative bg-[#0a2342] text-white overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,169,81,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,81,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Meridian lines decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[20, 40, 60, 80].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0 border-l border-[#c8a951]/10"
            style={{ left: `${pct}%` }}
          />
        ))}
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0 border-t border-[#c8a951]/10"
            style={{ top: `${pct}%` }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#c8a951]/20 border border-[#c8a951]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#c8a951]" />
            <span className="text-[#c8a951] text-sm font-medium tracking-wide">
              GCA — Georgian Cartographers Association
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 font-serif">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/atlas`}
              className="bg-[#c8a951] text-[#0a2342] px-7 py-3 rounded font-semibold hover:bg-[#b8952f] transition-colors"
            >
              {t("cta_primary")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="border border-white/40 text-white px-7 py-3 rounded font-semibold hover:bg-white/10 transition-colors"
            >
              {t("cta_secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
