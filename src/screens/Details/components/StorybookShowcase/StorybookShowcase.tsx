import React, { useState, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import {
  BookOpen,
  CheckCircle2,
  Layers,
  SearchX,
} from 'lucide-react-native';
import { AppText, AppCard, AppButton } from '@/components';
import { createStorybookStyles } from './styles';
import type { StorybookShowcaseProps, StoryCategory, ComponentId } from './types';
import { COMPONENTS_CATALOG } from './data/componentsCatalog';
import {
  StorybookSearchBar,
  CategoryFilterChips,
  ComponentCardItem,
  ComponentPreviewStage,
  ParityMatrixView,
  MotionLabView,
  LayoutLabView,
} from './components';
import { haptics } from '@/utils';
import { BaseLayoutPreview } from './components/BaseLayoutPreview';

export const StorybookShowcase: React.FC<StorybookShowcaseProps> = React.memo(({
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
  onResetScroll,
  externalSearchQuery,
  onExternalSearchQueryChange,
  onOpenLayoutLabScreen,
}) => {
  const styles = useMemo(
    () => createStorybookStyles(themeColors, radiusTokens, isDark),
    [themeColors, radiusTokens, isDark]
  );

  // Search & Filter State
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const activeSearchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;

  const handleSearchChange = useCallback((text: string) => {
    setInternalSearchQuery(text);
    onExternalSearchQueryChange?.(text);
  }, [onExternalSearchQueryChange]);

  const [activeCategory, setActiveCategory] = useState<StoryCategory>('all');

  // Active Component in Dedicated Preview Stage (null = catalog list view)
  const [selectedComponentId, setSelectedComponentId] = useState<ComponentId | null>(null);

  // Filtered components based on search and category
  const filteredComponents = useMemo(() => {
    return COMPONENTS_CATALOG.filter((comp) => {
      // 1. Category check
      if (activeCategory !== 'all' && activeCategory !== 'parity' && activeCategory !== 'motion') {
        if (comp.category !== activeCategory) return false;
      }

      // 2. Search query check
      if (!activeSearchQuery.trim()) return true;
      const q = activeSearchQuery.toLowerCase().trim();
      const matchName = comp.name.toLowerCase().includes(q);
      const matchDesc = comp.description.toLowerCase().includes(q);
      const matchTags = comp.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchName || matchDesc || matchTags;
    });
  }, [activeCategory, activeSearchQuery]);

  // Selected component metadata
  const selectedComponent = useMemo(() => {
    if (!selectedComponentId) return null;
    return COMPONENTS_CATALOG.find((c) => c.id === selectedComponentId) || null;
  }, [selectedComponentId]);

  const handleSelectComponent = useCallback((id: ComponentId) => {
    haptics.light();
    setSelectedComponentId(id);
    onResetScroll?.();
  }, [onResetScroll]);

  const handleBackToCatalog = useCallback(() => {
    haptics.light();
    setSelectedComponentId(null);
    onResetScroll?.();
  }, [onResetScroll]);

  // 1. IF DEDICATED PREVIEW STAGE IS ACTIVE -> RENDER ISOLATED PREVIEW (ZERO LAG)
  if (selectedComponent) {
    return (
      <View style={styles.container}>
        <ComponentPreviewStage
          component={selectedComponent}
          allComponents={COMPONENTS_CATALOG}
          onBackToCatalog={handleBackToCatalog}
          onSelectComponent={handleSelectComponent}
          onOpenLayoutLab={() => {
            if (onOpenLayoutLabScreen) {
              onOpenLayoutLabScreen();
            } else {
              setSelectedComponentId(null);
              setActiveCategory('layout-lab');
            }
          }}
          themeColors={themeColors}
          radiusTokens={radiusTokens}
          isDark={isDark}
          isGlass={isGlass}
          onResetScroll={onResetScroll}
        />
      </View>
    );
  }

  // 1.5. IF LAYOUT LAB CATEGORY IS ACTIVE -> RENDER DEDICATED LAYOUT & DOCK SIMULATOR
  if (activeCategory === 'layout-lab') {
    return (
      <View style={styles.container}>
        <CategoryFilterChips
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          themeColors={themeColors}
          radiusTokens={radiusTokens}
          isDark={isDark}
        />
        <LayoutLabView
          themeColors={themeColors}
          radiusTokens={radiusTokens}
          isDark={isDark}
          isGlass={isGlass}
          onOpenFullScreen={onOpenLayoutLabScreen}
        />
      </View>
    );
  }

  // 2. IF MOTION LAB CATEGORY IS ACTIVE -> RENDER DEDICATED MOTION & ANIMATION SHOWCASE
  if (activeCategory === 'motion') {
    return (
      <View style={styles.container}>
        <CategoryFilterChips
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          themeColors={themeColors}
          radiusTokens={radiusTokens}
          isDark={isDark}
        />
        <MotionLabView
          themeColors={themeColors}
          radiusTokens={radiusTokens}
          isDark={isDark}
        />
      </View>
    );
  }

  // 3. IF PARITY MATRIX CATEGORY IS ACTIVE -> RENDER ISOLATED PARITY MATRIX
  if (activeCategory === 'parity') {
    return (
      <View style={styles.container}>
        {/* Category Filter Chips always visible */}
        <CategoryFilterChips
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          themeColors={themeColors}
          radiusTokens={radiusTokens}
          isDark={isDark}
        />
        <ParityMatrixView
          themeColors={themeColors}
          radiusTokens={radiusTokens}
          isDark={isDark}
        />
      </View>
    );
  }

  // 3. CATALOG VIEW: SEARCH + FILTER CHIPS + LIGHTWEIGHT CARDS (OPTIMIZED & FAST)
  return (
    <View style={styles.container}>
      {/* Hero Banner */}
      <AppCard style={styles.heroCard}>
        <View style={styles.heroHeaderRow}>
          <View style={styles.heroTag}>
            <BookOpen size={12} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.heroTagText}>DESIGN SYSTEM STORYBOOK</AppText>
          </View>
          <View style={styles.heroVersionBadge}>
            <CheckCircle2 size={11} color="#10B981" strokeWidth={2.4} />
            <AppText style={styles.heroVersionText}>STRICT 100% PARITY</AppText>
          </View>
        </View>

        <View style={styles.heroTitleGroup}>
          <AppText style={[styles.heroTitle, { color: themeColors.text }]}>
            Component Catalog & Preview Stage
          </AppText>
          <AppText style={[styles.heroDesc, { color: themeColors.textSecondary }]}>
            Tìm kiếm nhanh và chọn bất kỳ component nào để mở sân khấu Preview độc lập. Tùy chỉnh thuộc tính trực tiếp (Props Inspector) và xem thông số tokens theo thời gian thực mà không gây lag máy.
          </AppText>
        </View>
      </AppCard>

      {/* Real-time Search Bar */}
      <StorybookSearchBar
        value={activeSearchQuery}
        onChangeText={handleSearchChange}
        resultCount={filteredComponents.length}
        totalCount={COMPONENTS_CATALOG.length}
        themeColors={themeColors}
        radiusTokens={radiusTokens}
        isDark={isDark}
      />

      <BaseLayoutPreview styles={styles} />

      {/* Category Filter Chips */}
      <CategoryFilterChips
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        themeColors={themeColors}
        radiusTokens={radiusTokens}
        isDark={isDark}
      />

      {/* Catalog Items Header */}
      <View style={styles.catalogHeaderRow}>
        <View style={styles.catalogHeaderLeft}>
          <Layers size={14} color="#6366F1" strokeWidth={2.2} />
          <AppText style={[styles.catalogHeaderTitle, { color: themeColors.textSecondary }]}>
            DANH SÁCH LINH KIỆN
          </AppText>
        </View>
        <View style={styles.catalogCountPill}>
          <AppText style={styles.catalogCountText}>
            {filteredComponents.length} linh kiện
          </AppText>
        </View>
      </View>

      {/* Fast, Lightweight Component Cards List */}
      <View style={styles.catalogList}>
        {filteredComponents.length > 0 ? (
          filteredComponents.map((item) => (
            <ComponentCardItem
              key={item.id}
              item={item}
              onPress={() => handleSelectComponent(item.id)}
              themeColors={themeColors}
              radiusTokens={radiusTokens}
              isDark={isDark}
            />
          ))
        ) : (
          <AppCard style={styles.emptyContainer}>
            <SearchX size={36} color={themeColors.textTertiary || '#94A3B8'} strokeWidth={1.5} />
            <AppText style={styles.emptyTitle}>Không tìm thấy linh kiện phù hợp</AppText>
            <AppText style={styles.emptyDesc}>
              Không có component nào khớp với từ khóa "{activeSearchQuery}". Hãy thử tìm kiếm với tên khác hoặc xóa bộ lọc.
            </AppText>
            <AppButton
              size="sm"
              variant="tonal"
              title="Xóa từ khóa tìm kiếm"
              onPress={() => handleSearchChange('')}
            />
          </AppCard>
        )}
      </View>
    </View>
  );
});

