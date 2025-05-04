import type { FC } from 'react';

const ChevronUp: FC = () => {
  return (
    <span className="block relative w-6 ml-1.5 flex-shrink-0 origin-[center_43%] transition-transform duration-300 before:content-[''] before:block before:absolute before:w-[15px] before:h-[3px] before:bg-[#000000] before:left-0 before:rotate-220 after:content-[''] after:block after:absolute after:w-[15px] after:h-[3px] after:bg-[#000000] after:right-0 after:-rotate-220 group-open:rotate-180" />
  );
};

export default ChevronUp;
