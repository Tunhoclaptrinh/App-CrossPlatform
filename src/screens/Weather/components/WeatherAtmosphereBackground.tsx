import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Path,
  G,
} from 'react-native-svg';

interface WeatherAtmosphereBackgroundProps {
  weatherCode: number;
  isDay: boolean;
  isDarkTheme?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const WeatherAtmosphereBackground: React.FC<WeatherAtmosphereBackgroundProps> = ({
  weatherCode,
  isDay,
  isDarkTheme = false,
}) => {
  // Phân loại nhóm thời tiết: 'clear' | 'cloudy' | 'rain' | 'thunderstorm' | 'snow'
  const getWeatherCategory = (): 'clear' | 'cloudy' | 'rain' | 'thunderstorm' | 'snow' => {
    if (weatherCode === 0 || weatherCode === 1) return 'clear';
    if (weatherCode === 2 || weatherCode === 3 || weatherCode === 45 || weatherCode === 48) return 'cloudy';
    if (
      (weatherCode >= 51 && weatherCode <= 67) ||
      (weatherCode >= 80 && weatherCode <= 82)
    ) return 'rain';
    if (weatherCode >= 95 && weatherCode <= 99) return 'thunderstorm';
    if (
      (weatherCode >= 71 && weatherCode <= 77) ||
      weatherCode === 85 ||
      weatherCode === 86
    ) return 'snow';
    return 'cloudy';
  };

  const category = getWeatherCategory();

  // Xác định bảng màu dải nền trời (Sky Gradient)
  const getSkyGradientColors = (): [string, string, string] => {
    if (!isDay) {
      if (category === 'thunderstorm') return ['#0B0716', '#1E0C38', '#0D1117'];
      if (category === 'rain') return ['#0A1118', '#111D2B', '#0D1622'];
      if (category === 'cloudy') return ['#0F141C', '#1A2332', '#141A24'];
      return ['#070B19', '#0F1A34', '#172554']; // Clear night deep cosmic blue
    }

    // Ban ngày
    if (category === 'clear') {
      return isDarkTheme
        ? ['#0F2B48', '#1B4965', '#2C6E91']
        : ['#1E88E5', '#42A5F5', '#90CAF9']; // Radiant blue day
    }
    if (category === 'cloudy') {
      return isDarkTheme
        ? ['#1C2430', '#2B394A', '#3A4D63']
        : ['#4A6572', '#6B8E9F', '#B0BEC5']; // Soft misty overcast
    }
    if (category === 'rain') {
      return isDarkTheme
        ? ['#13222E', '#1C3345', '#24435C']
        : ['#2E4A62', '#456B8C', '#78909C']; // Stormy azure
    }
    if (category === 'thunderstorm') {
      return ['#1A0C2E', '#2D144E', '#1B1F38']; // Electric dark violet
    }
    // Snow
    return isDarkTheme
      ? ['#1A2B3C', '#274159', '#3D5A75']
      : ['#5C82A6', '#8EAEC4', '#CFD8DC'];
  };

  const [topColor, midColor, botColor] = getSkyGradientColors();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          {/* 1. Dải màu chuyển tiếp nền trời toàn cảnh */}
          <LinearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={topColor} stopOpacity={1} />
            <Stop offset="55%" stopColor={midColor} stopOpacity={1} />
            <Stop offset="100%" stopColor={botColor} stopOpacity={1} />
          </LinearGradient>

          {/* 2. Quầng sáng vầng mặt trời (Sun Halo) */}
          <RadialGradient id="sunAura" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFF7ED" stopOpacity={0.9} />
            <Stop offset="30%" stopColor="#FBBF24" stopOpacity={0.5} />
            <Stop offset="70%" stopColor="#F59E0B" stopOpacity={0.2} />
            <Stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
          </RadialGradient>

          {/* 3. Ánh trăng dịu mát ban đêm (Moon Aura) */}
          <RadialGradient id="moonAura" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.8} />
            <Stop offset="35%" stopColor="#E0E7FF" stopOpacity={0.4} />
            <Stop offset="75%" stopColor="#818CF8" stopOpacity={0.15} />
            <Stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
          </RadialGradient>

          {/* 4. Quầng sấm sét điện quang (Thunder Aura) */}
          <RadialGradient id="thunderAura" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#C084FC" stopOpacity={0.5} />
            <Stop offset="60%" stopColor="#9333EA" stopOpacity={0.18} />
            <Stop offset="100%" stopColor="#6B21A8" stopOpacity={0} />
          </RadialGradient>

