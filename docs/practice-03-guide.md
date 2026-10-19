# StudyFlow — Bài thực hành 3

Ứng dụng quản lý học tập offline, xây dựng trên Universal React Native Base. Dữ liệu mẫu gồm 1 sinh viên, 5 môn đang học + 2 môn đã học, 8 buổi học lặp theo tuần và 10 bài tập. Lịch và hạn nộp thuộc học kỳ 1 năm 2026–2027; không tự dời hạn mỗi lần mở ứng dụng.

## Chạy ứng dụng

```bash
npm ci
npm start
# Terminal khác, đã bật máy ảo Android:
npm run android:fast
```

Có thể dùng `pnpm install --frozen-lockfile` thay cho `npm ci`. Cả hai lockfile đã được đồng bộ. Bottom Tabs ghim ở `7.19.0`, dùng `@react-navigation/elements` `2.9.43` để tương thích `@react-navigation/native` `7.4.1` hiện có. Ràng buộc này được ghi trong `package.json` và `pnpm-workspace.yaml`; không nâng cấp các thư viện nền khác.

## Đối chiếu đề bài

| Yêu cầu | Thực hiện |
| --- | --- |
| Trang chủ | Tên, mã sinh viên; môn đang học; bài chưa hoàn thành sắp đến hạn trong 7 ngày; bài quá hạn và lịch hôm nay. |
| Môn học | `FlatList`, mã môn/tên/tín chỉ, tìm tên có dấu/không dấu hoặc mã, lọc môn đang học/tất cả, chi tiết môn. |
| Thời khóa biểu | Chuyển tuần; xem cả tuần hoặc chọn ngày; giờ học/phòng/môn; chi tiết buổi học theo ngày đã chọn. |
| Bài tập | `FlatList`, lọc trạng thái và môn; hạn nộp, quá hạn, nội dung; đổi trạng thái từ danh sách hoặc chi tiết. Mặc định xem bài chưa hoàn thành. |
| Cá nhân và kết quả | Hồ sơ sinh viên; sửa họ tên/email/điện thoại, validation và hủy bản nháp; bảng điểm, điểm trung bình và chi tiết điểm thành phần. |
| Điều hướng | 5 Bottom Tabs thật; 4 màn hình chi tiết trên Native Stack. Back giữ nguyên tab/bộ lọc. Route chỉ truyền ID và ngày học khi cần. |
| State và lưu trữ | `useState` cho form/bộ lọc, `useEffect` đồng bộ hồ sơ và làm mới thời gian; state dùng chung trong `useAppStore`, persist bằng AsyncStorage. |
| Giao diện | Dùng UI sẵn có, `ScreenWrapper`, design tokens, styles riêng, sáng/tối, tiếng Việt/Anh, trạng thái rỗng và ID không hợp lệ. |

## Dữ liệu và cách tính

- Dữ liệu gốc: `src/data/study/index.ts`; model: `src/types/study.ts`.
- Hồ sơ và các trạng thái bài tập ghi đè được lưu trong khóa store sẵn có `@app/unified_store`. Không dùng store học tập riêng.
- Store cũ chưa có dữ liệu học tập được bổ sung mặc định khi hydrate. Chỉ họ tên/email/điện thoại được phép chỉnh sửa; mã sinh viên/lớp/ngành giữ theo dữ liệu mẫu.
- Nếu đọc storage lỗi, giao diện cho phép thử lại trước khi chỉnh sửa, giữ nguyên dữ liệu chưa đọc được. Nếu ghi thất bại, hoàn tác thay đổi trong bộ nhớ và báo lỗi; không báo lưu thành công.
- Lịch lặp theo tuần từ 07/09 đến 27/12/2026. Ngoài kỳ này hiển thị trạng thái không có lịch. Ngày học trên route được kiểm tra theo thứ và giới hạn học kỳ.
- Hạn bài tập có offset `+07:00`; hiển thị theo múi giờ thiết bị. Thời gian hiện tại được cập nhật mỗi phút và khi app trở lại foreground.
- Điểm hệ 10: chuyên cần 10%, giữa kỳ 30%, cuối kỳ 60%. Chỉ có điểm tổng kết khi đủ các thành phần. Trung bình có trọng số tín chỉ, chỉ tính môn đã có tổng kết; không quy đổi GPA hệ 4.
- Tên môn, giảng viên và nội dung bài tập là dữ liệu mẫu tiếng Việt; nhãn giao diện có bản dịch Việt/Anh. Đây không phải bảng điểm chính thức hay tích hợp cổng sinh viên.

## Kịch bản demo

1. Mở Tổng quan, kiểm tra sinh viên, 5 môn/14 tín chỉ và bài sắp đến hạn/quá hạn.
2. Vào Môn học, tìm `co so du lieu`, mở môn kết quả rồi Back; thử từ khóa không tồn tại và xóa bộ lọc.
3. Vào Thời khóa biểu, xem cả tuần, chọn một ngày và mở chi tiết buổi học; chuyển tuần hoặc chọn Chủ nhật để xem trạng thái trống.
4. Vào Bài tập, lọc theo môn/trạng thái, mở chi tiết, đánh dấu hoàn thành rồi quay lại. Kiểm tra tiến độ ở Tổng quan thay đổi; chuyển ngược trạng thái khi cần.
5. Vào Cá nhân, chỉnh email sai để thấy validation, sửa dữ liệu hợp lệ rồi lưu. Thử hủy bản nháp có thay đổi.
6. Mở chi tiết kết quả của môn đã học và môn đang học để xem đủ điểm/chưa đủ điểm. Thử chế độ tối và đổi ngôn ngữ.
7. Đóng hẳn app rồi mở lại, kiểm tra hồ sơ và trạng thái bài tập vẫn được giữ.

## Kiểm thử

```bash
npm run lint
npx tsc --noEmit
npm test -- --runInBand
```

Bộ test bổ sung kiểm tra quan hệ dữ liệu, tìm kiếm tiếng Việt, bộ lọc/thứ tự hạn, điểm và tín chỉ, ngày trong học kỳ, validation, persistence/khôi phục store cũ, hoàn tác khi ghi lỗi, bảo vệ storage không đọc được, các thao tác màn hình và điều hướng thật Bottom Tabs + Native Stack. Kiểm chứng native và giới hạn phát hành được ghi tại `docs/practice-03-verification.md`.

## Tách commit

Các sửa lỗi base nằm riêng trên nhánh `fix/base-runtime-and-tests`: commit `427e87c` sửa Jest/pnpm và export test cũ; commit `93bc8ae` bỏ API bật LayoutAnimation đã thành no-op trên New Architecture. Có thể merge nhánh này hoặc cherry-pick hai commit về `main` độc lập. Commit tính năng StudyFlow được tạo sau đó; không đưa các tài liệu EveSense/idea sẵn có vào commit bài thực hành.
