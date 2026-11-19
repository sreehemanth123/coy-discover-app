'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import { SwipeCard } from './SwipeCard';
import { ProfileDetailModal } from './ProfileDetailModal';
import { MatchCelebrationModal } from './MatchCelebrationModal';
import { ProfilePublic } from '@/data/seedProfiles';

interface DiscoverTabProps {
  feed: ProfilePublic[];
  setFeed: React.Dispatch<React.SetStateAction<ProfilePublic[]>>;
  loading: boolean;
  onRefreshFeed: () => void;
  onMatchCreated: (matchedProfile: ProfilePublic) => void;
  onGoToMatches: () => void;
}

export const DiscoverTab: React.FC<DiscoverTabProps> = ({
  feed,
  setFeed,
  loading,
  onRefreshFeed,
  onMatchCreated,
  onGoToMatches,
}) => {
  const [activeMatch, setActiveMatch] = useState<ProfilePublic | null>(null);
  const [detailProfile, setDetailProfile] = useState<ProfilePublic | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Keyboard navigation for desktop users (ArrowLeft = Pass, ArrowRight = Like)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (detailProfile || activeMatch || feed.length === 0 || isSwiping) return;

      if (e.key === 'ArrowLeft') {
        handleSwipe('pass');
      } else if (e.key === 'ArrowRight') {
        handleSwipe('like');
      }
    },
    [detailProfile, activeMatch, feed, isSwiping]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSwipe = async (action: 'like' | 'pass') => {
    if (feed.length === 0 || isSwiping) return;

    setIsSwiping(true);
    const currentProfile = feed[0];

    // Optimistically advance feed card
    setFeed((prev) => prev.slice(1));

    try {
      const res = await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: currentProfile.id,
          action,
        }),
      });

      const data = await res.json();

      if (data.success && data.matched && data.match) {
        setActiveMatch(data.match);
        onMatchCreated(data.match);
      }
    } catch (err) {
      console.error('Failed to record swipe:', err);
    } finally {
      setIsSwiping(false);
    }
  };

  const handleResetDemo = async () => {
    if (resetting) return;
    setResetting(true);
    try {
      await fetch('/api/reset', { method: 'POST' });
      onRefreshFeed();
    } catch (err) {
      console.error('Failed to reset demo:', err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-24 max-w-md mx-auto w-full h-[calc(100vh-80px)] select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
          <h1 className="text-xl font-black tracking-tight text-white">Discover</h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
            {feed.length} profiles left
          </span>
        </div>

        <button
          onClick={handleResetDemo}
          disabled={resetting}
          title="Reset demo deck to test again"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition active:scale-95 flex items-center gap-1.5 text-xs"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Reset Deck</span>
        </button>
      </div>

      {/* Main Card Deck Area */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-[460px]">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-zinc-400">Loading discover cards...</p>
          </div>
        ) : feed.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center p-8 glass-panel rounded-3xl border border-white/10 space-y-5 max-w-xs shadow-glow-card"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-glow-pink">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">All Caught Up!</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You&apos;ve swiped through all available profiles in your area.
              </p>
            </div>

            <div className="w-full space-y-2.5 pt-2">
              <button
                onClick={onGoToMatches}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white shadow-glow-pink flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>View Your Matches</span>
              </button>

              <button
                onClick={handleResetDemo}
                disabled={resetting}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-white/15 text-zinc-300 hover:bg-white/5 transition flex items-center justify-center gap-2"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
                <span>Reset Demo Deck (32 Profiles)</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Cards Deck */
          <div className="relative w-full h-full max-h-[580px]">
            {/* Background card (peeking) */}
            {feed.length > 1 && (
              <SwipeCard
                key={feed[1].id}
                profile={feed[1]}
                isTop={false}
                onSwipe={() => {}}
                onOpenDetails={() => {}}
              />
            )}

            {/* Top draggable card */}
            <AnimatePresence>
              {feed.length > 0 && (
                <SwipeCard
                  key={feed[0].id}
                  profile={feed[0]}
                  isTop={true}
                  onSwipe={handleSwipe}
                  onOpenDetails={(prof) => setDetailProfile(prof)}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Action Buttons (Pass & Like) */}
      {feed.length > 0 && !loading && (
        <div className="flex items-center justify-center gap-6 pt-4 pb-2 z-30">
          {/* Pass Button */}
          <button
            onClick={() => handleSwipe('pass')}
            disabled={isSwiping}
            aria-label="Pass profile (or swipe left)"
            className="w-14 h-14 rounded-full bg-[#161822] hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg hover:border-rose-500"
          >
            <X className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Info Button */}
          <button
            onClick={() => feed[0] && setDetailProfile(feed[0])}
            aria-label="View info"
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 border border-white/10 flex items-center justify-center transition active:scale-90"
          >
            <AlertCircle className="w-5 h-5" />
          </button>

          {/* Like Button */}
          <button
            onClick={() => handleSwipe('like')}
            disabled={isSwiping}
            aria-label="Like profile (or swipe right)"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-glow-pink border border-pink-400/50"
          >
            <Heart className="w-7 h-7 fill-white stroke-none" />
          </button>
        </div>
      )}

      {/* Keyboard Shortcuts Hint for Desktop */}
      {feed.length > 0 && !loading && (
        <div className="text-center pt-1 text-[11px] text-zinc-500">
          Tip: Drag cards or press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-zinc-300">←</kbd> to Pass / <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-zinc-300">→</kbd> to Like
        </div>
      )}

      {/* Modals */}
      <ProfileDetailModal
        profile={detailProfile}
        onClose={() => setDetailProfile(null)}
        onLike={() => handleSwipe('like')}
        onPass={() => handleSwipe('pass')}
      />

      <MatchCelebrationModal
        match={activeMatch}
        onClose={() => setActiveMatch(null)}
        onViewMatches={() => {
          setActiveMatch(null);
          onGoToMatches();
        }}
      />
    </div>
  );
};
