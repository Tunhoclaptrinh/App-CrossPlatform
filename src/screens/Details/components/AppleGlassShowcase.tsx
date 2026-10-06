import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Eye,
  Palette,
  Layers,
} from 'lucide-react-native';
import {
  AppText,
  GlassCard,
  AppleMeshBackground,
  AppleGlassCard,
  GlassTile,
} from '@/components';
import { haptics } from '@/utils';
import type { ThemeColors } from '@/constants/colors';
import type { ThemeStyle } from '@/hooks';
import type { RadiusPresetConfig } from '@/constants/theme';

type BackdropTheme = 'aurora' | 'sunset' | 'ocean' | 'minimal';

interface AppleGlassShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  themeStyle: ThemeStyle;
  onToggleThemeStyle: () => void;
}

export const AppleGlassShowcase: React.FC<AppleGlassShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  themeStyle,
  onToggleThemeStyle,
}) => {
  const styles = useMemo(() => createAppleGlassStyles(radiusTokens), [radiusTokens]);
  const [backdropTheme, setBackdropTheme] = useState<BackdropTheme>('aurora');
  const [compareMode, setCompareMode] = useState<'glass' | 'flat'>('glass');

  const backdropThemeList: {
    key: BackdropTheme;
    name: string;
    dotColor: string;
    activeBg: string;
    activeBorder: string;
  }[] = [
    {
      key: 'aurora',
      name: 'Cực Quang',
      dotColor: '#8B5CF6',
      activeBg: isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)',
      activeBorder: '#8B5CF6',
    },
    {
      key: 'sunset',
      name: 'Hoàng Hôn',
      dotColor: '#F59E0B',
      activeBg: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.15)',
      activeBorder: '#F59E0B',
    },
    {
      key: 'ocean',
      name: 'Biển Sâu',
      dotColor: '#0EA5E9',
      activeBg: isDark ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.15)',
      activeBorder: '#0EA5E9',
    },
    {
      key: 'minimal',
      name: 'Tối Giản',
      dotColor: '#64748B',
      activeBg: isDark ? 'rgba(100, 116, 139, 0.25)' : 'rgba(100, 116, 139, 0.15)',
      activeBorder: '#64748B',
    },
  ];

  return (
    <View style={styles.container}>
      {/* 1. HERO SHOWCASE CARD */}
      <GlassCard style={styles.heroCard}>
        <View style={styles.heroContentWrapper}>
          {/* Top Header Row with Apple HIG Tag & Live Pulse Indicator */}
          <View style={styles.heroHeaderRow}>
            <View style={[styles.appleTag, isDark ? styles.appleTagDark : styles.appleTagLight]}>
              <Sparkles size={12} color="#007AFF" strokeWidth={2.4} />
              <AppText style={styles.appleTagText}>APPLE iOS 18 HIG</AppText>
            </View>
            <View style={[styles.readyPill, isDark ? styles.readyPillDark : styles.readyPillLight]}>
              <View style={styles.badgePulseRing}>
                <View style={styles.badgePulseDot} />
              </View>
              <AppText style={styles.readyPillText}>PRODUCTION READY</AppText>
            </View>
          </View>

          {/* Title & Description with Cupertino Typography */}
          <View style={styles.heroTitleGroup}>
            <AppText style={[styles.heroTitle, { color: themeColors.text }]}>
              Apple Liquid Glass System
            </AppText>
            <AppText style={[styles.heroDesc, { color: themeColors.textSecondary }]}>
              Giao diện kính mờ khúc xạ đa tầng, bo góc Squircle liên tục và viền phản quang Specular Highlight chuẩn mực Apple.
            </AppText>
          </View>

          {/* Cupertino Interactive Segmented Control */}
          <View style={[styles.heroSegmentBar, isDark ? styles.heroSegmentBarDark : styles.heroSegmentBarLight]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.heroSegmentItem,
                themeStyle === 'apple-glass' && (isDark ? styles.heroSegmentActiveDark : styles.heroSegmentActiveLight),
              ]}
              onPress={() => {
                if (themeStyle !== 'apple-glass') {
                  haptics.light();
                  onToggleThemeStyle();
                }
              }}
            >
              <Sparkles
                size={14}
                color={themeStyle === 'apple-glass' ? '#007AFF' : themeColors.textSecondary}
                strokeWidth={2.4}
              />
              <AppText
                style={[
                  styles.heroSegmentText,
                  themeStyle === 'apple-glass'
                    ? styles.heroSegmentTextActive
                    : { color: themeColors.textSecondary },
                ]}
              >
                Apple Liquid Glass
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.heroSegmentItem,
                themeStyle === 'default' && (isDark ? styles.heroSegmentActiveDark : styles.heroSegmentActiveLight),
              ]}
              onPress={() => {
                if (themeStyle !== 'default') {
                  haptics.light();
                  onToggleThemeStyle();
                }
              }}
            >
              <Palette
                size={14}
                color={themeStyle === 'default' ? themeColors.primary : themeColors.textSecondary}
                strokeWidth={2.2}
              />
              <AppText
                style={[
                  styles.heroSegmentText,
                  themeStyle === 'default'
                    ? styles.heroSegmentTextActive
                    : { color: themeColors.textSecondary },
                ]}
              >
                Giao Diện Flat UI
              </AppText>
            </TouchableOpacity>
          </View>

          {/* 3-Column Unified Spec Strip with Hairline Dividers */}
          <View style={[styles.specBar, isDark ? styles.specBarDark : styles.specBarLight]}>
            <View style={styles.specCol}>
              <AppText style={[styles.specVal, styles.specValBlue]}>16px</AppText>
              <AppText style={[styles.specLabel, { color: themeColors.text }]}>Squircle</AppText>
              <AppText style={[styles.specSub, { color: themeColors.textSecondary }]}>Bo góc chuẩn</AppText>
            </View>
            <View style={[styles.specDivider, isDark ? styles.specDividerDark : styles.specDividerLight]} />
            <View style={styles.specCol}>
              <AppText style={[styles.specVal, styles.specValPurple]}>1.2px</AppText>
              <AppText style={[styles.specLabel, { color: themeColors.text }]}>Specular</AppText>
              <AppText style={[styles.specSub, { color: themeColors.textSecondary }]}>Phản xạ viền</AppText>
            </View>
            <View style={[styles.specDivider, isDark ? styles.specDividerDark : styles.specDividerLight]} />
            <View style={styles.specCol}>
              <AppText style={[styles.specVal, styles.specValGreen]}>78%</AppText>
              <AppText style={[styles.specLabel, { color: themeColors.text }]}>Frosted</AppText>
              <AppText style={[styles.specSub, { color: themeColors.textSecondary }]}>Xuyên thấu</AppText>
            </View>
          </View>

          {/* Clean Quality Metadata Row with Micro-Badges */}
          <View style={styles.heroFooterRow}>
            <View style={styles.heroFooterItem}>
              <CheckCircle2 size={12} color="#10B981" strokeWidth={2.4} />
              <AppText style={[styles.heroFooterText, { color: themeColors.textSecondary }]}>Native Tested</AppText>
            </View>
            <View style={[styles.heroFooterDot, isDark ? styles.heroFooterDotDark : styles.heroFooterDotLight]} />
            <View style={styles.heroFooterItem}>
              <Zap size={12} color="#F59E0B" strokeWidth={2.4} />
              <AppText style={[styles.heroFooterText, { color: themeColors.textSecondary }]}>60 FPS Native</AppText>
            </View>
            <View style={[styles.heroFooterDot, isDark ? styles.heroFooterDotDark : styles.heroFooterDotLight]} />
            <View style={styles.heroFooterItem}>
              <ShieldCheck size={12} color="#007AFF" strokeWidth={2.4} />
              <AppText style={[styles.heroFooterText, { color: themeColors.textSecondary }]}>Type Safe</AppText>
            </View>
          </View>
        </View>
      </GlassCard>

      {/* 2. BACKDROP MESH OPTICAL LAB */}
      <View style={[styles.meshLabContainer, isDark ? styles.meshLabContainerDark : styles.meshLabContainerLight]}>
        {/* Dynamic Seamless Apple Mesh Wallpaper */}
        <AppleMeshBackground variant={backdropTheme} />

        {/* Lab Header */}
        <View style={styles.labHeader}>
          <View style={styles.labHeaderTitleRow}>
            <View style={styles.labHeaderIconBadge}>
              <Layers size={13} color="#007AFF" strokeWidth={2.4} />
            </View>
            <AppText style={styles.labOverline}>OPTICAL REFRACTION LAB</AppText>
          </View>
          <AppText style={[styles.labTitle, { color: themeColors.text }]}>
            Nền Tương Phản Đa Tầng
          </AppText>
          <AppText style={[styles.labSubtitle, { color: themeColors.textSecondary }]}>
            Chạm đổi nền để quan sát độ xuyên thấu và viền phản xạ ánh sáng Specular
          </AppText>
        </View>

        {/* Filter Pills with Harmonious Theme Tints */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.themeSelectorContent}
          style={styles.themeSelectorScroll}
        >
          {backdropThemeList.map((item) => {
            const isSelected = backdropTheme === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.75}
                style={[
                  styles.themePill,
                  isDark ? styles.themePillDark : styles.themePillLight,
                  isSelected && {
                    backgroundColor: item.activeBg,
                    borderColor: item.activeBorder,
                  },
                ]}
                onPress={() => {
                  haptics.light();
                  setBackdropTheme(item.key);
                }}
              >
                <View style={[styles.themeDot, { backgroundColor: item.dotColor }]} />
                <AppText
                  style={[
                    styles.themePillText,
                    isSelected
                      ? [styles.themePillTextActive, { color: item.activeBorder }]
                      : { color: themeColors.textSecondary },
                  ]}
                >
                  {item.name}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Apple Glass Titanium Card */}
        <View style={styles.cardWrapper}>
          <AppleGlassCard
            balance="$14,850.25"
            balanceLabel="Số dư khả dụng"
            cardNumber="•••• •••• •••• 9248"
            cardHolder="UNIVERSAL DEVELOPER"
          />
        </View>

        {/* Bento Grid: Glass Specs */}
        <View style={styles.bentoGrid}>
          <View style={styles.bentoCol}>
            <GlassTile
              icon={CheckCircle2}
              iconColor="#007AFF"
              value="78% Translucent"
              label="Độ trong quang học kính mờ"
            />
            <GlassTile
              icon={Sparkles}
              iconColor="#8B5CF6"
              value="1.2px Specular"
              label="Viền phản xạ ánh sáng nổi"
            />
          </View>

          <View style={styles.bentoCol}>
            <GlassTile
              icon={Zap}
              iconColor="#F59E0B"
              value="60 FPS Native"
              label="GPU tăng tốc phần cứng"
            />
            <GlassTile
              icon={ShieldCheck}
              iconColor="#10B981"
              value="R=16px Squircle"
              label="Bo góc liên tục Cupertino"
            />
          </View>
        </View>
      </View>

      {/* 3. INTERACTIVE COMPARISON SECTION */}
      <View style={[styles.compareCard, isDark ? styles.compareCardDark : styles.compareCardLight]}>
        <View style={styles.compareTitleRow}>
          <Eye size={18} color="#007AFF" strokeWidth={2.4} />
          <AppText style={[styles.compareTitle, { color: themeColors.text }]}>
            So Sánh Trực Quan: Flat UI vs Liquid Glass
          </AppText>
        </View>
        <AppText style={[styles.compareDesc, { color: themeColors.textSecondary }]}>
          Chuyển đổi giữa 2 chế độ hiển thị để cảm nhận rõ rệt sự khác biệt về chiều sâu, viền phản xạ ánh sáng và độ nổi khối.
        </AppText>

        {/* Segmented Switcher */}
        <View style={[styles.segmentedBar, isDark ? styles.segmentedBarDark : styles.segmentedBarLight]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.segmentItem,
              compareMode === 'glass' && (isDark ? styles.segmentItemActiveDark : styles.segmentItemActiveLight),
            ]}
            onPress={() => {
              haptics.light();
              setCompareMode('glass');
            }}
          >
            <Sparkles
              size={14}
              color={compareMode === 'glass' ? '#007AFF' : themeColors.textSecondary}
              strokeWidth={2.2}
            />
            <AppText
              style={[
                styles.segmentText,
                compareMode === 'glass'
                  ? styles.segmentTextActive
                  : { color: themeColors.textSecondary },
              ]}
            >
              Apple Liquid Glass
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.segmentItem,
              compareMode === 'flat' && (isDark ? styles.segmentItemActiveDark : styles.segmentItemActiveLight),
            ]}
            onPress={() => {
              haptics.light();
              setCompareMode('flat');
            }}
          >
            <Palette
              size={14}
              color={compareMode === 'flat' ? themeColors.primary : themeColors.textSecondary}
              strokeWidth={2.2}
            />
            <AppText
              style={[
                styles.segmentText,
                compareMode === 'flat'
                  ? styles.segmentTextActive
                  : { color: themeColors.textSecondary },
              ]}
            >
              Giao Diện Flat UI
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Live Stage with Backdrop Preview */}
        <View style={styles.previewStage}>
          <AppleMeshBackground variant="aurora" />

          <View
            style={[
              styles.previewCard,
              compareMode === 'glass'
                ? isDark
                  ? styles.previewCardGlassDark
                  : styles.previewCardGlassLight
                : isDark
                ? styles.previewCardFlatDark
                : styles.previewCardFlatLight,
            ]}
          >
            {compareMode === 'glass' && (
              <View
                style={[
                  styles.previewGlassSpecular,
                  isDark ? styles.previewGlassSpecularDark : styles.previewGlassSpecularLight,
                ]}
              />
            )}

            <View style={styles.previewTopRow}>
              <AppText style={[styles.previewHeading, { color: themeColors.text }]}>
                {compareMode === 'glass' ? '✨ Chế Độ: Apple Liquid Glass' : '🎨 Chế Độ: Flat UI Chuẩn'}
              </AppText>
              <View
                style={[
                  styles.previewBadge,
                  compareMode === 'glass' ? styles.previewBadgeGlass : styles.previewBadgeFlat,
                ]}
              >
                <AppText
                  style={[
                    styles.previewBadgeText,
                    compareMode === 'glass' ? styles.previewBadgeTextGlass : styles.previewBadgeTextFlat,
                  ]}
                >
                  {compareMode === 'glass' ? 'TRANSLUCENT 78%' : 'OPAQUE 100%'}
                </AppText>
              </View>
            </View>

            <AppText style={[styles.previewBody, { color: themeColors.textSecondary }]}>
              {compareMode === 'glass'
                ? 'Nền kính mờ khúc xạ ánh sáng đa tầng từ wallpaper bên dưới, viền phản xạ Specular 1.2px và độ sâu quang học.'
                : 'Nền đặc 100% che khuất hoàn toàn màu nền bên dưới, viền 1px xám phẳng thông thường, không xuyên thấu.'}
            </AppText>

            <View style={[styles.codeBox, isDark ? styles.codeBoxDark : styles.codeBoxLight]}>
              <AppText style={styles.codeText}>
                {compareMode === 'glass'
                  ? `backgroundColor: 'rgba(255, 255, 255, 0.64)'\nborderColor: 'rgba(255, 255, 255, 0.88)'\nborderWidth: 1.2, specularHighlight: 1.2px`
                  : `backgroundColor: '#FFFFFF'\nborderColor: '#E2E8F0'\nborderWidth: 1.0, shadowRadius: 4`}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const createAppleGlassStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginBottom: 20,
    },

    // 1. HERO CARD
    heroCard: {
      padding: 18,
      borderRadius: radius.card,
      position: 'relative',
      overflow: 'hidden',
    },
    heroContentWrapper: {
      gap: 16,
    },
    heroHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    appleTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: radius.badge,
      borderWidth: 1,
    },
    appleTagLight: {
      backgroundColor: 'rgba(0, 122, 255, 0.08)',
      borderColor: 'rgba(0, 122, 255, 0.22)',
    },
    appleTagDark: {
      backgroundColor: 'rgba(0, 122, 255, 0.16)',
      borderColor: 'rgba(0, 122, 255, 0.35)',
    },
    appleTagText: {
      fontSize: 10.5,
      fontWeight: '800',
      color: '#007AFF',
      letterSpacing: 0.8,
    },
    readyPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: radius.badge,
      borderWidth: 1,
    },
    readyPillLight: {
      backgroundColor: 'rgba(16, 185, 129, 0.08)',
      borderColor: 'rgba(16, 185, 129, 0.22)',
    },
    readyPillDark: {
      backgroundColor: 'rgba(16, 185, 129, 0.14)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    badgePulseRing: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgePulseDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#10B981',
    },
    readyPillText: {
      fontSize: 10,
      fontWeight: '800',
      color: '#059669',
      letterSpacing: 0.8,
    },
    heroTitleGroup: {
      gap: 6,
    },
    heroTitle: {
      fontSize: 22,
      fontWeight: '800',
      letterSpacing: -0.5,
    },
    heroDesc: {
      fontSize: 13,
      lineHeight: 20,
    },
    heroSegmentBar: {
      flexDirection: 'row',
      borderRadius: radius.control,
      padding: 3,
      borderWidth: 1,
    },
    heroSegmentBarLight: {
      backgroundColor: '#F1F5F9',
      borderColor: '#E2E8F0',
    },
    heroSegmentBarDark: {
      backgroundColor: '#1F2937',
      borderColor: '#374151',
    },
    heroSegmentItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 38,
      borderRadius: Math.max(radius.control - 3, radius.smControl),
      gap: 7,
    },
    heroSegmentActiveLight: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    heroSegmentActiveDark: {
      backgroundColor: '#374151',
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    heroSegmentText: {
      fontSize: 12.5,
      fontWeight: '600',
    },
    heroSegmentTextActive: {
      color: '#007AFF',
      fontWeight: '700',
    },
    specBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radius.control,
      borderWidth: 1,
      paddingVertical: 10,
    },
    specBarLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      borderColor: 'rgba(226, 232, 240, 0.9)',
    },
    specBarDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.45)',
      borderColor: 'rgba(51, 65, 85, 0.6)',
    },
    specCol: {
      flex: 1,
      alignItems: 'center',
      gap: 2,
    },
    specDivider: {
      width: StyleSheet.hairlineWidth,
      height: 30,
    },
    specDividerLight: {
      backgroundColor: 'rgba(203, 213, 225, 0.8)',
    },
    specDividerDark: {
      backgroundColor: 'rgba(71, 85, 105, 0.8)',
    },
    specVal: {
      fontSize: 17,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
      letterSpacing: -0.3,
    },
    specValBlue: {
      color: '#007AFF',
    },
    specValPurple: {
      color: '#8B5CF6',
    },
    specValGreen: {
      color: '#10B981',
    },
    specLabel: {
      fontSize: 11,
      fontWeight: '700',
    },
    specSub: {
      fontSize: 9.5,
      fontWeight: '500',
    },
    heroFooterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      paddingTop: 2,
    },
    heroFooterItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    heroFooterText: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    heroFooterDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
    },
    heroFooterDotLight: {
      backgroundColor: '#CBD5E1',
    },
    heroFooterDotDark: {
      backgroundColor: '#475569',
    },

    // 2. BACKDROP MESH OPTICAL LAB
    meshLabContainer: {
      borderRadius: radius.card,
      overflow: 'hidden',
      position: 'relative',
      padding: 16,
      borderWidth: 1,
    },
    meshLabContainerLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
      shadowColor: '#000000',
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    meshLabContainerDark: {
      backgroundColor: '#090D16',
      borderColor: '#1E293B',
    },
    labHeader: {
      marginBottom: 12,
    },
    labHeaderTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4,
    },
    labHeaderIconBadge: {
      width: 20,
      height: 20,
      borderRadius: Math.min(radius.smControl, 6),
      backgroundColor: 'rgba(0, 122, 255, 0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    labOverline: {
      fontSize: 10.5,
      fontWeight: '800',
      color: '#007AFF',
      letterSpacing: 0.8,
    },
    labTitle: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    labSubtitle: {
      fontSize: 12,
      lineHeight: 17,
      marginTop: 2,
    },
    themeSelectorScroll: {
      flexGrow: 0,
      marginBottom: 14,
      marginHorizontal: -16,
    },
    themeSelectorContent: {
      gap: 8,
      paddingHorizontal: 16,
    },
    themePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      height: 32,
      borderRadius: radius.control,
      borderWidth: 1.2,
    },
    themePillLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: 'rgba(226, 232, 240, 0.9)',
    },
    themePillDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.55)',
      borderColor: 'rgba(51, 65, 85, 0.6)',
    },
    themeDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    themePillText: {
      fontSize: 12,
      fontWeight: '600',
    },
    themePillTextActive: {
      fontWeight: '700',
    },
    cardWrapper: {
      marginBottom: 14,
    },
    bentoGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    bentoCol: {
      flex: 1,
      gap: 10,
    },

    // 3. INTERACTIVE COMPARISON
    compareCard: {
      borderRadius: radius.card,
      padding: 16,
      borderWidth: 1,
      gap: 12,
    },
    compareCardLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    compareCardDark: {
      backgroundColor: '#111827',
      borderColor: '#1F2937',
    },
    compareTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    compareTitle: {
      fontSize: 15.5,
      fontWeight: '700',
      letterSpacing: -0.2,
    },
    compareDesc: {
      fontSize: 12.5,
      lineHeight: 18,
      marginTop: -4,
    },
    segmentedBar: {
      flexDirection: 'row',
      borderRadius: radius.control,
      padding: 3,
      borderWidth: 1,
    },
    segmentedBarLight: {
      backgroundColor: '#F1F5F9',
      borderColor: '#E2E8F0',
    },
    segmentedBarDark: {
      backgroundColor: '#1F2937',
      borderColor: '#374151',
    },
    segmentItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 34,
      borderRadius: Math.max(radius.control - 3, radius.smControl),
      gap: 6,
    },
    segmentItemActiveLight: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    segmentItemActiveDark: {
      backgroundColor: '#374151',
      shadowColor: '#000000',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    segmentText: {
      fontSize: 12,
      fontWeight: '600',
    },
    segmentTextActive: {
      color: '#007AFF',
      fontWeight: '700',
    },
    previewStage: {
      height: 195,
      borderRadius: Math.min(radius.card, 14),
      overflow: 'hidden',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
    },
    previewCard: {
      width: '100%',
      padding: 14,
      borderRadius: Math.min(radius.card, 14),
      borderWidth: 1.2,
      position: 'relative',
      overflow: 'hidden',
    },
    previewCardGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.68)',
      borderColor: 'rgba(255, 255, 255, 0.95)',
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    previewCardGlassDark: {
      backgroundColor: 'rgba(24, 27, 38, 0.72)',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      shadowColor: '#000000',
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 4 },
    },
    previewCardFlatLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    previewCardFlatDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    previewGlassSpecular: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
    },
    previewGlassSpecularLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    previewGlassSpecularDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },
    previewTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    previewHeading: {
      fontSize: 13,
      fontWeight: '700',
    },
    previewBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radius.badge,
    },
    previewBadgeGlass: {
      backgroundColor: 'rgba(0, 122, 255, 0.15)',
    },
    previewBadgeFlat: {
      backgroundColor: '#F1F5F9',
    },
    previewBadgeText: {
      fontSize: 9.5,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    previewBadgeTextGlass: {
      color: '#007AFF',
    },
    previewBadgeTextFlat: {
      color: '#64748B',
    },
    previewBody: {
      fontSize: 11.5,
      lineHeight: 16,
      marginBottom: 10,
    },
    codeBox: {
      borderRadius: radius.smControl,
      padding: 8,
    },
    codeBoxLight: {
      backgroundColor: 'rgba(241, 245, 249, 0.75)',
    },
    codeBoxDark: {
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
    },
    codeText: {
      fontSize: 10,
      fontFamily: 'monospace',
      color: '#0284C7',
      lineHeight: 14,
    },
  });
