export const splitArrayInHalf = <T>(array: T[]) => {
  const half = Math.ceil(array.length / 2);

  const firstHalf = array.slice(0, half);
  const secondHalf = array.slice(half);

  return [firstHalf, secondHalf];
};
