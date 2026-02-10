interface CardProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-amber-500/30 transition ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
