import product1 from "@/assets/plumtek-img/PIP.jpeg";
import product2 from "@/assets/plumtek-img/2.EQUALTE-1-500x500.jpeg";
import product3 from "@/assets/plumtek-img/13.BALLVALV-500x500.jpeg";
import product4 from "@/assets/plumtek-img/9.FLANG_-1-500x500.jpeg";
import product5 from "@/assets/plumtek-img/COILPIP-500x500.jpeg";
import product6 from "@/assets/plumtek-img/PLUMTEK ZEBRA HOSES.jpg";
import bathAccessoriesImage from "@/assets/All Product/BATH ACCESORES/All Product-149.png";
import assemblyUnitImage from "@/assets/plumtek-img/assemblyunit.jpg";
import beccoTapsImage from "@/assets/All Product/Becco Taps/Sink Faucet.png";
import connectionHoseImage from "@/assets/All Product/CONNECTION HOSE/Conection Hose Heavy duty.png";
import drainItemsImage from "@/assets/All Product/DRAIN ITEMS/Waste Pipe Adopter.png";
import vibrantImage from "@/assets/All Product/VIBRANT/PILLAR TAP A1.png";

const allProductAssets = import.meta.glob<string>("@/assets/All Product/**/*.{png,jpg,jpeg,JPG,JPEG,webp}", {
  eager: true,
  import: "default",
});

const allProductImageLookup = Object.fromEntries(
  Object.entries(allProductAssets).flatMap(([path, image]) => {
    const relativePath = path.replace(/^\/src\/assets\//, "").replace(/^@\/assets\//, "");
    return [
      [relativePath, image],
      [`src/assets/${relativePath}`, image],
    ];
  }),
);

export const productImageLookup = new Map<string, string>(
  Object.entries({
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    ...allProductImageLookup,
  })
);

export const categoryImageLookup = new Map<string, string>([
  ["BATH ACCESORES", bathAccessoriesImage],
  ["Becco Taps", beccoTapsImage],
  ["CONNECTION HOSE", connectionHoseImage],
  ["DRAIN ITEMS", drainItemsImage],
  ["VIBRANT", vibrantImage],
  ["Taps, Faucets & Accessories", product3],
  ["PPR, PP-RCT Pipes", product1],
  ["PPR Fittings", product5],
  ["HDPE Pipes & Fittings", product2],
  ["MDPE Pipes & Fittings", product4],
  ["HDPE & MDPE Fittings", product2],
  ["PERT & Push Fittings", assemblyUnitImage],
  ["PERT Pipes & Push Fittings", assemblyUnitImage],
  ["Hoses", product6],
]);

export const normalizeCategoryName = (name?: string | null) => {
  if (!name) return "";
  const corrections = new Map<string, string>([
    ["bath accesores", "BATH ACCESSORIES"],
    ["becco taps", "BECCO TAPS"],
    ["connection hose", "CONNECTION HOSE"],
    ["drain items", "DRAIN ITEMS"],
    ["hoses", "HOSES"],
  ]);

  const key = name.trim().toLowerCase();
  const corrected = corrections.get(key);
  if (corrected) return corrected;
  return name.trim().toUpperCase();
};

export const resolveProductImage = (imageKey?: string | null, imageData?: string | null) => {
  if (imageData) return imageData;
  if (imageKey) {
    const cached = productImageLookup.get(imageKey);
    if (cached) return cached;
  }
  return product1;
};
