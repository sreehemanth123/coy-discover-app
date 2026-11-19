'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TabNavigation, TabType } from '@/components/TabNavigation';
import { HomeTab } from '@/components/HomeTab';
import { DiscoverTab } from '@/components/DiscoverTab';
import { MatchesTab } from '@/components/MatchesTab';
import { ProfilePublic } from '@/data/seedProfiles';
import { MatchedProfileWithMeta } from '@/lib/db';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [feed, setFeed] = useState<ProfilePublic[]>([]);
  const [matches, setMatches] = useState<MatchedProfileWithMeta[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);

  // Fetch feed (profiles not yet swiped)
  const fetchFeed = useCallback(async () => {
    setLoadingFeed(true);
    try {
      const res = await fetch('/api/feed');
      const data = await res.json();
      if (data.success && Array.isArray(data.profiles)) {
        setFeed(data.profiles);
      }
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoadingFeed(false);
    }
  }, []);

  // Fetch mutual matches
  const fetchMatches = useCallback(async () => {
    setLoadingMatches(true);
    try {
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.success && Array.isArray(data.matches)) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setLoadingMatches(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
    fetchMatches();
  }, [fetchFeed, fetchMatches]);

  const handleMatchCreated = (newMatch: ProfilePublic) => {
    fetchMatches();
  };

  return (
    <main className="flex-1 flex flex-col justify-between relative overflow-hidden bg-[#0e0f14]">
      {/* Dynamic View rendering based on active tab */}
      {activeTab === 'home' && (
        <HomeTab onGoToDiscover={() => setActiveTab('discover')} />
      )}

      {activeTab === 'discover' && (
        <DiscoverTab
          feed={feed}
          setFeed={setFeed}
          loading={loadingFeed}
          onRefreshFeed={() => {
            fetchFeed();
            fetchMatches();
          }}
          onMatchCreated={handleMatchCreated}
          onGoToMatches={() => setActiveTab('matches')}
        />
      )}

      {activeTab === 'matches' && (
        <MatchesTab
          matches={matches}
          loading={loadingMatches}
          onGoToDiscover={() => setActiveTab('discover')}
        />
      )}

      {/* Persistent Bottom Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matches.length}
        feedCount={feed.length}
      />
    </main>
  );
}
