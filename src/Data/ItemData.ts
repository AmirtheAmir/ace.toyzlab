export type ProductCollection =
  | "classic"
  | "tactical"
  | "glasses"
  | "lighter"
  | "aggregat";

export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  mainImage: string;
  gallery?: string[];
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
  tags: string[];
  collection: ProductCollection;
  description: string;
  postdescription?: string;
  features?: string[];
};

export const itemData: ProductItem[] = [
  {
    id: "1",
    slug: "aggragat-vanguard-heritage",
    name: "Aggragat Vanguard Heritage",
    mainImage: "watches/ace_watch1_1.png",
    gallery: [
      "supplements/ace_watch1_supplement1.png",
      "supplements/ace_watch1_supplement2.png",
      "supplements/ace_watch1_supplement3.png",
      "supplements/ace_watch1_supplement4.png",
    ],
    price: 1980,
    soldOut: true,
    tags: ["Signature", "Heritage", "Automatic", "Watch"],
    collection: "aggregat",
    description:
      "The Vanguard Statement from Aggragat This is not just a timepiece. It is a mechanical statement of presence, engineering, and controlled power. Vanguard Heritage is built around a bold vertical architecture that redefines how time is displayed. Dual precision rollers showcase hours and minutes in a dynamic mechanical format creating motion, depth, and unmistakable character. Designed for those who prefer substance over noise, this watch delivers:",
    features: [
      "Dual Roller Time Display",
      "Industrial Titanium-Inspired Case",
      "Precision Crown Adjustment",
      "Exposed Mechanical Detailing",
      "Sculpted Vertical Strap Integration",
    ],
    postdescription:
      "The Heritage edition embraces mechanical clarity. No unnecessary decoration. No distraction. Just bold geometry and functional precision. Whether worn daily or reserved for statement occasions, Vanguard Heritage is built to be noticed not because it demands attention, but because it earns it. The feeling of being seen but not being see, this is the vanguard collection. Aggragat Vanguard Heritage",
  },
  {
    id: "2",
    slug: "ace-pulse-bone-edition",
    name: "ACE Pulse Bone Edition",
    mainImage: "watches/ace_watch2.png",
    price: 980,
    oldPrice: 1012,
    tags: ["Pulse", "Bone", "Minimal", "Watch"],
    collection: "tactical",
    description:
      "Pulse Bone Edition combines a clean modern silhouette with a sharper technical attitude. The piece is defined by contrast, functional proportions, and a restrained color direction that keeps the design crisp and wearable. It is made for everyday use while still holding a distinct visual character.",
  },
  {
    id: "3",
    slug: "ace-meridian-chronograph-automatic",
    name: "Ace Meridian Chronograph Automatic",
    mainImage: "watches/ace_watch6.png",
    price: 1200,
    oldPrice: 1340,
    tags: ["Chronograph", "Automatic", "Meridian", "Watch"],
    collection: "tactical",
    description:
      "Meridian Chronograph Automatic focuses on layered dial composition and balanced utility. Every detail is placed to feel intentional, from the case proportions to the graphic rhythm of the face. It offers a more technical expression while remaining refined enough for a clean daily wardrobe.",
  },
  {
    id: "4",
    slug: "sterling-classic-automatic",
    name: "Sterling Classic Automatic",
    mainImage: "watches/ace_watch4.png",
    price: 660,
    tags: ["Classic", "Sterling", "Automatic", "Watch"],
    collection: "classic",
    description:
      "Sterling Classic Automatic leans into simplicity, smooth surfaces, and quiet elegance. Its form is soft, composed, and easy to wear, giving it a timeless character without feeling dated. The design is minimal, but it still carries enough presence to feel deliberate and premium.",
  },
  {
    id: "5",
    slug: "atelier-signature-chronograph",
    name: "Atelier Signature Chronograph",
    mainImage: "watches/ace_watch5.png",
    price: 1450,
    tags: ["Atelier", "Signature", "Chronograph", "Watch"],
    collection: "classic",
    description:
      "Atelier Signature Chronograph is shaped by precision lines and a more tailored visual rhythm. It brings together classic watch cues with a cleaner contemporary execution, making it feel polished without becoming overly formal. The overall design is sharp, balanced, and confidently understated.",
  },
  {
    id: "6",
    slug: "vector-digital-series",
    name: "Vector Digital Series",
    mainImage: "watches/ace_watch3.png",
    price: 742,
    tags: ["Vector", "Digital", "Series", "Watch"],
    collection: "tactical",
    description:
      "Vector Digital Series takes a more experimental direction with a display-led identity and a stronger technical mood. Its layered construction and interface-inspired details make it feel dynamic, futuristic, and highly graphic. It is built for people drawn to bold utility and modern edge.",
  },
  {
    id: "7",
    slug: "steel-light-vector",
    name: "Steel Light Vector",
    mainImage: "watches/ace_watch7.png",
    price: 880,
    tags: ["Watch", "Classic", "Steel", "Minimal"],
    collection: "classic",
    description:
      "Steel Light Vector strips the watch back to a cleaner visual language built on steel, proportion, and restraint. The result is sleek, wearable, and easy to style, with enough structure to still feel distinctive. It is a minimal piece that relies on material clarity rather than decoration.",
  },
  {
    id: "8",
    slug: "aerosight-visible",
    name: "AeroSight Visible",
    mainImage: "glasses/ace_glasses2.png",
    price: 1650,
    tags: ["Aerosight", "Visible", "Eyewear", "Sight"],
    collection: "glasses",
    description:
      "AeroSight Visible is defined by sharp optical lines and a confident futuristic frame language. Its shape feels sculpted and directional, but still refined enough to remain clean on the face. The overall design aims for clarity, precision, and a slightly cinematic edge.",
  },
  {
    id: "9",
    slug: "night-hawk-vision",
    name: "Night Hawk Vision",
    mainImage: "glasses/ace_glasses1.png",
    price: 1200,
    tags: ["Night", "Hawk", "Vision", "Eyewear"],
    collection: "glasses",
    description:
      "Night Hawk Vision pushes toward a darker, more focused eyewear expression built around contrast and silhouette. The frame has a stronger attitude while staying compact and wearable, giving it a sleek identity that feels both practical and visually bold.",
  },
  {
    id: "10",
    slug: "clearcore-utility-lighter",
    name: "ClearCore Utility Lighter",
    mainImage: "lighter/ace_lighter1.png",
    price: 56,
    tags: ["Lighter", "Utility", "Clearcore", "Accessory"],
    collection: "lighter",
    description:
      "ClearCore Utility Lighter is designed with a compact functional body and a transparent technical look. It feels straightforward, efficient, and modern, with just enough visual detail to stand apart from ordinary accessories. The design is small in scale but deliberate in character.",
  },
];
