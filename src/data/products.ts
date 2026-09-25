import product1 from "@/assets/plumtek-img/PIP.jpeg";
import product2 from "@/assets/plumtek-img/2.EQUALTE-1-500x500.jpeg";
import product3 from "@/assets/plumtek-img/13.BALLVALV-500x500.jpeg";
import product4 from "@/assets/plumtek-img/9.FLANG_-1-500x500.jpeg";
import product5 from "@/assets/plumtek-img/COILPIP-500x500.jpeg";
import product6 from "@/assets/plumtek-img/PLUMTEK ZEBRA HOSES.jpg";

export interface Product {
  slug: string;
  image: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: Array<{ label: string; value: string }>;
}

export const categories = [
  "All categories",
  "Taps, Faucets & Accessories",
  "PPR, PP-RCT Pipes",
  "PPR Fittings",
  "PERT Pipes & Push Fittings",
  "PERT Socket Fusion Fittings",
  "HDPE Pipes & Fittings",
  "MDPE Pipes & Fittings",
  "Hoses",
];

export const categoryImages = [
  { name: "Taps, Faucets & Accessories", image: product3 },
  { name: "PPR, PP-RCT Pipes", image: product1 },
  { name: "PPR Fittings", image: product5 },
  { name: "HDPE Pipes & Fittings", image: product2 },
  { name: "MDPE Pipes & Fittings", image: product4 },
  { name: "Hoses", image: product6 },
];

