import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import {
  CheckCircle2,
  ShieldCheck,
  Shield,
  Zap,
  KeyRound,
  FileText,
  Sparkles,
  Radio,
  Smartphone,
  Save,
  Share2,
  Bell,
  Camera,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  RotateCcw,
  Copy,
  Lock,
  Unlock,
  Fingerprint,
  Plus,
  Send,
  Database,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  AppText,
  AppButton,
  AppInput,
  AppBadge,
  ScreenWrapper,
  SkeletonCard,
  EmptyState,
  ConfirmDialog,
  AppCheckbox,
  AppSwitch,
  WidgetCard,
  GestureCard,
  AppWebView,
  GlassCard,
} from '@/components';
import { AppleColors } from '@/constants/appleTheme';
import { useAppStore, useToast, useShakeDetection, useThemeMode } from '@/hooks';
import { appStorage, STORAGE_KEYS } from '@/services/storage';
import { appUpdateService } from '@/services/update';
import { fileService } from '@/services/file';
import { biometricService } from '@/services/biometrics';
import { widgetBridgeService } from '@/services/widget';
import { socketService } from '@/services/realtime';
import { permissions, haptics, generateId, cryptoHelper, clipboardHelper } from '@/utils';
import type { DetailsScreenProps } from '@/navigation/types';
import { createDetailsStyles } from './styles';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { title, description } = route.params;
  const { theme: themeColors } = useThemeMode();
  const styles = createDetailsStyles(themeColors);

  const { t } = useTranslation();
  const { counter, increment, reset, themeStyle, toggleThemeStyle } = useAppStore();
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

  // Apple Liquid Glass Theme Handler
  const handleToggleThemeStyle = () => {
    haptics.light();
    toggleThemeStyle();
    toast.show('info', t('appleGlass.switchedToast', 'Đã chuyển đổi phong cách giao diện!'), t('appleGlass.title'));
  };

  // Realtime WebSocket State & Handlers
  const [socketStatus, setSocketStatus] = useState(socketService.getState());
  const [lastSocketMessage, setLastSocketMessage] = useState<string>('');

  useEffect(() => {
    const unsub = socketService.onStateChange((nextState) => {
      setSocketStatus(nextState);
    });
    const onMsg = (data: any) => {
      const text = typeof data === 'string' ? data : JSON.stringify(data);
      setLastSocketMessage(text);
    };
    socketService.on('message', onMsg);
    socketService.on('echo', onMsg);

    return () => {
      unsub();
      socketService.off('message', onMsg);
      socketService.off('echo', onMsg);
    };
  }, []);

  const handleConnectSocket = () => {
    haptics.light();
    socketService.connect();
  };

  const handleDisconnectSocket = () => {
    haptics.light();
    socketService.disconnect();
  };

  const handleSendSocketMessage = () => {
    haptics.light();
    const sent = socketService.emit('echo', {
      greeting: 'Hello from Universal RN Base App!',
      timestamp: Date.now(),
    });
    if (sent) {
      toast.show('success', t('realtime.sentMessage', 'Đã gửi dữ liệu qua WebSocket!'), t('realtime.title'));
    } else {
      toast.show('warning', t('realtime.offlineQueued', 'Mất mạng: Đã đưa tin nhắn vào hàng đợi offline!'), t('realtime.title'));
    }
  };

  // Shake Detection Hook
  const { shakeCount, lastShakeTime, simulateShake, resetShakeCount } = useShakeDetection({
    onShake: () => {
      toast.show('info', t('shake.shakeDetected', '📳 Phát hiện chuyển động lắc điện thoại!'), t('shake.title'));
    },
  });

  // Server-Compatible Crypto State & Handlers
  const [serverPayloadString, setServerPayloadString] = useState<string>('');
  const [serverDecryptedResult, setServerDecryptedResult] = useState<string>('');

  const handleEncryptForServer = () => {
    const secret = apiKeyInput.trim() || 'Client-Side User Sensitive Data';
    const payload = cryptoHelper.encryptForServer(secret);
    setServerPayloadString(payload.combined);
    setServerDecryptedResult('');
    haptics.success();
    toast.show('success', t('serverCrypto.encryptSuccess'), t('common.success'));
  };

  const handleDecryptFromServer = () => {
    if (!serverPayloadString) return;
    const decrypted = cryptoHelper.decryptFromServer(serverPayloadString);
    if (decrypted) {
      setServerDecryptedResult(decrypted);
      haptics.success();
      toast.show('success', t('serverCrypto.decryptSuccess'), t('common.success'));
    } else {
      haptics.error();
      toast.show('error', t('serverCrypto.decryptError', 'Giải mã thất bại!'), t('common.error'));
    }
  };

  useEffect(() => {
    const loadStoredKey = async () => {
      const val = await appStorage.getItem<string>(STORAGE_KEYS.AI_API_KEY);
      if (val) setSavedKey(val);
    };
    loadStoredKey();
  }, []);

  const handleSaveKey = async () => {
    if (!apiKeyInput.trim()) {
      haptics.error();
      toast.show('warning', t('details.enterValidKey', 'Vui lòng nhập chuỗi ký tự hợp lệ'));
      return;
    }
    await appStorage.setItem(STORAGE_KEYS.AI_API_KEY, apiKeyInput);
    setSavedKey(apiKeyInput);
    setApiKeyInput('');
    haptics.success();
    toast.show('success', t('details.keySaved', 'Đã lưu chuỗi dữ liệu vào Storage!'));
  };

  const handleTestToast = () => {
    haptics.light();
    toast.show(
      'success',
      t('details.toastMessage', 'Đây là thông báo toast toàn cục từ ToastProvider!'),
      t('details.toastTitle', 'Thông Báo')
    );
  };

  const handleRequestCamera = async () => {
    haptics.light();
    const isGranted = await permissions.requestCamera();
    if (isGranted) {
      haptics.success();
      toast.show('success', t('details.cameraGranted', 'Đã được cấp quyền Máy ảnh!'));
    } else {
      haptics.error();
      toast.show('error', t('details.cameraDenied', 'Quyền truy cập Máy ảnh bị từ chối.'));
    }
  };

  const handleConfirmAction = () => {
    setIsDialogOpen(false);
    haptics.success();
    reset();
    toast.show('info', t('details.counterReset', 'Biến đếm Zustand đã được đưa về 0'));
  };

  const handleCheckUpdate = async () => {
    haptics.light();
    const updateInfo = await appUpdateService.checkForUpdates();
    if (updateInfo.hasUpdate) {
      haptics.success();
      toast.show('info', `${t('details.newVersion', 'Có bản cập nhật mới')}: v${updateInfo.latestVersion}`);
    } else {
      haptics.light();
      toast.show('success', t('details.appLatest', 'Ứng dụng của bạn đang ở phiên bản mới nhất!'));
    }
  };

  const handleSaveFile = async () => {
    if (!fileContent.trim()) {
      haptics.error();
      toast.show('warning', t('details.enterFileContent', 'Vui lòng nhập nội dung file'));
      return;
    }
    haptics.light();
    const success = await fileService.saveFile('demo_note.txt', fileContent, 'text/plain');
    if (success) {
      haptics.success();
      toast.show('success', t('details.fileSaved', 'Đã lưu file demo_note.txt thành công!'));
    } else {
      haptics.error();
      toast.show('error', t('details.fileSaveFailed', 'Không thể lưu file. Vui lòng thử lại!'));
    }
  };

  const handleShareFile = async () => {
    haptics.light();
    const success = await fileService.exportFile('demo_note.txt');
    if (!success) {
      toast.show('info', t('details.saveFileFirst', 'Hãy nhấn "Lưu File" trước khi xuất chia sẻ!'));
    }
  };

  const handleGenerateUuid = () => {
    haptics.light();
    const nextId = generateId();
    setUuidValue(nextId);
    toast.show('info', t('crypto.generatedUuid', 'Đã tạo UUID v4 mới!'));
  };

  const handleCopyUuid = async () => {
    haptics.light();
    const success = await clipboardHelper.setString(uuidValue);
    if (success) {
      haptics.success();
      toast.show('success', t('crypto.copiedUuid', 'Đã sao chép UUID vào bộ nhớ tạm!'));
    }
  };

  const handleEncryptTest = () => {
    haptics.light();
    const sample = apiKeyInput.trim() || 'React Native Base Architecture';
    const encrypted = cryptoHelper.encrypt(sample);
    setCipherText(encrypted);
    setDecryptedText('');
    haptics.success();
    toast.show('success', t('crypto.encryptedToast', 'Chuỗi đã được mã hóa an toàn!'));
  };

  const handleDecryptTest = () => {
    if (!cipherText) return;
    haptics.light();
    const decrypted = cryptoHelper.decrypt(cipherText);
    setDecryptedText(decrypted || '');
    haptics.success();
    toast.show('success', t('crypto.decryptedToast', 'Đã giải mã chuỗi thành công!'));
  };

  const handleBiometricAuth = async () => {
    haptics.light();
    const result = await biometricService.authenticate({
      promptMessage: t('biometrics.prompt', 'Xác thực vân tay để tiếp tục'),
      fallbackTitle: t('biometrics.fallback', 'Dùng mật khẩu thiết bị'),
      cancelTitle: t('common.cancel', 'Hủy'),
    });

    if (result.success) {
      haptics.success();
      toast.show('success', t('biometrics.authSuccess', 'Xác thực sinh trắc học thành công!'));
    } else {
      haptics.error();
      toast.show('error', result.error || t('biometrics.authFailed', 'Xác thực không thành công.'));
    }
  };

  const handleSyncWidget = async () => {
    haptics.light();
    setIsSyncingWidget(true);
    const snapshot = await widgetBridgeService.syncWidgetData({
      activeCount: counter,
      headline: `Zustand Counter: ${counter}`,
      status: 'online',
    });
    setIsSyncingWidget(false);

    if (snapshot) {
      haptics.success();
      const timeStr = new Date(snapshot.lastUpdated).toLocaleTimeString();
      setWidgetSyncStatus(timeStr);
      toast.show('success', t('widget.syncedToast', 'Đã đồng bộ dữ liệu ra Widget màn hình chính!'));
    } else {
      haptics.error();
      toast.show('error', t('widget.syncFailed', 'Đồng bộ thất bại.'));
    }
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.content}>
      {/* Main Overview Card */}
      <View style={styles.card}>
        <View style={styles.badge}>
          <ShieldCheck size={14} color={themeColors.primary} />
          <AppText variant="caption" style={styles.badgeText}>
            {t('details.badge', 'MODULE CHI TIẾT')}
          </AppText>
        </View>

        <AppText variant="header" style={styles.title}>
          {title}
        </AppText>

        <AppText variant="body" style={styles.description}>
          {description}
        </AppText>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <CheckCircle2 color={themeColors.primary} size={18} />
            <AppText variant="body" style={styles.infoText}>
              {t('details.screenWrapperInfo', 'ScreenWrapper: Tự động xử lý SafeArea & Bàn phím')}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <ShieldCheck color="#10B981" size={18} />
            <AppText variant="body" style={styles.infoText}>
              {t('details.storageInfo', 'AsyncStorage & SQLite: Lưu trữ dữ liệu bền vững')}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <Zap color="#F59E0B" size={18} />
            <AppText variant="body" style={styles.infoText}>
              {t('home.counterLabel', 'Zustand Counter')}: {counter}
            </AppText>
          </View>
        </View>

        <View style={styles.chipRow}>
          <AppBadge
            label="Production Ready"
            variant="success"
            size="sm"
            icon={<CheckCircle2 size={13} color={themeColors.successText} />}
          />
          <AppBadge
            label="Persistent Storage"
            variant="primary"
            size="sm"
            icon={<Database size={13} color={themeColors.primary} />}
          />
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
            <AppButton
              title={t('details.hapticsLight', 'Rung Nhẹ')}
              variant="tonal"
              size="sm"
              onPress={() => haptics.light()}
            />
          </View>
          <View style={styles.hapticBtn}>
            <AppButton
              title={t('details.hapticsSuccess', 'Thành Công')}
              variant="tonal"
              size="sm"
              leftIcon={<CheckCircle2 size={15} color={themeColors.primary} />}
              onPress={() => haptics.success()}
            />
          </View>
          <View style={styles.hapticBtn}>
            <AppButton
              title={t('details.hapticsError', 'Cảnh Báo')}
              variant="danger"
              size="sm"
              leftIcon={<AlertTriangle size={15} color="#FFFFFF" />}
              onPress={() => haptics.error()}
            />
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
            <AppButton
              title={t('details.saveFile', 'Lưu File')}
              variant="tonal"
              leftIcon={<Save size={16} color={themeColors.primary} />}
              onPress={handleSaveFile}
            />
          </View>
          <View style={styles.hapticBtn}>
            <AppButton
              title={t('details.shareFile', 'Xuất File')}
              variant="outline"
              leftIcon={<Share2 size={16} color={themeColors.primary} />}
              onPress={handleShareFile}
            />
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
          <AppButton
            title={t('details.saveToStorage', 'Lưu vào Local Storage')}
            variant="tonal"
            leftIcon={<Save size={18} color={themeColors.primary} />}
            onPress={handleSaveKey}
          />
        </View>

        {/* Actions Stack */}
        <View style={styles.actions}>
          <AppButton
            title={t('home.incrementBtn', 'Tăng biến Zustand (+1)')}
            variant="primary"
            leftIcon={<Plus size={18} color="#FFFFFF" />}
            onPress={() => {
              haptics.light();
              increment();
            }}
          />

          <AppButton
            title={t('details.testToast', 'Bật thử thông báo Toast')}
            variant="outline"
            leftIcon={<Bell size={18} color={themeColors.primary} />}
            onPress={handleTestToast}
          />

          <AppButton
            title={t('details.testCamera', 'Kiểm tra quyền Camera (Permissions)')}
            variant="outline"
            leftIcon={<Camera size={18} color={themeColors.primary} />}
            onPress={handleRequestCamera}
          />

          <AppButton
            title={t('details.openConfirmDialog', 'Mở Hộp Thoại Xác Nhận (ConfirmDialog)')}
            variant="outline"
            leftIcon={<AlertTriangle size={18} color={themeColors.error} />}
            textStyle={{ color: themeColors.error }}
            style={{ borderColor: themeColors.error }}
            onPress={() => {
              haptics.medium();
              setIsDialogOpen(true);
            }}
          />

          <AppButton
            title={t('details.checkUpdate', 'Kiểm tra cập nhật App')}
            variant="outline"
            leftIcon={<RefreshCw size={18} color={themeColors.textSecondary} />}
            textStyle={{ color: themeColors.textSecondary }}
            style={{ borderColor: themeColors.border }}
            onPress={handleCheckUpdate}
          />

          <AppButton
            title={t('details.backHome', 'Quay lại Trang Chủ')}
            variant="ghost"
            leftIcon={<ArrowLeft size={18} color={themeColors.primary} />}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      {/* Demo Skeleton */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('details.skeletonDemo', 'Minh Họa Skeleton Shimmer Loading')}
        </AppText>
        <SkeletonCard />
      </View>

      {/* Demo EmptyState */}
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

      {/* Demo Cử Chỉ Thông Minh */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('gestures.title', 'Cử Chỉ Thông Minh (Smart Gestures: Touch & Motion)')}
        </AppText>
        <GestureCard
          title="Thẻ Cảm Ứng Tương Tác"
          description={gestureFeedback}
          onSwipeLeft={() => setGestureFeedback(t('gestures.swipedLeft', '👈 Đã vuốt sang TRÁI!'))}
          onSwipeRight={() => setGestureFeedback(t('gestures.swipedRight', '👉 Đã vuốt sang PHẢI!'))}
          onDoubleTap={() => setGestureFeedback(t('gestures.doubleTapped', '⚡ Đã chạm đúp (Double Tap)!'))}
        />

        {/* Shake Detection */}
        <View style={styles.shakeContainer}>
          <View style={styles.shakeStatsRow}>
            <View style={styles.glassFeatureRow}>
              <Smartphone size={20} color={themeColors.primary} />
              <AppText variant="body">{t('shake.count', 'Số lần lắc thiết bị')}:</AppText>
            </View>
            <View style={styles.shakeCountBadge}>
              <AppText variant="subtitle" style={styles.shakeCountText}>
                {shakeCount}
              </AppText>
            </View>
          </View>

          {lastShakeTime ? (
            <AppText variant="caption" color={themeColors.textSecondary}>
              {t('shake.lastShake')}: {new Date(lastShakeTime).toLocaleTimeString()}
            </AppText>
          ) : null}

          <View style={styles.shakeActionsRow}>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('shake.simulateBtn')}
                variant="tonal"
                size="sm"
                leftIcon={<Smartphone size={16} color={themeColors.primary} />}
                onPress={simulateShake}
              />
            </View>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('shake.resetBtn')}
                variant="outline"
                size="sm"
                disabled={shakeCount === 0}
                leftIcon={<RotateCcw size={16} color={themeColors.primary} />}
                onPress={resetShakeCount}
              />
            </View>
          </View>
        </View>
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
            <AppText variant="caption" color={themeColors.primary} style={styles.codeSnippetText}>
              {uuidValue}
            </AppText>
          </View>
          <View style={styles.cryptoActionRow}>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('crypto.generateUuid', 'Tạo UUID v4')}
                variant="tonal"
                size="sm"
                leftIcon={<RefreshCw size={15} color={themeColors.primary} />}
                onPress={handleGenerateUuid}
              />
            </View>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('crypto.copyId', 'Sao Chép ID')}
                variant="outline"
                size="sm"
                leftIcon={<Copy size={15} color={themeColors.primary} />}
                onPress={handleCopyUuid}
              />
            </View>
          </View>

          {cipherText ? (
            <View style={styles.codeSnippet}>
              <AppText variant="caption" color="#10B981" numberOfLines={2} style={styles.codeSnippetText}>
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
              <AppButton
                title={t('crypto.encryptTest', 'Mã Hóa Chuỗi')}
                variant="tonal"
                size="sm"
                leftIcon={<Lock size={15} color={themeColors.primary} />}
                onPress={handleEncryptTest}
              />
            </View>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('crypto.decryptTest', 'Giải Mã Chuỗi')}
                variant="outline"
                size="sm"
                disabled={!cipherText}
                leftIcon={<Unlock size={15} color={themeColors.primary} />}
                onPress={handleDecryptTest}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Demo Sinh Trắc Học */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('biometrics.title', 'Sinh Trắc Học (Vân Tay / Face ID)')}
        </AppText>
        <AppButton
          title={t('biometrics.authBtn', 'Xác Thực Sinh Trắc Học')}
          variant="primary"
          leftIcon={<Fingerprint size={20} color="#FFFFFF" />}
          onPress={handleBiometricAuth}
        />
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
            <AppButton
              title={t('widget.syncBtn', 'Đồng Bộ Dữ Liệu Widget')}
              variant="tonal"
              leftIcon={<RefreshCw size={16} color={themeColors.primary} />}
              onPress={handleSyncWidget}
            />
          </View>
        </WidgetCard>
      </View>

      {/* Apple Liquid Glass Cupertino Style Demo */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('appleGlass.title', 'Apple Liquid Glass & Cupertino Style')}
        </AppText>
        <GlassCard accentColor={AppleColors.systemBlue} glowEffect={true}>
          <View style={styles.glassCardInner}>
            <View style={styles.glassFeatureRow}>
              <Sparkles size={20} color={AppleColors.systemBlue} />
              <AppText variant="subtitle">
                {t('appleGlass.subtitle')}
              </AppText>
            </View>
            <View style={styles.glassFeatureRow}>
              <CheckCircle2 size={16} color={AppleColors.systemMint} />
              <AppText variant="caption" style={styles.glassFeatureText}>
                {t('appleGlass.specularBorder')}
              </AppText>
            </View>
            <View style={styles.glassFeatureRow}>
              <CheckCircle2 size={16} color={AppleColors.systemPurple} />
              <AppText variant="caption" style={styles.glassFeatureText}>
                {t('appleGlass.glassDepth')}
              </AppText>
            </View>

            <View style={styles.themeStyleStatusRow}>
              <AppText variant="caption" color={themeColors.textSecondary}>
                {t('appleGlass.activeTheme')}:
              </AppText>
              <AppBadge
                label={themeStyle === 'apple-glass' ? '✨ Apple Glass' : '📱 Flat UI'}
                variant={themeStyle === 'apple-glass' ? 'info' : 'neutral'}
                size="sm"
              />
            </View>

            <AppButton
              title={t('appleGlass.toggleTheme')}
              variant="glass"
              leftIcon={<Sparkles size={18} color={AppleColors.systemBlue} />}
              onPress={handleToggleThemeStyle}
            />
          </View>
        </GlassCard>
      </View>

      {/* Realtime WebSocket Section */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('realtime.title', 'Kết Nối Thời Gian Thực (WebSocket)')}
        </AppText>
        <View style={styles.realtimeCard}>
          <View style={styles.realtimeStatusHeader}>
            <View style={styles.glassFeatureRow}>
              <Radio size={20} color={themeColors.primary} />
              <AppText variant="subtitle">{t('realtime.status')}:</AppText>
            </View>
            <View
              style={
                socketStatus === 'connected'
                  ? styles.statusDotConnected
                  : socketStatus === 'connecting' || socketStatus === 'reconnecting'
                  ? styles.statusDotConnecting
                  : styles.statusDotDisconnected
              }
            >
              <AppText variant="caption" style={styles.statusBadgeText}>
                {socketStatus === 'connected'
                  ? t('realtime.connected')
                  : socketStatus === 'connecting' || socketStatus === 'reconnecting'
                  ? t('realtime.connecting')
                  : t('realtime.disconnected')}
              </AppText>
            </View>
          </View>

          <AppText variant="caption" color={themeColors.textSecondary}>
            {t('realtime.subtitle')}
          </AppText>

          <View style={styles.realtimeEventBox}>
            <AppText variant="caption" color={themeColors.textSecondary}>
              {t('realtime.lastEvent')}:
            </AppText>
            <AppText variant="caption" color={themeColors.primary} numberOfLines={3}>
              {lastSocketMessage || t('realtime.emptyEvent')}
            </AppText>
          </View>

          <View style={styles.realtimeButtonsRow}>
            <View style={styles.hapticBtn}>
              {socketStatus === 'connected' ? (
                <AppButton
                  title={t('realtime.disconnect')}
                  variant="danger"
                  size="sm"
                  onPress={handleDisconnectSocket}
                />
              ) : (
                <AppButton
                  title={t('realtime.connect')}
                  variant="tonal"
                  size="sm"
                  leftIcon={<Radio size={15} color={themeColors.primary} />}
                  onPress={handleConnectSocket}
                />
              )}
            </View>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('realtime.sendPing')}
                variant="primary"
                size="sm"
                leftIcon={<Send size={15} color="#FFFFFF" />}
                onPress={handleSendSocketMessage}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Server-Compatible Encryption Section */}
      <View style={styles.skeletonSection}>
        <AppText variant="title" style={styles.sectionHeading}>
          {t('serverCrypto.title', 'Mã Hóa Chuẩn Server Backend')}
        </AppText>
        <View style={styles.serverCryptoBox}>
          <AppText variant="caption" color={themeColors.textSecondary}>
            {t('serverCrypto.subtitle')}
          </AppText>

          {serverPayloadString ? (
            <View style={styles.codeSnippet}>
              <AppText variant="caption" color="#10B981" numberOfLines={3} style={styles.codeSnippetText}>
                {serverPayloadString}
              </AppText>
            </View>
          ) : null}

          {serverDecryptedResult ? (
            <AppText variant="caption" color={themeColors.primary} style={styles.savedKeyText}>
              ✓ {t('common.success')}: {serverDecryptedResult}
            </AppText>
          ) : null}

          <View style={styles.cryptoActionRow}>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('serverCrypto.encryptBtn')}
                variant="tonal"
                size="sm"
                leftIcon={<ShieldCheck size={16} color={themeColors.primary} />}
                onPress={handleEncryptForServer}
              />
            </View>
            <View style={styles.hapticBtn}>
              <AppButton
                title={t('serverCrypto.decryptBtn')}
                variant="outline"
                size="sm"
                disabled={!serverPayloadString}
                leftIcon={<Shield size={16} color={themeColors.primary} />}
                onPress={handleDecryptFromServer}
              />
            </View>
          </View>
        </View>
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
