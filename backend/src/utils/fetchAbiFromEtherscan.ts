import fs from 'fs';
import path from 'path';

// Simple on-disk cache directory.
const CACHE_DIR = path.resolve(process.cwd(), 'backend', '.abi-cache');

/**
 * Fetches the ABI for a contract from Etherscan.  Results are cached on disk to
 * avoid repeated network calls.
 */
export async function fetchAbiFromEtherscan(address: string): Promise<unknown> {
  if (!address) {
    throw new Error('address is required');
  }

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  const cacheFile = path.join(CACHE_DIR, `${address.toLowerCase()}.json`);
  if (fs.existsSync(cacheFile)) {
    const cached = fs.readFileSync(cacheFile, 'utf8');
    return JSON.parse(cached);
  }

  const apiKey = process.env.ETHERSCAN_API_KEY ?? '';
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Etherscan request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    status: string;
    message: string;
    result: string;
  };

  if (data.status !== '1') {
    throw new Error(`Etherscan error: ${data.message}`);
  }

  const abi = JSON.parse(data.result);
  fs.writeFileSync(cacheFile, JSON.stringify(abi));
  return abi;
}
