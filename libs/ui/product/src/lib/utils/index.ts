import { ProductOption } from '@medusajs/medusa';

export const hasNoOptionsOrJustOneOption = (
  options: ProductOption[] | undefined,
) =>
  !options?.length ||
  (options?.length === 1 && options[0]?.values.length === 1);
