import React from 'react';
import { View } from 'react-native';
import {
  Thermometer,
  BatteryCharging,
  Wifi,
  Fan,
  Activity,
  Zap,
} from 'lucide-react-native';
import {
  AppText,
  AppCard,
  AppBadge,
  AppSwitch,
  AppProgressBar,
} from '@/components';
import { haptics } from '@/utils';
import type { SensorsFeedProps } from '../types';

export const SensorsFeed: React.FC<SensorsFeedProps> = React.memo(({
  themeColors,
  styles,
  fanRunning,
  setFanRunning,
  alarmActive,
  setAlarmActive,
  pumpActive,
  setPumpActive,
}) => {
  return (
    <View style={styles.contentBody}>
      {/* Top Telemetry Status Card */}
      <AppCard style={styles.telemetryStatusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusIndicatorBox}>
            <View style={styles.onlinePulse} />
            <AppText style={styles.statusIndicatorText}>12 / 12 Trạm Cảm Biến Online</AppText>
          </View>
          <AppBadge label="Tần số 1000ms" variant="info" size="sm" />
        </View>
        <AppText style={styles.statusSubtitle}>
          Mạng lưới viễn trắc thông minh phòng thí nghiệm AGY Core
        </AppText>
      </AppCard>

      {/* Sensor Metrics Grid */}
      <View style={styles.sensorGrid}>
        {/* Sensor 1: Temperature */}
        <AppCard style={styles.sensorCard}>
          <View style={styles.sensorCardHeader}>
            <View style={[styles.sensorIconBubble, styles.sensorIconRed]}>
              <Thermometer size={16} color="#EF4444" strokeWidth={2.4} />
            </View>
            <AppText style={styles.sensorCardTag}>Phòng Máy A</AppText>
          </View>
          <AppText style={styles.sensorValueNormal}>24.8°C</AppText>
          <AppText style={styles.sensorSubtext}>
            Nhiệt độ ổn định (-0.2°C)
          </AppText>
          <View style={styles.miniProgressWrap}>
            <AppProgressBar progress={0.62} height={4} color="#EF4444" />
          </View>
        </AppCard>

        {/* Sensor 2: Humidity */}
        <AppCard style={styles.sensorCard}>
          <View style={styles.sensorCardHeader}>
            <View style={[styles.sensorIconBubble, styles.sensorIconBlue]}>
              <Wifi size={16} color="#3B82F6" strokeWidth={2.4} />
            </View>
            <AppText style={styles.sensorCardTag}>Độ Ẩm Không Khí</AppText>
          </View>
          <AppText style={styles.sensorValueNormal}>58.4%</AppText>
          <AppText style={styles.sensorSubtext}>
            Mức lý tưởng đạt chuẩn
          </AppText>
          <View style={styles.miniProgressWrap}>
            <AppProgressBar progress={0.58} height={4} color="#3B82F6" />
          </View>
        </AppCard>

        {/* Sensor 3: Battery */}
        <AppCard style={styles.sensorCard}>
          <View style={styles.sensorCardHeader}>
            <View style={[styles.sensorIconBubble, styles.sensorIconGreen]}>
              <BatteryCharging size={16} color="#10B981" strokeWidth={2.4} />
            </View>
            <AppText style={styles.sensorCardTag}>Pin Trạm Dự Phòng</AppText>
          </View>
          <AppText style={styles.sensorValueSuccess}>96%</AppText>
          <AppText style={styles.sensorSubtext}>
            Đang sạc năng lượng mặt trời
          </AppText>
          <View style={styles.miniProgressWrap}>
            <AppProgressBar progress={0.96} height={4} color="#10B981" />
          </View>
        </AppCard>

        {/* Sensor 4: Signal */}
        <AppCard style={styles.sensorCard}>
          <View style={styles.sensorCardHeader}>
            <View style={[styles.sensorIconBubble, styles.sensorIconPurple]}>
              <Zap size={16} color="#A855F7" strokeWidth={2.4} />
            </View>
            <AppText style={styles.sensorCardTag}>Tín Hiệu 5G Mesh</AppText>
          </View>
          <AppText style={styles.sensorValueNormal}>-64 dBm</AppText>
          <AppText style={styles.sensorSubtext}>
            Độ trễ phản hồi 8ms
          </AppText>
          <View style={styles.miniProgressWrap}>
            <AppProgressBar progress={0.88} height={4} color="#A855F7" />
          </View>
        </AppCard>
      </View>

      {/* Control Actuators Row */}
      <AppCard style={styles.actuatorsCard}>
        <AppText style={styles.actuatorTitle}>
          Điều Khiển Thiết Bị Ngoại Vi (Actuators)
        </AppText>
        <View style={styles.actuatorRow}>
          <View style={styles.actuatorCol}>
            <View style={styles.actuatorLabelBox}>
              <Fan size={16} color={fanRunning ? '#10B981' : themeColors.textSecondary} />
              <AppText style={styles.actuatorLabel}>Quạt Làm Mát</AppText>
            </View>
            <AppSwitch
              value={fanRunning}
              onValueChange={(val) => {
                haptics.light();
                setFanRunning(val);
              }}
            />
          </View>
          <View style={styles.actuatorDivider} />
          <View style={styles.actuatorCol}>
            <View style={styles.actuatorLabelBox}>
              <Activity size={16} color={alarmActive ? '#EF4444' : themeColors.textSecondary} />
              <AppText style={styles.actuatorLabel}>Cảnh Báo Còi</AppText>
            </View>
            <AppSwitch
              value={alarmActive}
              onValueChange={(val) => {
                haptics.light();
                setAlarmActive(val);
              }}
            />
          </View>
          <View style={styles.actuatorDivider} />
          <View style={styles.actuatorCol}>
            <View style={styles.actuatorLabelBox}>
              <Zap size={16} color={pumpActive ? '#6366F1' : themeColors.textSecondary} />
              <AppText style={styles.actuatorLabel}>Bơm Tự Động</AppText>
            </View>
            <AppSwitch
              value={pumpActive}
              onValueChange={(val) => {
                haptics.light();
                setPumpActive(val);
              }}
            />
          </View>
        </View>
      </AppCard>

      {/* Live Log Stream Card */}
      <AppCard style={styles.logStreamCard}>
        <View style={styles.logStreamHeader}>
          <AppText style={styles.logStreamTag}>NHẬT KÝ TELEMETRY LIVE</AppText>
          <AppBadge label="WebSocket Connected" variant="success" size="sm" />
        </View>
        <AppText style={styles.logLine}>[11:42:01] Node #01: Temp 24.8°C, Humidity 58%</AppText>
        <AppText style={styles.logLine}>[11:42:02] Gateway sync packet 128 bytes ACK</AppText>
        <AppText style={styles.logLine}>[11:42:03] Actuator #03: Smart Fan auto speed 1400 RPM</AppText>
      </AppCard>
    </View>
  );
});
