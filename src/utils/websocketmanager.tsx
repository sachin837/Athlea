// websocketManager.ts
let currentWebSocket: WebSocket | null = null;

export const getWebSocket = () => currentWebSocket;

export const setWebSocket = (ws: WebSocket | null) => {
  currentWebSocket = ws;
};
