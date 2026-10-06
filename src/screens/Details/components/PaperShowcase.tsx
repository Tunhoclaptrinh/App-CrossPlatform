import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Palette, Bell, AlertTriangle } from 'lucide-react-native';
import { AppText, AppButton, AppCheckbox, AppSwitch } from '@/components';
import { haptics } from '@/utils';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

interface PaperShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  rememberLogin: boolean;
  setRememberLogin: (val: boolean) => void;
  pushNotification: boolean;
  setPushNotification: (val: boolean) => void;
  onShowToast: () => void;
  onOpenDialog: () => void;
}

export const PaperShowcase: React.FC<PaperShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  rememberLogin,
  setRememberLogin,
  pushNotification,
  setPushNotification,
  onShowToast,
  onOpenDialog,
}) => {
  const styles = useMemo(() => createPaperStyles(radiusTokens), [radiusTokens]);
  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      {/* Title Header */}
      <View style={styles.titleRow}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(37, 99, 235, 0.15)' }]}>
          <Palette size={18} color="#2563EB" strokeWidth={2.4} />
        </View>
        <View style={styles.titleTextCol}>
          <AppText style={[styles.title, { color: themeColors.text }]}>
            Thư Viện Component Chuẩn Material 3
          </AppText>
          <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Các component nền tảng có sẵn trạng thái Active, Pressed, Disabled và Haptic
          </AppText>
        </View>
      </View>

      {/* Button Variants */}
      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton title="Primary Button" variant="primary" size="sm" />
        </View>
        <View style={styles.gridItem}>
          <AppButton title="Tonal Button" variant="tonal" size="sm" />
        </View>
      </View>

      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton title="Outline Button" variant="outline" size="sm" />
        </View>
        <View style={styles.gridItem}>
          <AppButton title="Danger Button" variant="danger" size="sm" />
        </View>
      </View>

      {/* Form Controls */}
      <View style={[styles.formBox, isDark ? styles.formBoxDark : styles.formBoxLight]}>
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

      {/* Feedback & Dialog triggers */}
      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton
            title="Bật Thử Toast"
            variant="outline"
            size="sm"
            leftIcon={<Bell size={14} color={themeColors.primary} strokeWidth={2.2} />}
            onPress={onShowToast}
          />
        </View>
        <View style={styles.gridItem}>
          <AppButton
            title="Mở Hộp Thoại"
            variant="outline"
            size="sm"
            leftIcon={<AlertTriangle size={14} color="#EF4444" strokeWidth={2.2} />}
            onPress={onOpenDialog}
          />
        </View>
      </View>
    </View>
  );
};

const createPaperStyles = (radius: RadiusPresetConfig) =>
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
    formBox: {
      borderRadius: radius.control,
      padding: 14,
      borderWidth: 1,
      gap: 14,
    },
  formBoxLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  formBoxDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
});
