# StudyFlow — Bài thực hành 3

Ứng dụng quản lý học tập cá nhân trên một thiết bị, dùng offline. Dữ liệu khởi tạo gồm 1 sinh viên, 5 môn đang học + 2 môn đã học, 8 buổi học hằng tuần và 10 bài tập. Có thể thay toàn bộ dữ liệu mẫu bằng dữ liệu cá nhân; không cần tài khoản hoặc máy chủ.

## Chạy ứng dụng

```bash
npm ci
npm start
# Terminal khác, đã bật máy ảo Android:
npm run android:fast
# Với điện thoại Android arm64:
npm run android:device
```

Có thể dùng `pnpm install --frozen-lockfile` thay `npm ci`; hai lockfile được đồng bộ. Build lại native sau khi cài dependency để liên kết bộ chọn ngày/giờ. Bottom Tabs 7.19.0 dùng elements 2.9.43 qua overrides npm/pnpm, giữ native 7.4.1 của base.

## Đối chiếu đề bài

| Yêu cầu | Thực hiện |
| --- | --- |
| Tổng quan | Tên/mã sinh viên; môn đang học, tín chỉ, tiến độ; bài chưa hoàn thành đến hạn trong 7 ngày; bài quá hạn và lịch hôm nay. |
| Môn học | FlatList, mã/tên/tín chỉ; tìm tên có dấu/không dấu hoặc mã; lọc đang học/tất cả; mở chi tiết. |
| Thời khóa biểu | Chuyển tuần, xem cả tuần hoặc chọn ngày; môn/giờ/phòng; mở chi tiết theo ngày đã chọn; chỉnh giới hạn học kỳ. |
| Bài tập | FlatList, môn/hạn/trạng thái; lọc theo môn và trạng thái, sắp xếp theo hạn; cập nhật từ danh sách hoặc chi tiết. |
| Cá nhân và kết quả | Hồ sơ đầy đủ, chỉnh họ tên/email/điện thoại và cả mã sinh viên/lớp/ngành; bảng điểm và chi tiết điểm thành phần. |
| Điều hướng | 5 Bottom Tabs thật kết hợp Native Stack; 4 chi tiết nhận ID; Back giữ tab và bộ lọc. Editor và công cụ dữ liệu cũng dùng Stack. |
| Kỹ thuật | useState cho draft/bộ lọc, useEffect cho đồng bộ hồ sơ/đồng hồ; Zustand + AsyncStorage chung của base; thư mục screens/components/data/types/utils riêng. |
| Dùng cá nhân | Thêm/sửa/xóa môn, lịch, bài tập; sửa/xóa giá trị điểm, tùy chỉnh công thức; chỉnh học kỳ/hồ sơ; workspace trống và sao lưu/khôi phục offline. |
| Giao diện | Component base, ScreenWrapper, styles riêng và design tokens; nền mesh, Theme Studio, sáng/tối, nhãn Việt/Anh, trạng thái rỗng/lỗi dữ liệu. |

## Tận dụng giao diện base

- Thanh dưới dùng chính `AppBottomNav`; `StudyTabBar` chỉ nối route, trạng thái chọn và sự kiện tabPress/tabLongPress của React Navigation. Safe area được tính theo kích thước control; thanh tab ẩn khi bàn phím mở.
- Nội dung phủ toàn màn hình và cuộn phía sau hai thanh nổi. Header được đo chiều cao; thanh tab báo chiều cao theo kích thước/safe area. Khoảng tránh chỉ nằm ở đầu/cuối nội dung cuộn, nên mục đầu và cuối vẫn có thể nằm hoàn toàn ngoài vùng thanh. Tìm kiếm/bộ lọc cuộn cùng danh sách; không chia màn hình thành ba khung trên/giữa/dưới.
- Thanh trên dùng `AppHeader`, nhận cấu hình kiểu header, back/action, căn tiêu đề, kích thước, màu và bo góc từ store base. Nút bảng màu mở `ThemeStudioModal` hiện có.
- `AppNavigator` đặt một `AppleMeshBackground` phía sau toàn bộ luồng. `StudyPage` ghép ScreenWrapper và AppScrollView, không phủ nền đặc lên mesh. Thẻ, biểu mẫu và hộp thoại dùng AppCard/AppInput/AppSelect/AppSwitch/AppDateTimeInput/ConfirmDialog.
- Giữ tùy chọn sáng/tối/hệ thống, Glass/Flat, nền mesh, màu nhấn, bo góc, kích thước control/chữ, header, haptics và giảm chuyển động. Không tạo bộ theme hoặc bộ cài đặt riêng cho nghiệp vụ.
- Component mới dùng chung duy nhất trong đợt này là `AppDateTimeInput`: chọn ngày/giờ native, ghép nút và sheet của base. Hủy không đổi giá trị; đổi ngày giữ giờ, đổi giờ giữ ngày.

