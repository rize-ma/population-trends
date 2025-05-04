import type { FC, ReactNode } from 'react';

interface LoadingProps {
  message?: ReactNode;
}

const Loading: FC<LoadingProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      <span className="text-base md:text-2xl mt-3">{message ?? '読込中...'}</span>
    </div>
  );
};

export default Loading;
