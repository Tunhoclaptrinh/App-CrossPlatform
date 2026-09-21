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
* **`apiClient` (`src/services/api/apiClient.ts`)**: Universal HTTP Client hỗ trợ đầy đủ `get`, `post`, `put`, `patch`, `delete` và `upload` (multipart/form-data cho tải tệp/ảnh), tự động gán Bearer token và xử lý timeout bằng `AbortController`.
* **Cấu hình môi trường (`.env.example`)**: Tệp mẫu khai báo các biến môi trường (`API_BASE_URL`, `WEBSOCKET_URL`, `CRYPTO_SHARED_SECRET`, `AI_API_KEY`...).

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

## 7. Xác Thực Dữ Liệu Với Zod & Song Ngữ (Validation Protocol)

* **Bilingual Zod Schemas (`src/utils/schemas.ts`)**: Định nghĩa schema chặt chẽ cho toàn bộ biểu mẫu và API payload (`loginSchema`, `registerSchema`, `searchSchema`). Các thông điệp lỗi được liên kết trực tiếp với key đa ngôn ngữ (`validation.emailRequired`, `validation.passwordMin`...).
* **`validateWithZod(schema, data, t?)` Helper**: Parse dữ liệu và chuyển lỗi Zod thành dạng `Record<string, string>` ({ email: "Lỗi...", password: "..." }). Khi truyền hàm `t` từ `useTranslation()`, thông báo lỗi sẽ tự động dịch sang ngôn ngữ người dùng đang chọn (VI/EN).
* **Fast Regex Validators (`src/utils/validators.ts`)**: Cung cấp hàm kiểm tra nhanh không đồng bộ: `isValidEmail`, `isValidVietnamesePhone` (đầu 03, 05, 07, 08, 09 hoặc +84), `isValidPassword`, `isValidUrl`, `isNumberOnly`.

---

## 8. Chuẩn Hóa Đa Ngôn Ngữ Song Ngữ (Bilingual i18n Standardization)

* **Cấu trúc namespace chặt chẽ trong `src/i18n/locales/` (`vi.json` & `en.json`)**:
  * `common`: Các từ khóa thông dụng (`welcome`, `save`, `cancel`, `confirm`, `delete`, `retry`, `loading`, `empty`, `search`, `language`, `theme`, `dark`, `light`...).
  * `validation`: Toàn bộ thông báo kiểm tra dữ liệu đầu vào.
  * `network`: Trạng thái mất kết nối và thử lại.
  * `home`, `details`, `splash`: Nội dung hiển thị riêng theo từng màn hình.
  * `dialogs`: Tiêu đề và nội dung các hộp thoại xác nhận.
* **Quy tắc bất di bất dịch**: Tuyệt đối không hardcode văn bản hiển thị cho người dùng. Luôn gọi qua `t('namespace.key')`.

---

## 9. Cảm Biến Thiết Bị & Phản Hồi Rung (Haptics Vibration Feedback)

* **`haptics` (`src/utils/haptics.ts`)**: Tích hợp xúc giác rung phản hồi tự nhiên qua React Native `Vibration` API:
  * Cơ chế an toàn chủ động (Fault-tolerant): Tự động kiểm tra quyền `android.permission.VIBRATE` trên Android qua `PermissionsAndroid.check` trước khi gọi để ngăn ngừa crash `SecurityException` từ native Android Binder IPC.
  * `haptics.light()`: Rung nhẹ khi chạm nút, bật/tắt checkbox, switch, chuyển theme.
  * `haptics.medium()`: Rung vừa khi mở hộp thoại xác nhận, mở menu.
  * `haptics.heavy()`: Rung mạnh cho hành động quan trọng hoặc cảnh báo.
  * `haptics.success()`: Chuỗi xung nhịp đôi báo thành công.
  * `haptics.error()`: Chuỗi xung nhịp báo thao tác thất bại hoặc lỗi validate.
  * `haptics.cancel()`: Dừng rung ngay lập tức.

---

## 10. Quản Lý & Xuất Nhập File Cục Bộ (Local File I/O & Native Share)

* **`fileService` (`src/services/file/fileService.ts`)**: Quản lý lưu trữ tập tin cục bộ dựa trên C++ JSI SQLite (`app_files` table):
  * `saveFile(filename, content, mimeType)`: Lưu trữ văn bản, dữ liệu chuỗi hoặc base64.
  * `readFile(filename)`: Đọc nội dung file dạng string (trả về null nếu không tồn tại).
  * `saveJson<T>(filename, data)`: Lưu trữ Object dưới dạng file JSON chuẩn hóa.
  * `readJson<T>(filename)`: Đọc và tự động parse JSON thành Type an toàn.
  * `deleteFile(filename)`: Xóa file khỏi hệ thống lưu trữ.
  * `listFiles()`: Lấy danh sách toàn bộ file trong máy kèm kích thước và thời gian cập nhật.
  * `exportFile(filename)`: Xuất và chia sẻ file ra bên ngoài ứng dụng thông qua **Native OS Share Sheet** (`shareHelper.shareText`).

