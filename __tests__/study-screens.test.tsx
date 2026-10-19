import { AppHeader } from '@/components/common/AppHeader';
import { AppBottomNav } from '@/components/common/AppBottomNav';
import { AppleMeshBackground } from '@/components/common/AppleMeshBackground';
import { seedStudyData, parseStudyBackup } from '@/utils/studyData';
import { gradeTotal } from '@/utils/study';
import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import type { RootStackParamList } from '@/navigation/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TestRenderer, { act } from 'react-test-renderer';
import {
  AppButton,
  AppInput,
  AppSearchBar,
  EmptyState,
  AppDateTimeInput,
  AppSelect,
  AppListItem,
  ConfirmDialog,
} from '@/components';
import { ToastProvider } from '@/components/common/AppToast';
import { StudyCourseCard } from '@/components/common/StudyCourseCard';
import { CoursesScreen } from '@/screens/Study/Courses';
import { ProfileScreen } from '@/screens/Study/Profile';
import { AssignmentDetailScreen } from '@/screens/Study/AssignmentDetail';
import { SessionDetailScreen } from '@/screens/Study/SessionDetail';
import { useAppStore } from '@/hooks/useAppStore';
import { ASSIGNMENTS, STUDENT } from '@/data/study';
import { isCompleted } from '@/utils/study';
import type { StudyTabProps, StudyDetailProps } from '@/navigation/types';
import i18n from '@/i18n';

