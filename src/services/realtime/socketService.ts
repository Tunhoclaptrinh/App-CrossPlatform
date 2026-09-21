import type {
  SocketConnectionState,
  SocketMessage,
  SocketEventListener,
  SocketConfig,
} from './types';

class UniversalSocketService {
  private ws: WebSocket | null = null;
  private url: string = 'wss://echo.websocket.org';
  private state: SocketConnectionState = 'disconnected';
  private listeners: Map<string, Set<SocketEventListener>> = new Map();
  private stateListeners: Set<(state: SocketConnectionState) => void> = new Set();
  private messageQueue: string[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimer: any = null;
  private heartbeatTimer: any = null;

  configure(config: SocketConfig) {
    if (config.url) this.url = config.url;
    if (config.maxReconnectAttempts) this.maxReconnectAttempts = config.maxReconnectAttempts;
  }

  connect(url?: string) {
    if (url) this.url = url;
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.setState('connecting');

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.setState('connected');
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        this.flushQueue();
      };

      this.ws.onmessage = (event: WebSocketMessageEvent) => {
        try {
          const raw = event.data;
          if (raw === 'pong' || raw === 'ping') return;
          const parsed: SocketMessage = JSON.parse(raw);
          this.triggerEvent(parsed.event, parsed.data);
        } catch {
          // Xử lý text message thông thường
          this.triggerEvent('message', event.data);
        }
      };

      this.ws.onerror = (error) => {
        console.warn('[socketService] Error:', error);
        this.setState('error');
      };

      this.ws.onclose = () => {
        this.stopHeartbeat();
        if (this.state !== 'disconnected') {
          this.scheduleReconnect();
        }
      };
    } catch (e) {
      console.error('[socketService] Connection error:', e);
      this.scheduleReconnect();
    }
  }

  disconnect() {
    this.setState('disconnected');
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  emit<T = any>(event: string, data: T): boolean {
    const payload: SocketMessage<T> = {
      event,
      data,
      timestamp: Date.now(),
    };
    const serialized = JSON.stringify(payload);

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(serialized);
      return true;
    } else {
      // Đưa vào hàng đợi ngoại tuyến để gửi lại khi có mạng
      this.messageQueue.push(serialized);
      return false;
    }
  }

  on<T = any>(event: string, listener: SocketEventListener<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as SocketEventListener);
  }

  off(event: string, listener: SocketEventListener) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.delete(listener);
    }
  }

  onStateChange(listener: (state: SocketConnectionState) => void) {
    this.stateListeners.add(listener);
    listener(this.state);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  getState(): SocketConnectionState {
    return this.state;
  }

  private setState(next: SocketConnectionState) {
    this.state = next;
    this.stateListeners.forEach((fn) => fn(next));
  }

  private triggerEvent(event: string, data: any) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((fn) => fn(data));
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.setState('disconnected');
      return;
    }

    this.setState('reconnecting');
    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  private flushQueue() {
    while (this.messageQueue.length > 0 && this.ws?.readyState === WebSocket.OPEN) {
      const msg = this.messageQueue.shift();
      if (msg) this.ws.send(msg);
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send('ping');
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

export const socketService = new UniversalSocketService();
