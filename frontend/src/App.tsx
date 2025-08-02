// App.tsx – Main layout + MetaMask wallet connection (wagmi v2)

import React, { useEffect } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from './store'
import { loadStrategies } from './features/strategies/strategySlice'
import {
  selectStrategies,
  selectIsLoading,
} from './features/strategies/strategySelectors'

const App: React.FC = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()

  const dispatch = useDispatch<AppDispatch>()
  const strategies = useSelector(selectStrategies)
  const strategiesLoading = useSelector(selectIsLoading)

  // Pick the injected connector (MetaMask)
  const injectedConnector = connectors.find((c) => c.id === 'injected')

  useEffect(() => {
    if (isConnected) {
      dispatch(loadStrategies())
    }
  }, [isConnected, dispatch])

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-gray-900 shadow">
        <h1 className="text-xl font-bold tracking-wide">⚡ Turbo Arbitrage Bot</h1>

        {isConnected ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-green-400">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button
              onClick={() => disconnect()}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => connect({ connector: injectedConnector })}
            disabled={isPending || !injectedConnector}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
          >
            {isPending ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        {isConnected ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">Welcome to your dashboard 🚀</h2>
            <div className="rounded border border-gray-700 p-4 bg-gray-800">
              {strategiesLoading ? (
                <p>Loading strategies...</p>
              ) : (
                <ul className="list-disc pl-4">
                  {strategies.map((s) => (
                    <li key={s.id}>
                      {s.name} - {s.tokenPair}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 mt-6">Please connect your wallet to get started.</p>
        )}

        {/* Optional: Show error message */}
        {error && (
          <p className="text-red-400 mt-4 text-sm">
            ❌ {error.message}
          </p>
        )}
      </main>
    </div>
  )
}

export default App
