// main.tsx – fix for missing QueryClientProvider

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'
import { store } from './store'

import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './lib/wagmi'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// ✅ Create a client instance
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ REQUIRED */}
      <WagmiProvider config={wagmiConfig}>
        <Provider store={store}>
          <App />
        </Provider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
