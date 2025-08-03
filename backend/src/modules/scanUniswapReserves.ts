import { Contract, Provider } from 'ethers';

const RESERVES_ABI = [
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
];

export interface Reserves {
  reserve0: bigint;
  reserve1: bigint;
}

/**
 * Fetch the reserves for a Uniswap V2 style pair contract.
 *
 * @param provider An ethers.js provider connected to an Ethereum JSON RPC
 * endpoint.
 * @param pairAddress Address of the pair contract.
 */
export async function scanUniswapReserves(
  provider: Provider,
  pairAddress: string,
): Promise<Reserves> {
  const contract = new Contract(pairAddress, RESERVES_ABI, provider);
  const [reserve0, reserve1] = await contract.getReserves();
  return { reserve0, reserve1 };
}
