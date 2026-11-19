import fs from 'fs';
import path from 'path';
import { SEED_PROFILES, ProfileInternal, ProfilePublic } from '@/data/seedProfiles';

export interface SwipeRecord {
  profileId: string;
  action: 'like' | 'pass';
  timestamp: string;
}

export interface MatchRecord {
  profileId: string;
  matchedAt: string;
}

export interface MatchedProfileWithMeta extends ProfilePublic {
  matchedAt: string;
}

export interface DatabaseState {
  profiles: ProfileInternal[];
  swipes: SwipeRecord[];
  matches: MatchRecord[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'coy_db.json');

// Helper to strip server-only fields ensuring privacy (Never reveal who liked the user)
export function sanitizeProfile(profile: ProfileInternal): ProfilePublic {
  const { hasLikedUser, ...publicFields } = profile;
  return publicFields;
}

class CoyDatabase {
  private state: DatabaseState | null = null;

  private init(): DatabaseState {
    if (this.state) {
      return this.state;
    }

    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        this.state = JSON.parse(raw);
        return this.state!;
      }
    } catch (err) {
      console.error('Failed reading database file, re-initializing from seed', err);
    }

    // Default initialization from seed profiles
    this.state = {
      profiles: [...SEED_PROFILES],
      swipes: [],
      matches: [],
    };
    this.persist();
    return this.state;
  }

  private persist() {
    if (!this.state) return;
    try {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed writing to coy_db.json', err);
    }
  }

  public getFeed(): ProfilePublic[] {
    const db = this.init();
    const swipedIds = new Set(db.swipes.map((s) => s.profileId));

    // Filter out profiles already swiped on, and SANITIZE to never reveal hasLikedUser
    return db.profiles
      .filter((p) => !swipedIds.has(p.id))
      .map(sanitizeProfile);
  }

  public recordSwipe(profileId: string, action: 'like' | 'pass'): { matched: boolean; match?: ProfilePublic } {
    const db = this.init();

    const profile = db.profiles.find((p) => p.id === profileId);
    if (!profile) {
      throw new Error(`Profile with id "${profileId}" not found`);
    }

    // Check if already swiped to prevent duplicate recording
    const alreadySwiped = db.swipes.some((s) => s.profileId === profileId);
    if (alreadySwiped) {
      const isMatch = db.matches.some((m) => m.profileId === profileId);
      return {
        matched: isMatch,
        match: isMatch ? sanitizeProfile(profile) : undefined,
      };
    }

    // Record swipe
    db.swipes.push({
      profileId,
      action,
      timestamp: new Date().toISOString(),
    });

    // Check if mutual match
    let isMatch = false;
    if (action === 'like' && profile.hasLikedUser) {
      isMatch = true;
      db.matches.push({
        profileId,
        matchedAt: new Date().toISOString(),
      });
    }

    this.persist();

    return {
      matched: isMatch,
      match: isMatch ? sanitizeProfile(profile) : undefined,
    };
  }

  public getMatches(): MatchedProfileWithMeta[] {
    const db = this.init();
    const profileMap = new Map(db.profiles.map((p) => [p.id, p]));

    return db.matches
      .map((m) => {
        const prof = profileMap.get(m.profileId);
        if (!prof) return null;
        return {
          ...sanitizeProfile(prof),
          matchedAt: m.matchedAt,
        };
      })
      .filter((m): m is MatchedProfileWithMeta => m !== null)
      .reverse(); // Most recent match first
  }

  public reset(): void {
    this.state = {
      profiles: [...SEED_PROFILES],
      swipes: [],
      matches: [],
    };
    this.persist();
  }
}

export const db = new CoyDatabase();
