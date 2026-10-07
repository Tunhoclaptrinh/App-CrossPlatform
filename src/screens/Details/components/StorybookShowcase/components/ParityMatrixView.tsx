import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Maximize2,
  Search,
  Globe,
} from 'lucide-react-native';
import {
  AppText,
  AppButton,
  AppInput,
  AppSelect,
  AppSearchBar,
  AppCard,
  AppSegmentedControl,
} from '@/components';
import { ControlSize, type ControlSizeKey } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import { haptics } from '@/utils';

interface ParityMatrixViewProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
}

export const ParityMatrixView: React.FC<ParityMatrixViewProps> = ({
  themeColors,
  radiusTokens,
  isDark,
}) => {
  const [matrixSize, setMatrixSize] = useState<ControlSizeKey>('md');
  const [sampleSelectVal, setSampleSelectVal] = useState<string>('vn');
  const [query, setQuery] = useState<string>('');

  const countryOptions = [
    { label: 'Việt Nam', value: 'vn', icon: <Globe size={15} color="#007AFF" />, sublabel: '+84 Quốc gia' },
    { label: 'Hoa Kỳ', value: 'us', icon: <Globe size={15} color="#10B981" />, sublabel: '+1 North America' },
    { label: 'Nhật Bản', value: 'jp', icon: <Globe size={15} color="#EC4899" />, sublabel: '+81 Asia Pacific' },
  ];

  const currentHeight = ControlSize[matrixSize].height;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: 14,
        },
        card: {
          gap: 12,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        titleGroup: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
          flex: 1,
        },
        title: {
          fontSize: 14.5,
          fontWeight: '700',
        },
        pill: {
          paddingHorizontal: 7,
          paddingVertical: 3,
          borderRadius: radiusTokens.pill,
          backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
        },
        pillText: {
          fontSize: 9.5,
          fontWeight: '800',
          color: '#6366F1',
          letterSpacing: 0.5,
        },
        desc: {
          fontSize: 12.5,
          color: themeColors.textSecondary,
          lineHeight: 18,
        },
        demoBox: {
          backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(248, 250, 252, 0.8)',
          padding: 12,
          borderRadius: Math.max(4, Math.min(radiusTokens.card, 16) - 4),
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
          gap: 10,
        },
        demoSubheading: {
          fontSize: 10,
          fontWeight: '700',
          color: themeColors.textSecondary,
          letterSpacing: 0.7,
        },
        sideBySideRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        sideColInput: {
          flex: 1,
        },
        sideColButton: {
          width: 80,
        },
        colInput: {
          flex: 1.1,
        },
        colSelect: {
          flex: 1.25,
        },
        colButton: {
          width: 65,
        },
        noMargin: {
          marginBottom: 0,
        },
      }),
    [themeColors, radiusTokens, isDark]
  );

  return (
    <View style={styles.container}>
      <AppCard style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.titleGroup}>
            <Maximize2 size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.title, { color: themeColors.text }]}>
              Ma Trận Đồng Bộ Chiều Cao ({matrixSize.toUpperCase()} = {currentHeight}px)
            </AppText>
          </View>
          <View style={styles.pill}>
            <AppText style={styles.pillText}>PARITY 1:1</AppText>
          </View>
        </View>

        <AppText style={styles.desc}>
          Kiểm thử mức độ khớp tỷ lệ pixel giữa Input, Select và Button khi đặt cạnh nhau trong cùng một hàng ngang hoặc form nhập liệu.
        </AppText>

        {/* Global Control Size Selector (Standardized via AppSegmentedControl) */}
        <AppSegmentedControl<ControlSizeKey>
          size="md"
          options={[
            { label: `SM (${ControlSize.sm.height}px)`, value: 'sm' },
            { label: `MD (${ControlSize.md.height}px)`, value: 'md' },
            { label: `LG (${ControlSize.lg.height}px)`, value: 'lg' },
          ]}
          value={matrixSize}
          onChange={setMatrixSize}
        />

        {/* Live Side-by-Side Flex Layout */}
        <View style={styles.demoBox}>
          <AppText style={styles.demoSubheading}>
            1. HÀNG NGANG ĐỒNG BỘ 2 CỘT (Input + Button)
          </AppText>
          <View style={styles.sideBySideRow}>
            <View style={styles.sideColInput}>
              <AppInput
                size={matrixSize}
                placeholder={`Input (${currentHeight}px)`}
                leftIcon={<Search size={ControlSize[matrixSize].iconSize} color={themeColors.textSecondary} />}
                containerStyle={styles.noMargin}
              />
            </View>
            <View style={styles.sideColButton}>
              <AppButton
                size={matrixSize}
                title="Gửi"
                variant="primary"
                onPress={() => haptics.light()}
              />
            </View>
          </View>

          <AppText style={styles.demoSubheading}>
            2. FORM 3 CỘT ĐỒNG BỘ (Input + Select + Button)
          </AppText>
          <View style={styles.sideBySideRow}>
            <View style={styles.colInput}>
              <AppInput
                size={matrixSize}
                placeholder="Họ và tên..."
                containerStyle={styles.noMargin}
              />
            </View>
            <View style={styles.colSelect}>
              <AppSelect
                size={matrixSize}
                options={countryOptions}
                value={sampleSelectVal}
                onSelect={(v) => setSampleSelectVal(String(v))}
                containerStyle={styles.noMargin}
                sheetTitle="Chọn quốc gia"
              />
            </View>
            <View style={styles.colButton}>
              <AppButton
                size={matrixSize}
                title="Lưu"
                variant="primary"
                onPress={() => haptics.light()}
              />
            </View>
          </View>

          <AppText style={styles.demoSubheading}>
            3. SEARCHBAR TOÀN CHIỀU RỘNG ({currentHeight}px)
          </AppText>
          <AppSearchBar
            size={matrixSize}
            placeholder={`Thanh tìm kiếm ${matrixSize.toUpperCase()} (${currentHeight}px)...`}
            value={query}
            onChangeText={setQuery}
            onFilterPress={() => haptics.light()}
          />
        </View>
      </AppCard>
    </View>
  );
};
