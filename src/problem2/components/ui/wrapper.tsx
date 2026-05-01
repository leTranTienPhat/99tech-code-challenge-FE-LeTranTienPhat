import { cn } from '@/problem2/libs/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper = ({ children, className }: Props) => {
  return (
    <div className={cn('w-fit rounded-md border p-4 shadow-md', className)}>
      {children}
    </div>
  );
};
