import React from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AppDateTimeInput } from '@/components/common/AppDateTimeInput';
import { AppButton } from '@/components/common/AppButton';
import { AppInput } from '@/components/common/AppInput';
import { BottomNavItemComponent } from '@/components/common/AppBottomNav/components/BottomNavItem';
import { useAppStore } from '@/hooks/useAppStore';

let view: TestRenderer.ReactTestRenderer;
const metrics = {
  frame: { x: 0, y: 0, width: 360, height: 800 },
  insets: { top: 24, left: 0, right: 0, bottom: 20 },
};
async function render(element: React.ReactElement) {
  await act(async () => {
    view = TestRenderer.create(
      <SafeAreaProvider initialMetrics={metrics}>{element}</SafeAreaProvider>,
    );
  });
}
afterEach(async () => {
  if (view) await act(async () => view.unmount());
  jest.restoreAllMocks();
});

test('date input opens a native dialog and preserves time when a date is selected', async () => {
  jest.replaceProperty(Platform, 'OS', 'android');
  const change = jest.fn();
  await render(
    <AppDateTimeInput
      label="Date"
      value={new Date(2026, 9, 19, 15, 30)}
      onChange={change}
    />,
  );
  const button = view.root.findAll(
    node => node.type === (AppButton as unknown as { type: unknown }).type,
  )[0];
  await act(async () => button.props.onPress());
  const options = jest.mocked(DateTimePickerAndroid.open).mock.calls.at(-1)![0];
  expect(change).not.toHaveBeenCalled();
  act(() =>
    options.onValueChange?.(
      { nativeEvent: { timestamp: 0, utcOffset: 0 } },
      new Date(2026, 10, 3, 0, 0),
    ),
  );
  expect(change.mock.calls[0][0]).toEqual(new Date(2026, 10, 3, 15, 30));
});

test('multiline input gives long text a growing top-aligned area', async () => {
  await render(<AppInput multiline value="Long notes\nSecond line" />);
  const field = view.root.findByType(TextInput);
  expect(field.props.multiline).toBe(true);
  expect(StyleSheet.flatten(field.props.style).textAlignVertical).toBe('top');
});

test('base tab items expose long press and honor disabled and reduce motion states', async () => {
  await useAppStore.setState({ reduceMotion: true });
  const press = jest.fn();
  const long = jest.fn();
  await render(
    <BottomNavItemComponent
      item={{ key: 'a', label: 'A', icon: null, onLongPress: long }}
      isActive
      activeColor="#2563EB"
      inactiveColor="#64748B"
      onPress={press}
      hapticFeedback={false}
    />,
  );
  const tab = view.root
    .findAll(node => node.props.accessibilityRole === 'tab' && typeof node.props.onLongPress === 'function')[0];
  act(() => tab.props.onLongPress());
  expect(long).toHaveBeenCalledTimes(1);
  act(() => tab.props.onPress());
  expect(press).toHaveBeenCalledTimes(1);
});
