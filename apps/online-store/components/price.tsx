const Price = ({
  amount,
  className,
  currencyCode = 'GBP'
}: {
  amount: number;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(amount)}`}
  </p>
);

export default Price;
