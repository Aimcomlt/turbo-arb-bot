# 📦 Turbo Arb Bot – Project Structure Tree

> This file documents the modular architecture of the Turbo Arb Bot system, encompassing frontend interfaces, backend arbitrage intelligence (ABIE), and smart contract infrastructure.
> Each layer is isolated for scalability, maintainability, and future expansion across DEX ecosystems and multichain deployments.

> Modular architecture for a full-stack arbitrage bot with smart contracts, a WebSocket-enabled backend intelligence engine, and a real-time React/Vite frontend dashboard.

```text
turbo-arb-bot/
├── frontend/                        # Vite + React (TypeScript)
│   ├── src/
│   │   ├── components/                  UI components (StrategyCard, DiscrepancyGrid, OraclePanels)
│   │   ├── features/
│   │   │   ├── abi/                     Redux slice for ABI caching
│   │   │   └── strategies/             Strategy registry state + actions
│   │   ├── hooks/                      useAbi, useAbieStream, useContractReader, etc.
│   │   ├── services/                   API + WebSocket service layer
│   │   ├── contracts/                  ABI files + deployed.json
│   │   ├── utils/                      readContractUsingAbi, formatters, etc.
│   │   ├── pages/                      (Optional) page-based routing
│   │   ├── App.tsx                     Main App UI layout
│   │   └── main.tsx                    Wagmi + Redux + Router provider
│   ├── index.html                     Vite HTML entry
│   ├── vite.config.ts                 Vite config with aliasing
│   ├── tsconfig.json                  TypeScript config
│   └── .env                           VITE_RPC_URL etc. (ignored)
│
├── backend/                         # ABIE (Arbitrage Bot Intelligence Engine)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── scanDiscrepancy.ts         Token price gap detection (1inch/DEX)
│   │   │   ├── scanUniswapReserves.ts     Native reserve oracle (v2/v3)
│   │   │   ├── generateStrategyMetadata.ts Builds deployable strategy payloads
│   │   │   └── mintStrategyOnChain.ts     Calls StrategyRegistry mint()
│   │   ├── routes/
│   │   │   ├── deployExecutor.ts          API: POST to deploy strategy executor
│   │   │   └── abi.ts                     API: GET ABI by address (Etherscan + cache)
│   │   ├── utils/
│   │   │   └── fetchAbiFromEtherscan.ts   ABI fetcher + file cache
│   │   └── index.ts                       Express backend launcher
│   ├── ws/
│   │   ├── server.ts                      Live discrepancy stream
│   │   ├── arbitrageMatrixServer.ts      DEX/pair matrix heatmap (🟥 🟨 🟩)
│   ├── abi-cache/                        Cached ABIs for contracts (auto-fetched)
│   ├── .env                              RPC_URL, PRIVATE_KEY, ETHERSCAN_KEY
│   └── package.json                      Backend server deps and scripts
│
├── contracts/                      # Smart contracts (Hardhat + Solidity)
│   ├── contracts/
│   │   ├── StrategyRegistry.sol         ERC-1155 strategy tokens
│   │   ├── ArbCloneFactory.sol          Deploys minimal proxy executors
│   │   ├── ProxyArbExecutor.sol         Flash loan executor with delegatecall logic
│   │   ├── MockAavePool.sol             Flash loan simulation pool
│   │   └── MockERC20.sol                Mock tokens for tests
│   ├── scripts/
│   │   ├── deploy.ts                    Deploys registry, factory, mocks
│   │   └── export-abis.ts               Exports ABIs to frontend/contracts/
│   ├── artifacts/                       Built files (ignored in Git)
│   ├── typechain/                       Type-safe contract bindings
│   ├── hardhat.config.ts               Compiler and network config
│   ├── package.json
│   └── .env                            PRIVATE_KEY, RPC_URL
│
├── shared/                          # Shared types or SDK utilities
│   └── types.ts                         Shared interfaces and type defs
│
├── .env.example                     Template for .env file
├── .gitignore                       Covers all temp, log, and build files
├── README.md                        Project overview, commands, and usage
├── TREE.md                          📁 This structure reference file
├── Dockerfile(s)                    (Optional) for backend or full-stack deployment
└── turbo.config.ts                  (Optional) for monorepo tooling with Turborepo
```
