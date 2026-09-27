import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/components/AccessibilityContext";

export const metadata: Metadata = {
  title: "SAT AI | Official Government of India Satellite Intelligence Platform",
  description:
    "Official Government of India Satellite Intelligence Platform developed by ISRO & NIC under Digital India and PM GatiShakti Framework.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-body-md antialiased selection:bg-secondary selection:text-white">
        <AccessibilityProvider>{children}</AccessibilityProvider>
      </body>
    </html>
  );
}


