import type {
  Assignment,
  ClassSession,
  Course,
  CourseGrade,
  StudentProfile,
} from '@/types/study';

export const STUDY_TERM = {
  label: 'HK1 · 2026–2027',
  startsOn: '2026-09-07',
  endsOn: '2026-12-27',
} as const;

export const STUDENT: StudentProfile = {
  studentId: '22110432',
  fullName: 'Nguyễn Minh Tuấn',
  className: 'D22CQCN04',
  major: 'Công nghệ thông tin',
  email: 'tuan.nm22110432@student.edu.vn',
  phone: '0912345678',
};

export const COURSES: Course[] = [
  {
    id: 'mobile',
    code: 'INT3120',
    name: 'Phát triển ứng dụng đa nền tảng',
    credits: 3,
    lecturer: 'Trần Quang Đại',
    semester: STUDY_TERM.label,
    active: true,
    description:
      'Xây dựng ứng dụng React Native với TypeScript, điều hướng, quản lý trạng thái và lưu trữ trên thiết bị.',
  },
  {
    id: 'database',
    code: 'INT2211',
    name: 'Cơ sở dữ liệu',
    credits: 3,
    lecturer: 'Nguyễn Thị Lan',
    semester: STUDY_TERM.label,
    active: true,
    description:
      'Mô hình quan hệ, chuẩn hóa dữ liệu, ngôn ngữ SQL và thiết kế cơ sở dữ liệu cho ứng dụng.',
  },
  {
    id: 'software',
    code: 'INT2208',
    name: 'Công nghệ phần mềm',
    credits: 3,
    lecturer: 'Lê Hoàng Nam',
    semester: STUDY_TERM.label,
    active: true,
    description:
      'Phân tích yêu cầu, thiết kế, kiểm thử và quy trình phát triển phần mềm theo nhóm.',
  },
  {
    id: 'network',
    code: 'INT2209',
    name: 'Mạng máy tính',
    credits: 3,
    lecturer: 'Phạm Đức Anh',
    semester: STUDY_TERM.label,
    active: true,
    description:
      'Kiến trúc TCP/IP, định tuyến, dịch vụ mạng và thực hành cấu hình mạng cục bộ.',
  },
  {
    id: 'english',
    code: 'ENG2003',
    name: 'Tiếng Anh chuyên ngành',
    credits: 2,
    lecturer: 'Vũ Thu Hà',
    semester: STUDY_TERM.label,
    active: true,
    description:
      'Đọc tài liệu kỹ thuật, viết báo cáo và thuyết trình bằng tiếng Anh trong lĩnh vực công nghệ thông tin.',
  },
  {
    id: 'algorithms',
    code: 'INT2203',
    name: 'Cấu trúc dữ liệu và giải thuật',
    credits: 4,
    lecturer: 'Đỗ Minh Hiếu',
    semester: 'HK2 · 2025–2026',
    active: false,
    description: 'Danh sách, cây, đồ thị và các thuật toán tìm kiếm, sắp xếp.',
  },
  {
    id: 'oop',
    code: 'INT2204',
    name: 'Lập trình hướng đối tượng',
    credits: 3,
    lecturer: 'Trần Mai Linh',
    semester: 'HK2 · 2025–2026',
    active: false,
    description:
      'Đóng gói, kế thừa, đa hình và áp dụng nguyên lý thiết kế hướng đối tượng.',
  },
];

