const requests = new Map<string, number[]>();

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = requests.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    requests.set(ip, recent);
    return false; // rate limited
  }

  recent.push(now);
  requests.set(ip, recent);
  return true; // allowed
}
