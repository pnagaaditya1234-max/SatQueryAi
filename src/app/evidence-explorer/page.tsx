'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';

export default function EvidenceExplorerPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConstellation, setSelectedConstellation] = useState('All');

  const rasterCatalog = [
    {
      id: 'CAT-2026-WESTERN-GHATS',
      title: 'Western Ghats Bio-Reserve Multi-Spectral Tile',
      constellation: 'Cartosat-3',
      date: 'Feb 24, 2026',
      resolution: '0.35m',
      bands: 'Panchromatic + 4 Multi-Spectral',
      cloud: '2.4%',
      location: 'Karnataka / Goa Border',
    },
    {
      id: 'CAT-2026-CAUVERY-BASIN',
      title: 'Cauvery River Basin Siltation & Water Layer',
      constellation: 'RISAT-1A',
      date: 'Feb 22, 2026',
      resolution: '1.0m SAR',
      bands: 'C-Band VV/VH Polarization',
      cloud: '0.0%',
      location: 'Tamil Nadu / Karnataka',
    },
    {
      id: 'CAT-2026-NCR-URBAN',
      title: 'Delhi-NCR Infrastructure Encroachment Grid',
      constellation: 'EOS-04',
      date: 'Feb 20, 2026',
      resolution: '5.0m',
      bands: 'Thermal IR + Optical',
      cloud: '1.1%',
      location: 'National Capital Region',
    },
    {
      id: 'CAT-2026-PUNJAB-AGRI',
      title: 'Punjab Agricultural Crop Health & Yield Raster',
      constellation: 'Sentinel-2B',
      date: 'Feb 18, 2026',
      resolution: '10.0m',
      bands: 'NDVI / EVI Multi-Temporal',
      cloud: '0.5%',
      location: 'Malwa Agriculture Belt',
    },
  ];

  const filteredCatalog = rasterCatalog.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesConst =
      selectedConstellation === 'All' || item.constellation === selectedConstellation;
    return matchesSearch && matchesConst;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="Evidence Explorer" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <NoticeBanner
            title="National Spatial Evidence Repository"
            message="Satellite imagery tiles in this catalog are indexed directly from ISRO NRSC telemetry ground stations and georeferenced to WGS84 EPSG:4326."
            type="verified"
          />

          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
              Geospatial Evidence Catalog & Raster Repository
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Search, filter, and inspect verified satellite imagery, elevation meshes, and multi-sensor spatial layers.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-outline text-lg">search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter catalog by location, state, or tile ID..."
                className="w-full bg-transparent border-none text-xs text-on-surface focus:ring-0 p-0"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-on-surface-variant font-medium">Constellation:</span>
                <select
                  value={selectedConstellation}
                  onChange={(e) => setSelectedConstellation(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface font-semibold focus:ring-1 focus:ring-secondary"
                >
                  <option value="All">All Constellations</option>
                  <option value="Cartosat-3">Cartosat-3</option>
                  <option value="RISAT-1A">RISAT-1A</option>
                  <option value="EOS-04">EOS-04</option>
                  <option value="Sentinel-2B">Sentinel-2B</option>
                </select>
              </div>

              <button
                onClick={() => setIsUploading(true)}
                className="bg-secondary text-white text-xs px-3.5 py-2 rounded-lg font-bold shadow-xs hover:bg-secondary/90 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">cloud_upload</span>
                <span>Ingest</span>
              </button>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCatalog.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs hover:border-secondary transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-on-surface-variant">{item.id}</span>
                    <h3 className="font-bold text-sm text-on-surface mt-0.5">{item.title}</h3>
                    <p className="text-xs text-secondary font-semibold">{item.location}</p>
                  </div>
                  <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                    {item.constellation}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-surface-container-low p-3 rounded-lg border border-outline-variant/40">
                  <div>
                    <span className="text-on-surface-variant text-[10px] block">Spatial Resolution</span>
                    <span className="font-bold text-on-surface">{item.resolution}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant text-[10px] block">Cloud Cover</span>
                    <span className="font-bold text-on-surface">{item.cloud}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-outline-variant/30">
                    <span className="text-on-surface-variant text-[10px] block">Spectral Bands</span>
                    <span className="font-bold text-on-surface text-[11px]">{item.bands}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-xs">
                  <span className="text-on-surface-variant">Pass Date: {item.date}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`Inspecting spatial raster metadata for ${item.id}`)}
                      className="px-3 py-1.5 bg-surface border border-outline-variant hover:border-secondary rounded text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                    >
                      Metadata
                    </button>
                    <button
                      onClick={() => alert(`Downloading GeoTIFF for ${item.id}`)}
                      className="px-3 py-1.5 bg-secondary text-white rounded text-xs font-bold hover:bg-secondary/90 transition-colors cursor-pointer"
                    >
                      Download Tile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
      <UploadModal isOpen={isUploading} onClose={() => setIsUploading(false)} />
    </div>
  );
}
