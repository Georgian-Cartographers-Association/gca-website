// Usage: node scripts/upload-photo.mjs <photo-path> [member-name]
// Example: node scripts/upload-photo.mjs C:/Users/K/Photos/giorgi.jpg "Giorgi_Gaprindashvili"

import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { basename, extname } from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const filePath = process.argv[2];
const memberName = process.argv[3];

if (!filePath) {
  console.error("გამოყენება: node scripts/upload-photo.mjs <ფოტოს-გზა> [სახელი_გვარი]");
  console.error("მაგ: node scripts/upload-photo.mjs C:/Users/K/Photos/giorgi.jpg Giorgi_Kapanadze");
  process.exit(1);
}

const ext = extname(filePath);
const fileName = memberName
  ? `${memberName}${ext}`
  : basename(filePath);

const file = readFileSync(filePath);

console.log(`ატვირთვა: ${fileName} ...`);

const blob = await put(`team/${fileName}`, file, {
  access: "public",
  contentType: `image/${ext.slice(1)}`,
  addRandomSuffix: false,
});

console.log("\n✓ ატვირთულია!");
console.log("URL:", blob.url);
console.log("\npage.tsx-ში ჩაამატე:");
const name = fileName.replace(ext, "");
console.log(`  photo: "${blob.url}"`);
