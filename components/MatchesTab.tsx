'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MessageSquare, Compass, Calendar, GraduationCap, MapPin, Search } from 'lucide-react';
import { MatchedProfileWithMeta } from '@/lib/db';

interface MatchesTabProps {
  matches: MatchedProfileWithMeta[];
  loading: boolean;
  onGoToDiscover: () => void;
}

export const MatchesTab: React.FC<MatchesTabProps> = ({
  matches,
  loading,
  onGoToDiscover,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<MatchedProfileWithMeta | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = matches.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatMatchTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 pt-6 pb-24 max-w-md mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-pink-400 font-semibold mb-1">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            <span>Mutual Connections</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Your Matches</h1>
        </div>

        <div className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold">
          {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
        </div>
      </div>

      {/* Search Bar */}
      {matches.length > 0 && (
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matches by name, college, or tags..."
            className="w-full bg-[#161822] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-pink-500/50 transition"
          />
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-zinc-400">Loading your matches...</p>
          </div>
        </div>
      ) : matches.length === 0 ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
          <div className="w-20 h-20 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-glow-pink">
            <Sparkles className="w-9 h-9" />
          </div>
          <div className="space-y-1.5 max-w-xs">
            <h3 className="text-lg font-bold text-white">No matches yet</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When someone you like also likes you back, your mutual match will appear right here.
            </p>
          </div>

          <button
            onClick={onGoToDiscover}
            className="py-3 px-6 rounded-xl font-semibold text-xs bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white shadow-glow-pink flex items-center gap-2 transition active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Start Swiping in Discover</span>
          </button>
        </div>
      ) : filteredMatches.length === 0 ? (
        /* No search results */
        <div className="text-center py-12 text-zinc-400 text-xs">
          No matches found matching &quot;{searchQuery}&quot;
        </div>
      ) : (
        /* Matches Grid / List */
        <div className="space-y-3 overflow-y-auto">
          {filteredMatches.map((match) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedMatch(match)}
              className="p-3 rounded-2xl glass-panel hover:border-pink-500/40 cursor-pointer transition-all duration-200 flex items-center gap-3.5 group relative overflow-hidden"
            >
              {/* Photo Avatar */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-pink-500/50 transition">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={match.photo}
                  alt={match.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#161822]" />
              </div>

              {/* Match Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white truncate group-hover:text-pink-300 transition">
                    {match.name}, {match.age}
                  </h3>
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatMatchTime(match.matchedAt)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span className="truncate">{match.college || match.city}</span>
                </div>

                <div className="flex items-center gap-1 overflow-hidden">
                  {match.interests.slice(0, 2).map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-white/5 text-zinc-300 px-1.5 py-0.5 rounded"
                    >
                      #{interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition">
                <MessageSquare className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Match Conversation Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="w-full max-w-md bg-[#161822] rounded-t-3xl sm:rounded-3xl p-6 border border-white/10 shadow-2xl space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-pink-500/50 shadow-glow-pink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedMatch.photo}
                  alt={selectedMatch.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  {selectedMatch.name}, {selectedMatch.age}
                </h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
                  {selectedMatch.college}
                </p>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {selectedMatch.city}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <p className="text-xs text-zinc-300 italic">&ldquo;{selectedMatch.bio}&rdquo;</p>
            </div>

            {/* Icebreaker suggestions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Conversation Starters</span>
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => alert(`Message sent to ${selectedMatch.name}!`)}
                  className="w-full text-left text-xs p-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-200 border border-pink-500/20 transition"
                >
                  &ldquo;Hey! Saw you&apos;re into #{selectedMatch.interests[0]}. What got you started with that?&rdquo;
                </button>
                {selectedMatch.interests[1] && (
                  <button
                    onClick={() => alert(`Message sent to ${selectedMatch.name}!`)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition"
                  >
                    &ldquo;Hey {selectedMatch.name}, your bio made me laugh! How is {selectedMatch.college} treating you?&rdquo;
                  </button>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedMatch(null)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition"
            >
              Back to Matches
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
