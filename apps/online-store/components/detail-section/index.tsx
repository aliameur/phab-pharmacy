import { ReactNode } from 'react';

type TDetailSection = {
  title: string;
  children: ReactNode;
};

export const DetailSection = ({ children, title }: TDetailSection) => {
  return (
    <div className="text-mineral-green-600">
      <h3 className="mb-2 font-merriweather text-xl font-bold underline">
        {title}
      </h3>
      <p className="text-sm">{children}</p>
    </div>
  );
};
