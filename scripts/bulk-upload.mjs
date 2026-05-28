import { put } from "@vercel/blob";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const PHOTOS_DIR = "C:/Users/K/rew";
const PAGE_PATH = "src/app/[locale]/about/page.tsx";

// file basename (no ext) → nameEn in team array
const FILE_TO_NAME_EN = {
  Tedo_Gorgodze:         "Tedo Gorgodze",
  Zurab_Laoshvili:       "Zurab Laoshvili",
  Gocha_Gudzuadze:       "Gocha Gudzuadze",
  Saba_Modebadze:        "Saba Modebadze",
  Mariam_Gagoshashvili:  "Mariam Gagoshashvili",
  Revaz_Tolordava:       "Revaz Tolordava",
  Khatia_Khvelashvili:   "Khatia Kvelashvili",
  Ilia_Kavtaradze:       "Ilia Kavtaradze",
  Giorgi_Beruchashvili:  "Giorgi Beruchashvili",
  Lali_Goginava:         "Lali Goginava",
  Sophio_Gorgijanidze:   "Sopio Gorgijanidze",
  Giorgi_Dvalashvili:    "Giorgi Dvalashvili",
  Nodar_Elizbarashvili:  "Nodar Elizbarashvili",
  Teona_Tigishvili:      "Teona Tigishvili",
  Robert_Maghlakelidze:  "Robert Maghlakelidze",
  Giorgi_Mdzeluri:       "Giorgi Mdzeluri",
  Manana_Sharashenidze:  "Manana Sharashenidze",
  Vano_Tsartsidze:       "Vano Tsartsidze",
  Nodar_Khorbaladze:     "Nodar Khorbaladze",
  Vladimer_Buachidze:    "Vladimer Buachidze",
  Giorgi_Gaprindashvili: "Giorgi Gaprindashvili",
};

const files = readdirSync(PHOTOS_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
const nameEnToUrl = {};

console.log(`${files.length} ფოტო ნაპოვნია. ატვირთვა იწყება...\n`);

for (const file of files) {
  const key = basename(file, extname(file));
  const nameEn = FILE_TO_NAME_EN[key];
  if (!nameEn) {
    console.warn(`⚠ გამოტოვება: ${file} (mapping არ მოიძებნა)`);
    continue;
  }
  const data = readFileSync(join(PHOTOS_DIR, file));
  const blob = await put(`team/${file}`, data, {
    access: "public",
    addRandomSuffix: false,
    contentType: "image/jpeg",
  });
  nameEnToUrl[nameEn] = blob.url;
  console.log(`✓ ${nameEn}`);
}

// Update page.tsx
let src = readFileSync(PAGE_PATH, "utf-8");

for (const [nameEn, url] of Object.entries(nameEnToUrl)) {
  // match lines with this nameEn, add or replace photo field
  src = src.replace(
    new RegExp(`(\\{[^}]*nameEn:\\s*"${nameEn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^}]*?)(,?\\s*photo:\\s*"[^"]*")?(\\s*\\})`, "s"),
    (match, before, _existingPhoto, closing) => `${before}, photo: "${url}"${closing}`
  );
}

writeFileSync(PAGE_PATH, src, "utf-8");

console.log(`\n✓ page.tsx განახლდა — ${Object.keys(nameEnToUrl).length} ფოტო`);

const missing = Object.values(FILE_TO_NAME_EN).filter(n => !nameEnToUrl[n]);
if (missing.length) {
  console.log(`\nფოტო არ ატვირთულა (ფაილი არ იყო):`);
  missing.forEach(n => console.log(`  - ${n}`));
}
