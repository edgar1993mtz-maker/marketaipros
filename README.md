# MarketAI Pros

Professional-grade Buffett valuations and Sniper trading signals powered by AI.

## Features

- **Buffett Valuation Analysis**: Deep value analysis using Buffett's investment principles
  - P/E Ratio analysis
  - ROE evaluation
  - Financial strength assessment
  - Competitive moat evaluation

- **Sniper Trading Signals**: Real-time trading signals with precise entry/exit levels
  - Buy/Sell/Hold signals
  - Entry price, target, and stop-loss
  - Risk/reward ratio analysis
  - Confidence scoring

- **Sector Rotation**: Track sector performance and rotation opportunities
  - Sector strength analysis
  - Allocation recommendations
  - Momentum tracking

- **Weekly Updates**: Market outlook and key events
  - Market sentiment analysis
  - Key upcoming events
  - Top movers and shakers

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI**: React 18.2.0 + Tailwind CSS 4.1.18
- **Charts**: Recharts 2.10.0
- **State Management**: Zustand 4.4.0
- **Backend**: Next.js API Routes
- **Database**: Supabase (optional)

## Project Structure

```
app/
├── layout.tsx           # Root layout with Navbar & Footer
├── page.tsx            # Homepage
├── dashboard/          # Dashboard overview
├── buffet/             # Buffett valuation analysis
├── sniper/             # Sniper trading signals
├── (auth)/             # Auth pages (login/register)
└── api/                # API routes
components/
├── ui/                 # Reusable UI components
├── layout/             # Layout components
└── charts/             # Chart components
lib/
├── buffetScore.ts      # Buffett scoring algorithm
├── sniperEngine.ts     # Sniper signal generation
├── sectorRotation.ts   # Sector analysis
├── fetcher.ts          # API fetcher utility
└── supabase.ts         # Database integration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

## Key Pages

- **Home** (`/`): Landing page with newsletter signup
- **Dashboard** (`/dashboard`): Overview of Buffett scores, Sniper signals, and market data
- **Buffett** (`/buffet`): Deep Buffett valuation analysis
- **Sniper** (`/sniper`): Real-time trading signals
- **Login** (`/login`): User authentication
- **Register** (`/register`): Account creation

## API Routes

- `GET/POST /api/buffet` - Buffett score data
- `GET/POST /api/sniper` - Sniper signals
- `GET/POST /api/weekly` - Weekly updates

## Styling

The project uses Tailwind CSS for styling with a dark theme (slate-950 background). All styles are in:
- `styles/globals.css` - Global Tailwind setup
- `styles/dashboard.css` - Dashboard specific styles
- `styles/buffet.css` - Buffett page styles
- `styles/sniper.css` - Sniper page styles

## Components

### UI Components
- `Button` - Customizable button with variants
- `Card` - Content card with borders
- `Badge` - Status badges with variants
- `Table` - Data table component
- `DividerGold` - Decorative gold divider

### Layout Components
- `Navbar` - Top navigation with mobile menu
- `Sidebar` - Secondary navigation (desktop)
- `Footer` - Site footer

### Chart Components
- `LineChart` - Recharts line chart
- `BarChart` - Recharts bar chart
- `CandleChart` - Candlestick/area chart

## Utilities

### `lib/buffetScore.ts`
- `calculateBuffettScore()` - Calculate valuation score
- `getScoreColor()` - Get color based on score

### `lib/sniperEngine.ts`
- `generateSniperSignal()` - Generate trading signals
- `SniperSignal` interface - Signal data structure

### `lib/sectorRotation.ts`
- `analyzeSectorRotation()` - Analyze sector performance
- `getTopSector()` - Get best performing sector

### `lib/fetcher.ts`
- `fetcher()` - Utility for API calls

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run type-check  # Check TypeScript
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your Git repository to Vercel for automatic deployments.

## Future Enhancements

- [ ] Real-time data integration with financial APIs
- [ ] User portfolios and watchlists
- [ ] Backtesting engine
- [ ] ML-powered signal improvements
- [ ] Mobile app
- [ ] Community features and leaderboards

## License

MIT

## Support

For issues and questions, please open an issue in the repository.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
