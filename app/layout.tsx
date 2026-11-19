import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coy — Discover & Crush Matching',
  description: 'Anonymous crush matching & swipe-based discovery tab for Coy',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0e0f14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090a0f] text-slate-100 min-h-screen flex flex-col items-center justify-start antialiased selection:bg-coy-500 selection:text-white">
        <div className="w-full max-w-md min-h-screen bg-[#0e0f14] shadow-2xl relative flex flex-col overflow-hidden border-x border-white/5">
          {children}
        </div>
      </body>
    </html>
  );
}
