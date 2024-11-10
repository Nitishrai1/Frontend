// src/components/ui/Switch.js
import React, { useState } from 'react';

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
