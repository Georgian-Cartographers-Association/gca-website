"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const navLinks = [
  { key: "about", href: "/about" },
  { key: "news", href: "/news" },
  { key: "blog", href: "/blog" },
  { key: "membership", href: "/membership" },
  { key: "atlas", href: "/atlas" },
  { key: "contact", href: "/contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const currentLocale = pathname.startsWith("/en") ? "en" : "ka";
  const otherLocale = currentLocale === "ka" ? "en" : "ka";

  function toggleLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    router.push(segments.join("/") || "/", { scroll: false });
  }

  function localePath(href: string) {
    return `/${currentLocale}${href}`;
  }

  return (
    <header className="bg-[#0a2342] text-white sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="GCA Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="hidden sm:block font-serif text-sm leading-tight">
              {currentLocale === "ka"
                ? "კარტოგრაფთა ასოციაცია"
                : "Cartographers Association"}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                className="px-3 py-2 rounded text-sm hover:bg-white/10 transition-colors"
              >
                {t(key)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="ml-3 flex items-center gap-1 px-3 py-2 rounded border border-[#c8a951] text-[#c8a951] text-sm hover:bg-[#c8a951] hover:text-[#0a2342] transition-colors"
            >
              <Globe size={14} />
              {otherLocale.toUpperCase()}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded hover:bg-white/10 text-sm"
              >
                {t(key)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="mt-2 mx-4 px-4 py-2 rounded border border-[#c8a951] text-[#c8a951] text-sm text-left"
            >
              {otherLocale === "ka" ? "ქართული" : "English"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
