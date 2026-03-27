import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-base font-medium text-[#161b21]">
            {label}
          </label>
        )}
        <div className="relative input-focus-line">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737a82]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full px-5 py-4 rounded-full bg-[#f5f5f5] border border-[rgba(60,58,62,0.15)] text-base text-[#161b21] placeholder:text-[#737a82] placeholder:opacity-50 transition-default focus:outline-none focus:ring-2 focus:ring-[#161b21] focus:ring-opacity-20',
              icon && 'pl-12',
              error && 'border-[#ff402d]',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-[#ff402d]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-base font-medium text-[#161b21]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'w-full px-5 py-4 rounded-[15px] bg-[#f5f5f5] border border-[rgba(60,58,62,0.15)] text-base text-[#161b21] placeholder:text-[#737a82] placeholder:opacity-50 transition-default focus:outline-none focus:ring-2 focus:ring-[#161b21] focus:ring-opacity-20 resize-none',
            error && 'border-[#ff402d]',
            className
          )}
          rows={4}
          {...props}
        />
        {error && (
          <p className="text-sm text-[#ff402d]">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
