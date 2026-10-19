import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '@/components/common/AppButton';
import { ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import type { StudyTabParamList, RootStackParamList } from './types';
import { navigationStyles } from './styles';
import { renderStudyTabBar } from './StudyTabBar';

const Tabs = createBottomTabNavigator<StudyTabParamList>();
export function StudyTabs({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'StudyTabs'>) {
  const { t } = useTranslation();
  const { theme } = useThemeMode();
  const hydrated = useAppStore(s => s.studyHydrated);
  const hydrationFailed = useAppStore(s => s.studyHydrationFailed);
  if (hydrationFailed)
    return (
      <StudyPage title={t('study.appName')}>
        <EmptyState
          title={t('study.storageError')}
          description={t('study.storageErrorBody')}
          actionText={t('study.retry')}
          onActionPress={() => useAppStore.persist.rehydrate()}
        />
        <AppButton
          title={t('study.restoreBackup')}
          onPress={() => navigation.navigate('StudyDataTools')}
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
      tabBar={renderStudyTabBar}
      screenOptions={{ headerShown: false, sceneStyle: navigationStyles.scene }}
    >
      <Tabs.Screen name="Overview" component={OverviewScreen} />
      <Tabs.Screen name="Courses" component={CoursesScreen} />
      <Tabs.Screen name="Timetable" component={TimetableScreen} />
      <Tabs.Screen name="Assignments" component={AssignmentsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}
