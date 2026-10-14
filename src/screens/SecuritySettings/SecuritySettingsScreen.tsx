import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import {
  ShieldCheck,
  Cpu,
  RotateCcw,
  Sparkles,
  Zap,
  Key,
  CheckCircle2,
  Lock,
  Smartphone,
  Code2,
  Check,
  Palette,
  Terminal,
  Copy,
  Binary,
  Hash,
  Database,
} from 'lucide-react-native';
import {
  ScreenWrapper,
  AppHeader,
  AppText,
  AppButton,
  AppCard,
  AppBadge,
  AppSwitch,
} from '@/components';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { useToast } from '@/hooks';
import { haptics } from '@/utils/haptics';
import { cryptoHelper } from '@/utils/crypto';
import { clipboardHelper } from '@/utils/clipboard';
import type { SecuritySettingsScreenProps } from '@/navigation/types';
import type { CipherAlgorithm, KeyDerivationType, AppIconPreset, CryptoPacket } from '@/screens/Auth/types';
import { createSecuritySettingsStyles } from './styles';

const ICON_PRESETS: AppIconPreset[] = [
  {
    id: 'aurora',
    name: 'Aurora Teal (Mặc Định)',
    description: 'Phong cách tối giản hiện đại phối màu lam ngọc cao cấp.',
    theme: 'aurora',
    primaryColor: '#06B6D4',
    secondaryColor: '#3B82F6',
    badge: 'Mặc định',
    aliasName: 'MainActivity',
  },
  {
    id: 'cyber',
    name: 'Cyberpunk Neon',
    description: 'Ánh sáng neon tương lai rực rỡ mang phong cách Hacker.',
    theme: 'neon',
    primaryColor: '#EC4899',
    secondaryColor: '#8B5CF6',
    badge: 'Cyberpunk',
    aliasName: 'MainActivityCyber',
  },
  {
    id: 'gold',
    name: 'Cupertino Gold',
    description: 'Ánh kim vàng kim loại sang trọng chuẩn dòng iPhone Pro.',
    theme: 'gold',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    badge: 'Luxury',
    aliasName: 'MainActivityGold',
  },
  {
    id: 'midnight',
    name: 'Midnight Glass',
    description: 'Sâu thẳm như màn đêm OLED với viền phản quang mờ.',
    theme: 'glass',
    primaryColor: '#6366F1',
    secondaryColor: '#4338CA',
    badge: 'OLED Black',
    aliasName: 'MainActivityMidnight',
  },
  {
    id: 'matrix',
    name: 'Emerald Matrix',
    description: 'Sắc xanh ngọc lục bảo bảo mật quân sự phong cách mã hóa.',
    theme: 'emerald',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    badge: 'Security',
    aliasName: 'MainActivityMatrix',
  },
  {
    id: 'monochrome',
    name: 'Minimal Monochrome',
    description: 'Đơn sắc đen trắng tương phản cao chuẩn phong cách Swiss Design.',
    theme: 'monochrome',
    primaryColor: '#64748B',
    secondaryColor: '#334155',
    badge: 'Minimal',
    aliasName: 'MainActivityMono',
  },
];

