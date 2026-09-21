# Quy Chuẩn Lập Trình & Bảo Trì (Code Conventions & Maintenance Rules)

Tài liệu này định nghĩa toàn bộ quy chuẩn lập trình, đặt tên file, cấu trúc mã nguồn, quản lý state tập trung, xử lý hiệu năng, validation và quy tắc bảo trì bắt buộc áp dụng cho dự án React Native này.

---

## 1. 🚨 Quy Tắc Bảo Trì & Refactor Bắt Buộc

Mỗi khi thêm mới tính năng, sửa đổi hoặc tái cấu trúc (refactor) mã nguồn:
1. **Bắt buộc cập nhật tài liệu:**
   * Cập nhật `README.md` (danh mục tính năng & hướng dẫn).
   * Cập nhật `docs/CONVENTIONS.md` (nếu có quy chuẩn mới).
   * Cập nhật AI Agent Skill: `.agents/skills/react-native-base/SKILL.md`.
2. **Bắt buộc qua 3 cổng kiểm định (Pre-flight Checklist):**
   * `npm run lint` -> **Phải đạt 0 errors, 0 warnings**.
   * `npx tsc --noEmit` -> **Phải đạt 0 errors (clean type check)**.
   * `npm test` -> **Toàn bộ test suites phải PASS 100%**.

---

## 2. Quy Chuẩn Tách Thư Mục Cho Component (Component Folder Isolation)

Mỗi component trong `src/components/common/` **BẮT BUỘC** phải nằm trong một thư mục riêng biệt mang tên component đó theo mẫu:

```text
src/components/common/ComponentName/
├── ComponentName.tsx    # Chỉ chứa logic render và state nội bộ của component
├── styles.ts            # Chỉ chứa StyleSheet.create() và style generators, CẤM inline styles
├── types.ts             # Chứa toàn bộ Props, Interfaces, Enums liên quan đến component
├── constants.ts         # (Tùy chọn) Chứa giá trị mặc định, thời gian animation...
└── index.ts             # Re-export sạch sẽ ComponentName và types
```

---

## 3. Hệ Thống Type Cho API & Services (API Response Types)

Toàn bộ phản hồi từ server hoặc AI model phải được định kiểu chặt chẽ trong `src/services/api/types.ts` và export ra `src/types/`:

* `ApiResponse<T>`: Chuẩn phản hồi tổng quát gồm `data`, `error`, `status`, `ok`.
* `ApiError`: Chi tiết lỗi gồm `code`, `message`, `statusCode`, `details`.
* `PaginatedResponse<T>`: Phân trang gồm `items`, `total`, `page`, `pageSize`, `totalPages`, `hasMore`.
* `PaginationParams`: Tham số truy vấn `page`, `limit`, `search`, `sortBy`, `order`.
* `RequestOptions`: Cấu hình fetch bổ sung `timeout`, `headers`, `params`.
* `AiChatRequest` & `AiChatResponse`: Tham số gửi và nhận từ các mô hình AI ngôn ngữ lớn.

---

## 4. Quản Lý State Tập Trung (Unified Global Store)

* **Toàn bộ dữ liệu dùng chung giữa các màn hình BẮT BUỘC nằm trong `useAppStore` (`src/hooks/useAppStore.ts`)**:
  * **Chế độ giao diện (Theme):** `themeMode` ('system' | 'light' | 'dark'), `setThemeMode()`, `toggleTheme()`.
  * **Ngôn ngữ (Language):** `language` ('vi' | 'en'), `setLanguage()` (tự động đồng bộ với `i18n.changeLanguage()`).
  * **Phiên người dùng (User Session):** `user` (User | null), `setUser()`, `logout()`.
  * **Chỉ số / Metrics:** `counter`, `increment()`, `reset()`.
* **Cơ chế lưu trữ:** `useAppStore` sử dụng middleware `persist` của Zustand kết hợp với `AsyncStorage`, tự động nạp lại dữ liệu (rehydrate) khi mở lại app.

---

## 5. Khả Năng Chống Sập & Ngoại Tuyến (Crash & Offline Resilience)

* **`ErrorBoundary` (`src/components/common/ErrorBoundary/`)**: Bọc ngoài cùng toàn bộ cây component trong `App.tsx`. Khi có lỗi crash JavaScript runtime, thay vì sập app ra màn hình chính, hệ thống sẽ hiện giao diện thông báo lỗi lịch sự kèm nút "Thử Lại".
* **`useDoubleBackExit` (`src/hooks/useDoubleBackExit.ts`)**: Gắn tại `HomeScreen` để chặn người dùng vô tình bấm phím Back thoát app đột ngột (yêu cầu bấm 2 lần trong 2 giây).
* **`OfflineBanner` & `useNetworkStatus`**: Tự động phát hiện khi mất kết nối mạng và hiển thị cảnh báo mỏng, hỗ trợ chạm để thử kết nối lại.

---

## 6. Hộp Thoại & Điều Khiển Biểu Mẫu (Dialogs & Form Controls)

