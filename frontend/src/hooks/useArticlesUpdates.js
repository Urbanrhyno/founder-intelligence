'use client';

import { useEffect } from 'react';

export function useArticlesUpdates(onUpdate) {
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
    let ws;

    try {
      ws = new WebSocket(wsUrl);
    } catch {
      return;
    }

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg?.type === 'articles-updated') {
          onUpdate();
        }
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      // naive reconnect
      setTimeout(() => {
        try {
          ws = new WebSocket(wsUrl);
        } catch {
          // ignore
        }
      }, 5000);
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [onUpdate]);
}

