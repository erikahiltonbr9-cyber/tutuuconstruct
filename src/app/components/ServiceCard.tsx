import { Card } from './Card';
import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  highlighted?: boolean;
  onLearnMore?: () => void;
}

export const ServiceCard = ({
  icon,
  title,
  description,
  features,
  highlighted = false,
  onLearnMore,
}: ServiceCardProps) => {
  return (
    <Card
      variant={highlighted ? 'gradient' : 'surface'}
      padding="lg"
      className={clsx(
        'flex flex-col gap-5 h-full group',
        highlighted && 'text-white'
      )}
    >
      <div
        className={clsx(
          'w-14 h-14 rounded-[15px] flex items-center justify-center',
          highlighted ? 'bg-white/20' : 'bg-[#161b21]'
        )}
      >
        <div className={highlighted ? 'text-white' : 'text-white'}>{icon}</div>
      </div>

      <h3
        className={clsx(
          'text-2xl font-semibold',
          highlighted ? 'text-white' : 'text-[#161b21]'
        )}
      >
        {title}
      </h3>

      <p
        className={clsx(
          'text-base leading-normal',
          highlighted ? 'text-white/90' : 'text-[#737a82]'
        )}
      >
        {description}
      </p>

      {features && features.length > 0 && (
        <ul className="flex flex-col gap-2 mt-auto">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-base">
              <div
                className={clsx(
                  'w-1.5 h-1.5 rounded-full shrink-0',
                  highlighted ? 'bg-white' : 'bg-[#ff563f]'
                )}
              />
              <span className={highlighted ? 'text-white/90' : 'text-[#161b21]'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {onLearnMore && (
        <button
          onClick={onLearnMore}
          className={clsx(
            'inline-flex items-center gap-2 text-base font-medium mt-auto transition-default group-hover:gap-3',
            highlighted ? 'text-white' : 'text-[#161b21]'
          )}
        >
          Подробнее
          <ArrowRight size={18} />
        </button>
      )}
    </Card>
  );
};
