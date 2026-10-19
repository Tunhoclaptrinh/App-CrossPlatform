import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import {
  AppButton,
  AppCard,
  AppDateTimeInput,
  AppInput,
  AppSelect,
  AppSwitch,
  AppText,
  ConfirmDialog,
  EmptyState,
} from '@/components';
import { StudyPage } from '@/components/common/StudyPage';
import { useToast } from '@/components/common/AppToast';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemeMode } from '@/hooks/useThemeMode';
import { generateId } from '@/utils/id';
import { dateKey, isCompleted } from '@/utils/study';
import type { RootStackParamList } from '@/navigation/types';
import type { EditorDraft, PendingEditorAction } from './types';
import { styles } from './styles';

const number = (value: string) =>
  value.trim() ? Number(value.trim().replace(',', '.')) : NaN;
const time = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`;
const fromTime = (value: string) => new Date(`2026-01-01T${value}:00`);

export function StudyEditorScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'StudyEditor'>) {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useThemeMode();
  const data = useAppStore(s => s.studyData);
  const completion = useAppStore(s => s.assignmentCompletion);
  const save = useAppStore(s => s.saveStudyEntity);
  const saveTerm = useAppStore(s => s.updateStudyTerm);
  const { kind, id, courseId } = route.params;
  const course = data.courses.find(item => item.id === id);
  const session = data.sessions.find(item => item.id === id);
  const assignment = data.assignments.find(item => item.id === id);
  const grade = data.grades.find(item =>
    id ? item.id === id : item.courseId === courseId,
  );
  const selected =
    kind === 'course'
      ? course
      : kind === 'session'
      ? session
      : kind === 'assignment'
      ? assignment
      : grade;
  const [draft, setDraft] = useState<EditorDraft>(() => ({
    name: course?.name ?? '',
    code: course?.code ?? '',
    credits: String(course?.credits ?? 3),
    lecturer: course?.lecturer ?? '',
    semester: course?.semester ?? data.term.label,
    active: course?.active ?? true,
    description:
      kind === 'course'
        ? course?.description ?? ''
        : assignment?.description ?? '',
    courseId:
      (kind === 'session'
        ? session?.courseId
        : kind === 'assignment'
        ? assignment?.courseId
        : grade?.courseId) ??
      courseId ??
      data.courses.find(item => item.active)?.id ??
      data.courses[0]?.id ??
      '',
    weekday: session?.weekday ?? (new Date().getDay() + 6) % 7,
    startTime: fromTime(session?.startTime ?? '07:30'),
    endTime: fromTime(session?.endTime ?? '10:00'),
    room: session?.room ?? '',
    kind: session?.kind ?? 'lecture',
    title: assignment?.title ?? '',
    dueAt: assignment
      ? new Date(assignment.dueAt)
      : new Date(new Date().setHours(23, 59, 0, 0)),
    completed: assignment ? isCompleted(assignment, completion) : false,
    label: data.term.label,
    startsOn: new Date(`${data.term.startsOn}T12:00:00`),
    endsOn: new Date(`${data.term.endsOn}T12:00:00`),
    components: (
      grade?.components ?? [
        { name: 'attendance', weight: 0.1, score: null },
        { name: 'midterm', weight: 0.3, score: null },
        { name: 'final', weight: 0.6, score: null },
      ]
    ).map(part => ({
      name: t(`study.${part.name}`, { defaultValue: part.name }),
      weight: String(Number((part.weight * 100).toFixed(6))),
      score: part.score === null ? '' : String(part.score),
    })),
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingEditorAction>(null);
  const allowLeave = useRef(false);
  const writePending = useRef(false);
  usePreventRemove(dirty || saving, ({ data: removed }) => {
    if (allowLeave.current) navigation.dispatch(removed.action);
    else if (!writePending.current) setPendingAction(removed.action);
  });
  const change = <K extends keyof EditorDraft>(
    key: K,
    value: EditorDraft[K],
  ) => {
    setDraft(prev => ({ ...prev, [key]: value }));
    setDirty(true);
    setErrors({});
  };
  const submit = async () => {
    writePending.current = true;
    setSaving(true);
    setErrors({});
    try {
      if (kind === 'term')
        await saveTerm({
          label: draft.label,
          startsOn: dateKey(draft.startsOn),
          endsOn: dateKey(draft.endsOn),
        });
      else if (kind === 'course')
        await save('course', {
          id: id ?? generateId('course'),
          code: draft.code,
          name: draft.name,
          credits: number(draft.credits),
          lecturer: draft.lecturer,
          semester: draft.active ? data.term.label : draft.semester,
          active: draft.active,
          description: draft.description,
        });
      else if (kind === 'session')
        await save('session', {
          id: id ?? generateId('session'),
          courseId: draft.courseId,
          weekday: draft.weekday,
          startTime: time(draft.startTime),
          endTime: time(draft.endTime),
          room: draft.room,
          kind: draft.kind,
        });
      else if (kind === 'assignment')
        await save('assignment', {
          id: id ?? generateId('assignment'),
          courseId: draft.courseId,
          title: draft.title,
          description: draft.description,
          dueAt: draft.dueAt.toISOString(),
          completed: draft.completed,
        });
      else
        await save('grade', {
          id: grade?.id ?? `grade-${draft.courseId}`,
          courseId: draft.courseId,
          components: draft.components.map(part => ({
            name: part.name,
            weight: number(part.weight) / 100,
            score: part.score.trim() === '' ? null : number(part.score),
          })),
        });
      allowLeave.current = true;
      setDirty(false);
      toast.success(t('study.entitySaved'));
      if (navigation.isFocused()) navigation.goBack();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages: Record<string, string> = {};
        error.issues.forEach(issue => {
          messages[issue.path.join('.')] = t(`study.${issue.message}`, {
            defaultValue: t('study.invalidValue'),
          });
        });
        setErrors(messages);
        toast.error(t('study.fixFields'));
      } else
        toast.error(
          t(`study.${error instanceof Error ? error.message : 'saveError'}`, {
            defaultValue: t('study.saveError'),
          }),
        );
    } finally {
      writePending.current = false;
      setSaving(false);
    }
  };
  const input = (
    key:
      | 'name'
      | 'code'
      | 'credits'
      | 'lecturer'
      | 'semester'
      | 'description'
      | 'room'
      | 'title'
      | 'label',
    label: string,
    multiline = false,
  ) => (
    <AppInput
      key={key}
      label={t(`study.${label}`)}
      accessibilityLabel={t(`study.${label}`)}
      value={draft[key]}
      onChangeText={value => change(key, value)}
      error={errors[key]}
      editable={!saving}
      multiline={multiline}
      keyboardType={key === 'credits' ? 'number-pad' : 'default'}
      maxLength={multiline ? 10000 : 200}
    />
  );
  const missing =
    kind !== 'course' && kind !== 'term' && data.courses.length === 0;
  const invalid = id && kind !== 'term' && !selected;
  const title =
    kind === 'term'
      ? t('study.editTerm')
      : t(selected ? 'study.editEntity' : 'study.addEntity', {
          entity: t(`study.entity.${kind}`),
        });
  const weekdays = t('study.fullWeekdays', { returnObjects: true }) as string[];
  return (
    <StudyPage title={title} onBack={navigation.goBack} scrollable>
      {invalid ? (
        <EmptyState title={t('study.notFound')} />
      ) : missing ? (
        <EmptyState
          title={t('study.needCourse')}
          description={t('study.needCourseBody')}
          actionText={t('study.addCourse')}
          onActionPress={() =>
            navigation.replace('StudyEditor', { kind: 'course' })
          }
        />
      ) : (
        <>
          <AppCard>
            <View style={styles.fields}>
              {kind === 'course' && (
                <>
                  {input('code', 'courseCode')}
                  {input('name', 'courseName')}
                  {input('credits', 'creditsLabel')}
                  {input('lecturer', 'lecturer')}
                  {draft.active ? (
                    <AppText variant="caption">
                      {t('study.semester')}: {data.term.label}
                    </AppText>
                  ) : (
                    input('semester', 'semester')
                  )}
                  <AppSwitch
                    value={draft.active}
                    onValueChange={value => change('active', value)}
                    label={t('study.current')}
                    disabled={saving}
                  />
                  {input('description', 'description', true)}
                </>
              )}
              {(kind === 'assignment' ||
                kind === 'session' ||
                kind === 'grade') && (
                <AppSelect
                  label={t('study.courses')}
                  value={draft.courseId}
                  onSelect={value => change('courseId', value)}
                  options={data.courses.map(item => ({
                    value: item.id,
                    label: `${item.code} · ${item.name}`,
                  }))}
                  error={errors.courseId}
                  disabled={saving || (kind === 'grade' && Boolean(grade))}
                  searchable
                />
              )}
              {kind === 'assignment' && (
                <>
                  {input('title', 'assignmentName')}
                  {input('description', 'description', true)}
                  <AppDateTimeInput
                    label={t('study.deadlineDate')}
                    value={draft.dueAt}
                    onChange={value => change('dueAt', value)}
                    error={errors.dueAt}
                    disabled={saving}
                  />
                  <AppDateTimeInput
                    label={t('study.deadlineTime')}
                    mode="time"
                    value={draft.dueAt}
                    onChange={value => change('dueAt', value)}
                    disabled={saving}
                  />
                  <AppSwitch
                    label={t('study.completed')}
                    value={draft.completed}
                    onValueChange={value => change('completed', value)}
                    disabled={saving}
                  />
                </>
              )}
              {kind === 'session' && (
                <>
                  <AppSelect
                    label={t('study.weekday')}
                    value={draft.weekday}
                    onSelect={value => change('weekday', value)}
                    options={weekdays.map((label, value) => ({ label, value }))}
                    disabled={saving}
                  />
                  <AppDateTimeInput
                    label={t('study.startTime')}
                    mode="time"
                    value={draft.startTime}
                    onChange={value => change('startTime', value)}
                    error={errors.startTime}
                    disabled={saving}
                  />
                  <AppDateTimeInput
                    label={t('study.endTime')}
                    mode="time"
                    value={draft.endTime}
                    onChange={value => change('endTime', value)}
                    error={errors.endTime}
                    disabled={saving}
                  />
                  {input('room', 'room')}
                  <AppSelect
                    label={t('study.sessionKind')}
                    value={draft.kind}
                    onSelect={value => change('kind', value)}
                    options={[
                      { value: 'lecture' as const, label: t('study.lecture') },
                      {
                        value: 'practice' as const,
                        label: t('study.practice'),
                      },
                    ]}
                    disabled={saving}
                  />
                  <AppText variant="caption">
                    {t('study.weeklyRecurrence', { term: data.term.label })}
                  </AppText>
                </>
              )}
              {kind === 'term' && (
                <>
                  {input('label', 'semester')}
                  <AppDateTimeInput
                    label={t('study.termStart')}
                    value={draft.startsOn}
                    onChange={value => change('startsOn', value)}
                    error={errors.startsOn}
                    disabled={saving}
                  />
                  <AppDateTimeInput
                    label={t('study.termEnd')}
                    value={draft.endsOn}
                    onChange={value => change('endsOn', value)}
                    error={errors.endsOn}
                    disabled={saving}
                  />
                  <AppText variant="caption">{t('study.termEditHint')}</AppText>
                </>
              )}
              {kind === 'grade' && (
                <>
                  <AppText variant="caption">
                    {t('study.gradeEditHint')}
                  </AppText>
                  {draft.components.map((part, index) => {
                    const update = (key: keyof typeof part, value: string) => {
                      setDraft(previous => ({
                        ...previous,
                        components: previous.components.map((row, i) =>
                          i === index ? { ...row, [key]: value } : row,
                        ),
                      }));
                      setDirty(true);
                      setErrors({});
                    };
                    return (
                      <View key={index} style={styles.scoreRow}>
                        <AppInput
                          label={t('study.componentName')}
                          accessibilityLabel={`${t('study.componentName')} ${
                            index + 1
                          }`}
                          error={errors[`components.${index}.name`]}
                          value={part.name}
                          onChangeText={value => update('name', value)}
                          editable={!saving}
                        />
                        <View style={styles.row}>
                          <View style={styles.part}>
                            <AppInput
                              label={t('study.weightPercent')}
                              accessibilityLabel={`${t(
                                'study.weightPercent',
                              )} ${index + 1}`}
                              error={errors[`components.${index}.weight`]}
                              value={part.weight}
                              onChangeText={value => update('weight', value)}
                              keyboardType="decimal-pad"
                              editable={!saving}
                            />
                          </View>
                          <View style={styles.part}>
                            <AppInput
                              label={t('study.scoreTen')}
                              accessibilityLabel={`${t('study.scoreTen')} ${
                                index + 1
                              }`}
                              error={errors[`components.${index}.score`]}
                              value={part.score}
                              onChangeText={value => update('score', value)}
                              placeholder={t('study.scorePending')}
                              keyboardType="decimal-pad"
                              editable={!saving}
                            />
                          </View>
                        </View>
                        <AppButton
                          title={t('study.removeComponent')}
                          variant="ghost"
                          disabled={saving || draft.components.length <= 1}
                          onPress={() =>
                            change(
                              'components',
                              draft.components.filter(
                                (_part, i) => i !== index,
                              ),
                            )
                          }
                        />
                      </View>
                    );
                  })}
                  {errors.components && (
                    <AppText color={theme.error}>{errors.components}</AppText>
                  )}
                  <AppButton
                    title={t('study.addComponent')}
                    variant="outline"
                    onPress={() =>
                      change('components', [
                        ...draft.components,
                        { name: '', weight: '0', score: '' },
                      ])
                    }
                    disabled={saving || draft.components.length >= 12}
                  />
                </>
              )}
            </View>
          </AppCard>
          <View style={styles.actions}>
            <AppButton
              title={t('study.save')}
              onPress={submit}
              loading={saving}
            />
            <AppButton
              title={t('study.cancel')}
              variant="outline"
              onPress={navigation.goBack}
              disabled={saving}
            />
          </View>
        </>
      )}
      <ConfirmDialog
        visible={Boolean(pendingAction)}
        title={t('study.unsavedTitle')}
        message={t('study.unsavedBody')}
        confirmText={t('study.discard')}
        cancelText={t('study.stay')}
        onConfirm={() => {
          if (pendingAction) {
            navigation.dispatch(pendingAction);
            setPendingAction(null);
          }
        }}
        onCancel={() => setPendingAction(null)}
        destructive
      />
    </StudyPage>
  );
}
