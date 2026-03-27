import { clsx } from 'clsx';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'gray';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Section = ({ 
  children, 
  variant = 'default',
  padding = 'lg',
  className, 
  ...props 
}: SectionProps) => {
  const variants = {
    default: 'bg-white',
    gray: 'bg-[#eaeeee]',
  };

  const paddings = {
    sm: 'py-12 sm:py-16',
    md: 'py-16 sm:py-20',
    lg: 'py-20 sm:py-24',
    xl: 'py-24 sm:py-32',
  };

  return (
    <section
      className={clsx(variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </section>
  );
};

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = true 
}: SectionHeaderProps) => {
  return (
    <div className={clsx(
      'flex flex-col gap-5 mb-12 sm:mb-16',
      centered && 'items-center text-center max-w-3xl mx-auto'
    )}>
      <h2 className="text-[44px] font-semibold text-[#161b21] leading-none section-title">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-[#737a82] leading-normal section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};