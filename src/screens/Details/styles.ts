import { StyleSheet } from 'react-native';
import { Spacing, RadiusPresets, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const createDetailsStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig = RadiusPresets.standard
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
    glassShowcaseCard: {
      marginBottom: Spacing.md,
    },
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