# Kiểm chứng StudyFlow

Ngày kiểm tra: 19/10/2026. Nhánh triển khai: `feat/practice-03-study-management`.

## Cổng chất lượng

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run lint` | Đạt: 0 lỗi, 0 cảnh báo ESLint. |
| `npx tsc --noEmit` | Đạt: 0 lỗi TypeScript. |
| `npm test -- --runInBand` | Đạt: 5 suite, 62 test. |
| `pnpm peers check` | Không có xung đột peer dependency. |
| Bundle Android production (`--dev false`) | Thành công, bundle và 19 assets được tạo trong `/tmp/studyflow/`. |
| `./gradlew :app:assembleDebug -PreactNativeArchitectures=x86_64 --max-workers=2` | `BUILD SUCCESSFUL`, APK tại `android/app/build/outputs/apk/debug/app-debug.apk`. |

Test điều hướng dùng React Navigation thật với `SafeAreaProvider` có metrics; không chỉ kiểm tra app render ra một cây provider trống. Test persistence đọc lại dữ liệu đã ghi qua AsyncStorage rồi rehydrate store; test lỗi ghi xác nhận hoàn tác bộ nhớ và test lỗi đọc xác nhận dữ liệu cũ không bị ghi đè.

## Kiểm tra trên Android

Máy ảo Android đang kết nối, New Architecture/Hermes; APK debug mới đã cài thành công. Kịch bản thao tác trực tiếp đã đạt:

- Chuyển đủ 5 tab, mở đủ 4 màn hình chi tiết và dùng Back trở về đúng tab.
- Xem lịch cả tuần và mở chi tiết buổi học đúng ngày đã chọn.
- Kiểm tra giao diện tối, dùng màu chữ đối lập trên vùng màu nhấn để giữ tương phản.
- Đánh dấu bài “Chia mạng con IPv4” hoàn thành, force-stop/mở lại app, tìm lại bài trong bộ lọc đã hoàn thành; chuyển ngược trạng thái để khôi phục dữ liệu mẫu.
- Bản build không còn cảnh báo no-op LayoutAnimation che vùng icon tab; icon được đặt `pointerEvents="none"` để nhận thao tác ở nút tab.

Ảnh từ máy ảo: [Tổng quan](practice-03/screenshots/overview.png), [Giao diện tối](practice-03/screenshots/overview-dark.png), [Môn học](practice-03/screenshots/courses.png), [Lịch tuần](practice-03/screenshots/timetable.png), [Bài tập](practice-03/screenshots/assignments.png), [Cá nhân](practice-03/screenshots/profile.png), [Chi tiết kết quả](practice-03/screenshots/grade-detail.png).

## Những việc còn lại trước phát hành thực tế

- Chưa kiểm chứng build/chạy iOS trong môi trường Linux này.
- Đã kiểm tra bundle production và APK debug; chưa ký/kiểm tra bản release trên thiết bị vật lý hoặc phát hành lên store.
- Audit npm trên cả lockfile gốc và lockfile sau thay đổi đều báo **55** mục: 5 moderate, 49 high, 1 critical. Số lượng và nhóm package có cảnh báo không tăng do Bottom Tabs; [tóm tắt audit đối chiếu](practice-03/dependency-audit-summary.json). Đây là các vấn đề sẵn có của dependency/toolchain, cần đánh giá và khắc phục trong đợt hardening codebase riêng trước phát hành. Không thể suy ra mức độ khai thác thực tế chỉ từ tổng số cảnh báo; nhiều package nằm trong chuỗi công cụ phát triển. Mục critical hiện được báo ở dependency gián tiếp `shell-quote`.
- Build Android thành công nhưng toolchain còn cảnh báo deprecation Gradle/AGP và phiên bản KSP của AsyncStorage so với Kotlin. Các cảnh báo này không phải lỗi ESLint/TypeScript và không cản build hiện tại.
- Ứng dụng dùng dữ liệu mẫu offline theo yêu cầu bài thực hành, chưa kết nối hệ thống trường. Không coi điểm mẫu là bảng điểm chính thức.

Mức hoàn thiện được xác nhận ở đây là chức năng bài thực hành, kiểm thử tự động và build Android; chưa tuyên bố sẵn sàng phát hành production.
