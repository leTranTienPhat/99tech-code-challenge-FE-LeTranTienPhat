# Problem 3: Messy React

You can find my solution at: `/src/problem3/refactor-version`

Below are the problems that I noticed in this codebase

## 1. Anti Pattern Issues

> ### **Not well-organized**: It is a single file with everything inside it (types, logic, and multiple components).

-> **Solution**: Split into different modules/folders based on functionality:

- `components/`: For `<WalletRows />`, as it is considered a reusable component within `<WalletPage />`.

- `types/`: For type declarations.

- `libs/`: For global utility/helper functions that might be reused somewhere else (e.g., `getPriority`).

- `hooks/`: For custom hooks that handle calculations that might be reused somewhere else (in my opinion, `useWalletBalances` and `usePrices` sound like they can be reused in other components as well).

---

> ### **Poor type management**: the use of `any` type, lots of unnecessary type declarations due to unstructured type definition

-> **Solution**: Redefine the types, by defining the types more strictly at the beginning, typescript can understand and map type to the corresponding value more accurately.

For example, there is no need to declare the type of the `item` when we use `array.map(item)`, as its type will be based on the array's type.

> Bad type declaration for `<WalletPage />` interface

This one is very noticeable, as we can see in the messy verion, `...rest` props is intend to be pass down to the div element: `<div {...rest} >`. But its type definition is very unclear what it want to archive.

-> ### **Solution**: Define a better type to make it clearer that it is a wrapper around the div element

```
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
```

---

> ### **Render array of components using wrong React pattern**

```
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
```

-> ### **Solution**: Refactor the code to follow React's standard (more readable, no need to create `rows` variable)

(Also in this example, the original messy code uses `sortedBalances` instead of `formattedBalances`, as I read the code, I assume this should render `formattedBalances`)

```
     <div {...rest}>
      {formattedBalances.map(({ currency, amount, formatted }) => {
        const usdValue = prices[currency] * amount;
        return <WalletRow key={currency} amount={amount} usdValue={usdValue} formattedAmount={formatted} />;
      })}
    </div>
```

---

## 2. Computational Inefficiencies Issues:

> ### `getPriority` is a constant that does not need to be defined inside React Component

Declare it within a component will cause the constant to be re-declare everytime the component rerender.

Also, we can optimize it by using Object to store the priorities instead of using switch case for faster O(1) look up

```
const DEFAULT_PRIORITY = -99;

const PRIORITIES: Partial<Record<BlockChain, number>> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

export const getPriority = (blockchain: BlockChain): number => PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;

```

-> **Solution**: Move it outside, and as it can be reuse somewhere else -> move it to `libs/helper.ts` file

> ### The `prices` does not related to this `useMemo`, putting it there will cause unnecessary rerenders

```
const sortedBalances = useMemo(() => {
    ...
  }, [balances, prices]);

```

-> **Solution**: Remove `prices` from the dependency array.

> ### **Bad conditional check**

```
if (lhsPriority > -99) {
	if (balance.amount <= 0) {
	  return true;
	}
}
```

-> **Solution**: Refactor to a single line: `return balancePriority > -99 && balance.amount <= 0;`

```
if (leftPriority > rightPriority) {
	return -1;
} else if (rightPriority > leftPriority) {
	return 1;
}

// What if leftPriority === rightPriority ----> return undefined ----> NG
```

> ### Too many loop to calculate `formattedBalances`
>
> As I noticed, `sortedBalances` is only used for calculating `formattedBalances` and nothing else. We can optimize this by combining `.map()` and `.filter()` into a single `.reduce()` loop, and wrap `useMemo` around `formattedBalances` instead.

-> **Solution**

```
  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .reduce((acc: FormattedWalletBalance[], balance) => {
        const priority = getPriority(balance.blockchain);

        // 1. Filter: Priority check and non-positive balance
        if (priority > -99 && balance.amount <= 0) {

          // 2. Map: Transform into FormattedWalletBalance
          acc.push({
            ...balance,
            formatted: balance.amount.toFixed(),
          });
        }

        return acc;
      }, [])
      .sort((lhs, rhs) => {

        // 3. Sort: Descending by blockchain priority
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        return rightPriority - leftPriority;
      });
  }, [balances]);
```

-> **Solution**: Refactor to a single line: `return rightPriority - leftPriority;`

> ### use `index` as `key` when mapping through array

It is not a good practice to use index as a key when mapping through an array, as it can cause unnecessary rerenders when the array is reordered.

-> **Solution**: Use `currency` as `key` instead, as I **assume** it is a unique identifier for each balance.

---
