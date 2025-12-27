import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none">
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded border border-[var(--border)]',
              'bg-[var(--background)] pl-10 pr-3 py-2',
              'text-sm font-mono',
              'placeholder:text-[var(--muted-foreground)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border border-[var(--border)]',
          'bg-[var(--background)] px-3 py-2',
          'text-sm font-mono',
          'placeholder:text-[var(--muted-foreground)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
