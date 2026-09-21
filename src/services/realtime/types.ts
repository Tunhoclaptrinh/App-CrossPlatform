export type SocketConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error';

export interface SocketMessage<T = any> {
  event: string;
  data: T;
  timestamp: number;
}

export type SocketEventListener<T = any> = (data: T) => void;

export interface SocketConfig {
  url?: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}
