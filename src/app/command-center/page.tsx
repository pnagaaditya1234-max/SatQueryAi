'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';

export default function CommandCenterPage() {
  const [isUploading, setIsUploading] = useState(false);

  const groundStations = [
    {
      name: 'Bylakuppe Ground Station',
      location: 'Karnataka',
      status: 'ONLINE',
      signal: '98%',
      downlink: '4.8 Gbps',
      pass: 'CARTOSAT-3 (Overhead in 04m 12s)',
    },
    {
      name: 'Shadnagar Satellite Complex',
      location: 'Telangana',
      status: 'ONLINE',
      signal: '99%',
      downlink: '9.6 Gbps',
      pass: 'RISAT-1A (Overhead in 12m 45s)',
    },
    {
      name: 'Bharati Station (Antarctica)',
      location: 'Larsemann Hills',
      status: 'ONLINE',
      signal: '94%',
      downlink: '2.4 Gbps',
      pass: 'EOS-04 (Polar Pass Active)',
    },
  ];

  const incidents = [
    {
      id: 'ALERT-2026-092',
      title: 'Assam Brahmaputra River Basin Inundation Alert',
      severity: 'CRITICAL',
      severityColor: 'bg-rose-100 text-rose-800 border-rose-300',
      sensor: 'RISAT-1A SAR Radar',
      location: 'Kaziranga & Majuli Island Sector',
      details: 'Automated flood extent mapping indicates +24.2% water rise across 12 districts.',
    },
    {
      id: 'ALERT-2026-091',
      title: 'Tropical Depression Tracking - Bay of Bengal',
      severity: 'HIGH',
      severityColor: 'bg-amber-100 text-amber-800 border-amber-300',
      sensor: 'INSAT-3DR Sounder',
      location: 'Odisha Coast 240km Offshore',
      details: 'Sustained winds 65 km/h. Sea surface temperature (SST) elevated by 1.8°C.',
    },
    {
      id: 'ALERT-2026-089',
      title: 'Thermal Anomaly / Forest Fire Detection',
      severity: 'MODERATE',
      severityColor: 'bg-blue-100 text-blue-800 border-blue-300',
      sensor: 'EOS-04 Thermal IR',
      location: 'Simlipal Biosphere Reserve Odisha',
      details: 'Identified 4 localized thermal hotspots exceeding 42°C threshold.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="Command Center & Contact Operations" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <NoticeBanner
            title="Real-Time Command Telemetry Stream"
            message="National ground station telemetry feeds (Shadnagar, Bylakuppe, Bharati) operate 24/7 with automated NDMA disaster notification triggers."
            type="verified"
          />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                ISRO Ground Station & Satellite Command Center
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                24/7 National Telemetry Monitoring, Orbital Pass Schedules, and Emergency Disaster Watches.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Telemetry Stream Live
              </span>
            </div>
          </div>

          {/* Ground Station Grid */}
          <div className="space-y-3">
            <h2 className="font-bold text-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">cell_tower</span>
              <span>Active ISRO Telemetry Ground Stations</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {groundStations.map((gs, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-xs space-y-4 hover:border-secondary transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-on-surface">{gs.name}</h3>
                      <p className="text-xs text-on-surface-variant">{gs.location}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {gs.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Signal Quality:</span>
                      <span className="font-bold text-emerald-700">{gs.signal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Downlink Speed:</span>
                      <span className="font-bold text-secondary">{gs.downlink}</span>
                    </div>
                    <div className="p-2 bg-surface-container-low rounded border border-outline-variant/40 text-[11px]">
                      <span className="text-on-surface-variant block mb-0.5">Current Pass:</span>
                      <span className="font-bold text-on-surface">{gs.pass}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disaster & Incident Watch Section */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600">emergency_share</span>
                <h2 className="font-bold text-sm text-on-surface">National Disaster & Emergency Watch Stream</h2>
              </div>
              <span className="text-xs text-on-surface-variant font-mono">Auto-Trigger SLA: &lt; 5 minutes</span>
            </div>

            <div className="space-y-4">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-4 rounded-xl border bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-secondary transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-on-surface-variant">{inc.id}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${inc.severityColor}`}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">Sensor: {inc.sensor}</span>
                    </div>
                    <h3 className="font-bold text-sm text-on-surface">{inc.title}</h3>
                    <p className="text-xs text-on-surface-variant">{inc.details}</p>
                    <p className="text-[11px] text-secondary font-semibold">Location: {inc.location}</p>
                  </div>

                  <button
                    onClick={() => alert(`Opening live spatial telemetry feed for ${inc.id}`)}
                    className="px-4 py-2 bg-secondary text-white font-bold text-xs rounded-lg shadow-xs hover:bg-secondary/90 transition-colors shrink-0"
                  >
                    Open Live Spatial Feed
                  </button>
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
