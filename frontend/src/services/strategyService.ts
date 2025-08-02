export interface Strategy {
  id: number;
  name: string;
  tokenPair: string;
  profit: number;
}

export async function fetchStrategies(): Promise<Strategy[]> {
  const response = await fetch('/api/strategies');
  if (!response.ok) {
    throw new Error('Failed to fetch strategies');
  }
  return response.json();
}
