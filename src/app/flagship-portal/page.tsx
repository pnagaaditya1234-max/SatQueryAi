'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';
import Link from 'next/link';

export default function FlagshipPortalPage() {
  const [isUploading, setIsUploading] = useState(false);

  const ministries = [
    {
      name: 'Ministry of Environment, Forest & Climate Change',
      code: 'MoEFCC',
      description: 'Canopy density, forest encroachment, and biodiversity monitoring.',
      queries: '12,480 Queries Executed',
      badge: 'Active Partner',
    },
    {
      name: 'Ministry of Jal Shakti',
      code: 'MoJS',
      description: 'Water body volume, dam capacity, river basin siltation, and flood extent.',
      queries: '18,920 Queries Executed',
      badge: 'Active Partner',
    },
    {
      name: 'Ministry of Road Transport & Highways',
      code: 'MoRTH',
      description: 'PM GatiShakti highway alignment, corridor survey, and land acquisition.',
      queries: '9,340 Queries Executed',
      badge: 'Active Partner',
    },
    {
      name: 'Ministry of Agriculture & Farmers Welfare',
      code: 'MoAFW',
      description: 'Crop health index, drought stress detection, and yield estimation.',
      queries: '24,100 Queries Executed',
      badge: 'Active Partner',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="About SAT AI & PM GatiShakti Portal" />

      {/* Flagship Hero Banner */}
      <section className="bg-primary-container text-white py-16 px-4 lg:px-12 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto mb-6">
          <NoticeBanner
            title="National Infrastructure & GatiShakti Framework"
            message="This portal serves as the primary satellite intelligence integration hub across all 4 shadow ministries under the Digital India Initiative."
            type="verified"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 text-secondary-fixed px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Flagship Government of India Geospatial Intelligence Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
            Integrated National Geospatial Intelligence Architecture
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Unifying ISRO Earth Observation downlinks, NRSC data archives, and PM GatiShakti spatial layers into a single authoritative AI-driven governance framework.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/analysis-workspace"
              className="bg-secondary text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-secondary/90 transition-all flex items-center gap-2"
            >
              <span>Launch Enterprise Workspace</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <Link
              href="/citizen-dashboard"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all border border-white/20"
            >
              Access Citizen Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 px-4 lg:px-12 max-w-7xl mx-auto w-full space-y-8 flex-1">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            Participating National Ministries & Agencies
          </h2>
          <p className="text-xs text-on-surface-variant mt-2">
            Inter-ministerial spatial data sharing enabled under Digital India data sovereignty standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ministries.map((m, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-xs hover:border-secondary transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold bg-primary-container text-white px-2 py-0.5 rounded uppercase">
                    {m.code}
                  </span>
                  <h3 className="font-bold text-base text-on-surface mt-2">{m.name}</h3>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                  {m.badge}
                </span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">{m.description}</p>

              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
                <span className="font-mono text-on-surface-variant">{m.queries}</span>
                <Link
                  href="/analysis-workspace"
                  className="text-secondary font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Sector Portal</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <UploadModal isOpen={isUploading} onClose={() => setIsUploading(false)} />
    </div>
  );
}
