/**
 * Tests for gig date categorization logic
 * Simulates the client-side JavaScript behavior at different dates
 * 
 * Date policy:
 * - Gig date on "today" should be upcoming (shown until midnight passes in Stockholm)
 * - Previous dates are past
 * - Upcoming sorted ascending, past sorted descending
 */

const gigs = [
  { date: '2026-10-28', venue: 'Kaliber Room, Uppsala' },
  { date: '2026-04-18', venue: 'Huddinge Kulturhus hos Folkes' },
];

function categorizeGigs(gigs, today) {
  const upcoming = gigs.filter(g => g.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = gigs.filter(g => g.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}

function runTests() {
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`✓ ${name}`);
      passed++;
    } catch (e) {
      console.log(`✗ ${name}`);
      console.log(`  ${e.message}`);
      failed++;
    }
  }

  function assertEqual(actual, expected, msg = '') {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`${msg}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`);
    }
  }

  // Test: Before Kaliber gig (2026-10-27) - both should be upcoming or past depending on Huddinge
  test('Before Kaliber gig (2026-10-27): Kaliber upcoming, Huddinge past', () => {
    const { upcoming, past } = categorizeGigs(gigs, '2026-10-27');
    assertEqual(upcoming.length, 1, 'Should have 1 upcoming');
    assertEqual(upcoming[0].date, '2026-10-28', 'Kaliber should be upcoming');
    assertEqual(past.length, 1, 'Should have 1 past');
    assertEqual(past[0].date, '2026-04-18', 'Huddinge should be past');
  });

  // Test: On Kaliber gig date (2026-10-28) - should still be upcoming
  test('On Kaliber gig date (2026-10-28): Kaliber still upcoming', () => {
    const { upcoming, past } = categorizeGigs(gigs, '2026-10-28');
    assertEqual(upcoming.length, 1, 'Should have 1 upcoming');
    assertEqual(upcoming[0].date, '2026-10-28', 'Kaliber should be upcoming on its date');
    assertEqual(past.length, 1, 'Should have 1 past');
    assertEqual(past[0].date, '2026-04-18', 'Huddinge should be past');
  });

  // Test: Day after Kaliber gig (2026-10-29) - should be past
  test('Day after Kaliber gig (2026-10-29): Kaliber now past', () => {
    const { upcoming, past } = categorizeGigs(gigs, '2026-10-29');
    assertEqual(upcoming.length, 0, 'Should have 0 upcoming');
    assertEqual(past.length, 2, 'Should have 2 past');
    assertEqual(past[0].date, '2026-10-28', 'Kaliber should be first (most recent past)');
    assertEqual(past[1].date, '2026-04-18', 'Huddinge should be second');
  });

  // Test: Today (2026-11-07) - both should be past
  test('Today (2026-11-07): Both gigs past', () => {
    const { upcoming, past } = categorizeGigs(gigs, '2026-11-07');
    assertEqual(upcoming.length, 0, 'Should have 0 upcoming');
    assertEqual(past.length, 2, 'Should have 2 past');
    assertEqual(past[0].date, '2026-10-28', 'Kaliber should be first (most recent)');
    assertEqual(past[1].date, '2026-04-18', 'Huddinge second');
  });

  // Test: Before both gigs (2026-04-01) - both upcoming
  test('Before both gigs (2026-04-01): Both upcoming, sorted ascending', () => {
    const { upcoming, past } = categorizeGigs(gigs, '2026-04-01');
    assertEqual(upcoming.length, 2, 'Should have 2 upcoming');
    assertEqual(past.length, 0, 'Should have 0 past');
    assertEqual(upcoming[0].date, '2026-04-18', 'Huddinge first (earlier)');
    assertEqual(upcoming[1].date, '2026-10-28', 'Kaliber second (later)');
  });

  // Test: On Huddinge date (2026-04-18) - Huddinge upcoming, Kaliber upcoming
  test('On Huddinge date (2026-04-18): Both upcoming', () => {
    const { upcoming, past } = categorizeGigs(gigs, '2026-04-18');
    assertEqual(upcoming.length, 2, 'Should have 2 upcoming');
    assertEqual(past.length, 0, 'Should have 0 past');
    assertEqual(upcoming[0].date, '2026-04-18', 'Huddinge first');
    assertEqual(upcoming[1].date, '2026-10-28', 'Kaliber second');
  });

  // Test: Day after Huddinge (2026-04-19) - Huddinge past, Kaliber upcoming
  test('Day after Huddinge (2026-04-19): Huddinge past, Kaliber upcoming', () => {
    const { upcoming, past } = categorizeGigs(gigs, '2026-04-19');
    assertEqual(upcoming.length, 1, 'Should have 1 upcoming');
    assertEqual(past.length, 1, 'Should have 1 past');
    assertEqual(upcoming[0].date, '2026-10-28', 'Kaliber upcoming');
    assertEqual(past[0].date, '2026-04-18', 'Huddinge past');
  });

  // Test: Midnight boundary - simulating Stockholm timezone edge
  test('Stockholm timezone midnight boundary test', () => {
    // The date string comparison 'YYYY-MM-DD' >= 'YYYY-MM-DD' is timezone-independent
    // What matters is that the client-side JS uses toLocaleDateString with Europe/Stockholm
    // On 2026-10-28 at 23:59 Stockholm time, today = '2026-10-28', so date >= today is true
    // On 2026-10-29 at 00:01 Stockholm time, today = '2026-10-29', so '2026-10-28' >= '2026-10-29' is false
    const justBeforeMidnight = '2026-10-28';
    const justAfterMidnight = '2026-10-29';
    
    const before = categorizeGigs(gigs, justBeforeMidnight);
    assertEqual(before.upcoming.length, 1, 'Just before midnight: 1 upcoming');
    assertEqual(before.upcoming[0].date, '2026-10-28');
    
    const after = categorizeGigs(gigs, justAfterMidnight);
    assertEqual(after.upcoming.length, 0, 'Just after midnight: 0 upcoming');
    assertEqual(after.past.length, 2, 'Just after midnight: 2 past');
  });

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
