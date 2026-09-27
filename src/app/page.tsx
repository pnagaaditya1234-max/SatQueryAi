'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Footer from '@/components/Footer';
import UploadModal from '@/components/UploadModal';
import dynamic from 'next/dynamic';

const GisHeroMap = dynamic(() => import('@/components/GisHeroMap'), { ssr: false });
import Link from 'next/link';

export default function HomePage() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />

      {/* Full-Screen Real-Time Interactive Satellite Map of India (ISRO Bhuvan GIS Landing Experience) */}
      <section className="relative w-full">
        <GisHeroMap />
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
