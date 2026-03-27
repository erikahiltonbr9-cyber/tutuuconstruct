import { clsx } from 'clsx';
import { Card } from './Card';

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: 'default' | 'gradient';
}

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  variant = 'default' 
}: FeatureCardProps) => {
  return (
    <Card
      variant={variant === 'gradient' ? 'gradient' : 'surface'}
      padding="lg"
      className={clsx(
        'flex flex-col gap-4 h-full card-hover-lift',
        variant === 'gradient' && 'text-white'
      )}
    >
      {icon && (
        <div className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center card-icon icon-spin-hover',
          variant === 'gradient' ? 'bg-white/20' : 'bg-[#161b21]'
        )}>
          <div className={variant === 'gradient' ? 'text-white' : 'text-white'}>
            {icon}
          </div>
        </div>
      )}
      <h3 className={clsx(
        'text-2xl font-semibold',
        variant === 'gradient' ? 'text-white' : 'text-[#161b21]'
      )}>
        {title}
      </h3>
      <p className={clsx(
        'text-base leading-normal',
        variant === 'gradient' ? 'text-white/90' : 'text-[#737a82]'
      )}>
        {description}
      </p>
    </Card>
  );
};

export interface IconCardProps {
  number: string;
  title: string;
  description: string;
}

export const IconCard = ({ number, title, description }: IconCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>
      <h3 className="text-2xl font-semibold text-[#161b21]">{title}</h3>
      <p className="text-base text-[#737a82] leading-normal">{description}</p>
    </div>
  );
};
