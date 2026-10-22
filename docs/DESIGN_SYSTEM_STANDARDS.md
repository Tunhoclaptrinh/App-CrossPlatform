# Quy Chuẩn Hệ Thống Thiết Kế & Base Components (Design System Standards)

> **Phiên bản:** v2.0  
> **Áp dụng cho:** Toàn bộ Base Components trong `src/components/common`, màn hình ứng dụng và Storybook Showcase.

---

## 1. Triết Lý & Nguyên Tắc Cốt Lõi (Single Source of Truth)

Hệ thống điều khiển (Buttons, Inputs, Selects, SearchBars, Badges, Cards) tuân thủ nghiêm ngặt chuẩn **Apple Human Interface Guidelines (HIG)** và quy tắc **100% Size Parity**:
1. **Không Hardcode Magic Numbers**: Mọi kích thước chiều cao, padding, font chữ, icon size đều phải xuất phát từ `ControlSize` và `Spacing` trong `src/constants/theme.ts`.
2. **Đồng Bộ Chiều Cao Tuyệt Đối**: Khi đặt một Button, Input, Select hoặc SearchBar cạnh nhau trên cùng một hàng hoặc cùng một form, chúng **bắt buộc phải có cùng chiều cao chính xác từng pixel** tương ứng với từng cấp độ (`sm`, `md`, `lg`).

---

## 2. Bảng Quy Chuẩn Kích Thước Điều Khiển (`ControlSize`)

| Scale Key | Chiều Cao (`height`) | Padding Ngang (`paddingHorizontal`) | Cỡ Chữ (`fontSize`) | Dòng (`lineHeight`) | Cỡ Icon (`iconSize`) | Ngữ Cảnh Sử Dụng (Use Cases) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`sm`** | **36px** | 12px | 13px | 18px | 16px | Thanh công cụ, bảng dữ liệu dày đặc, bộ lọc nhỏ, chip phụ. |
| **`md`** *(Default)* | **44px** | 16px | 15px | 20px | 18px | Chuẩn chạm tối thiểu Apple HIG (44pt), form nhập liệu chính, nút chính. |
| **`lg`** | **52px** | 20px | 17px | 22px | 20px | Màn hình Đăng nhập/Đăng ký, nút Call-to-Action (CTA) Hero, thanh toán. |

### Các Token Bổ Trợ:
- **`iconBtnSm`**: `36px` (Nút icon vuông nhỏ).
- **`iconBtnMd`**: `44px` (Nút icon vuông tiêu chuẩn).
- **`badgeHeightSm`**: `24px` (Huy hiệu trạng thái nhỏ).
- **`badgeHeightMd`**: `28px` (Huy hiệu trạng thái tiêu chuẩn).

---

## 3. Danh Mục Base Components & Props Chuẩn Hóa

### 3.1. `AppButton`
```tsx
import { AppButton } from '@/components';

// Hỗ trợ sizes: 'sm' | 'md' | 'lg'
// Hỗ trợ variants: 'primary' | 'secondary' | 'outline' | 'tonal' | 'danger' | 'ghost' | 'glass'
<AppButton
  size="md"
  variant="primary"
  title="Xác Nhận"
  leftIcon={<Sparkles size={18} color="#FFF" />}
  loading={false}
  disabled={false}
  onPress={() => console.log('Pressed')}
/>
```

### 3.2. `AppInput`
```tsx
import { AppInput } from '@/components';

// Hỗ trợ sizes: 'sm' | 'md' | 'lg'
<AppInput
  size="md"
  label="Email Đăng Nhập"
  placeholder="name@example.com"
  leftIcon={<Mail size={18} color={themeColors.textSecondary} />}
  value={email}
  onChangeText={setEmail}
  error={emailError}
  disabled={false}
/>
```

### 3.3. `AppSelect`
```tsx
import { AppSelect } from '@/components';

// Hỗ trợ sizes: 'sm' | 'md' | 'lg'
// Tự động mở Cupertino Bottom Sheet Modal với phản hồi rung Haptic
<AppSelect
  size="md"
  label="Quốc Gia"
  placeholder="Chọn quốc gia..."
  options={[
    { label: 'Việt Nam', value: 'vn', icon: <Globe size={16} color="#007AFF" /> },
    { label: 'Hoa Kỳ', value: 'us', icon: <Globe size={16} color="#10B981" /> },
  ]}
  value={selectedCountry}
  onSelect={(val) => setSelectedCountry(val)}
  sheetTitle="Danh Sách Quốc Gia"
/>
```

