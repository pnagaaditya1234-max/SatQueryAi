'use client';

import React, { useState } from 'react';

export default function TopBar() {
  const [lang, setLang] = useState('EN');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  return (
    <div className="w-full">
      {/* Tricolor Accent Line */}
      <div className="h-1.5 w-full flex">
        <div className="bg-[#FF9933] flex-1"></div>
        <div className="bg-white flex-1"></div>
        <div className="bg-[#138808] flex-1"></div>
      </div>

      {/* Top Utility Bar */}
      <div className="bg-surface-container-low border-b border-outline-variant/35 px-4 lg:px-12 py-1.5 text-xs flex justify-between items-center text-on-surface-variant">
        <div className="flex items-center gap-4">
          <span className="font-semibold tracking-wide uppercase text-[11px] bg-primary-container text-white px-2 py-0.5 rounded">
            Govt. of India
          </span>
          <span className="hidden sm:inline">
            An Official Platform under Digital India & PM GatiShakti Framework
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">language</span>
            <select
              aria-label="Select Language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-on-surface focus:ring-0 cursor-pointer py-0 pr-6"
            >
              <option value="EN">English (EN)</option>
              <option value="HI">हिन्दी (HI)</option>
              <option value="TE">తెలుగు (TE)</option>
              <option value="TA">தமிழ் (TA)</option>
            </select>
          </div>

          <div className="h-3 w-[1px] bg-outline-variant"></div>

          <button
            aria-label="Toggle Theme"
            onClick={toggleTheme}
            className="flex items-center gap-1 hover:text-secondary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Theme'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
