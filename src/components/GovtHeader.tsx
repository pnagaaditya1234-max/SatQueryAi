'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAccessibility } from './AccessibilityContext';
import GlobalSearchModal from './GlobalSearchModal';

interface GovtHeaderProps {
  onOpenUpload?: () => void;
}

export default function GovtHeader({ onOpenUpload }: GovtHeaderProps) {
  const pathname = usePathname();
  const { fontSize, setFontSize, highContrast, toggleHighContrast, resetAccessibility } = useAccessibility();

  const [lang, setLang] = useState('EN');
  const [isDark, setIsDark] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/citizen-dashboard', label: 'Dashboard' },
    { href: '/analysis-workspace', label: 'Satellite Analysis' },
    { href: '/evidence-explorer', label: 'Evidence Explorer' },
    { href: '/results-dashboard', label: 'Reports' },
    { href: '/reasoning-engine', label: 'Help Center' },
    { href: '/flagship-portal', label: 'About SAT AI' },
    { href: '/command-center', label: 'Contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-surface shadow-md">
        {/* Top Government Bar */}
        <div className="bg-surface-container-low border-b border-outline-variant/40 px-4 lg:px-12 py-2 flex flex-wrap justify-between items-center text-xs text-on-surface-variant gap-2">
          {/* Left: State Emblem of India + Official Ministry Text */}
          <div className="flex items-center gap-3">
            <img
              className="w-8 h-10 object-contain drop-shadow-xs"
              alt="State Emblem of India (Lion Capital of Ashoka)"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL40emYAMlB8cDiJHozYFY32UXOUdZu-jkXj6imQwccyRJG9k9X0NhZwSCWLHNux4meGPSxBOZ78Ib2sppNp0s77GEaDo8farorgjAFgiS6PeOy1cIbEQeiC8vQt_apFOjGtTeuI8Z3gHwAdig_RG4nWlxfJnm7fSNnc5dmy6LbTn2Sl-yCswVwkK48rDd0vJzQSUwQQgIciy89B3z9y0VvAuZyoyYBs-uUoWrSWx57n1tzF_Rm3e3sg"
            />
            <div className="flex flex-col border-l border-outline-variant/60 pl-3">
              <span className="font-extrabold text-[12px] text-primary tracking-tight uppercase">
                Government of India
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium leading-tight hidden sm:block">
                Ministry of Electronics and Information Technology • ISRO
              </span>
            </div>
          </div>

          {/* Right: Language Selector, Accessibility Menu, Dark Mode, SAT AI Logo */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded border border-outline-variant/50">
              <span className="material-symbols-outlined text-sm">language</span>
              <select
                aria-label="Select Language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent border-none text-[11px] font-bold text-on-surface focus:ring-0 cursor-pointer py-0 pr-4"
              >
                <option value="EN">English (EN)</option>
                <option value="HI">हिन्दी (HI)</option>
                <option value="TE">తెలుగు (TE)</option>
              </select>
            </div>

            {/* Accessibility Button */}
            <div className="relative">
              <button
                onClick={() => setShowAccessMenu(!showAccessMenu)}
                className="flex items-center gap-1 bg-surface-container-high hover:bg-surface-variant px-2.5 py-1 rounded border border-outline-variant/50 font-bold text-[11px] text-on-surface cursor-pointer"
                title="Accessibility Options"
              >
                <span className="material-symbols-outlined text-sm">accessibility_new</span>
                <span className="hidden sm:inline">Accessibility</span>
              </button>

              {/* Accessibility Popover */}
              {showAccessMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-xl z-50 text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-on-surface border-b border-outline-variant/40 pb-1.5 flex justify-between items-center">
                    <span>Text Size & Contrast</span>
                    <button onClick={() => setShowAccessMenu(false)} className="text-on-surface-variant hover:text-on-surface">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  <div>
                    <span className="text-[11px] text-on-surface-variant font-semibold block mb-1">Font Size:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setFontSize(0)}
                        className={`flex-1 py-1 rounded border text-center font-bold ${fontSize === 0 ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-low border-outline-variant text-on-surface'}`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => setFontSize(1)}
                        className={`flex-1 py-1 rounded border text-center font-bold ${fontSize === 1 ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-low border-outline-variant text-on-surface'}`}
                      >
                        A+
                      </button>
                      <button
                        onClick={() => setFontSize(2)}
                        className={`flex-1 py-1 rounded border text-center font-bold ${fontSize === 2 ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-low border-outline-variant text-on-surface'}`}
                      >
                        A++
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={toggleHighContrast}
                      className={`w-full py-1.5 px-2 rounded border font-semibold flex items-center justify-center gap-1.5 ${highContrast ? 'bg-amber-500 text-black border-amber-600 font-bold' : 'bg-surface-container-low text-on-surface border-outline-variant'}`}
                    >
                      <span className="material-symbols-outlined text-sm">contrast</span>
                      <span>High Contrast Mode</span>
                    </button>
                  </div>
                  <button
                    onClick={resetAccessibility}
                    className="w-full text-center text-[10px] text-secondary font-bold hover:underline"
                  >
                    Reset Defaults
                  </button>
                </div>
              )}
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 text-on-surface-variant hover:text-secondary cursor-pointer"
              title="Toggle Theme"
            >
              <span className="material-symbols-outlined text-base">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </div>
        </div>

        {/* Saffron Accent Line */}
        <div className="h-1 w-full bg-[#FF9933]"></div>

        {/* Main Header & Official Navigation Bar */}
        <div className="bg-surface/98 backdrop-blur-md border-b border-outline-variant/50 px-4 lg:px-12 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* SAT AI Brand Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow">
                ISRO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-headline-md text-lg tracking-tight text-primary font-black">
                    SAT AI
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-300 uppercase">
                    GOI Official
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant font-semibold">
                  Satellite Intelligence Platform
                </p>
              </div>
            </Link>

            {/* Desktop Official Navigation Bar */}
            <nav className="hidden lg:flex items-center space-x-1 border-b border-transparent">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-xs font-extrabold transition-all relative ${
                      isActive
                        ? 'text-primary font-black border-b-2 border-primary bg-primary/5'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Citizen-Friendly Action Bar */}
            <div className="flex items-center gap-2">
              {/* Voice Search Button */}
              <button
                onClick={() => {
                  setIsVoiceSearch(true);
                  setShowSearchModal(true);
                }}
                className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-secondary cursor-pointer"
                title="Voice Search"
              >
                <span className="material-symbols-outlined text-base">mic</span>
              </button>

              {/* Website Search Bar button */}
              <button
                onClick={() => {
                  setIsVoiceSearch(false);
                  setShowSearchModal(true);
                }}
                className="hidden sm:flex items-center gap-1.5 bg-surface-container-low border border-outline-variant/60 hover:border-secondary px-3 py-1.5 rounded-lg text-xs text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-outline">search</span>
                <span>Search Portal...</span>
              </button>

              {/* Upload Dataset Button */}
              {onOpenUpload && (
                <button
                  onClick={onOpenUpload}
                  className="bg-secondary hover:bg-secondary/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  <span className="hidden sm:inline">Upload</span>
                </button>
              )}

              {/* Notifications Icon with counter */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer relative"
                  title="Notifications"
                >
                  <span className="material-symbols-outlined text-lg">notifications</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-600 rounded-full animate-pulse"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-xl z-50 text-xs space-y-2 animate-in fade-in duration-150">
                    <div className="font-bold border-b border-outline-variant/40 pb-1 flex justify-between">
                      <span>Government Alerts</span>
                      <span className="text-secondary font-mono text-[10px]">2 New</span>
                    </div>
                    <div className="p-2 bg-emerald-50 text-emerald-900 rounded border border-emerald-200">
                      <strong>Cartosat-3 Telemetry:</strong> Pass completed over Western Ghats.
                    </div>
                    <div className="p-2 bg-amber-50 text-amber-900 rounded border border-amber-200">
                      <strong>Assam Flood Watch:</strong> RISAT-1A SAR layer updated.
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Icon Placeholder */}
              <div className="relative">
                <button
                  onClick={() => setShowProfilePopover(!showProfilePopover)}
                  className="flex items-center gap-1.5 p-0.5 rounded-full border-2 border-secondary overflow-hidden cursor-pointer"
                  title="Official User Profile"
                >
                  <img
                    className="w-7 h-7 rounded-full object-cover"
                    alt="Dr. A. R. Rao Senior Scientist"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-SI8O8wTIQ00ip5kkZJdhjv1QcXwWKmqJLDriYaToIV34i6cVoOUl6O9yq5NgH7eCMOw0yU03nfCVyHzOF6p6r760N8kcEDFfBsG1pYQJeWryCKMC28vAGNnMYw4Mv4XGMI_fMGX1PVT0CRVTqLwNGO5UeE1gX0LjeL6rbHd0D-NYboVTJr7f9ILVapZVd56pqFk3SlE6HgnVaL8WJEZzyylvcfmzRvxOwJZ2hpfOprzT0mrYqdOAcA"
                  />
                </button>

                {showProfilePopover && (
                  <div className="absolute right-0 mt-2 w-60 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-xl z-50 text-xs space-y-2">
                    <div className="font-bold text-on-surface border-b border-outline-variant/40 pb-2">
                      <p className="text-sm">Dr. A. R. Rao</p>
                      <p className="text-[11px] text-on-surface-variant font-normal">
                        Senior Scientist, ISRO NRSC
                      </p>
                    </div>
                    <p className="text-[10px] text-emerald-700 font-bold bg-emerald-50 p-1.5 rounded border border-emerald-200">
                      ✓ Security Clearance: Level 4 National
                    </p>
                    <Link
                      href="/citizen-dashboard"
                      onClick={() => setShowProfilePopover(false)}
                      className="block text-secondary font-semibold hover:underline pt-1"
                    >
                      View Citizen Dashboard
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-2xl">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-b border-outline-variant px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-xs font-bold ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Global Search & Voice Search Modal */}
      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        isVoiceMode={isVoiceSearch}
      />
    </>
  );
}
