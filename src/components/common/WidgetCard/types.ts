import { ReactNode } from 'react';

export interface WidgetCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}
