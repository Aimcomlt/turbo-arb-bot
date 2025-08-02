import test from 'node:test';
import assert from 'node:assert/strict';
import { scanDiscrepancy } from '../dist/modules/scanDiscrepancy.js';

test('detects price gap between sources', async () => {
  const mockFetch = async (url) => {
    if (url.includes('uniswap')) {
      return { json: async () => ({ price: 100 }) };
    }
    if (url.includes('sushi.com')) {
      return { json: async () => ({ price: 110 }) };
    }
    throw new Error('unexpected url');
  };

  const result = await scanDiscrepancy(['ETH'], mockFetch);
  assert.equal(result.length, 1);
  assert.equal(result[0].gap, 10);
  assert.deepEqual(result[0].prices, [
    { source: 'uniswap', price: 100 },
    { source: 'sushiswap', price: 110 },
  ]);
});

test('no gap when prices equal', async () => {
  const mockFetch = async (_url) => ({
    json: async () => ({ price: 42 }),
  });

  const result = await scanDiscrepancy(['ETH'], mockFetch);
  assert.equal(result[0].gap, 0);
});
