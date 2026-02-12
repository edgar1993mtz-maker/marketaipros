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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ⭐ TradingView-style theme persistence */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem("theme") || "dark";
              if (theme === "light") {
                document.documentElement.classList.remove("dark");
              } else {
                document.documentElement.classList.add("dark");
              }
            `,
          }}
        />
      </head>

      <body className="bg-blackSoft text-gold min-h-screen antialiased dark:bg-black dark:text-gold">
        <div className="flex flex-col min-h-screen">

          {/* Global Header */}
          <header className="w-full py-6 border-b border-gold/20 bg-blackDeep shadow-lg shadow-black/40">
            <h1 className="text-center text-2xl font-bold tracking-wide text-gold">
              MARKETAIPROS — PRIME INTELLIGENCE
            </h1>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-blackSoft dark:bg-black">
            {children}
          </main>

          {/* Global Footer */}
          <footer className="w-full py-6 border-t border-gold/20 text-center text-gold/60 text-sm bg-blackDeep">
            MarketAIPros © {new Date().getFullYear()} — Institutional Intelligence.
          </footer>

        </div>
      </body>
    </html>
  );
}
