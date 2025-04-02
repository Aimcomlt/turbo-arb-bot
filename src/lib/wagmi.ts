// wagmi.ts – wagmi client config (with @wagmi/core style setup)
import { createConfig, http } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { sepolia } from 'viem/chains'

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL),
  },
})

