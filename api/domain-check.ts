import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory cache (per warm instance)
const cache = new Map<string, { status: string; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Simple rate limiter (per warm instance)
const rateLimiter = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // requests per minute
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

async function checkDomainRdap(fullDomain: string): Promise<'available' | 'taken' | 'unknown'> {
  // Check cache first
  const cached = cache.get(fullDomain);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.status as 'available' | 'taken' | 'unknown';
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(
      `http://rdap.nic.net.ng/domain/${fullDomain}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    let status: 'available' | 'taken' | 'unknown';
    if (response.status === 200) {
      status = 'taken';
    } else if (response.status === 404) {
      status = 'available';
    } else {
      status = 'unknown';
    }

    cache.set(fullDomain, { status, timestamp: Date.now() });
    return status;
  } catch {
    cache.set(fullDomain, { status: 'unknown', timestamp: Date.now() });
    return 'unknown';
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  const { domainLabel, tlds } = req.query;

  if (!domainLabel || typeof domainLabel !== 'string') {
    return res.status(400).json({ error: 'domainLabel is required' });
  }

  // Validate domain label
  const label = domainLabel.trim().toLowerCase();
  if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) {
    return res.status(400).json({ error: 'Invalid domain label' });
  }

  const tldList = typeof tlds === 'string'
    ? tlds.split(',').filter(t => ['.ng', '.com.ng', '.org.ng', '.net.ng'].includes(t))
    : ['.ng', '.com.ng', '.org.ng', '.net.ng'];

  if (tldList.length === 0) {
    return res.status(400).json({ error: 'No valid TLDs specified' });
  }

  // Check all domains in parallel
  const results = await Promise.all(
    tldList.map(async (tld) => {
      const fullDomain = `${label}${tld}`;
      const status = await checkDomainRdap(fullDomain);
      return { domain: fullDomain, status };
    })
  );

  return res.status(200).json(results);
}
