import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import NavigationBar from "@/app/Components/Organism/NavigationBar";
import FooterBar from "@/app/Components/Organism/FooterBar";

const sansFlex = localFont({
  src: [
    {
      path: "./fonts/GoogleSansFlex-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSansFlex-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-SansFlex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ace Shop",
  description: "Your Exclusive Watch Boutique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansFlex.variable} font-sans items-center justify-center flex bg-bg-base`}
      >
        <CurrencyProvider>
          <main className="max-w-7xl w-full m-2 flex flex-col gap-2">
            <NavigationBar />
            {children}
            <FooterBar />
          </main>
        </CurrencyProvider>
      </body>
    </html>
  );
}
