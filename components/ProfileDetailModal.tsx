'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShieldCheck, GraduationCap, MapPin } from 'lucide-react';
import { ProfilePublic } from '@/data/seedProfiles';

interface ProfileDetailModalProps {
  profile: ProfilePublic | null;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  onClose,
  onLike,
  onPass,
}) => {
  if (!profile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-[#161822] rounded-t-3xl sm:rounded-3xl max-h-[88vh] overflow-y-auto border border-white/10 shadow-2xl flex flex-col relative"
        >
          {/* Close Floating Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition active:scale-95"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Photo */}
          <div className="relative w-full h-80 sm:h-96 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161822] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Body Content */}
          <div className="p-6 -mt-10 relative z-10 space-y-5">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {profile.name}, <span className="font-semibold text-zinc-300">{profile.age}</span>
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-zinc-400">
                <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
                  {profile.college}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {profile.city}
                </span>
              </div>
            </div>

            {/* About Me / Bio */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">About</h3>
              <p className="text-sm text-zinc-200 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
                {profile.bio}
              </p>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Passions &amp; Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-pink-500/10 text-pink-300 border border-pink-500/25 px-3 py-1 rounded-xl"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Coy Privacy Guarantee:</strong> Swiping right on {profile.name} will never be revealed unless they also like you. Your identity is always protected.
              </p>
            </div>

            {/* Action Buttons in Modal */}
            <div className="flex items-center justify-center gap-4 pt-2 pb-4">
              <button
                onClick={() => {
                  onPass();
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <X className="w-4 h-4" />
                <span>Pass</span>
              </button>
              <button
                onClick={() => {
                  onLike();
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white shadow-glow-pink flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Like Profile</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
