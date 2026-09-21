import React, { Component, ErrorInfo } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { AlertTriangle, RotateCcw } from 'lucide-react-native';
import { AppText } from '../AppText';
import { Colors } from '@/constants/colors';
import type { ErrorBoundaryProps, ErrorBoundaryState, ErrorBoundaryFallbackProps } from './types';
import { styles } from './styles';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ error, onReset }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
        <View style={[styles.iconWrapper, { backgroundColor: themeColors.errorLight }]}>
          <AlertTriangle size={36} color={themeColors.error} />
        </View>

        <AppText variant="title" color={themeColors.text} style={styles.title}>
          Đã Có Sự Cố Xảy Ra
        </AppText>

        <AppText variant="body" color={themeColors.textSecondary} style={styles.message}>
          {error?.message || 'Ứng dụng gặp lỗi không mong muốn trong quá trình xử lý giao diện.'}
        </AppText>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onReset}
          style={[styles.resetButton, { backgroundColor: themeColors.primary }]}
        >
          <RotateCcw size={18} color="#FFFFFF" style={styles.btnIcon} />
          <AppText variant="subtitle" color="#FFFFFF" style={styles.btnText}>
            Thử Lại
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
