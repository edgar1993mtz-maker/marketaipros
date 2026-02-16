// app/page.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050509] text-white flex flex-col items-center px-6">
      
      {/* HERO */}
      <section className="w-full max-w-3xl text-center mt-20">
        <h1 className="text-[12px] tracking-[0.25em] text-[#d4af37] uppercase mb-3">
          MarketAIPros • Prime Intelligence
        </h1>

        <h2 className="text-4xl font-semibold mb-4">
          Daily Macro Intelligence Report
        </h2>

        <p className="text-lg text-[#b3b3c2] leading-relaxed max-w-2xl mx-auto">
          Análisis institucional. Señales cuantitativas.  
          Contexto real del mercado. Sin adivinanzas.  
          Solo claridad y disciplina.
        </p>
      </section>

      {/* BEEHIIV SUBSCRIBE FORM */}
      <section className="w-full max-w-xl mt-10">
        <script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
        <iframe 
          src="https://subscribe-forms.beehiiv.com/38b2313f-99a9-46ca-8d62-b80eb6e6a62a"
          data-test-id="beehiiv-embed"
          frameBorder="0"
          scrolling="no"
          className="w-full"
          style={{ height: "291px", backgroundColor: "transparent" }}
        ></iframe>
      </section>

      {/* OPTIONAL NAS100 IMAGE */}
      <section className="w-full max-w-3xl mt-20">
        <img
          src="/nas100_sample.png"
          alt="NAS100 Chart"
          className="rounded-lg border border-[#262633] shadow-xl"
        />
      </section>

      {/* GUARANTEE */}
      <section className="w-full max-w-3xl mt-20 text-center">
        <h3 className="text-[12px] tracking-[0.25em] text-[#d4af37] uppercase mb-4">
          MarketAIPros Guarantee
        </h3>

        <p className="text-[#b3b3c2] leading-relaxed text-lg">
          En MarketAIPros no adivinamos. No prometemos resultados imposibles.  
          Lo que sí garantizamos:
        </p>

        <ul className="mt-6 space-y-2 text-[#a0a0b5] text-lg">
          <li>• Análisis basado en datos reales</li>
          <li>• Modelos cuantitativos consistentes</li>
          <li>• Señales generadas por reglas, no emociones</li>
          <li>• Explicaciones claras y transparentes</li>
          <li>• Actualización diaria sin fallas</li>
          <li>• Disciplina institucional</li>
        </ul>
      </section>

      {/* BENEFITS */}
      <section className="w-full max-w-3xl mt-20 text-center">
        <h3 className="text-[12px] tracking-[0.25em] text-[#d4af37] uppercase mb-4">
          ¿Qué recibirás cada día?
        </h3>

        <ul className="space-y-3 text-[#b3b3c2] text-lg">
          <li>• Resumen macro claro y directo</li>
          <li>• Regime Strip (USD, LATAM, Volatilidad)</li>
          <li>• Top Trade Ideas basadas en datos</li>
          <li>• Pair Highlights explicados con claridad</li>
          <li>• Gráficos premium (NAS100 + Stock de la Semana)</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="mt-24 mb-10 text-center text-[#6f6f85] text-sm">
        <div className="tracking-[0.25em] uppercase mb-2">
          MarketAIPros • Prime Intelligence
        </div>
        © 2026 MarketAIPros. Todos los derechos reservados.
      </footer>

    </main>
  );
}