* **`ConfirmDialog` (`src/components/common/ConfirmDialog/`)**: Thay thế cho `Alert.alert` mặc định của hệ điều hành, hỗ trợ hành động phá hủy (nút đỏ), trạng thái chờ (loading spinner) và thiết kế hài hòa theo Theme.
* **`AppCheckbox` (`src/components/common/AppCheckbox/`)**: Hộp kiểm chọn tùy biến cho điều khoản sử dụng hoặc danh sách việc cần làm.
* **`AppSwitch` (`src/components/common/AppSwitch/`)**: Nút gạt bật/tắt thiết lập kèm nhãn và mô tả phụ.

---

## 7. Xác Thực Dữ Liệu Với Zod & Regex (Validation Protocol)

* **Zod Schemas (`src/utils/schemas.ts`)**: Định nghĩa schema chặt chẽ cho toàn bộ biểu mẫu và API payload (`loginSchema`, `registerSchema`, `searchSchema`).
* **`validateWithZod()` Helper**: Parse dữ liệu và chuyển lỗi Zod thành dạng `Record<string, string>` ({ email: "Lỗi...", password: "..." }), giúp UI gắn lỗi vào `AppInput` cực kỳ dễ dàng.
* **Fast Regex Validators (`src/utils/validators.ts`)**: Cung cấp hàm kiểm tra nhanh không đồng bộ: `isValidEmail`, `isValidVietnamesePhone` (đầu 03, 05, 07, 08, 09 hoặc +84), `isValidPassword`, `isValidUrl`, `isNumberOnly`.

---

## 8. Tối Ưu Hiệu Năng & Tránh Spam Sự Kiện (Performance & UX)

* **`OptimizedList` (`src/components/common/OptimizedList/`)**:
  * FlatList bọc sẵn các cờ tối ưu: `removeClippedSubviews={true}`, `maxToRenderPerBatch={10}`, `windowSize={7}`, `initialNumToRender={10}`.
  * Tích hợp sẵn `ListEmptyComponent` (`EmptyState`), loading spinner, footer loading more và Pull-to-Refresh.
* **`AppSearchBar` (`src/components/common/AppSearchBar/`)**:
  * Tích hợp sẵn `useDebounce` (mặc định 350ms) để không bắn search query liên tục mỗi ký tự.
  * Tích hợp nút Xóa nhanh và nút Filter.
* **`removeVietnameseTones()` (`src/utils/formatters.ts`)**:
  * Chuẩn hóa chuỗi tiếng Việt có dấu thành không dấu để người dùng gõ "pho bo" vẫn tìm ra "Phở Bò".
* **`useThrottleCallback()` (`src/hooks/useThrottle.ts`)**:
  * Giới hạn tần suất bấm nút (ví dụ 1.5s/lần) để ngăn người dùng bấm liên tục nút "Đặt hàng", "Thanh toán", hoặc "Gửi form".

---

## 9. Quyền Thiết Bị & Deep Linking

* **`permissions` (`src/utils/permissions.ts`)**: Trợ thủ xin cấp quyền máy ảnh (`requestCamera`), thư viện ảnh (`requestPhotoLibrary`), và thông báo (`requestNotifications`) thân thiện, an toàn theo từng phiên bản Android/iOS.
* **`linking` (`src/navigation/linking.ts`)**: Cấu hình mở màn hình từ URL scheme và universal link (`reactnative://` hoặc `https://...`).

---

## 10. Nguyên Tắc Thiết Kế Giao Diện (Zero Inline Styles)

* **CẤM tuyệt đối viết Inline Styles** trong file JSX/TSX. Lỗi này bị kiểm soát nghiêm ngặt bởi ESLint rule `react-native/no-inline-styles`.
* Mỗi màn hình và mỗi component phải có file `styles.ts` riêng biệt và tạo qua `StyleSheet.create()`.
* Luôn sử dụng Design Tokens từ `@/constants`:
  * `Colors.light` / `Colors.dark`
  * `Spacing` (xxs: 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, huge: 64)
  * `BorderRadius` (none: 0, sm: 4, md: 8, lg: 12, xl: 16, xxl: 24, full: 999, pill: 9999)
  * `Typography` (header, title, subtitle, body, caption, overline)
  * `Shadows` (sm, md, lg)

---

## 11. Nguyên Tắc Đặt Tên (Naming Conventions)

| Đối tượng | Quy tắc | Ví dụ |
| :--- | :--- | :--- |
| **Thư mục Component** | PascalCase | `AppHeader/`, `OptimizedList/`, `ConfirmDialog/` |
| **Component Files** | PascalCase | `AppHeader.tsx`, `OptimizedList.tsx`, `ConfirmDialog.tsx` |
| **Hook Files** | camelCase, tiền tố `use` | `useAppStore.ts`, `useNetworkStatus.ts`, `useDebounce.ts` |
| **Service / Util Files** | camelCase | `apiClient.ts`, `permissions.ts`, `validators.ts` |
| **Styles / Types Files** | camelCase | `styles.ts`, `types.ts`, `constants.ts` |
| **TypeScript Types/Interfaces** | PascalCase | `User`, `ConfirmDialogProps`, `ApiResponse` |
| **Constants / Enums** | UPPER_SNAKE_CASE hoặc PascalCase | `STORAGE_KEYS.AUTH_TOKEN`, `Spacing.md`, `Colors.light` |
