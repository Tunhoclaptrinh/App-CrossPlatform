import { FlatListProps } from 'react-native';
import type { EmptyStateProps } from '../EmptyState/types';

export interface OptimizedListProps<T> extends Omit<FlatListProps<T>, 'renderItem' | 'data'> {
  data?: ReadonlyArray<T> | null;
  renderItem: FlatListProps<T>['renderItem'];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  loadingMore?: boolean;
  emptyProps?: EmptyStateProps;
}
