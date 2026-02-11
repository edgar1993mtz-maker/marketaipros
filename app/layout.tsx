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
      <body className="bg-black text-white min-h-screen antialiased">
        <div className="flex flex-col min-h-screen">
          
          {/* Global Header */}
          <header className="w-full py-6 border-b border-yellow-600/40">
            <h1 className="text-center text-2xl font-bold tracking-wide text-yellow-500">
              MARKETAIPROS — PRIME INTELLIGENCE
            </h1>
          </header>

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Global Footer */}
          <footer className="w-full py-6 border-t border-yellow-600/40 text-center text-gray-500 text-sm">
            MarketAIPros © {new Date().getFullYear()} — Educational use only.
          </footer>

        </div>
      </body>
    </html>
  );
}

