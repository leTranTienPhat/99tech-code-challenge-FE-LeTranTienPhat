# Problem 2: Fancy Form - Currency Exchange

Component Preview URL: https://99tech-code-challenge-fe-tienphat.vercel.app/

Desktop: <img width="816" height="555" alt="image" src="https://github.com/user-attachments/assets/be1d640a-dfd2-464b-954c-93d731c37b71" />

Mobile: <img width="288" height="509" alt="image" src="https://github.com/user-attachments/assets/5d889572-fe8e-4120-bbb3-0625754b69e8" />

## Getting Started

```bash
npm install
npm run dev
```

## Key Technologies & Libraries

### State Management

- **React Context (`useContext`)**: Centralized state management for exchange values, user wallet, and loading states
- **Custom Hook Architecture**: Modular hooks for prices, breakpoints, and data fetching

### Data Fetching

- **SWR (`useSWR`)**: Efficient data fetching with caching, revalidation, and error handling
- **Custom Fetcher**: Robust error handling for API requests to `https://interview.switcheo.com/prices.json`

### Animation & Motion

- **Framer Motion**: Advanced animations with `LazyMotion` for performance optimization
- **Custom Animation System**: Sophisticated flip animations with different trajectories for desktop/mobile

### UI Framework

- **TailwindCSS**: Utility-first styling for responsive design
- **Shadcn/ui**: Modern component library with accessible UI patterns
- **Lucide React**: Icon library for consistent visual elements

### Toast Notifications

- **Sonner**: Elegant toast notifications for success/error feedback
- **Custom Toast Helpers**: `successToast` and `errorToast` utilities

## Architecture Overview

### Component Structure

```
src/problem2/
├── components/
│   ├── currency-exchange/ # Main exchange components
│   ├── custom/            # Custom UI components
│   └── ui/                # Reusable UI primitives
├── hooks/
│   └── swr/               # SWR data fetching hooks
├── context/               # useContext implementation
├── libs/                  # Utility libraries
└── types/                 # TypeScript definitions
```

## Some Key Features

### 1. Animated Currency Flip

Animation for flipping currency exchange direction is available in both pc and mobile devices.

### 2. Responsive Design

- **Breakpoint Hook**: Custom `useBreakpoint` hook for device detection
- **Adaptive Layout**: Different layouts for mobile vs desktop
- **Responsive Animations**: Animation parameters adjust to screen size

### 3. User Wallet Integration

- **Mock Wallet**: Pre-populated with USD, LUNA, ETH balances

### 4. Form Validation & Error Handling

- **Input Validation**: Checks for valid amounts and sufficient balance
- **Toast Notifications**: Success/error feedback for user actions
- **Balance Validation**: Prevents exchanges exceeding available funds

## Performance Optimizations

- **LazyMotion**: Loads only necessary animation features
- **useMemo**: Caches expensive calculations (price processing, exchange rates)
- **SWR Caching**: Intelligent data caching and revalidation
