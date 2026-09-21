import React, { useState } from 'react';
import { View, useColorScheme, TouchableOpacity } from 'react-native';
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
} from 'lucide-react-native';
import { Button, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { AppText, ScreenWrapper, AppSearchBar, EmptyState } from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore, useThemeMode, useDoubleBackExit } from '@/hooks';
import { removeVietnameseTones } from '@/utils';
import type { HomeScreenProps } from '@/navigation/types';
import { createHomeStyles } from './styles';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const deviceColorScheme = useColorScheme();
  const themeColors = deviceColorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createHomeStyles(themeColors);

  // Bảo vệ không bị vô tình thoát app khi nhấn Back ở màn hình chính
  useDoubleBackExit();

  const { t } = useTranslation();
  const { counter, increment, language, setLanguage } = useAppStore();
  const { isDark, toggleTheme } = useThemeMode();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = () => {
    const nextLang = language === 'vi' ? 'en' : 'vi';
    setLanguage(nextLang);
  };

  const modules = [
    {
      id: 'paper',
      title: 'React Native Paper',
      desc: 'UI Kit Material Design 3 chuẩn Accessibility & Store',
      icon: Palette,
      color: '#2563EB',
    },
    {
      id: 'nav',
      title: 'React Navigation v7',
      desc: 'Native Stack Navigator 60-120fps mượt mà',
      icon: Compass,
      color: '#10B981',
    },
    {
      id: 'sqlite',
      title: 'SQLite Database',
      desc: '@op-engineering/op-sqlite: Cực nhanh qua JSI New Architecture',
      icon: Server,
      color: '#0284C7',
    },
    {
      id: 'i18n',
      title: 'Đa Ngôn Ngữ (i18n)',
      desc: 'i18next: Chuyển đổi linh hoạt Tiếng Việt / Tiếng Anh',
      icon: Languages,
      color: '#D97706',
    },
    {
      id: 'store',
      title: 'Zustand & AsyncStorage',
      desc: 'Quản lý state toàn cục & lưu trữ bền vững',
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
              UNIVERSAL BASE APP
            </AppText>
          </View>

          <View style={styles.headerControls}>
            <Chip
              icon={isDark ? 'weather-night' : 'weather-sunny'}
              mode="outlined"
              onPress={toggleTheme}
              style={styles.langChip}
            >
              {isDark ? 'Tối' : 'Sáng'}
            </Chip>

            <Chip
              icon="web"
              mode="outlined"
              onPress={toggleLanguage}
              style={styles.langChip}
            >
              {language === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}
            </Chip>
          </View>
        </View>

        <AppText variant="header" style={styles.title}>
          {t('title', 'React Native Starter')}
        </AppText>

        <AppText variant="body" style={styles.subtitle}>
          {t('subtitle', 'Bộ khung hoàn chỉnh cho mọi loại ứng dụng (Local, AI, Server)')}
        </AppText>
      </View>

      <View style={styles.storeBox}>
        <AppText variant="subtitle">
          Global State Counter: <AppText variant="title" color={themeColors.primary}>{counter}</AppText>
        </AppText>
        <Button mode="contained-tonal" onPress={increment}>
          Tăng biến toàn cục (+1)
        </Button>
      </View>

      <View style={styles.searchContainer}>
        <AppSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Tìm kiếm module, tiện ích..."
          onClear={() => setSearchQuery('')}
        />
      </View>

      <AppText variant="title" style={styles.sectionTitle}>
        {t('modulesTitle', 'Các Module Nền Tảng Đã Sẵn Sàng')} ({filteredModules.length})
      </AppText>

      {filteredModules.length === 0 ? (
        <EmptyState
          title="Không tìm thấy kết quả"
          description={`Không có module nào khớp với từ khóa "${searchQuery}"`}
          actionText="Xóa tìm kiếm"
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
                style={styles.itemCard}
                onPress={() =>
                  navigation.navigate('Details', {
                    itemId: item.id,
                    title: item.title,
                    description: item.desc,
                  })
                }
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.iconWrapper, { backgroundColor: item.color + '20' }]}>
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
