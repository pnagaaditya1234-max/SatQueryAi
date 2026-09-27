'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  isVoiceMode?: boolean;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  initialQuery = '',
  isVoiceMode = false,
}: GlobalSearchModalProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [isListening, setIsListening] = useState(isVoiceMode);

  useEffect(() => {
    setSearchTerm(initialQuery);
    setIsListening(isVoiceMode);

    if (isVoiceMode) {
      const timer = setTimeout(() => {
        setSearchTerm('Show deforestation in Western Ghats');
        setIsListening(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [initialQuery, isVoiceMode, isOpen]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Western Ghats Deforestation Report', href: '/results-dashboard' },
    { label: 'Brahmaputra Flood Risk Telemetry', href: '/command-center' },
    { label: 'Cartosat-3 Imagery Ingestion', href: '/analysis-workspace' },
    { label: 'PM GatiShakti Highway Survey', href: '/flagship-portal' },
    { label: 'RTI Algorithmic Audit Logs', href: '/audit-dashboard' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/analysis-workspace?query=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
            <span className="material-symbols-outlined text-secondary">search</span>
            <span>Government Satellite Intelligence Global Search</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search website, satellite tiles, reports, or ask AI query..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-24 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-xl">search</span>

            <div className="absolute right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsListening(!isListening)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-surface-container-high text-secondary hover:bg-surface-variant'
                }`}
                title="Voice Search"
              >
                <span className="material-symbols-outlined text-base">mic</span>
              </button>
              <button
                type="submit"
                className="bg-secondary text-white text-xs px-3 py-2 rounded-lg font-bold hover:bg-secondary/90 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {isListening && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2 font-semibold animate-pulse">
              <span className="material-symbols-outlined text-rose-600 text-base">graphic_eq</span>
              <span>Listening for voice input in English, Hindi, or Telugu...</span>
            </div>
          )}

          <div>
            <p className="text-xs text-on-surface-variant font-semibold mb-2">Quick Suggested Links:</p>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    router.push(link.href);
                    onClose();
                  }}
                  className="text-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg border border-outline-variant/60 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs text-secondary">arrow_forward</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
