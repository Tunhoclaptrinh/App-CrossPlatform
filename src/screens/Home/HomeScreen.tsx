import React from 'react';
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
} from 'lucide-react-native';
import { Button, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { AppText, ScreenWrapper } from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore } from '@/hooks';
import { changeLanguage } from '@/i18n';
import type { HomeScreenProps } from '@/navigation/types';
import { createHomeStyles } from './styles';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createHomeStyles(themeColors);

  const { t, i18n } = useTranslation();
  const { counter, increment } = useAppStore();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi';
    changeLanguage(nextLang);
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
      id: 'core',
      title: 'Universal Base Architecture',
      desc: 'ScreenWrapper, AppInput, ApiClient, Skeleton, useDebounce',
      icon: Layers,
      color: '#EC4899',
    },
  ];

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

          <Chip
            icon="web"
            mode="outlined"
            onPress={toggleLanguage}
            style={styles.langChip}
          >
            {i18n.language === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
          </Chip>
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

      <AppText variant="title" style={styles.sectionTitle}>
        {t('modulesTitle', 'Các Module Nền Tảng Đã Sẵn Sàng')}
      </AppText>

      <View style={styles.grid}>
        {modules.map((item) => {
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
    </ScreenWrapper>
  );
};