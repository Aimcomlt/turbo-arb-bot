import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { generateStrategyMetadata } from './modules/generateStrategyMetadata.js';
import { scanDiscrepancy } from './modules/scanDiscrepancy.js';

dotenv.config();

const app = express();

app.get('/api/strategies', (_req, res) => {
  res.json(generateStrategyMetadata());
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ message: 'WebSocket connection established' }));
});

// Kick off a discrepancy scan on startup.
scanDiscrepancy().catch((err) => {
  console.error('Failed to scan discrepancy', err);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
