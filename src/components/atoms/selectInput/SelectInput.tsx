import type { ChangeEvent, FC, ReactNode } from 'react';

interface SelectOption {
  id: string;
  label: ReactNode;
  value: number | string;
}

export interface SelectInputItem {
  id: string;
  labelText?: ReactNode;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: SelectOption[];
}

type SelectInputProps = SelectInputItem;

const SelectInput: FC<SelectInputProps> = ({ id, labelText, onChange, selectOptions }) => {
  return (
    <div className="flex flex-col justify-center items-start">
      {labelText && (
        <label htmlFor={id} className="mb-1 text-sm">
          {labelText}
        </label>
      )}
      <select id={id} onChange={onChange} className="outline-none border rounded p-1">
        {selectOptions.map(({ id, label, value }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
