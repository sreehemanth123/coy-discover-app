'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { GraduationCap, MapPin, Info, CheckCircle2 } from 'lucide-react';
import { ProfilePublic } from '@/data/seedProfiles';

interface SwipeCardProps {
  profile: ProfilePublic;
  isTop: boolean;
  onSwipe: (action: 'like' | 'pass') => void;
  onOpenDetails: (profile: ProfilePublic) => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  isTop,
  onSwipe,
  onOpenDetails,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 100;
    const velocityThreshold = 400;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipe('like');
    } else if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      onSwipe('pass');
    }
  };

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        cursor: isTop ? 'grab' : 'default',
      }}
      whileTap={isTop ? { cursor: 'grabbing' } : undefined}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 8, opacity: isTop ? 1 : 0.6 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 8, opacity: isTop ? 1 : 0.6 }}
      exit={{
        x: x.get() < 0 ? -400 : 400,
        opacity: 0,
        rotate: x.get() < 0 ? -25 : 25,
        transition: { duration: 0.25 },
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 260 }}
      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-glow-card bg-[#161822] select-none touch-none border border-white/10"
    >
      {/* Background Profile Photo */}
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover pointer-events-none"
          loading="eager"
        />

        {/* Gradient Vignette for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-[#0e0f14]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none h-24" />

        {/* Dynamic LIKE Stamp (Visible when dragged Right) */}
        {isTop && (
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-6 pointer-events-none z-30 transform -rotate-12"
          >
            <div className="px-4 py-1.5 border-4 border-emerald-400 bg-emerald-500/20 backdrop-blur-sm rounded-xl shadow-glow-green">
              <span className="text-2xl font-black text-emerald-400 tracking-wider">
                LIKE
              </span>
            </div>
          </motion.div>
        )}

        {/* Dynamic NOPE Stamp (Visible when dragged Left) */}
        {isTop && (
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-6 pointer-events-none z-30 transform rotate-12"
          >
            <div className="px-4 py-1.5 border-4 border-rose-500 bg-rose-500/20 backdrop-blur-sm rounded-xl shadow-glow-pink">
              <span className="text-2xl font-black text-rose-500 tracking-wider">
                PASS
              </span>
            </div>
          </motion.div>
        )}

        {/* Profile Details Container */}
        <div className="absolute bottom-0 inset-x-0 p-5 text-white z-20 space-y-3 pointer-events-auto">
          {/* Name, Age & Quick Info Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight drop-shadow-md">
                {profile.name}, {profile.age}
              </h2>
              <CheckCircle2 className="w-5 h-5 text-pink-500 fill-pink-500/20 inline-block" />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(profile);
              }}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition active:scale-95 border border-white/20"
              aria-label="View profile info"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {/* Meta: College & City */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-300">
            {profile.college && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
                {profile.college}
              </span>
            )}
            {profile.city && (
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {profile.city}
              </span>
            )}
          </div>

          {/* Bio Preview */}
          <p className="text-xs text-zinc-300/95 leading-relaxed line-clamp-2 drop-shadow">
            {profile.bio}
          </p>

          {/* Interest Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.interests.slice(0, 3).map((interest, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-pink-500/20 text-pink-200 border border-pink-500/30 px-2 py-0.5 rounded-lg"
              >
                #{interest}
              </span>
            ))}
            {profile.interests.length > 3 && (
              <span className="text-[10px] text-zinc-400 self-center">
                +{profile.interests.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
