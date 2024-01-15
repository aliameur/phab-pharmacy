import { cn } from '@phab/utils';

export const Divider = ({ className }: { className?: string }) => (
  <div
    className={cn('h-px w-full border-b border-mineral-green-600', className)}
  />
);
