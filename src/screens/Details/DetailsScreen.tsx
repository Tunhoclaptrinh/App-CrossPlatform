import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import {
  Sparkles,
  Radio,
  Smartphone,
  ShieldCheck,
  Palette,
  Database,
  Sliders,
  SlidersHorizontal,
  ArrowLeft,
  BookOpen,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  ScreenWrapper,
  ConfirmDialog,
  ThemeStudioModal,
  AppButton,
  AppleMeshBackground,
} from '@/components';
import { useAppStore, useToast, useShakeDetection, useThemeMode } from '@/hooks';
import { appStorage, STORAGE_KEYS } from '@/services/storage';
import { appUpdateService } from '@/services/update';
import { fileService } from '@/services/file';
import { biometricService } from '@/services/biometrics';
import { socketService } from '@/services/realtime';
import { permissions, haptics, generateId, cryptoHelper, clipboardHelper } from '@/utils';
import type { ServerEncryptedPayload } from '@/utils';
import type { DetailsScreenProps } from '@/navigation/types';
import { createDetailsStyles } from './styles';
import {
  ModuleTabs,
  ModuleHeaderCard,
  AppleGlassShowcase,
  ThemeStudioShowcase,
  RealtimeShowcase,
  GesturesShowcase,
  CryptoShowcase,
  PaperShowcase,
  StorageShowcase,
  UtilsShowcase,
  StorybookShowcase,
  type ModuleTabItem,
} from './components';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const resolveModuleId = (id?: string) => {
    if (!id) return 'apple';
    if (id === 'store') return 'sqlite';
    if (id === 'i18n') return 'utils';
    if (id === 'core') return 'paper';
    if (id === 'nav') return 'utils';
    if (id === 'storybook') return 'storybook';
    return id;
  };

  const initialItemId = resolveModuleId(route.params?.itemId);
  const [activeModule, setActiveModule] = useState<string>(initialItemId);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  useEffect(() => {
    if (route.params?.itemId) {
      setActiveModule(resolveModuleId(route.params.itemId));
    }
  }, [route.params?.itemId]);

  const {
    theme: themeColors,
    radiusTokens,
    accentColor,
    setAccentColor,
    radiusPreset,
    setRadiusPreset,
    isDark,
    toggleTheme,
  } = useThemeMode();

  const styles = useMemo(
    () => createDetailsStyles(themeColors, radiusTokens, isDark),
    [themeColors, radiusTokens, isDark]
  );

  const { t } = useTranslation();
  const {
    counter,
    increment,
    decrement,
    reset,
    themeStyle,
    toggleThemeStyle,
    language,
  } = useAppStore();
  const toast = useToast();

  // Storage state
  const [storageInput, setStorageInput] = useState('');
  const [savedStorageVal, setSavedStorageVal] = useState<string | null>(null);

  // Form controls & Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(true);
  const [pushNotification, setPushNotification] = useState(false);

  // File I/O state
  const [fileContent, setFileContent] = useState('Universal React Native Base File Content');

  // Crypto, Biometrics & UUID state
  const [uuidValue, setUuidValue] = useState(generateId());
  const [cryptoInput, setCryptoInput] = useState('Client-Side Confidential Data');
  const [cipherResult, setCipherResult] = useState<ServerEncryptedPayload | null>(null);
  const [decryptedResult, setDecryptedResult] = useState<string | null>(null);

  // Gestures feedback
  const [gestureFeedback, setGestureFeedback] = useState('Chạm đúp hoặc vuốt để thử nghiệm');

  // WebSocket State
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

  // Shake Detection
  const { shakeCount, simulateShake, resetShakeCount } = useShakeDetection({
    onShake: () => {
      haptics.heavy();
      toast.show('info', t('shake.shakeDetected', '📳 Phát hiện chuyển động lắc điện thoại!'), t('shake.title'));
    },
  });

  // Load existing storage value on mount
  useEffect(() => {
    appStorage.getItem<string>(STORAGE_KEYS.AI_API_KEY).then((val) => {
      if (val) setSavedStorageVal(val);
    });
  }, []);

  // Module Definitions with full metadata
  const moduleTabs: ModuleTabItem[] = [
    {
      id: 'theme-studio',
      label: 'Theme & Bo Góc',
      fullTitle: 'Studio Tinh Chỉnh Giao Diện',
      desc: 'Tùy chỉnh màu sắc chủ đạo, 4 cấp độ bo góc, phong cách kính Apple Glass và phản hồi xúc giác trong thời gian thực.',
      icon: SlidersHorizontal,
      color: themeColors.primary,
    },
    {
      id: 'apple',
      label: 'Apple Glass',
      fullTitle: 'Apple iOS 18 Liquid Glass',
      desc: 'Cupertino frosted glassmorphism, specular borders & continuous squircles.',
      icon: Sparkles,
      color: '#007AFF',
    },
    {
      id: 'storybook',
      label: 'Storybook UI',
      fullTitle: 'Design System & Storybook Catalog',
      desc: 'Ma trận đồng bộ kích thước chuẩn Button, Input, Select, Badge, Card (sm, md, lg)',
      icon: BookOpen,
      color: '#6366F1',
    },

    {
      id: 'realtime',
      label: 'WebSocket',
      fullTitle: 'Universal Real-Time WebSocket',
      desc: 'Auto-reconnect, offline message queue, heartbeat ping/pong & pub/sub.',
      icon: Radio,
      color: '#10B981',
    },
    {
      id: 'gestures',
      label: 'Cử chỉ & Rung',
      fullTitle: 'Smart Gestures & Shake Motion',
      desc: 'Swipe 4 directions, double tap & phone shake sensor with Haptics feedback.',
      icon: Smartphone,
      color: '#F59E0B',
    },
    {
      id: 'crypto',
      label: 'Bảo mật AES',
      fullTitle: 'Server AES-256 & Security',
      desc: 'Cross-platform cryptography, AES-256-GCM and biometric FaceID/Fingerprint auth.',
      icon: ShieldCheck,
      color: '#8B5CF6',
    },
    {
      id: 'paper',
      label: 'UI Components',
      fullTitle: 'React Native Paper & Base UI',
      desc: 'Material Design 3 tokens, component studio, accessibility & themes.',
      icon: Palette,
      color: '#2563EB',
    },
    {
      id: 'sqlite',
      label: 'SQLite & Store',
      fullTitle: 'SQLite & Persistent Storage',
      desc: 'C++ JSI direct SQLite engine, Zustand unified state & File I/O.',
      icon: Database,
      color: '#0284C7',
    },
    {
      id: 'utils',
      label: 'Tiện ích & i18n',
      fullTitle: 'Platform Tools & Localization',
      desc: 'UUID generator, camera permissions, live i18n & app update checker.',
      icon: Sliders,
      color: '#EC4899',
    },
  ];

  const currentTab = moduleTabs.find((m) => m.id === activeModule) || moduleTabs[0];

  useEffect(() => {
    navigation.setOptions({
      title: currentTab.label,
    });
  }, [currentTab.label, navigation]);

  // Handlers for Demos
  const handleSaveStorage = async () => {
    if (!storageInput.trim()) {
      haptics.warning();
      toast.show('warning', t('details.saveWarning', 'Vui lòng nhập giá trị trước khi lưu!'));
      return;
    }
    await appStorage.setItem(STORAGE_KEYS.AI_API_KEY, storageInput.trim());
    setSavedStorageVal(storageInput.trim());
    setStorageInput('');
    haptics.success();
    toast.show('success', t('details.saveSuccess', 'Đã lưu giá trị vào AsyncStorage bền vững!'));
  };

  const handleSaveFile = async () => {
    if (!fileContent.trim()) {
      toast.show('warning', t('details.fileEmpty', 'Vui lòng nhập nội dung file!'));
      return;
    }
    const info = await fileService.saveFile('demo_note.txt', fileContent);
    if (info && info.id) {
      haptics.success();
      toast.show('success', t('details.fileSaved', 'Đã lưu file thành công!'));
    } else {
      toast.show('error', 'Lưu file thất bại.');
    }
  };

  const handleShareFile = async () => {
    const success = await fileService.exportFile('demo_note.txt');
    if (!success) {
      toast.show('info', 'Chưa có file để chia sẻ. Hãy lưu file trước!');
    }
  };

  const handleEncryptCrypto = () => {
    haptics.light();
    const plaintext = cryptoInput.trim() || 'Sample Plaintext';
    const encrypted = cryptoHelper.encryptForServer(plaintext);
    setCipherResult(encrypted);
    setDecryptedResult(null);
    toast.show('success', 'Đã mã hóa AES-256-GCM thành công!');
  };

  const handleDecryptCrypto = () => {
    if (!cipherResult) return;
    haptics.light();
    const decrypted = cryptoHelper.decryptFromServer(cipherResult);
    setDecryptedResult(decrypted);
    toast.show('success', 'Đã giải mã về chuỗi gốc an toàn!');
  };

  const handleBiometricAuth = async () => {
    haptics.light();
    const result = await biometricService.authenticate({
      promptMessage: 'Xác thực vân tay / Face ID để mở khóa bảo mật',
      cancelTitle: 'Hủy bỏ',
    });
    if (result.success) {
      haptics.success();
      toast.show('success', 'Xác thực sinh trắc học thành công!');
    } else {
      haptics.error();
      toast.show('error', result.error || 'Xác thực thất bại');
    }
  };

  const handleConnectSocket = () => {
    haptics.light();
    socketService.connect();
    toast.show('info', 'Đang thiết lập kết nối WebSocket...');
  };

  const handleDisconnectSocket = () => {
    haptics.light();
    socketService.disconnect();
    toast.show('info', 'Đã ngắt kết nối WebSocket.');
  };

  const handleSendSocketMessage = () => {
    haptics.light();
    const payload = {
      event: 'echo_ping',
      sender: 'UniversalBaseClient',
      timestamp: Date.now(),
    };
    const sent = socketService.emit('echo', payload);
    if (sent) {
      toast.show('success', 'Đã gửi gói tin Echo WebSocket!');
    } else {
      toast.show('warning', 'Mất mạng: Đã đưa vào hàng đợi offline!');
    }
  };

  const handleToggleThemeStyle = () => {
    haptics.light();
    toggleThemeStyle();
    toast.show('info', 'Đã chuyển đổi phong cách giao diện!');
  };

  const handleCheckCamera = async () => {
    haptics.light();
    const granted = await permissions.requestCamera();
    if (granted) {
      haptics.success();
      toast.show('success', 'Quyền Camera đã sẵn sàng (Granted)!');
    } else {
      haptics.warning();
      toast.show('warning', 'Quyền Camera bị từ chối hoặc cần cấp trong Settings.');
    }
  };

  const isGlass = themeStyle === 'apple-glass';

  return (
    <View style={styles.container}>
      {/* Full-bleed Apple Mesh Wallpaper behind the entire screen */}
      {isGlass && <AppleMeshBackground variant="aurora" />}

      <ScreenWrapper
        scrollable
        edges={['bottom', 'left', 'right']}
        backgroundColor={isGlass ? 'transparent' : undefined}
        contentContainerStyle={styles.content}
      >
        {/* 1. Horizontal Module Navigation Tabs */}
        <ModuleTabs
          tabs={moduleTabs}
          activeModule={activeModule}
          onSelectTab={(id) => setActiveModule(id)}
          isDark={isDark}
          radiusTokens={radiusTokens}
          isGlass={isGlass}
        />

        {/* 2. Top Header Overview Card (for non-apple tabs) */}
        {activeModule !== 'apple' && (
          <ModuleHeaderCard
            currentTab={currentTab}
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
          />
        )}

        {/* 3. Dedicated Modules Showcase */}
        {activeModule === 'apple' && (
          <AppleGlassShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            themeStyle={themeStyle}
            onToggleThemeStyle={handleToggleThemeStyle}
          />
        )}

        {activeModule === 'storybook' && (
          <StorybookShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
          />
        )}

        {activeModule === 'theme-studio' && (
          <ThemeStudioShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            radiusPreset={radiusPreset}
            setRadiusPreset={setRadiusPreset}
            isDark={isDark}
            toggleTheme={toggleTheme}
            themeStyle={themeStyle}
            onToggleThemeStyle={handleToggleThemeStyle}
            onOpenStudioModal={() => setIsStudioOpen(true)}
          />
        )}

        {activeModule === 'realtime' && (
          <RealtimeShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
            socketStatus={socketStatus}
            lastSocketMessage={lastSocketMessage}
            onConnect={handleConnectSocket}
            onDisconnect={handleDisconnectSocket}
            onSendMessage={handleSendSocketMessage}
          />
        )}

        {activeModule === 'gestures' && (
          <GesturesShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
            gestureFeedback={gestureFeedback}
            setGestureFeedback={setGestureFeedback}
            shakeCount={shakeCount}
            resetShakeCount={resetShakeCount}
            simulateShake={simulateShake}
            language={language}
          />
        )}

        {activeModule === 'crypto' && (
          <CryptoShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
            cryptoInput={cryptoInput}
            setCryptoInput={setCryptoInput}
            cipherResult={cipherResult}
            decryptedResult={decryptedResult}
            onEncrypt={handleEncryptCrypto}
            onDecrypt={handleDecryptCrypto}
            onBiometricAuth={handleBiometricAuth}
          />
        )}

        {activeModule === 'paper' && (
          <PaperShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
            rememberLogin={rememberLogin}
            setRememberLogin={setRememberLogin}
            pushNotification={pushNotification}
            setPushNotification={setPushNotification}
            onShowToast={() => toast.show('success', 'Thông báo Toast hiển thị sắc nét!', 'UI Feedback')}
            onOpenDialog={() => setIsDialogOpen(true)}
          />
        )}

        {activeModule === 'sqlite' && (
          <StorageShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
            counter={counter}
            onIncrement={increment}
            onDecrement={decrement}
            onReset={reset}
            storageInput={storageInput}
            setStorageInput={setStorageInput}
            savedStorageVal={savedStorageVal}
            onSaveStorage={handleSaveStorage}
            fileContent={fileContent}
            setFileContent={setFileContent}
            onSaveFile={handleSaveFile}
            onShareFile={handleShareFile}
            language={language}
          />
        )}

        {activeModule === 'utils' && (
          <UtilsShowcase
            themeColors={themeColors}
            radiusTokens={radiusTokens}
            isDark={isDark}
            isGlass={isGlass}
            uuidValue={uuidValue}
            onGenerateUuid={() => {
              haptics.light();
              setUuidValue(generateId());
            }}
            onCopyUuid={() => {
              clipboardHelper.copy(uuidValue);
              toast.show('success', 'Đã copy UUID vào bộ nhớ tạm!');
            }}
            onCheckCamera={handleCheckCamera}
            onCheckUpdate={async () => {
              haptics.light();
              const update = await appUpdateService.checkForUpdates();
              if (update && update.hasUpdate) {
                toast.show('info', `Phiên bản mới ${update.latestVersion} đã sẵn sàng!`);
              } else {
                toast.show('success', 'Ứng dụng đang ở phiên bản mới nhất!');
              }
            }}
          />
        )}

        {/* 4. Footer Back Button with Cupertino Liquid Glass */}
        <View style={styles.footerRow}>
          <AppButton
            title={t('common.backToHome', 'Quay lại Trang Chủ')}
            variant="glass"
            size="md"
            leftIcon={<ArrowLeft size={16} color={themeColors.text} strokeWidth={2.2} />}
            onPress={() => {
              haptics.light();
              navigation.goBack();
            }}
          />
        </View>

        {/* Confirm Dialog Modal */}
        <ConfirmDialog
          visible={isDialogOpen}
          title="Xác nhận thao tác kiểm tra?"
          message="Hộp thoại này minh họa ConfirmDialog component với hiệu ứng mờ nền và nút bấm an toàn."
          onConfirm={() => {
            haptics.success();
            setIsDialogOpen(false);
            toast.show('success', 'Bạn đã nhấn Xác nhận!');
          }}
          onCancel={() => {
            setIsDialogOpen(false);
          }}
        />

        {/* Dynamic Theme & Radius Studio Modal */}
        <ThemeStudioModal
          visible={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
        />
      </ScreenWrapper>
    </View>
  );
};


