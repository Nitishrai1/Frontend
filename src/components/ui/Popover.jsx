// components/ui/popover.jsx
import React, { useState } from 'react';
import { cn } from '../../../lib/utils';

export const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  return (
    <div className="relative" onBlur={closePopover}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, togglePopover, closePopover })
      )}
    </div>
  );
};

export const PopoverTrigger = ({ children, togglePopover, className, ...props }) => {
  return (
    <button
      className={cn('focus:outline-none', className)}
      onClick={togglePopover}
      {...props}
    >
      {children}
    </button>
  );
};

export const PopoverContent = ({ children, isOpen, className, ...props }) => {
  return isOpen ? (
    <div
      className={cn(
        'absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null;
};
