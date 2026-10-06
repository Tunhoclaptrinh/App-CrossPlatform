import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Palette, Bell, AlertTriangle } from 'lucide-react-native';
import { AppText, AppButton, AppCheckbox, AppSwitch } from '@/components';
import { haptics } from '@/utils';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import { createPaperStyles } from './PaperShowcase.styles';

interface PaperShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
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
  isGlass = false,
  rememberLogin,
  setRememberLogin,
  pushNotification,
  setPushNotification,
  onShowToast,
  onOpenDialog,
}) => {
  const styles = useMemo(() => createPaperStyles(radiusTokens), [radiusTokens]);

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
          <AppButton
            title={isGlass ? 'Glass Button' : 'Tonal Button'}
            variant={isGlass ? 'glass' : 'tonal'}
            size="sm"
          />
        </View>
      </View>

      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton
            title="Outline Button"
            variant={isGlass ? 'glass' : 'outline'}
            size="sm"
          />
        </View>
        <View style={styles.gridItem}>
          <AppButton title="Danger Button" variant="danger" size="sm" />
        </View>
      </View>

      {/* Form Controls */}
      <View
        style={[
          styles.formBox,
          isGlass
            ? isDark
              ? styles.formBoxGlassDark
              : styles.formBoxGlassLight
            : isDark
            ? styles.formBoxDark
            : styles.formBoxLight,
        ]}
      >
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
            variant={isGlass ? 'glass' : 'outline'}
            size="sm"
            leftIcon={
              <Bell
                size={14}
                color={isGlass ? themeColors.text : themeColors.primary}
                strokeWidth={2.2}
              />
            }
            onPress={onShowToast}
          />
        </View>
        <View style={styles.gridItem}>
          <AppButton
            title="Mở Hộp Thoại"
            variant={isGlass ? 'glass' : 'outline'}
            size="sm"
            leftIcon={<AlertTriangle size={14} color="#EF4444" strokeWidth={2.2} />}
            onPress={onOpenDialog}
          />
        </View>
      </View>
    </View>
  );
};