## Bắt đầu dùng cá nhân

1. Mở **Cá nhân → Chỉnh sửa**, điền hồ sơ của mình. Email/điện thoại có thể để trống; nếu nhập phải đúng định dạng.
2. Mở **Cá nhân → Dữ liệu & sao lưu**. Nếu muốn giữ dữ liệu cũ, tạo bản sao lưu trước. Chọn **Bắt đầu với dữ liệu trống** và xác nhận; thao tác giữ hồ sơ, học kỳ và giao diện.
3. Chỉnh học kỳ: nhãn, ngày bắt đầu/kết thúc. Chỉ lịch của môn đang học xuất hiện trong khoảng này. Khi đổi học kỳ, nhãn các môn đang học được cập nhật; môn đã học giữ nhãn cũ.
4. Vào **Môn học**, nhấn **+** để thêm môn. Mã không trùng, tín chỉ nguyên từ 1–30. Môn đang học dùng nhãn học kỳ hiện tại; môn lưu trữ cho phép nhập nhãn riêng. Tắt “Đang học” để lưu môn cũ mà vẫn giữ điểm/bài tập/lịch tham khảo.
5. Mở chi tiết môn để thêm lịch hoặc bài tập đã chọn sẵn môn; có thể dùng **+** tại các tab tương ứng. Lịch lặp theo tuần, giờ kết thúc phải sau giờ bắt đầu, không trùng với lịch môn đang học khác. Hai buổi tiếp giáp được phép.
6. Trong **Cá nhân → Kết quả**, mở môn và nhấn sửa để nhập điểm. Thêm/bớt thành phần, đặt tên và trọng số; tổng phải bằng 100%. Có thể dùng phần trăm lẻ, dấu chấm hoặc dấu phẩy. Xóa điểm chỉ xóa giá trị, giữ công thức.
7. Dùng nút sửa trong chi tiết để cập nhật; xóa luôn có xác nhận. Xóa môn sẽ xóa cả lịch/bài tập/điểm của môn đó. Editor hỏi trước khi bỏ bản nháp chưa lưu.

## Sao lưu và khôi phục

**Tạo:** Cá nhân → Dữ liệu & sao lưu → Tạo bản sao lưu → Chia sẻ bản sao lưu. App mở menu chia sẻ native với nội dung JSON; chọn ứng dụng nhận để lưu văn bản. Bản sao lưu chứa hồ sơ, học kỳ, môn, lịch, bài tập với trạng thái hoàn thành hiện tại và toàn bộ công thức/điểm.

**Khôi phục:** mở nội dung JSON đã lưu, sao chép rồi vào Khôi phục bản sao lưu và dán vào ô nội dung. Nhấn Xem trước để kiểm tra tên/ngày tạo/số bản ghi, sau đó xác nhận thay thế toàn bộ dữ liệu học tập. Cấu hình giao diện/ngôn ngữ trên máy được giữ. Nội dung sai định dạng, phiên bản không hỗ trợ, ID/quan hệ sai hoặc lịch xung đột sẽ bị từ chối.

Đây là sao lưu **văn bản JSON qua chia sẻ và dán**, chưa có bộ chọn tệp hoặc đồng bộ đám mây. Bản sao lưu chứa thông tin cá nhân, cần chọn nơi nhận phù hợp. “Nạp dữ liệu mẫu” và “Bắt đầu với dữ liệu trống” cũng cần xác nhận vì thay toàn bộ dữ liệu học tập.

## Quy tắc dữ liệu và lưu trữ

