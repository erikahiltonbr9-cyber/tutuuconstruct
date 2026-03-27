import { clsx } from 'clsx';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center text-center py-16 px-8', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-full bg-[#eaeeee] flex items-center justify-center text-[#737a82] mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#161b21] mb-2">{title}</h3>
      {description && (
        <p className="text-base text-[#737a82] max-w-md mb-6">{description}</p>
      )}
      {action}
    </div>
  );
};
