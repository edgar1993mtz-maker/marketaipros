import './global.css';

export const metadata = {
  title: 'MarketAIPros',
  description: 'AI-powered market intelligence',
};

export default function HomePage() {
  return (
    <main className="min-h-screen p-10">
      <section aria-labelledby="home-title">
        <h1 id="home-title" className="text-4xl text-tron font-bold">
          Welcome to MarketAIPros
        </h1>
        <p className="mt-4 text-gray-300 max-w-xl">
          MarketAIPros delivers AI-driven market insights, signal discovery, and tools built for
          professional traders and analysts.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/pricing"
            className="px-5 py-3 bg-tron text-black rounded font-semibold"
            role="button"
            aria-label="View pricing"
          >
            See Pricing
          </a>
          <a
            href="/contact"
            className="px-5 py-3 border border-tron rounded text-tron"
            role="button"
            aria-label="Contact us"
          >
            Contact Sales
          </a>
        </div>

        <section className="mt-12" aria-labelledby="features-title">
          <h2 id="features-title" className="text-2xl font-bold text-tron">
            Key features
          </h2>
          <ul className="mt-4 list-disc list-inside text-gray-300">
            <li>Real-time market signals powered by custom LLMs</li>
            <li>Actionable dashboards and alerts</li>
            <li>Secure team management and role-based access</li>
          </ul>
        </section>
      </section>
    </main>
  );
}
