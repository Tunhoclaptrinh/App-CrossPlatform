import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Sparkles, Radio, ShieldCheck } from 'lucide-react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import { AppText } from '../AppText';
import type { AppleGlassCardProps } from './types';
import { createAppleGlassCardStyles } from './styles';

export const AppleGlassCard: React.FC<AppleGlassCardProps> = ({
  balance = '$14,850.25',
  balanceLabel = 'Số dư khả dụng',
  cardNumber = '•••• •••• •••• 9248',
  cardHolder = 'UNIVERSAL DEVELOPER',
  brandName = 'Apple Card',
  size = 'md',
  contrast,
  borderRadius,
  style,
  onPress,
}) => {
  const { isDark, radiusTokens, globalContrast, theme: themeColors } = useThemeMode();
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const styles = createAppleGlassCardStyles(isDark, radiusTokens.card, size, effectiveContrast, borderRadius);

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const CardContent = (
    <View style={[styles.container, style]}>
      {/* Hardware-Accelerated Blur Backdrop on iOS / Translucent Surface on Android */}
      {Platform.OS === 'ios' ? (
        <BlurView
          style={styles.blurBackdrop}
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={30}
          reducedTransparencyFallbackColor={themeColors.card}
        />
      ) : (
        <View
          style={isDark ? styles.androidBackdropDark : styles.androidBackdropLight}
        />
      )}

      {/* Specular hairline top reflection */}
      <View style={styles.specularHighlight} />

      {/* Top Row: EMV chip + NFC wave + Brand */}
      <View style={styles.topRow}>
        <View style={styles.chipGroup}>
          <View style={styles.emvChip}>
            <View style={styles.emvLineH} />
            <View style={styles.emvLineV} />
            <View style={styles.emvInnerPad} />
          </View>
          <Radio size={16} color={themeColors.text} style={styles.nfcIcon} />
        </View>

        <View style={styles.brandGroup}>
          <Sparkles size={14} color="#007AFF" />
          <AppText style={styles.brandText}>{brandName}</AppText>
        </View>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceGroup}>
        <AppText style={styles.balanceLabel}>{balanceLabel}</AppText>
        <AppText style={styles.balanceVal}>{balance}</AppText>
      </View>

      {/* Bottom Row: Number + Holder + Security Shield */}
      <View style={styles.bottomRow}>
        <View style={styles.cardInfoGroup}>
          <AppText style={styles.cardNumber}>{cardNumber}</AppText>
          <AppText style={styles.cardHolder}>{cardHolder}</AppText>
        </View>
        <ShieldCheck size={18} color="#10B981" />
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};
