export function getRecommendedLevel(experience) {
  if (!experience) return 'A1';
  const value = String(experience).toLowerCase();
  if (value.includes('studied') || value.includes('intermediate') || value.includes('some')) return 'A2';
  return 'A1';
}

export function getSuggestedTrack(pace) {
  if (!pace) return 'standard';
  const value = String(pace).toLowerCase();
  if (value.includes('hurry') || value.includes('30') || value.includes('fast')) return 'fast-track';
  return 'standard';
}
