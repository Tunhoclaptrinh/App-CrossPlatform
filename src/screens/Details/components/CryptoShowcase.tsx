import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ShieldCheck, Lock, Unlock, Fingerprint } from 'lucide-react-native';
import { AppText, AppButton, AppInput } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ServerEncryptedPayload } from '@/utils';

interface CryptoShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
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
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      {/* Title Header */}
      <View style={styles.titleRow}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(139, 92, 246, 0.15)' }]}>
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
            variant="tonal"
            size="sm"
            disabled={!cipherResult}
            leftIcon={<Unlock size={14} color={themeColors.primary} strokeWidth={2.2} />}
            onPress={onDecrypt}
          />
        </View>
      </View>

      {/* Ciphertext Output */}
      {cipherResult && (
        <View style={[styles.snippetBox, isDark ? styles.snippetBoxDark : styles.snippetBoxLight]}>
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
        variant="outline"
        size="md"
        leftIcon={<Fingerprint size={18} color={themeColors.primary} strokeWidth={2.2} />}
        onPress={onBiometricAuth}
      />
    </View>
  );
};

const createCryptoStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    card: {
      borderRadius: radius.card,
      padding: 16,
      borderWidth: 1,
      gap: 14,
      marginBottom: 20,
    },
    cardLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    cardDark: {
      backgroundColor: '#111827',
      borderColor: '#1F2937',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: Math.min(radius.smControl * 1.8, radius.card),
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleTextCol: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 12,
      lineHeight: 16,
    },
    grid2: {
      flexDirection: 'row',
      gap: 8,
    },
    gridItem: {
      flex: 1,
    },
    snippetBox: {
      borderRadius: radius.smControl,
      padding: 10,
      borderWidth: 1,
      gap: 4,
    },
  snippetBoxLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  snippetBoxDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  snippetSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.35)',
  },
  snippetLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  snippetSuccessLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: '#10B981',
  },
  snippetText: {
    fontSize: 11.5,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
});
