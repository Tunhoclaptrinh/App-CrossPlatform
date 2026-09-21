import React, { Component } from 'react';
import { View } from 'react-native';
import { AlertTriangle, RotateCcw } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ErrorBoundaryProps, ErrorBoundaryState, ErrorBoundaryFallbackProps } from './types';
import { styles, getErrorBoundaryThemedStyles } from './styles';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
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
  const { theme: themeColors } = useThemeMode();
  const themed = getErrorBoundaryThemedStyles(themeColors);

  return (
    <View style={[styles.container, themed.container]}>
      <View style={[styles.card, themed.card]}>
        <View style={[styles.iconWrapper, themed.iconWrapper]}>
          <AlertTriangle size={36} color={themeColors.error} />
        </View>

        <AppText variant="title" color={themeColors.text} style={styles.title}>
          Đã Có Sự Cố Xảy Ra
        </AppText>

        <AppText variant="body" color={themeColors.textSecondary} style={styles.message}>
          {error?.message || 'Ứng dụng gặp lỗi không mong muốn trong quá trình xử lý giao diện.'}
        </AppText>

        <AppButton
          title="Thử Lại"
          variant="primary"
          leftIcon={<RotateCcw size={18} color="#FFFFFF" />}
          onPress={onReset}
          style={styles.resetButton}
        />
      </View>
    </View>
  );
};
