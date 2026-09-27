'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';

interface LocationPreset {
  name: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  zoom: number;
  dataset: string;
  coordinates: [number, number][]; // [lng, lat]
}

interface GeocodingResult {
  place_name: string;
  center: [number, number];
}

export default function GisHeroMap() {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maptilersdk.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
// Read API key from Netlify / .env.local
const MAPTILER_KEY = process.env.NEXT_PUBLIC_SATQUERY_MAP_KEY;

if (!MAPTILER_KEY) {
  throw new Error("NEXT_PUBLIC_SATQUERY_MAP_KEY is missing.");
}

maptilersdk.config.apiKey = MAPTILER_KEY;

  // Presets across India
  const presets: LocationPreset[] = [
    {
      name: 'Western Ghats Bio-Reserve',
      state: 'Karnataka',
      district: 'Uttara Kannada',
      lat: 15.2993,
      lng: 74.124,
      zoom: 12,
      dataset: 'Cartosat-3 (0.35m Optical)',
      coordinates: [
        [74.11, 15.31],
        [74.14, 15.32],
        [74.15, 15.28],
        [74.11, 15.27],
        [74.11, 15.31],
      ],
    },
    {
      name: 'Cauvery River Basin Siltation',
      state: 'Tamil Nadu',
      district: 'Thanjavur',
      lat: 11.2254,
      lng: 78.9629,
      zoom: 11,
      dataset: 'RISAT-1A (1.0m C-Band SAR)',
      coordinates: [
        [78.93, 11.25],
        [78.98, 11.26],
        [78.99, 11.20],
        [78.94, 11.19],
        [78.93, 11.25],
      ],
    },
    {
      name: 'Delhi-NCR Urban Sprawl',
      state: 'Delhi',
      district: 'New Delhi',
      lat: 28.6139,
      lng: 77.209,
      zoom: 12,
      dataset: 'EOS-04 (Thermal + Optical)',
      coordinates: [
        [77.18, 28.63],
        [77.23, 28.63],
        [77.24, 28.59],
        [77.18, 28.58],
        [77.18, 28.63],
      ],
    },
    {
      name: 'Assam Brahmaputra Inundation Sector',
      state: 'Assam',
      district: 'Jorhat',
      lat: 26.8524,
      lng: 94.182,
      zoom: 11,
      dataset: 'Sentinel-2B & RISAT-1A SAR',
      coordinates: [
        [94.14, 26.88],
        [94.21, 26.89],
        [94.22, 26.82],
        [94.15, 26.81],
        [94.14, 26.88],
      ],
    },
  ];

  // Curated Popular Indian City Suggestions
  const defaultSuggestions = [
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
    { city: 'New Delhi', state: 'Delhi', lat: 28.6139, lng: 77.209 },
    { city: 'Mumbai', state: 'Maharashtra', lat: 19.076, lng: 72.8777 },
    { city: 'Panaji', state: 'Goa', lat: 15.4989, lng: 73.8278 },
    { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
    { city: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.4867 },
    { city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
    { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
    { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  ];

  // State Management
  const [activeLayer, setActiveLayer] = useState<'Satellite' | 'Terrain' | 'Streets' | 'Hybrid'>('Satellite');
  const [selectedPreset, setSelectedPreset] = useState<LocationPreset>(presets[0]);
  const [activeQuery, setActiveQuery] = useState('Show deforestation & canopy loss in Western Ghats');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [activeDrawMode, setActiveDrawMode] = useState<'simple_select' | 'draw_polygon'>('simple_select');

  // AOI Metrics State
  const [aoiMetrics, setAoiMetrics] = useState<{
    areaKm2: number;
    perimeterKm: number;
    centerLat: number;
    centerLng: number;
    verticesCount: number;
    vertices: [number, number][]; // [lat, lng]
    polygonCount: number;
  }>({
    areaKm2: 142.85,
    perimeterKm: 48.32,
    centerLat: 15.2993,
    centerLng: 74.124,
    verticesCount: 4,
    vertices: [
      [15.31, 74.11],
      [15.32, 74.14],
      [15.28, 74.15],
      [15.27, 74.11],
    ],
    polygonCount: 1,
  });

  // Calculate polygon metrics using Turf.js
  const updateMetricsFromDraw = useCallback((draw: MapboxDraw) => {
    const data = draw.getAll();
    if (!data || data.features.length === 0) {
      setAoiMetrics({
        areaKm2: 0,
        perimeterKm: 0,
        centerLat: selectedPreset.lat,
        centerLng: selectedPreset.lng,
        verticesCount: 0,
        vertices: [],
        polygonCount: 0,
      });
      return;
    }

    let totalAreaM2 = 0;
    let totalLengthM = 0;
    const allVertices: [number, number][] = [];

    data.features.forEach((feature) => {
      if (feature.geometry.type === 'Polygon') {
        totalAreaM2 += turf.area(feature);
        try {
          const line = turf.polygonToLine(feature as any);
          totalLengthM += turf.length(line, { units: 'kilometers' }) * 1000;
        } catch {
          totalLengthM += 0;
        }

        const coords = feature.geometry.coordinates[0];
        coords.forEach((coord: number[]) => {
          allVertices.push([Number(coord[1].toFixed(4)), Number(coord[0].toFixed(4))]);
        });
      }
    });

    const centroid = turf.centroid(data as any);
    const centerLng = Number(centroid.geometry.coordinates[0].toFixed(4));
    const centerLat = Number(centroid.geometry.coordinates[1].toFixed(4));

    setAoiMetrics({
      areaKm2: Number((totalAreaM2 / 1000000).toFixed(2)),
      perimeterKm: Number((totalLengthM / 1000).toFixed(2)),
      centerLat,
      centerLng,
      verticesCount: allVertices.length,
      vertices: allVertices.slice(0, 5),
      polygonCount: data.features.length,
    });
  }, [selectedPreset.lat, selectedPreset.lng]);

  // Load default preset polygon into draw
  const loadPresetPolygon = useCallback((preset: LocationPreset) => {
    if (!drawRef.current) return;
    drawRef.current.deleteAll();

    const polygonFeature: GeoJSON.Feature<GeoJSON.Polygon> = {
      id: 'preset-aoi-polygon',
      type: 'Feature',
      properties: { name: preset.name },
      geometry: {
        type: 'Polygon',
        coordinates: [preset.coordinates],
      },
    };

    drawRef.current.add(polygonFeature);
    updateMetricsFromDraw(drawRef.current);
  }, [updateMetricsFromDraw]);

  useEffect(() => {
  if (!mapContainerRef.current || mapRef.current) return;

  // Configure MapTiler SDK key
  if (!MAPTILER_KEY) {
    console.error("NEXT_PUBLIC_SATQUERY_MAP_KEY is missing.");
    return;
  }

  maptilersdk.config.apiKey = MAPTILER_KEY;

  // High resolution Satellite Style fallback...

    // Configure MapTiler SDK key
    if (MAPTILER_KEY) {
      maptilersdk.config.apiKey = MAPTILER_KEY;
    }

    // High resolution Satellite Style fallback if key is unauthenticated
    const defaultSatelliteStyle = MAPTILER_KEY
      ? maptilersdk.MapStyle.SATELLITE
      : {
          version: 8,
          sources: {
            'esri-satellite': {
              type: 'raster',
              tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
              tileSize: 256,
              attribution: 'Esri, Maxar, Earthstar Geographics',
            },
          },
          layers: [
            {
              id: 'esri-satellite-layer',
              type: 'raster',
              source: 'esri-satellite',
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        };

    // Initialize MapTiler Map
    const map = new maptilersdk.Map({
      container: mapContainerRef.current,
      style: defaultSatelliteStyle as any,
      center: [78.9629, 20.5937], // India Center: Longitude 78.9629, Latitude 20.5937
      zoom: 4.5, // Initial Zoom 4.5
      pitch: 0,
      bearing: 0,
      navigationControl: false, // Custom control positioning below
      geolocateControl: false,
      scaleControl: false,
      fullscreenControl: false,
    });

    mapRef.current = map;

    // Add Required Map Controls: Navigation, Fullscreen, Geolocate, Scale
    map.addControl(new maptilersdk.NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new maptilersdk.FullscreenControl(), 'top-right');
    map.addControl(new maptilersdk.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), 'top-right');
    map.addControl(new maptilersdk.ScaleControl({ unit: 'metric' }), 'bottom-right');

    // MapboxDraw Custom Styles (Government Blue fill/stroke, Saffron vertices)
    const drawStyles = [
      {
        id: 'gl-draw-polygon-fill-inactive',
        type: 'fill',
        filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
        paint: {
          'fill-color': '#1D4ED8',
          'fill-opacity': 0.25,
        },
      },
      {
        id: 'gl-draw-polygon-fill-active',
        type: 'fill',
        filter: ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'true']],
        paint: {
          'fill-color': '#1D4ED8',
          'fill-opacity': 0.35,
        },
      },
      {
        id: 'gl-draw-polygon-stroke-inactive',
        type: 'line',
        filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#1D4ED8',
          'line-width': 3,
        },
      },
      {
        id: 'gl-draw-polygon-stroke-active',
        type: 'line',
        filter: ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'true']],
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#1D4ED8',
          'line-width': 3.5,
          'line-dasharray': [0.2, 2],
        },
      },
      {
        id: 'gl-draw-line-inactive',
        type: 'line',
        filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#1D4ED8',
          'line-width': 3,
        },
      },
      {
        id: 'gl-draw-polygon-and-line-vertex-stroke-active',
        type: 'circle',
        filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
        paint: {
          'circle-radius': 7,
          'circle-color': '#FFFFFF',
        },
      },
      {
        id: 'gl-draw-polygon-and-line-vertex-active',
        type: 'circle',
        filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
        paint: {
          'circle-radius': 5,
          'circle-color': '#FF9933',
        },
      },
    ];

    // Initialize MapboxDraw
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      styles: drawStyles,
    });

    drawRef.current = draw;
    map.addControl(draw as any, 'top-left');

    const onDrawUpdate = () => {
      updateMetricsFromDraw(draw);
    };

    map.on('draw.create' as any, onDrawUpdate);
    map.on('draw.update' as any, onDrawUpdate);
    map.on('draw.delete' as any, onDrawUpdate);
    map.on('draw.selectionchange' as any, onDrawUpdate);

    map.on('load', () => {
      loadPresetPolygon(selectedPreset);
    });

    // Destroy map on component unmount to avoid duplicate initialization
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Change Map Style Layer
  const handleLayerChange = (layer: 'Satellite' | 'Terrain' | 'Streets' | 'Hybrid') => {
    setActiveLayer(layer);
    setShowLayerMenu(false);
    if (!mapRef.current) return;

    if (layer === 'Satellite') {
      mapRef.current.setStyle(maptilersdk.MapStyle.SATELLITE);
    } else if (layer === 'Terrain') {
      mapRef.current.setStyle(maptilersdk.MapStyle.TOPO);
    } else if (layer === 'Hybrid') {
      mapRef.current.setStyle(maptilersdk.MapStyle.HYBRID);
    } else if (layer === 'Streets') {
      mapRef.current.setStyle(maptilersdk.MapStyle.STREETS);
    }

    mapRef.current.once('style.load', () => {
      if (drawRef.current) {
        loadPresetPolygon(selectedPreset);
      }
    });
  };

  // Fly map to Location Preset
  const handleSelectPreset = (preset: LocationPreset) => {
    setSelectedPreset(preset);
    setSearchQuery(preset.name);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [preset.lng, preset.lat],
        zoom: preset.zoom,
        speed: 1.2,
      });
    }
    loadPresetPolygon(preset);
  };

  // Geocoding Search powered by MapTiler Geocoding API / Nominatim fallback
  const handleSearchInputChange = async (val: string) => {
    setSearchQuery(val);
    if (!val || val.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(val)}.json?key=${MAPTILER_KEY}&country=in&language=en&limit=5`;
      const res = await fetch(maptilerUrl);
      if (res.ok) {
        const data = await res.json();
        if (data && data.features && data.features.length > 0) {
          setSearchResults(
            data.features.map((f: { place_name: string; center: [number, number] }) => ({
              place_name: f.place_name,
              center: f.center,
            }))
          );
          setIsSearching(false);
          return;
        }
      }

      // Fallback to OpenStreetMap Nominatim
      const osmUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&countrycodes=in&format=json&limit=5`;
      const osmRes = await fetch(osmUrl);
      if (osmRes.ok) {
        const osmData = await osmRes.json();
        setSearchResults(
          osmData.map((item: { display_name: string; lat: string; lon: string }) => ({
            place_name: item.display_name,
            center: [parseFloat(item.lon), parseFloat(item.lat)],
          }))
        );
      }
    } catch {
      const coordsMatch = val.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
      if (coordsMatch) {
        const lat = parseFloat(coordsMatch[1]);
        const lng = parseFloat(coordsMatch[3]);
        setSearchResults([{ place_name: `Coordinates: ${lat}° N, ${lng}° E`, center: [lng, lat] }]);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result: GeocodingResult) => {
    setSearchResults([]);
    setSearchQuery(result.place_name.split(',')[0]);
    const [lng, lat] = result.center;

    setSelectedPreset((prev) => ({
      ...prev,
      name: result.place_name.split(',')[0],
      lat,
      lng,
    }));

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 13,
        speed: 1.2,
      });
    }
    setIsSearchFocused(false);
  };

  const handleSelectCuratedSuggestion = (city: string, state: string, lat: number, lng: number) => {
    setSearchQuery(`${city}, ${state}`);
    setSelectedPreset((prev) => ({
      ...prev,
      name: city,
      state,
      lat,
      lng,
    }));
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 12,
        speed: 1.2,
      });
    }
    setIsSearchFocused(false);
  };

  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice search is supported on standard desktop browsers like Chrome or Edge.');
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearchInputChange(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } catch {
      setIsListening(false);
    }
  };

  const handleCurrentLocationClick = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              speed: 1.2,
            });
          }
          setSearchQuery(`Current Location (${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°)`);
        },
        () => {
          if (mapRef.current) {
            mapRef.current.flyTo({ center: [78.9629, 20.5937], zoom: 6 });
          }
        }
      );
    }
  };

  // Drawing Toolbar Actions
  const handleStartDrawPolygon = () => {
    if (!drawRef.current) return;
    drawRef.current.changeMode('draw_polygon');
    setActiveDrawMode('draw_polygon');
  };

  const handleEditPolygon = () => {
    if (!drawRef.current) return;
    drawRef.current.changeMode('simple_select');
    setActiveDrawMode('simple_select');
  };

  const handleDeleteSelectedPolygon = () => {
    if (!drawRef.current) return;
    const selected = drawRef.current.getSelectedIds();
    if (selected.length > 0) {
      drawRef.current.delete(selected);
    } else {
      drawRef.current.deleteAll();
    }
    updateMetricsFromDraw(drawRef.current);
  };

  const handleClearAllAOI = () => {
    if (!drawRef.current) return;
    drawRef.current.deleteAll();
    updateMetricsFromDraw(drawRef.current);
  };

  const handleSaveAOI = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleStartAnalysis = () => {
    const targetUrl = `/analysis-workspace?query=${encodeURIComponent(activeQuery)}&lat=${selectedPreset.lat}&lng=${selectedPreset.lng}&area=${aoiMetrics.areaKm2}`;
    router.push(targetUrl);
  };

  return (
    <div
      className="relative w-full h-screen min-h-[650px] overflow-hidden bg-slate-950 font-sans border-b border-outline-variant/60"
      style={{ width: '100%', height: '100vh' }}
    >
      {/* REAL MAP CONTAINER WITH HEIGHT 100VH AND WIDTH 100% */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100vh' }}
      />

      {/* FLOATING TOP BAR: DRAWING TOOLBAR & GOI SEARCH BAR */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pointer-events-none">
        {/* DRAWING TOOLBAR BUTTONS */}
        <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#E2E8F0] dark:border-slate-800 p-1.5 rounded-2xl shadow-xl flex items-center gap-1">
          <button
            onClick={handleStartDrawPolygon}
            className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeDrawMode === 'draw_polygon'
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'bg-surface hover:bg-surface-container-high text-on-surface'
            }`}
            title="Click on map to draw polygon points"
          >
            <span className="material-symbols-outlined text-base">polyline</span>
            <span>Draw AOI</span>
          </button>

          <button
            onClick={handleEditPolygon}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeDrawMode === 'simple_select'
                ? 'bg-slate-800 text-white'
                : 'bg-surface hover:bg-surface-container-high text-on-surface'
            }`}
            title="Edit or drag vertices"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            <span className="hidden sm:inline">Edit</span>
          </button>

          <button
            onClick={handleDeleteSelectedPolygon}
            className="p-2 rounded-xl bg-surface hover:bg-rose-50 text-rose-700 transition-colors cursor-pointer border border-outline-variant/40"
            title="Delete Selected Polygon"
          >
            <span className="material-symbols-outlined text-base">delete</span>
          </button>

          <button
            onClick={handleClearAllAOI}
            className="px-2.5 py-2 rounded-xl bg-surface hover:bg-amber-50 text-amber-800 transition-colors cursor-pointer text-xs font-semibold border border-outline-variant/40"
            title="Clear All AOIs"
          >
            Clear AOI
          </button>
        </div>

        {/* GOVERNMENT OF INDIA FLOATING MAP SEARCH BAR */}
        <div className="pointer-events-auto relative w-full md:w-[460px]">
          <div
            className={`h-[56px] bg-white border border-[#D1D5DB] rounded-[16px] shadow-md hover:shadow-lg transition-all flex items-center px-4 gap-2.5 text-[#111827] ${
              isSearchFocused ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/20 shadow-lg' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[#111827] text-xl shrink-0 select-none">
              search
            </span>

            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              placeholder="Search any place in India (State, District, City, Village, PIN Code)"
              className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-0 p-0"
            />

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="p-1 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors shrink-0 cursor-pointer"
                title="Clear Search"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}

            <button
              onClick={handleVoiceSearch}
              className={`p-1.5 rounded-full transition-colors shrink-0 cursor-pointer ${
                isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-[#111827] hover:bg-gray-100'
              }`}
              title={isListening ? 'Listening...' : 'Voice Search'}
            >
              <span className="material-symbols-outlined text-lg">mic</span>
            </button>

            <button
              onClick={handleCurrentLocationClick}
              className="p-1.5 text-[#111827] hover:bg-gray-100 rounded-full transition-colors shrink-0 cursor-pointer"
              title="Fly to Current Location"
            >
              <span className="material-symbols-outlined text-lg">my_location</span>
            </button>
          </div>

          {/* Search Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#D1D5DB] rounded-[16px] shadow-2xl overflow-hidden z-50 text-xs divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onMouseDown={() => handleSelectSearchResult(res)}
                    className="w-full text-left px-4 py-3 hover:bg-[#1D4ED8]/10 text-[#111827] font-medium flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#1D4ED8] text-lg shrink-0">
                      location_on
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-sm text-[#111827]">
                        {res.place_name.split(',')[0]}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        {res.place_name.split(',').slice(1).join(',')}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <>
                  <div className="px-4 py-2 bg-gray-50 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
                    Popular Cities & Regions in India
                  </div>
                  {defaultSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onMouseDown={() =>
                        handleSelectCuratedSuggestion(item.city, item.state, item.lat, item.lng)
                      }
                      className="w-full text-left px-4 py-2.5 hover:bg-[#1D4ED8]/10 text-[#111827] flex items-center gap-3 cursor-pointer transition-colors"
                    >
                      <span className="material-symbols-outlined text-[#1D4ED8] text-lg shrink-0">
                        location_on
                      </span>
                      <div>
                        <div className="font-bold text-xs text-[#111827]">{item.city}</div>
                        <div className="text-[10px] text-[#6B7280]">{item.state}</div>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FLOATING SATQUERY AI PANEL (LEFT SIDE) */}
      <div className="absolute top-20 left-4 z-20 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 text-on-surface max-h-[calc(100vh-140px)] overflow-y-auto">
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

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-[#1D4ED8] text-base">neurology</span>
            Ask SATQUERY AI Query
          </label>
          <div className="relative">
            <input
              type="text"
              value={activeQuery}
              onChange={(e) => setActiveQuery(e.target.value)}
              placeholder="E.g. Show deforestation in Western Ghats..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-3 pr-8 py-2.5 text-xs font-medium text-on-surface focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none"
            />
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-sm">search</span>
          </div>
        </div>

        <div className="space-y-2 bg-surface-container-low/80 p-3.5 rounded-xl border border-outline-variant/60 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-[11px] font-medium">Selected Location:</span>
            <span className="font-bold text-[#0F172A] dark:text-white text-[11px] truncate max-w-[170px]">
              {selectedPreset.name}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-[11px] font-medium">State & District:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
              {selectedPreset.state}, {selectedPreset.district}
            </span>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-outline-variant/30">
            <span className="text-on-surface-variant text-[11px] font-medium">AOI Area:</span>
            <span className="font-extrabold text-[#1D4ED8] font-mono text-[13px]">
              {aoiMetrics.areaKm2 > 0 ? `${aoiMetrics.areaKm2} km²` : 'Draw AOI on Map'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-[11px] font-medium">Perimeter:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono text-[11px]">
              {aoiMetrics.perimeterKm} km
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-[11px] font-medium">Center Lat / Lng:</span>
            <span className="font-mono text-[10px] font-bold text-on-surface">
              {aoiMetrics.centerLat}° N, {aoiMetrics.centerLng}° E
            </span>
          </div>

          {aoiMetrics.vertices.length > 0 && (
            <div className="pt-2 border-t border-outline-variant/30 text-[10px]">
              <span className="text-on-surface-variant font-bold block mb-1">
                Polygon Vertices ({aoiMetrics.verticesCount}):
              </span>
              <div className="bg-white/80 dark:bg-slate-950/80 p-2 rounded-lg font-mono text-[10px] space-y-0.5 text-slate-700 dark:text-slate-300 max-h-20 overflow-y-auto">
                {aoiMetrics.vertices.map((v, i) => (
                  <div key={i} className="flex justify-between">
                    <span>Vertex #{i + 1}:</span>
                    <span>{v[0]}° N, {v[1]}° E</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-1.5 border-t border-outline-variant/40">
            <span className="text-on-surface-variant text-[11px] font-medium">Dataset Status:</span>
            <span className="font-semibold text-emerald-800 text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
              {selectedPreset.dataset}
            </span>
          </div>
        </div>

        <div>
          <span className="text-[10px] text-on-surface-variant font-extrabold block mb-1.5 uppercase tracking-wider">
            Quick Region Selectors:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`text-[10px] px-2.5 py-1.5 rounded-xl border text-left font-semibold truncate transition-all cursor-pointer ${
                  selectedPreset.name === p.name
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm font-bold'
                    : 'bg-surface hover:bg-surface-container-high text-on-surface border-outline-variant/60'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={handleSaveAOI}
            className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-2.5 rounded-xl font-bold text-xs border border-outline-variant/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#1D4ED8]">bookmark</span>
            <span>Save AOI Boundary</span>
          </button>

          <button
            onClick={handleStartAnalysis}
            className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3.5 rounded-xl font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-t border-[#FF9933]/50"
          >
            <span>Start Satellite Analysis</span>
            <span className="material-symbols-outlined text-base text-[#FF9933]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* LAYER SELECTOR MENU (BOTTOM LEFT) */}
      <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#E2E8F0] dark:border-slate-800 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-on-surface shadow-2xl flex items-center gap-2 hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#1D4ED8] text-lg">layers</span>
            <span>Layer: {activeLayer}</span>
            <span className="material-symbols-outlined text-xs">expand_more</span>
          </button>

          {showLayerMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-900 border border-outline-variant/60 rounded-2xl shadow-2xl p-2 text-xs space-y-1 z-40">
              {(['Satellite', 'Terrain', 'Hybrid', 'Streets'] as const).map((layer) => (
                <button
                  key={layer}
                  onClick={() => handleLayerChange(layer)}
                  className={`w-full text-left px-3 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                    activeLayer === layer
                      ? 'bg-[#1D4ED8] text-white shadow-sm'
                      : 'text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {showSaveToast && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/50 flex items-center gap-3 animate-bounce text-xs font-bold">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span>AOI Boundary & Coordinates Saved Successfully!</span>
        </div>
      )}
    </div>
  );
}
