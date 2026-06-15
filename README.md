# Product Comparison Widget

A React + TypeScript widget that allows users to compare up to 3 products side by side.

## Features

- Browse a catalog of 8 products
- Select up to 3 products for comparison
- Side-by-side comparison table (features as rows, products as columns)
- Rows with differing values are visually highlighted in amber
- Remove any product from the comparison
- Selection persists across page reloads via `localStorage`
- Keyboard accessible (Enter key, aria roles)

## Tech Stack

- React 18
- TypeScript
- CSS Modules

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── ProductCard.tsx          # Selectable product tile
│   ├── ProductCard.module.css
│   ├── ComparisonTable.tsx      # Side-by-side comparison table
│   └── ComparisonTable.module.css
├── data/
│   └── products.ts              # Hardcoded product data + row config
├── hooks/
│   └── useComparison.ts         # Selection state + localStorage sync
├── types/
│   └── index.ts                 # Shared TypeScript interfaces
└── App.tsx
```

## Design Decisions

**State management — custom hook + localStorage**
I chose a simple `useComparison` custom hook with `localStorage` persistence rather than Redux or Zustand. The state is minimal (just an array of IDs), so a local hook keeps things straightforward and avoids unnecessary complexity. The hook encapsulates all business rules (max 3, toggle logic, persistence).

**CSS Modules over Tailwind / styled-components**
CSS Modules keep styles scoped to each component, which makes the code easier to read and maintain without a build-time dependency on Tailwind.

**Flat component structure**
The app is small enough that three components (`App`, `ProductCard`, `ComparisonTable`) plus a custom hook cover all concerns cleanly without over-engineering.

**Difference highlighting**
Rows where all selected products have the same value are left plain; rows with any difference get an amber background. The logic uses `new Set(values).size > 1`, which is O(n) and easy to understand.

**Accessibility**
Product cards use `role="checkbox"` with `aria-checked`/`aria-disabled`, and the remove buttons have descriptive `aria-label`s.
# product-comparison-widgett
