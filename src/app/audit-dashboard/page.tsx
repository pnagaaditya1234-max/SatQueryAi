'use client';

import React, { useState } from 'react';
import GovtHeader from '@/components/GovtHeader';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import NoticeBanner from '@/components/NoticeBanner';
import UploadModal from '@/components/UploadModal';

export default function AuditDashboardPage() {
  const [isUploading, setIsUploading] = useState(false);

  const logs = [
    {
      timestamp: '2026-02-26T14:22:01.402Z',
      node: 'SHADNAGAR-NODE-01',
      task: 'QUERY_EXECUTION',
      hash: 'sha256:9f8a...3b2c',
      status: 'VERIFIED',
      message: 'Executed natural language query parsing. Spatial bounding polygon WGS84 validated.',
    },
    {
      timestamp: '2026-02-26T14:22:02.120Z',
      node: 'BYLAKUPPE-NODE-04',
      task: 'RASTER_DOWNLINK',
      hash: 'sha256:4d1e...9a0f',
      status: 'VERIFIED',
      message: 'Cartosat-3 0.35m Panchromatic raster tiles (142MB) ingested into GPU VRAM.',
    },
    {
      timestamp: '2026-02-26T14:22:02.840Z',
      node: 'GPU-CLUSTER-02',
      task: 'NDVI_COMPUTATION',
      hash: 'sha256:7c8b...1e2d',
      status: 'VERIFIED',
      message: 'Multi-spectral matrix subtraction completed across 14,200,000 spatial cells.',
    },
    {
      timestamp: '2026-02-26T14:22:03.110Z',
      node: 'NIC-CLOUD-AUDIT',
      task: 'AUDIT_SIGNING',
      hash: 'sha256:2a4f...8c9d',
      status: 'SIGNED',
      message: 'Government compliance receipt issued. Cryptographic signature attached.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <GovtHeader onOpenUpload={() => setIsUploading(true)} />
      <Breadcrumbs currentTitle="Execution Trace & RTI Audit" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <NoticeBanner
            title="RTI Data Compliance & Audit Trail"
            message="All computational steps, memory allocations, and cryptographic signatures in this trace are logged to comply with Right to Information (RTI Act 2005) and NIC cloud security policy."
            type="verified"
          />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                Execution Trace & Algorithmic Audit Dashboard
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                Immutable system audit trail, node telemetry logs, and RTI data compliance verification.
              </p>
            </div>

            <button
              onClick={() => alert('Exporting full RTI audit log CSV...')}
              className="bg-secondary text-white px-4 py-2 text-xs font-bold rounded-lg shadow-xs hover:bg-secondary/90 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>Export Audit Trail (CSV)</span>
            </button>
          </div>

          {/* Cluster Status Widget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-semibold text-on-surface-variant">GPU VRAM Utilization</span>
              <p className="text-xl font-extrabold text-on-surface mt-1">14.2 GB / 24 GB</p>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary h-full w-[59%]"></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-semibold text-on-surface-variant">Inter-Node RPC Latency</span>
              <p className="text-xl font-extrabold text-emerald-700 mt-1">12 ms</p>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Optimal Throughput</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-semibold text-on-surface-variant">Audit Signature Key</span>
              <p className="text-xs font-mono font-bold text-on-surface mt-1 truncate">0x9f8a...3b2c</p>
              <span className="text-[11px] text-on-surface-variant block mt-1">HMAC-SHA256 Signed</span>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-outline-variant/40 flex items-center justify-between">
              <h2 className="font-bold text-sm text-on-surface">System Trace Logs</h2>
              <span className="text-xs font-mono text-on-surface-variant">Live Event Stream</span>
            </div>

            <div className="divide-y divide-outline-variant/30 text-xs">
              {logs.map((log, index) => (
                <div key={index} className="p-4 hover:bg-surface-container-low/50 transition-colors space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                    <span>{log.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface">{log.node}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {log.status}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold text-on-surface text-xs">{log.message}</p>
                  <p className="font-mono text-[11px] text-on-surface-variant">
                    Task: <strong>{log.task}</strong> • Signature: {log.hash}
                  </p>
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
