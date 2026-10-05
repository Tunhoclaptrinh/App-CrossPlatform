import { StyleSheet } from 'react-native';
import { Spacing, RadiusPresets, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const createDetailsStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig = RadiusPresets.standard,
  isDark: boolean = false
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xxl + 24,
    },

    // 1. Horizontal Module Switcher (Top Pills)
    moduleSwitcherScroll: {
      flexGrow: 0,
      height: 42,
      marginBottom: Spacing.md,
    },
    moduleSwitcherContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingRight: Spacing.lg,
    },
    moduleChip: {
      height: 36,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: 14,
      borderRadius: radius.control,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 6,
    },
    moduleChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 3,
    },
    moduleChipText: {
      fontSize: 12.5,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    moduleChipTextActive: {
      color: '#FFFFFF',
    },

    // 2. Header Overview Card
    headerCard: {
      backgroundColor: colors.card,
      borderRadius: radius.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.lg,
      marginBottom: Spacing.md + 4,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 2,
    },
    glassShowcaseCard: {
      padding: Spacing.lg,
      marginBottom: Spacing.md + 4,
      elevation: 0,
    },
    headerTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    headerIconBox: {
      width: ControlSize.iconBtnMd,
      height: ControlSize.iconBtnMd,
      // Clamp to half-size so 44×44 icon box stays circular in smooth mode
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnMd / 2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIconBoxGlass: {
      backgroundColor: '#007AFF18',
    },
    headerBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: colors.surfaceSubtle,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radius.badge,
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerBadgeDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#10B981',
    },
    headerBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    headerTitle: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.4,
      marginBottom: 6,
    },
    headerDesc: {
      fontSize: 13.5,
      lineHeight: 20,
      color: colors.textSecondary,
      marginBottom: Spacing.md,
    },
    headerTagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    tagChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 4,
      height: 26,
      borderRadius: radius.badge,
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tagChipText: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textSecondary,
    },

    // 3. Showcase Section Cards
    showcaseCard: {
      backgroundColor: colors.card,
      borderRadius: radius.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.lg,
      marginBottom: Spacing.md + 4,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 2,
    },
    showcaseTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: Spacing.sm,
    },
    showcaseTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.2,
    },
    showcaseDesc: {
      fontSize: 13,
      lineHeight: 19,
      color: colors.textSecondary,
      marginBottom: Spacing.md,
    },

    // 4. Feature Highlights List (Clean Checkmarks)
    featureList: {
      backgroundColor: colors.surfaceSubtle,
      // Container box: use card radius (not control) capped at 16px
      borderRadius: Math.min(radius.card, 16),
      padding: Spacing.md,
      gap: 10,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    featureText: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
      flex: 1,
    },

    // 5. Terminal / Console Box (For WebSocket & Crypto)
    terminalBox: {
      backgroundColor: '#0F172A',
      // Terminal is a card-level container
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: '#1E293B',
      padding: Spacing.md,
      marginBottom: Spacing.md,
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
    dotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
    dotYellow: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F59E0B' },
    dotGreen: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
    terminalTitle: {
      fontSize: 10,
      fontWeight: '700',
      color: '#64748B',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
    },
    terminalContent: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: '#38BDF8',
      lineHeight: 18,
    },
    terminalContentEmpty: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: '#475569',
      fontStyle: 'italic',
    },

    // 6. Action Grids (2-column & 3-column tidy layout)
    grid2: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: Spacing.sm,
    },
    grid2Item: {
      flex: 1,
    },
    grid3: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 8,
    },
    grid3Item: {
      flex: 1,
    },

    // 7. Form Controls Box
    formBox: {
      backgroundColor: colors.surfaceSubtle,
      // Container: card radius capped at 16px
      borderRadius: Math.min(radius.card, 16),
      padding: Spacing.md,
      gap: Spacing.md,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },

    // 8. Code & Crypto Snippets
    codeSnippet: {
      backgroundColor: colors.surfaceSubtle,
      // Content snippet card: safe max 12px to prevent oval pill distortion
      borderRadius: Math.min(radius.card, 12),
      padding: Spacing.sm + 4,
      marginVertical: Spacing.xs,
      borderWidth: 1,
      borderColor: colors.border,
    },
    codeSnippetSuccess: {
      borderColor: '#10B981',
    },
    codeSnippetLabel: {
      fontSize: 10.5,
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 3,
    },
    codeSnippetSuccessLabel: {
      color: '#10B981',
    },
    codeSnippetSuccessText: {
      color: colors.text,
    },
    codeSnippetMarginTop: {
      marginTop: 10,
    },
    codeSnippetText: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: colors.primary,
    },
    actionButtonSpacing: {
      marginTop: 12,
    },
    actionButtonSpacingSm: {
      marginTop: 8,
    },

    // 9. Metric Stepper
    stepperCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surfaceSubtle,
      // Card container: safe max 16px to prevent extreme pill distortion
      borderRadius: Math.min(radius.card, 16),
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.md,
    },
    stepperValueBlock: {
      gap: 2,
    },
    stepperBigNum: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '800',
      color: colors.primary,
      fontVariant: ['tabular-nums'],
      letterSpacing: -0.5,
      paddingVertical: 2,
    },
    stepperUnit: {
      fontSize: 11.5,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    stepperActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepperResetBtn: {
      width: 36,
      height: 36,
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnSm / 2),
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepperBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      // Stepper container: card-level clamp
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: colors.border,
      padding: 3,
      gap: 4,
    },
    stepperBtn: {
      width: 36,
      height: 36,
      borderRadius: radius.smControl,
      backgroundColor: colors.surfaceSubtle,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepperBtnPrimary: {
      backgroundColor: colors.primary,
    },

    // 10. Dedicated Theme Studio Showcase Styles
    studioAccentRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    studioAccentBtn: {
      width: '31%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      // Fixed height for alignment consistency
      height: ControlSize.sm.height,
      paddingHorizontal: 8,
      // smControl: avoids pill distortion on %-width items in smooth mode
      borderRadius: radius.smControl,
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    studioAccentBtnActive: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}12`,
    },
    studioAccentDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
    },
    studioAccentText: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    studioAccentTextActive: {
      fontWeight: '700',
    },
    studioRadiusGrid: {
      flexDirection: 'row',
      gap: 6,
      marginBottom: Spacing.md,
    },
    studioRadiusCard: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 4,
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1.5,
      borderColor: colors.border,
      gap: 4,
    },
    studioRadiusCardSharp: { borderRadius: 8 },
    studioRadiusCardCompact: { borderRadius: 12 },
    studioRadiusCardStandard: { borderRadius: 16 },
    studioRadiusCardSmooth: { borderRadius: 16 },
    studioRadiusCardActive: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}12`,
    },
    studioRadiusPreview: {
      width: 24,
      height: 24,
      borderWidth: 1.8,
      borderColor: colors.textSecondary,
      borderStyle: 'dashed',
    },
    studioRadiusPreviewSharp: { borderRadius: 4 },
    studioRadiusPreviewCompact: { borderRadius: 6 },
    studioRadiusPreviewStandard: { borderRadius: 8 },
    studioRadiusPreviewSmooth: { borderRadius: 12 },
    studioRadiusPreviewActive: {
      borderColor: colors.primary,
      borderStyle: 'solid',
    },
    studioRadiusName: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text,
    },
    studioRadiusNameActive: {
      color: colors.primary,
    },
    studioRadiusPx: {
      fontSize: 9.5,
      color: colors.textSecondary,
    },

    // ==========================================
    // 12. DEDICATED APPLE LIQUID GLASS SHOWCASE
    // ==========================================
    glassStudioSection: {
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    // Interactive Ambient Mesh Canvas
    backdropCanvas: {
      borderRadius: Math.min(radius.card, 16),
      overflow: 'hidden',
      position: 'relative',
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: isDark ? '#0A0C14' : '#F1F5F9',
    },
    ambientOrbsCanvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backdropCanvasOrb1: {
      position: 'absolute',
      top: -30,
      right: -20,
      width: 170,
      height: 170,
      borderRadius: 85,
    },
    backdropCanvasOrb2: {
      position: 'absolute',
      bottom: -20,
      left: -20,
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    backdropCanvasOrb3: {
      position: 'absolute',
      top: '40%',
      left: '30%',
      width: 110,
      height: 110,
      borderRadius: 55,
    },
    backdropHeaderCol: {
      gap: 3,
      marginBottom: 12,
    },
    backdropHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    backdropCanvasTitle: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: 0.3,
    },
    backdropCanvasSubtitle: {
      fontSize: 11.5,
      color: colors.textSecondary,
      lineHeight: 16,
    },
    backdropThemeScroll: {
      flexGrow: 0,
      marginBottom: 14,
    },
    backdropThemeScrollContent: {
      flexDirection: 'row',
      gap: 8,
      paddingRight: 10,
    },
    backdropChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      height: 28,
      borderRadius: 9999,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.75)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.25)',
      gap: 5,
    },
    backdropChipActive: {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
    },
    backdropDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    backdropChipText: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.text,
    },
    backdropChipTextActive: {
      color: '#FFFFFF',
      fontWeight: '700',
    },

    // Master Switch Banner
    masterGlassBanner: {
      backgroundColor: isDark ? 'rgba(30, 34, 48, 0.65)' : 'rgba(255, 255, 255, 0.62)',
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.78)',
      padding: Spacing.md,
      gap: 12,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.3 : 0.06,
      shadowRadius: 12,
      elevation: 0,
    },
    masterGlassTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    masterGlassStatusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 9999,
    },
    masterGlassBadgeActive: {
      backgroundColor: 'rgba(0, 122, 255, 0.18)',
    },
    masterGlassBadgeInactive: {
      backgroundColor: colors.surfaceSubtle,
    },
    masterGlassBadgeText: {
      fontSize: 10.5,
      fontWeight: '700',
    },
    masterGlassBadgeTextActive: {
      color: '#007AFF',
    },
    masterGlassBadgeTextInactive: {
      color: colors.textSecondary,
    },
    masterStatusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    masterStatusDotActive: {
      backgroundColor: '#007AFF',
    },
    masterStatusDotInactive: {
      backgroundColor: colors.textSecondary,
    },
    masterGlassTextGroup: {
      gap: 4,
    },
    masterGlassTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    masterGlassDesc: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.textSecondary,
    },

    // Interactive Comparison Block
    compareSection: {
      backgroundColor: colors.card,
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.md,
      gap: 12,
    },
    compareToggleRow: {
      flexDirection: 'row',
      backgroundColor: colors.surfaceSubtle,
      borderRadius: 9999,
      padding: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    compareToggleBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      borderRadius: 9999,
      gap: 6,
    },
    compareToggleBtnActive: {
      backgroundColor: colors.card,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    compareToggleText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    compareToggleTextActive: {
      color: colors.text,
      fontWeight: '700',
    },
    compareStage: {
      borderRadius: 14,
      overflow: 'hidden',
      position: 'relative',
      padding: Spacing.sm,
      minHeight: 140,
      justifyContent: 'center',
    },
    comparePreviewBox: {
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
      padding: Spacing.md,
      minHeight: 120,
      justifyContent: 'center',
    },
    comparePreviewFlat: {
      backgroundColor: isDark ? colors.card : '#FFFFFF',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },
    comparePreviewGlass: {
      backgroundColor: isDark ? 'rgba(24, 27, 38, 0.68)' : 'rgba(255, 255, 255, 0.64)',
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.88)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 16,
      elevation: 0,
    },
    compareGlassHighlight: {
      position: 'absolute',
      top: 0,
      left: 10,
      right: 10,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: 1,
    },
    compareCodeSnippet: {
      backgroundColor: colors.surfaceSubtle,
      borderRadius: 8,
      padding: 8,
      marginTop: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    compareCodeText: {
      fontSize: 11,
      fontFamily: 'monospace',
      color: colors.primary,
      lineHeight: 16,
    },
    comparePreviewTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    comparePreviewHeading: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
    },
    compareBadgeGlass: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 9999,
      backgroundColor: 'rgba(0, 122, 255, 0.15)',
    },
    compareBadgeFlat: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 9999,
      backgroundColor: colors.card,
    },
    compareBadgeTextGlass: {
      fontSize: 10,
      fontWeight: '700',
      color: '#007AFF',
    },
    compareBadgeTextFlat: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    comparePreviewDesc: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 17,
      marginBottom: 8,
    },

    // Apple Music Liquid Glass Widget
    musicWidgetCard: {
      backgroundColor: isDark ? 'rgba(24, 27, 38, 0.65)' : 'rgba(255, 255, 255, 0.62)',
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.85)',
      padding: Spacing.md,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 16,
      elevation: 5,
      overflow: 'hidden',
      position: 'relative',
    },
    musicSpecularHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.95)',
    },
    musicTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    musicCoverBox: {
      width: 50,
      height: 50,
      borderRadius: 12,
      backgroundColor: '#007AFF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 3,
    },
    musicTrackInfo: {
      flex: 1,
      gap: 3,
    },
    musicTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
    },
    musicArtist: {
      fontSize: 11.5,
      color: colors.textSecondary,
    },
    musicSpatialBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      backgroundColor: 'rgba(0, 122, 255, 0.15)',
      marginTop: 2,
    },
    musicSpatialText: {
      fontSize: 9.5,
      fontWeight: '700',
      color: '#007AFF',
      letterSpacing: 0.3,
    },
    musicProgressTrack: {
      height: 4,
      borderRadius: 2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
      marginTop: 14,
      marginBottom: 5,
      overflow: 'hidden',
    },
    musicProgressBar: {
      height: '100%',
      width: '68%',
      borderRadius: 2,
      backgroundColor: '#007AFF',
    },
    musicTimeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    musicTimeText: {
      fontSize: 10,
      color: colors.textSecondary,
      fontVariant: ['tabular-nums'],
    },
    musicControlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    musicPlayBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#007AFF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    musicPlayIconMargin: {
      marginLeft: 2,
    },
    musicSmallBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Apple Pay Titanium Frosted Card
    walletCard: {
      height: 165,
      borderRadius: Math.min(radius.card, 16),
      padding: Spacing.lg,
      justifyContent: 'space-between',
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.85)',
      backgroundColor: isDark ? 'rgba(26, 30, 42, 0.65)' : 'rgba(255, 255, 255, 0.62)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 16,
      elevation: 0,
      overflow: 'hidden',
      position: 'relative',
    },
    walletNfcIcon: {
      transform: [{ rotate: '90deg' }],
    },
    walletSpecularHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.95)',
    },
    walletSheen: {
      display: 'none',
    },
    walletSheenSecondary: {
      display: 'none',
    },
    walletTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    walletChipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    walletChipBox: {
      width: 28,
      height: 22,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#EAB308',
      backgroundColor: 'rgba(234, 179, 8, 0.25)',
    },
    walletBrandGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    walletBrandText: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.text,
    },
    walletBalanceLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textSecondary,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    walletBalanceVal: {
      fontSize: 23,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
      marginTop: 2,
    },
    walletBottom: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    walletCardNumber: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: colors.text,
      letterSpacing: 1.5,
    },
    walletHolder: {
      fontSize: 9.5,
      fontWeight: '700',
      color: colors.textSecondary,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      marginTop: 2,
    },

    // Bento Glass Specs Grid
    glassBentoGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    glassBentoCol: {
      flex: 1,
      gap: 10,
    },
    glassBentoTile: {
      width: '48.5%',
      backgroundColor: isDark ? 'rgba(28, 31, 42, 0.65)' : 'rgba(255, 255, 255, 0.60)',
      borderRadius: Math.min(radius.card, 14),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.80)',
      padding: Spacing.md,
      gap: 6,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.25 : 0.05,
      shadowRadius: 8,
      elevation: 0,
    },
    bentoIconBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bentoBadgePrimary: {
      backgroundColor: 'rgba(0, 122, 255, 0.15)',
    },
    bentoBadgeWarning: {
      backgroundColor: 'rgba(245, 158, 11, 0.15)',
    },
    bentoBadgePurple: {
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
    },
    bentoBadgeSuccess: {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    glassBentoVal: {
      fontSize: 14.5,
      fontWeight: '800',
      color: colors.text,
    },
    glassBentoLabel: {
      fontSize: 10.5,
      color: colors.textSecondary,
      fontWeight: '500',
    },

    // 11. Footer Back Button
    footerRow: {
      marginTop: Spacing.md,
      marginBottom: Spacing.lg,
      alignItems: 'center',
    },
    backHomeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      // Standardized via ControlSize.sm: height=36, paddingH=14
      height: ControlSize.sm.height,
      paddingHorizontal: ControlSize.sm.paddingHorizontal,
      borderRadius: radius.control,
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: colors.border,
    },
    backHomeText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
  });