import { clsx } from 'clsx';
import { ToggleLeft, ToggleRight } from 'lucide-react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch = ({ checked, onChange, label, disabled = false }: SwitchProps) => {
  return (
    <label
      className={clsx(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          'relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#161b21]/20',
          checked ? 'bg-[#161b21]' : 'bg-[#bbbebe]'
        )}
      >
        <span
          className={clsx(
            'absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200',
            checked && 'translate-x-5'
          )}
        />
      </button>
      {label && (
        <span className="text-base font-medium text-[#161b21]">{label}</span>
      )}
    </label>
  );
};

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox = ({ checked, onChange, label, disabled = false }: CheckboxProps) => {
  return (
    <label
      className={clsx(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          'w-6 h-6 rounded-[6px] border-2 flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#161b21]/20',
          checked
            ? 'bg-[#161b21] border-[#161b21] text-white'
            : 'border-[#bbbebe] bg-white'
        )}
      >
        {checked && (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {label && (
        <span className="text-base text-[#161b21]">{label}</span>
      )}
    </label>
  );
};
