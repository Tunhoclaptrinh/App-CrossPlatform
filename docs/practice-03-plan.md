# Phạm vi và kế hoạch bài thực hành 3

- Giảng viên: Trần Quang Đại. Giao bài: 19/10/2026, 12:22.
- Nhánh triển khai: `feat/practice-03-study-management`.
- Phạm vi đã thống nhất bổ sung: dùng cá nhân trên **một thiết bị, offline và sao lưu dữ liệu**, tận dụng tối đa base, giữ nền mesh và các tùy chọn giao diện.
- Trạng thái: đã triển khai; [hướng dẫn](practice-03-guide.md) và [kiểm chứng](practice-03-verification.md).

## Kiến trúc

```text
Root Native Stack + nền AppleMeshBackground dùng chung
├── Splash → StudyTabs (Bottom Tab Navigator thật)
│   ├── Overview
│   ├── Courses
│   ├── Timetable
│   ├── Assignments
│   └── Profile / Results
├── CourseDetail(courseId)
├── SessionDetail(sessionId, date?)
├── AssignmentDetail(assignmentId)
├── GradeDetail(gradeId)
├── StudyEditor(kind, id?, courseId?)
└── StudyDataTools
```

Thanh tab qua adapter AppBottomNav; header qua AppHeader; ScreenWrapper/AppScrollView và component base ghép thành các màn hình nghiệp vụ. Giữ ThemeStudioModal và cấu hình hiện có. Một store useAppStore, một cơ chế persistence AsyncStorage; không cô lập tính năng bằng hệ UI/theme/storage mới.

## Các phần triển khai

| Phần | Nội dung nghiệm thu |
| --- | --- |
| Đề bài | 5 tab, 4 chi tiết, FlatList/tìm kiếm/lọc, dữ liệu nhất quán, sửa hồ sơ và trạng thái bài tập, useState/useEffect. |
| Tái sử dụng base | Header/tab/card/form/dialog/scroll/theme thực sự dùng component có sẵn; mesh xuyên suốt, styles và design tokens theo quy chuẩn. |
| Dùng cá nhân | CRUD môn/lịch/bài tập, công thức/điểm tùy chỉnh, hồ sơ đầy đủ và học kỳ chỉnh được, workspace mẫu/trống. |
| Nghiệp vụ | Không trùng mã hoặc lịch đang học; ràng buộc ngày/giờ/điểm/trọng số/quan hệ; xóa có xác nhận và cascade; bảo vệ bản nháp. |
| Lưu trữ | Hydrate dữ liệu cũ, xếp hàng ghi, hoàn tác khi lỗi, bảo vệ dữ liệu lỗi đọc, lưu qua lần mở lại. |
| Sao lưu | JSON có version; chia sẻ văn bản native; dán nội dung để validate/xem trước/xác nhận restore, giữ appearance trên máy. |
| Base độc lập | Sửa lỗi và bổ sung khả năng dùng chung trong các commit riêng; nhánh fix/base-runtime-and-tests không chứa nghiệp vụ StudyFlow. |
| Bàn giao | Lint 0 lỗi/cảnh báo, TypeScript 0 lỗi, toàn bộ test; build/bundle Android và thao tác native; đồng bộ skill/conventions/README. |

## Ranh giới hiện tại

Lịch là lịch lặp của môn đang học trong một học kỳ có thể chỉnh, môn cũ lưu làm tham khảo. Điểm hệ 10 do cá nhân quản lý, không suy ra GPA trường. Backup là văn bản share/paste; chưa có chọn tệp, cloud sync, thông báo hạn nộp hay kết nối cổng sinh viên. Các mục này không phải điều kiện của bài thực hành và lựa chọn offline đã thống nhất.

Tài liệu chưa được Git theo dõi sẵn có (`docs/idea.md`, `docs/eveSense/`) giữ nguyên ngoài phạm vi thay đổi.
