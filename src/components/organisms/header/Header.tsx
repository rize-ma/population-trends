import type { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full bg-sky-500/100">
      <div className="px-4 py-4 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-3xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
