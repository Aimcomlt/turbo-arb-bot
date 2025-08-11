import type { StrategyMetadata } from '../../../shared/types';

function validateStrategyMetadata(data: unknown): StrategyMetadata {
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof (data as any).id !== 'number' ||
    typeof (data as any).name !== 'string' ||
    typeof (data as any).description !== 'string' ||
    typeof (data as any).tokenPair !== 'string' ||
    (data as any).tokenPair.trim() === ''
  ) {
    throw new Error('Invalid strategy metadata');
  }

  const { id, name, description, tokenPair } = data as {
    id: number;
    name: string;
    description: string;
    tokenPair: string;
  };
  return { id, name, description, tokenPair };
}

export function generateStrategyMetadata(): StrategyMetadata[] {
  const rawStrategies: unknown[] = [
    {
      id: 1,
      name: 'Mock Strategy',
      description: 'This is a mock strategy',
      tokenPair: 'ETH/DAI',
    },
  ];

  return rawStrategies.map((s) => validateStrategyMetadata(s));
}
