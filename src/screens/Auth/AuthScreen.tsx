import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Fingerprint,
  Sliders,
  Check,
  Eye,
  EyeOff,
  Globe,
  Apple,
} from 'lucide-react-native';
import {
  ScreenWrapper,
  AppHeader,
  AppText,
  AppButton,
  AppInput,
  AppCard,
  AppBadge,
} from '@/components';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { useToast } from '@/hooks';
import { haptics } from '@/utils/haptics';
import { cryptoHelper } from '@/utils/crypto';
import { biometricService } from '@/services/biometrics/biometricService';
import type { AuthScreenProps } from '@/navigation/types';
import type { AuthMode, CryptoPacket } from './types';
import { createAuthStyles } from './styles';

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const { theme: themeColors, radiusTokens, isDark, isGlassTheme } = useThemeMode();
  const styles = useMemo(
    () => createAuthStyles(themeColors, radiusTokens, isDark, isGlassTheme),
    [themeColors, radiusTokens, isDark, isGlassTheme]
  );
  const toast = useToast();

  const {
    securityConfig,
    headerVariant,
    setUser,
    setLatestCryptoPacket,
  } = useAppStore();

  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  // Password Entropy / Strength Calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'Chưa nhập', color: '#94A3B8' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score: 1, label: 'Yếu', color: '#EF4444' };
    if (score <= 3) return { score: 2, label: 'Trung Bình', color: '#F59E0B' };
    if (score === 4) return { score: 3, label: 'Mạnh', color: '#3B82F6' };
    return { score: 4, label: 'Rất Mạnh (Khuyên Dùng)', color: '#10B981' };
  }, [password]);

  // Main Authentication Submit Handler
  const handleAuthSubmit = useCallback(async () => {
    // 1. Validation
    if (!email.trim() || !password) {
      haptics.warning();
      toast.show('warning', 'Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      haptics.warning();
      toast.show('warning', 'Địa chỉ email không đúng định dạng!');
      return;
    }

    if (authMode === 'signup') {
      if (!fullName.trim()) {
        haptics.warning();
        toast.show('warning', 'Vui lòng nhập Họ và Tên của bạn!');
        return;
      }
      if (password !== confirmPassword) {
        haptics.error();
        toast.show('error', 'Mật khẩu xác nhận không trùng khớp!');
        return;
      }
      if (password.length < 8) {
        haptics.warning();
        toast.show('warning', 'Mật khẩu cần tối thiểu 8 ký tự!');
        return;
      }
    }

    setLoading(true);
    haptics.light();

    try {
      // 2. Generate Client Salt
      let salt = '';
      for (let i = 0; i < 16; i++) {
        salt += Math.floor(Math.random() * 16).toString(16);
      }

      // 3. Zero-Knowledge Client Hashing
      const passwordHash = securityConfig.enableZeroKnowledgeHash
        ? cryptoHelper.hash(`${salt}:${password}:${securityConfig.secretPepper}`)
        : cryptoHelper.hash(password);

      // 4. Assemble Raw Payload
      const rawPayload = JSON.stringify({
        email: email.trim(),
        fullName: authMode === 'signup' ? fullName.trim() : undefined,
        passwordHash,
        action: authMode,
        timestamp: new Date().toISOString(),
        clientCipher: securityConfig.cipherAlgorithm,
        kdf: securityConfig.keyDerivation,
        nonce: Math.random().toString(36).substring(2, 10),
      });

      // 5. Symmetric E2E Encryption
      const encrypted = cryptoHelper.encryptForServer(rawPayload, securityConfig.secretPepper);

      // 6. Simulate Handshake & Server Verification Latency
      await new Promise((resolve) => setTimeout(() => resolve(undefined), securityConfig.simulatedLatencyMs));

      // 7. Server Decryption & Token Issuance
      const decrypted = cryptoHelper.decryptFromServer(encrypted, securityConfig.secretPepper);
      const isVerified = Boolean(decrypted);

      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${cryptoHelper.hash(rawPayload).slice(0, 32)}.${encrypted.tag}`;

      const packetData: CryptoPacket = {
        id: `pkt_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        action: authMode,
        username: email.split('@')[0],
        passwordHash: passwordHash.slice(0, 24) + '...',
        salt,
        iv: encrypted.iv,
        ciphertext: encrypted.ciphertext,
        tag: encrypted.tag,
        combined: encrypted.combined,
        serverVerified: isVerified,
        decryptedData: isVerified && decrypted ? JSON.parse(decrypted) : null,
        token: mockToken,
        tokenPayload: {
          sub: `usr_${Math.floor(Math.random() * 899999 + 100000)}`,
          email: email.trim(),
          role: 'authenticated_user',
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 86400,
          iss: 'enterprise_auth_engine',
          cipher: securityConfig.cipherAlgorithm,
        },
      };

      setLatestCryptoPacket(packetData);

      setUser({
        id: packetData.tokenPayload?.sub || 'usr_demo',
        name: authMode === 'signup' ? fullName.trim() : email.split('@')[0],
        email: email.trim(),
      });

      haptics.success();
      toast.show(
        'success',
        authMode === 'signin'
          ? 'Đăng nhập thành công! Gói tin AES-256 đã xác thực.'
          : 'Tạo tài khoản thành công! Khóa bảo mật đã sẵn sàng.',
        'Xác Thực Hoàn Tất'
      );
    } catch {
      haptics.error();
      toast.show('error', 'Có lỗi trong quá trình mã hóa dữ liệu!');
    } finally {
      setLoading(false);
    }
  }, [
    email,
    password,
    confirmPassword,
    fullName,
    authMode,
    securityConfig,
    setLatestCryptoPacket,
    setUser,
    toast,
  ]);

  // Biometric Quick Login
  const handleBiometricLogin = useCallback(async () => {
    haptics.light();
    const result = await biometricService.authenticate({
      promptMessage: 'Đăng nhập nhanh bằng Face ID / Vân tay',
    });

    if (result.success) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 350));
      setLoading(false);

      setUser({
        id: 'usr_biometric',
        name: 'Biometric Verified User',
        email: 'user.biometric@security.internal',
      });

      haptics.success();
      toast.show('success', 'Xác thực Face ID / Vân tay thành công!', 'Đăng Nhập Hoàn Tất');
    } else {
      haptics.error();
      toast.show('error', result.error || 'Xác thực sinh trắc học không thành công');
    }
  }, [setUser, toast]);

  const handleForgotPassword = () => {
    haptics.light();
    Alert.alert(
      'Khôi Phục Mật Khẩu',
      'Liên kết xác thực khôi phục mật khẩu sẽ được gửi đến email đăng ký của bạn kèm chữ ký mã hóa một lần (OTP-HMAC).',
      [{ text: 'Đã Hiểu', style: 'default' }]
    );
  };

  return (
    <ScreenWrapper style={styles.container} scrollable contentContainerStyle={styles.scrollContent}>
      {/* 1. Universal Top Header with direct link to Security Settings */}
      <AppHeader
        title=""
        showBack
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            style={styles.headerRightBtn}
            activeOpacity={0.7}
            onPress={() => {
              haptics.light();
              navigation.navigate('SecuritySettings');
            }}
          >
            <ShieldCheck size={14} color="#10B981" strokeWidth={2.4} />
            <AppText style={styles.headerRightText}>Cài Đặt Bảo Mật</AppText>
          </TouchableOpacity>
        }
        variant={headerVariant}
      />

      {/* 2. Hero Brand Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroBadgeBox}>
          <Lock size={26} color={themeColors.primary} strokeWidth={2.2} />
        </View>
        <AppText style={styles.heroTitle}>
          {authMode === 'signin' ? 'Chào Mừng Trở Lại' : 'Tạo Tài Khoản Mới'}
        </AppText>
        <AppText style={styles.heroSubtitle}>
          {authMode === 'signin'
            ? 'Đăng nhập an toàn với cơ chế mã hóa Zero-Knowledge Client.'
            : 'Đăng ký tài khoản bảo mật cao cấp với dẫn xuất khóa KDF chuẩn OWASP.'}
        </AppText>
      </View>

      {/* 3. Segmented Pill Mode Switcher */}
      <View style={styles.tabPillWrapper}>
        <TouchableOpacity
          style={[styles.tabPillBtn, authMode === 'signin' && styles.tabPillBtnActive]}
          onPress={() => {
            haptics.selection();
            setAuthMode('signin');
          }}
          activeOpacity={0.7}
        >
          <AppText style={[styles.tabPillText, authMode === 'signin' && styles.tabPillTextActive]}>
            Đăng Nhập
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabPillBtn, authMode === 'signup' && styles.tabPillBtnActive]}
          onPress={() => {
            haptics.selection();
            setAuthMode('signup');
          }}
          activeOpacity={0.7}
        >
          <AppText style={[styles.tabPillText, authMode === 'signup' && styles.tabPillTextActive]}>
            Đăng Ký
          </AppText>
        </TouchableOpacity>
      </View>

      {/* 4. Main Authentication Form */}
      <AppCard style={styles.formCard}>
        {authMode === 'signup' && (
          <AppInput
            label="Họ và Tên"
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChangeText={setFullName}
            leftIcon={<User size={18} color={themeColors.textSecondary} />}
            autoCapitalize="words"
          />
        )}

        <AppInput
          label="Địa chỉ Email"
          placeholder="name@company.com"
          value={email}
          onChangeText={setEmail}
          leftIcon={<Mail size={18} color={themeColors.textSecondary} />}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View>
          <AppInput
            label="Mật khẩu"
            placeholder="••••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            leftIcon={<Lock size={18} color={themeColors.textSecondary} />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggleBtn}
              >
                {showPassword ? (
                  <EyeOff size={18} color={themeColors.textSecondary} />
                ) : (
                  <Eye size={18} color={themeColors.textSecondary} />
                )}
              </TouchableOpacity>
            }
          />

          {/* Password Strength Meter (Signup mode only) */}
          {authMode === 'signup' && password.length > 0 && (
            <View style={styles.strengthSection}>
              <View style={styles.strengthBarRow}>
                {[1, 2, 3, 4].map((step) => (
                  <View
                    key={step}
                    style={[
                      styles.strengthSegment,
                      step <= passwordStrength.score && {
                        backgroundColor: passwordStrength.color,
                      },
                    ]}
                  />
                ))}
              </View>
              <View style={styles.strengthLabelRow}>
                <AppText style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                  Độ mạnh: {passwordStrength.label}
                </AppText>
                <AppText style={styles.strengthTip}>Nên chứa chữ hoa, số & ký tự đặc biệt</AppText>
              </View>
            </View>
          )}
        </View>

        {authMode === 'signup' && (
          <AppInput
            label="Xác nhận mật khẩu"
            placeholder="••••••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            leftIcon={<ShieldCheck size={18} color={themeColors.textSecondary} />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.passwordToggleBtn}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} color={themeColors.textSecondary} />
                ) : (
                  <Eye size={18} color={themeColors.textSecondary} />
                )}
              </TouchableOpacity>
            }
          />
        )}

        {/* Remember Me & Forgot Password (Signin only) */}
        {authMode === 'signin' && (
          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.rememberLeft}
              onPress={() => {
                haptics.selection();
                setRememberMe(!rememberMe);
              }}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkboxBase,
                  rememberMe ? styles.checkboxActive : styles.checkboxInactive,
                ]}
              >
                {rememberMe && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </View>
              <AppText style={styles.rememberText}>Ghi nhớ đăng nhập</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
              <AppText style={styles.forgotText}>Quên mật khẩu?</AppText>
            </TouchableOpacity>
          </View>
        )}

        {/* Primary Action Button */}
        <AppButton
          title={authMode === 'signin' ? 'Đăng Nhập An Toàn' : 'Tạo Tài Khoản Bảo Mật'}
          variant="primary"
          size="lg"
          loading={loading}
          onPress={handleAuthSubmit}
        />

        {/* Quick Biometric Login */}
        {authMode === 'signin' && (
          <>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <AppText style={styles.dividerText}>Hoặc Xác Thực Nhanh</AppText>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.biometricBtn}
              onPress={handleBiometricLogin}
              activeOpacity={0.8}
            >
              <View style={styles.biometricLeft}>
                <Fingerprint size={22} color="#10B981" strokeWidth={2.2} />
                <View>
                  <AppText style={styles.biometricTitle}>Face ID / Quét Vân Tay</AppText>
                  <AppText style={styles.biometricSubtitle}>
                    Đăng nhập 1 chạm qua Secure Enclave phần cứng
                  </AppText>
                </View>
              </View>
              <AppBadge label="1 Chạm" variant="success" size="sm" />
            </TouchableOpacity>

            {/* Social Logins */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialBtn}
                activeOpacity={0.7}
                onPress={() => toast.show('info', 'Đăng nhập Google SSO')}
              >
                <Globe size={16} color={themeColors.text} />
                <AppText style={styles.socialBtnText}>Google</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialBtn}
                activeOpacity={0.7}
                onPress={() => toast.show('info', 'Đăng nhập Apple ID')}
              >
                <Apple size={16} color={themeColors.text} />
                <AppText style={styles.socialBtnText}>Apple</AppText>
              </TouchableOpacity>
            </View>
          </>
        )}
      </AppCard>

      {/* 5. Switch Mode Link Prompt */}
      <View style={styles.switchModeRow}>
        <AppText style={styles.switchModePrompt}>
          {authMode === 'signin' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
        </AppText>
        <TouchableOpacity
          onPress={() => {
            haptics.selection();
            setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
          }}
        >
          <AppText style={styles.switchModeAction}>
            {authMode === 'signin' ? 'Đăng ký ngay' : 'Đăng nhập'}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* 6. Security Trust Footer Card */}
      <TouchableOpacity
        style={styles.securityTrustCard}
        activeOpacity={0.8}
        onPress={() => {
          haptics.light();
          navigation.navigate('SecuritySettings');
        }}
      >
        <View style={styles.securityTrustLeft}>
          <ShieldCheck size={16} color="#10B981" strokeWidth={2.4} />
          <AppText style={styles.securityTrustText}>
            Bảo vệ bởi {securityConfig.cipherAlgorithm} & {securityConfig.keyDerivation}
          </AppText>
        </View>
        <View style={styles.securityTrustRight}>
          <Sliders size={13} color="#10B981" />
          <AppText style={styles.securityTrustActionText}>Thiết Lập</AppText>
        </View>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};