export const products: Product[] = [
  {
    slug: "luxury-chrome-basin-mixer",
    image: product3,
    name: "Luxury Chrome Basin Mixer",
    category: "Taps, Faucets & Accessories",
    shortDescription: "Premium chrome mixer with smooth flow control for modern bathroom installations.",
    description:
      "Engineered with corrosion-resistant finishing and precision ceramic cartridges for long operating life in residential and commercial spaces.",
    highlights: ["Corrosion resistant body", "Smooth handle operation", "Leak-proof ceramic cartridge"],
    specs: [
      { label: "Finish", value: "Chrome plated" },
      { label: "Operating Pressure", value: "0.5-10 bar" },
      { label: "Application", value: "Basin / vanity" },
    ],
  },
  {
    slug: "ppr-pn20-cold-water-pipe",
    image: product1,
    name: "PPR-PN20 Cold Water Pipe",
    category: "PPR, PP-RCT Pipes",
    shortDescription: "High-performance PN20 pipe for cold water distribution networks.",
    description:
      "Designed for dimensional stability, pressure resistance, and fast fusion welding, ideal for domestic and industrial plumbing lines.",
    highlights: ["PN20 pressure class", "Fusion weld ready", "Long service life"],
    specs: [
      { label: "Material", value: "PPR" },
      { label: "Pressure Rating", value: "PN20" },
      { label: "Use", value: "Cold water lines" },
    ],
  },
  {
    slug: "ppr-equal-tee-25mm",
    image: product5,
    name: "PPR Equal Tee 25mm",
    category: "PPR Fittings",
    shortDescription: "Precision 25mm equal tee fitting for robust branch line connections.",
    description:
      "Manufactured for exact socket dimensions to ensure secure fusion joints and consistent flow split across plumbing systems.",
    highlights: ["Accurate 25mm sizing", "Strong branch support", "Reliable welded joints"],
    specs: [
      { label: "Size", value: "25 mm" },
      { label: "Type", value: "Equal Tee" },
      { label: "Installation", value: "Socket fusion" },
    ],
  },
  {
    slug: "pert-pushfit-connector",
    image: product4,
    name: "PERT Pushfit Connector",
    category: "PERT Pipes & Push Fittings",
    shortDescription: "Quick-install connector for PERT pipe systems with dependable sealing.",
    description:
      "Built for simplified installation workflows while maintaining secure grip and leak resistance in high-cycle use.",
    highlights: ["Push-fit convenience", "Fast site installation", "Secure seal geometry"],
    specs: [
      { label: "Connection", value: "Push-fit" },
      { label: "Compatible Pipe", value: "PERT" },
      { label: "Use", value: "Distribution systems" },
    ],
  },
  {
    slug: "pert-pn16-underfloor-pipe",
    image: product1,
    name: "PERT PN16 Underfloor Pipe",
    category: "PERT Pipes & Push Fittings",
    shortDescription: "Flexible PN16 pipe optimized for underfloor heating and circulation circuits.",
    description:
      "Combines flexibility and thermal durability for controlled heat distribution with minimal maintenance requirements.",
    highlights: ["Suitable for heating loops", "Flexible routing", "PN16 rated"],
    specs: [
      { label: "Pressure Rating", value: "PN16" },
      { label: "Application", value: "Underfloor heating" },
      { label: "Material", value: "PERT" },
    ],
  },
  {
    slug: "hdpe-high-pressure-pipe",
    image: product2,
    name: "HDPE High Pressure Pipe",
    category: "HDPE Pipes & Fittings",
    shortDescription: "Industrial-grade HDPE pipe built for high-pressure transfer applications.",
    description:
      "Delivers robust mechanical strength and chemical resistance for utility and infrastructure projects requiring long-term reliability.",
    highlights: ["High pressure endurance", "Chemical resistance", "Low maintenance"],
    specs: [
      { label: "Material", value: "HDPE" },
      { label: "Operating Class", value: "High pressure" },
      { label: "Application", value: "Utility and process lines" },
    ],
  },
  {
    slug: "heavy-duty-garden-hose",
    image: product6,
    name: "Heavy Duty Garden Hose",
    category: "Hoses",
    shortDescription: "Reinforced flexible hose for daily irrigation and cleaning operations.",
    description:
      "Constructed with abrasion-resistant layers and consistent flow performance for long-term outdoor usage.",
    highlights: ["Reinforced body", "Abrasion resistant", "Easy handling"],
    specs: [
      { label: "Category", value: "Garden / utility hose" },
      { label: "Construction", value: "Multi-layer" },
      { label: "Use", value: "Irrigation and cleaning" },
    ],
  },
  {
    slug: "mdpe-blue-water-pipe",
    image: product1,
    name: "MDPE Blue Water Pipe",
    category: "MDPE Pipes & Fittings",
    shortDescription: "Durable MDPE pipe for potable water distribution networks.",
    description:
      "Provides excellent toughness and crack resistance in underground and exposed routing conditions.",
    highlights: ["Potable water ready", "Impact resistant", "Long outdoor life"],
    specs: [
      { label: "Material", value: "MDPE" },
      { label: "Color", value: "Blue" },
      { label: "Application", value: "Water distribution" },
    ],
  },
  {
    slug: "ppr-90-degree-elbow",
    image: product5,
    name: "PPR 90 Degree Elbow",
    category: "PPR Fittings",
    shortDescription: "Flow-optimized 90 degree elbow for neat directional pipe changes.",
    description:
      "Maintains structural integrity through repeated thermal cycles and supports clean, compact pipe layouts.",
    highlights: ["Optimized bend profile", "Thermal cycle stable", "Fusion joint compatible"],
    specs: [
      { label: "Angle", value: "90 degree" },
      { label: "Material", value: "PPR" },
      { label: "Installation", value: "Socket fusion" },
    ],
  },
  {
    slug: "matte-black-kitchen-faucet",
    image: product3,
    name: "Matte Black Kitchen Faucet",
    category: "Taps, Faucets & Accessories",
    shortDescription: "Contemporary matte faucet engineered for smooth control and daily durability.",
    description:
      "A premium fixture with ergonomic action and anti-corrosion finish, suitable for high-use kitchen spaces.",
    highlights: ["Modern matte finish", "Ergonomic operation", "Corrosion resistant"],
    specs: [
      { label: "Finish", value: "Matte black" },
      { label: "Mounting", value: "Deck mount" },
      { label: "Application", value: "Kitchen" },
    ],
  },
];
