import React from 'react';
import { View } from 'react-native';
import {
  User,
  Mail,
  Lock,
} from 'lucide-react-native';
import {
  AppText,
  AppCard,
  AppButton,
  AppSwitch,
  AppInput,
  AppSelect,
} from '@/components';
import { haptics } from '@/utils';
import type { FormsSandboxProps } from '../types';

export const FormsSandbox: React.FC<FormsSandboxProps> = React.memo(({
  themeColors,
  styles,
  formInputText,
  setFormInputText,
  formEmailText,
  setFormEmailText,
  formOffice,
  setFormOffice,
  form2FA,
  setForm2FA,
}) => {
  return (
    <View style={styles.contentBody}>
      <AppCard style={styles.formCard}>
        <AppText style={styles.formHeading}>
          Cấu Hình Hệ Thống & Kiểm Tra Nhập Liệu
        </AppText>
        <AppText style={styles.formDesc}>
          Kiểm tra độ bám và không gian bàn phím, đảm bảo không bị dock che khuất.
        </AppText>

        <View style={styles.inputStack}>
          <AppInput
            label="Họ và Tên Nhân Sự"
            value={formInputText}
            onChangeText={setFormInputText}
            placeholder="Nhập tên..."
            leftIcon={<User size={16} color={themeColors.textSecondary} />}
          />

          <AppInput
            label="Email Tài Khoản"
            value={formEmailText}
            onChangeText={setFormEmailText}
            placeholder="email@company.com"
            leftIcon={<Mail size={16} color={themeColors.textSecondary} />}
          />

          <AppInput
            label="Mật Khẩu Xác Thực"
            value="supersecrettoken2026"
            secureTextEntry
            placeholder="••••••••••••"
            leftIcon={<Lock size={16} color={themeColors.textSecondary} />}
          />

          <AppSelect
            label="Khu Vực Triển Khai Trạm"
            value={formOffice}
            onSelect={(val) => {
              haptics.light();
              setFormOffice(String(val));
            }}
            options={[
              { label: 'Hà Nội - Trung Tâm Điều Hành', value: 'hn' },
              { label: 'TP. Hồ Chí Minh - Trạm Data Center', value: 'hcm' },
              { label: 'Đà Nẵng - Trạm Nghiên Cứu Biển', value: 'dn' },
              { label: 'Singapore - Cloud Region APAC', value: 'sg' },
            ]}
          />
        </View>

        <View style={styles.formSwitchRow}>
          <View style={styles.formSwitchLabelCol}>
            <AppText style={styles.formSwitchTitle}>
              Bảo Mật Hai Lớp (2FA Biometrics)
            </AppText>
            <AppText style={styles.formSwitchDesc}>
              Yêu cầu xác nhận vân tay/Face ID khi thay đổi vị trí Dock
            </AppText>
          </View>
          <AppSwitch
            value={form2FA}
            onValueChange={(val) => {
              haptics.light();
              setForm2FA(val);
            }}
          />
        </View>

        <View style={styles.formBtnRow}>
          <AppButton
            title="Lưu Cấu Hình Mới"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => {
              haptics.success();
            }}
          />
        </View>
      </AppCard>
    </View>
  );
});
