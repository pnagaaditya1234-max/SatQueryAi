'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: number; // 0: Normal (100%), 1: Medium (110%), 2: Large (120%)
  highContrast: boolean;
  setFontSize: (size: number) => void;
  toggleHighContrast: () => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 0,
  highContrast: false,
  setFontSize: () => {},
  toggleHighContrast: () => {},
  resetAccessibility: () => {},
});

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<number>(0);
  const [highContrast, setHighContrastState] = useState<boolean>(false);

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    if (typeof document !== 'undefined') {
      const scale = size === 0 ? '100%' : size === 1 ? '110%' : '120%';
      document.documentElement.style.fontSize = scale;
    }
  };

  const toggleHighContrast = () => {
    setHighContrastState((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        if (next) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      }
      return next;
    });
  };

  const resetAccessibility = () => {
    setFontSize(0);
    setHighContrastState(false);
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = '100%';
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        setFontSize,
        toggleHighContrast,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
