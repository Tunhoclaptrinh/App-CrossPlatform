import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import type { RootStackParamList } from '@/navigation/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TestRenderer, { act } from 'react-test-renderer';
import { AppButton, AppInput, AppSearchBar, EmptyState } from '@/components';
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
  await render(<NavigationContainer ref={ref} initialState={{index:0,routes:[{name:'StudyTabs'}]}}><AppNavigator /></NavigationContainer>);
  expect(ref.getCurrentRoute()?.name).toBe('Overview');
  for (const name of ['Courses','Timetable','Assignments','Profile'] as const) {
    await act(async () => {ref.navigate('StudyTabs',{screen:name});});
    expect(ref.getCurrentRoute()?.name).toBe(name);
  }
  await act(async () => {ref.navigate('GradeDetail',{gradeId:'grade-algorithms'});});
  expect(ref.getCurrentRoute()?.name).toBe('GradeDetail');
  await act(async () => {ref.goBack();});
  expect(ref.getCurrentRoute()?.name).toBe('Profile');
});
