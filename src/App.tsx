import CurrencyExchangeProvider from '@/problem2/components/context/context';
import { Toaster } from '@/problem2/components/ui/sonner';
import { TooltipProvider } from '@/problem2/components/ui/tooltip';
import Problem2 from './problem2/problem2-page';

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <TooltipProvider>
        <CurrencyExchangeProvider>
          <Problem2 />
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                success: 'bg-green-500 text-red-500',
              },
            }}
          />
        </CurrencyExchangeProvider>
      </TooltipProvider>
    </div>
  );
}

export default App;
