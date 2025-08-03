import { Router } from 'express';
import { fetchAbiFromEtherscan } from '../utils/fetchAbiFromEtherscan.js';

const router = Router();

router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const abi = await fetchAbiFromEtherscan(address);
    res.json(abi);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'failed to fetch abi' });
  }
});

export default router;