### 3.4. `AppSearchBar`
```tsx
import { AppSearchBar } from '@/components';

// Hỗ trợ sizes: 'sm' | 'md' | 'lg', tích hợp sẵn Debounce 300ms
<AppSearchBar
  size="md"
  placeholder="Tìm kiếm danh mục..."
  onDebounceChange={(query) => handleSearch(query)}
  onFilterPress={() => openFilterModal()}
/>
```

---

## 4. Kiến Trúc Atomic Design (Atoms, Molecules, Organisms, Templates)

Toàn bộ hệ thống giao diện được tổ chức theo triết lý **Atomic Design** trong `@/components`:

```
src/components/
├── common/
│   ├── Atoms/       (Nguyên tử: AppText, AppBadge, AppLogo, Skeleton, CupertinoIconTile, AppleMeshBackground)
│   ├── Molecules/   (Phân tử: AppButton, AppInput, AppSelect, AppSearchBar, AppSwitch, AppCheckbox, EmptyState)
│   ├── Organisms/   (Sinh vật: AppCard, GlassCard, AppleGlassCard, GlassTile, WidgetCard, ConfirmDialog, etc.)
│   └── Templates/   (Bố cục: ScreenWrapper)
└── index.ts         (Hỗ trợ export phẳng 100% tương thích ngược + export theo nhóm Atoms, Molecules, Organisms, Templates)
```

```tsx
// 1. Import phẳng (Thuận tiện & Tương thích ngược):
import { AppButton, AppInput, AppleGlassCard, ScreenWrapper } from '@/components';

// 2. Import theo phân tầng Atomic Design (Tường minh kiến trúc):
import { Atoms, Molecules, Organisms, Templates } from '@/components';
const { AppText, CupertinoIconTile } = Atoms;
const { AppButton, AppSelect } = Molecules;
const { AppleGlassCard, ConfirmDialog } = Organisms;
```

---

## 5. Quy Chuẩn Tách File Style Bắt Buộc (Strict Style Separation)

> [!CAUTION]
> **CẤM VIẾT INLINE STYLESHEET TRONG FILE COMPONENT (`.tsx`):**
> 1. Mọi component đều phải tách riêng styles ra file độc lập: `<ComponentName>.styles.ts` hoặc `<ComponentName>/styles.ts`.
> 2. File `.tsx` chỉ phụ trách logic, JSX markup và hook lifecycle.
> 3. Tuyệt đối không hardcode mã màu hoặc số đo trực tiếp trong file render; sử dụng hàm `createStyles(themeColors, radiusTokens, isDark)` để hỗ trợ theme động (Light/Dark/Glass/Accent).

---

## 6. Tiêu Chuẩn Nút Bấm & Bề Mặt Kính Mờ Apple Liquid Glass

Biến thể `variant="glass"` trên `AppButton` và các bề mặt `GlassCard`, `AppleGlassCard` tuân thủ chuẩn quang học Apple iOS 18:
1. **Bán trong suốt (Subtle Translucency)**:
   - Light Mode: `backgroundColor: 'rgba(255, 255, 255, 0.78)'`, viền `rgba(255, 255, 255, 0.90)`
   - Dark Mode: `backgroundColor: 'rgba(255, 255, 255, 0.09)'`, viền `rgba(255, 255, 255, 0.22)`
2. **Đường viền phản xạ Specular Highlight Hairline**:
   - Nút và thẻ kính luôn có dải highlight quang học `height: 1.2px` trên đỉnh viền (`specularHighlight`) mô phỏng sự khúc xạ ánh sáng trên cạnh vát kính thật.
3. **Bóng đổ mềm quang học (Ambient Occlusion Shadow)**:
   - `shadowOffset: { width: 0, height: 4 }`, `shadowRadius: 10`, `elevation: 2`.

---

## 7. QUY TẮC BẮT BUỘC: Cập Nhật Base Phải Cập Nhật Storybook

