import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { BookOpen, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppCard } from '../AppCard';
import { AppText } from '../AppText';
import { AppBadge } from '../AppBadge';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { StudyCourseCardProps } from './types';
import { createStyles } from './styles';
export const StudyCourseCard = React.memo(
  ({ course, onPress }: StudyCourseCardProps) => {
    const { t } = useTranslation();
    const { theme } = useThemeMode();
    const styles = useMemo(() => createStyles(theme), [theme]);
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${course.code}, ${course.name}, ${t(
          'study.credits',
          { count: course.credits },
        )}`}
        onPress={onPress}
      >
        <AppCard style={styles.card}>
          <View style={styles.row}>
            <View style={styles.icon}>
              <BookOpen color={theme.primary} size={22} />
            </View>
            <View style={styles.body}>
              <AppText style={styles.code}>{course.code}</AppText>
              <AppText style={styles.title}>{course.name}</AppText>
            </View>
            <ChevronRight size={18} color={theme.textSecondary} />
          </View>
          <View style={styles.footer}>
            <AppBadge
              variant="neutral"
              label={t('study.credits', { count: course.credits })}
            />
            <AppText variant="caption" color={theme.textSecondary}>
              {course.lecturer}
            </AppText>
          </View>
        </AppCard>
      </Pressable>
    );
  },
);
