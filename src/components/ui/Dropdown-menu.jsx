// components/ui/dropdown-menu.jsx
import React, { useState } from 'react';
import { cn } from '../../../lib/utils';

export const DropdownMenu = ({ children }) => {
  return <div className="relative">{children}</div>;
};

export const DropdownMenuTrigger = ({ children, className, ...props }) => {
  return (
    <button
      className={cn('focus:outline-none', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, className, ...props }) => {
  return (
    <button
      className={cn(
        'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const DropdownMenuLabel = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-4 py-2 text-sm font-semibold text-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuSeparator = ({ className, ...props }) => {
  return <div className={cn('border-t border-gray-200 my-1', className)} {...props} />;
};
