import { LineItem, ProductVariant, Region } from '@medusajs/medusa';
import clsx from 'clsx';
import { formatAmount } from 'medusa-react';

export const getPercentageDiff = (original: number, calculated: number) => {
  const diff = original - calculated;
  const decrease = (diff / original) * 100;

  return decrease.toFixed();
};

export type CalculatedVariant = ProductVariant & {
  calculated_price: number;
  calculated_price_type: 'sale' | 'default';
  original_price: number;
};

type LineItemPriceProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
  style?: 'default' | 'tight';
};

const LineItemPrice = ({
  item,
  region,
  style = 'default',
}: LineItemPriceProps) => {
  const originalPrice =
    (item.variant as CalculatedVariant).original_price * item.quantity;
  const hasReducedPrice = (item.total || 0) < originalPrice;

  return (
    <div className="text-ui-fg-subtle flex flex-col items-end gap-x-2">
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p>
              {style === 'default' && (
                <span className="text-ui-fg-subtle">Original: </span>
              )}
              <span className="text-ui-fg-muted line-through">
                {formatAmount({
                  amount: originalPrice,
                  region: region,
                  includeTaxes: false,
                })}
              </span>
            </p>
            {style === 'default' && (
              <span className="text-ui-fg-interactive">
                -{getPercentageDiff(originalPrice, item.total || 0)}%
              </span>
            )}
          </>
        )}
        <span
          className={clsx('text-base-regular', {
            'text-ui-fg-interactive': hasReducedPrice,
          })}
        >
          {formatAmount({
            amount: item.total || 0,
            region: region,
            includeTaxes: false,
          })}
        </span>
      </div>
    </div>
  );
};

export default LineItemPrice;