---

## 11. Tối Ưu Hiệu Năng & Tránh Spam Sự Kiện (Performance & UX)

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

## 12. Quyền Thiết Bị & Deep Linking

* **`permissions` (`src/utils/permissions.ts`)**: Trợ thủ xin cấp quyền máy ảnh (`requestCamera`), thư viện ảnh (`requestPhotoLibrary`), thông báo (`requestNotifications`), microphone (`requestMicrophone`), và vị trí (`requestLocation`).
* **`linking` (`src/navigation/linking.ts`)**: Cấu hình mở màn hình từ URL scheme và universal link (`reactnative://` hoặc `https://...`).

---

## 13. Định Danh & Bảo Mật Dữ Liệu (ID Generation & Cryptography)

* **Tạo Khóa Định Danh (`src/utils/id.ts`)**:
  * `generateId(prefix?)`: Chuẩn RFC4122 UUID v4 cho unique keys và database primary keys.
  * `generateNanoId(size?)`: Chuỗi định danh ngắn gọn an toàn trên URL.
  * `generateShortCode(length?)`: Mã 6 ký tự viết hoa/số dành cho OTP, mã tra cứu.
  * `generateTimestampId(prefix?)`: Khóa định danh sắp xếp theo thứ tự thời gian.
* **Mã Hóa Đối Xứng & Băm Dữ Liệu (`src/utils/crypto.ts`)**:
  * `hashString(text)`: Tạo mã băm SHA-256 thuần TypeScript/JS.
  * `encryptString(text, key)` & `decryptString(cipher, key)`: Mã hóa bảo mật chuỗi nhạy cảm.
  * `secureStorage` (`src/services/storage/secureStorage.ts`): Tự động mã hóa trước khi ghi vào AsyncStorage và tự giải mã khi đọc ra.

---

## 14. Xác Thực Sinh Trắc Học (Biometric Authentication)

* **`biometricService` (`src/services/biometrics/`)**:
  * `isSensorAvailable()`: Tự động kiểm tra phần cứng cảm biến (Face ID / Fingerprint / Touch ID).
  * `authenticate(options)`: Mở hộp thoại quét sinh trắc học kèm phản hồi rung Haptic, hỗ trợ chuyển đổi mượt mà giữa môi trường giả lập (fallback confirmation) và thiết bị thật có native module.

---

## 15. Cử Chỉ Màn Hình & Chuyển Động Thông Minh (Smart Touch & Motion Gestures)

* Toàn bộ logic cử chỉ được gom gọn tập trung trong module `src/hooks/useGestures.ts`:
  * **`useSwipeGesture`**: Xây dựng trên nền `PanResponder` chuẩn New Architecture, nhận diện vuốt 4 hướng (Trái, Phải, Lên, Xuống) có ngưỡng cản `threshold` và phản hồi rung.
  * **`useDoubleTap`**: Nhận diện chạm 2 lần liên tiếp (dưới 300ms) để tương tác nhanh.
  * **`useShakeDetection`**: Lắng nghe cảm biến gia tốc lắc điện thoại, kích hoạt phản hồi xúc giác rung mạnh (`haptics.heavy()`), cơ chế Cooldown (mặc định 1000ms) chống lặp và hàm `simulateShake()` cho máy ảo / lập trình viên kiểm thử.
* **`GestureCard` (`src/components/common/GestureCard/`)**:
  * Component khung chứa cử chỉ trực quan chuẩn UI Mobile.

---

## 16. Cầu Nối Widget & In-App Webview (Widget Bridge & Webview)

* **`widgetBridgeService` (`src/services/widget/`)**:
  * `syncWidgetData()`: Đóng gói trạng thái ứng dụng (active count, status, headline) và xuất file `widget_snapshot.json` để Android `AppWidgetProvider` hoặc iOS `WidgetKit` đọc dữ liệu.
* **`AppWebView` (`src/components/common/AppWebView/`)**:
  * Khung sườn hiển thị web tích hợp sẵn thanh địa chỉ bảo mật, nút mở trình duyệt ngoài (`browserHelper.openUrl`) và sẵn sàng đón nhận `react-native-webview` khi kích hoạt native.

---

## 17. Phong Cách Thiết Kế Apple iOS 18 Cupertino & Liquid Glass (Apple Glass Theme)

* **Thiết kế mô-đun, có thể bật/tắt (Toggleable Theme Style)**:
  * Không làm phá vỡ cấu trúc CSS phẳng mặc định của ứng dụng.
  * Được điều khiển tập trung qua `useAppStore`: `themeStyle: 'default' | 'apple-glass'`, `toggleThemeStyle()`.
