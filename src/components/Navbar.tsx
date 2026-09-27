'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onOpenUpload?: () => void;
}

export default function Navbar({ onOpenUpload }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/citizen-dashboard', label: 'Citizen View' },
    { href: '/analysis-workspace', label: 'Workspace' },
    { href: '/dataset-validation', label: 'Dataset Validation' },
    { href: '/reasoning-engine', label: 'Reasoning' },
    { href: '/command-center', label: 'Command Center' },
    { href: '/results-dashboard', label: 'Results' },
    { href: '/evidence-explorer', label: 'Evidence Explorer' },
    { href: '/audit-dashboard', label: 'Audit Trace' },
    { href: '/flagship-portal', label: 'Flagship Portal' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center border border-outline-variant/40 shadow-inner overflow-hidden">
            <img
              className="w-8 h-8 object-contain"
              alt="Official Government of India Emblem"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL40emYAMlB8cDiJHozYFY32UXOUdZu-jkXj6imQwccyRJG9k9X0NhZwSCWLHNux4meGPSxBOZ78Ib2sppNp0s77GEaDo8farorgjAFgiS6PeOy1cIbEQeiC8vQt_apFOjGtTeuI8Z3gHwAdig_RG4nWlxfJnm7fSNnc5dmy6LbTn2Sl-yCswVwkK48rDd0vJzQSUwQQgIciy89B3z9y0VvAuZyoyYBs-uUoWrSWx57n1tzF_Rm3e3sg"
            />
          </div>
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white font-bold text-xs shadow">
            ISRO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-md text-lg tracking-tight text-on-surface font-extrabold group-hover:text-secondary transition-colors">
                SAT AI
              </h1>
              <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full border border-secondary/20">
                V2.4 LIVE
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium">
              Satellite Intelligence Assistant
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold transition-colors py-1 px-2 rounded ${
                  isActive
                    ? 'text-secondary bg-secondary/10 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenUpload && (
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 bg-secondary text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-secondary/90 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">cloud_upload</span>
              <span className="hidden sm:inline">Upload Dataset</span>
            </button>
          )}

          <Link
            href="/analysis-workspace"
            className="hidden sm:flex items-center gap-1.5 border border-outline-variant hover:border-outline bg-surface px-3.5 py-2 rounded-lg text-xs font-medium text-on-surface transition-all"
          >
            <span className="material-symbols-outlined text-base">terminal</span>
            <span>API Docs</span>
          </Link>

          {/* User Profile avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-outline-variant">
            <img
              className="w-8 h-8 rounded-full object-cover border border-secondary"
              alt="Official portrait of Dr. A. R. Rao"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-SI8O8wTIQ00ip5kkZJdhjv1QcXwWKmqJLDriYaToIV34i6cVoOUl6O9yq5NgH7eCMOw0yU03nfCVyHzOF6p6r760N8kcEDFfBsG1pYQJeWryCKMC28vAGNnMYw4Mv4XGMI_fMGX1PVT0CRVTqLwNGO5UeE1gX0LjeL6rbHd0D-NYboVTJr7f9ILVapZVd56pqFk3SlE6HgnVaL8WJEZzyylvcfmzRvxOwJZ2hpfOprzT0mrYqdOAcA"
            />
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded text-on-surface hover:bg-surface-container"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-b border-outline-variant px-4 py-4 space-y-2 max-h-[75vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === link.href
                  ? 'bg-secondary/10 text-secondary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
