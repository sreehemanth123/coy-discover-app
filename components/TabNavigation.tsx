'use client';

import React from 'react';
import { Compass, Heart, Home as HomeIcon } from 'lucide-react';

export type TabType = 'home' | 'discover' | 'matches';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  matchesCount: number;
  feedCount: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  matchesCount,
  feedCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 glass-nav px-6 py-2.5 pb-5">
      <div className="flex items-center justify-around">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all duration-200 relative py-1 px-3 rounded-xl ${
            activeTab === 'home'
              ? 'text-white scale-105'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          aria-label="Home Tab"
        >
          <HomeIcon className={`w-6 h-6 ${activeTab === 'home' ? 'stroke-[2.5px] text-pink-500' : 'stroke-[1.75px]'}`} />
          <span className="text-[11px] font-medium tracking-tight">Home</span>
          {activeTab === 'home' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-pink-500" />
          )}
        </button>

        {/* Discover Tab */}
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center gap-1 transition-all duration-200 relative py-1 px-3 rounded-xl ${
            activeTab === 'discover'
              ? 'text-white scale-105'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          aria-label="Discover Tab"
        >
          <div className="relative">
            <Compass
              className={`w-6 h-6 ${
                activeTab === 'discover'
                  ? 'stroke-[2.5px] text-coy-500'
                  : 'stroke-[1.75px]'
              }`}
            />
            {feedCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-[10px] font-bold text-white px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-sm">
                {feedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium tracking-tight">Discover</span>
          {activeTab === 'discover' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-pink-500" />
          )}
        </button>

        {/* Matches Tab */}
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex flex-col items-center gap-1 transition-all duration-200 relative py-1 px-3 rounded-xl ${
            activeTab === 'matches'
              ? 'text-white scale-105'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          aria-label="Matches Tab"
        >
          <div className="relative">
            <Heart
              className={`w-6 h-6 ${
                activeTab === 'matches'
                  ? 'stroke-[2.5px] text-rose-500 fill-rose-500/20'
                  : 'stroke-[1.75px]'
              }`}
            />
            {matchesCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-[10px] font-bold text-white px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-glow-pink">
                {matchesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium tracking-tight">Matches</span>
          {activeTab === 'matches' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>
      </div>
    </nav>
  );
};
