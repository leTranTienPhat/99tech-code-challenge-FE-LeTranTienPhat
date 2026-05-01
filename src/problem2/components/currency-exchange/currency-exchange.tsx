import { useBreakpoint } from '@/problem2/hooks/useBreakpoint.ts';
import { LucideArrowRight } from 'lucide-react';
import { domAnimation, LazyMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useContext } from 'react';
import { CurrencyExchangeContext } from '../../context/config.ts';
import { CurrencyInput } from './currency-input.tsx';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/problem2/components/ui/tooltip';

const OFFSET = 180;
const ROTATE_RADIUS = 80;

const MOBILE_OFFSET = 64;
const MOBILE_ROTATE_RADIUS = 120;

export const CurrencyExchange = () => {
  const { isMobile } = useBreakpoint();
  const { exchangeValues, handleFlipData } = useContext(
    CurrencyExchangeContext
  );
  const isFlip = exchangeValues?.isFlip;

  // hasMoved is used to prevent conflict with React's StrictMode
  const hasMoved = isFlip !== null && isFlip !== undefined;

  const animationValues = {
    sp: {
      from: hasMoved
        ? {
            x: isFlip ? OFFSET : -OFFSET,
            y: isFlip ? [0, -ROTATE_RADIUS, 0] : [0, ROTATE_RADIUS, 0],
          }
        : {
            x: -OFFSET,
            y: 0,
          },

      to: hasMoved
        ? {
            x: isFlip ? -OFFSET : OFFSET,
            y: isFlip ? [0, ROTATE_RADIUS, 0] : [0, -ROTATE_RADIUS, 0],
          }
        : {
            x: OFFSET,
            y: 0,
          },
    },

    mobile: {
      from: hasMoved
        ? {
            y: isFlip ? MOBILE_OFFSET : -MOBILE_OFFSET,
            x: isFlip
              ? [0, MOBILE_ROTATE_RADIUS, 0]
              : [0, -MOBILE_ROTATE_RADIUS, 0],
          }
        : {
            x: 0,
            y: -MOBILE_OFFSET,
          },

      to: hasMoved
        ? {
            y: isFlip ? -MOBILE_OFFSET : MOBILE_OFFSET,
            x: isFlip
              ? [0, -MOBILE_ROTATE_RADIUS, 0]
              : [0, MOBILE_ROTATE_RADIUS, 0],
          }
        : {
            x: 0,
            y: MOBILE_OFFSET,
          },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex h-60 w-80 flex-col items-center justify-center gap-12 md:h-32 md:w-160">
        {/* Left Input */}
        <m.div
          className="absolute"
          initial={false}
          animate={
            isMobile ? animationValues.mobile.from : animationValues.sp.from
          }
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <CurrencyInput direction={isFlip ? 'to' : 'from'} />
        </m.div>

        <Tooltip>
          <TooltipTrigger type="button">
            <div
              className="cursor:pointer rotate-90 rounded-full bg-blue-600 p-2 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 md:rotate-0"
              onClick={handleFlipData}
            >
              <LucideArrowRight className="h-4 w-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>Swap</TooltipContent>
        </Tooltip>

        {/* Right Input */}
        <m.div
          className="absolute"
          initial={false}
          animate={isMobile ? animationValues.mobile.to : animationValues.sp.to}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <CurrencyInput direction={isFlip ? 'from' : 'to'} />
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default CurrencyExchange;
