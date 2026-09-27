'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';

export default function AnalysisWorkspacePage() {
  const [queryText, setQueryText] = useState('Has urban construction increased between 2022 and 2026?');
  const [activeLayer, setActiveLayer] = useState('Optical (Cartosat-3)');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  const handleRunQuery = () => {
    setIsAnalyzing(true);
    setAnalysisDone(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="Satellite Analysis Workspace" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <NoticeBanner
            title="Authoritative ISRO Telemetry Workspace Notice"
            message="Data streams processed within this workspace adhere to National Remote Sensing Centre (NRSC) radiometric standards and WGS84 EPSG:4326 geodetic datum."
            type="verified"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Controls & Data Ingestion */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                  Spatial Intelligence & Telemetry Workspace
                </h1>
                <p className="text-xs text-on-surface-variant mt-1">
                  Execute multi-sensor AI queries, ingest optical & radar datasets, and analyze spatial anomalies with authoritative Indian geodetic standards.
                </p>
              </div>

            {/* AI Search & Query Box */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-secondary">neurology</span>
                  <h2 className="font-bold text-sm text-on-surface">Natural-Language AI Search & Query Box</h2>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-fixed text-on-primary-fixed rounded">
                  LLM v4.2 Active
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-outline-variant bg-surface p-3 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary resize-none"
                  placeholder="Ask satellite telemetry: Has urban construction increased between 2022 and 2026?"
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <button
                    onClick={() => alert('Simulating voice input listening...')}
                    className="p-2 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface transition cursor-pointer"
                    title="Voice Input"
                  >
                    <span className="material-symbols-outlined text-secondary text-base">mic</span>
                  </button>
                  <button
                    onClick={handleRunQuery}
                    disabled={isAnalyzing}
                    className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg text-xs transition flex items-center space-x-1 shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                        <span>Computing...</span>
                      </>
                    ) : (
                      <>
                        <span>Run Query</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-on-surface-variant mb-2 font-medium">Example prompt chips:</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    'Deforestation rate in Western Ghats',
                    'Reservoir water volume Yamuna basin',
                    'Agricultural yield prediction Punjab 2026',
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setQueryText(chip)}
                      className="bg-surface-container-low hover:bg-surface-container-high text-on-surface px-3 py-1 rounded-full border border-outline-variant transition text-left cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Multi-Sensor Telemetry & Ingestion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-sm text-on-surface">Multi-Sensor Telemetry & Data Ingestion</h2>
                <span className="text-xs text-on-surface-variant font-medium">4 Data Layers Active</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* Layer 1 */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center justify-between hover:border-secondary transition shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary border border-outline-variant">
                      <span className="material-symbols-outlined text-xl">photo_camera</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xs font-bold text-on-surface">Optical Satellite Image</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                          Verified GeoTIFF
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant">Cartosat-3 • 0.35m resolution • 2.4% cloud cover</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveLayer('Optical (Cartosat-3)')}
                    className="px-3 py-1 bg-surface border border-outline-variant hover:border-secondary rounded text-xs font-semibold text-on-surface"
                  >
                    Inspect
                  </button>
                </div>

                {/* Layer 2 */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center justify-between hover:border-secondary transition shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary border border-outline-variant">
                      <span className="material-symbols-outlined text-xl">radar</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xs font-bold text-on-surface">SAR Radar Image</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-secondary-fixed text-on-secondary-fixed font-bold">
                          All-weather pass
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant">RISAT-1A • C-Band • 1m resolution</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveLayer('SAR Radar (RISAT-1A)')}
                    className="px-3 py-1 bg-surface border border-outline-variant hover:border-secondary rounded text-xs font-semibold text-on-surface"
                  >
                    Inspect
                  </button>
                </div>

                {/* Layer 3 */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center justify-between hover:border-secondary transition shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary border border-outline-variant">
                      <span className="material-symbols-outlined text-xl">thermostat</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xs font-bold text-on-surface">Thermal Infrared Sensor</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                          Surface Temp
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant">EOS-04 • Thermal Infrared • 30m Grid</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveLayer('Thermal (EOS-04)')}
                    className="px-3 py-1 bg-surface border border-outline-variant hover:border-secondary rounded text-xs font-semibold text-on-surface"
                  >
                    Inspect
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsUploading(true)}
                className="w-full py-3 border-2 border-dashed border-outline-variant hover:border-secondary rounded-xl font-semibold text-xs text-on-surface flex items-center justify-center gap-2 bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">cloud_upload</span>
                <span>Ingest Additional Raster or Vector Layer</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Map Previewer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-sm text-on-surface">Interactive Telemetry Map Preview</h2>
                  <p className="text-[11px] text-on-surface-variant">Layer: {activeLayer}</p>
                </div>
                <span className="text-[10px] font-mono bg-surface-container-high px-2 py-0.5 rounded text-on-surface">
                  EPSG:4326 (WGS84)
                </span>
              </div>

              {/* Map Canvas Simulation */}
              <div className="relative h-[380px] w-full rounded-xl overflow-hidden border border-outline-variant/60 bg-slate-900 group">
                <img
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  alt="Satellite telemetry map view of Western Ghats or Urban NCR region"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2AWd0lSRRTBzxLZQHyAnpZjM-WgIGd30WmjeKDU7U94oyM4-rlfWzuMdiqvcKFeuu-akegjnOlym-bNiePKRB8z6-bGKUMmf9dr7N_YtGWZRNuiPaWq-ci26jxVgt-vvNPSe42Y7HMRIpS4hXmTkzUwFXEJriEOwA5pIbNNaes47YThUqkGa_UhgjbR_Rv6_ly1nluhR4ybOxoSpJfPxEgb9hJ7k7f8qh0xNwxE2VNE97FMEicfa00A"
                />

                {/* Overlay Vector ROI box */}
                <div className="absolute inset-12 border-2 border-dashed border-secondary bg-secondary/10 rounded pointer-events-none flex items-start justify-start p-2">
                  <span className="bg-secondary text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                    ROI Bounds: 15.29°N 74.12°E
                  </span>
                </div>

                {/* Map Control Bar */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                  <button className="w-8 h-8 bg-surface/90 backdrop-blur-md border border-outline-variant rounded-lg flex items-center justify-center text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                  <button className="w-8 h-8 bg-surface/90 backdrop-blur-md border border-outline-variant rounded-lg flex items-center justify-center text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <button className="w-8 h-8 bg-surface/90 backdrop-blur-md border border-outline-variant rounded-lg flex items-center justify-center text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-sm">layers</span>
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-primary-container/90 backdrop-blur-md p-2.5 rounded-lg border border-white/10 text-white flex items-center justify-between text-xs font-mono">
                  <span>Downlink: CARTOSAT-3 / ISRO</span>
                  <span className="text-emerald-400 font-bold">Res: 0.35m</span>
                </div>
              </div>

              {/* Analysis Result Summary if computed */}
              {analysisDone && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                      Query Analysis Complete
                    </span>
                    <span>98.6% Conf</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Urban construction density in selected zone expanded by <strong>+18.4%</strong> between 2022 and 2026.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      </div>

      <Footer />
      <UploadModal isOpen={isUploading} onClose={() => setIsUploading(false)} />
    </div>
  );
}
