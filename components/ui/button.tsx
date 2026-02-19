import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-heading tracking-wider uppercase transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-emergency-red text-white hover:bg-emergency-red/90 hover:shadow-[0_0_20px_rgba(255,45,45,0.4)]',
        ghost:
          'border border-white/20 text-white/90 hover:border-emergency-red/50 hover:bg-white/5',
        outline:
          'border border-emergency-red/50 text-emergency-red hover:bg-emergency-red/10',
      },
      size: {
        default: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-lg',
        sm: 'px-4 py-2 text-xs',
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
