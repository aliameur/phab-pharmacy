import { MoveRight } from 'lucide-react';

import { cn } from '@phab/utils';

type TSliderButton = {
  direction: 'left' | 'right';
  onClick: () => void;
};
export const SliderButton = ({ direction, onClick }: TSliderButton) => {
  return (
    <button
      onClick={onClick}
      className="flex w-16 items-center justify-center rounded-2xl border-2 border-mineral-green-600 p-3"
    >
      <MoveRight
        className={cn('h-6 w-6 text-mineral-green-600', {
          'rotate-180': direction === 'left',
        })}
      />
    </button>
  );
};
