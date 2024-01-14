import { ProductCard } from '@phab/ui/product';

export type TProductHit = {
  description: string;
  handle: string;
  title: string;
  thumbnail: string;
};
export const ProductHit = ({
  description,
  handle,
  title,
  thumbnail,
}: TProductHit) => {
  return (
    <ProductCard
      variant="small"
      title={title}
      alt={title}
      src={thumbnail}
      href={`/products/${handle}`}
    />
  );
};