* **Design Tokens Chuẩn Apple (`src/constants/appleTheme.ts`)**:
  * `AppleColors`: Bảng màu hệ thống Apple (systemBlue, systemPurple, systemTeal, systemMint, systemOrange, glassLight, glassDark...).
  * `AppleGlassTokens`: Độ mờ Frosted Glass (`blurIntensity: 25`), viền phản xạ ánh sáng (Specular Highlight Border `glassBorderLight/Dark`), và độ cong liên tục (`borderRadius: 22` Apple Squircles).
* **Component `GlassCard` (`src/components/common/GlassCard/`)**:
  * Thẻ kính mờ chất lượng cao với viền phản quang và hiệu ứng hào quang góc (Subtle Corner Glow Accent).

---

## 18. Kiến Trúc Kết Nối Thời Gian Thực Đa Nền Tảng (Universal Real-Time)

* **Universal WebSocket Engine (`src/services/realtime/socketService.ts`)**:
  * **Tự động kết nối lại (Auto-reconnect with Exponential Backoff)**: Tự thử lại tối đa 5 lần với thời gian chờ lũy thừa (1s, 2s, 4s, 8s, 10s) khi mất mạng.
  * **Hàng đợi ngoại tuyến (Offline Message Queue)**: Tự động lưu tin nhắn khi mất kết nối và tự động gửi (flush) ngay khi kết nối lại thành công.
  * **Giám sát nhịp tim (Heartbeat Ping/Pong)**: Gửi gói tin ping định kỳ mỗi 30s để duy trì kết nối qua NAT / Firewall của nhà mạng.
  * **Bộ lắng nghe sự kiện có định kiểu (Typed Event Pub/Sub)**: `socketService.on(event, listener)`, `off(event, listener)`, `emit(event, data)`.
  * **Theo dõi trạng thái kết nối**: `socketService.onStateChange((state) => ...)`.
* **Tài liệu tham khảo chuyên sâu**: Chi tiết so sánh WebSocket vs. Server-Sent Events (SSE) vs. WebRTC nằm tại `docs/REALTIME_GUIDE.md`.

---

## 19. Chuẩn Mã Hóa Tương Thích Server Backend (Server Crypto Standard)

* **Định Dạng Payload Chuẩn `AESP256:iv:salt:ciphertext:tag` (`src/utils/crypto.ts`)**:
  * `cryptoHelper.encryptForServer(plainText, secretKey)`: Tạo payload chuẩn gồm IV 16 bytes, Salt 8 bytes ngẫu nhiên, Ciphertext Base64 và Auth Tag 16 ký tự băm kiểm tra tính toàn vẹn.
  * `cryptoHelper.decryptFromServer(payload, secretKey)`: Tự động xác thực Auth Tag trước khi giải mã. Nếu key sai hoặc dữ liệu bị sửa đổi, hàm trả về `null`.
* **Tương thích 100% với Backend**:
  * Sẵn sàng tích hợp ngay với Node.js, Python, Java Spring Boot và Go.
  * Chi tiết mã nguồn mẫu trên các ngôn ngữ backend nằm tại `docs/SERVER_ENCRYPTION_GUIDE.md`.

---

## 20. Nguyên Tắc Thiết Kế Giao Diện (Zero Inline Styles)

* **CẤM tuyệt đối viết Inline Styles** trong file JSX/TSX. Lỗi này bị kiểm soát nghiêm ngặt bởi ESLint rule `react-native/no-inline-styles`.
* Mỗi màn hình và mỗi component phải có file `styles.ts` riêng biệt và tạo qua `StyleSheet.create()`.
* Luôn sử dụng Design Tokens từ `@/constants`:
  * `Colors.light` / `Colors.dark`
  * `AppleColors` / `AppleGlassTokens`
  * `Spacing` (xxs: 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, huge: 64)
  * `BorderRadius` (none: 0, sm: 4, md: 8, lg: 12, xl: 16, xxl: 24, full: 999, pill: 9999)
  * `Typography` (header, title, subtitle, body, caption, overline)
  * `Shadows` (sm, md, lg)

---

## 21. Nguyên Tắc Đặt Tên (Naming Conventions)

| Đối tượng | Quy tắc | Ví dụ |
| :--- | :--- | :--- |
| **Thư mục Component** | PascalCase | `AppHeader/`, `OptimizedList/`, `GlassCard/` |
| **Component Files** | PascalCase | `AppHeader.tsx`, `OptimizedList.tsx`, `GlassCard.tsx` |
| **Hook Files** | camelCase, tiền tố `use` | `useAppStore.ts`, `useGestures.ts`, `useDebounce.ts` |
| **Service / Util Files** | camelCase | `apiClient.ts`, `socketService.ts`, `crypto.ts` |
| **Styles / Types Files** | camelCase | `styles.ts`, `types.ts`, `constants.ts` |
| **TypeScript Types/Interfaces** | PascalCase | `User`, `ServerEncryptedPayload`, `SocketMessage` |
| **Constants / Enums** | UPPER_SNAKE_CASE hoặc PascalCase | `AppleColors.systemBlue`, `STORAGE_KEYS.AUTH_TOKEN` |

