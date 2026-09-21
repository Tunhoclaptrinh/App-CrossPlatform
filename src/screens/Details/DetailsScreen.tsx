import React, { useState, useEffect } from 'react';
import { View, useColorScheme, Alert } from 'react-native';
import { CheckCircle2, ShieldCheck, Zap, KeyRound, FileText } from 'lucide-react-native';
import { Button, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import {
  AppText,
  AppButton,
  AppInput,
  ScreenWrapper,
  SkeletonCard,
  EmptyState,
  ConfirmDialog,
  AppCheckbox,
  AppSwitch,
} from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore, useToast } from '@/hooks';
import { appStorage, STORAGE_KEYS } from '@/services/storage';
import { appUpdateService } from '@/services/update';
import { fileService } from '@/services/file';
import { permissions, haptics } from '@/utils';
import type { DetailsScreenProps } from '@/navigation/types';
import { createDetailsStyles } from './styles';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { title, description } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createDetailsStyles(themeColors);

  const { t } = useTranslation();
  const { counter, increment, reset } = useAppStore();
  const toast = useToast();

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);

  // States cho Demo Form Controls & Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(true);
  const [pushNotification, setPushNotification] = useState(false);

  // State cho Demo Đọc Ghi File
  const [fileContent, setFileContent] = useState('Universal React Native Base File Content');

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
      haptics.error();
      toast.show('warning', t('details.saveWarning', 'Vui lòng nhập giá trị trước khi lưu!'), t('common.warning', 'Cảnh báo'));
      return;
    }
    await appStorage.setItem(STORAGE_KEYS.AI_API_KEY, apiKeyInput.trim());
    setSavedKey(apiKeyInput.trim());
    haptics.success();
    toast.show('success', t('details.saveSuccess', 'Đã lưu giá trị vào AsyncStorage bền vững!'), t('common.success', 'Thành công'));
  };

  const handleTestToast = () => {
    haptics.light();
    toast.show('info', t('details.toastMessage', 'Đây là thông báo Toast toàn cục chuẩn Mobile!'), t('common.info', 'Thông báo'));
  };

  const handleCheckUpdate = async () => {
    haptics.light();
    const update = await appUpdateService.checkForUpdates();
    appUpdateService.promptUpdateIfAvailable(update);
  };

  const handleRequestCamera = async () => {
    haptics.light();
    const granted = await permissions.requestCamera();
    if (granted) {
      haptics.success();
      toast.show('success', t('details.cameraGranted', 'Đã được cấp quyền Camera!'), t('common.info', 'Quyền thiết bị'));
    } else {
      haptics.error();
      toast.show('error', t('details.cameraDenied', 'Quyền Camera bị từ chối!'), t('common.error', 'Quyền thiết bị'));
    }
  };

  const handleConfirmAction = () => {
    setIsDialogOpen(false);
    reset();
    haptics.success();
    toast.show('success', t('common.success', 'Đã đặt lại biến đếm toàn cục về 0!'), t('common.confirm', 'Đã xác nhận'));
  };

  const handleSaveFile = async () => {
    if (!fileContent.trim()) {
      haptics.error();
      toast.show('warning', t('details.fileEmpty', 'Vui lòng nhập nội dung file trước khi lưu!'), t('common.warning', 'Cảnh báo'));
      return;
    }
    await fileService.saveFile('demo_note.txt', fileContent.trim());
    haptics.success();
    toast.show('success', t('details.fileSaved', 'Đã lưu file thành công!'), t('common.success', 'File I/O'));
  };

  const handleShareFile = async () => {
    haptics.light();
    await fileService.exportFile('demo_note.txt');
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.badge}>
          <AppText variant="caption" style={styles.badgeText}>
            {t('details.playgroundBadge', 'MODULE PLAYGROUND')}
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
            {t('details.screenWrapperInfo', 'ScreenWrapper: Tự động xử lý SafeArea & Bàn phím')}
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <ShieldCheck color="#10B981" size={20} />
          <AppText variant="body" style={styles.infoText}>
            {t('details.storageInfo', 'AsyncStorage & SQLite: Lưu trữ dữ liệu bền vững')}
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <Zap color="#F59E0B" size={20} />
          <AppText variant="body" style={styles.infoText}>
            {t('home.counterLabel', 'Zustand Counter')}: {counter}
          </AppText>
        </View>

        <View style={styles.chipRow}>
          <Chip icon="check" mode="outlined">Production Ready</Chip>
          <Chip icon="database" mode="outlined">Persistent Storage</Chip>
        </View>

        {/* Demo Form Controls: Checkbox & Switch */}
        <View style={styles.formControlsBox}>
          <AppCheckbox
            checked={rememberLogin}
            onChange={(val) => {
              haptics.light();
              setRememberLogin(val);
            }}
            label={t('details.rememberLogin', 'Ghi nhớ phiên đăng nhập (AppCheckbox)')}
          />

          <AppSwitch
            value={pushNotification}
            onValueChange={(val) => {
              haptics.light();
              setPushNotification(val);
            }}
            label={t('details.pushNotification', 'Nhận thông báo đẩy từ hệ thống (AppSwitch)')}
            sublabel={t('details.pushNotificationSub', 'Gửi cập nhật quan trọng về tài khoản')}
          />
        </View>

        {/* Demo Cảm Biến Rung (Haptics) */}
        <AppText variant="subtitle" style={styles.sectionHeading}>
          {t('details.hapticsTitle', 'Cảm Biến Rung & Phản Hồi (Haptics)')}
        </AppText>
        <View style={styles.hapticRow}>
          <View style={styles.hapticBtn}>
            <Button
              mode="contained-tonal"
              onPress={() => haptics.light()}
            >
              {t('details.hapticsLight', 'Rung Nhẹ')}
            </Button>
          </View>
          <View style={styles.hapticBtn}>
            <Button
              mode="contained-tonal"
              buttonColor={themeColors.primaryLight}
              textColor={themeColors.primary}
              onPress={() => haptics.success()}
            >
              {t('details.hapticsSuccess', 'Thành Công')}
            </Button>
          </View>
          <View style={styles.hapticBtn}>
            <Button
              mode="contained-tonal"
              buttonColor={themeColors.errorLight}
              textColor={themeColors.error}
              onPress={() => haptics.error()}
            >
              {t('details.hapticsError', 'Cảnh Báo')}
            </Button>
          </View>
        </View>

        {/* Demo Đọc Ghi & Xuất File (File I/O) */}
        <AppText variant="subtitle" style={styles.sectionHeading}>
          {t('details.fileTitle', 'Lưu Trữ & Xuất File (File I/O)')}
        </AppText>
        <AppInput
          label={t('details.fileLabel', 'Nội dung tập tin (demo_note.txt):')}
          placeholder={t('details.filePlaceholder', 'Nhập nội dung văn bản để lưu file...')}
          value={fileContent}
          onChangeText={setFileContent}
          leftIcon={<FileText size={18} color={themeColors.textSecondary} />}
        />
        <View style={styles.fileBtnRow}>
          <View style={styles.hapticBtn}>
            <Button
              mode="contained-tonal"
              icon="content-save"
              onPress={handleSaveFile}
            >
              {t('details.saveFile', 'Lưu File')}
            </Button>
          </View>
          <View style={styles.hapticBtn}>
            <Button
              mode="outlined"
              icon="share-variant"
              onPress={handleShareFile}
            >
              {t('details.shareFile', 'Xuất File')}
            </Button>
          </View>
        </View>

        {/* Demo Local Storage Key */}
        <View style={styles.demoBox}>
          <AppInput
            label={t('details.storageDemo', 'Thử nghiệm lưu Local Storage (ví dụ: API Key / Ghi chú):')}
            placeholder={t('details.storagePlaceholder', 'Nhập chuỗi bất kỳ để test...')}
            value={apiKeyInput}
            onChangeText={setApiKeyInput}
            isPassword={true}
            leftIcon={<KeyRound size={18} color={themeColors.textSecondary} />}
          />
          {savedKey && (
            <AppText variant="caption" color="#10B981" style={styles.savedKeyText}>
              ✓ {t('details.savedInDevice', 'Đang lưu trong máy')}: {savedKey.slice(0, 4)}*****{savedKey.slice(-3)}
            </AppText>
          )}
          <Button
            mode="contained-tonal"
            icon="content-save"
            onPress={handleSaveKey}
          >
            {t('details.saveToStorage', 'Lưu vào Local Storage')}
          </Button>
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            buttonColor={themeColors.primary}
            onPress={() => {
              haptics.light();
              increment();
            }}
          >
            {t('home.incrementBtn', 'Tăng biến Zustand (+1)')}
          </Button>

          <Button
            mode="outlined"
            icon="bell-outline"
            onPress={handleTestToast}
          >
            {t('details.testToast', 'Bật thử thông báo Toast')}
          </Button>

          <Button
            mode="outlined"
            icon="camera"
            onPress={handleRequestCamera}
          >
            {t('details.testCamera', 'Kiểm tra quyền Camera (Permissions)')}
          </Button>

          <Button
            mode="outlined"
            icon="alert-octagon"
            textColor={themeColors.error}
            onPress={() => {
              haptics.medium();
              setIsDialogOpen(true);
            }}
          >
            {t('details.openConfirmDialog', 'Mở Hộp Thoại Xác Nhận (ConfirmDialog)')}
          </Button>

          <Button
            mode="outlined"
            icon="update"
            textColor={themeColors.textSecondary}
            onPress={handleCheckUpdate}
          >
            {t('details.checkUpdate', 'Kiểm tra cập nhật App')}
          </Button>

          <AppButton
            title={t('details.backHome', 'Quay lại Trang Chủ')}
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('details.skeletonDemo', 'Minh Họa Skeleton Shimmer Loading')}
        </AppText>
        <SkeletonCard />
      </View>

      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('details.emptyStateDemo', 'Minh Họa EmptyState Component')}
        </AppText>
        <EmptyState
          title={t('common.empty', 'Chưa có thông báo mới')}
          description={t('details.emptyDescription', 'Hộp thư thông báo của bạn hiện đang trống.')}
          actionText={t('common.retry', 'Tải lại')}
          onActionPress={() => Alert.alert(t('common.info', 'Thông báo'), t('details.refreshed', 'Đã làm mới dữ liệu!'))}
        />
      </View>

      {/* ConfirmDialog Component */}
      <ConfirmDialog
        visible={isDialogOpen}
        title={t('dialogs.confirmResetTitle', 'Xác nhận đặt lại biến đếm?')}
        message={t('dialogs.confirmResetMessage', 'Hành động này sẽ đưa biến đếm toàn cục Zustand về 0. Bạn có chắc chắn muốn thực hiện?')}
        confirmText={t('dialogs.reset', 'Đặt lại')}
        cancelText={t('common.cancel', 'Hủy')}
        destructive={true}
        onConfirm={handleConfirmAction}
        onCancel={() => setIsDialogOpen(false)}
      />
    </ScreenWrapper>
  );
};
