import { useState } from 'react';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export const Tabs = ({ tabs, defaultTab, variant = 'default' }: TabsProps) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const tabStyles = {
    default:
      'px-5 py-3 rounded-full font-medium text-base transition-default',
    pills:
      'px-5 py-3 rounded-[10px] font-medium text-base transition-default',
    underline:
      'px-4 py-3 font-medium text-base transition-default border-b-2 rounded-none',
  };

  const activeStyles = {
    default: 'bg-[#161b21] text-white',
    pills: 'bg-[#161b21] text-white',
    underline: 'border-[#161b21] text-[#161b21]',
  };

  const inactiveStyles = {
    default: 'text-[#737a82] hover:bg-[#eaeeee]',
    pills: 'text-[#737a82] hover:bg-[#eaeeee]',
    underline: 'border-transparent text-[#737a82] hover:text-[#161b21]',
  };

  return (
    <div>
      <div
        className={clsx(
          'flex gap-1 mb-6',
          variant === 'default' && 'bg-[#eaeeee] p-1 rounded-full w-fit',
          variant === 'pills' && 'gap-2',
          variant === 'underline' && 'border-b border-[rgba(60,58,62,0.1)] gap-0'
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={clsx(
              tabStyles[variant],
              active === tab.id ? activeStyles[variant] : inactiveStyles[variant],
              tab.icon && 'inline-flex items-center gap-2'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
};
