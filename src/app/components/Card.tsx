import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'surface';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'md',
  hover = false,
  className, 
  ...props 
}: CardProps) => {
  const baseClasses = 'rounded-[15px] transition-default';
  
  const variants = {
    default: 'bg-white',
    gradient: 'gradient-primary',
    surface: 'bg-white border border-[#ececf1]',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  const hoverClasses = hover ? 'card-hover-lift cursor-pointer' : '';

  return (
    <div
      className={clsx(baseClasses, variants[variant], paddings[padding], hoverClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  onSelect?: () => void;
}

export const PricingCard = ({
  title,
  price,
  originalPrice,
  period,
  features,
  highlighted = false,
  onSelect,
}: PricingCardProps) => {
  return (
    <Card 
      variant={highlighted ? 'gradient' : 'surface'} 
      padding="lg"
      className={clsx(
        'flex flex-col gap-5',
        highlighted ? 'text-white' : 'text-[#161b21]'
      )}
    >
      <div className="flex flex-col gap-3">
        <h3 className={clsx(
          'text-[34px] font-semibold leading-normal',
          highlighted ? 'text-white' : 'text-[#161b21]'
        )}>
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold">{price}</p>
          {originalPrice && (
            <p className="text-xl opacity-40 line-through">{originalPrice}</p>
          )}
        </div>
        <p className="text-base opacity-40">{period}</p>
      </div>
      
      <div className="flex flex-col gap-3 flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <svg 
              width="12" 
              height="16" 
              viewBox="0 0 12 16" 
              fill="none" 
              className="shrink-0 mt-1"
            >
              <path 
                d="M6 8C6.4125 8 6.76563 7.84333 7.05938 7.53C7.35313 7.21667 7.5 6.84 7.5 6.4C7.5 5.96 7.35313 5.58333 7.05938 5.27C6.76563 4.95667 6.4125 4.8 6 4.8C5.5875 4.8 5.23438 4.95667 4.94063 5.27C4.64688 5.58333 4.5 5.96 4.5 6.4C4.5 6.84 4.64688 7.21667 4.94063 7.53C5.23438 7.84333 5.5875 8 6 8ZM6 16C3.9875 14.1733 2.48438 12.4767 1.49063 10.91C0.496875 9.34333 0 7.89333 0 6.56C0 4.56 0.603125 2.96667 1.80938 1.78C3.01563 0.593333 4.4125 0 6 0C7.5875 0 8.98438 0.593333 10.1906 1.78C11.3969 2.96667 12 4.56 12 6.56C12 7.89333 11.5031 9.34333 10.5094 10.91C9.51562 12.4767 8.0125 14.1733 6 16Z" 
                fill={highlighted ? '#FBFBFB' : '#161B21'}
              />
            </svg>
            <p className="text-base leading-normal">{feature}</p>
          </div>
        ))}
      </div>

      {onSelect && (
        <button
          onClick={onSelect}
          className={clsx(
            'w-full py-4 px-6 rounded-full font-medium text-xl transition-default',
            highlighted 
              ? 'bg-white text-[#161b21] hover:bg-opacity-90' 
              : 'bg-[#161b21] text-white hover:bg-opacity-90'
          )}
        >
          Выбрать план
        </button>
      )}
    </Card>
  );
};
