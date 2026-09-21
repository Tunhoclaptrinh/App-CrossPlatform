import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Compass,
  Palette,
  ShieldCheck,
  ChevronRight,
  Database,
  Layers,
  Languages,
  Server,
  Sparkles,
  Radio,
  Smartphone,
} from 'lucide-react-native';
import { Button, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { AppText, ScreenWrapper, AppSearchBar, EmptyState } from '@/components';
import { useAppStore, useThemeMode, useDoubleBackExit } from '@/hooks';
import { removeVietnameseTones, haptics } from '@/utils';
import type { HomeScreenProps } from '@/navigation/types';
import { createHomeStyles, getIconWrapperStyle } from './styles';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme: themeColors, isDark, toggleTheme } = useThemeMode();
  const styles = createHomeStyles(themeColors);

  // Bảo vệ không bị vô tình thoát app khi nhấn Back ở màn hình chính
  useDoubleBackExit();

  const { t } = useTranslation();
  const { counter, increment, language, setLanguage, themeStyle, toggleThemeStyle } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = () => {
    haptics.light();
    const nextLang = language === 'vi' ? 'en' : 'vi';
    setLanguage(nextLang);
  };

  const handleToggleThemeStyle = () => {
    haptics.light();
    toggleThemeStyle();
  };

  const modules = [
    {
      id: 'apple',
      title: 'Apple iOS 18 Liquid Glass',
      desc: 'Cupertino frosted glassmorphism, specular borders & squircles',
      icon: Sparkles,
      color: '#007AFF',
    },
    {
      id: 'realtime',
      title: 'Universal Real-Time WebSocket',
      desc: 'Auto-reconnect, offline message queue, heartbeat ping/pong & pub/sub',
      icon: Radio,
      color: '#10B981',
    },
    {
      id: 'gestures',
      title: 'Smart Gestures & Shake Motion',
      desc: 'Swipe 4 directions, double tap & phone shake sensor with Haptics',
      icon: Smartphone,
      color: '#F59E0B',
    },
    {
      id: 'crypto',
      title: 'Server AES-256 & Security',
      desc: 'AESP256 format compatible with Node.js, Python, Java, Go',
      icon: ShieldCheck,
      color: '#8B5CF6',
    },
    {
      id: 'paper',
      title: 'React Native Paper',
      desc: 'Material Design 3 UI Kit, Accessibility & Theme',
      icon: Palette,
      color: '#2563EB',
    },
    {
      id: 'nav',
      title: 'React Navigation v7',
      desc: 'Native Stack Navigator, 60-120fps & Deep Linking',
      icon: Compass,
      color: '#10B981',
    },
    {
      id: 'sqlite',
      title: 'SQLite Database',
      desc: '@op-engineering/op-sqlite: C++ JSI New Architecture',
      icon: Server,
      color: '#0284C7',
    },
    {
      id: 'i18n',
      title: t('home.modulesTitle', 'Đa Ngôn Ngữ (i18n)'),
      desc: 'i18next: Tiếng Việt & English dynamic runtime switching',
      icon: Languages,
      color: '#D97706',
    },
    {
      id: 'store',
      title: 'Zustand & AsyncStorage',
      desc: 'Unified state management & persistent rehydration',
      icon: Database,
      color: '#8B5CF6',
    },
    {
      id: 'utils',
      title: 'Validation & Performance',
      desc: 'Zod schemas, useDebounce, useThrottle, OptimizedList, Formatters',
      icon: Sparkles,
      color: '#EC4899',
    },
    {
      id: 'core',
      title: 'Universal Base Architecture',
      desc: 'ScreenWrapper, AppInput, ApiClient, Skeleton, Toast, ErrorBoundary',
      icon: Layers,
      color: '#6366F1',
    },
  ];

  const normalizedQuery = removeVietnameseTones(searchQuery);
  const filteredModules = modules.filter((item) =>
    removeVietnameseTones(item.title + ' ' + item.desc).includes(normalizedQuery)
  );

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <View style={styles.badge}>
            <ShieldCheck size={16} color={themeColors.primary} />
            <AppText variant="caption" style={styles.badgeText}>
              {t('home.badge', 'UNIVERSAL BASE APP')}
            </AppText>
          </View>

          <View style={styles.headerControls}>
            <Chip
              mode="outlined"
              onPress={handleToggleThemeStyle}
              style={styles.langChip}
            >
              {themeStyle === 'apple-glass' ? '✨ Apple Glass' : '📱 Flat UI'}
            </Chip>

            <Chip
              mode="outlined"
              onPress={() => {
                haptics.light();
                toggleTheme();
              }}
              style={styles.langChip}
            >
              {isDark ? '🌙 ' + t('common.dark', 'Tối') : '☀️ ' + t('common.light', 'Sáng')}
            </Chip>

            <Chip
              mode="outlined"
              onPress={toggleLanguage}
              style={styles.langChip}
            >
              {language === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}
            </Chip>
          </View>
        </View>

        <AppText variant="header" style={styles.title}>
          {t('home.title', 'React Native Starter')}
        </AppText>

        <AppText variant="body" style={styles.subtitle}>
          {t('home.subtitle', 'Bộ khung hoàn chỉnh cho mọi loại ứng dụng (Local, AI, Server)')}
        </AppText>
      </View>

      <View style={styles.storeBox}>
        <AppText variant="subtitle">
          {t('home.counterLabel', 'Global State Counter')}: <AppText variant="title" color={themeColors.primary}>{counter}</AppText>
        </AppText>
        <Button mode="contained-tonal" onPress={increment}>
          {t('home.incrementBtn', 'Tăng biến toàn cục (+1)')}
        </Button>
      </View>

      <View style={styles.searchContainer}>
        <AppSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('home.searchPlaceholder', 'Tìm kiếm module, tiện ích...')}
          onClear={() => setSearchQuery('')}
        />
      </View>

      <AppText variant="title" style={styles.sectionTitle}>
        {t('home.modulesTitle', 'Các Module Nền Tảng Đã Sẵn Sàng')} ({filteredModules.length})
      </AppText>

      {filteredModules.length === 0 ? (
        <EmptyState
          title={t('home.noResultsTitle', 'Không tìm thấy kết quả')}
          description={`${t('home.noResultsDesc', 'Không có module nào khớp với từ khóa')} "${searchQuery}"`}
          actionText={t('home.clearSearch', 'Xóa tìm kiếm')}
          onActionPress={() => setSearchQuery('')}
        />
      ) : (
        <View style={styles.grid}>
          {filteredModules.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={themeStyle === 'apple-glass' ? styles.itemCardGlass : styles.itemCard}
                onPress={() =>
                  navigation.navigate('Details', {
                    itemId: item.id,
                    title: item.title,
                    description: item.desc,
                  })
                }
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.iconWrapper, getIconWrapperStyle(item.color)]}>
                    <IconComponent size={22} color={item.color} />
                  </View>
                  <View style={styles.itemTexts}>
                    <AppText variant="subtitle" style={styles.itemTitle}>
                      {item.title}
                    </AppText>
                    <AppText variant="caption" style={styles.itemDesc} numberOfLines={2}>
                      {item.desc}
                    </AppText>
                  </View>
                </View>
                <ChevronRight size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScreenWrapper>
  );
};
