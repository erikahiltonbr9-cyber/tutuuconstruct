import { clsx } from 'clsx';

export interface StatCounterProps {
  value: string;
  label: string;
  suffix?: string;
  variant?: 'default' | 'gradient';
}

export const StatCounter = ({
  value,
  label,
  suffix,
  variant = 'default',
}: StatCounterProps) => {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <p
        className={clsx(
          'text-4xl md:text-5xl font-bold',
          variant === 'gradient' ? 'gradient-text' : 'text-[#161b21]'
        )}
      >
        {value}
        {suffix && <span className="text-2xl">{suffix}</span>}
      </p>
      <p className="text-base text-[#737a82]">{label}</p>
    </div>
  );
};

export interface StatsBarProps {
  stats: StatCounterProps[];
}

export const StatsBar = ({ stats }: StatsBarProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-12 px-6 md:px-10 bg-[#eaeeee] rounded-[15px]">
      {stats.map((stat, index) => (
        <StatCounter key={index} {...stat} />
      ))}
    </div>
  );
};
