import React, { Component } from 'react';
import { View } from 'react-native';
import { AlertTriangle, RotateCcw } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { AppCard } from '../AppCard';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ErrorBoundaryProps, ErrorBoundaryState, ErrorBoundaryFallbackProps } from './types';
import { styles } from './styles';

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
  const { theme: themeColors, isDark } = useThemeMode();

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <AppCard style={styles.card} padding="lg">
        <View style={[styles.iconWrapper, isDark ? styles.iconWrapperDark : styles.iconWrapperLight]}>
          <AlertTriangle size={32} color="#EF4444" strokeWidth={2.2} />
        </View>

        <AppText
          style={[
            styles.title,
            { color: themeColors.text },
          ]}
        >
          Đã Có Sự Cố Xảy Ra
        </AppText>

        <AppText
          style={[
            styles.message,
            { color: themeColors.textSecondary },
          ]}
        >
          {error?.message || 'Ứng dụng gặp sự cố không mong muốn trong quá trình kết xuất giao diện.'}
        </AppText>

        <AppButton
          title="Thử Lại"
          variant="primary"
          size="md"
          leftIcon={<RotateCcw size={16} color="#FFFFFF" strokeWidth={2.2} />}
          onPress={onReset}
          style={styles.resetButton}
        />
      </AppCard>
    </View>
  );
};
