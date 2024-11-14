// components/ui/avatar.jsx
import React from 'react';
import { cn } from '../../../lib/utils';

export const Avatar = ({ src, fallback, alt }) => {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
      {src ? <AvatarImage src={src} alt={alt} /> : <AvatarFallback>{fallback}</AvatarFallback>}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => (
  <img className="object-cover w-full h-full" src={src} alt={alt} />
);

export const AvatarFallback = ({ children }) => (
  <div className="flex items-center justify-center w-full h-full text-gray-500">
    {children}
  </div>
);