const navigation = { navigate: jest.fn(), goBack: jest.fn() };
const metrics = {
  frame: { x: 0, y: 0, width: 360, height: 800 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
let renderer: TestRenderer.ReactTestRenderer;
async function render(screen: React.ReactElement) {
  await act(async () => {
    renderer = TestRenderer.create(
      <SafeAreaProvider initialMetrics={metrics}>
        <ToastProvider>{screen}</ToastProvider>
      </SafeAreaProvider>,
    );
  });
}
const nodes = (component: unknown) => {
  const target = (component as { type?: unknown }).type ?? component;
  return renderer.root.findAll(
    node => node.type === target || node.type === component,
  );
};
const button = (title: string) =>
  nodes(AppButton).find(node => node.props.title === title)!;

beforeEach(async () => {
  jest.clearAllMocks();
  await i18n.changeLanguage('vi');
  await useAppStore.setState({
    studentProfile: STUDENT,
    studyData: seedStudyData(),
    assignmentCompletion: {},
    studyHydrated: true,
    studyHydrationFailed: false,
    themeStyle: 'default',
  });
});
afterEach(async () => {
  if (renderer)
    await act(async () => {
      renderer.unmount();
    });
});

test('course search updates FlatList and the empty state; opening uses the selected ID', async () => {
  await render(
    <CoursesScreen
      {...({ navigation } as unknown as StudyTabProps<'Courses'>)}
    />,
  );
  expect(nodes(StudyCourseCard)).toHaveLength(5);
  await act(async () =>
    nodes(AppSearchBar)[0].props.onChangeText('co so du lieu'),
  );
  expect(nodes(StudyCourseCard)).toHaveLength(1);
  nodes(StudyCourseCard)[0].props.onPress();
  expect(navigation.navigate).toHaveBeenCalledWith('CourseDetail', {
    courseId: 'database',
  });
  await act(async () => nodes(AppSearchBar)[0].props.onChangeText('not found'));
  expect(nodes(StudyCourseCard)).toHaveLength(0);
  expect(nodes(EmptyState)[0].props.title).toBe('Không tìm thấy môn học');
});

test('assignment details update the shared store and can undo completion', async () => {
  await render(
    <AssignmentDetailScreen
      {...({
        navigation,
        route: { params: { assignmentId: 'mobile-03' } },
      } as unknown as StudyDetailProps<'AssignmentDetail'>)}
    />,
  );
  await act(async () => {
    await button('Đánh dấu hoàn thành').props.onPress();
  });
  expect(
    isCompleted(ASSIGNMENTS[0], useAppStore.getState().assignmentCompletion),
  ).toBe(true);
  await act(async () => {
    await button('Chuyển về chưa hoàn thành').props.onPress();
  });
  expect(
    isCompleted(ASSIGNMENTS[0], useAppStore.getState().assignmentCompletion),
  ).toBe(false);
});

test('profile rejects invalid input, then saves and propagates a valid edit', async () => {
  await render(
    <ProfileScreen
      {...({ navigation } as unknown as StudyTabProps<'Profile'>)}
    />,
  );
  await act(async () => button('Chỉnh sửa thông tin').props.onPress());
  const input = (label: string) =>
    nodes(AppInput).find(node => node.props.label === label)!;
  await act(async () => {
    input('Email').props.onChangeText('bad');
  });
  await act(async () => {
    await button('Lưu thay đổi').props.onPress();
  });
  expect(input('Email').props.error).toBeTruthy();
  expect(useAppStore.getState().studentProfile.email).toBe(STUDENT.email);
  await act(async () => {
    input('Họ và tên').props.onChangeText('Nguyễn Văn An');
    input('Email').props.onChangeText('an@example.com');
  });
  await act(async () => {
    await button('Lưu thay đổi').props.onPress();
  });
  expect(useAppStore.getState().studentProfile.fullName).toBe('Nguyễn Văn An');
  expect(nodes(AppInput)).toHaveLength(0);
});

test('invalid detail IDs and impossible session dates render an empty state safely', async () => {
  await render(
    <SessionDetailScreen
      {...({
        navigation,
        route: { params: { sessionId: 'mobile-mon', date: '2026-02-30' } },
      } as unknown as StudyDetailProps<'SessionDetail'>)}
    />,
  );
  expect(nodes(EmptyState)[0].props.title).toBe('Không tìm thấy dữ liệu');
  await act(async () => {
    renderer.unmount();
  });
  await render(
    <AssignmentDetailScreen
      {...({
        navigation,
        route: { params: { assignmentId: 'unknown' } },
      } as unknown as StudyDetailProps<'AssignmentDetail'>)}
    />,
  );
  expect(nodes(EmptyState)[0].props.title).toBe('Không tìm thấy dữ liệu');
});

test('real Bottom Tabs and Native Stack preserve the selected tab when returning from details', async () => {
  const ref = createNavigationContainerRef<RootStackParamList>();
  await render(
    <NavigationContainer
      ref={ref}
      initialState={{ index: 0, routes: [{ name: 'StudyTabs' }] }}
    >
      <AppNavigator />
    </NavigationContainer>,
  );
  expect(ref.getCurrentRoute()?.name).toBe('Overview');
  for (const name of [
    'Courses',
    'Timetable',
    'Assignments',
    'Profile',
  ] as const) {
    await act(async () => {
      ref.navigate('StudyTabs', { screen: name });
    });
    expect(ref.getCurrentRoute()?.name).toBe(name);
  }
  await act(async () => {
    ref.navigate('GradeDetail', { gradeId: 'grade-algorithms' });
  });
  expect(ref.getCurrentRoute()?.name).toBe('GradeDetail');
  await act(async () => {
    ref.goBack();
  });
  expect(ref.getCurrentRoute()?.name).toBe('Profile');
});

test('personal editors create linked data, reject overlapping classes, and save zero scores correctly', async () => {
  const ref = createNavigationContainerRef<RootStackParamList>();
  await render(
    <NavigationContainer
      ref={ref}
      initialState={{ index: 0, routes: [{ name: 'StudyTabs' }] }}
    >
      <AppNavigator />
    </NavigationContainer>,
  );
  const field = (label: string) =>
    nodes(AppInput).find(
      node =>
        node.props.label === label || node.props.accessibilityLabel === label,
    )!;
  await act(async () => {
    ref.navigate('StudyTabs', { screen: 'Courses' });
    ref.navigate('StudyEditor', { kind: 'course' });
  });
  await act(async () => {
    field('Mã môn học').props.onChangeText('SELF101');
    field('Tên môn học').props.onChangeText('Môn học cá nhân');
  });
  await act(async () => {
    await button('Lưu thay đổi').props.onPress();
  });
  const course = useAppStore
    .getState()
    .studyData.courses.find(item => item.code === 'SELF101')!;
  expect(course).toBeDefined();
  expect(ref.getCurrentRoute()?.name).toBe('Courses');
  await act(async () => {
    ref.navigate('StudyEditor', { kind: 'session', courseId: course.id });
  });
  await act(async () => {
    field('Phòng học').props.onChangeText('P.101');
    nodes(AppSelect)
      .find(node => node.props.label === 'Ngày trong tuần')!
      .props.onSelect(0);
  });
  await act(async () => {
    await button('Lưu thay đổi').props.onPress();
  });
  expect(ref.getCurrentRoute()?.name).toBe('StudyEditor');
  expect(
    useAppStore
      .getState()
      .studyData.sessions.some(item => item.courseId === course.id),
  ).toBe(false);
  await act(async () => {
    nodes(AppDateTimeInput)
      .find(node => node.props.label === 'Giờ bắt đầu')!
      .props.onChange(new Date(2026, 0, 1, 16));
    nodes(AppDateTimeInput)
      .find(node => node.props.label === 'Giờ kết thúc')!
      .props.onChange(new Date(2026, 0, 1, 18));
  });
  await act(async () => {
    await button('Lưu thay đổi').props.onPress();
  });
  expect(
    useAppStore
      .getState()
      .studyData.sessions.some(item => item.courseId === course.id),
  ).toBe(true);
  await act(async () => {
    ref.navigate('StudyEditor', { kind: 'assignment', courseId: course.id });
  });
  await act(async () =>
    field('Tên bài tập').props.onChangeText('Bài tập của tôi'),
  );
  await act(async () => {
    await button('Lưu thay đổi').props.onPress();
  });
  expect(
    useAppStore
      .getState()
      .studyData.assignments.find(item => item.title === 'Bài tập của tôi')
      ?.courseId,
  ).toBe(course.id);
  await act(async () => {
    ref.navigate('StudyEditor', { kind: 'grade', courseId: course.id });
  });
  await act(async () => {
    field('Điểm / 10 1').props.onChangeText('0');
    field('Điểm / 10 2').props.onChangeText('8');
    field('Điểm / 10 3').props.onChangeText('9');
    field('Trọng số (%) 1').props.onChangeText('12,5');
    field('Trọng số (%) 2').props.onChangeText('27.5');
  });
  await act(async () => {
    await button('Lưu thay đổi').props.onPress();
  });
  expect(
    gradeTotal(
      useAppStore
        .getState()
        .studyData.grades.find(item => item.courseId === course.id)!,
    ),
  ).toBe(7.6);
  await act(async () => {
    ref.navigate('StudyEditor', { kind: 'grade', courseId: course.id });
  });
  expect(field('Trọng số (%) 1').props.value).toBe('12.5');
  expect(field('Trọng số (%) 2').props.value).toBe('27.5');
});

test('backup UI validates, previews and confirms restoration while retaining appearance', async () => {
  const ref = createNavigationContainerRef<RootStackParamList>();
  await render(
    <NavigationContainer
      ref={ref}
      initialState={{ index: 0, routes: [{ name: 'StudyTabs' }] }}
    >
      <AppNavigator />
    </NavigationContainer>,
  );
  await act(async () => {
    ref.navigate('StudyDataTools');
  });
  const row = (title: string) =>
    nodes(AppListItem).find(node => node.props.title === title)!;
  await act(async () => row('Tạo bản sao lưu').props.onPress());
  const raw = nodes(AppInput).find(
    node => node.props.label === 'Nội dung bản sao lưu',
  )!.props.value;
  expect(parseStudyBackup(raw).data.courses).toHaveLength(7);
  await act(async () => {
    await useAppStore.getState().resetStudyData('empty');
  });
  await act(async () => row('Khôi phục bản sao lưu').props.onPress());
  await act(async () =>
    nodes(AppInput)
      .find(node => node.props.label === 'Nội dung bản sao lưu')!
      .props.onChangeText(raw),
  );
  await act(async () => button('Kiểm tra & xem trước').props.onPress());
  expect(useAppStore.getState().studyData.courses).toHaveLength(0);
  await act(async () => {
    await nodes(ConfirmDialog)
      .find(
        node =>
          node.props.visible &&
          node.props.title === 'Thay thế dữ liệu hiện tại?',
      )!
      .props.onConfirm();
  });
  expect(useAppStore.getState().studyData.courses).toHaveLength(7);
});

test('study UI reuses the base header, dock and one mesh background and follows shared theme changes', async () => {
  await useAppStore.setState({
    themeStyle: 'apple-glass',
    headerVariant: 'frosted-capsule',
    meshVariant: 'sunset',
    reduceMotion: true,
  });
  const ref = createNavigationContainerRef<RootStackParamList>();
  await render(
    <NavigationContainer
      ref={ref}
      initialState={{ index: 0, routes: [{ name: 'StudyTabs' }] }}
    >
      <AppNavigator />
    </NavigationContainer>,
  );
  expect(nodes(AppleMeshBackground)).toHaveLength(1);
  expect(
    nodes(AppHeader).find(node => node.props.title === 'StudyFlow')!.props
      .variant,
  ).toBe('frosted-capsule');
  expect(nodes(AppBottomNav)[0].props.variant).toBe('frosted-glass');
  await act(async () => {
    useAppStore.getState().setThemeStyle('default');
    useAppStore.getState().setHeaderVariant('standard');
  });
  expect(nodes(AppleMeshBackground)).toHaveLength(0);
  expect(
    nodes(AppHeader).find(node => node.props.title === 'StudyFlow')!.props
      .variant,
  ).toBe('standard');
  expect(nodes(AppBottomNav)[0].props.variant).toBe('standard');
});

test('leaving an unsaved editor requires a decision; discard returns to the previous tab', async () => {
  const ref = createNavigationContainerRef<RootStackParamList>();
  await render(
    <NavigationContainer
      ref={ref}
      initialState={{ index: 0, routes: [{ name: 'StudyTabs' }] }}
    >
      <AppNavigator />
    </NavigationContainer>,
  );
  await act(async () => {
    ref.navigate('StudyEditor', { kind: 'course' });
  });
  await act(async () => {
    nodes(AppInput)
      .find(node => node.props.label === 'Tên môn học')!
      .props.onChangeText('Chưa lưu');
  });
  await act(async () => {
    ref.goBack();
  });
  expect(ref.getCurrentRoute()?.name).toBe('StudyEditor');
  await act(async () => {
    nodes(ConfirmDialog)
      .find(node => node.props.visible)!
      .props.onCancel();
  });
  expect(ref.getCurrentRoute()?.name).toBe('StudyEditor');
  await act(async () => {
    ref.goBack();
  });
  await act(async () => {
    nodes(ConfirmDialog)
      .find(node => node.props.visible)!
      .props.onConfirm();
  });
  expect(ref.getCurrentRoute()?.name).toBe('Overview');
  expect(useAppStore.getState().studyData.courses).toHaveLength(7);
});
