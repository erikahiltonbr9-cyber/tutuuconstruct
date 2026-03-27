import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export interface AccordionItemProps {
  question: string;
  answer: string;
}

export const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#bbbebe]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left transition-default hover:opacity-80"
      >
        <h3 className="text-2xl font-semibold text-[#161b21] pr-4">{question}</h3>
        <ChevronDown
          size={24}
          className={clsx(
            'shrink-0 text-[#161b21] accordion-icon',
            isOpen && 'is-open'
          )}
        />
      </button>
      <div
        className={clsx(
          'accordion-content',
          isOpen && 'is-open'
        )}
      >
        <div>
          <p className="text-base text-[#737a82] leading-normal pb-6">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  items: AccordionItemProps[];
}

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
};
