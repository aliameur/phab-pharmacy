export const filterHiddenCategories = <
  T extends {
    handle: string;
  },
>(
  categories: T[],
) => categories.filter((cat) => !cat.handle.startsWith('hidden'));
