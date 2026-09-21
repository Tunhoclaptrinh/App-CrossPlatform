# Quy Tắc Bảo Trì & Cập Nhật Mã Nguồn (Maintenance & Refactor Rules)

Bất kỳ AI Agent hay nhà phát triển nào khi làm việc, sửa đổi, cập nhật hoặc tái cấu trúc (refactor) mã nguồn trong dự án này **BẮT BUỘC** phải tuân thủ các quy tắc sau:

---

## 1. Quy Tắc Đồng Bộ Tài Liệu (Bắt Buộc)

Mỗi khi:
- Thêm mới, chỉnh sửa, hoặc tái cấu trúc component, hook, service, hoặc state.
- Bổ sung hoặc thay đổi thư viện trong `package.json`.
- Điều chỉnh luồng điều hướng (Navigation) hoặc cấu hình môi trường (`config.ts`).

👉 **BẮT BUỘC PHẢI CẬP NHẬT 3 NƠI SAU:**
1. **Agent Skill:** `.agents/skills/react-native-base/SKILL.md` (để các Agent tiếp theo luôn nắm bắt đúng hiện trạng).
2. **Quy chuẩn Lập trình:** `docs/CONVENTIONS.md` (nếu có quy chuẩn mới hoặc thay đổi cách thức code).
3. **Hướng dẫn Dự án:** `README.md` (cập nhật danh mục tính năng và cây thư mục).

---

## 2. Quy Tắc Quản Lý State Tập Trung (Unified State)

- **Toàn bộ State dùng chung giữa các màn hình** (Theme, Ngôn ngữ, Thông tin User đăng nhập, Bộ đếm...) **BẮT BUỘC phải nằm trong `useAppStore` (`src/hooks/useAppStore.ts`)**.
- Không tạo các file lưu trữ phân tán hoặc quản lý state cục bộ rời rạc cho dữ liệu toàn cục.
- State trong `useAppStore` phải được cấu hình lưu bền vững (`persist` middleware với `AsyncStorage`).
- Khi thay đổi ngôn ngữ qua `useAppStore.setLanguage(lang)`, hàm này phải tự động gọi `changeLanguage()` của `i18n` để đồng bộ toàn bộ app.

---

## 3. Quy Chuẩn Code & Giao Diện (Zero Inline Styles)

- **Tuyệt đối không viết inline styles** trong JSX (ví dụ: `style={{ padding: 16 }}`). Phải luôn tách ra file `styles.ts` đi kèm component.
- **Sử dụng Design System Tokens** từ `@/constants` (`Colors`, `Spacing`, `BorderRadius`, `Typography`, `Shadows`). Không tự ý hardcode các giá trị màu sắc hay khoảng cách ngẫu nhiên.
- Mọi màn hình mới phải được bọc trong `<ScreenWrapper>` để đảm bảo SafeArea, Dark Mode và tự động ẩn bàn phím.

---

## 4. Cổng Kiểm Định Chất Lượng (Pre-flight Checklist)

Trước khi kết thúc bất kỳ lượt xử lý nào, **BẮT BUỘC** phải chạy bộ 3 lệnh kiểm tra và đảm bảo không có bất kỳ lỗi nào:

```bash
npm run lint         # ESLint: Bắt buộc đạt 0 errors, 0 warnings
npx tsc --noEmit     # TypeScript: Bắt buộc đạt 0 errors (clean type check)
npm test             # Jest: Bắt buộc toàn bộ test suites phải PASS 100%
```