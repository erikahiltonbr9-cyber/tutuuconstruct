import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    icon,
    iconPosition = 'right',
    className, 
    ...props 
  }, ref) => {
    const baseClasses = 'btn-site inline-flex items-center justify-center gap-3 rounded-full transition-default font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed btn-press';
    
    const variants = {
      primary: 'bg-[#161b21] text-[#fbfbfb] hover:opacity-90',
      secondary: 'bg-[#fbfbfb] text-[#161b21] hover:bg-[#eaeeee]',
      ghost: 'bg-transparent text-[#161b21] hover:bg-[#eaeeee]',
      gradient: 'gradient-primary text-[#fbfbfb] hover:opacity-90',
    };

    const sizes = {
      sm: 'px-4 py-2 text-base',
      md: 'px-6 py-4 text-xl',
      lg: 'px-8 py-5 text-xl',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
