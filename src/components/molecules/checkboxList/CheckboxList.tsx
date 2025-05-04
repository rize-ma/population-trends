import type { FC } from 'react';
import type { CheckboxItem } from '../../atoms/checkbox/Checkbox';
import Checkbox from '../../atoms/checkbox/Checkbox';
import { isNumberArray } from '../../../utils/typeGuards/typeGuards';

export interface CheckboxListProps {
  checkboxItems: Omit<CheckboxItem, 'checked' | 'onClickCheck'>[] | [];
  onToggle: (checked: boolean, label: string, value: number | string) => void;
  selectedItems: number[] | string[];
}

const CheckboxList: FC<CheckboxListProps> = ({ checkboxItems, onToggle, selectedItems }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {checkboxItems.map(({ label, value }) => {
        const checked = isNumberArray(selectedItems)
          ? typeof value === 'number' && selectedItems.includes(value)
          : typeof value === 'string' && selectedItems.includes(value);
        return (
          <Checkbox
            key={value}
            checked={checked}
            label={label}
            onClickCheck={(checked) => onToggle(checked, label, value)}
            value={value}
          />
        );
      })}
    </div>
  );
};

export default CheckboxList;
