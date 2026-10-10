import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Code2, Copy, Check } from 'lucide-react-native';
import { AppText, AppCard, AppScrollView } from '@/components';
import type { CodeSnippetCardProps } from '../types';

export const CodeSnippetCard: React.FC<CodeSnippetCardProps> = React.memo(({
  component,
  themeColors,
  activeRadiusTokens,
  currentHeight,
  isDark,
  isGlassPreview,
  isSystemRadius,
  styles,
  snippet,
  copied,
  onCopyCode,
}) => {
  return (
    <AppCard style={styles.specsCard}>
      <View style={styles.sectionHeaderRow}>
        <Code2 size={14} color="#10B981" strokeWidth={2.4} />
        <AppText style={[styles.sectionLabel, { color: themeColors.text }]}>
          THÔNG SỐ TOKENS & CODE MẪU
        </AppText>
      </View>

      <View style={styles.specsGrid}>
        {component.hasParity && (
          <View style={styles.specTile}>
            <AppText style={styles.specTileLabel}>Chiều Cao</AppText>
            <AppText style={styles.specTileVal}>{currentHeight}px</AppText>
          </View>
        )}
        <View style={styles.specTile}>
          <AppText style={styles.specTileLabel}>Bo Góc (Radius)</AppText>
          <AppText style={styles.specTileVal}>
            {component.category === 'organisms'
              ? `${activeRadiusTokens.card}px`
              : activeRadiusTokens.control >= 999
              ? 'Full Pill'
              : `${activeRadiusTokens.control}px`}
          </AppText>
          <AppText
            style={[
              styles.specTileSub,
              isSystemRadius ? styles.specTileSubSystem : styles.specTileSubCustom,
            ]}
          >
            {isSystemRadius ? 'Chuẩn Hệ Thống' : 'Thử Nghiệm Sandbox'}
          </AppText>
        </View>
        <View style={styles.specTile}>
          <AppText style={styles.specTileLabel}>Chế độ giao diện</AppText>
          <AppText style={styles.specTileVal}>
            {isGlassPreview ? 'Liquid Glass' : isDark ? 'Dark Mode' : 'Light Mode'}
          </AppText>
        </View>
      </View>

      {/* Polished Terminal IDE Code Container */}
      <View style={styles.codeContainer}>
        <View style={styles.codeHeader}>
          <View style={styles.codeHeaderLeft}>
            <View style={styles.codeDots}>
              <View style={[styles.codeDot, styles.dotRed]} />
              <View style={[styles.codeDot, styles.dotYellow]} />
              <View style={[styles.codeDot, styles.dotGreen]} />
            </View>
            <AppText style={styles.codeHeaderTitle}>JSX MÃ NGUỒN</AppText>
          </View>
          <TouchableOpacity
            style={styles.copyBtn}
            onPress={onCopyCode}
            activeOpacity={0.7}
          >
            {copied ? (
              <>
                <Check size={11} color="#10B981" strokeWidth={2.5} />
                <AppText style={styles.copyBtnTextSuccess}>Đã chép</AppText>
              </>
            ) : (
              <>
                <Copy size={11} color="#94A3B8" strokeWidth={2.2} />
                <AppText style={styles.copyBtnText}>Sao chép</AppText>
              </>
            )}
          </TouchableOpacity>
        </View>
        <AppScrollView
          horizontal
          indicatorVisible={true}
          indicatorThickness={2.5}
          indicatorLength={34}
          indicatorInsets={{ left: 8, right: 8, bottom: 2 }}
          nestedScrollEnabled
          contentContainerStyle={styles.codeScrollContent}
        >
          <AppText style={styles.codeText}>{snippet}</AppText>
        </AppScrollView>
      </View>
    </AppCard>
  );
});
