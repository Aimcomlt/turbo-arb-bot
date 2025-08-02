/**
 * Price information returned from an individual DEX/aggregator
 */
export interface DexPrice {
  source: string;
  price: number;
}

/**
 * Resulting structure describing the detected price gaps for a token.
 */
export interface DiscrepancyResult {
  token: string;
  prices: DexPrice[];
  /** Difference between the highest and lowest observed price */
  gap: number;
}

// List of DEX/aggregator endpoints to query. These URLs are intentionally
// simple; consumers of this module can provide a custom `fetch` implementation
// during testing to avoid real network requests.
const DEX_ENDPOINTS: Record<string, (token: string) => string> = {
  uniswap: (token) => `https://api.uniswap.org/v1/quote?token=${token}`,
  sushiswap: (token) => `https://api.sushi.com/v1/quote?token=${token}`,
};

/**
 * Pull prices from configured DEX/aggregators and compute price discrepancies.
 *
 * @param tokens - Array of token symbols to check (e.g. ["ETH", "DAI"]).
 * @param fetcher - Optional fetch implementation for testing/mocking.
 */
export async function scanDiscrepancy(
  tokens: string[],
  fetcher: typeof fetch = fetch,
): Promise<DiscrepancyResult[]> {
  const results: DiscrepancyResult[] = [];

  for (const token of tokens) {
    const prices: DexPrice[] = [];

    for (const [source, buildUrl] of Object.entries(DEX_ENDPOINTS)) {
      try {
        const res = await fetcher(buildUrl(token));
        const data = await res.json();
        const price = Number(data.price);
        if (!Number.isNaN(price)) {
          prices.push({ source, price });
        }
      } catch {
        // Ignore individual source failures; continue with available data
      }
    }

    if (prices.length > 0) {
      const max = Math.max(...prices.map((p) => p.price));
      const min = Math.min(...prices.map((p) => p.price));
      results.push({ token, prices, gap: max - min });
    }
  }

  return results;
}

export default scanDiscrepancy;
