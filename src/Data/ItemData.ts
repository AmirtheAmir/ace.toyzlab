export type ProductItem = {
  id: string;
  name: string;
  image: string;
  currencySymbol?: string; // default: €
  currencyCode?: string; // default: EUR
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
};

export const itemData: ProductItem[] = [
  {
    id: "1",
    name: "Aggragat Vanguard Heritage",
    image: "/Images/ace_watch_1.png",
    price: 1980,
    soldOut: true,
  },
  {
    id: "2",
    name: "ACE Pulse Bone Edition",
    image: "/Images/ace_watch_2.png",
    oldPrice: 1012,
    price: 980,
  },
  {
    id: "3",
    name: "Ace Meridian Chronograph Automatic",
    image: "/Images/ace_watch_4.png",
    oldPrice: 1340,
    price: 1200,
  },
  {
    id: "4",
    name: "Sterling Classic Automatic",
    image: "/Images/ace_watch_3.png",
    price: 660,
  },
  {
    id: "5",
    name: "Atelier Signature Chronograph",
    image: "/Images/ace_watch_5.png",
    price: 1450,
  },
  {
    id: "6",
    name: "Vector Digital Series",
    image: "/Images/ace_watch_6.png",
    price: 742,
  },
  {
    id: "7",
    name: "ClearCore Utility Lighter",
    image: "/Images/ace_lighter.png",
    price: 56,
  },
  {
    id: "8",
    name: "AeroSight Visible",
    image: "/Images/ace_glasses_2.png",
    price: 1650,
  },
  {
    id: "9",
    name: "Night Hawk Vision",
    image: "/Images/ace_glasses_3.png",
    price: 1200,
  },
];