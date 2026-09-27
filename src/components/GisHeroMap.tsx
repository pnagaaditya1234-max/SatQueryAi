'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LocationPreset {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
  area: string;
  dataset: string;
  points: { x: number; y: number }[];
}

export default function GisHeroMap() {
  const router = useRouter();

  // Location presets across India
  const presets: LocationPreset[] = [
    {
      name: 'Western Ghats Bio-Reserve',
      lat: 15.2993,
      lng: 74.124,
      zoom: 12,
      area: '142.8 km²',
      dataset: 'Cartosat-3 (0.35m Optical)',
      points: [
        { x: 35, y: 30 },
        { x: 65, y: 25 },
        { x: 75, y: 65 },
        { x: 40, y: 70 },
      ],
    },
    {
      name: 'Cauvery River Basin Siltation',
      lat: 11.2254,
      lng: 78.9629,
      zoom: 11,
      area: '284.1 km²',
      dataset: 'RISAT-1A (1.0m C-Band SAR)',
      points: [
        { x: 25, y: 35 },
        { x: 70, y: 20 },
        { x: 80, y: 60 },
        { x: 30, y: 75 },
      ],
    },
    {
      name: 'Delhi-NCR Urban Sprawl Area',
      lat: 28.6139,
      lng: 77.209,
      zoom: 13,
      area: '98.5 km²',
      dataset: 'EOS-04 (Thermal + Optical)',
      points: [
        { x: 30, y: 25 },
        { x: 70, y: 30 },
        { x: 65, y: 70 },
        { x: 25, y: 65 },
      ],
    },
    {
      name: 'Assam Brahmaputra Inundation Sector',
      lat: 26.8524,
      lng: 94.182,
      zoom: 11,
      area: '312.4 km²',
      dataset: 'Sentinel-2B & RISAT-1A SAR',
      points: [
        { x: 20, y: 40 },
        { x: 75, y: 20 },
        { x: 85, y: 65 },
        { x: 35, y: 80 },
      ],
    },
  ];

  const [selectedPreset, setSelectedPreset] = useState<LocationPreset>(presets[0]);
  const [mapLayer, setMapLayer] = useState<'Satellite' | 'Terrain' | 'Hybrid' | 'Boundaries'>('Satellite');
  const [activeQuery, setActiveQuery] = useState('Show deforestation & canopy loss in Western Ghats');
  const [isDrawing, setIsDrawing] = useState(false);
  const [customPoints, setCustomPoints] = useState<{ x: number; y: number }[]>(presets[0].points);
  const [zoomLevel, setZoomLevel] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Sync preset change
  const handleSelectPreset = (preset: LocationPreset) => {
    setSelectedPreset(preset);
    setCustomPoints(preset.points);
    setZoomLevel(preset.zoom);
    setSearchQuery(preset.name);
  };

  // Canvas Drawing / Interactive Click
  const handleMapCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    if (customPoints.length >= 6) {
      setCustomPoints([{ x: xPercent, y: yPercent }]);
    } else {
      setCustomPoints([...customPoints, { x: xPercent, y: yPercent }]);
    }
  };

  const clearPolygon = () => {
    setCustomPoints([]);
  };

  const handleStartAnalysis = () => {
    const targetUrl = `/analysis-workspace?query=${encodeURIComponent(activeQuery)}&lat=${selectedPreset.lat}&lng=${selectedPreset.lng}`;
    router.push(targetUrl);
  };

  // Generate SVG polygon points string
  const polygonPointsStr = customPoints.map((p) => `${p.x}%,${p.y}%`).join(' ');

  return (
    <div className="relative w-full h-[82vh] min-h-[580px] max-h-[900px] overflow-hidden bg-slate-950 font-sans border-b border-outline-variant/60">
      {/* MAP CANVAS BACKGROUND CONTAINER */}
      <div
        onClick={handleMapCanvasClick}
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          isDrawing ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
        }`}
        style={{
          backgroundImage:
            mapLayer === 'Terrain'
              ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAssk_Uoyu3qbUAbgkBWBY0ZX4USFOWkLqEB4h-_zlmOBOEzGPviFKh8OPB4ejsv7Iem7YcARQBkRxbO42Uyb-jGKaXspxeGzoqOaocqtDKW-RTgw6qrkcncYt5dt7wn7LvrYOZlqFyGc_WuvBw26tlCd6JHwcXhRCwoH_wqbZcZeK4fue6Sly2at30hqJxXarzxlGEgKvB4gKk5Jzc9QyrE2taDTGEh6Bj_01f7Rz9dAN1JFKq2ip97Q')"
              : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2AWd0lSRRTBzxLZQHyAnpZjM-WgIGd30WmjeKDU7U94oyM4-rlfWzuMdiqvcKFeuu-akegjnOlym-bNiePKRB8z6-bGKUMmf9dr7N_YtGWZRNuiPaWq-ci26jxVgt-vvNPSe42Y7HMRIpS4hXmTkzUwFXEJriEOwA5pIbNNaes47YThUqkGa_UhgjbR_Rv6_ly1nluhR4ybOxoSpJfPxEgb9hJ7k7f8qh0xNwxE2VNE97FMEicfa00A')",
        }}
      >
        {/* Soft Blue / Dark Tint Overlay */}
        <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-95 pointer-events-none"></div>

        {/* GIS Lat/Long Grid Lines Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Interactive SVG Polygon Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {customPoints.length > 2 && (
            <polygon
              points={polygonPointsStr}
              fill="rgba(29, 78, 216, 0.25)"
              stroke="#1D4ED8"
              strokeWidth="3"
              strokeDasharray="6,3"
              className="animate-pulse"
            />
          )}

          {/* Polygon Vertices Markers */}
          {customPoints.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={`${pt.x}%`}
                cy={`${pt.y}%`}
                r="6"
                fill="#FF9933"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={`${pt.x + 1}%`}
                y={`${pt.y - 1}%`}
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="bold"
                className="drop-shadow-md font-mono"
              >
                P{idx + 1}
              </text>
            </g>
          ))}
        </svg>

        {/* Drawing Helper Banner when in drawing mode */}
        {isDrawing && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#0F172A]/90 backdrop-blur-md text-white border border-[#FF9933] px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]"></span>
            <span>Click on map to place Area of Interest (AOI) polygon vertices</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDrawing(false);
              }}
              className="ml-2 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-[10px]"
            >
              Finish
            </button>
          </div>
        )}
      </div>

      {/* FLOATING ANALYSIS PANEL (LEFT SIDE) */}
      <div className="absolute top-6 left-6 z-30 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 text-on-surface">
        {/* Header Badge */}
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#0F172A] text-white flex items-center justify-center font-black text-[10px]">
              ISRO
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-[#0F172A] dark:text-white">SATQUERY AI GIS</h2>
              <p className="text-[10px] text-on-surface-variant font-medium">Bhuvan Spatial Intelligence</p>
            </div>
          </div>
          <span className="bg-[#138808]/10 text-[#138808] border border-[#138808]/30 font-extrabold text-[9px] px-2 py-0.5 rounded uppercase">
            Live Telemetry
          </span>
        </div>

        {/* Ask SATQUERY AI Box */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-base">neurology</span>
            Ask SATQUERY AI Query
          </label>
          <div className="relative">
            <input
              type="text"
              value={activeQuery}
              onChange={(e) => setActiveQuery(e.target.value)}
              placeholder="E.g. Show deforestation in Western Ghats..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-3 pr-8 py-2.5 text-xs font-medium text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-sm">search</span>
          </div>
        </div>

        {/* Location & Polygon Metrics Readout */}
        <div className="space-y-2 bg-surface-container-low/70 p-3 rounded-xl border border-outline-variant/50 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-[11px]">Selected Location:</span>
            <span className="font-bold text-[#0F172A] dark:text-white text-[11px] truncate max-w-[170px]">
              {selectedPreset.name}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-[11px]">Polygon Area (AOI):</span>
            <span className="font-bold text-secondary font-mono text-[12px]">{selectedPreset.area}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-[11px]">Center Coordinates:</span>
            <span className="font-mono text-[10px] text-on-surface">
              {selectedPreset.lat.toFixed(4)}° N, {selectedPreset.lng.toFixed(4)}° E
            </span>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-outline-variant/40">
            <span className="text-on-surface-variant text-[11px]">Active Satellite:</span>
            <span className="font-semibold text-emerald-800 text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded">
              {selectedPreset.dataset}
            </span>
          </div>
        </div>

        {/* GIS Polygon Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawing(!isDrawing)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isDrawing
                ? 'bg-[#FF9933] text-black shadow-md font-extrabold'
                : 'bg-surface border border-outline-variant hover:border-secondary text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{isDrawing ? 'edit' : 'polyline'}</span>
            <span>{isDrawing ? 'Drawing AOI...' : 'Draw Polygon'}</span>
          </button>

          <button
            onClick={clearPolygon}
            className="p-2 rounded-xl bg-surface border border-outline-variant hover:bg-rose-50 text-rose-700 transition-colors cursor-pointer"
            title="Clear Polygon"
          >
            <span className="material-symbols-outlined text-base">delete</span>
          </button>
        </div>

        {/* Location Presets Quick Chips */}
        <div>
          <span className="text-[10px] text-on-surface-variant font-bold block mb-1.5">
            Quick Region Selectors:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`text-[10px] px-2 py-1.5 rounded-lg border text-left font-semibold truncate transition-colors cursor-pointer ${
                  selectedPreset.name === p.name
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-surface hover:bg-surface-container-high text-on-surface border-outline-variant/60'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* START SATELLITE ANALYSIS BUTTON */}
        <button
          onClick={handleStartAnalysis}
          className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3.5 rounded-xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-t border-amber-500/40"
        >
          <span>Start Satellite Analysis</span>
          <span className="material-symbols-outlined text-base text-[#FF9933]">arrow_forward</span>
        </button>
      </div>

      {/* TOP RIGHT GIS CONTROLS & SEARCH BAR */}
      <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-3">
        {/* Map Search Bar */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#E2E8F0] rounded-xl shadow-xl flex items-center px-3 py-2 w-72 sm:w-80">
          <span className="material-symbols-outlined text-secondary text-lg mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location in India (e.g. Western Ghats)..."
            className="bg-transparent border-none text-xs font-semibold text-on-surface w-full focus:ring-0 p-0"
          />
        </div>

        {/* Layer Selector & GIS Controls */}
        <div className="flex items-center gap-2">
          {/* Layer Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#E2E8F0] px-3.5 py-2 rounded-xl text-xs font-bold text-on-surface shadow-lg flex items-center gap-1.5 hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-secondary text-base">layers</span>
              <span>Layer: {mapLayer}</span>
              <span className="material-symbols-outlined text-xs">expand_more</span>
            </button>

            {showLayerMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-outline-variant rounded-xl shadow-2xl p-2 text-xs space-y-1 z-40">
                {(['Satellite', 'Terrain', 'Hybrid', 'Boundaries'] as const).map((layer) => (
                  <button
                    key={layer}
                    onClick={() => {
                      setMapLayer(layer);
                      setShowLayerMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      mapLayer === layer ? 'bg-secondary text-white' : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pan / Zoom Control Buttons */}
          <div className="flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
              className="p-2 text-on-surface hover:bg-surface-container border-b border-outline-variant/40 cursor-pointer"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 1, 4))}
              className="p-2 text-on-surface hover:bg-surface-container cursor-pointer"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM FLOATING BAR: ISRO TELEMETRY STATUS */}
      <div className="absolute bottom-4 left-6 right-6 z-30 pointer-events-none flex items-center justify-between">
        <div className="pointer-events-auto bg-[#0F172A]/90 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/10 text-xs font-mono flex items-center gap-4 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-emerald-300">ISRO BHUVAN GIS ENGINE</span>
          </div>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="hidden sm:inline text-gray-200">
            Center: {selectedPreset.lat.toFixed(4)}° N, {selectedPreset.lng.toFixed(4)}° E
          </span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="hidden md:inline text-amber-400 font-bold">Zoom: {zoomLevel}x</span>
        </div>

        <div className="pointer-events-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-on-surface px-3 py-1.5 rounded-xl border border-outline-variant/60 text-[11px] font-bold shadow-md">
          WGS84 / EPSG:4326 Datum Verified
        </div>
      </div>
    </div>
  );
}
