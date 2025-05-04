import type { FC } from 'react';

export interface CheckboxItem {
  checked: boolean;
  label: string;
  onClickCheck?: (checked: boolean) => void;
  value: number | string;
}

type CheckboxProps = CheckboxItem;

const Checkbox: FC<CheckboxProps> = ({ checked = false, label, onClickCheck, value }) => {
  return (
    <label className="w-24 flex cursor-pointer items-center gap-1">
      <input
        type="checkbox"
        className={
          'h-4 w-4 cursor-pointer rounded-md border-gray-300 bg-gray-100 disabled:pointer-events-none'
        }
        checked={checked}
        onChange={(e) => onClickCheck && onClickCheck(e.target.checked)}
        value={value}
      />
      <span className="text-gray-900">{label}</span>
    </label>
  );
};
export default Checkbox;
