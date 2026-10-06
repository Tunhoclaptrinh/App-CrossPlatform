import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ShieldCheck, Lock, Unlock, Fingerprint } from 'lucide-react-native';
import { AppText, AppButton, AppInput } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ServerEncryptedPayload } from '@/utils';
import { createCryptoStyles } from './CryptoShowcase.styles';

interface CryptoShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  cryptoInput: string;
  setCryptoInput: (text: string) => void;
  cipherResult: ServerEncryptedPayload | null;
  decryptedResult: string | null;
  onEncrypt: () => void;
  onDecrypt: () => void;
  onBiometricAuth: () => void;
}

export const CryptoShowcase: React.FC<CryptoShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
  cryptoInput,
  setCryptoInput,
  cipherResult,
  decryptedResult,
  onEncrypt,
  onDecrypt,
  onBiometricAuth,
}) => {
  const styles = useMemo(() => createCryptoStyles(radiusTokens), [radiusTokens]);

  return (
    <View
      style={[
        styles.card,
        isGlass
          ? isDark
            ? styles.cardGlassDark
            : styles.cardGlassLight
          : isDark
          ? styles.cardDark
          : styles.cardLight,
      ]}
    >
      {isGlass && (
        <View style={isDark ? styles.specularHighlightDark : styles.specularHighlight} />
      )}

      {/* Title Header */}
      <View style={styles.titleRow}>
        <View style={styles.iconBox}>
          <ShieldCheck size={18} color="#8B5CF6" strokeWidth={2.4} />
        </View>
        <View style={styles.titleTextCol}>
          <AppText style={[styles.title, { color: themeColors.text }]}>
            Phòng Mã Hóa AES-256 & Sinh Trắc Học
          </AppText>
          <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Chuẩn bảo mật cấp quân sự AES-256-GCM và xác thực vân tay / Face ID
          </AppText>
        </View>
      </View>

      {/* Input */}
      <AppInput
        label="Chuỗi văn bản cần bảo mật:"
        value={cryptoInput}
        onChangeText={setCryptoInput}
        placeholder="Nhập nội dung nhạy cảm..."
      />

      {/* Actions */}
      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton
            title="Mã Hóa (AES)"
            variant="primary"
            size="sm"
            leftIcon={<Lock size={14} color="#FFFFFF" strokeWidth={2.2} />}
            onPress={onEncrypt}
          />
        </View>
        <View style={styles.gridItem}>
          <AppButton
            title="Giải Mã Gốc"
            variant={isGlass ? 'glass' : 'tonal'}
            size="sm"
            disabled={!cipherResult}
            leftIcon={<Unlock size={14} color={themeColors.primary} strokeWidth={2.2} />}
            onPress={onDecrypt}
          />
        </View>
      </View>

      {/* Ciphertext Output */}
      {cipherResult && (
        <View
          style={[
            styles.snippetBox,
            isGlass
              ? isDark
                ? styles.snippetBoxGlassDark
                : styles.snippetBoxGlassLight
              : isDark
              ? styles.snippetBoxDark
              : styles.snippetBoxLight,
          ]}
        >
          <AppText style={[styles.snippetLabel, { color: themeColors.textSecondary }]}>
            BẢN MÃ CIPHERTEXT (BASE64):
          </AppText>
          <AppText style={[styles.snippetText, { color: themeColors.primary }]} numberOfLines={2}>
            {cipherResult.ciphertext}
          </AppText>
        </View>
      )}

      {/* Decrypted Output */}
      {decryptedResult && (
        <View style={[styles.snippetBox, styles.snippetSuccess]}>
          <AppText style={styles.snippetSuccessLabel}>CHUỖI ĐÃ GIẢI MÃ THÀNH CÔNG:</AppText>
          <AppText style={[styles.snippetText, { color: themeColors.text }]}>
            {decryptedResult}
          </AppText>
        </View>
      )}

      {/* Biometrics */}
      <AppButton
        title="Thử Nghiệm FaceID / Vân Tay"
        variant={isGlass ? 'glass' : 'outline'}
        size="md"
        leftIcon={<Fingerprint size={18} color={themeColors.primary} strokeWidth={2.2} />}
        onPress={onBiometricAuth}
      />
    </View>
  );
};
