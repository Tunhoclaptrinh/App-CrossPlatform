import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ChevronRight, GraduationCap, Pencil } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  AppAvatar,
  AppBadge,
  AppButton,
  AppCard,
  AppChip,
  AppInput,
  AppSwitch,
  AppText,
  ConfirmDialog,
} from '@/components';
import { useToast } from '@/components/common/AppToast';
import { StudyPage } from '@/components/common/StudyPage';
import { COURSES, GRADES, findCourse } from '@/data/study';
import { useAppStore } from '@/hooks/useAppStore';
import { gradeAverage, gradeTotal, studentEditSchema } from '@/utils/study';
import type { StudentEdit } from '@/types/study';
import type { StudyTabProps } from '@/navigation/types';
import { useStudyStyles } from './styles';

export function ProfileScreen({ navigation }: StudyTabProps<'Profile'>) {
  const { t } = useTranslation();
  const { styles, theme, isDark } = useStudyStyles();
  const profile = useAppStore(s => s.studentProfile);
  const update = useAppStore(s => s.updateStudentProfile);
  const setTheme = useAppStore(s => s.setThemeMode);
  const language = useAppStore(s => s.language);
  const setLanguage = useAppStore(s => s.setLanguage);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<StudentEdit>(profile);
  const [errors, setErrors] = useState<
    Partial<Record<keyof StudentEdit, string>>
  >({});
  const [saving, setSaving] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (!editing)
      setDraft({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
      });
  }, [profile, editing]);
  const change = (key: keyof StudentEdit, value: string) => {
    setDraft(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };
  const save = async () => {
    const result = studentEditSchema.safeParse(draft);
    if (!result.success) {
      const next: Partial<Record<keyof StudentEdit, string>> = {};
      result.error.issues.forEach(issue => {
        next[issue.path[0] as keyof StudentEdit] = t(`study.${issue.message}`);
      });
      setErrors(next);
      return;
    }
    setSaving(true);
    try {
      await update(result.data);
      setEditing(false);
      toast.success(t('study.saved'));
    } catch {
      toast.error(t('study.saveError'));
    } finally {
      setSaving(false);
    }
  };
  const cancel = () => {
    const dirty = (Object.keys(draft) as (keyof StudentEdit)[]).some(
      key => draft[key] !== profile[key],
    );
    if (dirty) setConfirmCancel(true);
    else {
      setEditing(false);
      setErrors({});
    }
  };
  const average = gradeAverage(GRADES, COURSES);
  return (
    <StudyPage
      title={t('study.profileTitle')}
      subtitle={t('study.studentHeading')}
      scrollable
    >
      <View style={styles.hero}>
        <View style={styles.row}>
          <AppAvatar name={profile.fullName} size="lg" />
          <GraduationCap size={32} color={styles.heroText.color} />
        </View>
        <AppText style={styles.heroName}>{profile.fullName}</AppText>
        <AppText style={styles.heroCaption}>
          {profile.studentId} · {profile.className}
        </AppText>
      </View>
      <AppCard>
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionHeading}>
            {t('study.personalInfo')}
          </AppText>
          {!editing && (
            <AppButton
              title={t('study.editProfile')}
              accessibilityLabel={t('study.editProfile')}
              variant="ghost"
              size="sm"
              leftIcon={<Pencil size={16} color={theme.primary} />}
              onPress={() => {
                setErrors({});
                setEditing(true);
              }}
            />
          )}
        </View>
        <View style={styles.metaRow}>
          <AppText style={styles.note}>{t('study.studentId')}</AppText>
          <AppText style={styles.metaValue}>{profile.studentId}</AppText>
        </View>
        <View style={styles.metaRow}>
          <AppText style={styles.note}>
            {t('study.className')} · {t('study.major')}
          </AppText>
          <AppText style={styles.metaValue}>
            {profile.className} · {profile.major}
          </AppText>
        </View>
        {editing ? (
          <View style={styles.section}>
            <AppInput
              label={t('study.fullName')}
              accessibilityLabel={t('study.fullName')}
              value={draft.fullName}
              onChangeText={v => change('fullName', v)}
              error={errors.fullName}
              maxLength={80}
              autoComplete="name"
              editable={!saving}
            />
            <AppInput
              label={t('study.email')}
              accessibilityLabel={t('study.email')}
              value={draft.email}
              onChangeText={v => change('email', v)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              maxLength={254}
              editable={!saving}
            />
            <AppInput
              label={t('study.phone')}
              accessibilityLabel={t('study.phone')}
              value={draft.phone}
              onChangeText={v => change('phone', v)}
              error={errors.phone}
              keyboardType="phone-pad"
              autoComplete="tel"
              maxLength={16}
              editable={!saving}
            />
            <AppText style={styles.note}>{t('study.editHint')}</AppText>
            <View style={styles.editActions}>
              <AppButton
                title={t('study.save')}
                onPress={save}
                loading={saving}
              />
              <AppButton
                title={t('study.cancel')}
                onPress={cancel}
                variant="outline"
                disabled={saving}
              />
            </View>
          </View>
        ) : (
          (['fullName', 'email', 'phone'] as const).map(key => (
            <View key={key} style={styles.metaRow}>
              <AppText style={styles.note}>{t(`study.${key}`)}</AppText>
              <AppText selectable style={styles.metaValue}>
                {profile[key]}
              </AppText>
            </View>
          ))
        )}
      </AppCard>
      <View style={styles.section}>
        <AppText style={styles.sectionHeading}>{t('study.results')}</AppText>
        <AppCard>
          <AppText style={styles.note}>{t('study.average')}</AppText>
          <AppText style={styles.score}>
            {average?.toFixed(2) ?? '—'} / 10
          </AppText>
          <AppText style={styles.note}>{t('study.averageNote')}</AppText>
        </AppCard>
        {GRADES.map(grade => {
          const course = findCourse(grade.courseId);
          if (!course) return null;
          const total = gradeTotal(grade);
          return (
            <AppCard
              key={grade.id}
              onPress={() =>
                navigation.navigate('GradeDetail', { gradeId: grade.id })
              }
              style={styles.gradeRow}
            >
              <View style={styles.row}>
                <View style={styles.flex}>
                  <AppText variant="caption" color={theme.primary}>
                    {course.code} · {course.semester}
                  </AppText>
                  <AppText variant="subtitle">{course.name}</AppText>
                </View>
                <ChevronRight size={18} color={theme.textSecondary} />
              </View>
              <View style={styles.dateRow}>
                <AppBadge
                  label={t('study.credits', { count: course.credits })}
                  variant="neutral"
                />
                <AppBadge
                  label={
                    total === null
                      ? t('study.scorePending')
                      : `${total.toFixed(2)} / 10`
                  }
                  variant={total === null ? 'neutral' : 'success'}
                />
              </View>
            </AppCard>
          );
        })}
        <AppText style={styles.note}>{t('study.sampleNote')}</AppText>
      </View>
      <AppCard>
        <View style={styles.themeRow}>
          <AppText style={styles.sectionHeading}>{t('study.settings')}</AppText>
          <AppSwitch
            label={t('study.darkMode')}
            value={isDark}
            onValueChange={value => setTheme(value ? 'dark' : 'light')}
          />
          <View style={styles.chips}>
            <AppChip
              label="Tiếng Việt"
              selected={language === 'vi'}
              onPress={() => setLanguage('vi')}
            />
            <AppChip
              label="English"
              selected={language === 'en'}
              onPress={() => setLanguage('en')}
            />
          </View>
        </View>
      </AppCard>
      <ConfirmDialog
        visible={confirmCancel}
        title={t('study.unsavedTitle')}
        message={t('study.unsavedBody')}
        confirmText={t('study.discard')}
        cancelText={t('study.stay')}
        onConfirm={() => {
          setConfirmCancel(false);
          setEditing(false);
          setErrors({});
        }}
        onCancel={() => setConfirmCancel(false)}
        destructive
      />
    </StudyPage>
  );
}
