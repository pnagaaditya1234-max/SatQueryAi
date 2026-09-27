'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';

export default function CitizenDashboardPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isUploading, setIsUploading] = useState(false);

  const publicQueries = [
    {
      id: 'GOI-SAT-2026-891',
      title: 'Forest Canopy & Timber Loss Assessment in Nilgiri Biosphere',
      category: 'Deforestation',
      date: 'Feb 26, 2026',
      status: 'Verified Evidence',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      satellite: 'Cartosat-3',
      resolution: '0.35m',
    },
    {
      id: 'GOI-SAT-2026-890',
      title: 'Water Retention & Siltation Volume in Hirakud Reservoir',
      category: 'Water Reservoirs',
      date: 'Feb 24, 2026',
      status: 'Processing Downlink',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      satellite: 'EOS-04',
      resolution: '1.0m SAR',
    },
    {
      id: 'GOI-SAT-2026-888',
      title: 'NH-44 Highway Infrastructure Encroachment Survey',
      category: 'Infrastructure',
      date: 'Feb 22, 2026',
      status: 'Verified Evidence',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      satellite: 'Cartosat-2E',
      resolution: '0.6m',
    },
    {
      id: 'GOI-SAT-2026-885',
      title: 'Wheat Crop Moisture Stress Analysis in Malwa Region Punjab',
      category: 'Agriculture',
      date: 'Feb 20, 2026',
      status: 'Verified Evidence',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      satellite: 'Sentinel-2B',
      resolution: '10m Multi-spectral',
    },
  ];

  const filteredQueries =
    activeCategory === 'All'
      ? publicQueries
      : publicQueries.filter((q) => q.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="Citizen Dashboard" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <NoticeBanner
            title="Public Information Portal Notice"
            message="Public evidence reports are published directly from ISRO Bhuvan & NRSC satellite downlinks for transparent public administration."
            type="info"
          />

          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
              Public Satellite Intelligence & Evidence Dashboard
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Explore public satellite telemetry reports, environmental monitoring logs, and GatiShakti spatial verification.
            </p>
          </div>

          {/* Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface-variant">Public Queries</span>
                <span className="material-symbols-outlined text-secondary text-xl">query_stats</span>
              </div>
              <p className="text-2xl font-extrabold text-on-surface mt-2">1,420</p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +14% this week
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface-variant">Active Satellites</span>
                <span className="material-symbols-outlined text-secondary text-xl">satellite_alt</span>
              </div>
              <p className="text-2xl font-extrabold text-on-surface mt-2">14 Feeds</p>
              <span className="text-[11px] text-on-surface-variant font-medium mt-1">Cartosat, RISAT & EOS</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface-variant">Downloaded Reports</span>
                <span className="material-symbols-outlined text-secondary text-xl">file_download</span>
              </div>
              <p className="text-2xl font-extrabold text-on-surface mt-2">892</p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-xs">verified</span> Public Access Verified
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface-variant">Disaster Alerts</span>
                <span className="material-symbols-outlined text-amber-600 text-xl">warning</span>
              </div>
              <p className="text-2xl font-extrabold text-on-surface mt-2">3 Active</p>
              <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-xs">notifications_active</span> Assam & Odisha Coast
              </span>
            </div>
          </div>

          {/* Citizen Query Explorer */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
              <div>
                <h2 className="text-lg font-bold text-on-surface">Recent Public Evidence Reports</h2>
                <p className="text-xs text-on-surface-variant">
                  Authoritative satellite analysis logs published by ISRO & NRSC
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 text-xs">
                {['All', 'Deforestation', 'Water Reservoirs', 'Infrastructure', 'Agriculture'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredQueries.map((report) => (
                <div
                  key={report.id}
                  className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50 hover:border-secondary transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-on-surface-variant">{report.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${report.statusColor}`}>
                        {report.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-on-surface">{report.title}</h3>
                    <p className="text-xs text-on-surface-variant">
                      Satellite: <strong>{report.satellite}</strong> • Resolution: {report.resolution} • Date:{' '}
                      {report.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-3.5 py-1.5 bg-surface border border-outline-variant hover:bg-surface-container rounded-lg text-xs font-semibold text-on-surface flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>View Spatial Map</span>
                    </button>
                    <button className="px-3 py-1.5 bg-secondary text-white rounded-lg text-xs font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">download</span>
                      <span>PDF Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <UploadModal isOpen={isUploading} onClose={() => setIsUploading(false)} />
    </div>
  );
}
