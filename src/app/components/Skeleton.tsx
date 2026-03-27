import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ className, variant = 'text', width, height }: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-[#eaeeee]';
  const variantClasses = {
    text: 'rounded-[6px] h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-[15px]',
  };

  return (
    <div
      className={clsx(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
    />
  );
};

export const SkeletonCard = () => (
  <div className="bg-white rounded-[17px] p-6 flex flex-col gap-4">
    <Skeleton variant="rectangular" height={200} />
    <Skeleton variant="text" width="70%" />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="40%" />
    <div className="flex gap-3 mt-2">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="30%" />
      </div>
    </div>
  </div>
);
