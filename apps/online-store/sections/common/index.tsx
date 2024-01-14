import { ReactNode } from 'react';

type TSectionHeading = {
  children: ReactNode;
  title: string;
};
export const SectionHeading = ({ children, title }: TSectionHeading) => {
  return (
    <div className="flex flex-col items-center gap-6 text-center text-mineral-green-600">
      <h2 className="font-merriweather text-[32px] md:text-5xl">{title}</h2>
      <p className="text-lg">{children}</p>
    </div>
  );
};
