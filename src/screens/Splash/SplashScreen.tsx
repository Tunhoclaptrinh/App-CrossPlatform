import React, { useEffect, useRef } from 'react';
import { Animated, View, useColorScheme, ActivityIndicator } from 'react-native';
import { AppText, AppLogo } from '@/components';
import { Colors } from '@/constants/colors';
import { database } from '@/services/database';
import { AppConfig } from '@/constants/config';
import type { SplashScreenProps } from '@/navigation/types';
import { createSplashStyles } from './styles';

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
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
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Khởi tạo tài nguyên ngầm (SQLite tables, cache...)
    const initApp = async () => {
      await database.initTables();
      setTimeout(() => {
        navigation.replace('Home');
      }, 1500);
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
          Universal Production Template
        </AppText>
      </Animated.View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color={themeColors.primary} />
        <AppText variant="caption" style={styles.footerText}>
          Đang khởi tạo ứng dụng...
        </AppText>
      </View>
    </View>
  );
};