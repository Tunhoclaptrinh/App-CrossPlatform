import React from 'react';
import {
  DeviceEventEmitter,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  AppBottomNav,
  AppCard,
  AppListItem,
  AppNavigationTabBar,
  AppScreenLayout,
  AppScrollView,
  ScreenWrapper,
} from '@/components';
import { Colors } from '@/constants';
import { useAppStore } from '@/hooks/useAppStore';
import { haptics } from '@/utils/haptics';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 24, bottom: 20, left: 0, right: 0 },
};
let view: TestRenderer.ReactTestRenderer;
async function mount(children: React.ReactNode) {
  await act(async () => {
    view = TestRenderer.create(
      <SafeAreaProvider initialMetrics={metrics}>{children}</SafeAreaProvider>,
    );
  });
}
afterEach(async () => {
  if (view) await act(async () => view.unmount());
  jest.restoreAllMocks();
});

it('composes fixed chrome, owns safe area once and preserves saved theme preferences', async () => {
  await useAppStore.setState({ themeMode: 'dark', themeStyle: 'apple-glass' });
  await mount(
    <AppScreenLayout
      surface="solid"
      bottomInset={false}
      header={{ title: 'Shared' }}
      footer={<View testID="footer" />}
    >
      <View testID="body" />
    </AppScreenLayout>,
  );
  const wrapper = view.root.findAll(
    node => node.type === (ScreenWrapper as unknown as { type: unknown }).type,
  )[0];
  expect(wrapper.props.edges).toEqual(['left', 'right']);
  expect(wrapper.props.backgroundColor).toBe(Colors.dark.background);
  const scroll = view.root.findAll(
    node => node.type === (AppScrollView as unknown as { type: unknown }).type,
  )[0];
  expect(scroll.findAllByProps({ testID: 'footer' })).toHaveLength(0);
  expect(scroll.findAllByProps({ testID: 'body' }).length).toBeGreaterThan(0);
  expect(useAppStore.getState().themeStyle).toBe('apple-glass');
});

it('keeps card and row actions accessible when disabled and honors the haptics preference', async () => {
  await useAppStore.setState({
    themeMode: 'light',
    themeStyle: 'apple-glass',
    hapticsEnabled: false,
  });
  const action = jest.fn();
  const haptic = jest.spyOn(haptics, 'light');
  await mount(
    <AppCard
      surface="solid"
      variant="outlined"
      onPress={action}
      disabled
      accessibilityLabel="Card"
      testID="card"
    >
      <AppListItem title="Row" onPress={action} testID="row" disabled />
    </AppCard>,
  );
  const actions = view.root.findAllByType(TouchableOpacity);
  expect(actions.map(node => node.props.accessibilityRole)).toEqual([
    'button',
    'button',
  ]);
  expect(actions.map(node => node.props.disabled)).toEqual([true, true]);
  expect(actions[0].props.testID).toBe('card');
  expect(StyleSheet.flatten(actions[0].props.style).backgroundColor).toBe(
    Colors.light.card,
  );
  await act(async () => actions[1].props.onPress());
  expect(action).not.toHaveBeenCalled();
  await act(async () =>
    view.update(<AppListItem title="Row" onPress={action} />),
  );
  await act(async () => view.root.findByType(TouchableOpacity).props.onPress());
  expect(action).toHaveBeenCalledTimes(1);
  expect(haptic).not.toHaveBeenCalled();
});

const Tabs = createBottomTabNavigator<{
  First: undefined;
  Second: undefined;
}>();
const navigation = createNavigationContainerRef<{
  First: undefined;
  Second: undefined;
}>();
const renderTabBar = (props: BottomTabBarProps) => (
  <AppNavigationTabBar
    {...props}
    items={[
      { key: 'First', label: 'First', icon: null },
      { key: 'Second', label: 'Second', icon: null },
    ]}
  />
);
const Body = () => <View />;

it('uses navigator selection, respects prevented tab presses, emits long press and hides for the keyboard', async () => {
  let prevent = true;
  const longPress = jest.fn();
  await mount(
    <NavigationContainer ref={navigation}>
      <Tabs.Navigator
        tabBar={renderTabBar}
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Tabs.Screen name="First" component={Body} />
        <Tabs.Screen
          name="Second"
          component={Body}
          listeners={{
            tabPress: event => {
              if (prevent) event.preventDefault();
            },
            tabLongPress: longPress,
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>,
  );
  const bar = () =>
    view.root.findAll(
      node => node.type === (AppBottomNav as unknown as { type: unknown }).type,
    )[0];
  await act(async () => bar().props.onChange('Second'));
  expect(navigation.getCurrentRoute()?.name).toBe('First');
  prevent = false;
  await act(async () => bar().props.onChange('Second'));
  expect(navigation.getCurrentRoute()?.name).toBe('Second');
  expect(bar().props.activeKey).toBe('Second');
  await act(async () => bar().props.items[1].onLongPress());
  expect(longPress).toHaveBeenCalledTimes(1);
  await act(async () =>
    DeviceEventEmitter.emit(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      {
        endCoordinates: { height: 300 },
      },
    ),
  );
  expect(bar().props.hidden).toBe(true);
  await act(async () =>
    DeviceEventEmitter.emit(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      {},
    ),
  );
  expect(bar().props.hidden).toBe(false);
});

it('omits the footer area when a conditional action is unavailable', async () => {
  await mount(
    <AppScreenLayout header={{ title: 'Unavailable action' }} footer={false}>
      <View />
    </AppScreenLayout>,
  );
  const wrapper = view.root.findAll(
    node => node.type === (ScreenWrapper as unknown as { type: unknown }).type,
  )[0];
  expect(wrapper.props.footer).toBeUndefined();
});
