// components/ui/button.jsx
import React from 'react';
import { cn } from '../../../lib/utils';

export const Button = React.forwardRef(({ variant = 'primary', className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'px-4 py-2 rounded font-medium focus:outline-none focus:ring',
        variant === 'primary'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-300 text-black hover:bg-gray-400',
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';
