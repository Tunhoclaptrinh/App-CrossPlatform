import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Radio,
  Smartphone,
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
  Minus,
  Send,
  Database,
  Palette,
  Server,
  Sliders,
  SlidersHorizontal,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  AppText,
  AppButton,
  AppInput,
  ScreenWrapper,
  ConfirmDialog,
  AppCheckbox,
  AppSwitch,
  GestureCard,
  GlassCard,
  ThemeStudioModal,
} from '@/components';
import { useAppStore, useToast, useShakeDetection, useThemeMode } from '@/hooks';
import { AccentPalettes } from '@/constants/colors';
import { RadiusPresets } from '@/constants/theme';
import { appStorage, STORAGE_KEYS } from '@/services/storage';
import { appUpdateService } from '@/services/update';
import { fileService } from '@/services/file';
import { biometricService } from '@/services/biometrics';
import { socketService } from '@/services/realtime';
import { permissions, haptics, generateId, cryptoHelper, clipboardHelper } from '@/utils';
import type { ServerEncryptedPayload } from '@/utils';
import type { DetailsScreenProps } from '@/navigation/types';
import { createDetailsStyles } from './styles';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const resolveModuleId = (id?: string) => {
    if (!id) return 'apple';
    if (id === 'store') return 'sqlite';
    if (id === 'i18n') return 'utils';
    if (id === 'core') return 'paper';
    if (id === 'nav') return 'utils';
    return id;
  };

  const initialItemId = resolveModuleId(route.params?.itemId);
  const [activeModule, setActiveModule] = useState<string>(initialItemId);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Sync activeModule when navigating from home with a new itemId
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
  const styles = createDetailsStyles(themeColors, radiusTokens);

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

  // Local storage demo state
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

  // Switch Module Pill Handler
  const handleSelectModule = (id: string) => {
    haptics.light();
    setActiveModule(id);
  };

  // Module Definitions with full metadata
  const moduleTabs = [
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

  // Current Module Meta
  const currentTab = moduleTabs.find((m) => m.id === activeModule) || moduleTabs[0];

  // Update navigation screen title dynamically when switching tabs
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

  return (
    <ScreenWrapper scrollable edges={['bottom', 'left', 'right']} contentContainerStyle={styles.content}>
      {/* 1. Horizontal Module Navigation Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.moduleSwitcherScroll}
        contentContainerStyle={styles.moduleSwitcherContent}
      >
        {moduleTabs.map((tab) => {
          const isActive = activeModule === tab.id;
          const TabIcon = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              style={[styles.moduleChip, isActive && styles.moduleChipActive]}
              onPress={() => handleSelectModule(tab.id)}
            >
              <TabIcon size={14} color={isActive ? '#FFFFFF' : tab.color} />
              <AppText style={[styles.moduleChipText, isActive && styles.moduleChipTextActive]}>
                {tab.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 2. Top Header Overview Card / Showcase */}
      {activeModule === 'apple' ? (
        <GlassCard style={styles.glassShowcaseCard}>
          <View style={styles.headerTopRow}>
            <View style={[styles.headerIconBox, styles.headerIconBoxGlass]}>
              <Sparkles size={24} color="#007AFF" />
            </View>
            <View style={styles.headerBadge}>
              <View style={styles.headerBadgeDot} />
              <AppText style={styles.headerBadgeText}>
                PRODUCTION READY
              </AppText>
            </View>
          </View>

          <AppText style={styles.headerTitle}>
            Apple iOS 18 Liquid Glass
          </AppText>

          <AppText style={styles.headerDesc}>
            Hiệu ứng kính mờ chiều sâu cao cấp (Frosted Translucency), bo góc chuẩn mực R=16px và viền phản xạ ánh sáng Specular Highlight.
          </AppText>

          <View style={styles.featureList}>
            <View style={styles.featureRow}>
              <CheckCircle2 size={16} color="#007AFF" />
              <AppText style={styles.featureText}>Độ cong chuẩn mực (Apple Squircles) R=16px</AppText>
            </View>
            <View style={styles.featureRow}>
              <CheckCircle2 size={16} color="#007AFF" />
              <AppText style={styles.featureText}>Viền phản xạ ánh sáng (Specular Highlight 1.2px)</AppText>
            </View>
            <View style={styles.featureRow}>
              <CheckCircle2 size={16} color="#007AFF" />
              <AppText style={styles.featureText}>Ánh sáng nền dịu nhẹ, không che khuất nội dung chữ</AppText>
            </View>
          </View>

          <View style={styles.headerTagsRow}>
            <View style={styles.tagChip}>
              <CheckCircle2 size={12} color="#10B981" />
              <AppText style={styles.tagChipText}>Native Tested</AppText>
            </View>
            <View style={styles.tagChip}>
              <Zap size={12} color="#F59E0B" />
              <AppText style={styles.tagChipText}>Zero Latency</AppText>
            </View>
            <View style={styles.tagChip}>
              <ShieldCheck size={12} color={themeColors.primary} />
              <AppText style={styles.tagChipText}>Type Safe (TypeScript)</AppText>
            </View>
          </View>

          <AppButton
            title={themeStyle === 'apple-glass' ? 'Đang bật: Apple Glass' : 'Đang bật: Flat UI'}
            variant={themeStyle === 'apple-glass' ? 'primary' : 'tonal'}
            size="md"
            leftIcon={themeStyle === 'apple-glass' ? <Sparkles size={16} color="#FFFFFF" /> : <Palette size={16} color={themeColors.primary} />}
            onPress={handleToggleThemeStyle}
          />
        </GlassCard>
      ) : (
        <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <View style={[styles.headerIconBox, { backgroundColor: `${currentTab.color}18` }]}>
              <currentTab.icon size={24} color={currentTab.color} />
            </View>
            <View style={styles.headerBadge}>
              <View style={styles.headerBadgeDot} />
              <AppText style={styles.headerBadgeText}>
                PRODUCTION READY
              </AppText>
            </View>
          </View>

          <AppText style={styles.headerTitle}>
            {currentTab.fullTitle}
          </AppText>

          <AppText style={styles.headerDesc}>
            {currentTab.desc}
          </AppText>

          <View style={styles.headerTagsRow}>
            <View style={styles.tagChip}>
              <CheckCircle2 size={12} color="#10B981" />
              <AppText style={styles.tagChipText}>Native Tested</AppText>
            </View>
            <View style={styles.tagChip}>
              <Zap size={12} color="#F59E0B" />
              <AppText style={styles.tagChipText}>Zero Latency</AppText>
            </View>
            <View style={styles.tagChip}>
              <ShieldCheck size={12} color={themeColors.primary} />
              <AppText style={styles.tagChipText}>Type Safe (TypeScript)</AppText>
            </View>
          </View>
        </View>
      )}

      {/* ======================================================== */}
      {/* 3. DEDICATED SHOWCASE: THEME & RADIUS STUDIO             */}
      {/* ======================================================== */}
      {activeModule === 'theme-studio' && (
        <View style={styles.showcaseCard}>
          <View style={styles.showcaseTitleRow}>
            <Sliders size={18} color={themeColors.primary} />
            <AppText style={styles.showcaseTitle}>
              Studio Bo Góc & Màu Sắc Chủ Đạo
            </AppText>
          </View>
          <AppText style={styles.showcaseDesc}>
            Trực tiếp điều chỉnh mức độ bo góc và màu chủ đạo trong thời gian thực. Mọi thay đổi áp dụng tức thì cho toàn bộ ứng dụng và tự động lưu.
          </AppText>

          {/* 1. Appearance & Surface Toggles */}
          <View style={styles.grid2}>
            <View style={styles.grid2Item}>
              <AppButton
                title={isDark ? 'Chế độ Tối (Dark)' : 'Chế độ Sáng (Light)'}
                variant="tonal"
                size="sm"
                onPress={() => {
                  haptics.light();
                  toggleTheme();
                }}
              />
            </View>
            <View style={styles.grid2Item}>
              <AppButton
                title={themeStyle === 'apple-glass' ? 'Kính Apple Glass' : 'Giao diện Flat UI'}
                variant="tonal"
                size="sm"
                onPress={handleToggleThemeStyle}
              />
            </View>
          </View>

          {/* 2. Accent Palette Buttons */}
          <AppText style={styles.codeSnippetLabel}>Màu sắc chủ đạo (Accent Color):</AppText>
          <View style={styles.studioAccentRow}>
            {Object.values(AccentPalettes).map((acc) => {
              const isSelected = accentColor === acc.id;
              return (
                <TouchableOpacity
                  key={acc.id}
                  style={[
                    styles.studioAccentBtn,
                    isSelected && styles.studioAccentBtnActive,
                  ]}
                  onPress={() => {
                    haptics.light();
                    setAccentColor(acc.id);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.studioAccentDot, { backgroundColor: acc.hex }]} />
                  <AppText
                    numberOfLines={1}
                    style={[
                      styles.studioAccentText,
                      isSelected && styles.studioAccentTextActive,
                      isSelected && { color: themeColors.primary },
                    ]}
                  >
                    {acc.nameVi.split(' ')[1] || acc.nameVi}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 3. Radius Presets Grid */}
          <AppText style={styles.codeSnippetLabel}>Cấp độ bo góc (Max 16px an toàn):</AppText>
          <View style={styles.studioRadiusGrid}>
            {Object.values(RadiusPresets).map((preset) => {
              const isSelected = radiusPreset === preset.id;
              return (
                <TouchableOpacity
                  key={preset.id}
                  style={[
                    styles.studioRadiusCard,
                    preset.id === 'sharp' && styles.studioRadiusCardSharp,
                    preset.id === 'compact' && styles.studioRadiusCardCompact,
                    preset.id === 'standard' && styles.studioRadiusCardStandard,
                    preset.id === 'smooth' && styles.studioRadiusCardSmooth,
                    isSelected && styles.studioRadiusCardActive,
                  ]}
                  onPress={() => {
                    haptics.light();
                    setRadiusPreset(preset.id);
                  }}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.studioRadiusPreview,
                      preset.id === 'sharp' && styles.studioRadiusPreviewSharp,
                      preset.id === 'compact' && styles.studioRadiusPreviewCompact,
                      preset.id === 'standard' && styles.studioRadiusPreviewStandard,
                      preset.id === 'smooth' && styles.studioRadiusPreviewSmooth,
                      isSelected && styles.studioRadiusPreviewActive,
                    ]}
                  />
                  <AppText
                    style={[
                      styles.studioRadiusName,
                      isSelected && styles.studioRadiusNameActive,
                    ]}
                  >
                    {preset.name}
                  </AppText>
                  <AppText style={styles.studioRadiusPx}>
                    {preset.control >= 999 ? '16px/Pill' : `${preset.card}px/${preset.control}px`}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 4. Live Sandbox Demo */}
          <View style={styles.featureList}>
            <View style={styles.featureRow}>
              <CheckCircle2 size={16} color={themeColors.primary} />
              <AppText style={styles.featureText}>
                Bo góc hiện tại: {radiusTokens.name} (Card {radiusTokens.card}px, Control {radiusTokens.control}px)
              </AppText>
            </View>
            <View style={styles.featureRow}>
              <CheckCircle2 size={16} color={themeColors.primary} />
              <AppText style={styles.featureText}>
                Màu chủ đạo: {AccentPalettes[accentColor]?.nameVi} ({themeColors.primary})
              </AppText>
            </View>
          </View>

          {/* Quick Studio Modal Trigger */}
          <AppButton
            title="Mở Bảng Tinh Chỉnh Nổi (Studio Modal)"
            variant="primary"
            size="md"
            leftIcon={<Sliders size={16} color="#FFFFFF" />}
            onPress={() => {
              haptics.light();
              setIsStudioOpen(true);
            }}
          />
        </View>
      )}

      {/* ======================================================== */}
      {/* 4. DEDICATED SHOWCASE: WEBSOCKET (`realtime`)              */}
      {/* ======================================================== */}
      {activeModule === 'realtime' && (
        <View style={styles.showcaseCard}>
          <View style={styles.showcaseTitleRow}>
            <Radio size={18} color="#10B981" />
            <AppText style={styles.showcaseTitle}>
              Real-Time WebSocket Engine
            </AppText>
          </View>
          <AppText style={styles.showcaseDesc}>
            Kết nối 2 chiều liên tục, tự động kết nối lại khi mất mạng, hàng đợi gói tin offline và heartbeat ping/pong.
          </AppText>

          {/* Terminal Log Console */}
          <View style={styles.terminalBox}>
            <View style={styles.terminalHeader}>
              <View style={styles.terminalDots}>
                <View style={styles.dotRed} />
                <View style={styles.dotYellow} />
                <View style={styles.dotGreen} />
              </View>
              <AppText style={styles.terminalTitle}>
                STATUS: {socketStatus.toUpperCase()}
              </AppText>
            </View>
            <AppText style={lastSocketMessage ? styles.terminalContent : styles.terminalContentEmpty}>
              {lastSocketMessage ? `> RECEIVE: ${lastSocketMessage}` : '> Console lắng nghe gói tin... Sẵn sàng kết nối.'}
            </AppText>
          </View>

          {/* Action Buttons */}
          <View style={styles.grid2}>
            <View style={styles.grid2Item}>
              <AppButton
                title="Kết Nối Server"
                variant="primary"
                size="sm"
                onPress={handleConnectSocket}
              />
            </View>
            <View style={styles.grid2Item}>
              <AppButton
                title="Ngắt Kết Nối"
                variant="tonal"
                size="sm"
                onPress={handleDisconnectSocket}
              />
            </View>
          </View>

          <AppButton
            title="Gửi Gói Tin Test (Emit Echo)"
            variant="outline"
            size="sm"
            leftIcon={<Send size={15} color={themeColors.primary} />}
            onPress={handleSendSocketMessage}
          />
        </View>
      )}

      {/* ======================================================== */}
      {/* 5. DEDICATED SHOWCASE: GESTURES & HAPTICS (`gestures`)     */}
      {/* ======================================================== */}
      {activeModule === 'gestures' && (
        <View>
          {/* Interactive Touch Pad */}
          <GestureCard
            title="Bàn Cảm Ứng Tương Tác"
            description={gestureFeedback}
            onSwipeLeft={() => {
              haptics.light();
              setGestureFeedback('👈 Đã vuốt sang TRÁI (Swipe Left)');
            }}
            onSwipeRight={() => {
              haptics.light();
              setGestureFeedback('👉 Đã vuốt sang PHẢI (Swipe Right)');
            }}
            onDoubleTap={() => {
              haptics.success();
              setGestureFeedback('⚡ Đã chạm đúp (Double Tap)');
            }}
          />

          {/* Phone Shake Sensor Studio */}
          <View style={styles.showcaseCard}>
            <View style={styles.showcaseTitleRow}>
              <Smartphone size={18} color="#F59E0B" />
              <AppText style={styles.showcaseTitle}>
                Cảm Biến Lắc Điện Thoại (Shake Motion)
              </AppText>
            </View>
            <AppText style={styles.showcaseDesc}>
              Nhận diện gia tốc chuyển động thực tế trên thiết bị kèm bộ lọc chống kích hoạt nhầm.
            </AppText>

            <View style={styles.stepperCard}>
              <View style={styles.stepperValueBlock}>
                <AppText style={styles.stepperUnit}>
                  {language === 'vi' ? 'Số lần lắc phát hiện' : 'Detected Shakes'}
                </AppText>
                <AppText style={styles.stepperBigNum}>{shakeCount}</AppText>
              </View>

              <View style={styles.stepperActions}>
                <TouchableOpacity
                  style={styles.stepperResetBtn}
                  activeOpacity={0.7}
                  onPress={() => {
                    haptics.warning();
                    resetShakeCount();
                  }}
                >
                  <RotateCcw size={16} color={themeColors.textSecondary} />
                </TouchableOpacity>

                <AppButton
                  title="Mô Phỏng Lắc"
                  variant="tonal"
                  size="sm"
                  onPress={simulateShake}
                />
              </View>
            </View>
          </View>

          {/* Haptics Soundboard */}
          <View style={styles.showcaseCard}>
            <View style={styles.showcaseTitleRow}>
              <Zap size={18} color="#007AFF" />
              <AppText style={styles.showcaseTitle}>
                Bộ Phản Hồi Rung Taptic Engine (Haptics)
              </AppText>
            </View>
            <AppText style={styles.showcaseDesc}>
              Mô phỏng chân thực các cường độ phản hồi xúc giác cho từng thao tác UI.
            </AppText>

            <View style={styles.grid3}>
              <View style={styles.grid3Item}>
                <AppButton title="Rung Nhẹ" variant="tonal" size="sm" onPress={() => haptics.light()} />
              </View>
              <View style={styles.grid3Item}>
                <AppButton title="Rung Vừa" variant="tonal" size="sm" onPress={() => haptics.medium()} />
              </View>
              <View style={styles.grid3Item}>
                <AppButton title="Rung Mạnh" variant="tonal" size="sm" onPress={() => haptics.heavy()} />
              </View>
            </View>

            <View style={styles.grid3}>
              <View style={styles.grid3Item}>
                <AppButton title="Thành Công" variant="tonal" size="sm" onPress={() => haptics.success()} />
              </View>
              <View style={styles.grid3Item}>
                <AppButton title="Cảnh Báo" variant="tonal" size="sm" onPress={() => haptics.warning()} />
              </View>
              <View style={styles.grid3Item}>
                <AppButton title="Lỗi (Error)" variant="danger" size="sm" onPress={() => haptics.error()} />
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ======================================================== */}
      {/* 6. DEDICATED SHOWCASE: CRYPTO & SECURITY (`crypto`)        */}
      {/* ======================================================== */}
      {activeModule === 'crypto' && (
        <View style={styles.showcaseCard}>
          <View style={styles.showcaseTitleRow}>
            <ShieldCheck size={18} color="#8B5CF6" />
            <AppText style={styles.showcaseTitle}>
              Phòng Mã Hóa AES-256 & Sinh Trắc Học
            </AppText>
          </View>
          <AppText style={styles.showcaseDesc}>
            Chuẩn mã hóa cấp quân sự AES-256-GCM tương thích Backend (Node.js, Go, Python, Java) và xác thực vân tay/FaceID.
          </AppText>

          {/* Plaintext Input */}
          <AppInput
            label="Chuỗi văn bản cần bảo mật:"
            value={cryptoInput}
            onChangeText={setCryptoInput}
            placeholder="Nhập nội dung nhạy cảm..."
          />

          <View style={styles.grid2}>
            <View style={styles.grid2Item}>
              <AppButton
                title="Mã Hóa (AES)"
                variant="primary"
                size="sm"
                leftIcon={<Lock size={14} color="#FFFFFF" />}
                onPress={handleEncryptCrypto}
              />
            </View>
            <View style={styles.grid2Item}>
              <AppButton
                title="Giải Mã Gốc"
                variant="tonal"
                size="sm"
                disabled={!cipherResult}
                leftIcon={<Unlock size={14} color={themeColors.primary} />}
                onPress={handleDecryptCrypto}
              />
            </View>
          </View>

          {/* Output Inspection */}
          {cipherResult && (
            <View style={styles.codeSnippet}>
              <AppText style={styles.codeSnippetLabel}>Bản mã Ciphertext (Base64):</AppText>
              <AppText style={styles.codeSnippetText} numberOfLines={2}>
                {cipherResult.ciphertext}
              </AppText>
            </View>
          )}

          {decryptedResult && (
            <View style={[styles.codeSnippet, styles.codeSnippetSuccess]}>
              <AppText style={[styles.codeSnippetLabel, styles.codeSnippetSuccessLabel]}>Chuỗi đã giải mã thành công:</AppText>
              <AppText style={[styles.codeSnippetText, styles.codeSnippetSuccessText]}>
                {decryptedResult}
              </AppText>
            </View>
          )}

          {/* Biometrics Test */}
          <View style={styles.actionButtonSpacing}>
            <AppButton
              title="Thử Nghiệm FaceID / Vân Tay"
              variant="outline"
              size="md"
              leftIcon={<Fingerprint size={18} color={themeColors.primary} />}
              onPress={handleBiometricAuth}
            />
          </View>
        </View>
      )}

      {/* ======================================================== */}
      {/* 7. DEDICATED SHOWCASE: UI COMPONENTS & PAPER (`paper`)     */}
      {/* ======================================================== */}
      {activeModule === 'paper' && (
        <View style={styles.showcaseCard}>
          <View style={styles.showcaseTitleRow}>
            <Palette size={18} color="#2563EB" />
            <AppText style={styles.showcaseTitle}>
              Thư Viện Component Chuẩn Material 3
            </AppText>
          </View>
          <AppText style={styles.showcaseDesc}>
            Các component nền tảng có sẵn trạng thái Active, Pressed, Disabled, Haptic và tự động đổi theo Dark/Light mode.
          </AppText>

          {/* Button Grid Showcase */}
          <View style={styles.grid2}>
            <View style={styles.grid2Item}>
              <AppButton title="Primary Button" variant="primary" size="sm" />
            </View>
            <View style={styles.grid2Item}>
              <AppButton title="Tonal Button" variant="tonal" size="sm" />
            </View>
          </View>

          <View style={styles.grid2}>
            <View style={styles.grid2Item}>
              <AppButton title="Outline Button" variant="outline" size="sm" />
            </View>
            <View style={styles.grid2Item}>
              <AppButton title="Danger Button" variant="danger" size="sm" />
            </View>
          </View>

          {/* Checkbox & Switch Form Controls */}
          <View style={styles.formBox}>
            <AppCheckbox
              checked={rememberLogin}
              onChange={(val) => {
                haptics.light();
                setRememberLogin(val);
              }}
              label="Ghi nhớ đăng nhập an toàn (AppCheckbox)"
            />

            <AppSwitch
              value={pushNotification}
              onValueChange={(val) => {
                haptics.light();
                setPushNotification(val);
              }}
              label="Thông báo hệ thống (AppSwitch)"
              sublabel="Cập nhật tin nhắn & giao dịch theo thời gian thực"
            />
          </View>

          {/* Dialog & Notification Action Triggers */}
          <View style={styles.grid2}>
            <View style={styles.grid2Item}>
              <AppButton
                title="Bật Thử Toast"
                variant="outline"
                size="sm"
                leftIcon={<Bell size={14} color={themeColors.primary} />}
                onPress={() => toast.show('success', 'Thông báo Toast hiển thị sắc nét!', 'UI Feedback')}
              />
            </View>
            <View style={styles.grid2Item}>
              <AppButton
                title="Mở Hộp Thoại"
                variant="outline"
                size="sm"
                leftIcon={<AlertTriangle size={14} color="#EF4444" />}
                onPress={() => setIsDialogOpen(true)}
              />
            </View>
          </View>
        </View>
      )}

      {/* ======================================================== */}
      {/* 8. DEDICATED SHOWCASE: STORAGE & SQLITE (`sqlite`)         */}
      {/* ======================================================== */}
      {activeModule === 'sqlite' && (
        <View>
          {/* Zustand Reactive State Stepper */}
          <View style={styles.showcaseCard}>
            <View style={styles.showcaseTitleRow}>
              <Database size={18} color="#0284C7" />
              <AppText style={styles.showcaseTitle}>
                Zustand Reactive Store
              </AppText>
            </View>
            <AppText style={styles.showcaseDesc}>
              Biến toàn cục phản ứng tức thì không cần props drilling, tự động lưu xuống đĩa.
            </AppText>

            <View style={styles.stepperCard}>
              <View style={styles.stepperValueBlock}>
                <AppText style={styles.stepperUnit}>
                  {language === 'vi' ? 'Giá trị hiện tại' : 'Current Value'}
                </AppText>
                <AppText style={styles.stepperBigNum}>{counter}</AppText>
              </View>

              <View style={styles.stepperBox}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => {
                    haptics.light();
                    decrement();
                  }}
                >
                  <Minus size={16} color={themeColors.text} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => {
                    haptics.warning();
                    reset();
                  }}
                >
                  <RotateCcw size={14} color={themeColors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.stepperBtn, styles.stepperBtnPrimary]}
                  onPress={() => {
                    haptics.success();
                    increment();
                  }}
                >
                  <Plus size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Key-Value Persistent Storage */}
          <View style={styles.showcaseCard}>
            <View style={styles.showcaseTitleRow}>
              <Server size={18} color="#0284C7" />
              <AppText style={styles.showcaseTitle}>
                AsyncStorage Key-Value
              </AppText>
            </View>
            <AppInput
              label="Nhập dữ liệu lưu vào máy:"
              value={storageInput}
              onChangeText={setStorageInput}
              placeholder="Ví dụ: user_auth_token_xyz"
            />
            <AppButton
              title="Lưu Xuống Bộ Nhớ Bền Vững"
              variant="primary"
              size="sm"
              onPress={handleSaveStorage}
            />

            {savedStorageVal && (
              <View style={[styles.codeSnippet, styles.codeSnippetMarginTop]}>
                <AppText style={styles.codeSnippetLabel}>Dữ liệu đang lưu trong máy:</AppText>
                <AppText style={styles.codeSnippetText}>{savedStorageVal}</AppText>
              </View>
            )}
          </View>

          {/* File I/O Studio */}
          <View style={styles.showcaseCard}>
            <View style={styles.showcaseTitleRow}>
              <Share2 size={18} color="#0284C7" />
              <AppText style={styles.showcaseTitle}>
                Lưu Trữ & Xuất File (File I/O)
              </AppText>
            </View>
            <AppInput
              label="Tập tin (demo_note.txt):"
              value={fileContent}
              onChangeText={setFileContent}
              placeholder="Nội dung tập tin..."
            />
            <View style={styles.grid2}>
              <View style={styles.grid2Item}>
                <AppButton title="Lưu File" variant="tonal" size="sm" onPress={handleSaveFile} />
              </View>
              <View style={styles.grid2Item}>
                <AppButton title="Chia Sẻ / Xuất" variant="outline" size="sm" onPress={handleShareFile} />
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ======================================================== */}
      {/* 9. DEDICATED SHOWCASE: UTILS & TOOLS (`utils`)             */}
      {/* ======================================================== */}
      {activeModule === 'utils' && (
        <View style={styles.showcaseCard}>
          <View style={styles.showcaseTitleRow}>
            <Sliders size={18} color="#EC4899" />
            <AppText style={styles.showcaseTitle}>
              Bộ Tiện Ích & Phần Cứng Thiết Bị
            </AppText>
          </View>
          <AppText style={styles.showcaseDesc}>
            Xử lý quyền hệ điều hành, đa ngôn ngữ, định danh UUID và cập nhật tự động.
          </AppText>

          <View style={styles.codeSnippet}>
            <AppText style={styles.codeSnippetLabel}>UUID v4 ngẫu nhiên:</AppText>
            <AppText style={styles.codeSnippetText}>{uuidValue}</AppText>
          </View>

          <View style={styles.grid2}>
            <View style={styles.grid2Item}>
              <AppButton
                title="Tạo UUID Mới"
                variant="tonal"
                size="sm"
                onPress={() => {
                  haptics.light();
                  setUuidValue(generateId());
                }}
              />
            </View>
            <View style={styles.grid2Item}>
              <AppButton
                title="Sao Chép UUID"
                variant="outline"
                size="sm"
                leftIcon={<Copy size={14} color={themeColors.primary} />}
                onPress={() => {
                  clipboardHelper.copy(uuidValue);
                  toast.show('success', 'Đã copy UUID vào bộ nhớ tạm!');
                }}
              />
            </View>
          </View>

          <View style={styles.actionButtonSpacingSm}>
            <AppButton
              title="Kiểm Tra Quyền Camera"
              variant="outline"
              size="md"
              leftIcon={<Camera size={16} color={themeColors.primary} />}
              onPress={handleCheckCamera}
            />
          </View>

          <View style={styles.actionButtonSpacingSm}>
            <AppButton
              title="Kiểm Tra Cập Nhật Ứng Dụng"
              variant="tonal"
              size="md"
              leftIcon={<RefreshCw size={16} color={themeColors.primary} />}
              onPress={async () => {
                haptics.light();
                const update = await appUpdateService.checkForUpdates();
                if (update && update.hasUpdate) {
                  toast.show('info', `Phiên bản mới ${update.latestVersion} đã sẵn sàng!`);
                } else {
                  toast.show('success', 'Ứng dụng đang ở phiên bản mới nhất!');
                }
              }}
            />
          </View>
        </View>
      )}

      {/* 10. Footer Back Button */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={styles.backHomeBtn}
          activeOpacity={0.7}
          onPress={() => {
            haptics.light();
            navigation.goBack();
          }}
        >
          <ArrowLeft size={16} color={themeColors.text} />
          <AppText style={styles.backHomeText}>
            Quay lại Trang Chủ
          </AppText>
        </TouchableOpacity>
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
  );
};
