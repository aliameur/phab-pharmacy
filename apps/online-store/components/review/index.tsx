import { Heart } from 'lucide-react';
import { ReactNode } from 'react';

import { Rating } from '../rating';

type TReview = {
  children: ReactNode;
  rating: number;
  name: string;
  date: Date;
  likes: number;
};

export const Review = ({ children, rating, name, date, likes }: TReview) => {
  const renderDate = () => {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  };
  return (
    <div className="flex h-48 gap-24 border-b border-mineral-green-600/20 py-6 text-mineral-green-600">
      <span className="hidden font-bold sm:block">{renderDate()}</span>
      <div className="flex h-full flex-col gap-4">
        <Rating value={rating} />
        <span className="text-sm font-bold">{name}</span>
        <p className="h-[60px] overflow-clip text-ellipsis text-sm">
          {children}
        </p>
      </div>
      <div className="flex h-full flex-col justify-between text-sm">
        <span className="font-bold">Verified Purchase</span>
        <div className="flex items-center gap-2">
          <Heart />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};
