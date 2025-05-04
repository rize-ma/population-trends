import type { FC, ReactNode } from 'react';

interface TextMessageProps {
  children: ReactNode;
  variant?: 'normal' | 'error';
}

const TextMessage: FC<TextMessageProps> = ({ children, variant = 'normal' }) => {
  const textColor = variant === 'error' ? 'text-red-500' : 'text-black';

  return (
    <div>
      <span className={`text-base md:text-2xl ${textColor}`}>{children}</span>
    </div>
  );
};

export default TextMessage;
