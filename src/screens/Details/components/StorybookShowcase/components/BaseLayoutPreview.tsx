import React from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  NavigationIndependentTree,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LayoutGrid, Settings } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  AppCard,
  AppListItem,
  AppNavigationTabBar,
  AppScreenLayout,
  AppText,
} from '@/components';
import { useThemeMode } from '@/hooks';
import type { createStorybookStyles } from '../styles';

const Tabs = createBottomTabNavigator();
const overviewIcon = ({ color, size }: { color: string; size: number }) => (
  <LayoutGrid color={color} size={size} />
);
const settingsIcon = ({ color, size }: { color: string; size: number }) => (
  <Settings color={color} size={size} />
);

function PreviewTabBar(props: BottomTabBarProps) {
  const { t } = useTranslation();
  return (
    <AppNavigationTabBar
      {...props}
      surface="solid"
      items={[
        {
          key: 'Overview',
          label: t('screenLayout.overview'),
          icon: overviewIcon,
        },
        {
          key: 'Preferences',
          label: t('screenLayout.preferences'),
          icon: settingsIcon,
        },
      ]}
    />
  );
}
const renderTabBar = (props: BottomTabBarProps) => <PreviewTabBar {...props} />;

function PreviewScreen() {
  const { t } = useTranslation();
  return (
    <AppScreenLayout
      surface="solid"
      bottomInset={false}
      header={{ title: t('screenLayout.title') }}
      footer={<AppText>{t('screenLayout.footer')}</AppText>}
    >
      {[0, 1, 2].map(index => (
        <AppCard key={index} surface="solid" variant="outlined" gap="md">
          <AppText>{t('screenLayout.body')}</AppText>
          <AppListItem
            title={t('screenLayout.disabledItem')}
            disabled
            showChevron
            onPress={() => undefined}
          />
        </AppCard>
      ))}
    </AppScreenLayout>
  );
}

export function BaseLayoutPreview({
  styles,
}: {
  styles: Pick<ReturnType<typeof createStorybookStyles>, 'screenLayoutPreview'>;
}) {
  const { isDark } = useThemeMode();
  return (
    <View style={styles.screenLayoutPreview}>
      <NavigationIndependentTree>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Tabs.Navigator
            tabBar={renderTabBar}
            screenOptions={{ headerShown: false, animation: 'none' }}
          >
            <Tabs.Screen name="Overview" component={PreviewScreen} />
            <Tabs.Screen name="Preferences" component={PreviewScreen} />
          </Tabs.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </View>
  );
}
