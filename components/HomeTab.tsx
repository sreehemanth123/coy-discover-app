'use client';

import React from 'react';
import { Compass, Sparkles, ShieldCheck, HeartHandshake, Lock } from 'lucide-react';

interface HomeTabProps {
  onGoToDiscover: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onGoToDiscover }) => {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-10 pb-24 text-center">
      {/* Header */}
      <div className="space-y-3 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Home Tab (Placeholder)</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
          Coy
        </h1>
        <p className="text-zinc-400 text-sm max-w-xs mx-auto leading-relaxed">
          The double-blind crush app where feelings stay private until they&apos;re mutual.
        </p>
      </div>

      {/* Visual Placeholder Card */}
      <div className="my-8 p-6 rounded-2xl glass-panel space-y-5 text-left border border-white/5 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Strict Double-Blind Privacy</h3>
            <p className="text-xs text-zinc-400">No one ever knows who liked them unless it is mutual.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Crush Matching System</h3>
            <p className="text-xs text-zinc-400">Add crushes via phone or email without breaking cover.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Encrypted &amp; Verified</h3>
            <p className="text-xs text-zinc-400">Zero spam, zero public search, 100% private.</p>
          </div>
        </div>
      </div>

      {/* CTA to Discover Tab */}
      <div className="space-y-3">
        <p className="text-xs text-zinc-500">
          As instructed in the assignment, Home is a placeholder. All discovery and swipe functionality is built in the Discover Tab.
        </p>
        <button
          onClick={onGoToDiscover}
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-glow-pink flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Compass className="w-4 h-4" />
          <span>Launch Discover Tab</span>
        </button>
      </div>
    </div>
  );
};
