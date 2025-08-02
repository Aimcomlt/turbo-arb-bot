export interface StrategyMetadata {
  id: number;
  name: string;
  description: string;
}

function validateStrategyMetadata(data: unknown): StrategyMetadata {
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof (data as any).id !== 'number' ||
    typeof (data as any).name !== 'string' ||
    typeof (data as any).description !== 'string'
  ) {
    throw new Error('Invalid strategy metadata');
  }

  const { id, name, description } = data as {
    id: number;
    name: string;
    description: string;
  };
  return { id, name, description };
}

export function generateStrategyMetadata(): StrategyMetadata[] {
  const rawStrategies: unknown[] = [
    {
      id: 1,
      name: 'Mock Strategy',
      description: 'This is a mock strategy',
    },
  ];

  return rawStrategies.map((s) => validateStrategyMetadata(s));
}
