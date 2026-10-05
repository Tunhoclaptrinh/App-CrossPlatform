import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
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
  Minus,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react-native';
import {
  AppText,
  ScreenWrapper,
  AppSearchBar,
  EmptyState,
  ThemeStudioModal,
  AppleMeshBackground,
} from '@/components';
import { useAppStore, useThemeMode, useDoubleBackExit } from '@/hooks';
import { removeVietnameseTones, haptics } from '@/utils';
import type { HomeScreenProps } from '@/navigation/types';
import { createHomeStyles } from './styles';
import { useTranslation } from 'react-i18next';

type CategoryFilter = 'all' | 'ui' | 'realtime' | 'security' | 'storage';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme: themeColors, isDark, toggleTheme, radiusTokens } = useThemeMode();
  const styles = createHomeStyles(themeColors, radiusTokens, isDark);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Bảo vệ không bị vô tình thoát app khi nhấn Back ở màn hình chính
  useDoubleBackExit();

  const { t } = useTranslation();
  const {
    counter,
    increment,
    decrement,
    reset,
    language,
    setLanguage,
    themeStyle,
    toggleThemeStyle,
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const toggleLanguage = () => {
    haptics.light();
    const nextLang = language === 'vi' ? 'en' : 'vi';
    setLanguage(nextLang);
  };

  const handleToggleThemeStyle = () => {
    haptics.light();
    toggleThemeStyle();
  };

  const handleToggleTheme = () => {
    haptics.light();
    toggleTheme();
  };

  const categories = [
    { id: 'all', label: language === 'vi' ? 'Tất cả' : 'All', icon: Layers },
    { id: 'ui', label: language === 'vi' ? 'Giao diện & UI' : 'UI & Glass', icon: Palette },
    { id: 'realtime', label: language === 'vi' ? 'Kết nối & Mạng' : 'Network', icon: Radio },
    { id: 'security', label: language === 'vi' ? 'Bảo mật & Cảm biến' : 'Security', icon: ShieldCheck },
    { id: 'storage', label: language === 'vi' ? 'Dữ liệu & Lưu trữ' : 'Storage', icon: Database },
  ] as const;

  const modules = [
    {
      id: 'weather',
      category: 'ui' as const,
      tag: 'Weather',
      title: 'Dự Báo Thời Tiết (Open-Meteo)',
      desc: 'Nhiệt độ hiện tại, dự báo theo giờ (24h), theo ngày (7 ngày), tìm kiếm toàn cầu',
      icon: Sun,
      color: '#F59E0B',
    },
    {
      id: 'theme-studio',
      category: 'ui' as const,
      tag: 'Studio',
      title: 'Studio Theme & Bo Góc',
      desc: 'Bộ tinh chỉnh màu sắc chủ đạo, 4 cấp độ bo góc, phản hồi rung và kính Apple Glass',
      icon: SlidersHorizontal,
      color: themeColors.primary,
    },
    {
      id: 'apple',
      category: 'ui' as const,
      tag: 'Cupertino',
      title: 'Apple iOS 18 Liquid Glass',
      desc: 'Cupertino frosted glassmorphism, specular borders & squircles',
      icon: Sparkles,
      color: '#007AFF',
    },

    {
      id: 'realtime',
      category: 'realtime' as const,
      tag: 'WebSocket',
      title: 'Universal Real-Time WebSocket',
      desc: 'Auto-reconnect, offline message queue, heartbeat ping/pong & pub/sub',
      icon: Radio,
      color: '#10B981',
    },
    {
      id: 'gestures',
      category: 'security' as const,
      tag: 'Motion & Haptics',
      title: 'Smart Gestures & Shake Motion',
      desc: 'Swipe 4 directions, double tap & phone shake sensor with Haptics',
      icon: Smartphone,
      color: '#F59E0B',
    },
    {
      id: 'crypto',
      category: 'security' as const,
      tag: 'AES-256-GCM',
      title: 'Server AES-256 & Security',
      desc: 'Cross-platform cryptography & biometric FaceID/Fingerprint auth',
      icon: ShieldCheck,
      color: '#8B5CF6',
    },
    {
      id: 'paper',
      category: 'ui' as const,
      tag: 'Material 3',
      title: 'React Native Paper & UI Kit',
      desc: 'Material Design 3 tokens, component studio, accessibility & themes',
      icon: Palette,
      color: '#2563EB',
    },
    {
      id: 'nav',
      category: 'realtime' as const,
      tag: 'Native Stack',
      title: 'React Navigation v7',
      desc: 'Native Stack Navigator, 60-120fps hardware transitions & Deep Linking',
      icon: Compass,
      color: '#06B6D4',
    },
    {
      id: 'sqlite',
      category: 'storage' as const,
      tag: 'C++ JSI',
      title: 'High-Speed SQLite Database',
      desc: '@op-engineering/op-sqlite: C++ JSI direct memory query engine',
      icon: Server,
      color: '#0284C7',
    },
    {
      id: 'i18n',
      category: 'ui' as const,
      tag: 'i18next',
      title: t('home.i18nTitle', 'Đa Ngôn Ngữ (i18n)'),
      desc: 'i18next: Tiếng Việt & English dynamic runtime zero-reload switching',
      icon: Languages,
      color: '#D97706',
    },
    {
      id: 'store',
      category: 'storage' as const,
      tag: 'Zustand Store',
      title: 'Zustand & Persistent Storage',
      desc: 'Unified state management, AsyncStorage & automatic state rehydration',
      icon: Database,
      color: '#9333EA',
    },
    {
      id: 'utils',
      category: 'storage' as const,
      tag: 'Zod & Tools',
      title: 'Validation & Performance Tools',
      desc: 'Zod schema parsing, useDebounce, useThrottle, OptimizedList, Formatters',
      icon: Sparkles,
      color: '#EC4899',
    },
    {
      id: 'core',
      category: 'ui' as const,
      tag: 'Architecture',
      title: 'Universal Base Architecture',
      desc: 'ScreenWrapper, AppInput, ApiClient, Skeleton, Toast, ErrorBoundary',
      icon: Layers,
      color: '#4F46E5',
    },
  ];

  const normalizedQuery = removeVietnameseTones(searchQuery.trim().toLowerCase());
  const filteredModules = modules.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return removeVietnameseTones((item.title + ' ' + item.desc + ' ' + item.tag).toLowerCase()).includes(
      normalizedQuery
    );
  });

  const isGlass = themeStyle === 'apple-glass';

  return (
    <View style={styles.container}>
      {/* Full-bleed Apple Mesh Wallpaper behind the entire screen */}
      {isGlass && <AppleMeshBackground variant="aurora" />}

      <ScreenWrapper
        scrollable
        backgroundColor={isGlass ? 'transparent' : undefined}
        contentContainerStyle={styles.content}
      >

      {/* 1. Header Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandGroup}>
          <View style={styles.brandLogoBox}>
            <Layers size={20} color="#FFFFFF" />
          </View>
          <View style={styles.brandTextGroup}>
            <AppText style={styles.brandTitleText}>
              React Native Starter
            </AppText>
            <View style={styles.brandSubtitleBadge}>
              <View style={styles.brandLiveDot} />
              <AppText style={styles.brandSubtitleText}>
                {t('home.badge', 'UNIVERSAL BASE APP')}
              </AppText>
            </View>
          </View>
        </View>

        {/* Compact Tactile Control Capsule */}
        <View style={styles.topControlCapsule}>
          {/* Language Switcher */}
          <TouchableOpacity
            style={styles.capsuleBtn}
            onPress={toggleLanguage}
            activeOpacity={0.7}
            accessibilityLabel="Switch Language"
          >
            <AppText style={styles.flagEmojiText}>
              {language === 'vi' ? '🇻🇳' : '🇺🇸'}
            </AppText>
          </TouchableOpacity>

          <View style={styles.capsuleDivider} />

          {/* Theme Style Toggle (Apple Glass / Flat) */}
          <TouchableOpacity
            style={[
              styles.capsuleBtn,
              themeStyle === 'apple-glass' && styles.capsuleBtnActive,
            ]}
            onPress={handleToggleThemeStyle}
            activeOpacity={0.7}
            accessibilityLabel="Toggle Theme Style"
          >
            <Sparkles
              size={15}
              color={themeStyle === 'apple-glass' ? '#007AFF' : themeColors.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.capsuleDivider} />

          {/* Dark / Light Mode */}
          <TouchableOpacity
            style={styles.capsuleBtn}
            onPress={handleToggleTheme}
            activeOpacity={0.7}
            accessibilityLabel="Toggle Dark Mode"
          >
            {isDark ? <Moon size={15} color="#FBBF24" /> : <Sun size={15} color="#F59E0B" />}
          </TouchableOpacity>

          <View style={styles.capsuleDivider} />

          {/* Theme Studio Trigger */}
          <TouchableOpacity
            style={styles.capsuleBtn}
            onPress={() => {
              haptics.light();
              setIsStudioOpen(true);
            }}
            activeOpacity={0.7}
            accessibilityLabel="Open Theme Studio"
          >
            <SlidersHorizontal size={15} color={themeColors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Global State Metric Stepper Card */}
      <View style={isGlass ? styles.metricCardGlass : styles.metricCard}>
        {isGlass && <View style={styles.itemGlassHighlight} />}
        <View style={styles.metricHeaderRow}>
          <View style={styles.metricLabelGroup}>
            <View style={styles.metricPulseDot} />
            <AppText style={styles.metricEyebrow}>
              {language === 'vi' ? 'BỘ ĐẾM TOÀN CỤC (ZUSTAND)' : 'ZUSTAND GLOBAL STORE'}
            </AppText>
          </View>
          <View style={styles.metricSyncBadge}>
            <AppText style={styles.metricSyncBadgeText}>
              LIVE SYNC
            </AppText>
          </View>
        </View>

        <View style={styles.metricBodyRow}>
          <View style={styles.metricValueBlock}>
            <AppText style={styles.metricValueSubtitle}>
              {language === 'vi' ? 'Giá trị hiện tại' : 'Current Value'}
            </AppText>
            <AppText style={styles.metricBigValue}>
              {counter}
            </AppText>
          </View>

          {/* Stepper Controls */}
          <View style={styles.stepperBox}>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => {
                haptics.light();
                decrement();
              }}
              activeOpacity={0.7}
            >
              <Minus size={16} color={themeColors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => {
                haptics.warning();
                reset();
              }}
              activeOpacity={0.7}
            >
              <RotateCcw size={14} color={themeColors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.stepperBtn, styles.stepperBtnPrimary]}
              onPress={() => {
                haptics.success();
                increment();
              }}
              activeOpacity={0.7}
            >
              <Plus size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 3. Search Bar */}
      <View style={styles.searchContainer}>
        <AppSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('home.searchPlaceholder', 'Tìm kiếm module, tiện ích...')}
          onClear={() => setSearchQuery('')}
        />
      </View>

      {/* 4. Category Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterScrollContent}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const CatIcon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.7}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              onPress={() => {
                haptics.light();
                setSelectedCategory(cat.id as CategoryFilter);
              }}
            >
              <CatIcon size={14} color={isActive ? '#FFFFFF' : themeColors.textSecondary} />
              <AppText
                style={[styles.filterPillText, isActive && styles.filterPillTextActive]}
              >
                {cat.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 5. Section Header */}
      <View style={styles.sectionHeaderRow}>
        <AppText style={styles.sectionTitle}>
          {t('home.modulesTitle', 'Các Module Nền Tảng Đã Sẵn Sàng')}
        </AppText>
        <View style={styles.moduleCountBadge}>
          <AppText style={styles.moduleCountText}>
            {filteredModules.length}
          </AppText>
        </View>
      </View>

      {/* 6. Modules List */}
      {filteredModules.length === 0 ? (
        <EmptyState
          title={t('home.noResultsTitle', 'Không tìm thấy kết quả')}
          description={`${t('home.noResultsDesc', 'Không có module nào khớp với từ khóa')} "${searchQuery}"`}
          actionText={t('home.clearSearch', 'Xóa tìm kiếm')}
          onActionPress={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
        />
      ) : (
        <View style={styles.grid}>
          {filteredModules.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={isGlass ? styles.itemCardGlass : styles.itemCard}
                onPress={() => {
                  haptics.light();
                  if (item.id === 'weather') {
                    navigation.navigate('Weather');
                  } else if (item.id === 'theme-studio') {
                    setIsStudioOpen(true);
                  } else {
                    navigation.navigate('Details', {
                      itemId: item.id,
                      title: item.title,
                      description: item.desc,
                    });
                  }
                }}
              >
                {/* Specular Highlight Hairline */}
                {isGlass && <View style={styles.itemGlassHighlight} />}

                <View style={styles.itemLeft}>
                  {/* Clean Flat Icon Badge with soft accent tint */}
                  <View
                    style={[
                      styles.iconWrapper,
                      { backgroundColor: `${item.color}18` },
                    ]}
                  >
                    <IconComponent size={22} color={item.color} strokeWidth={2.2} />
                  </View>

                  <View style={styles.itemTexts}>
                    <View style={styles.itemTitleRow}>
                      <AppText style={styles.itemTitle}>
                        {item.title}
                      </AppText>
                      <View style={[styles.itemTagBadge, isGlass && styles.itemTagBadgeGlass]}>
                        <AppText style={styles.itemTagText}>
                          {item.tag}
                        </AppText>
                      </View>
                    </View>
                    <AppText style={styles.itemDesc} numberOfLines={2}>
                      {item.desc}
                    </AppText>
                  </View>
                </View>

                {/* Clean navigation chevron */}
                <View style={styles.chevronWrapper}>
                  <ChevronRight size={18} color={themeColors.textSecondary} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Dynamic Theme & Radius Studio Modal */}
      <ThemeStudioModal
        visible={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />
    </ScreenWrapper>
  </View>
  );
};
