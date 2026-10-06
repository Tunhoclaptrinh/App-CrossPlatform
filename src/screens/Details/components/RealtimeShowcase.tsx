import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Radio, Send } from 'lucide-react-native';
import { AppText, AppButton } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

interface RealtimeShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
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
  socketStatus,
  lastSocketMessage,
  onConnect,
  onDisconnect,
  onSendMessage,
}) => {
  const styles = useMemo(() => createRealtimeStyles(radiusTokens), [radiusTokens]);
  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      {/* Title Header */}
      <View style={styles.titleRow}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
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
            <View style={[styles.terminalDot, { backgroundColor: '#EF4444' }]} />
            <View style={[styles.terminalDot, { backgroundColor: '#F59E0B' }]} />
            <View style={[styles.terminalDot, { backgroundColor: '#10B981' }]} />
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
          <AppButton title="Ngắt Kết Nối" variant="tonal" size="sm" onPress={onDisconnect} />
        </View>
      </View>

      <AppButton
        title="Gửi Gói Tin Test (Emit Echo)"
        variant="outline"
        size="sm"
        leftIcon={<Send size={15} color={themeColors.primary} />}
        onPress={onSendMessage}
      />
    </View>
  );
};

const createRealtimeStyles = (radius: RadiusPresetConfig) =>
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
    terminalBox: {
      backgroundColor: '#0F172A',
      borderRadius: radius.control,
      borderWidth: 1,
      borderColor: '#1E293B',
      padding: 12,
    },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    marginBottom: 8,
  },
  terminalDots: {
    flexDirection: 'row',
    gap: 5,
  },
  terminalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  terminalStatus: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  terminalContent: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#38BDF8',
    lineHeight: 18,
  },
  terminalEmpty: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#475569',
    fontStyle: 'italic',
  },
  grid2: {
    flexDirection: 'row',
    gap: 8,
  },
  gridItem: {
    flex: 1,
  },
});
