import { strict as assert } from 'assert';

import {
  generateStrategyMetadata,
  StrategyMetadata,
} from '../src/modules/generateStrategyMetadata.js';

// Typical valid input
const typical: StrategyMetadata = generateStrategyMetadata({
  tokenPair: ['ETH', 'DAI'],
  path: ['uniswap', 'sushiswap'],
  minProfit: 100,
});

assert.deepEqual(typical, {
  tokenPair: ['ETH', 'DAI'],
  path: ['uniswap', 'sushiswap'],
  minProfit: 100,
});

// Default handling for missing optional fields
const defaults = generateStrategyMetadata({ tokenPair: ['BTC', 'USDT'] });
assert.deepEqual(defaults, {
  tokenPair: ['BTC', 'USDT'],
  path: [],
  minProfit: 0,
});

// Invalid token pair should throw
assert.throws(
  () => generateStrategyMetadata({ tokenPair: ['ETH'] as any }),
  /tokenPair/
);

// Negative minProfit should throw
assert.throws(
  () =>
    generateStrategyMetadata({ tokenPair: ['ETH', 'DAI'], minProfit: -1 }),
  /minProfit/
);

console.log('All tests passed');

