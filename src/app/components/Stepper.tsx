import { clsx } from 'clsx';

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={clsx('flex items-center w-full', className)}>
      {steps.map((label, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <div key={idx} className={clsx('flex items-center', !isLast && 'flex-1')}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shrink-0',
                  isCompleted && 'bg-[#161b21] text-white',
                  isCurrent && 'bg-[#ff563f] text-white ring-4 ring-[#ff563f]/20',
                  !isCompleted && !isCurrent && 'bg-[#eaeeee] text-[#737a82]'
                )}
              >
                {isCompleted ? (
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path d="M1 6L6 11L15 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className={clsx(
                  'text-xs font-medium text-center whitespace-nowrap',
                  (isCompleted || isCurrent) ? 'text-[#161b21]' : 'text-[#bbbebe]'
                )}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={clsx(
                  'flex-1 h-0.5 mx-3 mt-[-20px] transition-colors duration-300',
                  isCompleted ? 'bg-[#161b21]' : 'bg-[#eaeeee]'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
