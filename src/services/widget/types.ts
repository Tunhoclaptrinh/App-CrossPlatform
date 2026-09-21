export interface WidgetDataSnapshot {
  lastUpdated: number;
  activeCount: number;
  headline: string;
  status: 'online' | 'offline' | 'syncing';
  customData?: Record<string, any>;
}
