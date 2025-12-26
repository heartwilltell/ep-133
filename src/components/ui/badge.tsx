import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center',
    'font-mono text-badge',
    'transition-colors',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-[var(--control)] text-[var(--foreground)] border border-[var(--border)]',
        accent: 'bg-[var(--accent)] text-white',
        outline: 'border border-[var(--border)] text-[var(--muted-foreground)]',
        success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20',
        warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20',
        featured: 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20',
      },
      size: {
        default: 'h-5 px-2 rounded',
        sm: 'h-4 px-1.5 text-[9px] rounded-sm',
        lg: 'h-6 px-2.5 text-xs rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
