import { Contract, Signer } from 'ethers';

// Minimal ABI with a single mint function. Real-world usage would supply the
// full contract ABI.
const MINT_ABI = ['function mint() returns (uint256)'];

/**
 * Trigger a mint function on a contract using the provided signer.  The
 * function returns the transaction hash once the transaction has been
 * broadcast.
 */
export async function mintStrategyOnChain(
  signer: Signer,
  contractAddress: string,
): Promise<string> {
  const contract = new Contract(contractAddress, MINT_ABI, signer);
  const tx = await contract.mint();
  const receipt = await tx.wait();
  return receipt.hash;
}
