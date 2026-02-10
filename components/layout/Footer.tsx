export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-amber-400 font-bold mb-4">MarketAI Pros</h3>
            <p className="text-slate-400 text-sm">Professional investment analysis powered by AI</p>
          </div>
          <div>
            <h3 className="text-amber-400 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-amber-400 transition">Home</a></li>
              <li><a href="/buffet" className="hover:text-amber-400 transition">Buffett</a></li>
              <li><a href="/sniper" className="hover:text-amber-400 transition">Sniper</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-amber-400 font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-amber-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; 2024 MarketAI Pros. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
