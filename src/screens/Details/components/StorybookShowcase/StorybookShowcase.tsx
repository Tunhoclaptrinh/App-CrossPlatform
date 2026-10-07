import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  BookOpen,
  Sparkles,
  Sliders,
  CheckCircle2,
  Lock,
  Mail,
  Search,
  Globe,
  Bell,
  Tag,
  CreditCard,
  Layers,
  Maximize2,
} from 'lucide-react-native';
import {
  AppText,
  AppButton,
  AppInput,
  AppSelect,
  AppSearchBar,
  AppBadge,
  AppSwitch,
  AppCheckbox,
  AppCard,
  GlassCard,
} from '@/components';
import { ControlSize, type ControlSizeKey } from '@/constants/theme';
import { haptics } from '@/utils';
import { createStorybookStyles } from './styles';
import type { StorybookShowcaseProps, StoryCategory } from './types';

export const StorybookShowcase: React.FC<StorybookShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
}) => {
  const styles = useMemo(
    () => createStorybookStyles(themeColors, radiusTokens, isDark),
    [themeColors, radiusTokens, isDark]
  );

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState<StoryCategory>('parity');

  // Parity Matrix Global Sizing Scale Tester
  const [matrixSize, setMatrixSize] = useState<ControlSizeKey>('md');

  // Interactive Form Inputs State
  const [sampleText, setSampleText] = useState('John Doe');
  const [samplePassword, setSamplePassword] = useState('SuperSecret123!');
  const [sampleSelectVal, setSampleSelectVal] = useState<string>('vn');
  const [sampleCurrencyVal, setSampleCurrencyVal] = useState<string>('usd');

  // Interactive Switches & Checkbox State
  const [switchVal1, setSwitchVal1] = useState(true);
  const [switchVal2, setSwitchVal2] = useState(false);
  const [checkboxVal1, setCheckboxVal1] = useState(true);
  const [checkboxVal2, setCheckboxVal2] = useState(false);

  // Button interactive state
  const [btnLoading, setBtnLoading] = useState(false);

  const countryOptions = [
    { label: 'Việt Nam (VN)', value: 'vn', icon: <Globe size={16} color="#007AFF" />, sublabel: '+84 Quốc gia' },
    { label: 'United States (US)', value: 'us', icon: <Globe size={16} color="#10B981" />, sublabel: '+1 North America' },
    { label: 'Japan (JP)', value: 'jp', icon: <Globe size={16} color="#EC4899" />, sublabel: '+81 Asia Pacific' },
    { label: 'Singapore (SG)', value: 'sg', icon: <Globe size={16} color="#8B5CF6" />, sublabel: '+65 ASEAN Hub' },
  ];

  const currencyOptions = [
    { label: 'USD ($) - Đô La Mỹ', value: 'usd', icon: <CreditCard size={16} color="#10B981" /> },
    { label: 'VND (₫) - Đồng Việt Nam', value: 'vnd', icon: <CreditCard size={16} color="#007AFF" /> },
    { label: 'EUR (€) - Đồng Euro', value: 'eur', icon: <CreditCard size={16} color="#F59E0B" /> },
  ];

  const categories: { id: StoryCategory; label: string; icon: any }[] = [
    { id: 'parity', label: 'Chuẩn Hóa Kích Thước', icon: Maximize2 },
    { id: 'buttons', label: 'Buttons (Nút)', icon: Sliders },
    { id: 'inputs', label: 'Inputs & Search', icon: Search },
    { id: 'selects', label: 'Select (Dropdown)', icon: Tag },
    { id: 'badges', label: 'Badges & Switches', icon: Bell },
    { id: 'surfaces', label: 'Thẻ & Bề Mặt', icon: Layers },
  ];

  return (
    <View style={styles.container}>
      {/* 1. STORYBOOK HERO BANNER */}
      <AppCard style={styles.cardGap}>
        <View style={styles.heroHeaderRow}>
          <View style={styles.heroTag}>
            <BookOpen size={12} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.heroTagText}>DESIGN SYSTEM STORYBOOK</AppText>
          </View>
          <View style={styles.heroVersionBadge}>
            <CheckCircle2 size={11} color="#10B981" strokeWidth={2.4} />
            <AppText style={styles.heroVersionText}>STRICT 100% PARITY</AppText>
          </View>
        </View>

        <View style={styles.heroTitleGroup}>
          <AppText style={[styles.heroTitle, { color: themeColors.text }]}>
            Component Catalog & Sizing Tokens
          </AppText>
          <AppText style={[styles.heroDesc, { color: themeColors.textSecondary }]}>
            Quy chuẩn đồng bộ kích thước Button, Input, Select, SearchBar theo tỷ lệ chuẩn Apple iOS.
            Mọi control đều chia sẻ cùng chiều cao (sm: 36px, md: 44px, lg: 52px).
          </AppText>
        </View>

        {/* Global Control Size Selector */}
        <View style={styles.sizeSwitcherContainer}>
          <AppText style={[styles.sizeSwitcherLabel, { color: themeColors.textSecondary }]}>
            THỬ NGHIỆM SCALE TOÀN HỆ THỐNG:
          </AppText>
          <View style={styles.sizeSwitcherBar}>
            {(['sm', 'md', 'lg'] as ControlSizeKey[]).map((sz) => {
              const isActive = matrixSize === sz;
              const metric = ControlSize[sz];
              return (
                <TouchableOpacity
                  key={sz}
                  activeOpacity={0.8}
                  style={[
                    styles.sizeSwitcherItem,
                    isActive && styles.sizeSwitcherItemActive,
                  ]}
                  onPress={() => {
                    haptics.light();
                    setMatrixSize(sz);
                  }}
                >
                  <AppText
                    style={[
                      styles.sizeSwitcherItemText,
                      isActive ? styles.sizeSwitcherItemTextActive : { color: themeColors.textSecondary },
                    ]}
                  >
                    {sz.toUpperCase()} ({metric.height}px)
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </AppCard>

      {/* 2. CATEGORY HORIZONTAL SELECTOR */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContent}
        style={styles.categoryScroll}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const CatIcon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.75}
              style={[
                styles.categoryChip,
                isActive ? styles.categoryChipActive : styles.categoryChipInactive,
              ]}
              onPress={() => {
                haptics.light();
                setActiveCategory(cat.id);
              }}
            >
              <CatIcon
                size={14}
                color={isActive ? '#FFFFFF' : themeColors.textSecondary}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <AppText
                style={[
                  styles.categoryChipText,
                  isActive ? styles.categoryChipTextActive : { color: themeColors.textSecondary },
                ]}
              >
                {cat.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 3. SHOWCASE CONTENT PANELS */}
      {/* PANEL A: PARITY MATRIX (MA TRẬN ĐỒNG BỘ CHIỀU CAO SIDE-BY-SIDE) */}
      {(activeCategory === 'parity' || activeCategory === 'inputs' || activeCategory === 'buttons') && (
        <AppCard style={styles.cardGap}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Maximize2 size={16} color="#6366F1" strokeWidth={2.4} />
              <AppText style={[styles.sectionTitle, { color: themeColors.text }]}>
                1. Ma Trận Đồng Bộ Chiều Cao ({matrixSize.toUpperCase()} = {ControlSize[matrixSize].height}px)
              </AppText>
            </View>
            <View style={styles.parityPill}>
              <AppText style={styles.parityPillText}>PARITY 1:1</AppText>
            </View>
          </View>
          <AppText style={[styles.sectionDesc, { color: themeColors.textSecondary }]}>
            Quan sát Input, Select và Button khi đặt cạnh nhau hoặc cùng 1 form. Chiều cao và bo góc khớp tuyệt đối từng pixel.
          </AppText>

          {/* Side-by-side row */}
          <View style={styles.parityDemoBox}>
            <AppText style={[styles.demoSubheading, { color: themeColors.textSecondary }]}>
              HÀNG NGANG ĐỒNG BỘ (Side-by-Side Flex Layout)
            </AppText>
            <View style={styles.sideBySideRow}>
              <View style={styles.sideColInput}>
                <AppInput
                  size={matrixSize}
                  placeholder={`Input (${ControlSize[matrixSize].height}px)`}
                  leftIcon={<Search size={ControlSize[matrixSize].iconSize} color={themeColors.textSecondary} />}
                  containerStyle={styles.inputNoMargin}
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

            <View style={styles.spacerSm} />

            <AppText style={[styles.demoSubheading, { color: themeColors.textSecondary }]}>
              FORM 3 CỘT (Input + Select + Button)
            </AppText>
            <View style={styles.sideBySideRow}>
              <View style={styles.colWide}>
                <AppInput
                  size={matrixSize}
                  placeholder="Họ và tên..."
                  containerStyle={styles.inputNoMargin}
                />
              </View>
              <View style={styles.colMid}>
                <AppSelect
                  size={matrixSize}
                  options={countryOptions}
                  value={sampleSelectVal}
                  onSelect={(v) => setSampleSelectVal(String(v))}
                  containerStyle={styles.inputNoMargin}
                  sheetTitle="Chọn quốc gia"
                />
              </View>
              <View style={styles.colNarrow}>
                <AppButton
                  size={matrixSize}
                  title="Lưu"
                  variant="tonal"
                  onPress={() => haptics.light()}
                />
              </View>
            </View>

            <View style={styles.spacerSm} />

            <AppText style={[styles.demoSubheading, { color: themeColors.textSecondary }]}>
              SEARCHBAR TOÀN CHIỀU RỘNG ({ControlSize[matrixSize].height}px)
            </AppText>
            <AppSearchBar
              size={matrixSize}
              placeholder={`Thanh tìm kiếm ${matrixSize.toUpperCase()} (${ControlSize[matrixSize].height}px)...`}
              onFilterPress={() => haptics.light()}
            />
          </View>
        </AppCard>
      )}

      {/* PANEL B: BUTTONS FULL SPEC (CÁC BIẾN THỂ & TRẠNG THÁI BUTTON) */}
      {(activeCategory === 'buttons' || activeCategory === 'parity') && (
        <AppCard style={styles.cardGap}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Sliders size={16} color="#007AFF" strokeWidth={2.4} />
              <AppText style={[styles.sectionTitle, { color: themeColors.text }]}>
                2. Button Variants & States (7 Biến thể)
              </AppText>
            </View>
          </View>

          {/* Grid of button variants */}
          <View style={styles.buttonsGrid}>
            <View style={styles.btnRow}>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="primary"
                  title="Primary Button"
                  leftIcon={<Sparkles size={ControlSize[matrixSize].iconSize} color="#FFFFFF" />}
                  onPress={() => haptics.light()}
                />
              </View>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="secondary"
                  title="Secondary"
                  onPress={() => haptics.light()}
                />
              </View>
            </View>

            <View style={styles.btnRow}>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="outline"
                  title="Outline"
                  onPress={() => haptics.light()}
                />
              </View>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="tonal"
                  title="Tonal Surface"
                  onPress={() => haptics.light()}
                />
              </View>
            </View>

            <View style={styles.btnRow}>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="danger"
                  title="Danger Action"
                  onPress={() => haptics.light()}
                />
              </View>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="glass"
                  title="Glass Liquid"
                  leftIcon={<Sparkles size={ControlSize[matrixSize].iconSize} color={themeColors.text} />}
                  onPress={() => haptics.light()}
                />
              </View>
            </View>

            {/* Loading & Disabled demo */}
            <View style={styles.btnRow}>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="primary"
                  title={btnLoading ? 'Đang xử lý...' : 'Bấm để Loading'}
                  loading={btnLoading}
                  onPress={() => {
                    setBtnLoading(true);
                    setTimeout(() => setBtnLoading(false), 2000);
                  }}
                />
              </View>
              <View style={styles.btnCol}>
                <AppButton
                  size={matrixSize}
                  variant="primary"
                  title="Disabled State"
                  disabled
                />
              </View>
            </View>
          </View>
        </AppCard>
      )}

      {/* PANEL C: INPUTS & SELECTS LAB */}
      {(activeCategory === 'inputs' || activeCategory === 'selects' || activeCategory === 'parity') && (
        <AppCard style={styles.cardGap}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Tag size={16} color="#10B981" strokeWidth={2.4} />
              <AppText style={[styles.sectionTitle, { color: themeColors.text }]}>
                3. Form Controls: Input & Select ({matrixSize.toUpperCase()})
              </AppText>
            </View>
          </View>

          <View style={styles.inputsStack}>
            {/* Standard Input */}
            <AppInput
              size={matrixSize}
              label={`Họ và Tên (${ControlSize[matrixSize].height}px)`}
              value={sampleText}
              onChangeText={setSampleText}
              leftIcon={<Mail size={ControlSize[matrixSize].iconSize} color={themeColors.textSecondary} />}
              placeholder="Nhập tên người dùng..."
            />

            {/* Password Input */}
            <AppInput
              size={matrixSize}
              label="Mật Khẩu Bảo Mật (Secure Toggle)"
              value={samplePassword}
              onChangeText={setSamplePassword}
              isPassword
              leftIcon={<Lock size={ControlSize[matrixSize].iconSize} color={themeColors.textSecondary} />}
              placeholder="Nhập mật khẩu..."
            />

            {/* AppSelect Component with Cupertino Sheet */}
            <AppSelect
              size={matrixSize}
              label={`Chọn Đơn Vị Tiền Tệ (AppSelect ${ControlSize[matrixSize].height}px)`}
              options={currencyOptions}
              value={sampleCurrencyVal}
              onSelect={(val) => setSampleCurrencyVal(String(val))}
              sheetTitle="Danh Sách Tiền Tệ Hỗ Trợ"
            />

            {/* Error Input */}
            <AppInput
              size={matrixSize}
              label="Trường Lỗi Xác Thực (Error State)"
              value="email-sai-dinh-dang"
              error="Địa chỉ email không hợp lệ, vui lòng kiểm tra lại."
            />

            {/* Disabled Input */}
            <AppInput
              size={matrixSize}
              label="Trường Bị Khóa (Disabled State)"
              value="Giá trị cố định không thể chỉnh sửa"
              disabled
            />
          </View>
        </AppCard>
      )}

      {/* PANEL D: BADGES, SWITCHES & CHECKBOXES */}
      {(activeCategory === 'badges' || activeCategory === 'parity') && (
        <AppCard style={styles.cardGap}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Bell size={16} color="#F59E0B" strokeWidth={2.4} />
              <AppText style={[styles.sectionTitle, { color: themeColors.text }]}>
                4. Selection & Indicators (Switches, Checkboxes, Badges)
              </AppText>
            </View>
          </View>

          {/* Badges Matrix */}
          <AppText style={[styles.demoSubheading, { color: themeColors.textSecondary }]}>
            HUY HIỆU TRẠNG THÁI (AppBadge: sm=24px, md=28px)
          </AppText>
          <View style={styles.badgesWrap}>
            <AppBadge label="Primary" variant="primary" size="sm" />
            <AppBadge label="Success" variant="success" size="sm" />
            <AppBadge label="Warning" variant="warning" size="sm" />
            <AppBadge label="Error" variant="error" size="sm" />
            <AppBadge label="Info" variant="info" size="sm" />
            <AppBadge label="Neutral" variant="neutral" size="sm" />
          </View>

          <View style={styles.spacerSm} />

          {/* Switches & Checkboxes */}
          <AppText style={[styles.demoSubheading, { color: themeColors.textSecondary }]}>
            CÔNG TẮC & HỘP KIỂM (Switches & Checkboxes)
          </AppText>
          <View style={styles.togglesBox}>
            <AppSwitch
              label="Thông báo đẩy thời gian thực"
              sublabel="Nhận cảnh báo khi có biến động giá hoặc tin tức mới"
              value={switchVal1}
              onValueChange={setSwitchVal1}
            />
            <View style={styles.divider} />
            <AppSwitch
              label="Tự động đồng bộ hóa đám mây"
              sublabel="Sao lưu dữ liệu cục bộ vào máy chủ"
              value={switchVal2}
              onValueChange={setSwitchVal2}
            />
            <View style={styles.divider} />
            <AppCheckbox
              label="Ghi nhớ thông tin đăng nhập trên thiết bị này"
              checked={checkboxVal1}
              onChange={setCheckboxVal1}
            />
            <AppCheckbox
              label="Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật"
              checked={checkboxVal2}
              onChange={setCheckboxVal2}
            />
          </View>
        </AppCard>
      )}

      {/* PANEL E: SURFACES & CARDS */}
      {(activeCategory === 'surfaces' || activeCategory === 'parity') && (
        <AppCard style={styles.cardGap}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Layers size={16} color="#8B5CF6" strokeWidth={2.4} />
              <AppText style={[styles.sectionTitle, { color: themeColors.text }]}>
                5. Surface Hierarchy & Glass Cards
              </AppText>
            </View>
          </View>

          <View style={styles.surfacesStack}>
            {/* Elevated Card */}
            <AppCard variant="elevated" style={styles.surfaceItem}>
              <View style={styles.surfaceInner}>
                <AppText style={[styles.surfaceTitle, { color: themeColors.text }]}>
                  AppCard (Elevated)
                </AppText>
                <AppText style={[styles.surfaceBody, { color: themeColors.textSecondary }]}>
                  Bề mặt nổi với bóng đổ mềm, viền borderLight và nền card tiêu chuẩn.
                </AppText>
              </View>
            </AppCard>

            {/* Outlined Card */}
            <AppCard variant="outlined" style={styles.surfaceItem}>
              <View style={styles.surfaceInner}>
                <AppText style={[styles.surfaceTitle, { color: themeColors.text }]}>
                  AppCard (Outlined)
                </AppText>
                <AppText style={[styles.surfaceBody, { color: themeColors.textSecondary }]}>
                  Bề mặt phẳng với viền phân cách rõ nét 1px, phù hợp cho giao diện tối giản.
                </AppText>
              </View>
            </AppCard>

            {/* Glass Card */}
            <GlassCard style={styles.surfaceItem}>
              <View style={styles.surfaceInner}>
                <View style={styles.glassHeaderRow}>
                  <Sparkles size={14} color="#007AFF" />
                  <AppText style={[styles.surfaceTitle, { color: themeColors.text }]}>
                    GlassCard (Cupertino Frosted)
                  </AppText>
                </View>
                <AppText style={[styles.surfaceBody, { color: themeColors.textSecondary }]}>
                  Kính mờ xuyên thấu quang học đa tầng kèm viền phản quang Specular 1.2px chuẩn mực Apple iOS 18.
                </AppText>
              </View>
            </GlassCard>
          </View>
        </AppCard>
      )}
    </View>
  );
};
