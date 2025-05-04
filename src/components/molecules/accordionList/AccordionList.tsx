import type { FC } from 'react';
import type { AccordionItem } from '../../atoms/accordion/Accordion';
import Accordion from '../../atoms/accordion/Accordion';

export type AccordionItems = Array<AccordionItem & { id: string }>;

export interface AccordionListProps {
  accordionItems: AccordionItems;
}

const AccordionList: FC<AccordionListProps> = ({ accordionItems }) => {
  return (
    <div className="w-full">
      {accordionItems.map(({ id, label, content }) => (
        <Accordion key={id} label={label} content={content} />
      ))}
    </div>
  );
};

export default AccordionList;
