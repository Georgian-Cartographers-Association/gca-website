import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const links = [
    { href: `/${locale}/about`, label: t("about_link") },
    { href: `/${locale}/news`, label: t("news_link") },
    { href: `/${locale}/atlas`, label: t("atlas_link") },
    { href: `/${locale}/membership`, label: t("membership_link") },
  ];

  return (
    <footer className="bg-[#0a2342] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image src="/logo.png" alt="GCA Logo" width={44} height={44} className="rounded-full" />
              <span className="font-semibold text-sm leading-tight">
                საქართველოს კარტოგრაფთა ასოციაცია
              </span>
            </div>
            <p className="text-white/50 text-xs mt-2">Georgian Cartographers Association</p>
          </div>

          <div>
            <h4 className="text-[#c8a951] font-semibold mb-3 text-sm uppercase tracking-wider">
              {t("links")}
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#c8a951] font-semibold mb-3 text-sm uppercase tracking-wider">
              {t("contact")}
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>📍 I. Chavchavadze Ave. 3, Tbilisi 0128</li>
              <li>📧 geocartographersassoc@gmail.com</li>
              <li>📞 საბა მოდებაძე: 579 711 715</li>
              <li>📞 გოჩა გუძუაძე: 577 554 429</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/40 text-xs">
          © {year} საქართველოს კარტოგრაფთა ასოციაცია. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}
