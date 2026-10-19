# Kiểm chứng StudyFlow

Ngày kiểm tra: 19/10/2026. Nhánh: `feat/practice-03-study-management`.

## Cổng chất lượng

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run lint` | Đạt: 0 lỗi, 0 cảnh báo ESLint. |
| `npx tsc --noEmit` | Đạt: 0 lỗi TypeScript. |
| `npm test -- --runInBand` | Đạt: 7 suite, 77 test. |
| Nhánh base độc lập | Cùng ba cổng trên đều đạt; 4 suite, 48 test, không có mã nghiệp vụ StudyFlow. |
| `pnpm peers check` | Không có xung đột peer dependency sau khi thêm datetimepicker. |
| Bundle Android production `--dev false` | Thành công; bundle và 19 assets trong `/tmp/studyflow/`. |
| `./gradlew :app:installDebug -PreactNativeArchitectures=x86_64 --max-workers=2` | BUILD SUCCESSFUL; APK cài được trên máy ảo Android 14. |

Các cảnh báo npm về cấu hình pnpm trong .npmrc không phải lỗi/cảnh báo ESLint. Metro còn cảnh báo fallback đường dẫn feature flags nội bộ của React Native nhưng bundle hoàn tất.

## Nội dung kiểm thử tự động

- React Navigation thật với SafeAreaProvider có metrics; kiểm tra đủ luồng tab/stack, trở về đúng tab, ID/ngày không hợp lệ và trạng thái rỗng.
- Tìm kiếm tiếng Việt, lọc/sắp xếp hạn bài, điểm/tín chỉ/học kỳ, sửa hồ sơ và cập nhật bài tập.
- Tạo môn → lịch (từ chối trùng, cho tiếp giáp) → bài tập → điểm; điểm 0 và trọng số thập phân được giữ khi mở lại editor; bỏ bản nháp phải xác nhận.
- Unique codes/IDs/references, cascade xóa môn, xóa giá trị điểm giữ công thức; trạng thái bài tập cũ không ghi đè chỉnh sửa mới.
- Persistence thực qua mock AsyncStorage rồi rehydrate, migration store cũ, workspace trống, lỗi đọc không ghi đè, lỗi ghi hoàn tác, hàng đợi không hoàn tác nhầm thao tác sau.
- Backup round trip, trạng thái hoàn thành hiệu lực, từ chối phiên bản/ID/quan hệ sai; UI validate/xem trước/xác nhận restore, giữ appearance.
- Base AppDateTimeInput giữ phần ngày/giờ không đổi, multiline input, long press navigation; StudyFlow dùng chính AppHeader/AppBottomNav và duy nhất một AppleMeshBackground theo theme.

## Thao tác Android native

Máy ảo Android 14 x86_64, React Native New Architecture/Hermes; native datetimepicker được liên kết trong APK mới. Đã chạy trực tiếp:

- Sau khi chỉnh bố cục tràn: kiểm tra native hierarchy xác nhận viewport cuộn cả 5 tab phủ [0,0]–[720,1600] trên máy ảo 720×1600, cả chi tiết môn và editor cũng phủ toàn màn hình. Header/tab là overlay; header vẫn mở được Theme Studio sau khi cuộn. Môn cuối và các tùy chọn cuối trang Cá nhân có thể cuộn lên hoàn toàn trên dock. Form mở bàn phím, đóng bàn phím và hủy draft vẫn hoạt động; không tạo bản ghi thử trong lần kiểm tra layout này.
- Chuyển đủ 5 tab; mở đủ 4 chi tiết và Back về tab trước; xem lịch cả tuần và buổi học đúng ngày.
- Mở Theme Studio sẵn có, kiểm tra sáng/tối cùng header/dock/mesh. Các lớp nền không che mesh; không còn cảnh báo LayoutAnimation no-op che icon tab.
- Đổi trạng thái bài tập, force-stop/mở lại và kiểm tra vẫn lưu, sau đó hoàn lại trạng thái ban đầu.
- Mở backup từ dữ liệu trên máy, đọc JSON hợp lệ và kiểm tra số bản ghi.
- Tạo môn cá nhân qua form native, thêm bài tập liên quan; mở/hủy bộ chọn ngày Android. Force-stop/mở lại, tìm lại đúng môn đã tạo.
- Xóa môn sau xác nhận, kiểm tra cascade. Xuất backup lần nữa và đối chiếu hồ sơ/môn/lịch/bài tập/điểm/học kỳ với bản trước smoke test: dữ liệu gốc được giữ, bản ghi thử đã xóa.

Ảnh chụp từ máy ảo:

| Giao diện | Minh chứng |
| --- | --- |
| Tổng quan + mesh + dock base | [Sáng](practice-03/screenshots/overview.png), [Tối](practice-03/screenshots/overview-dark.png) |
| Điều hướng và chi tiết | [Môn](practice-03/screenshots/courses.png), [Chi tiết môn](practice-03/screenshots/course-detail.png), [Lịch tuần](practice-03/screenshots/timetable.png), [Buổi học](practice-03/screenshots/session-detail.png) |
| Bài tập và kết quả | [Bài tập](practice-03/screenshots/assignments.png), [Chi tiết bài](practice-03/screenshots/assignment-detail.png), [Cá nhân](practice-03/screenshots/profile.png), [Kết quả](practice-03/screenshots/grade-detail.png) |
| Base và dùng cá nhân | [Theme Studio](practice-03/screenshots/theme-studio.png), [Form thêm môn](practice-03/screenshots/course-editor.png), [Chọn ngày native](practice-03/screenshots/native-date-picker.png), [Sao lưu](practice-03/screenshots/data-tools.png) |

Ảnh bố cục tràn sau khi cuộn: [Tổng quan phía sau header/tab](practice-03/screenshots/overview-scroll.png), [Mục cuối môn học](practice-03/screenshots/courses-end.png), [Tùy chọn cuối Cá nhân](practice-03/screenshots/profile-end.png).

Không gửi bản sao lưu tới ứng dụng bên ngoài trong smoke test. Khôi phục và xác nhận thay thế được kiểm tra tự động với React Navigation thật; chưa kiểm chứng dán một backup lớn qua clipboard native.

## Giới hạn trước phát hành thực tế

- Chưa build/chạy iOS trong môi trường Linux; phần picker iOS cần kiểm tra trên thiết bị/simulator Apple.
- Đã kiểm tra bundle production và APK debug; chưa ký/kiểm tra bản release trên điện thoại vật lý hoặc phát hành store.
- Backup hiện là văn bản JSON share/paste, chưa có file picker hoặc cloud sync. Lịch lặp theo học kỳ, chưa có ngoại lệ nghỉ/bù từng buổi hoặc thông báo hạn nộp.
- Audit npm trên lockfile gốc và sau thay đổi đều có **55** mục: 5 moderate, 49 high, 1 critical; [đối chiếu audit](practice-03/dependency-audit-summary.json). Đây là vấn đề sẵn có của dependency/toolchain, cần đánh giá riêng trước phát hành; nhiều package thuộc công cụ phát triển, mục critical hiện ở dependency gián tiếp shell-quote. Tổng số cảnh báo không tự thể hiện khả năng khai thác trong app.
- Toolchain Android còn cảnh báo deprecation Gradle/AGP và phiên bản KSP AsyncStorage so với Kotlin. Build hiện tại vẫn thành công.
- Đây là dữ liệu do cá nhân quản lý, seed chỉ để demo bài; không phải bảng điểm chính thức hoặc tích hợp hệ thống trường.

Các kết quả trên xác nhận phạm vi chức năng, kiểm thử tự động và Android đã kiểm tra; chưa xác nhận sẵn sàng phát hành production trên cả hai nền tảng.
