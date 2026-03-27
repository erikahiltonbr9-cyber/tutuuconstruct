import { clsx } from 'clsx';

export interface DividerProps {
  label?: string;
  variant?: 'solid' | 'dashed' | 'gradient';
  spacing?: 'sm' | 'md' | 'lg';
}

export const Divider = ({ label, variant = 'solid', spacing = 'md' }: DividerProps) => {
  const spacings = {
    sm: 'my-4',
    md: 'my-8',
    lg: 'my-12',
  };

  if (label) {
    return (
      <div className={clsx('flex items-center gap-4', spacings[spacing])}>
        <div
          className={clsx(
            'flex-1 h-px',
            variant === 'gradient'
              ? 'bg-gradient-to-r from-transparent via-[rgba(60,58,62,0.15)] to-transparent'
              : variant === 'dashed'
                ? 'border-t border-dashed border-[rgba(60,58,62,0.15)]'
                : 'bg-[rgba(60,58,62,0.15)]'
          )}
        />
        <span className="text-sm font-medium text-[#737a82] whitespace-nowrap">
          {label}
        </span>
        <div
          className={clsx(
            'flex-1 h-px',
            variant === 'gradient'
              ? 'bg-gradient-to-r from-transparent via-[rgba(60,58,62,0.15)] to-transparent'
              : variant === 'dashed'
                ? 'border-t border-dashed border-[rgba(60,58,62,0.15)]'
                : 'bg-[rgba(60,58,62,0.15)]'
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        spacings[spacing],
        variant === 'gradient'
          ? 'h-px bg-gradient-to-r from-transparent via-[rgba(60,58,62,0.15)] to-transparent'
          : variant === 'dashed'
            ? 'border-t border-dashed border-[rgba(60,58,62,0.15)]'
            : 'h-px bg-[rgba(60,58,62,0.15)]'
      )}
    />
  );
};
