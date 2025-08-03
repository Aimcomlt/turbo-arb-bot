import { Router } from 'express';
import { JsonRpcProvider, Wallet } from 'ethers';
import { mintStrategyOnChain } from '../modules/mintStrategyOnChain.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { contractAddress } = req.body as { contractAddress?: string };
    if (!contractAddress) {
      res.status(400).json({ error: 'contractAddress is required' });
      return;
    }

    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    if (!rpcUrl || !privateKey) {
      throw new Error('RPC_URL and PRIVATE_KEY env variables must be set');
    }

    const provider = new JsonRpcProvider(rpcUrl);
    const signer = new Wallet(privateKey, provider);
    const txHash = await mintStrategyOnChain(signer, contractAddress);

    res.json({ txHash });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'unknown error' });
  }
});

export default router;
