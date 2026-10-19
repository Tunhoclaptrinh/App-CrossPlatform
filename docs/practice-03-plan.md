# Kế hoạch bài thực hành 3 — Ứng dụng quản lý học tập

- Giảng viên: Trần Quang Đại.
- Ngày giao bài: 19/10/2026, 12:22.
- Nhánh: `feat/practice-03-study-management`, tạo từ `main`.
- Trạng thái: đã triển khai; xem `docs/practice-03-guide.md` và `docs/practice-03-verification.md` để đối chiếu kết quả.

## 1. Phạm vi và hướng triển khai

Xây dựng ứng dụng quản lý học tập hoạt động offline, sử dụng dữ liệu mẫu có tính thực tế và liên kết nhất quán. Tận dụng bộ UI, design tokens, theme và AsyncStorage hiện có. Giao diện mặc định bằng tiếng Việt; bổ sung chuỗi giao diện vào hệ thống i18n của dự án.

Dùng React Navigation Bottom Tabs thực sự, kết hợp Native Stack. Dự án hiện có Native Stack nhưng chưa khai báo `@react-navigation/bottom-tabs` trong `package.json`; bổ sung thư viện này khi triển khai, cập nhật lockfile đang dùng.

Không mở rộng sang backend, đăng nhập mới, thông báo đẩy hay CRUD môn học vì chưa thuộc yêu cầu bài tập.

## 2. Điều hướng

```text
Root Native Stack
├── Splash → StudyTabs
│   ├── Overview: Tổng quan
│   ├── Courses: Môn học
│   ├── Timetable: Thời khóa biểu
│   ├── Assignments: Bài tập
│   └── Profile: Cá nhân và kết quả học tập
├── CourseDetail(courseId)
├── SessionDetail(sessionId)
├── AssignmentDetail(assignmentId)
└── GradeDetail(gradeId)
```

Màn hình chi tiết nằm trên Root Stack, có nút quay lại; quay lại giữ nguyên tab và bộ lọc trước đó. Route chỉ truyền ID, dữ liệu được đọc từ nguồn chung để luôn phản ánh thay đổi mới nhất. Cập nhật route types và deep linking tương ứng. Các màn hình demo hiện có được giữ riêng; sau Splash mở luồng học tập.

## 3. Chức năng và tiêu chí nghiệm thu

| Màn hình | Nội dung và thao tác |
| --- | --- |
| Tổng quan | Họ tên, mã sinh viên, các môn đang học, bài tập chưa hoàn thành sắp đến hạn theo thứ tự hạn nộp. Tách bài quá hạn để không nhầm với bài sắp đến hạn. Chạm để mở chi tiết. |
| Môn học | `FlatList` hiển thị mã môn, tên, tín chỉ; tìm tên có dấu/không dấu, không phân biệt hoa thường; có trạng thái không tìm thấy. |
| Thời khóa biểu | Chọn tuần, xem lịch theo ngày; hiển thị tên môn, ngày giờ, phòng; mở chi tiết buổi học; thông báo khi ngày/tuần không có lịch. |
| Bài tập | `FlatList` gồm tên bài, môn, hạn nộp; lọc tất cả/chưa hoàn thành/đã hoàn thành; sắp xếp theo hạn. Cho phép đổi trạng thái ở danh sách và chi tiết, đồng bộ với Tổng quan. |
| Cá nhân và kết quả học tập | Mã sinh viên, họ tên, lớp, ngành, email, điện thoại. Chỉnh sửa họ tên/email/điện thoại, kiểm tra hợp lệ, lưu/hủy. Hiển thị bảng điểm và mở chi tiết từng kết quả. |
| Chi tiết môn học | Mã, tên, tín chỉ, giảng viên và các buổi học/bài tập liên quan. |
| Chi tiết buổi học | Môn học, ngày, giờ bắt đầu/kết thúc, phòng và giảng viên. |
| Chi tiết bài tập | Tên bài, môn, mô tả, hạn nộp, trạng thái và nút cập nhật. |
| Chi tiết kết quả | Môn, tín chỉ, điểm thành phần, trọng số, điểm tổng kết và trạng thái có/chưa có kết quả. |

Quy tắc tính điểm mẫu được ghi rõ trong dữ liệu và giao diện: tổng kết hệ 10 theo trọng số thành phần; điểm trung bình theo tín chỉ chỉ tính môn đã có kết quả. Không tự quy đổi sang GPA hệ 4 khi chưa có quy định của trường.

