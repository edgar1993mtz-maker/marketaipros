export default function Home() {
  return (
    <div className="min-h-screen bg-blackSoft text-gold flex flex-col items-center justify-center px-6 py-20">

      {/* Logo Icon */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-blackDeep"></div>
          <div className="w-4 h-4 bg-blackSoft mt-1"></div>
          <div className="w-5 h-5 bg-gold mt-1"></div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-wide text-gold text-center drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]">
        MARKETAIPROS
      </h1>

      {/* Subtitle */}
      <p className="text-goldLight text-lg mt-4 text-center tracking-wide">
        PRIME INTELLIGENCE — Institutional‑Grade Market Analysis
      </p>

      {/* Description */}
      <p className="text-gold/60 text-md mt-3 text-center max-w-xl leading-relaxed">
        Weekly institutional insights. Prime Picks. Momentum Leaders.  
        ETF flows. Sector rotation. Built for clarity, discipline, and precision.
      </p>

      {/* Subscribe Button */}
      <a
        href="https://marketaipros.beehiiv.com/subscribe"
        className="mt-8 px-8 py-3 bg-gold text-black font-semibold rounded-lg shadow-gold hover:bg-goldLight transition"
      >
        Subscribe on Beehiiv
      </a>
    </div>
  );
}