- `src/data/study/` chỉ chứa seed. `studyData`, `studentProfile`, `assignmentCompletion` nằm chung tại khóa `@app/unified_store`. Workspace trống vẫn trống sau khi khởi động lại; store cũ chưa có studyData được bổ sung seed một lần khi đọc.
- Mọi sửa dữ liệu chờ ghi AsyncStorage; các thao tác được xếp hàng. Nếu ghi lỗi, hoàn tác phần học tập và báo lỗi. Nếu đọc hoặc kiểm tra dữ liệu lỗi, chặn sửa và cho thử lại/khôi phục backup, không ghi đè dữ liệu chưa đọc được.
- Điểm hệ 10, mặc định chuyên cần 10%, giữa kỳ 30%, cuối kỳ 60%; có thể đổi theo môn. Chưa nhập khác điểm 0. Chỉ có tổng kết khi đủ các thành phần trọng số dương. Trung bình có trọng số tín chỉ, chỉ tính môn đã có tổng kết; không tự quy đổi GPA hệ 4.
- Hạn nộp lưu bằng timestamp có timezone, hiển thị theo múi giờ máy. Đồng hồ UI cập nhật mỗi phút và khi foreground. Lịch dùng thứ/giờ địa phương. Ngày trên route được kiểm tra theo thứ và học kỳ.
- Seed có ngày cố định 07/09–27/12/2026; hạn bài tập không tự dời khi mở app. Ngoài học kỳ không hiện lịch; quá hạn vẫn được nhận diện đúng. Người dùng có thể chỉnh dữ liệu để tiếp tục dùng sau học kỳ mẫu.
- UI Việt/Anh; nội dung do người dùng nhập giữ nguyên ngôn ngữ. Điểm do cá nhân nhập, không tích hợp bảng điểm/cổng sinh viên của trường.

## Demo và kiểm thử

1. Chuyển đủ 5 tab; tìm `co so du lieu`, mở môn và Back, thử từ khóa không có kết quả.
2. Xem lịch tuần/ngày, mở chi tiết; xem tuần ngoài học kỳ và ngày không có lịch.
3. Lọc bài tập theo môn/trạng thái, cập nhật hoàn thành, kiểm tra Tổng quan đồng bộ. Force-stop/mở lại để xác nhận persistence.
4. Thêm một môn, lịch/bài tập liên quan và điểm 0; thử mã trùng, lịch trùng, trọng số chưa đủ 100%. Sửa rồi lưu, hoặc quay lại và chọn bỏ bản nháp.
5. Mở Theme Studio từ header, đổi sáng/tối, Glass/Flat, mesh, màu/bo góc/header và kiểm tra các tab cùng thay đổi.
6. Tạo backup, thử nội dung sai, khôi phục nội dung hợp lệ sau khi xem trước/xác nhận. Kiểm tra dữ liệu trở lại và giao diện được giữ.

```bash
npm run lint
npx tsc --noEmit
npm test -- --runInBand
```

Bộ test bao gồm nghiệp vụ, persistence/lỗi đọc ghi, React Navigation thật, editor liên kết, bảo vệ bản nháp, backup và việc tái sử dụng UI/mesh của base. Kết quả native/build và giới hạn phát hành: [kiểm chứng](practice-03-verification.md).

## Tách thay đổi base

Nhánh `fix/base-runtime-and-tests` dùng độc lập với bài thực hành:

| Commit trên nhánh base | Thay đổi |
| --- | --- |
| `427e87c` | Sửa Jest transform cho pnpm và test export cũ. |
| `93bc8ae` | Bỏ API LayoutAnimation no-op gây cảnh báo che tab trên New Architecture. |
| `8ae3e5a` | AppDateTimeInput, multiline AppInput, long press/haptics/reduced motion AppBottomNav và kích thước AppHeader. |
| `7342866` | Đồng bộ NavigationContainer với theme hiện có, giữ nền kính trong suốt. |

Có thể checkout/merge nhánh base vào `main` riêng. Các cải tiến tương đương đã có trong nhánh bài tập ở commit `ff21d5f`, `fbb2d62`; phần nghiệp vụ StudyFlow ở commit khác. Không đưa tài liệu EveSense/idea sẵn có vào commit.
