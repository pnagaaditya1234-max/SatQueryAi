'use client';

import React from 'react';

interface NoticeBannerProps {
  title?: string;
  message?: string;
  type?: 'info' | 'warning' | 'verified';
}

export default function NoticeBanner({
  title = 'Official Government of India Telemetry Notice',
  message = 'All satellite observations and spatial evidence published on this portal are verified by ISRO National Remote Sensing Centre (NRSC) under Digital India and PM GatiShakti Framework.',
  type = 'verified',
}: NoticeBannerProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    verified: 'bg-emerald-50 border-emerald-300 text-emerald-950',
  };

  const icons = {
    info: 'info',
    warning: 'warning',
    verified: 'verified',
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[type]} shadow-xs flex items-start gap-3 text-xs mb-6`}>
      <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">{icons[type]}</span>
      <div className="space-y-0.5">
        <h4 className="font-extrabold text-xs">{title}</h4>
        <p className="leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
