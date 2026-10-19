import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import {
  BookOpen,
  CalendarDays,
  House,
  ListTodo,
  UserRound,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { StudyPage } from '@/components/common/StudyPage';
import { EmptyState } from '@/components/common/EmptyState';
import { OverviewScreen } from '@/screens/Study/Overview';
import { CoursesScreen } from '@/screens/Study/Courses';
import { TimetableScreen } from '@/screens/Study/Timetable';
import { AssignmentsScreen } from '@/screens/Study/Assignments';
import { ProfileScreen } from '@/screens/Study/Profile';
import type { StudyTabParamList } from './types';
import { createTabStyles } from './styles';

const Tabs = createBottomTabNavigator<StudyTabParamList>();
const tabIcons: Record<
  keyof StudyTabParamList,
  BottomTabNavigationOptions['tabBarIcon']
> = {
  Overview: ({ color, size }) => <House color={color} size={size} pointerEvents="none" />,
  Courses: ({ color, size }) => <BookOpen color={color} size={size} pointerEvents="none" />,
  Timetable: ({ color, size }) => <CalendarDays color={color} size={size} pointerEvents="none" />,
  Assignments: ({ color, size }) => <ListTodo color={color} size={size} pointerEvents="none" />,
  Profile: ({ color, size }) => <UserRound color={color} size={size} pointerEvents="none" />,
};
const titles = {
  Overview: 'overview',
  Courses: 'courses',
  Timetable: 'timetable',
  Assignments: 'assignments',
  Profile: 'profile',
} as const;

export function StudyTabs() {
  const { t } = useTranslation();
  const { theme, isDark } = useThemeMode();
  const hydrated = useAppStore(s => s.studyHydrated);
  const hydrationFailed = useAppStore(s => s.studyHydrationFailed);
  const styles = useMemo(() => createTabStyles(isDark), [isDark]);
  if (hydrationFailed)
    return (
      <StudyPage title={t('study.appName')}>
        <EmptyState
          title={t('study.storageError')}
          description={t('study.storageErrorBody')}
          actionText={t('study.retry')}
          onActionPress={() => useAppStore.persist.rehydrate()}
        />
      </StudyPage>
    );
  if (!hydrated)
    return (
      <StudyPage title={t('study.appName')} subtitle={t('study.loading')}>
        <ActivityIndicator color={theme.primary} />
      </StudyPage>
    );
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarHideOnKeyboard: true,
        tabBarLabel: t(`study.${titles[route.name]}`),
        tabBarAccessibilityLabel: t(
          route.name === 'Profile'
            ? 'study.profileTitle'
            : `study.${titles[route.name]}`,
        ),
        tabBarIcon: tabIcons[route.name],
      })}
    >
      <Tabs.Screen name="Overview" component={OverviewScreen} />
      <Tabs.Screen name="Courses" component={CoursesScreen} />
      <Tabs.Screen name="Timetable" component={TimetableScreen} />
      <Tabs.Screen name="Assignments" component={AssignmentsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}
