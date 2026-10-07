import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { AppText } from '@/components';
import { haptics } from '@/utils';
import type { ModuleTabsProps } from './types';
import { createModuleTabsStyles } from './styles';

export const ModuleTabs: React.FC<ModuleTabsProps> = ({
  tabs,
  activeModule,
  onSelectTab,
  isDark,
  radiusTokens,
  isGlass = false,
}) => {
  const styles = useMemo(() => createModuleTabsStyles(radiusTokens), [radiusTokens]);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      {tabs.map((tab) => {
        const isActive = activeModule === tab.id;
        const TabIcon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.75}
            onPress={() => {
              haptics.light();
              onSelectTab(tab.id);
            }}
            style={[
              styles.tabChip,
              isGlass
                ? isDark
                  ? styles.tabChipGlassDark
                  : styles.tabChipGlassLight
                : isDark
                ? styles.tabChipDark
                : styles.tabChipLight,
              isActive && [
                styles.tabChipActive,
                isDark ? styles.tabChipActiveDark : styles.tabChipActiveLight,
                {
                  backgroundColor: tab.color,
                  borderColor: tab.color,
                  shadowColor: tab.color,
                },
              ],
            ]}
          >
            <TabIcon
              size={14}
              color={isActive ? '#FFFFFF' : tab.color}
              strokeWidth={isActive ? 2.4 : 2}
            />
            <AppText
              style={[
                styles.tabLabel,
                isDark ? styles.tabLabelDark : styles.tabLabelLight,
                isActive && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
