import { ProductOption } from '@medusajs/medusa';

export const getOptionTitle = (options: ProductOption[], optionId: string) => {
  return options.find((opt) => opt.id === optionId)?.title;
};
