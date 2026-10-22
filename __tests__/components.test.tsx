import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReactTestRenderer from 'react-test-renderer';
import { ControlSize, getControlMetric } from '@/constants/theme';
import { AppButton, AppInput, AppSelect, AppSearchBar, AppScrollView, ScreenWrapper } from '@/components';

describe('Design System Sizing Standards & Controls', () => {
  it('enforces exact height parity across ControlSize tokens', () => {
    expect(ControlSize.sm.height).toBe(36);
    expect(ControlSize.md.height).toBe(44);
    expect(ControlSize.lg.height).toBe(52);
  });

  it('provides correct metric via getControlMetric helper', () => {
    expect(getControlMetric('sm').height).toBe(36);
    expect(getControlMetric('md').height).toBe(44);
    expect(getControlMetric('lg').height).toBe(52);
  });

  it('renders AppButton with sm, md, lg sizes correctly', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <View>
          <AppButton title="Button SM" size="sm" />
          <AppButton title="Button MD" size="md" />
          <AppButton title="Button LG" size="lg" />
        </View>
      );
    });
    expect(renderer?.toJSON()).toBeTruthy();
  });

  it('renders AppInput with sm, md, lg sizes and states correctly', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <View>
          <AppInput size="sm" placeholder="Input SM" />
          <AppInput size="md" placeholder="Input MD" />
          <AppInput size="lg" placeholder="Input LG" error="Error message" disabled />
        </View>
      );
    });
    expect(renderer?.toJSON()).toBeTruthy();
  });

  it('renders AppSelect with options and sizes correctly', async () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    const onSelectMock = jest.fn();

    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <View>
          <AppSelect size="sm" options={options} value="1" onSelect={onSelectMock} />
          <AppSelect size="md" options={options} value="2" onSelect={onSelectMock} />
          <AppSelect size="lg" options={options} value="1" onSelect={onSelectMock} disabled />
        </View>
      );
    });
    expect(renderer?.toJSON()).toBeTruthy();
  });

  it('renders AppSearchBar with sm, md, lg sizes correctly', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <View>
          <AppSearchBar size="md" placeholder="Search..." />
        </View>
      );
    });
    expect(renderer?.toJSON()).toBeTruthy();
  });

  it('renders AppButton with Cupertino Liquid Glass variant', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <View>
          <AppButton title="Liquid Glass Button" variant="glass" size="md" />
        </View>
      );
    });
    expect(renderer?.toJSON()).toBeTruthy();
  });

  it('renders AppButton with success variant correctly', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(
        <View>
          <AppButton title="Success Action" variant="success" size="md" />
        </View>
      );
    });
    expect(renderer?.toJSON()).toBeTruthy();
  });

  it('exposes Atomic Design layer groups (Atoms, Molecules, Organisms, Templates)', () => {
    const { Atoms, Molecules, Organisms, Templates } = require('@/components');
    expect(Atoms.AppText).toBeDefined();
    expect(Atoms.CupertinoIconTile).toBeDefined();
    expect(Atoms.AppleMeshBackground).toBeDefined();

    expect(Molecules.AppButton).toBeDefined();
    expect(Molecules.AppInput).toBeDefined();
    expect(Molecules.AppSelect).toBeDefined();
    expect(Molecules.AppSearchBar).toBeDefined();

    expect(Organisms.AppCard).toBeDefined();
    expect(Organisms.GlassTile).toBeDefined();
    expect(Organisms.AppleGlassCard).toBeDefined();

    expect(Templates.ScreenWrapper).toBeDefined();
    expect(Templates.AppScreenLayout).toBeDefined();
    expect(Organisms.AppNavigationTabBar).toBeDefined();
  });
});


test('ScreenWrapper keeps fixed header/footer outside its scrollable body', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 24, bottom: 20, left: 0, right: 0 } }}>
        <ScreenWrapper scrollable edges={['left', 'right']} header={<View testID="fixed-header" />} footer={<View testID="fixed-footer" />}>
          <View testID="scroll-body" />
        </ScreenWrapper>
      </SafeAreaProvider>,
    );
  });
  const scroll = renderer.root.findAll(node => node.type === (AppScrollView as unknown as { type: unknown }).type)[0];
  expect(scroll.findAllByProps({ testID: 'scroll-body' }).length).toBeGreaterThan(0);
  expect(scroll.findAllByProps({ testID: 'fixed-header' })).toHaveLength(0);
  expect(scroll.findAllByProps({ testID: 'fixed-footer' })).toHaveLength(0);
  expect(renderer.root.findByProps({ testID: 'fixed-header' })).toBeDefined();
  expect(renderer.root.findByProps({ testID: 'fixed-footer' })).toBeDefined();
  await ReactTestRenderer.act(async () => renderer.unmount());
});
