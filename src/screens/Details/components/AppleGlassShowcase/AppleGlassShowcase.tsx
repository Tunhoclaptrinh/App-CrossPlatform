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
  Layout,
  Download,
  Share2,
} from 'lucide-react-native';
import {
  AppText,
  GlassCard,
  AppleMeshBackground,
  AppleGlassCard,
  GlassTile,
  AppHeader,
} from '@/components';
import { useAppStore, useToast } from '@/hooks';
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
  const headerVariant = useAppStore((state) => state.headerVariant);
  const setHeaderVariant = useAppStore((state) => state.setHeaderVariant);
  const activeHeaderVariant = headerVariant || 'frosted-capsule';
  const toast = useToast();
  const [backdropTheme, setBackdropTheme] = useState<BackdropTheme>('aurora');
  const [compareMode, setCompareMode] = useState<'glass' | 'flat'>('glass');
  const [headerActionStyle, setHeaderActionStyle] = useState<'capsule' | 'individual'>('capsule');
  const [bgOpacityPreset, setBgOpacityPreset] = useState<
    'default' | 'solid' | 'glass' | 'translucent' | 'transparent'
  >('default');
  const [enableCustomStyle, setEnableCustomStyle] = useState(false);

  const effectiveBgOpacity = useMemo(() => {
    switch (bgOpacityPreset) {
      case 'solid':
        return 1.0;
      case 'glass':
        return 0.82;
      case 'translucent':
        return 0.45;
      case 'transparent':
        return 0.0;
      default:
        return undefined;
    }
  }, [bgOpacityPreset]);

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

      {/* 3. APPLE iOS 18 HEADER & CAPSULE VARIANTS */}
      <View style={[styles.compareCard, isDark ? styles.compareCardDark : styles.compareCardLight]}>
        <View style={styles.compareTitleRow}>
          <Layout size={18} color="#007AFF" strokeWidth={2.4} />
          <AppText style={[styles.compareTitle, { color: themeColors.text }]}>
            Apple iOS 18 Frosted Capsule & Navbar
          </AppText>
        </View>
        <AppText style={[styles.compareDesc, { color: themeColors.textSecondary }]}>
          Bộ Header chuẩn Apple với nút back tròn mờ độc lập, nhóm hành động chung capsule kính mờ có đường phân cách mảnh.
        </AppText>

        {/* Header Variant Switcher */}
        <View style={[styles.segmentedBar, isDark ? styles.segmentedBarDark : styles.segmentedBarLight]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.segmentItem,
              activeHeaderVariant === 'frosted-capsule' && (isDark ? styles.segmentItemActiveDark : styles.segmentItemActiveLight),
            ]}
            onPress={() => {
              haptics.light();
              setHeaderVariant('frosted-capsule');
              toast.show('success', 'Đã chuyển Header sang Apple iOS 18 Frosted Capsule!');
            }}
          >
            <Sparkles
              size={14}
              color={activeHeaderVariant === 'frosted-capsule' ? '#007AFF' : themeColors.textSecondary}
              strokeWidth={2.2}
            />
            <AppText
              style={[
                styles.segmentText,
                activeHeaderVariant === 'frosted-capsule'
                  ? styles.segmentTextActive
                  : { color: themeColors.textSecondary },
              ]}
            >
              Frosted Capsule
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.segmentItem,
              activeHeaderVariant === 'floating-pill' && (isDark ? styles.segmentItemActiveDark : styles.segmentItemActiveLight),
            ]}
            onPress={() => {
              haptics.light();
              setHeaderVariant('floating-pill');
              toast.show('success', 'Đã chuyển Header sang Dynamic Island Floating Pill!');
            }}
          >
            <Sparkles
              size={14}
              color={activeHeaderVariant === 'floating-pill' ? '#EC4899' : themeColors.textSecondary}
              strokeWidth={2.2}
            />
            <AppText
              style={[
                styles.segmentText,
                activeHeaderVariant === 'floating-pill'
                  ? styles.segmentTextActive
                  : { color: themeColors.textSecondary },
              ]}
            >
              Floating Pill
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.segmentItem,
              activeHeaderVariant === 'standard' && (isDark ? styles.segmentItemActiveDark : styles.segmentItemActiveLight),
            ]}
            onPress={() => {
              haptics.light();
              setHeaderVariant('standard');
              toast.show('success', 'Đã chuyển Header sang Standard iOS Navbar!');
            }}
          >
            <Layout
              size={14}
              color={activeHeaderVariant === 'standard' ? themeColors.primary : themeColors.textSecondary}
              strokeWidth={2.2}
            />
            <AppText
              style={[
                styles.segmentText,
                activeHeaderVariant === 'standard'
                  ? styles.segmentTextActive
                  : { color: themeColors.textSecondary },
              ]}
            >
              Standard iOS
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Dynamic Architectural Detail of Selected Variant */}
        <View style={[styles.variantDetailBox, isDark ? styles.variantDetailBoxDark : styles.variantDetailBoxLight]}>
          <AppText style={[styles.variantDetailTitle, { color: themeColors.text }]}>
            {activeHeaderVariant === 'frosted-capsule' && '✨ Kiểu 1: Apple iOS 18 Split Frosted Capsule'}
            {activeHeaderVariant === 'floating-pill' && '🏝️ Kiểu 2: Dynamic Island Unified Floating Pill'}
            {activeHeaderVariant === 'standard' && '🏛️ Kiểu 3: Standard iOS Navigation Bar'}
          </AppText>
          <AppText style={[styles.variantDetailDesc, { color: themeColors.textSecondary }]}>
            {activeHeaderVariant === 'frosted-capsule' &&
              'Nút back tròn mờ độc lập bên trái + cụm action viên thuốc kính mờ bên phải. Nền trong suốt 100%, nội dung cuộn xuyên thấu.'}
            {activeHeaderVariant === 'floating-pill' &&
              'Một đảo Dynamic Island kính mờ liền khối nổi lơ lửng bọc cả Nút Back, Tiêu đề và Thao tác trong 1 pill duy nhất.'}
            {activeHeaderVariant === 'standard' &&
              'Thanh Header phẳng đặc màu theme chuẩn UIKit với viền tóc mảnh ngăn cách dưới đáy, không trong suốt.'}
          </AppText>
        </View>

        {/* Interactive Action Style Toggle (Capsule vs Individual) */}
        <View style={styles.actionStyleRow}>
          <AppText style={[styles.actionStyleLabel, { color: themeColors.textSecondary }]}>
            Kiểu nút bên phải:
          </AppText>
          <View style={styles.actionStylePillGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.actionStylePill,
                headerActionStyle === 'capsule' && styles.actionStylePillActive,
              ]}
              onPress={() => {
                haptics.light();
                setHeaderActionStyle('capsule');
                toast.show('success', 'Đã chuyển nút phải sang Cụm Viên Thuốc Liền Mạch (Capsule)!');
              }}
            >
              <AppText
                style={[
                  styles.actionStylePillText,
                  headerActionStyle === 'capsule' && styles.actionStylePillTextActive,
                ]}
              >
                💊 Cụm viên thuốc (Capsule)
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.actionStylePill,
                headerActionStyle === 'individual' && styles.actionStylePillActive,
              ]}
              onPress={() => {
                haptics.light();
                setHeaderActionStyle('individual');
                toast.show('info', 'Đã chuyển nút phải sang Nút Rời Rạc (Individual)!');
              }}
            >
              <AppText
                style={[
                  styles.actionStylePillText,
                  headerActionStyle === 'individual' && styles.actionStylePillTextActive,
                ]}
              >
                🔘 Nút rời (Individual)
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Interactive Background Opacity & Transparency Control */}
        <View style={styles.opacityRow}>
          <AppText style={[styles.opacityLabel, { color: themeColors.textSecondary }]}>
            Độ trong suốt nền:
          </AppText>
          <View style={styles.opacityPillGroup}>
            {[
              { key: 'default', label: 'Mặc định' },
              { key: 'solid', label: '100% Đặc' },
              { key: 'glass', label: '82% Kính' },
              { key: 'translucent', label: '45% Mờ' },
              { key: 'transparent', label: '0% Suốt' },
            ].map((item) => {
              const isSelected = bgOpacityPreset === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  activeOpacity={0.7}
                  style={[styles.opacityPill, isSelected && styles.opacityPillActive]}
                  onPress={() => {
                    haptics.light();
                    setBgOpacityPreset(item.key as any);
                    toast.show(
                      'info',
                      `Độ trong suốt nền: ${item.label}${
                        activeHeaderVariant === 'standard' && item.key === 'default'
                          ? ' (100% Opaque solid cho Standard)'
                          : ''
                      }`
                    );
                  }}
                >
                  <AppText
                    style={[
                      styles.opacityPillText,
                      isSelected && styles.opacityPillTextActive,
                    ]}
                  >
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* External Style Injection Toggle */}
        <View style={styles.opacityRow}>
          <AppText style={[styles.opacityLabel, { color: themeColors.textSecondary }]}>
            Style chèn từ bên ngoài:
          </AppText>
          <View style={styles.opacityPillGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.opacityPill, !enableCustomStyle && styles.opacityPillActive]}
              onPress={() => {
                haptics.light();
                setEnableCustomStyle(false);
                toast.show('info', 'Sử dụng style hệ thống mặc định');
              }}
            >
              <AppText
                style={[styles.opacityPillText, !enableCustomStyle && styles.opacityPillTextActive]}
              >
                Mặc định
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.opacityPill, enableCustomStyle && styles.opacityPillActive]}
              onPress={() => {
                haptics.light();
                setEnableCustomStyle(true);
                toast.show('success', 'Đã chèn style: Viền Tím Electric + Tint Accent ngoài!');
              }}
            >
              <AppText
                style={[styles.opacityPillText, enableCustomStyle && styles.opacityPillTextActive]}
              >
                🎨 Custom Tint & Viền
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Stage with Backdrop Preview for Header */}
        <View style={styles.previewHeaderStage}>
          <AppleMeshBackground variant="aurora" />

          <View style={styles.previewHeaderWrapper}>
            <AppHeader
              title="Secret Lives of Animals"
              subtitle="Documentary • 4K HDR"
              variant={activeHeaderVariant}
              actionStyle={headerActionStyle}
              backgroundOpacity={effectiveBgOpacity}
              tintColor={enableCustomStyle ? '#8B5CF6' : undefined}
              capsuleStyle={enableCustomStyle ? styles.customCapsuleBorder : undefined}
              backButtonStyle={enableCustomStyle ? styles.customBackBtnBorder : undefined}
              showBack
              backStyle={activeHeaderVariant === 'frosted-capsule' ? 'circle' : 'text'}
              backTitle="Back"
              onBack={() => haptics.light()}
              rightActions={[
                {
                  id: 'download',
                  icon: (
                    <Download
                      size={17}
                      color={enableCustomStyle ? '#8B5CF6' : themeColors.text}
                      strokeWidth={2.2}
                    />
                  ),
                  onPress: () => haptics.light(),
                  accessibilityLabel: 'Tải về',
                },
                {
                  id: 'share',
                  icon: (
                    <Share2
                      size={17}
                      color={enableCustomStyle ? '#8B5CF6' : themeColors.text}
                      strokeWidth={2.2}
                    />
                  ),
                  onPress: () => haptics.light(),
                  accessibilityLabel: 'Chia sẻ',
                },
              ]}
              showMore
              style={styles.previewHeader}
            />
          </View>
        </View>
      </View>

      {/* 4. INTERACTIVE COMPARISON SECTION */}
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

