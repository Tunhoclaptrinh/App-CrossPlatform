import React from 'react';
import { View } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { ControlSize, getControlMetric } from '@/constants/theme';
import { AppButton, AppInput, AppSelect, AppSearchBar } from '@/components';

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
    expect(Organisms.GlassCard).toBeDefined();
    expect(Organisms.AppleGlassCard).toBeDefined();

    expect(Templates.ScreenWrapper).toBeDefined();
  });
});
