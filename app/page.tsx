export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      
      {/* Logo Icon */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-black"></div>
          <div className="w-4 h-4 bg-neutral-900 mt-1"></div>
          <div className="w-5 h-5 bg-yellow-500 mt-1"></div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-wide text-yellow-500 text-center">
        MARKETAIPROS
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-lg mt-4 text-center tracking-wide">
        PRIME INTELLIGENCE — Institutional‑Grade Market Analysis
      </p>

      {/* Description */}
      <p className="text-gray-500 text-md mt-3 text-center max-w-xl">
        Weekly institutional insights. Prime Picks. Momentum Leaders.  
        ETF flows. Sector rotation. Built for clarity, discipline, and precision.
      </p>

      {/* Subscribe Button */}
      <a
        href="https://marketaipros.beehiiv.com/subscribe"
        className="mt-8 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition"
      >
        Subscribe on Beehiiv
      </a>
    </div>
  );
}
// trigger deploy
