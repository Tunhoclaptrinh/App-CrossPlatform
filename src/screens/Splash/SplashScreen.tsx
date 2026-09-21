import React, { useEffect, useRef } from 'react';
import { Animated, View, useColorScheme, ActivityIndicator } from 'react-native';
import { Smartphone } from 'lucide-react-native';
import { AppText } from '@/components';
import { Colors } from '@/constants/colors';
import { database } from '@/services/database';
import type { SplashScreenProps } from '@/navigation/types';
import { createSplashStyles } from './styles';

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createSplashStyles(themeColors);

  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Chạy hiệu ứng xuất hiện logo
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
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
      // Chờ 1.5s để logo hiển thị mượt mà trước khi chuyển màn hình
      setTimeout(() => {
        navigation.replace('Home');
      }, 1500);
    };

    initApp();
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { transform: [{ scale }], opacity }]}>
        <View style={styles.iconWrapper}>
          <Smartphone size={48} color={themeColors.primary} />
        </View>

        <AppText variant="header" style={styles.title}>
          React Native App
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