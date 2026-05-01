import { toast } from 'sonner';

export const successToast = (message: string) => {
  toast.success(message, {
    className: 'bg-green-300! text-white',
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    className: 'bg-red-300! text-white',
  });
};
