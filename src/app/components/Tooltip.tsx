import { useState, useRef } from 'react';
import { clsx } from 'clsx';

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ children, content, position = 'top' }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setVisible(true), 200);
  };

  const hide = () => {
    clearTimeout(timeout.current);
    setVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={clsx(
            'absolute z-50 px-3 py-1.5 rounded-[10px] bg-[#161b21] text-white text-sm font-medium whitespace-nowrap animate-fade-in pointer-events-none',
            positionClasses[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
