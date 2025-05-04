import type { FC } from 'react';
import type { ButtonItem } from '../../atoms/button/Button';
import Button from '../../atoms/button/Button';

export type ButtonItems = Array<ButtonItem & { id: string }>;

interface ButtonListProps {
  ButtonItems: ButtonItems;
}
const ButtonList: FC<ButtonListProps> = ({ ButtonItems }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {ButtonItems.map(({ id, disabled, isSelected, label, onClick }) => (
        <Button
          key={id}
          disabled={disabled}
          isSelected={isSelected}
          label={label}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default ButtonList;
