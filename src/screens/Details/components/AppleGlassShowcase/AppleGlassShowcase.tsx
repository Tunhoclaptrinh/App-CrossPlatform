import React, { useState, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
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
import { createAppleGlassStyles } from './styles';
import type { AppleGlassShowcaseProps, BackdropTheme } from './types';

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

