import type { FC, ReactNode } from 'react';
import ChevronUp from '../icon/ChevronUp';

export interface AccordionItem {
  label: ReactNode;
  content: ReactNode;
}

type AccordionProps = AccordionItem;

const Accordion: FC<AccordionProps> = ({ label, content }) => {
  return (
    <details className="group">
      <summary className="block bg-red-50 ">
        <span className="cursor-pointer flex flex-row justify-between items-center px-5 py-3 border font-bold">
          {label}
          <ChevronUp />
        </span>
      </summary>
      <div className="px-6 py-4 border border-t-0">{content}</div>
    </details>
  );
};

export default Accordion;
