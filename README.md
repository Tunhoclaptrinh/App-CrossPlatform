# React Native Universal Base App (Starter Template)

> Bộ khung ứng dụng di động đa nền tảng (React Native 0.87+ New Architecture & TypeScript) chuẩn công nghiệp, sẵn sàng cho mọi thể loại đồ án và dự án thực tế: **App Local Offline**, **App Kết nối Server REST API**, hoặc **App Trợ lý AI**.

---

## 🚀 Điểm Nổi Bật (Key Features)

* **Architecture:** Cấu trúc phân lớp chuẩn công nghiệp (`src/`), hỗ trợ Path Aliases (`@/*`).
* **Modular Component Architecture:** Mọi component đều được chuẩn hóa theo cấu trúc tách biệt rõ ràng:
  * `[Component].tsx`: Logic render giao diện thuần túy.
  * `styles.ts`: Định nghĩa kiểu dáng qua `StyleSheet.create()`, tuyệt đối không dùng inline styles.
  * `types.ts`: Toàn bộ TypeScript interfaces & props tách biệt.
  * `constants.ts`: Các hằng số, giá trị mặc định của component (nếu có).
  * `index.ts`: Re-export sạch sẽ, hỗ trợ import tiện lợi.
* **Crash Resilience & Error Boundary:** Tích hợp sẵn `ErrorBoundary` chống văng app khi gặp lỗi JavaScript runtime và `useDoubleBackExit` chống thoát nhầm trên Android.
* **Design System Toàn Cầu:** Bảng màu Semantic Palette (50–950), Thang Bo góc (`none` đến `pill`), Khoảng cách (`Spacing`), Kiểu chữ (`Typography`) và Đổ bóng Cross-platform (`Shadows`).
* **UI Components Chuẩn Hóa:**
  * `AppSearchBar`: Thanh tìm kiếm thời gian thực, tích hợp sẵn debounce, nút xóa nhanh và nút bộ lọc.
  * `OptimizedList`: Danh sách hiệu năng cao tối ưu số node render, tích hợp sẵn EmptyState, Loading và Pull-to-refresh.
  * `ScreenWrapper`: Tự xử lý SafeArea chống tai thỏ, Dark Mode & ẩn bàn phím tự động.
  * `AppHeader`: Thanh tiêu đề tùy biến (Title, Subtitle, Back, Action buttons).
  * `AppLogo`: Logo vector đa sắc thái Gradient.
  * `AppInput`: Ô nhập chuẩn kèm Icon, ẩn/hiện mật khẩu, báo lỗi đỏ.
  * `AppCard`: Thẻ đa biến thể (`elevated`, `outlined`, `flat`) hỗ trợ chạm và bo góc tùy biến.
  * `AppBadge`: Huy hiệu trạng thái (`success`, `warning`, `error`, `info`, `neutral`).
  * `Skeleton` & `SkeletonCard`: Khung xương tải dữ liệu nhấp nháy 60 FPS Native Driver.
  * `EmptyState`: Màn hình thông báo danh sách trống thân thiện kèm nút hành động.
  * `LoadingOverlay`: Lớp phủ mờ xoay vòng khi đang xử lý giao dịch.
* **Hệ Thống API & Type Response Đầy Đủ:**
  * `apiClient`: Universal HTTP client hỗ trợ REST API và AI endpoints.
  * `ApiResponse<T>`, `ApiError`, `PaginatedResponse<T>`, `PaginationParams`, `RequestOptions`, `AiChatRequest`, `AiChatResponse`.
* **Thư Viện Validate & Schemas Chặt Chẽ:**
  * `zod`: Tích hợp schema xác thực form (`loginSchema`, `registerSchema`, `searchSchema`) kèm hàm `validateWithZod()` xuất lỗi dạng Map cho UI.
  * `validators`: Kiểm tra nhanh Email, Số điện thoại Việt Nam (03, 05, 07, 08, 09, +84), Độ mạnh mật khẩu, URL.
