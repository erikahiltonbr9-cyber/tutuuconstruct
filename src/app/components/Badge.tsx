import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge = ({ children, variant = 'default', size = 'md' }: BadgeProps) => {
  const variants = {
    default: 'bg-[#eaeeee] text-[#161b21]',
    success: 'bg-[#4caf50]/10 text-[#4caf50]',
    warning: 'bg-[#ffcd05]/10 text-[#b8930a]',
    error: 'bg-[#ff402d]/10 text-[#ff402d]',
    gradient: 'gradient-primary text-white',
    outline: 'bg-transparent border border-[rgba(60,58,62,0.15)] text-[#161b21]',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size]
      )}
    >
      {children}
    </span>
  );
};
