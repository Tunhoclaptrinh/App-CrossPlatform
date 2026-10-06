import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Radio, Send } from 'lucide-react-native';
import { AppText, AppButton } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import { createRealtimeStyles } from './RealtimeShowcase.styles';

interface RealtimeShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  socketStatus: string;
  lastSocketMessage: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onSendMessage: () => void;
}

export const RealtimeShowcase: React.FC<RealtimeShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
  socketStatus,
  lastSocketMessage,
  onConnect,
  onDisconnect,
  onSendMessage,
}) => {
  const styles = useMemo(() => createRealtimeStyles(radiusTokens), [radiusTokens]);

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
          <Radio size={18} color="#10B981" strokeWidth={2.4} />
        </View>
        <View style={styles.titleTextCol}>
          <AppText style={[styles.title, { color: themeColors.text }]}>
            Real-Time WebSocket Engine
          </AppText>
          <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Tự động kết nối lại, hàng đợi tin nhắn offline và heartbeat ping/pong
          </AppText>
        </View>
      </View>

      {/* Terminal Log Console */}
      <View style={styles.terminalBox}>
        <View style={styles.terminalHeader}>
          <View style={styles.terminalDots}>
            <View style={[styles.terminalDot, styles.dotRed]} />
            <View style={[styles.terminalDot, styles.dotYellow]} />
            <View style={[styles.terminalDot, styles.dotGreen]} />
          </View>
          <AppText style={styles.terminalStatus}>STATUS: {socketStatus.toUpperCase()}</AppText>
        </View>
        <AppText style={lastSocketMessage ? styles.terminalContent : styles.terminalEmpty}>
          {lastSocketMessage
            ? `> RECEIVE: ${lastSocketMessage}`
            : '> Console lắng nghe gói tin... Sẵn sàng kết nối.'}
        </AppText>
      </View>

      {/* Action Buttons */}
      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton title="Kết Nối Server" variant="primary" size="sm" onPress={onConnect} />
        </View>
        <View style={styles.gridItem}>
          <AppButton
            title="Ngắt Kết Nối"
            variant={isGlass ? 'glass' : 'tonal'}
            size="sm"
            onPress={onDisconnect}
          />
        </View>
      </View>

      <AppButton
        title="Gửi Gói Tin Test (Emit Echo)"
        variant={isGlass ? 'glass' : 'outline'}
        size="sm"
        leftIcon={<Send size={15} color={isGlass ? themeColors.text : themeColors.primary} />}
        onPress={onSendMessage}
      />
    </View>
  );
};
