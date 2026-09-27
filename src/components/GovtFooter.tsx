'use client';

import React from 'react';
import Link from 'next/link';

export default function GovtFooter() {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-12 border-t-4 border-[#FF9933] mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 space-y-12">
        {/* Top Footer Section: Emblems & Agency Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Emblem & Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-12 object-contain bg-white/10 p-1 rounded border border-white/20"
                alt="State Emblem of India"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL40emYAMlB8cDiJHozYFY32UXOUdZu-jkXj6imQwccyRJG9k9X0NhZwSCWLHNux4meGPSxBOZ78Ib2sppNp0s77GEaDo8farorgjAFgiS6PeOy1cIbEQeiC8vQt_apFOjGtTeuI8Z3gHwAdig_RG4nWlxfJnm7fSNnc5dmy6LbTn2Sl-yCswVwkK48rDd0vJzQSUwQQgIciy89B3z9y0VvAuZyoyYBs-uUoWrSWx57n1tzF_Rm3e3sg"
              />
              <div>
                <h3 className="font-extrabold text-base tracking-tight">Government of India</h3>
                <p className="text-xs text-amber-400 font-semibold">SATQUERY AI – Satellite Intelligence Platform</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              Designed, developed, and maintained by the Indian Space Research Organisation (ISRO) and National Informatics Centre (NIC) under Digital India & PM GatiShakti Framework.
            </p>

            {/* Institutional Agency Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* ISRO Badge */}
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded border border-white/20 text-xs font-bold">
                <span className="w-5 h-5 rounded bg-primary-container text-white flex items-center justify-center text-[9px] font-black">
                  ISRO
                </span>
                <span>ISRO Earth Observation</span>
              </div>

              {/* Digital India Badge */}
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded border border-white/20 text-xs font-bold">
                <span className="w-5 h-5 rounded bg-blue-700 text-white flex items-center justify-center text-[9px] font-black">
                  DI
                </span>
                <span>Digital India</span>
              </div>

              {/* NIC Badge */}
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded border border-white/20 text-xs font-bold">
                <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[9px] font-black">
                  NIC
                </span>
                <span>NIC Cloud</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider mb-4">
              Government Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  SAT AI Home
                </Link>
              </li>
              <li>
                <Link href="/citizen-dashboard" className="hover:text-white transition-colors">
                  Citizen Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analysis-workspace" className="hover:text-white transition-colors">
                  Satellite Analysis
                </Link>
              </li>
              <li>
                <Link href="/flagship-portal" className="hover:text-white transition-colors">
                  PM GatiShakti Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider mb-4">
              Missions & Telemetry
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/evidence-explorer" className="hover:text-white transition-colors">
                  Cartosat & RISAT Data
                </Link>
              </li>
              <li>
                <Link href="/command-center" className="hover:text-white transition-colors">
                  Disaster Emergency Watch
                </Link>
              </li>
              <li>
                <Link href="/results-dashboard" className="hover:text-white transition-colors">
                  Evidence Reports
                </Link>
              </li>
              <li>
                <Link href="/audit-dashboard" className="hover:text-white transition-colors">
                  Execution Trace & Audit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider mb-4">
              Compliance & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/audit-dashboard" className="hover:text-white transition-colors">
                  RTI (Right to Information)
                </Link>
              </li>
              <li>
                <Link href="/dataset-validation" className="hover:text-white transition-colors">
                  Website Policies
                </Link>
              </li>
              <li>
                <Link href="/reasoning-engine" className="hover:text-white transition-colors">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/command-center" className="hover:text-white transition-colors">
                  Feedback & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Mandatory Policy Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400 pt-2 border-b border-white/10 pb-6 font-medium">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Accessibility
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/command-center" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="/citizen-dashboard" className="hover:text-white transition-colors">
              Feedback
            </Link>
            <Link href="/audit-dashboard" className="hover:text-white transition-colors">
              RTI
            </Link>
            <Link href="/flagship-portal" className="hover:text-white transition-colors">
              Website Policies
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded font-mono text-[11px] border border-emerald-500/30">
              Version 1.0
            </span>
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono text-[11px] border border-amber-500/30">
              Prototype for Smart India Hackathon 2026
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400 font-medium">
          <p>© 2026 Government of India. All rights reserved. Content owned and maintained by Indian Space Research Organisation (ISRO).</p>
        </div>
      </div>
    </footer>
  );
}
