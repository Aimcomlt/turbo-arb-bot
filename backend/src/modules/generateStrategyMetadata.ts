export type TokenPair = [string, string];

export interface GenerateStrategyParams {
  /**
   * Tuple containing base and quote token symbols
   */
  tokenPair: TokenPair;
  /**
   * Optional array describing the execution path (DEXes, pools, etc.)
   */
  path?: string[];
  /**
   * Minimum profit in smallest denomination (e.g. wei). Defaults to 0.
   */
  minProfit?: number;
}

export interface StrategyMetadata {
  tokenPair: TokenPair;
  path: string[];
  minProfit: number;
}

/**
 * Generates a standardized metadata object for a strategy.
 * Performs runtime validation and assigns defaults where necessary.
 */
export function generateStrategyMetadata({
  tokenPair,
  path = [],
  minProfit = 0,
}: GenerateStrategyParams): StrategyMetadata {
  if (!Array.isArray(tokenPair) || tokenPair.length !== 2) {
    throw new Error('tokenPair must be a tuple of two token symbols');
  }

  const [base, quote] = tokenPair;
  if (typeof base !== 'string' || typeof quote !== 'string' || !base || !quote) {
    throw new Error('tokenPair must contain two non-empty strings');
  }

  if (!Array.isArray(path) || !path.every((p) => typeof p === 'string')) {
    throw new Error('path must be an array of strings');
  }

  if (typeof minProfit !== 'number' || isNaN(minProfit) || minProfit < 0) {
    throw new Error('minProfit must be a non-negative number');
  }

  return {
    tokenPair: [base, quote],
    path,
    minProfit,
  };
}
