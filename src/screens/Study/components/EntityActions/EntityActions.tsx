import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton, ConfirmDialog } from '@/components';
import { useToast } from '@/components/common/AppToast';
import { useAppStore } from '@/hooks/useAppStore';
import type { EntityActionsProps } from './types';
import { styles } from './styles';
export function EntityActions({ kind, id, onDeleted }: EntityActionsProps) {
  const { t } = useTranslation();
  const data = useAppStore(s => s.studyData);
  const remove = useAppStore(s => s.deleteStudyEntity);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const label = t(
    kind === 'grade' ? 'study.clearGrades' : 'study.deleteEntity',
    { entity: t(`study.entity.${kind}`) },
  );
  const message =
    kind === 'course'
      ? t('study.deleteCourseWarning', {
          sessions: data.sessions.filter(item => item.courseId === id).length,
          assignments: data.assignments.filter(item => item.courseId === id)
            .length,
          grades: data.grades.filter(item => item.courseId === id).length,
        })
      : t(
          kind === 'grade'
            ? 'study.clearGradesWarning'
            : kind === 'session'
            ? 'study.deleteSessionWarning'
            : 'study.deleteWarning',
        );
  return (
    <View style={styles.root}>
      <AppButton
        title={label}
        variant="danger"
        onPress={() => setConfirm(true)}
      />
      <ConfirmDialog
        visible={confirm}
        title={label}
        message={message}
        confirmText={t('study.confirmDelete')}
        cancelText={t('study.cancel')}
        loading={busy}
        destructive
        onCancel={() => {
          if (!busy) setConfirm(false);
        }}
        onConfirm={async () => {
          setBusy(true);
          try {
            await remove(kind, id);
            setConfirm(false);
            toast.success(t('study.entityDeleted'));
            onDeleted?.();
          } catch {
            toast.error(t('study.saveError'));
          } finally {
            setBusy(false);
          }
        }}
      />
    </View>
  );
}
