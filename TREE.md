# 📦 Turbo Arb Bot – Project Structure Tree

> This file documents the modular architecture of the Turbo Arb Bot system, encompassing frontend interfaces, backend arbitrage intelligence (ABIE), and smart contract infrastructure.
> Each layer is isolated for scalability, maintainability, and future expansion across DEX ecosystems and multichain deployments.

turbo-arb-bot/
├── frontend/ # Vite + React (TypeScript)
│ ├── src/
│ │ ├── components/ UI components: StrategyCard, DiscrepancyGrid, OraclePanels
│ │ ├── features/
│ │ │ ├── abi/ Redux slice for ABI caching
│ │ │ └── strategies/ Strategy registry and selection state
│ │ ├── hooks/ Reusable hooks: useAbi, useAbieStream, useContractReader
│ │ ├── services/ REST and WebSocket interfaces (e.g. deploy, matrix, ABI fetch)
│ │ ├── contracts/ ABIs and deployed contract references (deployed.json)
│ │ ├── utils/ Utility functions: readContractUsingAbi, token formatters
│ │ ├── pages/ (Optional) route-based page structure
│ │ ├── App.tsx Main React component
│ │ └── main.tsx Root entry: wraps WagmiConfig + Redux
│ ├── index.html Vite HTML entry point
│ ├── vite.config.ts Vite configuration with aliasing
│ ├── tsconfig.json TypeScript config for frontend scope
│ └── .env VITE_RPC_URL and public-facing environment values (ignored)
│
├── backend/ # ABIE core engine (Node.js + TypeScript)
│ ├── src/
│ │ ├── modules/
│ │ │ ├── scanDiscrepancy.ts Arbitrage scanner using 1inch or Uniswap APIs
│ │ │ ├── scanUniswapReserves.ts On-chain liquidity oracle (Uniswap v2/v3)
│ │ │ ├── generateStrategyMetadata.ts Builds standardized strategy payloads
│ │ │ └── mintStrategyOnChain.ts Mints strategy tokens via ethers.js
│ │ ├── routes/
│ │ │ ├── deployExecutor.ts API route to trigger strategy execution deployment
│ │ │ └── abi.ts API route to retrieve and serve ABIs
│ │ ├── utils/
│ │ │ └── fetchAbiFromEtherscan.ts Fetches verified ABIs via Etherscan API
│ │ └── index.ts Express server root entry
│ ├── ws/
│ │ ├── server.ts WebSocket stream for ABIE discrepancy data
│ │ ├── arbitrageMatrixServer.ts Visual matrix heatmap stream of pair/DEX signals
│ ├── abi-cache/ Locally cached ABIs for performance and redundancy
│ ├── .env RPC_URL, PRIVATE_KEY, ETHERSCAN_KEY
│ └── package.json Backend dependencies and scripts
│
├── contracts/ # Hardhat Solidity contracts
│ ├── contracts/
│ │ ├── StrategyRegistry.sol ERC-1155 token for strategy metadata
│ │ ├── ProxyArbExecutor.sol Flash loan execution engine
│ │ ├── ArbCloneFactory.sol Minimal proxy factory for strategy-specific executors
│ │ ├── MockAavePool.sol Simulated flash loan pool
│ │ └── MockERC20.sol Standard mock tokens for simulation/testing
│ ├── scripts/
│ │ ├── deploy.ts Full deploy sequence of all contracts
│ │ └── export-abis.ts ABI exporter into frontend/contracts
│ ├── artifacts/ Hardhat build artifacts (ignored in repo)
│ ├── typechain/ Type-safe contract wrappers
│ ├── hardhat.config.ts Compiler/network configuration
│ ├── package.json Hardhat plugin and contract tooling
│ └── .env Deployer private key and RPC URL
│
├── shared/ # (Optional) shared SDK utilities and type definitions
│ └── types.ts Common types/interfaces used across app layers
│
├── .env.example Template for local .env file setup
├── .gitignore Covers all environment, build, and editor artifacts
├── README.md Overview, usage instructions, and architecture summary
├── TREE.md 📁 This structure reference file
├── Dockerfile(s) (Optional) Containerized deployment for backend or full stack
└── turbo.config.ts (Optional) Turborepo support for monorepo workflows
