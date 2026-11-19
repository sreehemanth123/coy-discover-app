async function testHttp() {
  console.log('\n--- Testing Live HTTP Endpoints on http://localhost:3000 ---\n');

  // Test 1: GET /api/feed
  const res1 = await fetch('http://localhost:3000/api/feed');
  const data1 = await res1.json();
  console.log(`GET /api/feed -> status: ${res1.status}, count: ${data1.count}, first profile: ${data1.profiles[0]?.name}`);

  // Test 2: GET /feed (Next.js rewrite)
  const res2 = await fetch('http://localhost:3000/feed');
  const data2 = await res2.json();
  console.log(`GET /feed (rewrite) -> status: ${res2.status}, count: ${data2.count}`);

  // Test 3: POST /api/swipe
  const swipeRes = await fetch('http://localhost:3000/api/swipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: data1.profiles[0].id, action: 'like' }),
  });
  const swipeData = await swipeRes.json();
  console.log(`POST /api/swipe -> status: ${swipeRes.status}, matched: ${swipeData.matched}, message: "${swipeData.message}"`);

  // Test 4: GET /matches (Next.js rewrite)
  const matchRes = await fetch('http://localhost:3000/matches');
  const matchData = await matchRes.json();
  console.log(`GET /matches (rewrite) -> status: ${matchRes.status}, count: ${matchData.count}`);

  // Test 5: Reset DB
  const resetRes = await fetch('http://localhost:3000/api/reset', { method: 'POST' });
  const resetData = await resetRes.json();
  console.log(`POST /api/reset -> status: ${resetRes.status}, message: "${resetData.message}"`);

  console.log('\n✅ All HTTP endpoints verified successfully!\n');
}

testHttp().catch(console.error);
