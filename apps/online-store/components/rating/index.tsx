import { FaStar, FaStarHalf } from 'react-icons/fa';

type TRating = {
  value: number;
};

export const Rating = ({ value }: TRating) => {
  // round to nearest half, then check if it's a whole number
  const addHalfStar = (Math.round(value * 2) / 2) % 1 !== 0;
  return (
    <div className="flex gap-1">
      {Array.from({ length: Math.floor(value) }).map((_, i) => (
        <FaStar className="text-mineral-green-600" key={i} />
      ))}
      {addHalfStar && (
        <div className="relative">
          <FaStarHalf className="text-mineral-green-600" />
          <FaStarHalf className="absolute inset-0 -scale-x-100 text-neutral-300" />
        </div>
      )}
      {Array.from({ length: 5 - Math.ceil(value) }).map((_, i) => (
        <FaStar className="text-neutral-300" key={i} />
      ))}
    </div>
  );
};
