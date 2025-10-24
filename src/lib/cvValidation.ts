export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateUKPhone(phone: string): boolean {
  // Allow +44 or 07xxx format
  const normalized = phone.replace(/\s/g, '');
  return /^(\+44|0)7\d{9}$/.test(normalized);
}

export function detectCertificationKeywords(text: string): string[] {
  const keywords = ["ALS", "BLS", "ACLS", "ATLS", "APLS"];
  return keywords.filter(kw => text.toUpperCase().includes(kw));
}

export function calculateGapMonths(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
}