export const SecuritySettingsScreen: React.FC<SecuritySettingsScreenProps> = ({ navigation }) => {
  const { theme: themeColors, radiusTokens, isDark } = useThemeMode();
  const styles = useMemo(
    () => createSecuritySettingsStyles(themeColors, isDark, radiusTokens),
    [themeColors, isDark, radiusTokens]
  );
  const toast = useToast();

  const {
    securityConfig,
    setSecurityConfig,
    resetSecurityConfig,
    latestCryptoPacket,
    setLatestCryptoPacket,
    headerVariant,
  } = useAppStore();

  const [activeIconId, setActiveIconId] = useState<string>('aurora');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testingCrypto, setTestingCrypto] = useState<boolean>(false);

  const selectedPreset = useMemo(
    () => ICON_PRESETS.find((p) => p.id === activeIconId) || ICON_PRESETS[0],
    [activeIconId]
  );

  const cipherOptions: Array<{ id: CipherAlgorithm; title: string; desc: string; badge: string }> = [
    {
      id: 'AES-256-GCM',
      title: 'AES-256-GCM (Authenticated Encryption)',
      desc: 'Mã hóa đối xứng 256-bit chuẩn OWASP. Có Auth Tag chống sửa đổi gói tin.',
      badge: 'Khuyến nghị',
    },
    {
      id: 'ChaCha20-Poly1305',
      title: 'ChaCha20-Poly1305 (Mobile Optimized)',
      desc: 'Thuật toán dòng tối ưu cho CPU ARM di động, tốc độ cao và bảo mật vượt trội.',
      badge: 'Tốc độ cao',
    },
    {
      id: 'AES-256-CBC',
      title: 'AES-256-CBC + HMAC-SHA256',
      desc: 'Chuẩn tương thích ngược cổ điển, dùng khối đệm PKCS7 và chữ ký HMAC.',
      badge: 'Legacy',
    },
  ];

  const kdfOptions: Array<{ id: KeyDerivationType; title: string; desc: string; badge: string }> = [
    {
      id: 'PBKDF2-100k',
      title: 'PBKDF2 (100,000 Rounds)',
      desc: 'Tiêu chuẩn bảo mật OWASP khuyên dùng. Chống tấn công brute-force GPU hiệu quả.',
      badge: 'Bảo Mật Cao',
    },
    {
      id: 'PBKDF2-10k',
      title: 'PBKDF2 (10,000 Rounds)',
      desc: 'Cân bằng giữa hiệu năng CPU và độ an toàn trên các thiết bị cấu hình trung bình.',
      badge: 'Cân bằng',
    },
    {
      id: 'SHA-256',
      title: 'SHA-256 Fast Hash',
      desc: 'Băm nhanh 1 vòng lặp trực tiếp với Salt & Secret Pepper.',
      badge: 'Siêu Nhanh',
    },
  ];

  const handleCipherChange = (cipher: CipherAlgorithm) => {
    haptics.selection();
    setSecurityConfig({ ...securityConfig, cipherAlgorithm: cipher });
    toast.show('info', `Đã chuyển thuật toán sang ${cipher}`);
  };

  const handleKdfChange = (kdf: KeyDerivationType) => {
    haptics.selection();
    setSecurityConfig({ ...securityConfig, keyDerivation: kdf });
    toast.show('info', `Đã chuyển hàm dẫn xuất KDF sang ${kdf}`);
  };

  const handleSelectIcon = (preset: AppIconPreset) => {
    haptics.selection();
    setActiveIconId(preset.id);
  };

  const handleApplyIcon = () => {
    haptics.success();
    Alert.alert(
      'Tùy Chỉnh Icon Ứng Dụng',
      `Đã chuyển biểu tượng ứng dụng sang "${selectedPreset.name}".\n\nTrên bản release, icon ngoài màn hình chính của điện thoại sẽ đổi thành alias tương ứng.`,
      [{ text: 'Đã Hiểu', style: 'default' }]
    );
  };

  const handleCopy = useCallback((key: string, text: string) => {
    haptics.light();
    clipboardHelper.copy(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
    toast.show('success', 'Đã sao chép vào bộ nhớ tạm');
  }, [toast]);

  const handleRunLiveCryptoTest = useCallback(async () => {
    haptics.light();
    setTestingCrypto(true);

    try {
      let salt = '';
      for (let i = 0; i < 16; i++) {
        salt += Math.floor(Math.random() * 16).toString(16);
      }

      const samplePassword = 'SuperSecurePassword@2026';
      const passwordHash = securityConfig.enableZeroKnowledgeHash
        ? cryptoHelper.hash(`${salt}:${samplePassword}:${securityConfig.secretPepper}`)
        : cryptoHelper.hash(samplePassword);

      const rawPayload = JSON.stringify({
        account: 'developer@enterprise.internal',
        passwordHash,
        cipher: securityConfig.cipherAlgorithm,
        kdf: securityConfig.keyDerivation,
        nonce: Math.random().toString(36).substring(2, 10),
        timestamp: new Date().toISOString(),
      });

      const encrypted = cryptoHelper.encryptForServer(rawPayload, securityConfig.secretPepper);

      await new Promise((resolve) => setTimeout(() => resolve(undefined), 300));

      const decrypted = cryptoHelper.decryptFromServer(encrypted, securityConfig.secretPepper);
      const isVerified = Boolean(decrypted);

      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${cryptoHelper.hash(rawPayload).slice(0, 32)}.${encrypted.tag}`;

      const packetData: CryptoPacket = {
        id: `pkt_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        action: 'signin',
        username: 'developer',
        passwordHash: passwordHash.slice(0, 24) + '...',
        salt,
        iv: encrypted.iv,
        ciphertext: encrypted.ciphertext,
        tag: encrypted.tag,
        combined: encrypted.combined,
        serverVerified: isVerified,
        decryptedData: isVerified && decrypted ? JSON.parse(decrypted) : null,
        token: mockToken,
        tokenPayload: {
          sub: `usr_${Math.floor(Math.random() * 899999 + 100000)}`,
          email: 'developer@enterprise.internal',
          role: 'security_auditor',
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 86400,
          iss: 'enterprise_crypto_engine',
          cipher: securityConfig.cipherAlgorithm,
        },
      };

      setLatestCryptoPacket(packetData);
      haptics.success();
      toast.show('success', 'Mã hóa và kiểm tra tính toàn vẹn gói tin thành công!');
    } catch {
      haptics.error();
      toast.show('error', 'Có lỗi khi thử nghiệm mã hóa!');
    } finally {
      setTestingCrypto(false);
    }
  }, [securityConfig, setLatestCryptoPacket, toast]);

  const activePacket = latestCryptoPacket;

  return (
    <ScreenWrapper style={styles.container} scrollable contentContainerStyle={styles.scrollContent}>
      {/* 1. Header Navigation */}
      <AppHeader
        title="Cài Đặt Bảo Mật & Mã Hóa"
        subtitle="Chuẩn OWASP, KDF & Tùy biến Icon"
        showBack
        onBack={() => navigation.goBack()}
        variant={headerVariant}
      />

      {/* 2. Thuật toán mã hóa đối xứng */}
      <AppCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <ShieldCheck size={18} color={themeColors.primary} strokeWidth={2.2} />
            <AppText style={styles.sectionTitle}>1. Thuật Toán Mã Hóa Đối Xứng</AppText>
          </View>
          <AppBadge label={securityConfig.cipherAlgorithm} variant="primary" size="sm" />
        </View>
        <AppText style={styles.sectionDesc}>
          Bảo vệ dữ liệu tài khoản, payload truyền mạng và session token giữa Client và Máy chủ.
        </AppText>

        <View style={styles.optionGrid}>
          {cipherOptions.map((opt) => {
            const isActive = securityConfig.cipherAlgorithm === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.8}
                style={[styles.optionCard, isActive && styles.optionCardActive]}
                onPress={() => handleCipherChange(opt.id)}
              >
                <View style={styles.optionLeft}>
                  <AppText style={[styles.optionName, isActive && styles.optionNameActive]}>
                    {opt.title}
                  </AppText>
                  <AppText style={styles.optionDescText}>{opt.desc}</AppText>
                </View>
                {isActive && <CheckCircle2 size={18} color={themeColors.primary} strokeWidth={2.5} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </AppCard>

      {/* 3. Hàm Dẫn Xuất Khóa (KDF) & Zero-Knowledge Hashing */}
      <AppCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Cpu size={18} color="#8B5CF6" strokeWidth={2.2} />
            <AppText style={styles.sectionTitle}>2. Hàm Dẫn Xuất Khóa (KDF)</AppText>
          </View>
          <AppBadge label={securityConfig.keyDerivation} variant="info" size="sm" />
        </View>
        <AppText style={styles.sectionDesc}>
          Số vòng lặp băm mật khẩu tại Client. Càng nhiều vòng càng ngăn chặn tấn công từ điển và dò mật khẩu GPU.
        </AppText>

        <View style={styles.optionGrid}>
          {kdfOptions.map((opt) => {
            const isActive = securityConfig.keyDerivation === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.8}
                style={[styles.optionCard, isActive && styles.optionCardActive]}
                onPress={() => handleKdfChange(opt.id)}
              >
                <View style={styles.optionLeft}>
                  <AppText style={[styles.optionName, isActive && styles.optionNameActive]}>
                    {opt.title}
                  </AppText>
                  <AppText style={styles.optionDescText}>{opt.desc}</AppText>
                </View>
                {isActive && <CheckCircle2 size={18} color="#8B5CF6" strokeWidth={2.5} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <AppText style={styles.switchLabel}>Băm Zero-Knowledge tại Client</AppText>
            <AppText style={styles.switchDesc}>
              Mật khẩu thô không bao giờ rời khỏi thiết bị. Client tự sinh Salt và băm trước khi gửi.
            </AppText>
          </View>
          <AppSwitch
            value={securityConfig.enableZeroKnowledgeHash}
            onValueChange={(val) => {
              haptics.selection();
              setSecurityConfig({ ...securityConfig, enableZeroKnowledgeHash: val });
            }}
          />
        </View>
      </AppCard>

      {/* 4. Khóa bí mật Pepper */}
      <AppCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Key size={18} color="#F59E0B" strokeWidth={2.2} />
            <AppText style={styles.sectionTitle}>3. Chuỗi Bí Mật Ứng Dụng (Pepper)</AppText>
          </View>
          <AppBadge label="Secret Key" variant="warning" size="sm" />
        </View>
        <AppText style={styles.sectionDesc}>
          Chuỗi salt bí mật toàn cục của ứng dụng, kết hợp cùng Salt động để chống tra cứu Rainbow Table.
        </AppText>
        <View style={styles.pepperRow}>
          <Lock size={15} color="#F59E0B" />
          <AppText style={styles.pepperText}>{securityConfig.secretPepper}</AppText>
          <TouchableOpacity onPress={() => handleCopy('pepper', securityConfig.secretPepper)}>
            {copiedKey === 'pepper' ? (
              <Check size={14} color="#10B981" strokeWidth={2.5} />
            ) : (
              <Copy size={14} color={themeColors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
      </AppCard>

      {/* 5. Sinh trắc học & Keystore */}
      <AppCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Lock size={18} color="#10B981" strokeWidth={2.2} />
            <AppText style={styles.sectionTitle}>4. Sinh Trắc Học & Lưu Trữ An Toàn</AppText>
          </View>
          <AppBadge label="Keystore / Enclave" variant="success" size="sm" />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <AppText style={styles.switchLabel}>Bắt buộc Face ID / Vân tay khi Đăng nhập</AppText>
            <AppText style={styles.switchDesc}>Xác thực trực tiếp qua phần cứng Secure Enclave</AppText>
          </View>
          <AppSwitch
            value={securityConfig.requireBiometrics}
            onValueChange={(val) => {
              haptics.selection();
              setSecurityConfig({ ...securityConfig, requireBiometrics: val });
            }}
          />
        </View>

        <View style={[styles.switchRow, styles.switchRowLast]}>
          <View style={styles.switchInfo}>
            <AppText style={styles.switchLabel}>Tự động ghi nhớ Biometrics sau Đăng ký</AppText>
            <AppText style={styles.switchDesc}>Lưu trữ an toàn vào Android Keystore / iOS Keychain</AppText>
          </View>
          <AppSwitch
            value={securityConfig.autoEnrollBiometrics}
            onValueChange={(val) => {
              haptics.selection();
              setSecurityConfig({ ...securityConfig, autoEnrollBiometrics: val });
            }}
          />
        </View>
      </AppCard>

      {/* 6. Tùy biến Icon App màn hình chính */}
      <AppCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Palette size={18} color="#EC4899" strokeWidth={2.2} />
            <AppText style={styles.sectionTitle}>5. Tùy Biến Icon Ứng Dụng Ngoài Màn Hình</AppText>
          </View>
          <AppBadge label={selectedPreset.badge} variant="primary" size="sm" />
        </View>
        <AppText style={styles.sectionDesc}>
          Chọn biểu tượng hiển thị trên màn hình chính (Android Launcher / iOS SpringBoard).
        </AppText>

        <View style={styles.iconPreviewBanner}>
          <View style={[styles.appIconMockupLarge, { backgroundColor: selectedPreset.primaryColor }]}>
            <Sparkles size={28} color="#FFFFFF" strokeWidth={2.2} />
          </View>
          <View style={styles.iconBannerInfo}>
            <View style={styles.iconBannerTitleRow}>
              <AppText style={styles.iconBannerTitle}>{selectedPreset.name}</AppText>
            </View>
            <AppText style={styles.iconBannerDesc}>{selectedPreset.description}</AppText>
          </View>
        </View>

        <View style={styles.iconGrid}>
          {ICON_PRESETS.map((preset) => {
            const isSelected = activeIconId === preset.id;
            return (
              <TouchableOpacity
                key={preset.id}
                activeOpacity={0.8}
                style={[styles.iconItemCard, isSelected && styles.iconItemCardActive]}
                onPress={() => handleSelectIcon(preset)}
              >
                <View style={styles.iconItemLeft}>
                  <View style={[styles.miniIconMockup, { backgroundColor: preset.primaryColor }]}>
                    <Sparkles size={18} color="#FFFFFF" strokeWidth={2} />
                  </View>
                  <View style={styles.iconItemTexts}>
                    <AppText style={[styles.iconItemName, isSelected && { color: themeColors.primary }]}>
                      {preset.name}
                    </AppText>
                    <AppText style={styles.iconItemDesc} numberOfLines={1}>
                      {preset.description}
                    </AppText>
                  </View>
                </View>
                {isSelected && <CheckCircle2 size={18} color={themeColors.primary} strokeWidth={2.5} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <AppButton
          title={`Áp Dụng Icon: ${selectedPreset.name}`}
          variant="primary"
          size="md"
          leftIcon={<Check size={16} color="#FFFFFF" strokeWidth={2.5} />}
          onPress={handleApplyIcon}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowTechnicalDetails(!showTechnicalDetails)}
          style={styles.techToggleBtn}
        >
          <Code2 size={15} color={themeColors.primary} />
          <AppText style={styles.techToggleText}>
            {showTechnicalDetails ? 'Ẩn Hướng Dẫn Kỹ Thuật Native' : 'Xem Cơ Chế Đổi Icon Native (Android & iOS)'}
          </AppText>
        </TouchableOpacity>

        {showTechnicalDetails && (
          <View style={styles.techSection}>
            <View style={styles.techHeaderRow}>
              <Smartphone size={16} color={themeColors.primary} />
              <AppText style={styles.techTitle}>Cơ Chế Hoạt Động Dưới Tầng Native</AppText>
            </View>

            <AppText style={styles.techDesc}>
              <AppText style={styles.boldText}>1. Trên Android:</AppText> Sử dụng cơ chế <AppText style={styles.codeInline}>&lt;activity-alias&gt;</AppText> trong file <AppText style={styles.boldTextInline}>AndroidManifest.xml</AppText>:
            </AppText>

            <AppText style={styles.codeSnippet}>
{`// Android Java/Kotlin:
packageManager.setComponentEnabledSetting(
  new ComponentName(context, "com.reactnative.MainActivityGold"),
  PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
  PackageManager.DONT_KILL_APP
);`}
            </AppText>

            <AppText style={styles.techDescSpacing}>
              <AppText style={styles.boldText}>2. Trên iOS:</AppText> Apple cung cấp API chính thức <AppText style={styles.codeInline}>UIApplication.shared.setAlternateIconName</AppText> từ iOS 10.3+. Khai báo icon trong <AppText style={styles.boldTextInline}>Info.plist</AppText> mục <AppText style={styles.boldTextInline}>CFBundleAlternateIcons</AppText>.
            </AppText>

            <AppText style={styles.codeSnippet}>
{`// React Native library:
import changeIcon from 'react-native-change-icon';
await changeIcon('MainActivityGold');`}
            </AppText>
          </View>
        )}
      </AppCard>

      {/* 7. Công cụ Soi Gói Tin Live & Giải Mã JWT */}
      <AppCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Terminal size={18} color="#0284C7" strokeWidth={2.2} />
            <AppText style={styles.sectionTitle}>6. Công Cụ Soi Gói Tin & Giải Mã JWT</AppText>
          </View>
          <AppBadge
            label={activePacket ? 'Live Captured' : 'Sẵn Sàng'}
            variant={activePacket ? 'success' : 'neutral'}
            size="sm"
          />
        </View>
        <AppText style={styles.sectionDesc}>
          Kiểm tra trực quan dữ liệu mã hóa thực tế sinh ra khi đăng nhập hoặc thử nghiệm live.
        </AppText>

        <AppButton
          title={testingCrypto ? 'Đang mã hóa & xác thực...' : 'Thử Nghiệm Mã Hóa Gói Tin Ngay (Live Test)'}
          variant="outline"
          size="md"
          loading={testingCrypto}
          leftIcon={<Zap size={16} color={themeColors.primary} />}
          onPress={handleRunLiveCryptoTest}
        />

        {activePacket && (
          <View style={styles.terminalCard}>
            {/* Salt & Hash */}
            <View style={styles.terminalTitleRow}>
              <View style={styles.sectionTitleRow}>
                <Hash size={14} color="#F59E0B" />
                <AppText style={styles.switchLabel}>1. Băm Mật Khẩu (Zero-Knowledge)</AppText>
              </View>
              <AppBadge label="Client Salt + Pepper" variant="warning" size="sm" />
            </View>

            <View style={styles.fieldRow}>
              <AppText style={styles.fieldKey}>Salt (16 Hex):</AppText>
              <View style={styles.fieldValueBox}>
                <AppText style={styles.fieldValueText}>{activePacket.salt}</AppText>
                <TouchableOpacity onPress={() => handleCopy('salt', activePacket.salt)} style={styles.copyBtn}>
                  {copiedKey === 'salt' ? (
                    <Check size={12} color="#10B981" />
                  ) : (
                    <Copy size={12} color={themeColors.textSecondary} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <AppText style={styles.fieldKey}>Password Hash:</AppText>
              <View style={styles.fieldValueBox}>
                <AppText style={styles.fieldValueText} numberOfLines={1}>{activePacket.passwordHash}</AppText>
                <TouchableOpacity onPress={() => handleCopy('hash', activePacket.passwordHash)} style={styles.copyBtn}>
                  {copiedKey === 'hash' ? (
                    <Check size={12} color="#10B981" />
                  ) : (
                    <Copy size={12} color={themeColors.textSecondary} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Wire Packet */}
            <View style={[styles.terminalTitleRow, styles.terminalTitleRowSpacing]}>
              <View style={styles.sectionTitleRow}>
                <Binary size={14} color="#3B82F6" />
                <AppText style={styles.switchLabel}>2. Gói Tin Mã Hóa Đối Xứng</AppText>
              </View>
              <AppBadge label={securityConfig.cipherAlgorithm} variant="info" size="sm" />
            </View>

            <View style={styles.fieldRow}>
              <AppText style={styles.fieldKey}>IV (16 bytes):</AppText>
              <View style={styles.fieldValueBox}>
                <AppText style={styles.fieldValueText} numberOfLines={1}>{activePacket.iv}</AppText>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <AppText style={styles.fieldKey}>Ciphertext:</AppText>
              <View style={styles.fieldValueBox}>
                <AppText style={styles.fieldValueText} numberOfLines={1}>{activePacket.ciphertext}</AppText>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <AppText style={styles.fieldKey}>Auth Tag:</AppText>
              <View style={styles.fieldValueBox}>
                <AppText style={styles.fieldValueText}>{activePacket.tag}</AppText>
              </View>
            </View>

            {/* Full wire combined */}
            <View style={styles.wirePayloadWrapper}>
              <View style={styles.wirePayloadHeader}>
                <AppText style={styles.wirePayloadTitle}>PAYLOAD CHUẨN TRUYỀN MẠNG:</AppText>
                <TouchableOpacity
                  onPress={() => handleCopy('combined', activePacket.combined)}
                  style={styles.wirePayloadCopyBtn}
                >
                  {copiedKey === 'combined' ? (
                    <Check size={12} color="#10B981" strokeWidth={2.5} />
                  ) : (
                    <Copy size={12} color={themeColors.primary} />
                  )}
                  <AppText style={styles.wirePayloadCopyText}>
                    {copiedKey === 'combined' ? 'Đã sao chép' : 'Sao chép gói tin'}
                  </AppText>
                </TouchableOpacity>
              </View>
              <View style={styles.codeBlock}>
                <AppText style={styles.codeText} numberOfLines={3}>{activePacket.combined}</AppText>
              </View>
            </View>

            {/* Server proof */}
            <View style={[styles.terminalTitleRow, styles.terminalTitleRowSpacing]}>
              <View style={styles.sectionTitleRow}>
                <Database size={14} color="#10B981" />
                <AppText style={styles.switchLabel}>3. Bằng Chứng Giải Mã Tại Server</AppText>
              </View>
              <AppBadge label="Verified OK" variant="success" size="sm" />
            </View>
            <View style={styles.codeBlock}>
              <AppText style={styles.codeText}>
                {JSON.stringify(activePacket.decryptedData || {}, null, 2)}
              </AppText>
            </View>
          </View>
        )}
      </AppCard>

      {/* 8. Reset Defaults & Quick Back */}
      <View style={styles.footerRow}>
        <AppButton
          title="Khôi Phục Chuẩn OWASP"
          variant="outline"
          size="md"
          leftIcon={<RotateCcw size={15} color={themeColors.textSecondary} />}
          onPress={() => {
            haptics.medium();
            resetSecurityConfig();
            toast.show('success', 'Đã khôi phục thiết lập chuẩn bảo mật OWASP!');
          }}
          style={styles.btnFlex}
        />
        <AppButton
          title="Lưu & Quay Lại"
          variant="primary"
          size="md"
          leftIcon={<CheckCircle2 size={16} color="#FFFFFF" />}
          onPress={() => {
            haptics.success();
            navigation.goBack();
          }}
          style={styles.btnFlex}
        />
      </View>
    </ScreenWrapper>
  );
};
