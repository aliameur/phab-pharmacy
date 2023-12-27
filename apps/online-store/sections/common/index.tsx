import { ReactNode } from 'react';

type TSectionHeading = {
  children: ReactNode;
  title: string;
};
export const SectionHeading = ({ children, title }: TSectionHeading) => {
  return (
    <div className="flex flex-col text-center items-center gap-6 text-mineral-green-600">
      <h2 className="font-merriweather text-[32px] md:text-5xl">{title}</h2>
      <p className="text-lg">{children}</p>
    </div>
  );
};
