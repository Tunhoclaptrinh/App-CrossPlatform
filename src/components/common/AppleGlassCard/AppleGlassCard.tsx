import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
  style,
  onPress,
}) => {
  const { isDark, radiusTokens, theme: themeColors } = useThemeMode();
  const styles = createAppleGlassCardStyles(isDark, radiusTokens.card);

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const CardContent = (
    <View style={[styles.container, style]}>
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
