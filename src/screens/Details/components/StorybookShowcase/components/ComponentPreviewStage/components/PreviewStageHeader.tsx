import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { AppText, AppCard } from '@/components';
import { haptics } from '@/utils';
import type { PreviewStageHeaderProps } from '../types';

export const PreviewStageHeader: React.FC<PreviewStageHeaderProps> = React.memo(({
  component,
  prevComponent,
  nextComponent,
  onBackToCatalog,
  onSelectComponent,
  themeColors,
  styles,
}) => {
  return (
    <>
      {/* 1. TOP BREADCRUMB & STEPPER */}
      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            onBackToCatalog();
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={14} color={themeColors.text} strokeWidth={2.5} />
          <AppText style={styles.backButtonText}>Danh mục linh kiện</AppText>
        </TouchableOpacity>

        <View style={styles.stepperGroup}>
          <TouchableOpacity
            style={[styles.stepperBtn, !prevComponent && styles.stepperBtnDisabled]}
            disabled={!prevComponent}
            onPress={() => {
              if (prevComponent) {
                haptics.light();
                onSelectComponent(prevComponent.id);
              }
            }}
          >
            <ChevronLeft size={16} color={themeColors.text} strokeWidth={2.2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.stepperBtn, !nextComponent && styles.stepperBtnDisabled]}
            disabled={!nextComponent}
            onPress={() => {
              if (nextComponent) {
                haptics.light();
                onSelectComponent(nextComponent.id);
              }
            }}
          >
            <ChevronRight size={16} color={themeColors.text} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. COMPONENT OVERVIEW HEADER */}
      <AppCard style={styles.headerCard}>
        <View style={styles.titleRow}>
          <AppText style={[styles.componentTitle, { color: themeColors.text }]} numberOfLines={1}>
            {component.name}
          </AppText>
          <View style={styles.categoryTag}>
            <AppText style={styles.categoryTagText}>{component.category}</AppText>
          </View>
        </View>
        <AppText style={styles.componentDesc}>{component.description}</AppText>
      </AppCard>
    </>
  );
});
