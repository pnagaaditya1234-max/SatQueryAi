'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';

export default function ResultsDashboardPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="Satellite Analysis Reports" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <NoticeBanner
            title="Official Executive Findings Package"
            message="This satellite change analysis report is cryptographically signed and archived under Government of India RTI & Digital India compliance."
            type="verified"
          />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                Executive Satellite Analysis & Evidence Summary
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                Multi-spectral change detection report for Western Ghats Biosphere (2022 - 2026).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Downloading official signed PDF report...')}
                className="bg-secondary text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-xs hover:bg-secondary/90 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Export Executive PDF</span>
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-on-surface-variant">Canopy Density Index</span>
              <p className="text-2xl font-extrabold text-amber-700 mt-2">-8.4%</p>
              <span className="text-[11px] text-on-surface-variant font-medium mt-1 block">
                142.8 Hectares Affected
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-on-surface-variant">Estimated Biomass Loss</span>
              <p className="text-2xl font-extrabold text-rose-700 mt-2">4,820 Tons</p>
              <span className="text-[11px] text-on-surface-variant font-medium mt-1 block">
                Carbon Sink Reduction
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-on-surface-variant">Reservoir Storage Level</span>
              <p className="text-2xl font-extrabold text-emerald-700 mt-2">74.2% Full</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                Within Normal Seasonal Band
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-on-surface-variant">Urban Sprawl Vector</span>
              <p className="text-2xl font-extrabold text-secondary mt-2">+18.4%</p>
              <span className="text-[11px] text-on-surface-variant font-medium mt-1 block">
                Encroachment Buffer Verified
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-outline-variant text-xs font-bold gap-6">
            {['Overview', 'Before vs. After Map', 'Regulatory Compliance', 'Raw Telemetry Data'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'border-secondary text-secondary font-extrabold'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Overview / Map Comparison */}
          {activeTab === 'Overview' || activeTab === 'Before vs. After Map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Baseline Image */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface">Baseline: Nov 14, 2022</span>
                  <span className="text-[10px] font-mono bg-surface-container-high px-2 py-0.5 rounded text-on-surface">
                    CARTOSAT-3 (0.35m)
                  </span>
                </div>
                <div className="h-[300px] w-full rounded-lg overflow-hidden border border-outline-variant/40 bg-slate-900 relative">
                  <img
                    className="w-full h-full object-cover"
                    alt="Baseline 2022 Satellite Image"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2AWd0lSRRTBzxLZQHyAnpZjM-WgIGd30WmjeKDU7U94oyM4-rlfWzuMdiqvcKFeuu-akegjnOlym-bNiePKRB8z6-bGKUMmf9dr7N_YtGWZRNuiPaWq-ci26jxVgt-vvNPSe42Y7HMRIpS4hXmTkzUwFXEJriEOwA5pIbNNaes47YThUqkGa_UhgjbR_Rv6_ly1nluhR4ybOxoSpJfPxEgb9hJ7k7f8qh0xNwxE2VNE97FMEicfa00A"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-1 rounded">
                    Dense Forest Canopy (NDVI: 0.82)
                  </span>
                </div>
              </div>

              {/* Current Image */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface">Current Pass: Feb 22, 2026</span>
                  <span className="text-[10px] font-mono bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-bold">
                    CARTOSAT-3 (0.35m)
                  </span>
                </div>
                <div className="h-[300px] w-full rounded-lg overflow-hidden border border-outline-variant/40 bg-slate-900 relative">
                  <img
                    className="w-full h-full object-cover"
                    alt="Current 2026 Satellite Image"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAssk_Uoyu3qbUAbgkBWBY0ZX4USFOWkLqEB4h-_zlmOBOEzGPviFKh8OPB4ejsv7Iem7YcARQBkRxbO42Uyb-jGKaXspxeGzoqOaocqtDKW-RTgw6qrkcncYt5dt7wn7LvrYOZlqFyGc_WuvBw26tlCd6JHwcXhRCwoH_wqbZcZeK4fue6Sly2at30hqJxXarzxlGEgKvB4gKk5Jzc9QyrE2taDTGEh6Bj_01f7Rz9dAN1JFKq2ip97Q"
                  />
                  <span className="absolute bottom-3 left-3 bg-amber-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-1 rounded font-bold">
                    Canopy Depletion Area (NDVI: 0.54)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-xs text-on-surface space-y-3">
              <h3 className="font-bold text-sm">Regulatory Compliance & Verification Seal</h3>
              <p className="text-on-surface-variant">
                This report complies with the National Geospatial Policy (NGP 2022) and PM GatiShakti data validation framework.
              </p>
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg flex items-center gap-2 font-mono">
                <span className="material-symbols-outlined text-emerald-600">verified</span>
                <span>Cryptographic Digest: SHA256 9f8a2b3c4d5e6f1a8b9c0d1e2f3a4b5c</span>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
      <UploadModal isOpen={isUploading} onClose={() => setIsUploading(false)} />
    </div>
  );
}
