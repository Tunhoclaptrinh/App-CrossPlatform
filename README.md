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
* **Bộ UI Components Chuẩn Hóa:**
  * `AppButton`: Nút bấm đa năng chuẩn Agency/Apple-tier: 7 biến thể (`primary`, `secondary`, `outline`, `tonal`, `danger`, `ghost`, `glass`), 3 kích thước (`sm`, `md`, `lg`), tích hợp icon SVG Lucide (tránh lỗi ô vuông `[ ]`), và tự động phản hồi rung xúc giác (Haptics).
  * `ConfirmDialog`: Hộp thoại xác nhận hành động theo Theme (Xác nhận xóa, Đăng xuất, Hủy thao tác).
  * `AppCheckbox`: Hộp tích chọn tùy chỉnh có hiệu ứng và nhãn.
  * `AppSwitch`: Nút gạt bật/tắt thiết lập (Ghi nhớ đăng nhập, Nhận thông báo).
  * `OfflineBanner`: Thanh thông báo ngoại tuyến tự động xuất hiện khi mất mạng kèm nút chạm để thử lại.
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
* **Chuẩn Hóa Icon Vector SVG 100% (`lucide-react-native`):**
  * Loại bỏ hoàn toàn icon font vector cũ (nguyên nhân gây ô vuông rỗng `[ ]` trên React Native New Architecture), thay thế bằng SVG render native mượt mà và sắc nét tuyệt đối.
* **Đồng Bộ Hóa Chế Độ Giao Diện Toàn Cầu (Synchronized Dark/Light Mode):**
  * 100% component đồng bộ qua `useThemeMode()`, đảm bảo khi chuyển đổi theme không bao giờ xảy ra tình trạng lệch màu hay chớp đen màn hình.
* **Hệ Thống API & Type Response Đầy Đủ:**
  * `apiClient`: Universal HTTP client hỗ trợ REST API và AI endpoints (`get`, `post`, `put`, `patch`, `delete`, `upload` multipart/form-data) cùng tệp mẫu cấu hình môi trường `.env.example`.
  * `ApiResponse<T>`, `ApiError`, `PaginatedResponse<T>`, `PaginationParams`, `RequestOptions`, `AiChatRequest`, `AiChatResponse`.
* **Thư Viện Validate & Schemas Chặt Chẽ:**
  * `zod`: Tích hợp schema xác thực form (`loginSchema`, `registerSchema`, `searchSchema`) đa ngôn ngữ kèm hàm `validateWithZod(schema, data, t?)` dịch thông báo lỗi trực tiếp theo ngôn ngữ đang chọn.
  * `validators`: Kiểm tra nhanh Email, Số điện thoại Việt Nam (03, 05, 07, 08, 09, +84), Độ mạnh mật khẩu, URL.
* **Cảm Biến Phản Hồi Rung (Haptics Vibration Feedback):**
  * `haptics`: Mô phỏng xúc giác chuẩn mực (`light`, `medium`, `heavy`, `success`, `error`, `cancel`) cho các tương tác bấm nút, gạt switch, chọn checkbox, mở dialog hoặc báo lỗi thao tác.
* **Xác Thực Sinh Trắc Học (Biometrics):**
  * `biometricService`: Nhận diện vân tay / Face ID an toàn, tương thích New Architecture kèm fallback xác thực trực quan.
* **Bảo Mật & Định Danh (Security & Crypto):**
  * `id`: Sinh UUID v4 (RFC4122), NanoID ngắn gọn, mã ShortCode OTP và Timestamp ID.
  * `cryptoHelper`: Băm SHA-256 và mã hóa/giải mã đối xứng an toàn cho thông tin nhạy cảm.
  * `secureStorage`: Lớp lưu trữ mã hóa tự động trên nền AsyncStorage.
* **Cử Chỉ Màn Hình & Chuyển Động Thông Minh (Smart Touch & Motion Gestures):**
  * `useSwipeGesture`: Nhận diện vuốt 4 hướng (Trái, Phải, Lên, Xuống) qua PanResponder.
  * `useDoubleTap`: Nhận diện chạm đúp dưới 300ms.
  * `useShakeDetection`: Nhận diện chuyển động lắc điện thoại qua cảm biến gia tốc, phản hồi rung mạnh (`haptics.heavy()`), cơ chế cooldown chống lặp và hàm `simulateShake()` cho máy ảo / test.
  * `haptics`: Phản hồi xúc giác rung chống crash an toàn tuyệt đối trên Android (bọc kiểm tra `android.permission.VIBRATE` qua `PermissionsAndroid.check`).
  * `GestureCard`: Thẻ tương tác phản hồi cử chỉ trực quan.
* **Cầu Nối Widget & In-App Webview:**
  * `widgetBridgeService`: Xuất snapshot dữ liệu app đồng bộ ra Android AppWidget / iOS WidgetKit.
  * `WidgetCard`: Component widget bảng điều khiển trong app.
  * `AppWebView`: Khung sườn trình duyệt web an toàn tích hợp.
* **Quản Lý & Xuất Nhập File Cục Bộ (Local File I/O & Native Sharing):**
  * `fileService`: Quản lý lưu trữ tệp văn bản và JSON chuẩn hóa bằng SQLite JSI, hỗ trợ đọc, ghi, liệt kê, xóa và chia sẻ/xuất file ra ngoài ứng dụng qua **Native OS Share Sheet** (`shareHelper`).
* **Quyền Thiết Bị (Device Permissions):**
  * `permissions`: Trợ thủ xin quyền thiết bị an toàn trên Android & iOS (Camera, Thư viện ảnh, Thông báo, Microphone, Vị trí).
