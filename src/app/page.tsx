'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Footer from '@/components/Footer';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';
import Link from 'next/link';

export default function HomePage() {
  const [queryInput, setQueryInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const suggestedPrompts = [
    'Show deforestation in Western Ghats',
    'Monitor reservoir levels in Cauvery basin',
    'Analyze urban sprawl in NCR',
    'Track flood extent in Assam Brahmaputra',
  ];

  const handleRunQuery = async (promptText?: string) => {
    const activeQuery = promptText || queryInput || 'Show deforestation in Western Ghats';
    setQueryInput(activeQuery);
    setIsSearching(true);
    setSearchResult(null);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activeQuery }),
      });
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />


      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-12 relative z-10">
          <NoticeBanner
            title="Official Government of India Telemetry Portal (ISRO / Digital India)"
            message="National Earth Observation satellite downlinks from Cartosat-3, RISAT-1A, and EOS-04 are cryptographically signed and accessible to verified ministries, civil servants, and citizens."
            type="verified"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary-fixed/50 text-on-secondary-fixed font-semibold text-xs px-3 py-1 rounded-full mb-6 border border-secondary-fixed-dim">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>Powered by ISRO Cartosat, RISAT & EOS Telemetry</span>
            </div>

            <h1 className="font-headline-xl text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight mb-6 leading-tight font-extrabold">
              Ask the Earth. <br />
              <span className="text-secondary">Get Verified Evidence.</span>
            </h1>

            <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
              Empowering governance, environmental monitoring, and infrastructural planning with advanced satellite intelligence, geospatial AI insights, and multi-spectral telemetry.
            </p>
          </div>

          {/* Interactive AI Search Bar */}
          <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-2xl shadow-xl border border-outline-variant/60 max-w-4xl">
            <div className="flex flex-col lg:flex-row items-stretch gap-3">
              <div className="flex-1 flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl border border-transparent focus-within:border-secondary transition-all">
                <span className="material-symbols-outlined text-secondary text-2xl">satellite_alt</span>
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunQuery()}
                  placeholder="Ask AI: Show deforestation in Western Ghats, monitor reservoir levels..."
                  className="w-full bg-transparent border-none text-on-surface placeholder:text-outline text-base focus:ring-0 p-0"
                />
              </div>

              <button
                onClick={() => handleRunQuery()}
                disabled={isSearching}
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">search</span>
                    <span>Search / Ask AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt Suggestions */}
            <div className="mt-4 pt-4 border-t border-outline-variant/30 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-on-surface-variant font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Suggested queries:
              </span>
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunQuery(prompt)}
                  className="bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg border border-outline-variant/40 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Search Result Box if executed */}
          {searchResult && (
            <div className="mt-6 max-w-4xl bg-surface-container-lowest border border-secondary/40 rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">verified</span>
                  <h3 className="font-bold text-sm text-on-surface">Verified AI Spatial Evidence Output</h3>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  ISRO Cryptographic Sign Validated
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-on-surface-variant">Location</p>
                  <p className="font-bold text-on-surface text-sm mt-0.5">{searchResult.spatialBounds?.locationName}</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-on-surface-variant">Vegetation Index</p>
                  <p className="font-bold text-amber-700 text-sm mt-0.5">{searchResult.metrics?.ndviChange}</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-on-surface-variant">Canopy Loss</p>
                  <p className="font-bold text-rose-700 text-sm mt-0.5">{searchResult.metrics?.canopyLossArea}</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-on-surface-variant">Confidence</p>
                  <p className="font-bold text-emerald-700 text-sm mt-0.5">{searchResult.metrics?.confidenceScore}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Link
                  href="/analysis-workspace"
                  className="bg-secondary text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open Full Workspace</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/analysis-workspace"
              className="bg-primary text-on-primary hover:bg-primary/90 px-7 py-3.5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              <span>Start Analysis</span>
            </Link>
            <Link
              href="/evidence-explorer"
              className="bg-surface hover:bg-surface-container text-on-surface border border-outline-variant px-7 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg text-secondary">explore</span>
              <span>Explore Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features / Stats Grid */}
      <section className="py-16 bg-surface-container-low border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface mb-3">
              Institutional Capabilities
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Built on robust national infrastructure to support evidence-based decision making across ministries and research bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">radar</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">ISRO Telemetry Integration</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Direct downlinks from Cartosat, RISAT, and EOS series satellites processed in near-real-time.
              </p>
              <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-semibold text-secondary">
                <span>Verified Feed</span>
                <span className="material-symbols-outlined text-sm">verified</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">photo_camera</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">Sub-Meter Optical Resolution</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                High-precision multi-spectral imagery capturing details down to 0.35m for accurate asset mapping.
              </p>
              <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-semibold text-secondary">
                <span>0.35m Precision</span>
                <span className="material-symbols-outlined text-sm">high_quality</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">emergency_share</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">Near-Real-Time Disaster Monitoring</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Automated flood extent mapping, cyclone tracking, and wildfire detection algorithms operating 24/7.
              </p>
              <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-semibold text-secondary">
                <span>24/7 Active Alert</span>
                <span className="material-symbols-outlined text-sm">notifications_active</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">shield</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">Secure NIC Cloud Infrastructure</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Hosted within National Informatics Centre data centers ensuring complete national data sovereignty.
              </p>
              <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-semibold text-secondary">
                <span>99.9% Uptime SLA</span>
                <span className="material-symbols-outlined text-sm">lock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Geospatial Preview Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-secondary font-semibold text-xs uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full">
                Interactive Platform
              </span>
              <h2 className="font-headline-lg text-3xl font-extrabold text-on-surface mt-3 mb-4">
                Multi-Spectral Analysis at Your Fingertips
              </h2>
              <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Query satellite archives using natural language. SAT AI instantly processes vector bounds, computes NDVI indices, and generates verifiable executive reports for public administration.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  <span>Automated Change Detection & Deforestation Tracking</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  <span>Water Body Volume & Sedimentation Estimation</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  <span>PM GatiShakti Infrastructure Alignment Verification</span>
                </li>
              </ul>
              <Link
                href="/evidence-explorer"
                className="bg-primary text-on-primary hover:bg-primary/90 px-6 py-3 rounded-xl font-semibold text-sm shadow-sm transition-all inline-block"
              >
                Access Data Explorer
              </Link>
            </div>

            <div className="lg:col-span-2 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/50 shadow-inner">
              <div
                className="relative h-[400px] w-full rounded-xl overflow-hidden bg-cover bg-center border border-outline-variant/40"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2AWd0lSRRTBzxLZQHyAnpZjM-WgIGd30WmjeKDU7U94oyM4-rlfWzuMdiqvcKFeuu-akegjnOlym-bNiePKRB8z6-bGKUMmf9dr7N_YtGWZRNuiPaWq-ci26jxVgt-vvNPSe42Y7HMRIpS4hXmTkzUwFXEJriEOwA5pIbNNaes47YThUqkGa_UhgjbR_Rv6_ly1nluhR4ybOxoSpJfPxEgb9hJ7k7f8qh0xNwxE2VNE97FMEicfa00A')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <span className="bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        LIVE FEED: CARTOSAT-3
                      </span>
                      <h4 className="font-headline-sm text-lg font-bold mt-1">Western Ghats Canopy Density Index</h4>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono">
                      LAT: 15.2993° N | LON: 74.1240° E
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <UploadModal isOpen={isUploading} onClose={() => setIsUploading(false)} />
    </div>
  );
}
