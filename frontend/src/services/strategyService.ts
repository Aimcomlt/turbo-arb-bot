import type { StrategyMetadata } from '../../../shared/types';

export async function fetchStrategies(): Promise<StrategyMetadata[]> {
  const response = await fetch('/api/strategies');
  if (!response.ok) {
    throw new Error('Failed to fetch strategies');
  }
  return response.json();
}
