import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { generateStrategyMetadata } from './modules/generateStrategyMetadata.js';
import { scanDiscrepancy } from './modules/scanDiscrepancy.js';
import deployExecutorRoute from './routes/deployExecutor.js';
import abiRoute from './routes/abi.js';
import { initWebSocketServer } from '../ws/server.js';
import { createArbitrageMatrixServer } from '../ws/arbitrageMatrixServer.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/api/strategies', (_req, res) => {
  res.json(generateStrategyMetadata());
});

app.use('/api/deploy-executor', deployExecutorRoute);
app.use('/api/abi', abiRoute);

const server = createServer(app);
const wss = initWebSocketServer(server);
const matrixServer = createArbitrageMatrixServer(wss);

// Kick off a discrepancy scan on startup.
scanDiscrepancy(
  (d) => matrixServer.broadcastDiscrepancy(d),
  (heatmap) => matrixServer.broadcastHeatmap(heatmap),
).catch((err) => {
  console.error('Failed to scan discrepancy', err);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
