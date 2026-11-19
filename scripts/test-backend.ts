import { db, sanitizeProfile } from '../lib/db';
import { SEED_PROFILES } from '../data/seedProfiles';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
}

async function runTests() {
  console.log('\n--- Running Coy Discover Backend Test Suite ---\n');

  // Test 1: Reset database
  db.reset();
  const initialFeed = db.getFeed();
  assert(initialFeed.length === SEED_PROFILES.length, `Initial feed contains all ${SEED_PROFILES.length} seed profiles`);

  // Test 2: Privacy check - verify hasLikedUser is NEVER exposed in feed
  const hasLeakedLike = initialFeed.some((p: any) => 'hasLikedUser' in p);
  assert(!hasLeakedLike, 'Privacy Guarantee: No profile in feed exposes hasLikedUser');

  // Test 3: Pass a profile (prof_2)
  const passResult = db.recordSwipe('prof_2', 'pass');
  assert(passResult.matched === false, 'Passing prof_2 results in matched: false');

  const feedAfterPass = db.getFeed();
  assert(!feedAfterPass.some((p) => p.id === 'prof_2'), 'prof_2 is permanently removed from feed after pass');

  // Test 4: Like a profile that did NOT like user back (prof_4)
  const likeNonMatchResult = db.recordSwipe('prof_4', 'like');
  assert(likeNonMatchResult.matched === false, 'Liking prof_4 (non-reciprocal) results in matched: false');

  // Test 5: Like a profile that DID like user back (prof_1) -> Should create a match!
  const likeMatchResult = db.recordSwipe('prof_1', 'like');
  assert(likeMatchResult.matched === true, 'Liking prof_1 (reciprocal) creates a match!');
  assert(likeMatchResult.match?.name === 'Aanya Sharma', 'Match returned profile name is Aanya Sharma');
  assert(!('hasLikedUser' in (likeMatchResult.match || {})), 'Returned match profile is properly sanitized');

  // Test 6: Verify matches endpoint
  const matches = db.getMatches();
  assert(matches.length === 1, 'getMatches returns exactly 1 match');
  assert(matches[0].id === 'prof_1', 'Match record corresponds to prof_1');
  assert(typeof matches[0].matchedAt === 'string', 'Match record includes ISO matchedAt timestamp');

  // Test 7: Swiped profiles never appear again
  const currentFeed = db.getFeed();
  assert(currentFeed.length === SEED_PROFILES.length - 3, 'Feed accurately decremented by swiped profiles count');

  // Test 8: Reset restores initial state
  db.reset();
  const resetFeed = db.getFeed();
  assert(resetFeed.length === SEED_PROFILES.length, 'Reset successfully restores feed to full seed capacity');
  assert(db.getMatches().length === 0, 'Reset successfully clears matches');

  console.log('\n🎉 ALL 8 BACKEND & PRIVACY UNIT TESTS PASSED!\n');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
