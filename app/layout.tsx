import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DetailerStack - Websites that Book for Car Detailers",
  description: "The online presence that fills your calendar—without chasing leads or wasting money on ads. For car detailers doing $75K+ revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
