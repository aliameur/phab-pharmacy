import getSymbolFromCurrency from 'currency-symbol-map';
import Image from 'next/image';

type TFeaturedProductCard = {
  tags: string[];
  title: string;
  price: { amount?: number; currencyCode?: string };
};

export const FeaturedProductCard = ({
  tags,
  title,
  price,
}: TFeaturedProductCard) => {
  return (
    <div className="group relative flex flex-col items-center gap-2 pb-2">
      <div className="relative aspect-[1.26] h-[300px] overflow-hidden bg-norway-200 sm:h-[400px]">
        <Image
          alt="product"
          src="/placeholder-product.png"
          fill
          className="object-contain object-center"
        />
      </div>
      <span className="text-sm text-pampas-100">{tags.join(' - ')}</span>
      <span className="relative px-4 py-2 text-pampas-100">
        {title}
        <div className="absolute bottom-2 left-4 right-4 h-0.5 origin-center translate-y-full scale-x-0 bg-pampas-100 transition-all duration-300 group-hover:scale-x-100" />
      </span>
      <div className="overflow-hidden px-4 py-1 text-pampas-100">
        {price.amount && price.currencyCode ? (
          <span className="flex -translate-y-full py-1 transition-all duration-300 group-hover:translate-y-0">
            {getSymbolFromCurrency(price.currencyCode)} {price.amount / 100}
          </span>
        ) : null}
      </div>
    </div>
  );
};
