import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

/**
 * Initialise a WebSocket server and return it.  Each new connection will be
 * greeted with a simple message so clients know the connection is ready.
 */
export function initWebSocketServer(server: HttpServer): WebSocketServer {
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws: WebSocket) => {
    ws.send(JSON.stringify({ message: 'WebSocket connection established' }));
  });
  return wss;
}

/** Broadcast a JSON serialisable payload to all connected clients. */
export function broadcast(wss: WebSocketServer, data: unknown): void {
  const message = typeof data === 'string' ? data : JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
