import '../styles/globals.css';

export const metadata = {
  title: 'MarketAIPros',
  description: 'AI-Powered Investment Analysis Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
