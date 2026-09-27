'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/citizen-dashboard', label: 'Citizen View', icon: 'dashboard' },
    { href: '/analysis-workspace', label: 'New Analysis', icon: 'analytics' },
    { href: '/results-dashboard', label: 'Analysis Results', icon: 'history' },
    { href: '/dataset-validation', label: 'Dataset Validation', icon: 'database' },
    { href: '/reasoning-engine', label: 'Reasoning Engine', icon: 'neurology' },
    { href: '/command-center', label: 'Command Center', icon: 'cell_tower' },
    { href: '/evidence-explorer', label: 'Evidence Explorer', icon: 'public' },
    { href: '/audit-dashboard', label: 'Audit Trace', icon: 'description' },
    { href: '/flagship-portal', label: 'Flagship Portal', icon: 'account_balance' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-5rem)] p-4 bg-surface-container-low border-r border-outline-variant justify-between shrink-0">
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2 pt-2">
          <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-on-primary font-bold shadow-inner">
            <span className="material-symbols-outlined text-inverse-primary text-xl">satellite_alt</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-primary">SAT AI Portal</h2>
            <p className="text-xs text-on-surface-variant">Government of India</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-200 ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Telemetry Node Card */}
      <div className="p-3 bg-surface-container-high rounded-xl border border-outline-variant/60 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface">Telemetry Node</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-xs text-on-surface-variant">Bylakuppe GS - Online</p>
        <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
          <div className="bg-secondary h-full w-[88%]"></div>
        </div>
        <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
          <span>Downlink: 4.8 Gbps</span>
          <span>Latency: 12ms</span>
        </div>
      </div>
    </aside>
  );
}
