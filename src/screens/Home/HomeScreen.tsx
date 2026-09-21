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
  Sun,
  Moon,
  Plus,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppText, ScreenWrapper, AppSearchBar, EmptyState, AppButton } from '@/components';
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
      id: 'weather',
      title: 'Dự Báo Thời Tiết (Open-Meteo)',
      desc: 'Nhiệt độ hiện tại, dự báo theo giờ (24h), theo ngày (7 ngày), tìm kiếm toàn cầu',
      icon: Sun,
      color: '#F59E0B',
    },
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
      {/* Header Card */}
      <View style={styles.headerCard}>
        {/* Tier 1: Badge & Language */}
        <View style={styles.headerTopRow}>
          <View style={styles.badge}>
            <ShieldCheck size={14} color={themeColors.primary} />
            <AppText variant="caption" style={styles.badgeText}>
              {t('home.badge', 'UNIVERSAL BASE APP')}
            </AppText>
          </View>

          <TouchableOpacity
            style={styles.langPill}
            onPress={toggleLanguage}
            activeOpacity={0.7}
          >
            <Languages size={14} color={themeColors.textSecondary} />
            <AppText variant="caption" style={styles.langPillText}>
              {language === 'vi' ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Tier 2: Segmented Controls for Theme Style and Light/Dark Mode */}
        <View style={styles.headerSegmentsRow}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              themeStyle === 'apple-glass' && styles.segmentBtnActive,
            ]}
            onPress={handleToggleThemeStyle}
            activeOpacity={0.7}
          >
            <Sparkles
              size={14}
              color={themeStyle === 'apple-glass' ? themeColors.primary : themeColors.textSecondary}
            />
            <AppText
              variant="caption"
              style={themeStyle === 'apple-glass' ? styles.segmentTextActive : styles.segmentText}
            >
              Apple Glass
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentBtn,
              themeStyle === 'default' && styles.segmentBtnActive,
            ]}
            onPress={handleToggleThemeStyle}
            activeOpacity={0.7}
          >
            <Palette
              size={14}
              color={themeStyle === 'default' ? themeColors.primary : themeColors.textSecondary}
            />
            <AppText
              variant="caption"
              style={themeStyle === 'default' ? styles.segmentTextActive : styles.segmentText}
            >
              Flat UI
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.themeToggleBtn}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            {isDark ? <Moon size={14} color="#FBBF24" /> : <Sun size={14} color="#F59E0B" />}
            <AppText variant="caption" style={styles.themeToggleText}>
              {isDark ? t('common.dark', 'Tối') : t('common.light', 'Sáng')}
            </AppText>
          </TouchableOpacity>
        </View>

        <AppText variant="header" style={styles.title}>
          {t('home.title', 'React Native Starter')}
        </AppText>

        <AppText variant="body" style={styles.subtitle}>
          {t('home.subtitle', 'Bộ khung hoàn chỉnh cho mọi loại ứng dụng (Local, AI, Server)')}
        </AppText>
      </View>

      {/* Double-Bezel Counter Card */}
      <View style={styles.counterOuterShell}>
        <View style={styles.counterInnerCore}>
          <View style={styles.counterInfo}>
            <AppText variant="caption" style={styles.counterEyebrow}>
              {t('home.counterLabel', 'Zustand Global State')}
            </AppText>
            <View style={styles.counterValueRow}>
              <AppText variant="header" style={styles.counterValue}>
                {counter}
              </AppText>
              <AppText variant="caption" style={styles.counterValueSub}>
                count
              </AppText>
            </View>
          </View>

          <AppButton
            title={t('home.incrementBtn', 'Tăng biến (+1)')}
            variant="tonal"
            size="sm"
            leftIcon={<Plus size={16} color={themeColors.primary} />}
            onPress={increment}
            style={styles.counterBtn}
          />
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <AppSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('home.searchPlaceholder', 'Tìm kiếm module, tiện ích...')}
          onClear={() => setSearchQuery('')}
        />
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeaderRow}>
        <AppText variant="title" style={styles.sectionTitle}>
          {t('home.modulesTitle', 'Các Module Nền Tảng Đã Sẵn Sàng')}
        </AppText>
        <View style={styles.moduleCountBadge}>
          <AppText variant="caption" style={styles.moduleCountText}>
            {filteredModules.length}
          </AppText>
        </View>
      </View>

      {/* Modules List */}
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
                onPress={() => {
                  if (item.id === 'weather') {
                    navigation.navigate('Weather');
                  } else {
                    navigation.navigate('Details', {
                      itemId: item.id,
                      title: item.title,
                      description: item.desc,
                    });
                  }
                }}

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
                <View style={styles.chevronWrapper}>
                  <ChevronRight size={16} color={themeColors.textSecondary} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScreenWrapper>
  );
};
