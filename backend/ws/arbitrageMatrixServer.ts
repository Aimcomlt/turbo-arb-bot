import type { WebSocketServer } from 'ws';
import { broadcast } from './server.js';

/**
 * Helper around a WebSocket server that knows how to broadcast arbitrage
 * specific messages.  Clients can listen for `discrepancy` and `heatmap` events
 * to receive updates.
 */
export function createArbitrageMatrixServer(wss: WebSocketServer) {
  return {
    broadcastDiscrepancy(data: unknown) {
      broadcast(wss, { type: 'discrepancy', data });
    },
    broadcastHeatmap(data: unknown) {
      broadcast(wss, { type: 'heatmap', data });
    },
  };
}
