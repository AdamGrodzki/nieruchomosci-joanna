import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";


import "../styles/globals.css";

const font = Hanken_Grotesk({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nieruchomosci Joanna",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}</body>
    </html>
  );
}
