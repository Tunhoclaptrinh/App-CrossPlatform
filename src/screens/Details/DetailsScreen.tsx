import React from 'react';
import { ScrollView, View, useColorScheme } from 'react-native';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react-native';
import { Button, Chip } from 'react-native-paper';
import { AppText, AppButton } from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore } from '@/hooks';
import type { DetailsScreenProps } from '@/navigation/types';
import { createDetailsStyles } from './styles';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { title, description } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createDetailsStyles(themeColors);

  const { counter, increment, reset } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.badge}>
          <AppText variant="caption" style={styles.badgeText}>
            REACT NAVIGATION V7
          </AppText>
        </View>

        <AppText variant="header" style={styles.title}>
          {title}
        </AppText>

        <AppText variant="body" style={styles.description}>
          {description}
        </AppText>

        <View style={styles.infoRow}>
          <CheckCircle2 color={themeColors.primary} size={20} />
          <AppText variant="body" style={styles.infoText}>
            Hỗ trợ đầy đủ React Native New Architecture
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <ShieldCheck color="#10B981" size={20} />
          <AppText variant="body" style={styles.infoText}>
            Độ ổn định cao khi nâng cấp và publish store
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <Zap color="#F59E0B" size={20} />
          <AppText variant="body" style={styles.infoText}>
            Zustand Store Counter: {counter}
          </AppText>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginVertical: 12 }}>
          <Chip icon="check" mode="outlined">Production Ready</Chip>
          <Chip icon="star" mode="outlined">TypeScript</Chip>
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            buttonColor={themeColors.primary}
            onPress={increment}
          >
            Tăng biến Zustand (+1)
          </Button>

          <Button
            mode="outlined"
            textColor={themeColors.textSecondary}
            onPress={reset}
          >
            Reset đếm
          </Button>

          <AppButton
            title="Quay lại Trang Chủ"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScrollView>
  );
};