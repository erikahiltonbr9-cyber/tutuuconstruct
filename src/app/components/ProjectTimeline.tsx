import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export interface TimelineStep {
  title: string;
  description: string;
  duration: string;
  completed?: boolean;
  active?: boolean;
}

export interface ProjectTimelineProps {
  steps: TimelineStep[];
}

export const ProjectTimeline = ({ steps }: ProjectTimelineProps) => {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4 md:gap-6">
          {/* Timeline line & dot */}
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-default',
                step.completed
                  ? 'bg-[#4caf50] text-white'
                  : step.active
                    ? 'gradient-primary text-white'
                    : 'bg-[#eaeeee] text-[#737a82]'
              )}
            >
              {step.completed ? <Check size={20} /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={clsx(
                  'w-0.5 flex-1 min-h-[40px]',
                  step.completed ? 'bg-[#4caf50]' : 'bg-[#eaeeee]'
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-8 flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h4
                className={clsx(
                  'text-xl font-semibold',
                  step.active ? 'text-[#ff563f]' : 'text-[#161b21]'
                )}
              >
                {step.title}
              </h4>
              <span className="text-sm text-[#737a82] bg-[#eaeeee] px-3 py-0.5 rounded-full">
                {step.duration}
              </span>
            </div>
            <p className="text-base text-[#737a82] leading-normal">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
