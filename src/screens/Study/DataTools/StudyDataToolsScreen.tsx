import React, { useState } from 'react';
import { View } from 'react-native';
import {
  ArchiveRestore,
  CalendarRange,
  Download,
  Upload,
  Trash2,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppButton,
  AppCard,
  AppInput,
  AppListGroup,
  AppListItem,
  AppText,
  ConfirmDialog,
} from '@/components';
import { StudyPage } from '@/components/common/StudyPage';
import { useToast } from '@/components/common/AppToast';
import { useAppStore } from '@/hooks/useAppStore';
import { createStudyBackup, parseStudyBackup } from '@/utils/studyData';
import { formatStudyDate } from '@/utils/study';
import { shareHelper } from '@/utils/share';
import type { StudyBackup } from '@/types/study';
import type { RootStackParamList } from '@/navigation/types';
import { useStudyStyles, dataToolsStyles } from './styles';

export function StudyDataToolsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'StudyDataTools'>) {
  const { t, i18n } = useTranslation();
  const { styles, theme } = useStudyStyles();
  const data = useAppStore(s => s.studyData);
  const profile = useAppStore(s => s.studentProfile);
  const completion = useAppStore(s => s.assignmentCompletion);
  const failed = useAppStore(s => s.studyHydrationFailed);
  const restore = useAppStore(s => s.restoreStudyBackup);
  const reset = useAppStore(s => s.resetStudyData);
  const [mode, setMode] = useState<'export' | 'import' | null>(
    failed ? 'import' : null,
  );
  const [text, setText] = useState('');
  const [backup, setBackup] = useState<StudyBackup | null>(null);
  const [resetMode, setResetMode] = useState<'empty' | 'sample' | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const exportBackup = () => {
    setText(
      JSON.stringify(createStudyBackup(data, profile, completion), null, 2),
    );
    setMode('export');
    setError('');
  };
  const preview = () => {
    try {
      setBackup(parseStudyBackup(text));
      setError('');
    } catch {
      setError(t('study.backupInvalid'));
    }
  };
  return (
    <StudyPage
      title={t('study.dataTools')}
      onBack={navigation.goBack}
      scrollable
    >
      {!failed && (
        <>
          <AppListGroup title={t('study.studyWorkspace')}>
            <AppListItem
              title={data.term.label}
              subtitle={`${formatStudyDate(
                `${data.term.startsOn}T12:00:00`,
                i18n.language,
              )} – ${formatStudyDate(
                `${data.term.endsOn}T12:00:00`,
                i18n.language,
              )}`}
              leading={<CalendarRange color={theme.primary} />}
              onPress={() =>
                navigation.navigate('StudyEditor', { kind: 'term' })
              }
            />
            <AppListItem
              title={t('study.dataSummary', {
                courses: data.courses.length,
                sessions: data.sessions.length,
                assignments: data.assignments.length,
              })}
              subtitle={t(
                data.isSample
                  ? 'study.sampleWorkspace'
                  : 'study.personalWorkspace',
              )}
            />
          </AppListGroup>
          <AppListGroup
            title={t('study.backupTitle')}
            footer={t('study.backupPrivacy')}
          >
            <AppListItem
              title={t('study.createBackup')}
              subtitle={t('study.createBackupHint')}
              leading={<Download color={theme.primary} />}
              onPress={exportBackup}
            />
            <AppListItem
              title={t('study.restoreBackup')}
              subtitle={t('study.restoreBackupHint')}
              leading={<Upload color={theme.primary} />}
              onPress={() => {
                setMode('import');
                setText('');
                setError('');
              }}
            />
          </AppListGroup>
        </>
      )}
      {mode && (
        <AppCard>
          <View style={styles.stack}>
            <AppText variant="subtitle">
              {t(
                mode === 'export'
                  ? 'study.createBackup'
                  : 'study.restoreBackup',
              )}
            </AppText>
            <AppText variant="caption">
              {t(
                mode === 'export'
                  ? 'study.exportTextHint'
                  : 'study.restoreTextHint',
              )}
            </AppText>
            <AppInput
              multiline
              style={dataToolsStyles.backupField}
              scrollEnabled
              label={t('study.backupContent')}
              accessibilityLabel={t('study.backupContent')}
              value={text}
              onChangeText={setText}
              editable={mode === 'import' && !busy}
              error={error}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={5_000_000}
            />
            {mode === 'export' ? (
              <AppButton
                title={t('study.shareBackup')}
                onPress={async () => {
                  setBusy(true);
                  try {
                    await shareHelper.shareText(
                      `StudyFlow-${new Date().toISOString().slice(0, 10)}`,
                      text,
                    );
                  } finally {
                    setBusy(false);
                  }
                }}
                loading={busy}
              />
            ) : (
              <AppButton
                title={t('study.previewRestore')}
                onPress={preview}
                disabled={!text.trim() || busy}
              />
            )}
            {!failed && (
              <AppButton
                title={t('study.cancel')}
                variant="ghost"
                onPress={() => {
                  setMode(null);
                  setText('');
                  setError('');
                }}
                disabled={busy}
              />
            )}
          </View>
        </AppCard>
      )}
      {!failed && (
        <AppListGroup title={t('study.workspaceActions')}>
          <AppListItem
            title={t('study.startEmpty')}
            subtitle={t('study.startEmptyHint')}
            leading={<Trash2 color={theme.error} />}
            destructive
            onPress={() => setResetMode('empty')}
          />
          <AppListItem
            title={t('study.loadSample')}
            leading={<ArchiveRestore color={theme.primary} />}
            onPress={() => setResetMode('sample')}
          />
        </AppListGroup>
      )}
      <ConfirmDialog
        visible={Boolean(backup)}
        title={t('study.confirmRestore')}
        message={
          backup
            ? t('study.restorePreview', {
                name: backup.studentProfile.fullName,
                date: formatStudyDate(backup.createdAt, i18n.language, true),
                courses: backup.data.courses.length,
                sessions: backup.data.sessions.length,
                assignments: backup.data.assignments.length,
              })
            : ''
        }
        confirmText={t('study.restoreBackup')}
        cancelText={t('study.cancel')}
        destructive
        loading={busy}
        onCancel={() => {
          if (!busy) setBackup(null);
        }}
        onConfirm={async () => {
          if (!backup) return;
          setBusy(true);
          try {
            await restore(backup);
            setBackup(null);
            setMode(null);
            setText('');
            toast.success(t('study.restoreSuccess'));
          } catch {
            toast.error(t('study.saveError'));
          } finally {
            setBusy(false);
          }
        }}
      />
      <ConfirmDialog
        visible={Boolean(resetMode)}
        title={t(
          resetMode === 'sample' ? 'study.loadSample' : 'study.startEmpty',
        )}
        message={t('study.resetWarning')}
        confirmText={t('common.confirm')}
        cancelText={t('study.cancel')}
        destructive
        loading={busy}
        onCancel={() => {
          if (!busy) setResetMode(null);
        }}
        onConfirm={async () => {
          if (!resetMode) return;
          setBusy(true);
          try {
            await reset(resetMode);
            setResetMode(null);
            setMode(null);
            setText('');
            toast.success(t('study.workspaceReset'));
          } catch {
            toast.error(t('study.saveError'));
          } finally {
            setBusy(false);
          }
        }}
      />
    </StudyPage>
  );
}
