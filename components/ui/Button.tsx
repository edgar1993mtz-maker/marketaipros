interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  [key: string]: any;
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition';
  
  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-black',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    outline: 'border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
