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
  WidgetCard,
  GestureCard,
  AppWebView,
} from '@/components';
import { Colors } from '@/constants/colors';
import { useAppStore, useToast } from '@/hooks';
import { appStorage, STORAGE_KEYS } from '@/services/storage';
import { appUpdateService } from '@/services/update';
import { fileService } from '@/services/file';
import { biometricService } from '@/services/biometrics';
import { widgetBridgeService } from '@/services/widget';
import { permissions, haptics, generateId, cryptoHelper, clipboardHelper } from '@/utils';
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

  // States cho Demo Cử Chỉ, Bảo Mật, Sinh Trắc Học & Widget
  const [uuidValue, setUuidValue] = useState(generateId());
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [gestureFeedback, setGestureFeedback] = useState('Chạm đúp hoặc vuốt để thử nghiệm');
  const [widgetSyncStatus, setWidgetSyncStatus] = useState<string | null>(null);
  const [isSyncingWidget, setIsSyncingWidget] = useState(false);

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

  const handleGenerateUuid = () => {
    const nextId = generateId();
    setUuidValue(nextId);
    haptics.light();
    toast.show('info', `${t('crypto.generateUuid')}: ${nextId}`, t('common.info'));
  };

  const handleCopyUuid = async () => {
    await clipboardHelper.setString(uuidValue);
    toast.show('success', `${t('crypto.copyId')}: ${uuidValue}`, t('common.success'));
  };

  const handleEncryptTest = () => {
    const secret = apiKeyInput.trim() || 'Demo Sensitive Secret Key';
    const encrypted = cryptoHelper.encrypt(secret);
    setCipherText(encrypted);
    setDecryptedText('');
    haptics.success();
    toast.show('success', t('crypto.encryptedSuccess'), t('common.success'));
  };

  const handleDecryptTest = () => {
    if (!cipherText) return;
    const decrypted = cryptoHelper.decrypt(cipherText);
    setDecryptedText(decrypted || 'Lỗi giải mã');
    haptics.success();
    toast.show('info', t('crypto.decryptedSuccess'), t('common.info'));
  };

  const handleBiometricAuth = async () => {
    haptics.light();
    const result = await biometricService.authenticate({
      promptMessage: t('biometrics.prompt'),
    });
    if (result.success) {
      toast.show('success', t('biometrics.authSuccess'), t('common.success'));
    } else {
      toast.show('error', t('biometrics.authFailed'), t('common.error'));
    }
  };

  const handleSyncWidget = async () => {
    setIsSyncingWidget(true);
    haptics.light();
    const snapshot = await widgetBridgeService.syncWidgetData({
      activeCount: counter,
      headline: 'Universal RN Base App',
      status: 'online',
    });
    setIsSyncingWidget(false);
    haptics.success();
    setWidgetSyncStatus(new Date(snapshot.lastUpdated).toLocaleTimeString());
    toast.show('success', t('widget.syncedSuccess'), t('common.success'));
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

      {/* Demo Cử Chỉ Thông Minh (Smart Gestures) */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('gestures.title', 'Cử Chỉ Màn Hình Thông Minh (Smart Gestures)')}
        </AppText>
        <GestureCard
          title="Thẻ Cảm Ứng Tương Tác"
          description={gestureFeedback}
          onSwipeLeft={() => setGestureFeedback(t('gestures.swipedLeft', '👈 Đã vuốt sang TRÁI!'))}
          onSwipeRight={() => setGestureFeedback(t('gestures.swipedRight', '👉 Đã vuốt sang PHẢI!'))}
          onDoubleTap={() => setGestureFeedback(t('gestures.doubleTapped', '⚡ Đã chạm đúp (Double Tap)!'))}
        />
      </View>

      {/* Demo Bảo Mật, UUID & Mã Hóa Đối Xứng */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('crypto.title', 'Bảo Mật & Định Danh (Security & Crypto)')}
        </AppText>
        <View style={styles.cryptoBox}>
          <AppText variant="caption" color={themeColors.textSecondary}>
            UUID v4 (RFC4122 Standard):
          </AppText>
          <View style={styles.codeSnippet}>
            <AppText variant="caption" color={themeColors.primary}>{uuidValue}</AppText>
          </View>
          <View style={styles.cryptoActionRow}>
            <View style={styles.hapticBtn}>
              <Button mode="contained-tonal" icon="refresh" onPress={handleGenerateUuid}>
                {t('crypto.generateUuid', 'Tạo UUID v4')}
              </Button>
            </View>
            <View style={styles.hapticBtn}>
              <Button mode="outlined" icon="content-copy" onPress={handleCopyUuid}>
                {t('crypto.copyId', 'Sao Chép ID')}
              </Button>
            </View>
          </View>

          {cipherText ? (
            <View style={styles.codeSnippet}>
              <AppText variant="caption" color="#10B981" numberOfLines={2}>
                {cipherText}
              </AppText>
            </View>
          ) : null}

          {decryptedText ? (
            <AppText variant="caption" color={themeColors.primary} style={styles.savedKeyText}>
              ✓ Giải mã: {decryptedText}
            </AppText>
          ) : null}

          <View style={styles.cryptoActionRow}>
            <View style={styles.hapticBtn}>
              <Button mode="contained-tonal" icon="lock" onPress={handleEncryptTest}>
                {t('crypto.encryptTest', 'Mã Hóa Chuỗi')}
              </Button>
            </View>
            <View style={styles.hapticBtn}>
              <Button mode="outlined" icon="lock-open" disabled={!cipherText} onPress={handleDecryptTest}>
                {t('crypto.decryptTest', 'Giải Mã Chuỗi')}
              </Button>
            </View>
          </View>
        </View>
      </View>

      {/* Demo Sinh Trắc Học (Biometrics) */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('biometrics.title', 'Sinh Trắc Học (Vân Tay / Face ID)')}
        </AppText>
        <Button
          mode="contained"
          buttonColor="#10B981"
          icon="fingerprint"
          onPress={handleBiometricAuth}
        >
          {t('biometrics.authBtn', 'Xác Thực Sinh Trắc Học')}
        </Button>
      </View>

      {/* Demo In-App Widget Dashboard */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('widget.title', 'In-App Widget Dashboard')}
        </AppText>
        <WidgetCard
          title="Active State Snapshot"
          subtitle={widgetSyncStatus ? `Cập nhật: ${widgetSyncStatus}` : t('widget.subtitle', 'Cầu nối đồng bộ dữ liệu ra màn hình ngoài')}
          badge={t('widget.badge', 'Snapshot')}
          icon={<Zap size={20} color={themeColors.primary} />}
          onRefresh={handleSyncWidget}
          isRefreshing={isSyncingWidget}
        >
          <View style={styles.widgetContent}>
            <View style={styles.widgetStatusRow}>
              <AppText variant="body">Zustand Global Counter:</AppText>
              <AppText variant="title" color={themeColors.primary}>{counter}</AppText>
            </View>
            <Button mode="contained-tonal" icon="sync" onPress={handleSyncWidget}>
              {t('widget.syncBtn', 'Đồng Bộ Dữ Liệu Widget')}
            </Button>
          </View>
        </WidgetCard>
      </View>

      {/* Demo In-App Webview Container */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          In-App Webview Container
        </AppText>
        <AppWebView url="https://reactnative.dev" title="React Native Documentation" />
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
