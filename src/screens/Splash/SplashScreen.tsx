import React, { useEffect, useRef } from 'react';
import { Animated, View, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText, AppLogo } from '@/components';
import { useThemeMode } from '@/hooks';
import { database } from '@/services/database';
import { AppConfig } from '@/constants/config';
import type { SplashScreenProps } from '@/navigation/types';
import { createSplashStyles } from './styles';

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme: themeColors } = useThemeMode();
  const styles = createSplashStyles(themeColors);

  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Chạy hiệu ứng xuất hiện logo
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Khởi tạo tài nguyên ngầm (SQLite tables, cache...)
    const initApp = async () => {
      await database.initTables();
      setTimeout(() => {
        navigation.replace('Weather');
      }, 500);

    };

    initApp();
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { transform: [{ scale }], opacity }]}>
        <AppLogo size="xl" orientation="vertical" />

        <AppText variant="header" style={styles.title}>
          {AppConfig.APP_DISPLAY_NAME}
        </AppText>

        <AppText variant="body" style={styles.subtitle}>
          {t('splash.subtitle')}
        </AppText>
      </Animated.View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color={themeColors.primary} />
        <AppText variant="caption" style={styles.footerText}>
          {t('splash.initializing')}
        </AppText>
      </View>
    </View>
  );
};