## 4. Dữ liệu, state và tổ chức mã

- `src/types/study.ts`: `StudentProfile`, `Course`, `ClassSession`, `Assignment`, `CourseGrade`.
- `src/data/study/`: bộ dữ liệu mẫu gồm 1 sinh viên, khoảng 6 môn, lịch nhiều tuần, khoảng 10 bài tập với các hạn/trạng thái khác nhau và kết quả của các môn đã hoàn tất.
- Dùng ID ổn định; buổi học, bài tập và kết quả tham chiếu `courseId`. Lưu hạn nộp bằng ngày giờ có múi giờ; hiển thị theo định dạng Việt Nam.
- Mở rộng `src/hooks/useAppStore.ts` cho hồ sơ và trạng thái bài tập dùng chung; lưu bằng middleware persist + AsyncStorage hiện có. Không tạo store hoặc cơ chế lưu trữ song song. Dữ liệu danh mục chỉ đọc nằm trong module dữ liệu chung.
- `useState` quản lý tìm kiếm, bộ lọc, tuần được chọn và bản nháp form. `useEffect` đồng bộ bản nháp khi hồ sơ được khôi phục từ storage; tránh ghi đè nội dung đang chỉnh sửa.
- `src/screens/Study/`: các màn hình chính và chi tiết; mỗi màn hình có file component, `styles.ts`, `index.ts`, thêm `types.ts` khi cần.
- Component tái sử dụng như thẻ môn học, thẻ bài tập tuân thủ cấu trúc riêng trong `src/components/common/`.
- Mọi màn hình dùng `ScreenWrapper`; styles dùng `StyleSheet.create()` trong file riêng, design tokens và `useThemeMode()`.

## 5. Thứ tự thực hiện

1. **Ổn định kiểm thử:** sửa cấu hình Jest để xử lý đúng React Native preset dưới pnpm; chạy lại bộ kiểm tra nền trước khi thêm tính năng.
2. **Dữ liệu và lưu trữ:** định nghĩa types, seed dữ liệu liên kết, bổ sung store/actions và kiểm tra khôi phục dữ liệu khi mở lại app.
3. **Điều hướng:** bổ sung Bottom Tabs, khai báo 5 tab + 4 route chi tiết có kiểu dữ liệu, kết nối Splash và deep linking.
4. **Luồng đọc dữ liệu:** triển khai Tổng quan, Môn học, Thời khóa biểu và các chi tiết liên quan.
5. **Luồng cập nhật:** triển khai Bài tập, hồ sơ có validation, bảng điểm/chi tiết; kiểm tra đồng bộ giữa các màn hình và lưu bền vững.
6. **Hoàn thiện và bàn giao:** trạng thái rỗng, ID không tồn tại, theme, bàn phím, màn hình nhỏ, kiểm thử và tài liệu.

## 6. Kiểm chứng và tài liệu

- Test có ý nghĩa cho lọc/tìm kiếm, thứ tự hạn nộp, tính điểm và cập nhật/khôi phục state dùng chung.
- Kiểm tra thủ công trên Android: đủ 5 tab, cả 4 màn hình chi tiết, nút Back, đổi trạng thái bài tập, sửa/hủy hồ sơ, tìm kiếm không có kết quả, lịch trống và đóng/mở lại app.
- Đồng bộ `.agents/skills/react-native-base/SKILL.md`, `docs/CONVENTIONS.md`, `README.md` khi cập nhật mã nguồn; README bổ sung cách chạy và kịch bản demo đối chiếu đề bài.
- Cổng bàn giao: `npm run lint` đạt 0 lỗi/0 cảnh báo ESLint; `npx tsc --noEmit` đạt 0 lỗi; `npm test` đạt toàn bộ.

Kiểm tra nền ngày 19/10/2026: ESLint và TypeScript đã đạt. `npm test -- --runInBand` chưa chạy được cả 3 suite vì `Cannot use import statement outside a module` tại `@react-native/jest-preset/jest/setup.js` dưới `node_modules/.pnpm/`. Cần kiểm tra lại cấu hình transform cho đường dẫn pnpm ở bước 1; hiện chưa sửa cấu hình.

Các tài liệu chưa được Git theo dõi sẵn có (`docs/idea.md`, `docs/eveSense/`) được giữ nguyên và không thuộc phạm vi bài thực hành này.
