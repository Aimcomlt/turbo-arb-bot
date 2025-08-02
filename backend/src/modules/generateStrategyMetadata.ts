export interface StrategyMetadata {
  id: number;
  name: string;
  description: string;
}

export function generateStrategyMetadata(): StrategyMetadata[] {
  // TODO: Replace with real strategy generation logic
  return [
    {
      id: 1,
      name: 'Mock Strategy',
      description: 'This is a mock strategy',
    },
  ];
}
