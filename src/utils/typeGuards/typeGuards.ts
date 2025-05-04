export const isNumberArray = (arr: number[] | string[]): arr is number[] => {
  return arr.every((item) => typeof item === 'number');
};
