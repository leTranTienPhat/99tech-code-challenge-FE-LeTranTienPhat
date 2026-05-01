// Note: Added guard to prevent cases where n is not a positive integer and decimal number

// Complexity: O(n)
export const sum_to_n_loop = (n: number) => {
  const num = Math.floor(n);
  if (num < 1) return 0;

  let sum = 0;
  for (let i = 1; i <= num; i++) sum += i;
  return sum;
};

// Complexity: O(n)
export const sum_to_n_recursive = (n: number): number => {
  const num = Math.floor(n);
  if (num < 1) return 0;
  if (num === 1) return 1;
  return num + sum_to_n_recursive(num - 1);
};

// Complexity: O(1)
export const sum_to_n_gauss_formula = (n: number) => {
  const num = Math.floor(n);
  if (num < 1) return 0;
  return (num * (num + 1)) / 2;
};
