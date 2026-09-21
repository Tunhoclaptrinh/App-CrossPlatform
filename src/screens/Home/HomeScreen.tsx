import React, { useState } from 'react';
import { ScrollView, View, useColorScheme, Alert } from 'react-native';
import { Colors } from '@/constants/colors';
import { AppText, AppButton } from '@/components';
import { createHomeStyles } from './styles';

export const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const styles = createHomeStyles(themeColors);

  const [counter, setCounter] = useState(0);

  const handlePress = () => {
    const nextVal = counter + 1;
    setCounter(nextVal);
    if (nextVal % 5 === 0) {
      Alert.alert('Thành công', 'Bạn đã tương tác ' + nextVal + ' lần!');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.badge}>
          <AppText variant="caption" style={styles.badgeText}>
            REACT NATIVE • HK7
          </AppText>
        </View>
        <AppText variant="header" style={styles.title}>
          Ứng Dụng Di Động
        </AppText>
        <AppText variant="body" style={styles.subtitle}>
          Cấu trúc thư mục Modular Layered Architecture
        </AppText>

        <AppButton
          title={'Số lượt nhấn: ' + counter}
          onPress={handlePress}
          variant="primary"
          style={styles.counterButton}
        />
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <AppText variant="title" style={styles.cardTitle}>
            📁 Thư mục src/
          </AppText>
          <AppText variant="body" style={styles.cardDesc}>
            Toàn bộ logic, màn hình, components, themes và types đều được gom gọn trong src/.
          </AppText>
        </View>

        <View style={styles.card}>
          <AppText variant="title" style={styles.cardTitle}>
            ⚡ Path Aliases (@/*)
          </AppText>
          <AppText variant="body" style={styles.cardDesc}>
            Import tiện lợi qua @/components, @/constants, @/utils thay vì đường dẫn tương đối dài.
          </AppText>
        </View>

        <View style={styles.card}>
          <AppText variant="title" style={styles.cardTitle}>
            🎨 Design System Tokens
          </AppText>
          <AppText variant="body" style={styles.cardDesc}>
            Màu sắc, Spacing, Typography được định nghĩa tập trung tại @/constants, hỗ trợ Dark Mode.
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
};