// src/components/ui/Avatar.js
import React, { useState } from 'react';

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


export const Card = ({ children, className }) => {
    return (
      <div className={`border rounded-lg shadow-lg p-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children }) => {
    return <div className="p-4">{children}</div>;
  };
  
  // src/components/ui/Switch.js


export const Switch = ({ checked, onCheckedChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`w-10 h-4 bg-gray-300 rounded-full p-1 transition-all ${
          checked ? 'bg-blue-500' : ''
        }`}
      >
        <span
          className={`block w-6 h-6 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-6' : ''
          }`}
        ></span>
      </span>
    </label>
  );
};