export const SESSIONS: ClassSession[] = [
  {
    id: 'mobile-mon',
    courseId: 'mobile',
    weekday: 0,
    startTime: '07:30',
    endTime: '10:00',
    room: 'A2.301',
    kind: 'practice',
  },
  {
    id: 'database-mon',
    courseId: 'database',
    weekday: 0,
    startTime: '13:00',
    endTime: '15:30',
    room: 'A1.204',
    kind: 'lecture',
  },
  {
    id: 'software-tue',
    courseId: 'software',
    weekday: 1,
    startTime: '09:30',
    endTime: '12:00',
    room: 'A2.402',
    kind: 'lecture',
  },
  {
    id: 'network-wed',
    courseId: 'network',
    weekday: 2,
    startTime: '07:30',
    endTime: '10:00',
    room: 'B1.201',
    kind: 'lecture',
  },
  {
    id: 'english-thu',
    courseId: 'english',
    weekday: 3,
    startTime: '09:30',
    endTime: '11:10',
    room: 'A1.305',
    kind: 'lecture',
  },
  {
    id: 'database-thu',
    courseId: 'database',
    weekday: 3,
    startTime: '13:00',
    endTime: '15:30',
    room: 'LAB.02',
    kind: 'practice',
  },
  {
    id: 'mobile-fri',
    courseId: 'mobile',
    weekday: 4,
    startTime: '13:00',
    endTime: '15:30',
    room: 'A2.301',
    kind: 'lecture',
  },
  {
    id: 'network-sat',
    courseId: 'network',
    weekday: 5,
    startTime: '07:30',
    endTime: '10:00',
    room: 'LAB.04',
    kind: 'practice',
  },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'mobile-03',
    courseId: 'mobile',
    title: 'Bài thực hành 3: Quản lý học tập',
    dueAt: '2026-10-25T23:59:00+07:00',
    completed: false,
    description:
      'Xây dựng 5 tab Tổng quan, Môn học, Thời khóa biểu, Bài tập, Cá nhân và kết quả học tập. Kết hợp Bottom Tabs và Native Stack, có tìm kiếm, cập nhật trạng thái và lưu dữ liệu cục bộ. Nộp mã nguồn và video demo.',
  },
  {
    id: 'db-er',
    courseId: 'database',
    title: 'Thiết kế mô hình ER quản lý thư viện',
    dueAt: '2026-10-20T23:59:00+07:00',
    completed: false,
    description:
      'Xác định thực thể, thuộc tính, khóa và quan hệ. Vẽ sơ đồ ER, chuyển sang mô hình quan hệ và giải thích các ràng buộc toàn vẹn. Nộp báo cáo PDF.',
  },
  {
    id: 'se-srs',
    courseId: 'software',
    title: 'Đặc tả yêu cầu phần mềm (SRS)',
    dueAt: '2026-10-22T17:00:00+07:00',
    completed: false,
    description:
      'Hoàn thiện đặc tả yêu cầu cho đề tài nhóm, gồm use case, yêu cầu chức năng và phi chức năng. Đính kèm sơ đồ và phân công công việc.',
  },
  {
    id: 'net-subnet',
    courseId: 'network',
    title: 'Bài tập chia mạng con IPv4',
    dueAt: '2026-10-18T23:59:00+07:00',
    completed: false,
    description:
      'Chia dải 192.168.10.0/24 theo VLSM cho 4 phòng ban. Xác định network, broadcast và dải địa chỉ khả dụng của từng mạng con.',
  },
  {
    id: 'en-talk',
    courseId: 'english',
    title: 'Thuyết trình: My technology project',
    dueAt: '2026-10-23T09:30:00+07:00',
    completed: false,
    description:
      'Chuẩn bị 6–8 slide tiếng Anh giới thiệu một dự án công nghệ. Mỗi thành viên trình bày ít nhất 2 phút; ghi nguồn tài liệu ở slide cuối.',
  },
  {
    id: 'db-sql',
    courseId: 'database',
    title: 'Thực hành truy vấn SQL',
    dueAt: '2026-10-29T23:59:00+07:00',
    completed: false,
    description:
      'Viết 15 truy vấn SELECT, JOIN, GROUP BY và truy vấn con trên dữ liệu thư viện. Nộp file SQL kèm kết quả thực thi.',
  },
  {
    id: 'mobile-02',
    courseId: 'mobile',
    title: 'Bài thực hành 2: Component và State',
    dueAt: '2026-10-16T23:59:00+07:00',
    completed: true,
    description:
      'Tạo các component tái sử dụng; quản lý form và danh sách bằng React hooks.',
  },
  {
    id: 'se-usecase',
    courseId: 'software',
    title: 'Phân tích use case',
    dueAt: '2026-10-15T17:00:00+07:00',
    completed: true,
    description:
      'Xây dựng sơ đồ use case và đặc tả ba luồng nghiệp vụ chính cho đề tài nhóm.',
  },
  {
    id: 'net-lab',
    courseId: 'network',
    title: 'Cấu hình LAN cơ bản',
    dueAt: '2026-10-17T12:00:00+07:00',
    completed: true,
    description:
      'Thiết lập mạng LAN trên Packet Tracer và kiểm tra kết nối giữa các máy bằng ping.',
  },
  {
    id: 'mobile-mid',
    courseId: 'mobile',
    title: 'Báo cáo tiến độ ứng dụng',
    dueAt: '2026-11-02T17:00:00+07:00',
    completed: false,
    description:
      'Báo cáo kiến trúc, các chức năng hoàn thành, kết quả kiểm thử và kế hoạch hoàn thiện ứng dụng.',
  },
];

export const GRADES: CourseGrade[] = COURSES.map(course => ({
  id: `grade-${course.id}`,
  courseId: course.id,
  components: [
    { name: 'attendance', weight: 0.1, score: course.active ? 9 : 10 },
    {
      name: 'midterm',
      weight: 0.3,
      score: course.active ? null : course.id === 'algorithms' ? 8 : 9,
    },
    {
      name: 'final',
      weight: 0.6,
      score: course.active ? null : course.id === 'algorithms' ? 8.5 : 8,
    },
  ],
}));

export const findCourse = (id: string) =>
  COURSES.find(course => course.id === id);