> [!IMPORTANT]
> **QUY TẮC VÀNG (MANDATORY RULE):**  
> Bất kỳ khi nào một lập trình viên hoặc AI agent thực hiện một trong các hành động sau:
> 1. Thêm mới một Base Component vào `src/components/common`.
> 2. Cập nhật hoặc thêm mới prop, variant, trạng thái (state) cho Base Component hiện có.
> 3. Điều chỉnh kích thước tokens hoặc theme constants trong `src/constants/theme.ts`.
>
> **BẮT BUỘC PHẢI THỰC HIỆN ĐỒNG THỜI 4 BƯỚC:**
> 1. Tách riêng file `<ComponentName>.styles.ts` theo quy chuẩn tách style.
> 2. Cập nhật `src/screens/Details/components/StorybookShowcase.tsx` để thêm showcase trực quan cho component/prop mới.
> 3. Cập nhật bộ unit test tương ứng trong `__tests__/components.test.tsx` và đảm bảo `npm test` pass 100%.
> 4. Cập nhật tài liệu này (`docs/DESIGN_SYSTEM_STANDARDS.md`).

---

## 8. Truy Cập Storybook Trong Ứng Dụng

Ứng dụng tích hợp Storybook trực tiếp vào runtime để kiểm thử tức thời trên cả máy thật và máy ảo Android/iOS:
1. **Từ Màn Hình Chính (Home)**: Nhấn vào card module **"Storybook & Component Catalog"** (danh mục Giao diện & UI).
2. **Từ Màn Hình Chi Tiết (Details)**: Cuộn thanh tab ngang và chọn tab **"Storybook UI"**.
3. **Các tính năng trên Storybook**:
   - **Ma Trận Đồng Bộ Chiều Cao (Parity Matrix)**: Bật tắt `SM (36px)`, `MD (44px)`, `LG (52px)` để kiểm tra độ thẳng hàng giữa Input, Select và Button.
   - **Bộ Thử Nghiệm Biến Thể Nút (Button Studio)**: Thử nghiệm 7 biến thể (`primary`, `secondary`, `outline`, `tonal`, `danger`, `ghost`, `glass` - Liquid Glass) và các trạng thái (`loading`, `disabled`).
   - **Form Lab**: Thử nghiệm mật khẩu che giấu, chọn giá trị qua Cupertino Sheet, trạng thái lỗi (`error`), và khóa thao tác (`disabled`).
   - **Kiểm Thử Huy Hiệu & Công Tắc**: Badges, Switches, Checkboxes và Thẻ Kính Apple Glass.



## Shared screen composition and product branches

Prefer the base UI before building product UI: AppScreenLayout/ScreenWrapper, AppHeader, AppNavigationTabBar/AppBottomNav, AppCard, AppListItem/AppListGroup, AppDivider, EmptyState and the existing form controls. Product screens own business data, translated labels and navigation destinations.

- AppScreenLayout composes ScreenWrapper + AppHeader, standard content spacing and a fixed footer. It owns the top safe area through AppHeader; set bottomInset=false when a tab bar handles the bottom inset. ScreenWrapper header/footer stay outside the scrolling body; keyboard avoidance uses padding on iOS and height on Android.
- AppNavigationTabBar connects AppBottomNav to React Navigation bottom-tabs v7. Item keys are route names; selection comes from navigator state, tabPress can be prevented, long press is emitted and the bar hides for the keyboard. Render it as a React element in a stable tabBar callback. Applications supply labels/icons and their own typed route lists.
- Use surface="solid" on AppScreenLayout, AppCard and AppListGroup for opaque semantic surfaces without resetting the saved glass theme or accent. The default surface="theme" preserves existing behavior. AppCard accepts token-based gap and forwards accessibility/test/disabled props. AppListItem preserves disabled button semantics and respects the global haptics preference.
- Storybook's shared layout preview uses a real independent tab navigator. Base component tests cover safe area composition, accessible disabled actions and navigation events.
- Develop generic improvements on main (or a dedicated base branch), update README/CONVENTIONS/SKILL/Storybook/tests, run lint + tsc + tests, then commit the base change. Merge main into product branches before using the new API. Keep branding, domain types/store data and product routes out of base commits. Synchronize shared changes through Git; do not maintain copied components in each app.
