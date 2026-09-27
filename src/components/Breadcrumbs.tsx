'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  currentTitle: string;
  parentTitle?: string;
  parentHref?: string;
}

export default function Breadcrumbs({ currentTitle, parentTitle = 'Home', parentHref = '/' }: BreadcrumbsProps) {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <nav className="w-full py-2 px-4 lg:px-12 bg-surface-container-low/60 border-b border-outline-variant/30 text-xs">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-on-surface-variant font-medium">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">home</span>
          <span>Government Portal</span>
        </Link>
        <span className="text-outline">/</span>
        {parentHref !== '/' && (
          <>
            <Link href={parentHref} className="hover:text-primary transition-colors">
              {parentTitle}
            </Link>
            <span className="text-outline">/</span>
          </>
        )}
        <span className="text-primary font-bold">{currentTitle}</span>
      </div>
    </nav>
  );
}
