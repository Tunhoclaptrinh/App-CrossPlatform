import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/components';
import { haptics } from '@/utils';
import type { LucideIcon } from 'lucide-react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface ModuleTabItem {
  id: string;
  label: string;
  fullTitle: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}

interface ModuleTabsProps {
  tabs: ModuleTabItem[];
  activeModule: string;
  onSelectTab: (id: string) => void;
  isDark: boolean;
  radiusTokens: RadiusPresetConfig;
}

export const ModuleTabs: React.FC<ModuleTabsProps> = ({
  tabs,
  activeModule,
  onSelectTab,
  isDark,
  radiusTokens,
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
              isDark ? styles.tabChipDark : styles.tabChipLight,
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

const createModuleTabsStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    scroll: {
      flexGrow: 0,
      marginBottom: 14,
      marginHorizontal: -16,
    },
    scrollContent: {
      paddingHorizontal: 16,
      gap: 8,
      alignItems: 'center',
    },
    tabChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingHorizontal: 16,
      height: 38,
      borderRadius: radius.pill,
      borderWidth: 1.2,
      flexShrink: 0,
    },
  tabChipLight: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(226, 232, 240, 0.9)',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tabChipDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.65)',
    borderColor: 'rgba(51, 65, 85, 0.7)',
  },
  tabChipActive: {
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  tabChipActiveLight: {
    shadowOpacity: 0.28,
  },
  tabChipActiveDark: {
    shadowOpacity: 0.45,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  tabLabelLight: {
    color: '#475569',
  },
  tabLabelDark: {
    color: '#CBD5E1',
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
