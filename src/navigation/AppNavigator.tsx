import React from 'react';
import { View } from 'react-native';
import { AppleMeshBackground } from '@/components/common/AppleMeshBackground';
import { navigationStyles } from './styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '@/screens/Splash';
import { HomeScreen } from '@/screens/Home';
import { DetailsScreen } from '@/screens/Details';
import { LayoutLabScreen } from '@/screens/LayoutLab';
import { AuthScreen } from '@/screens/Auth';
import { SecuritySettingsScreen } from '@/screens/SecuritySettings';
import { useThemeMode } from '@/hooks';
import { RootStackParamList } from './types';
import { StudyEditorScreen } from '@/screens/Study/Editor';
import { StudyDataToolsScreen } from '@/screens/Study/DataTools';
import { StudyTabs } from './StudyTabs';
import { CourseDetailScreen } from '@/screens/Study/CourseDetail';
import { SessionDetailScreen } from '@/screens/Study/SessionDetail';
import { AssignmentDetailScreen } from '@/screens/Study/AssignmentDetail';
import { GradeDetailScreen } from '@/screens/Study/GradeDetail';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { theme: themeColors, isGlassTheme, meshVariant } = useThemeMode();

  return (
    <View style={navigationStyles.frame}>
      {isGlassTheme && <AppleMeshBackground variant={meshVariant} />}
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: themeColors.background,
          },
          headerShadowVisible: false,
          headerTintColor: themeColors.text,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 17,
          },
          contentStyle: {
            backgroundColor: themeColors.background,
          },
        }}
      >
        <Stack.Screen
          name="StudyEditor"
          component={StudyEditorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudyDataTools"
          component={StudyDataToolsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudyTabs"
          component={StudyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SessionDetail"
          component={SessionDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AssignmentDetail"
          component={AssignmentDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GradeDetail"
          component={GradeDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LayoutLab"
          component={LayoutLabScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SecuritySettings"
          component={SecuritySettingsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};
