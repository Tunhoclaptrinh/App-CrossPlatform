import React from 'react';
import { ScrollView, View, useColorScheme, TouchableOpacity } from 'react-native';
import {
  Sparkles,
  Layers,
  Compass,
  Palette,
  ShieldCheck,
  ChevronRight,
  Database,
} from 'lucide-react-native';
import { Button } from 'react-native-paper';
import { AppText } from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore } from '@/hooks';
import type { HomeScreenProps } from '@/navigation/types';
import { createHomeStyles } from './styles';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createHomeStyles(themeColors);

  const { counter, increment } = useAppStore();

  const libraries = [
    {
      id: 'paper',
      title: 'React Native Paper',
      desc: 'Bộ UI chuẩn Material Design 3, siêu ổn định khi lên Store',
      icon: Palette,
      color: '#2563EB',
    },
    {
      id: 'nav',
      title: 'React Navigation v7',
      desc: 'Điều hướng Stack & Native Screens mượt mà 60-120fps',
      icon: Compass,
      color: '#10B981',
    },
    {
      id: 'icons',
      title: 'Lucide React Native',
      desc: 'Hệ thống icons SVG hiện đại, sắc nét, không cần link font',
      icon: Sparkles,
      color: '#F59E0B',
    },
    {
      id: 'store',
      title: 'Zustand State Store',
      desc: 'Quản lý state toàn cục siêu nhẹ, không boilerplate',
      icon: Database,
      color: '#8B5CF6',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.badge}>
          <ShieldCheck size={16} color={themeColors.primary} />
          <AppText variant="caption" style={styles.badgeText}>
            PRODUCTION-READY STACK
          </AppText>
        </View>

        <AppText variant="header" style={styles.title}>
          React Native HK7
        </AppText>

        <AppText variant="body" style={styles.subtitle}>
          Đã cài đặt sẵn bộ thư viện ổn định, an toàn khi cập nhật và publish Store!
        </AppText>
      </View>

      <View style={styles.storeBox}>
        <AppText variant="subtitle">
          Zustand Global Counter: <AppText variant="title" color={themeColors.primary}>{counter}</AppText>
        </AppText>
        <Button mode="contained-tonal" onPress={increment}>
          Bấm tăng Counter toàn cục (+1)
        </Button>
      </View>

      <AppText variant="title" style={styles.sectionTitle}>
        Thư Viện Đã Tích Hợp (Bấm để xem chi tiết)
      </AppText>

      <View style={styles.grid}>
        {libraries.map((item) => {
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
    </ScrollView>
  );
};