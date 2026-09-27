'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';

export default function DatasetValidationPage() {
  const [isUploading, setIsUploading] = useState(false);

  const [datasets, setDatasets] = useState([
    {
      id: 'DS-2026-001',
      name: 'Cartosat3_Optical_WesternGhats_2026.tif',
      sensor: 'Cartosat-3',
      format: 'Cloud-Optimized GeoTIFF',
      size: '142.8 MB',
      cloudCover: '2.4%',
      crs: 'EPSG:4326 (WGS84)',
      status: 'VALIDATED',
      hash: 'sha256:8f9a...3b2c',
    },
    {
      id: 'DS-2026-002',
      name: 'RISAT1A_SAR_Cauvery_2026.nc',
      sensor: 'RISAT-1A',
      format: 'NetCDF4 Multi-Band',
      size: '284.1 MB',
      cloudCover: '0.0% (Radar)',
      crs: 'EPSG:4326 (WGS84)',
      status: 'VALIDATED',
      hash: 'sha256:4d1e...9a0f',
    },
    {
      id: 'DS-2026-003',
      name: 'CartoDEM_V3_Mesh.dem',
      sensor: 'Cartosat-1 DEM',
      format: 'GeoTIFF Elevation',
      size: '98.4 MB',
      cloudCover: 'N/A',
      crs: 'EPSG:4326 (WGS84)',
      status: 'VALIDATED',
      hash: 'sha256:7c8b...1e2d',
    },
    {
      id: 'DS-2026-004',
      name: 'Sentinel2_NDVI_Punjab_2026.tif',
      sensor: 'Sentinel-2B',
      format: 'GeoTIFF Vegetation',
      size: '64.2 MB',
      cloudCover: '1.2%',
      crs: 'EPSG:4326 (WGS84)',
      status: 'PENDING CHECK',
      hash: 'sha256:2a4f...8c9d',
    },
  ]);

  const handleRunValidation = (id: string) => {
    setDatasets((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'VALIDATED' } : d))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="Dataset Validation" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <NoticeBanner
            title="Radiometric Quality Control Notice"
            message="Datasets ingested into SAT AI undergo automated Level-2B atmospheric calibration and SHA-256 hash checksum verification before approval."
            type="verified"
          />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                Dataset Integrity & Radiometric Validation Workspace
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                Verify georeferencing precision, atmospheric calibration models, and cryptographic SHA-256 signatures for national satellite archives.
              </p>
            </div>

            <button
              onClick={() => setIsUploading(true)}
              className="bg-secondary text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-xs hover:bg-secondary/90 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-base">cloud_upload</span>
              <span>Ingest New Raster Dataset</span>
            </button>
          </div>

          {/* Validation Table Container */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-outline-variant/40 flex items-center justify-between">
              <h2 className="font-bold text-sm text-on-surface">Registered Telemetry & Spatial Datasets</h2>
              <span className="text-xs text-on-surface-variant font-mono">
                NRSC Compliance SLA: Level 2B Corrected
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant">
                  <tr>
                    <th className="p-3">Dataset ID & Filename</th>
                    <th className="p-3">Sensor / Format</th>
                    <th className="p-3">Cloud Cover</th>
                    <th className="p-3">Geodetic CRS</th>
                    <th className="p-3">Hash Integrity</th>
                    <th className="p-3">Validation Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {datasets.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-on-surface">{item.name}</div>
                        <div className="text-[11px] text-on-surface-variant font-mono">
                          {item.id} • {item.size}
                        </div>
                      </td>
                      <td className="p-3 text-on-surface font-medium">
                        <div>{item.sensor}</div>
                        <div className="text-[11px] text-on-surface-variant">{item.format}</div>
                      </td>
                      <td className="p-3 text-on-surface font-mono">{item.cloudCover}</td>
                      <td className="p-3 text-on-surface font-mono">{item.crs}</td>
                      <td className="p-3 text-on-surface font-mono text-[11px] text-on-surface-variant">
                        {item.hash}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                            item.status === 'VALIDATED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xs">
                            {item.status === 'VALIDATED' ? 'verified' : 'pending'}
                          </span>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {item.status === 'PENDING CHECK' ? (
                          <button
                            onClick={() => handleRunValidation(item.id)}
                            className="px-3 py-1 bg-secondary text-white font-bold rounded text-xs hover:bg-secondary/90 transition-colors"
                          >
                            Run Validation
                          </button>
                        ) : (
                          <button
                            onClick={() => alert(`Downloading manifest report for ${item.id}`)}
                            className="px-3 py-1 bg-surface border border-outline-variant hover:border-secondary rounded text-xs font-semibold text-on-surface transition-colors"
                          >
                            Manifest
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Radiometric Parameters & Quality Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-on-surface">Top-Of-Atmosphere (TOA) Calibration</h3>
                <span className="material-symbols-outlined text-secondary text-lg">wb_sunny</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Standard DOS1 / 6S atmospheric correction applied across optical bands B1-B4.
              </p>
              <div className="p-2.5 bg-surface-container-low rounded-lg text-xs font-mono text-on-surface flex justify-between">
                <span>Reflectance Gain:</span>
                <span className="font-bold text-secondary">0.000124</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-on-surface">SAR Backscatter Calibration</h3>
                <span className="material-symbols-outlined text-secondary text-lg">radar</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Sigma Zero (σ0) backscatter coefficient calibrated in dB for C-band VV/VH polarization.
              </p>
              <div className="p-2.5 bg-surface-container-low rounded-lg text-xs font-mono text-on-surface flex justify-between">
                <span>NESZ Noise Floor:</span>
                <span className="font-bold text-secondary">-22.4 dB</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-on-surface">Geodetic Positional Accuracy</h3>
                <span className="material-symbols-outlined text-secondary text-lg">target</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Ground Control Points (GCPs) cross-matched against Survey of India reference network.
              </p>
              <div className="p-2.5 bg-surface-container-low rounded-lg text-xs font-mono text-on-surface flex justify-between">
                <span>RMSE Error:</span>
                <span className="font-bold text-emerald-700">0.42 meters</span>
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