* **Deep Linking Tích Hợp:**
  * `linking`: Cấu hình mở app từ liên kết URL (`reactnative://` hoặc `https://reactnativebase.app`).
* **Lộ Trình Mở Rộng Native (Expansion Roadmap):**
  * Hướng dẫn chi tiết cách gắn camera picker native, webview native, Android/iOS home screen widget tại `docs/EXPANSION_ROADMAP.md`.
* **Tối Ưu Hiệu Năng & Chống Spam Sự Kiện:**
  * `useNetworkStatus`: Giám sát trạng thái kết nối Internet và tự động kiểm tra lại khi mở app.
  * `useDebounce`: Hoãn cập nhật state cho đến khi dừng gõ.
  * `useThrottle`: Giới hạn tần suất xử lý giá trị (scroll offset).
  * `useThrottleCallback`: Chống người dùng spam click nhiều lần vào nút Thanh toán / Gửi đơn / Gọi API.
  * `removeVietnameseTones`: Chuẩn hóa tiếng Việt có dấu thành không dấu để tìm kiếm gõ không dấu vẫn ra chính xác.
  * `timeAgo`: Định dạng thời gian tương đối bằng tiếng Việt ("Vừa xong", "5 phút trước", "Hôm qua").
  * `formatFileSize`: Định dạng dung lượng tệp (B, KB, MB, GB).
* **Thông Báo Toàn Cục (In-App Toast):** `useToast()` trượt từ đỉnh màn hình bằng Spring Animation mượt mà.
* **Cơ Sở Dữ Liệu SQLite Siêu Tốc:** `@op-engineering/op-sqlite` chạy JSI C++ trực tiếp trên New Architecture.
* **Lưu Trữ Bền Vững:** `appStorage` trên nền `@react-native-async-storage/async-storage`.
* **Chuẩn Hóa Đa Ngôn Ngữ Song Ngữ (i18n):** `i18next` + `react-i18next` hỗ trợ chuyển đổi Tiếng Việt & Tiếng Anh tức thì, phân chia theo các namespaces rõ ràng (`common`, `validation`, `network`, `home`, `details`, `dialogs`, `splash`, `crypto`, `gestures`, `biometrics`, `widget`).
* **Phong Cách Thiết Kế Apple iOS 18 Cupertino & Liquid Glass:**
  * Thẻ kính mờ Liquid Glass (`GlassCard`) viền phản xạ ánh sáng (Specular Highlight) và hào quang tinh tế.
  * Bộ màu Apple System Colors (`AppleColors`) & Tokens Liquid Glass (`AppleGlassTokens`).
  * Cơ chế chuyển đổi giao diện mô-đun an toàn (`themeStyle: 'default' | 'apple-glass'`), không phá vỡ UI mặc định.
* **Kiến Trúc Kết Nối Thời Gian Thực Đa Nền Tảng (Universal Real-Time WebSocket):**
  * `socketService`: Tự động kết nối lại lũy thừa (Exponential Backoff), hàng đợi tin nhắn ngoại tuyến (Offline Queue), nhịp tim định kỳ (Heartbeat Ping/Pong 30s) và bộ lắng nghe sự kiện có định kiểu (Typed Pub/Sub).
  * Tài liệu so sánh chuyên sâu WebSocket vs. SSE vs. WebRTC tại `docs/REALTIME_GUIDE.md`.
* **Chuẩn Mã Hóa Tương Thích Server Backend (Server-Compatible AES-256):**
  * Định dạng payload tiêu chuẩn `AESP256:iv:salt:ciphertext:tag` hỗ trợ đầy đủ IV, Salt, Ciphertext và Auth Tag băm kiểm tra tính toàn vẹn.
  * Tương thích 100% với Node.js, Python, Java Spring Boot và Go. Hướng dẫn kèm mã nguồn backend hoàn chỉnh tại `docs/SERVER_ENCRYPTION_GUIDE.md`.
* **Quản Trị Phiên Bản & Cập Nhật:** `appUpdateService` so sánh phiên bản và nhắc nhở người dùng cập nhật qua Store.

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
│   │   ├── AppCheckbox/
│   │   ├── AppHeader/
│   │   ├── AppInput/
│   │   ├── AppLogo/
│   │   ├── AppSearchBar/
│   │   ├── AppSwitch/
│   │   ├── AppText/
│   │   ├── ConfirmDialog/
│   │   ├── EmptyState/
│   │   ├── ErrorBoundary/
│   │   ├── LoadingOverlay/
│   │   ├── OfflineBanner/
│   │   ├── OptimizedList/
│   │   ├── ScreenWrapper/
│   │   ├── Skeleton/
│   │   ├── WidgetCard/
│   │   ├── GestureCard/
│   │   ├── AppWebView/
│   │   └── GlassCard/          # Apple Liquid Glass Cupertino card
│   └── toast/          # In-App spring toast provider & hook
├── constants/          # Colors, appleTheme (AppleColors & GlassTokens), Spacing, Typography, Shadows
├── hooks/              # useAppStore (ThemeStyle), useGestures (Swipe & Shake), useDebounce...
├── i18n/               # vi.json, en.json, cấu hình i18next
├── navigation/         # React Navigation v7 Native Stack & deep linking
├── screens/            # Splash, Home, Details (mỗi screen có styles.ts riêng)
├── services/           # ApiClient, realtime (WebSocket), SQLite, fileService, biometricService, storage
├── types/              # Định nghĩa types toàn cục (api.ts, models.ts, index.ts)
└── utils/              # id, crypto (AESP256), image, file, clipboard, browser, haptics, permissions, schemas
```
