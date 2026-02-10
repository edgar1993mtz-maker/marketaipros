import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "MarketAIPros",
  description: "Institutional AI Trading Intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
