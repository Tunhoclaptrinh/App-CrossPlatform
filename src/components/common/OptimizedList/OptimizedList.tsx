import React from 'react';
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  View,
  useColorScheme,
} from 'react-native';
import { EmptyState } from '../EmptyState';
import { Colors } from '@/constants/colors';
import type { OptimizedListProps } from './types';
import { OPTIMIZED_LIST_DEFAULTS } from './constants';
import { styles } from './styles';

export function OptimizedList<T>({
  data,
  renderItem,
  loading = false,
  refreshing = false,
  onRefresh,
  loadingMore = false,
  emptyProps,
  ...restProps
}: OptimizedListProps<T>) {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.primary} />
        </View>
      );
    }
    return <EmptyState {...emptyProps} />;
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color={themeColors.primary} />
      </View>
    );
  };

  return (
    <FlatList
      data={data ?? []}
      renderItem={renderItem}
      removeClippedSubviews={OPTIMIZED_LIST_DEFAULTS.REMOVE_CLIPPED_SUBVIEWS}
      maxToRenderPerBatch={OPTIMIZED_LIST_DEFAULTS.MAX_TO_RENDER_PER_BATCH}
      windowSize={OPTIMIZED_LIST_DEFAULTS.WINDOW_SIZE}
      initialNumToRender={OPTIMIZED_LIST_DEFAULTS.INITIAL_NUM_TO_RENDER}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeColors.primary}
            colors={[themeColors.primary]}
          />
        ) : undefined
      }
      {...restProps}
    />
  );
}
