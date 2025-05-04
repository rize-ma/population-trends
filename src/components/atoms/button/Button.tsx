import type { FC, ReactNode } from 'react';

export interface ButtonItem {
  disabled?: boolean;
  isSelected?: boolean;
  label: ReactNode;
  onClick?: () => void;
}

type ButtonProps = ButtonItem;

const Button: FC<ButtonProps> = ({ disabled = false, isSelected = false, label, onClick }) => {
  const baseClasses = 'font-bold mt-5 text-base px-3 py-1 rounded';
  const enabledClasses = isSelected
    ? 'bg-teal-500 text-white cursor-pointer'
    : 'bg-sky-500/100 text-white cursor-pointer';
  const disabledClasses = 'bg-gray-300 text-black cursor-not-allowed opacity-100';

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
