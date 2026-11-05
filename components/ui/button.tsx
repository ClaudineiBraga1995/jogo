import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-[12px] bg-[#6f8dca] font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#5b7ab7] disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}