          {/* 5. Gradient sóng mây mềm chân trời */}
          <LinearGradient id="cloudGrad1" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={isDay ? 0.22 : 0.08} />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.02} />
          </LinearGradient>

          <LinearGradient id="cloudGrad2" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={isDay ? 0.16 : 0.05} />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.01} />
          </LinearGradient>
        </Defs>

        {/* Nền trời chính */}
        <Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="url(#skyGrad)" />

        {/* ================= THỜI TIẾT BAN NGÀY NẮNG ================= */}
        {isDay && category === 'clear' && (
          <G>
            {/* Vầng hào quang mặt trời */}
            <Circle cx={SCREEN_WIDTH * 0.78} cy={140} r={160} fill="url(#sunAura)" />
            {/* Lõi thái dương */}
            <Circle cx={SCREEN_WIDTH * 0.78} cy={140} r={38} fill="#FEF08A" opacity={0.95} />
            {/* Tia sáng khuếch tán */}
            <Circle cx={SCREEN_WIDTH * 0.78} cy={140} r={55} fill="#FDE047" opacity={0.35} />
          </G>
        )}

        {/* ================= THỜI TIẾT BAN ĐÊM TRỜI QUANG ================= */}
        {!isDay && category === 'clear' && (
          <G>
            {/* Hào quang ánh trăng */}
            <Circle cx={SCREEN_WIDTH * 0.76} cy={135} r={140} fill="url(#moonAura)" />
            {/* Mặt trăng khuyết nghệ thuật */}
            <Circle cx={SCREEN_WIDTH * 0.76} cy={135} r={28} fill="#F8FAFC" opacity={0.95} />
            <Circle cx={SCREEN_WIDTH * 0.79} cy={130} r={24} fill={topColor} />

            {/* Các vì sao sáng li ti rải rác */}
            <Circle cx={40} cy={90} r={1.5} fill="#FFFFFF" opacity={0.8} />
            <Circle cx={120} cy={130} r={1.2} fill="#FFFFFF" opacity={0.6} />
            <Circle cx={70} cy={190} r={2.0} fill="#FFFFFF" opacity={0.9} />
            <Circle cx={160} cy={80} r={1.0} fill="#FFFFFF" opacity={0.5} />
            <Circle cx={220} cy={160} r={1.8} fill="#FFFFFF" opacity={0.7} />
            <Circle cx={90} cy={270} r={1.4} fill="#FFFFFF" opacity={0.6} />
            <Circle cx={310} cy={60} r={1.6} fill="#FFFFFF" opacity={0.8} />
            <Circle cx={280} cy={230} r={1.2} fill="#FFFFFF" opacity={0.5} />
            <Circle cx={50} cy={340} r={1.5} fill="#FFFFFF" opacity={0.7} />
            <Circle cx={330} cy={310} r={1.3} fill="#FFFFFF" opacity={0.6} />
          </G>
        )}

        {/* ================= THỜI TIẾT DÔNG BÃO / SẤM SÉT ================= */}
        {category === 'thunderstorm' && (
          <G>
            {/* Quầng sáng điện quang tím */}
            <Circle cx={SCREEN_WIDTH * 0.6} cy={160} r={180} fill="url(#thunderAura)" />
            <Circle cx={SCREEN_WIDTH * 0.3} cy={220} r={140} fill="url(#thunderAura)" />

            {/* Tia sét vector cách điệu */}
            <Path
              d={`M ${SCREEN_WIDTH * 0.72} 80 L ${SCREEN_WIDTH * 0.68} 140 L ${SCREEN_WIDTH * 0.73} 145 L ${SCREEN_WIDTH * 0.66} 210`}
              stroke="#E9D5FF"
              strokeWidth="2.2"
              fill="none"
              opacity={0.85}
            />
          </G>
        )}

        {/* ================= THỜI TIẾT MƯA / MƯA RÀO ================= */}
        {(category === 'rain' || category === 'thunderstorm') && (
          <G opacity={0.35}>
            {/* Các vệt mưa rơi nghiêng tự nhiên */}
            {Array.from({ length: 18 }).map((_, index) => {
              const xPos = ((index * 23) % SCREEN_WIDTH) + 10;
              const yPos = 80 + ((index * 37) % 360);
              return (
                <Path
                  key={`rain-${index}`}
                  d={`M ${xPos} ${yPos} L ${xPos - 8} ${yPos + 24}`}
                  stroke="#BAE6FD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}
          </G>
        )}

        {/* ================= THỜI TIẾT TUYẾT RƠI ================= */}
        {category === 'snow' && (
          <G opacity={0.65}>
            {Array.from({ length: 16 }).map((_, index) => {
              const xPos = ((index * 27) % SCREEN_WIDTH) + 15;
              const yPos = 70 + ((index * 41) % 340);
              const r = (index % 3) + 1.5;
              return (
                <Circle
                  key={`snow-${index}`}
                  cx={xPos}
                  cy={yPos}
                  r={r}
                  fill="#FFFFFF"
                  opacity={0.7}
                />
              );
            })}
          </G>
        )}

        {/* ================= LỚP SÓNG MÂY MỀM NGHỆ THUẬT (ARTISTIC CLOUD WAVES) ================= */}
        {/* Lớp mây sau 1 */}
        <Path
          d={`M -20 ${SCREEN_HEIGHT * 0.38} Q ${SCREEN_WIDTH * 0.25} ${SCREEN_HEIGHT * 0.32} ${SCREEN_WIDTH * 0.55} ${SCREEN_HEIGHT * 0.36} T ${SCREEN_WIDTH + 20} ${SCREEN_HEIGHT * 0.34} L ${SCREEN_WIDTH + 20} ${SCREEN_HEIGHT} L -20 ${SCREEN_HEIGHT} Z`}
          fill="url(#cloudGrad2)"
        />

        {/* Lớp mây trước 2 */}
        <Path
          d={`M -20 ${SCREEN_HEIGHT * 0.44} Q ${SCREEN_WIDTH * 0.35} ${SCREEN_HEIGHT * 0.48} ${SCREEN_WIDTH * 0.7} ${SCREEN_HEIGHT * 0.42} T ${SCREEN_WIDTH + 20} ${SCREEN_HEIGHT * 0.46} L ${SCREEN_WIDTH + 20} ${SCREEN_HEIGHT} L -20 ${SCREEN_HEIGHT} Z`}
          fill="url(#cloudGrad1)"
        />
      </Svg>
    </View>
  );
};
