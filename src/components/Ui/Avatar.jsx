// src/components/ui/Avatar.js
import React from 'react';

export const Avatar = ({ children, className }) => {
  return (
    <div className={`flex justify-center items-center rounded-full ${className}`}>
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => {
  return <img className="rounded-full w-24 h-24" src={src} alt={alt} />;
};

export const AvatarFallback = ({ children }) => {
  return <span className="text-white text-xl">{children}</span>;
};
