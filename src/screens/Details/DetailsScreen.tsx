import React, { useState, useEffect } from 'react';
import { View, useColorScheme, Alert } from 'react-native';
import { CheckCircle2, ShieldCheck, Zap, KeyRound, Save } from 'lucide-react-native';
import { Button, Chip } from 'react-native-paper';
import { AppText, AppButton, AppInput, ScreenWrapper } from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore } from '@/hooks';
import { appStorage, STORAGE_KEYS } from '@/services/storage';
import type { DetailsScreenProps } from '@/navigation/types';
import { createDetailsStyles } from './styles';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { title, description } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createDetailsStyles(themeColors);

  const { counter, increment, reset } = useAppStore();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    // Load persisted data on mount
    appStorage.getItem<string>(STORAGE_KEYS.AI_API_KEY).then((key) => {
      if (key) {
        setSavedKey(key);
        setApiKeyInput(key);
      }
    });
  }, []);

  const handleSaveKey = async () => {
    if (!apiKeyInput.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập giá trị trước khi lưu!');
      return;
    }
    await appStorage.setItem(STORAGE_KEYS.AI_API_KEY, apiKeyInput.trim());
    setSavedKey(apiKeyInput.trim());
    Alert.alert('Thành công', 'Đã lưu giá trị vào AsyncStorage bền vững!');
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.badge}>
          <AppText variant="caption" style={styles.badgeText}>
            MODULE PLAYGROUND
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
            ScreenWrapper: Tự động xử lý SafeArea & Bàn phím
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <ShieldCheck color="#10B981" size={20} />
          <AppText variant="body" style={styles.infoText}>
            AsyncStorage: Lưu trữ Offline & Cài đặt bền vững
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <Zap color="#F59E0B" size={20} />
          <AppText variant="body" style={styles.infoText}>
            Zustand Counter: {counter}
          </AppText>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginVertical: 12 }}>
          <Chip icon="check" mode="outlined">Production Ready</Chip>
          <Chip icon="database" mode="outlined">Persistent Storage</Chip>
        </View>

        {/* Demo Input & Storage */}
        <View style={{ marginVertical: 12 }}>
          <AppInput
            label="Thử nghiệm lưu Local Storage (ví dụ: API Key / Ghi chú):"
            placeholder="Nhập chuỗi bất kỳ để test..."
            value={apiKeyInput}
            onChangeText={setApiKeyInput}
            isPassword={true}
            leftIcon={<KeyRound size={18} color={themeColors.textSecondary} />}
          />
          {savedKey && (
            <AppText variant="caption" color="#10B981" style={{ marginBottom: 8 }}>
              ✓ Đang lưu trong máy: {savedKey.slice(0, 4)}••••{savedKey.slice(-3)}
            </AppText>
          )}
          <Button
            mode="contained-tonal"
            icon={() => <Save size={16} color={themeColors.primary} />}
            onPress={handleSaveKey}
          >
            Lưu vào Local Storage
          </Button>
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
    </ScreenWrapper>
  );
};