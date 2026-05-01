# Problem 1: Three ways to sum to n

## Edge Case Handling

All three functions consistently handle these edge cases:

- **Negative numbers**: Return 0
- **Zero**: Return 0
- **Decimal numbers**: Use `Math.floor(n)` to convert to integer

## Solution 1: `sum_to_n_loop` (O(n) complexity)

**Performance**: Linear time complexity, suitable for small to medium n values

```typescript
export const sum_to_n_loop = (n: number) => {
  const num = Math.floor(n);
  if (num < 1) return 0;

  let sum = 0;
  for (let i = 1; i <= num; i++) sum += i;
  return sum;
};
```

## Solution 2: `sum_to_n_recursive` (O(n) complexity)

**Performance**: Linear complexity but with call stack overhead

```typescript
export const sum_to_n_recursive = (n: number): number => {
  const num = Math.floor(n);
  if (num < 1) return 0;
  if (num === 1) return 1;
  return num + sum_to_n_recursive(num - 1);
};
```

## Solution 3: `sum_to_n_gauss_formula` (O(1) complexity)

**Performance**: Constant time complexity, most efficient for large n values

```typescript
export const sum_to_n_gauss_formula = (n: number) => {
  const num = Math.floor(n);
  if (num < 1) return 0;
  return (num * (num + 1)) / 2;
};
```
