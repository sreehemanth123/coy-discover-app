'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfilePublic } from '@/data/seedProfiles';

interface MatchCelebrationModalProps {
  match: ProfilePublic | null;
  onClose: () => void;
  onViewMatches: () => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  match,
  onClose,
  onViewMatches,
}) => {
  useEffect(() => {
    if (match) {
      // Trigger festive confetti explosion
      const count = 200;
      const defaults = {
        origin: { y: 0.6 },
        zIndex: 9999,
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#ff2d60', '#ff6b8b', '#ffffff'],
      });
      fire(0.2, {
        spread: 60,
        colors: ['#ff2d60', '#f43f75', '#a855f7'],
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#ec4899', '#fb7185', '#ffd700'],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [match]);

  if (!match) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="w-full max-w-sm rounded-3xl p-6 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-[#1c1224] via-[#14121d] to-[#0e0f14] border border-pink-500/30 shadow-[0_0_50px_-10px_rgba(244,63,117,0.5)]"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-32 bg-pink-500/20 blur-3xl pointer-events-none" />

          {/* Celebration Header */}
          <div className="space-y-1 relative z-10 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mutual Match Unlocked</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight italic bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
              It&apos;s a Match!
            </h2>
            <p className="text-zinc-300 text-sm font-medium">
              You and <span className="text-pink-400 font-bold">{match.name}</span> both liked each other!
            </p>
          </div>

          {/* Connected Avatars */}
          <div className="relative flex items-center justify-center py-4">
            {/* User Avatar Placeholder */}
            <div className="w-24 h-24 rounded-full border-4 border-zinc-700 overflow-hidden shadow-xl bg-zinc-800 -mr-3 relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Glowing Heart Intersect */}
            <div className="z-20 w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-glow-pink animate-pulse-glow">
              <Heart className="w-6 h-6 fill-white" />
            </div>

            {/* Matched Profile Avatar */}
            <div className="w-24 h-24 rounded-full border-4 border-pink-500 overflow-hidden shadow-glow-pink bg-zinc-800 -ml-3 relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={match.photo}
                alt={match.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Quick Context Pill */}
          <div className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-zinc-300">
            {match.college ? `${match.college} • ${match.city}` : match.city}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onViewMatches}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white shadow-glow-pink flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Say Hi in Matches</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-zinc-400 hover:text-zinc-200 transition"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
