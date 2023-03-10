export const getUpperBoundMedian = (numbers: number[]) => {
  if (!numbers.length) {
    return 0;
  }
  const index = Math.floor(numbers.length / 2);
  const sorted = numbers.sort();
  return sorted[index];
};
