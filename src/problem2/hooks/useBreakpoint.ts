// hooks/useBreakpoint.ts
import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

interface BreakpointState {
  breakpoint: Breakpoint;
  width: number;
  isMobile: boolean; // < md
  isTablet: boolean; // md – lg
  isDesktop: boolean; // >= lg
  isAbove: (bp: Breakpoint) => boolean;
  isBelow: (bp: Breakpoint) => boolean;
}

const getBreakpoint = (width: number): Breakpoint => {
  const entries = Object.entries(BREAKPOINTS) as [Breakpoint, number][];
  // iterate largest → smallest, return first match
  return (
    [...entries].reverse().find(([, minWidth]) => width >= minWidth)?.[0] ??
    'xs'
  );
};

export const useBreakpoint = (): BreakpointState => {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mediaQueries = Object.entries(BREAKPOINTS).map(([_, minWidth]) => {
      const mql = window.matchMedia(`(min-width: ${minWidth}px)`);
      const handler = () => setWidth(window.innerWidth);
      mql.addEventListener('change', handler);
      return { mql, handler };
    });

    return () => {
      mediaQueries.forEach(({ mql, handler }) =>
        mql.removeEventListener('change', handler)
      );
    };
  }, []);

  const breakpoint = getBreakpoint(width);

  return {
    breakpoint,
    width,
    isMobile: width < BREAKPOINTS.md,
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
    isAbove: (bp: Breakpoint) => width >= BREAKPOINTS[bp],
    isBelow: (bp: Breakpoint) => width < BREAKPOINTS[bp],
  };
};
