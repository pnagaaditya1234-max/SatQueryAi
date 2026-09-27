'use client';

import React, { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (fileInfo: { name: string; type: string; size: string }) => void;
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const [selectedSensor, setSelectedSensor] = useState('Cartosat-3');
  const [selectedFormat, setSelectedFormat] = useState('GeoTIFF');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);

  if (!isOpen) return null;

  const handleSimulateUpload = (fileName: string, fileSize: string) => {
    setUploading(true);
    setProgress(0);
    setUploadedFile(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          const fileInfo = { name: fileName, type: selectedFormat, size: fileSize };
          setUploadedFile({ name: fileName, size: fileSize });
          if (onUploadSuccess) onUploadSuccess(fileInfo);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      handleSimulateUpload(file.name, sizeMb);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">cloud_upload</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">
                Ingest Satellite & Telemetry Dataset
              </h2>
              <p className="text-xs text-on-surface-variant">
                Upload GeoTIFF, NetCDF4, Shapefiles or CSV data layers to SAT AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Configurations */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-on-surface mb-1">Satellite Sensor</label>
            <select
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-on-surface font-medium focus:ring-1 focus:ring-secondary"
            >
              <option value="Cartosat-3">Cartosat-3 (0.35m Optical)</option>
              <option value="RISAT-1A">RISAT-1A (C-Band SAR Radar)</option>
              <option value="EOS-04">EOS-04 (Radar Imaging)</option>
              <option value="Sentinel-2">Sentinel-2 (Multi-Spectral)</option>
              <option value="Landsat-9">Landsat-9 (Thermal / OLI)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-on-surface mb-1">Target Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-on-surface font-medium focus:ring-1 focus:ring-secondary"
            >
              <option value="GeoTIFF">Cloud-Optimized GeoTIFF (.tif)</option>
              <option value="NetCDF">NetCDF4 Telemetry (.nc)</option>
              <option value="Shapefile">Vector Shapefile (.shp/.geojson)</option>
              <option value="CSV">Point Cloud / CSV (.csv)</option>
            </select>
          </div>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            dragActive
              ? 'border-secondary bg-secondary/5 scale-[0.99]'
              : 'border-outline-variant hover:border-secondary/60 bg-surface-container-low/50'
          }`}
          onClick={() => handleSimulateUpload(`Sample_${selectedSensor}_Tile.tif`, '48.5 MB')}
        >
          <span className="material-symbols-outlined text-4xl text-secondary mb-2">upload_file</span>
          <p className="text-sm font-semibold text-on-surface mb-1">
            Drag & drop satellite imagery or click to select
          </p>
          <p className="text-xs text-on-surface-variant mb-4">
            Supports GeoTIFF, HDF5, GeoJSON, and CSV up to 2GB per raster band
          </p>

          <button className="bg-surface hover:bg-surface-container-high border border-outline-variant px-4 py-2 rounded-lg text-xs font-semibold text-on-surface inline-flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-base">folder_open</span>
            <span>Browse Local Files</span>
          </button>
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="space-y-2 bg-surface-container p-4 rounded-xl border border-outline-variant/60">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-secondary animate-spin">sync</span>
                Uploading and validating spatial metadata...
              </span>
              <span className="text-secondary">{progress}%</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
              <div
                className="bg-secondary h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Upload Result Notification */}
        {uploadedFile && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
              <span>
                <strong>{uploadedFile.name}</strong> ({uploadedFile.size}) successfully ingested into NIC Cloud Node!
              </span>
            </div>
            <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
              Ingested
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-outline-variant rounded-lg text-xs font-semibold hover:bg-surface-container transition-colors text-on-surface"
          >
            {uploadedFile ? 'Done' : 'Cancel'}
          </button>
          {!uploadedFile && (
            <button
              onClick={() => handleSimulateUpload(`Cartosat3_WesternGhats_2026.tif`, '142.8 MB')}
              disabled={uploading}
              className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>Simulate Upload</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