* **Tối Ưu Hiệu Năng & Chống Spam Sự Kiện:**
  * `useDebounce`: Hoãn cập nhật state cho đến khi dừng gõ.
  * `useThrottle`: Giới hạn tần suất xử lý giá trị (scroll offset).
  * `useThrottleCallback`: Chống người dùng spam click nhiều lần vào nút Thanh toán / Gửi đơn / Gọi API.
  * `removeVietnameseTones`: Chuẩn hóa tiếng Việt có dấu thành không dấu để tìm kiếm gõ không dấu vẫn ra chính xác.
  * `timeAgo`: Định dạng thời gian tương đối bằng tiếng Việt ("Vừa xong", "5 phút trước", "Hôm qua").
  * `formatFileSize`: Định dạng dung lượng tệp (B, KB, MB, GB).
* **Thông Báo Toàn Cục (In-App Toast):** `useToast()` trượt từ đỉnh màn hình bằng Spring Animation mượt mà.
* **Cơ Sở Dữ Liệu SQLite Siêu Tốc:** `@op-engineering/op-sqlite` chạy JSI C++ trực tiếp trên New Architecture.
* **Lưu Trữ Bền Vững:** `appStorage` trên nền `@react-native-async-storage/async-storage`.
* **Đa Ngôn Ngữ (i18n):** `i18next` + `react-i18next` hỗ trợ chuyển đổi Tiếng Việt & Tiếng Anh tức thì.
* **Quản Trị Phiên Bản & Cập Nhật:** `appUpdateService` so sánh phiên bản và nhắc nhở người dùng cập nhật qua Store.
* **Agent Skill & Quy Chuẩn Bảo Trì:** Tích hợp sẵn skill trong `.agents/skills/react-native-base/` và quy tắc nghiêm ngặt trong `docs/CONVENTIONS.md`.

---

## 🛠 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Chạy máy ảo Android:
```bash
# Bật máy ảo trong Android Studio trước, sau đó chạy:
npm run android
```

### 3. Kiểm định chất lượng code (Pre-flight Quality Check):
```bash
npm run lint       # Kiểm tra ESLint (0 errors, 0 warnings)
npx tsc --noEmit   # Kiểm tra kiểu dữ liệu TypeScript (0 errors)
npm test           # Chạy toàn bộ Unit Tests Jest (100% pass)
```

---

## 📁 Cấu Trúc Thư Mục Chuẩn

```text
src/
├── assets/             # Hình ảnh, icons, fonts
├── components/         # Reusable atomic UI & Toast
│   ├── common/         # Mỗi component là 1 thư mục gồm: .tsx, styles.ts, types.ts, index.ts
│   │   ├── AppBadge/
│   │   ├── AppButton/
│   │   ├── AppCard/
│   │   ├── AppHeader/
│   │   ├── AppInput/
│   │   ├── AppLogo/
│   │   ├── AppSearchBar/
│   │   ├── AppText/
│   │   ├── EmptyState/
│   │   ├── ErrorBoundary/
│   │   ├── LoadingOverlay/
│   │   ├── OptimizedList/
│   │   ├── ScreenWrapper/
│   │   └── Skeleton/
│   └── toast/          # In-App spring toast provider & hook
├── constants/          # Colors, Spacing, Typography, Shadows, AppConfig
├── hooks/              # useAppStore, useDebounce, useThrottle, useDoubleBackExit...
├── i18n/               # vi.json, en.json, cấu hình i18next
├── navigation/         # React Navigation v7 Native Stack
├── screens/            # Splash, Home, Details (mỗi screen có styles.ts riêng)
├── services/           # ApiClient (Universal REST/AI + types.ts), SQLite, Storage, AppUpdate
├── types/              # Định nghĩa types toàn cục (api.ts, models.ts, index.ts)
└── utils/              # formatters, validators, schemas (Zod), helpers
```
