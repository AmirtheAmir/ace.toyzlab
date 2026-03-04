import type { Metadata } from "next";
import { Google_Sans_Flex } from 'next/font/google'
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  variable: '--font-sansFlex',
})


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
        className={`${googleSansFlex.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
