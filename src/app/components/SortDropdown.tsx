import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export type SortOption = 
  | 'popular'
  | 'price-low'
  | 'price-high'
  | 'area-low'
  | 'area-high'
  | 'newest';

export interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price-low', label: 'Цена: по возрастанию' },
  { value: 'price-high', label: 'Цена: по убыванию' },
  { value: 'area-low', label: 'Площадь: по возрастанию' },
  { value: 'area-high', label: 'Площадь: по убыванию' },
  { value: 'newest', label: 'Сначала новые' },
];

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find(opt => opt.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#eaeeee] text-[#161b21] font-medium text-base transition-default hover:bg-[#d5d9d9]"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown
          size={18}
          className={clsx('transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-[15px] shadow-lg border border-[rgba(60,58,62,0.15)] overflow-hidden z-20">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={clsx(
                  'w-full text-left px-5 py-3 transition-default',
                  option.value === value
                    ? 'bg-[#161b21] text-white'
                    : 'text-[#161b21] hover:bg-[#eaeeee]'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
