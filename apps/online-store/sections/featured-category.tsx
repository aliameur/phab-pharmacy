import { cn } from '../lib/utils';

type TFeaturedCategory = {
  side: 'left' | 'right'
}
export const FeaturedCategory = ({ side }: TFeaturedCategory) => {
  return (
    <div className={cn('flex', { 'flex-row-reverse': side === 'right' })}>

    </div>
  );
};
