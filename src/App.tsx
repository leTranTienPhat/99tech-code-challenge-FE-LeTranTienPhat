import { Toaster } from '@/problem2/components/ui/sonner';
import { TooltipProvider } from '@/problem2/components/ui/tooltip';
import CurrencyExchangeProvider from '@/problem2/context/context';
import Problem2 from './problem2/problem2-page';

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <TooltipProvider>
        <CurrencyExchangeProvider>
          <Problem2 />
          <Toaster position="top-right" />
        </CurrencyExchangeProvider>
      </TooltipProvider>
    </div>
  );
}

export default App;
