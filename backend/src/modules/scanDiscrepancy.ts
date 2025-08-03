import { JsonRpcProvider } from 'ethers';
import { scanUniswapReserves } from './scanUniswapReserves.js';

export interface DiscrepancyResult {
  pair: string;
  dexA: string;
  dexB: string;
  priceA: number;
  priceB: number;
  percentage: number;
}

/**
 * Scan for price discrepancies between two liquidity pools.  The function is a
 * lightweight example and is not meant to be used in production trading
 * systems.  When a discrepancy is found the optional callbacks are used to
 * broadcast the individual result and the aggregated heatmap respectively.
 */
export async function scanDiscrepancy(
  onDiscrepancy?: (data: DiscrepancyResult) => void,
  onHeatmap?: (data: DiscrepancyResult[]) => void,
): Promise<DiscrepancyResult[]> {
  const provider = new JsonRpcProvider(
    process.env.RPC_URL ?? 'https://rpc.ankr.com/eth',
  );

  // Example pools – WETH/USDC on Uniswap and SushiSwap.  Addresses are public
  // mainnet deployments and serve as sensible defaults for local development.
  const pairs = [
    {
      symbol: 'WETH/USDC',
      dexA: { name: 'Uniswap', address: process.env.UNI_WETH_USDC ?? '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc' },
      dexB: { name: 'SushiSwap', address: process.env.SUSHI_WETH_USDC ?? '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0' },
    },
  ];

  const results: DiscrepancyResult[] = [];

  for (const p of pairs) {
    const reservesA = await scanUniswapReserves(provider, p.dexA.address);
    const reservesB = await scanUniswapReserves(provider, p.dexB.address);

    const priceA = Number(reservesA.reserve1) / Number(reservesA.reserve0);
    const priceB = Number(reservesB.reserve1) / Number(reservesB.reserve0);
    const percentage = Math.abs(priceA - priceB) / priceA;

    const result: DiscrepancyResult = {
      pair: p.symbol,
      dexA: p.dexA.name,
      dexB: p.dexB.name,
      priceA,
      priceB,
      percentage,
    };

    results.push(result);

    if (onDiscrepancy) {
      onDiscrepancy(result);
    }
  }

  if (onHeatmap) {
    onHeatmap(results);
  }

  return results;
}

