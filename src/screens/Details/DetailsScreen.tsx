import React, { useState, useEffect } from 'react';
import { View, useColorScheme, Alert } from 'react-native';
import { CheckCircle2, ShieldCheck, Zap, KeyRound } from 'lucide-react-native';
import { Button, Chip } from 'react-native-paper';
import { AppText, AppButton, AppInput, ScreenWrapper, SkeletonCard, EmptyState } from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore, useToast } from '@/hooks';
import { appStorage, STORAGE_KEYS } from '@/services/storage';
import { appUpdateService } from '@/services/update';
import type { DetailsScreenProps } from '@/navigation/types';
import { createDetailsStyles } from './styles';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { title, description } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createDetailsStyles(themeColors);

  const { counter, increment, reset } = useAppStore();
  const toast = useToast();

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    appStorage.getItem<string>(STORAGE_KEYS.AI_API_KEY).then((key) => {
      if (key) {
        setSavedKey(key);
        setApiKeyInput(key);
      }
    });
  }, []);

  const handleSaveKey = async () => {
    if (!apiKeyInput.trim()) {
      toast.show('warning', 'Vui lòng nhập giá trị trước khi lưu!', 'Cảnh báo');
      return;
    }
    await appStorage.setItem(STORAGE_KEYS.AI_API_KEY, apiKeyInput.trim());
    setSavedKey(apiKeyInput.trim());
    toast.show('success', 'Đã lưu giá trị vào AsyncStorage bền vững!', 'Lưu thành công');
  };

  const handleTestToast = () => {
    toast.show('info', 'Đây là thông báo Toast toàn cục chuẩn Mobile!', 'Thông báo');
  };

  const handleCheckUpdate = async () => {
    const update = await appUpdateService.checkForUpdates();
    appUpdateService.promptUpdateIfAvailable(update);
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
            AsyncStorage & SQLite: Lưu trữ dữ liệu bền vững
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <Zap color="#F59E0B" size={20} />
          <AppText variant="body" style={styles.infoText}>
            Zustand Counter: {counter}
          </AppText>
        </View>

        <View style={styles.chipRow}>
          <Chip icon="check" mode="outlined">Production Ready</Chip>
          <Chip icon="database" mode="outlined">Persistent Storage</Chip>
        </View>

        <View style={styles.demoBox}>
          <AppInput
            label="Thử nghiệm lưu Local Storage (ví dụ: API Key / Ghi chú):"
            placeholder="Nhập chuỗi bất kỳ để test..."
            value={apiKeyInput}
            onChangeText={setApiKeyInput}
            isPassword={true}
            leftIcon={<KeyRound size={18} color={themeColors.textSecondary} />}
          />
          {savedKey && (
            <AppText variant="caption" color="#10B981" style={styles.savedKeyText}>
              ✓ Đang lưu trong máy: {savedKey.slice(0, 4)}*****{savedKey.slice(-3)}
            </AppText>
          )}
          <Button
            mode="contained-tonal"
            icon="content-save"
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
            icon="bell-outline"
            onPress={handleTestToast}
          >
            Bật thử thông báo Toast
          </Button>

          <Button
            mode="outlined"
            icon="update"
            textColor={themeColors.textSecondary}
            onPress={handleCheckUpdate}
          >
            Kiểm tra cập nhật App
          </Button>

          <Button
            mode="text"
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

      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          Demo Skeleton Shimmer Loading
        </AppText>
        <SkeletonCard />
      </View>

      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          Demo EmptyState Component
        </AppText>
        <EmptyState
          title="Chưa có thông báo mới"
          description="Hộp thư thông báo của bạn hiện đang trống."
          actionText="Tải lại"
          onActionPress={() => Alert.alert('Thông báo', 'Đã làm mới!')}
        />
      </View>
    </ScreenWrapper>
  );
};
