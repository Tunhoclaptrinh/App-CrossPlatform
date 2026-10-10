import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  AppText,
  AppBadge,
  AppHeader,
  AppBottomNav,
} from '@/components';
import { haptics } from '@/utils';
import type { LayoutLabStageProps } from '../types';

export const LayoutLabStage: React.FC<LayoutLabStageProps> = React.memo(({
  isDark,
  styles,
  isStageExpanded,
  showTopDock,
  showBottomDock,
  isTopNav,
  dockVariant,
  headerVariant,
  dockBorderRadius,
  dynamicDockMarginStyle,
  navItems,
  activeNavTab,
  setActiveNavTab,
  fabShape,
  fabPlacement,
  fabLiftOffset,
  renderCenterFabComponent,
  dynamicMiddleScrollStyle,
  renderContentNode,
}) => {
  return (
    <View style={styles.stageSection}>
      <View style={styles.stageTitleRow}>
        <AppText style={styles.sectionHeading}>
          3. Khung Nhìn Thử Nghiệm Bố Cục Trực Tiếp
        </AppText>
        <AppBadge
          label={isStageExpanded ? 'Khung Toàn Màn Hình' : 'Khung 580px Mobile'}
          variant="neutral"
          size="sm"
        />
      </View>

      {/* Outer Phone Chassis */}
      <View
        style={[
          styles.phoneChassis,
          isStageExpanded && styles.phoneChassisExpanded,
          isDark ? styles.phoneChassisDark : styles.phoneChassisLight,
        ]}
      >
        {/* Simulated Dynamic Island Pill */}
        <View style={styles.chassisTopPill}>
          <View style={styles.simulatedDynamicIsland}>
            <View style={styles.islandCameraLens} />
            <View style={styles.islandSensorLens} />
          </View>
        </View>

        {/* SIMULATED TOP DOCK */}
        {showTopDock && (
          <View style={styles.topDockContainer}>
            {isTopNav ? (
              // Inverted: BottomNav mounted at Top as Category Tabs
              <AppBottomNav
                items={navItems}
                activeKey={activeNavTab}
                onChange={(k) => {
                  haptics.light();
                  setActiveNavTab(k);
                }}
                placement="top"
                variant={dockVariant}
                borderRadius={dockBorderRadius}
                style={dynamicDockMarginStyle}
                centerFab={{
                  onPress: () => haptics.light(),
                  shape: fabShape,
                  placement: fabPlacement,
                  liftOffset: fabLiftOffset,
                  customComponent: renderCenterFabComponent,
                }}
              />
            ) : (
              // Standard: AppHeader mounted at Top
              <AppHeader
                title="Layout Lab Stage"
                subtitle="AGY Adaptive UI Framework"
                variant={headerVariant}
                showBack
                onBack={() => haptics.light()}
                actionStyle="capsule"
              />
            )}
          </View>
        )}

        {/* MIDDLE SCROLLABLE CONTENT BODY */}
        <ScrollView
          style={styles.middleScrollView}
          contentContainerStyle={dynamicMiddleScrollStyle}
          nestedScrollEnabled
          showsVerticalScrollIndicator
        >
          {renderContentNode}
        </ScrollView>

        {/* SIMULATED BOTTOM DOCK */}
        {showBottomDock && (
          <View style={styles.bottomDockContainer}>
            {isTopNav ? (
              // Inverted: AppHeader mounted at Bottom as Reachability Command Bar
              <AppHeader
                title="Command Bar"
                subtitle="Thao tác một tay ngón cái"
                variant={headerVariant}
                showBack
                onBack={() => haptics.light()}
                actionStyle="capsule"
              />
            ) : (
              // Standard: AppBottomNav mounted at Bottom
              <AppBottomNav
                items={navItems}
                activeKey={activeNavTab}
                onChange={(k) => {
                  haptics.light();
                  setActiveNavTab(k);
                }}
                placement="bottom"
                variant={dockVariant}
                borderRadius={dockBorderRadius}
                style={dynamicDockMarginStyle}
                centerFab={{
                  onPress: () => haptics.light(),
                  shape: fabShape,
                  placement: fabPlacement,
                  liftOffset: fabLiftOffset,
                  customComponent: renderCenterFabComponent,
                }}
              />
            )}
          </View>
        )}

        {/* Simulated Home Indicator Bar */}
        <View style={styles.simulatedHomeBarContainer}>
          <View style={[styles.simulatedHomeBar, isDark ? styles.homeBarDark : styles.homeBarLight]} />
        </View>
      </View>
    </View>
  );
});
