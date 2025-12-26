import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap font-medium',
    'transition-all duration-100',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
    'animate-press',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--primary)] text-[var(--primary-foreground)]',
          'hover:opacity-90',
          'active:opacity-80',
        ].join(' '),
        accent: [
          'bg-[var(--accent)] text-white',
          'hover:opacity-90',
          'active:opacity-80',
        ].join(' '),
        outline: [
          'border border-[var(--border)] bg-transparent',
          'hover:bg-[var(--control)]',
          'active:bg-[var(--control-active)]',
        ].join(' '),
        control: [
          'control',
        ].join(' '),
        ghost: [
          'hover:bg-[var(--control)]',
          'active:bg-[var(--control-active)]',
        ].join(' '),
        link: [
          'text-[var(--accent)] underline-offset-4',
          'hover:underline',
        ].join(' '),
      },
      size: {
        default: 'h-9 px-4 text-sm rounded',
        sm: 'h-8 px-3 text-xs rounded',
        lg: 'h-11 px-6 text-base rounded-md',
        xl: 'h-12 px-8 text-base rounded-md',
        icon: 'h-9 w-9 rounded',
        'icon-sm': 'h-8 w-8 rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
