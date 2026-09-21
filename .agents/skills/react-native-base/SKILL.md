---
name: react-native-base
description: Standard architectural patterns, unified state management, code conventions, and maintenance rules for this Universal React Native Base codebase.
---

# React Native Universal Base App Skill

This skill documents the conventions, directory structure, state protocols, and development workflows for this project. Any AI assistant or developer working on this codebase must follow these guidelines.

## 1. Project Directory Structure

- `src/assets/`: Static assets (images, custom icons, fonts). Export centrally via `src/assets/index.ts`.
- `src/constants/`:
  - `colors.ts`: Semantic color system (Light & Dark mode) and Palette (50–950).
  - `theme.ts`: Spacing (0–64), BorderRadius (none to pill), Typography, Shadows (cross-platform), Layout.
  - `config.ts`: AppConfig (version, build, API base URL, timeout, feature flags).
- `src/components/`:
  - `common/`: Reusable atomic UI. Each component is an isolated folder:
    - `AppText/`: `AppText.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppButton/`: `AppButton.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppInput/`: `AppInput.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppCard/`: `AppCard.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppBadge/`: `AppBadge.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppLogo/`: `AppLogo.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppHeader/`: `AppHeader.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppSearchBar/`: `AppSearchBar.tsx`, `styles.ts`, `types.ts`, `constants.ts`, `index.ts`.
    - `AppCheckbox/`: `AppCheckbox.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `AppSwitch/`: `AppSwitch.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `ConfirmDialog/`: `ConfirmDialog.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `OfflineBanner/`: `OfflineBanner.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `OptimizedList/`: `OptimizedList.tsx`, `styles.ts`, `types.ts`, `constants.ts`, `index.ts`.
    - `ScreenWrapper/`: `ScreenWrapper.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `Skeleton/`: `Skeleton.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `EmptyState/`: `EmptyState.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `LoadingOverlay/`: `LoadingOverlay.tsx`, `styles.ts`, `types.ts`, `index.ts`.
    - `ErrorBoundary/`: `ErrorBoundary.tsx`, `styles.ts`, `types.ts`, `index.ts`.
  - `toast/`: In-app spring notification system (`ToastProvider`, `useToast`).
- `src/services/`:
  - `api/`: `apiClient.ts` for universal REST APIs & AI endpoints, with strict types defined in `types.ts`.
  - `storage/`: `appStorage.ts` for type-safe AsyncStorage persistence.
  - `database/`: `sqlite.ts` for ultra-fast C++ JSI relational database via `@op-engineering/op-sqlite`.
  - `file/`: `fileService.ts` for local document management (read, write, list, delete, JSON storage, and export via Native Share Sheet).
  - `update/`: `appUpdate.ts` for version tracking and update prompting.
- `src/types/`:
  - `api.ts`: Re-export API request & response types (`ApiResponse`, `ApiError`, `PaginatedResponse`, `AiChatRequest`, etc.).
  - `models.ts`: Core domain models (`User`, `MenuItem`).
  - `index.ts`: Re-export all type declarations.
- `src/hooks/`:
  - `useAppStore.ts`: **Unified Global Store (Zustand + AsyncStorage persistence)**:
    - Theme (`themeMode`, `setThemeMode`, `toggleTheme`)
    - Language (`language`, `setLanguage` -> auto syncs with `i18n`)
    - User session (`user`, `setUser`, `logout`)
    - Metrics (`counter`, `increment`, `reset`)
  - Utilities & Performance:
    - `useNetworkStatus`: Internet connectivity detection with auto-recheck.
    - `useDebounce`: Delays state updates until typing/input stops.
    - `useThrottle`: Throttles high-frequency numeric/state updates.
    - `useThrottleCallback`: Throttles button actions to prevent duplicate spam clicks.
    - `useToggle`: Boolean state toggle.
    - `usePrevious`: Tracks previous render values.
  - Hardware & Device:
    - `useThemeMode`: Theme mode resolution.
    - `useKeyboard`: Keyboard visibility and height.
    - `useAppState`: App foreground/background lifecycle.
    - `useBackHandler`: Custom hardware back press handling.
    - `useDoubleBackExit`: Double-tap back exit guard for Android home screen.
  - Asynchronous:
    - `useAsync`: Handles loading, data, and error state for async promises.
  - In-App Toast:
    - `useToast`: Trigger in-app toast alerts from any component.
- `src/utils/`:
  - `haptics.ts`: Hardware tactile vibration feedback (`light`, `medium`, `heavy`, `success`, `error`, `cancel`).
  - `share.ts`: Native OS Share Sheet helper (`shareText`, `shareUrl`).
  - `permissions.ts`: Mobile runtime permissions helper (Camera, Photos, Notifications).
  - `helpers.ts`: Currency, date formatters.
  - `formatters.ts`: `removeVietnameseTones` (accent stripper for search), `timeAgo` (Vietnamese relative time), `truncate`, `formatFileSize`.
  - `validators.ts`: Regex-based fast validation (email, VN phone, password, url, numbers).
  - `schemas.ts`: Bilingual Zod schemas (`loginSchema`, `registerSchema`, `searchSchema`) and `validateWithZod(schema, data, t?)` UI error helper.
- `src/i18n/`: Multilingual system (vi, en) via `i18next` with structured namespaces (`common`, `validation`, `network`, `home`, `details`, `dialogs`, `splash`).
- `src/navigation/`: React Navigation v7 Native Stack (`AppNavigator`, `routes.ts`, `types.ts`, `linking.ts`).
- `src/screens/`: Feature screens (`Splash/`, `Home/`, `Details/`). Each screen has `Screen.tsx`, `styles.ts`, `index.ts`.

## 2. Mandatory Maintenance & Refactoring Rules

1. **Documentation Synchronization**:
   - Whenever you add, modify, or refactor code:
     - **MUST update** this file: `.agents/skills/react-native-base/SKILL.md`
     - **MUST update**: `docs/CONVENTIONS.md`
     - **MUST update**: `README.md`
2. **Component Isolation Protocol**:
   - Every reusable component must reside in its own folder under `src/components/common/ComponentName/` with separate `ComponentName.tsx`, `styles.ts`, `types.ts`, and `index.ts`.
3. **Crash Resilience & Error Boundary**:
   - `App.tsx` must always wrap the component tree with `<ErrorBoundary>` to catch unhandled JS render errors and prevent native app crashes.
4. **Unified Global State Protocol**:
   - All shared cross-screen state (Theme, Language, User, Tokens) must be managed centrally in `useAppStore`.
5. **Strictly No Inline Styles**:
   - Always create a companion `styles.ts` using `StyleSheet.create()`.
   - Use tokens from `@/constants` (`Spacing`, `BorderRadius`, `Colors`, `Typography`, `Shadows`).
6. **Quality Verification Rules**:
   - Always verify changes with:
     1. `npm run lint` (ESLint: must pass with 0 errors and 0 warnings)
     2. `npx tsc --noEmit` (TypeScript: must pass with 0 errors)
     3. `npm test` (Jest: all test suites must pass)

## 3. How to Use Common Features

### 3.1. Form Validation with Zod & Bilingual i18n
```typescript
import { validateWithZod, loginSchema } from '@/utils';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const handleLogin = () => {
  // Pass t translator to automatically translate error messages based on active language
  const result = validateWithZod(loginSchema, { email, password }, t);
  if (!result.success) {
    setFieldErrors(result.errors);
    return;
  }
};
```

### 3.2. ConfirmDialog Modal
```typescript
import { ConfirmDialog } from '@/components';

<ConfirmDialog
  visible={isOpen}
  title="Xóa bản ghi?"
  message="Hành động này không thể hoàn tác."
  destructive={true}
  confirmText="Xóa"
  onConfirm={handleDelete}
  onCancel={() => setIsOpen(false)}
/>
```

### 3.3. Requesting Device Permissions
```typescript
import { permissions } from '@/utils';

const handleScanQr = async () => {
  const hasPermission = await permissions.requestCamera();
  if (hasPermission) {
    // Open scanner
  }
};
```

### 3.4. High-Performance List
```typescript
import { OptimizedList } from '@/components';

<OptimizedList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ProductCard item={item} />}
  loading={isLoading}
  refreshing={isRefreshing}
  onRefresh={fetchLatestData}
/>
```

### 3.5. Device Vibration & Haptic Feedback
```typescript
import { haptics } from '@/utils';

// Trigger on button clicks, form toggles, or action completions
haptics.light();   // subtle tap
haptics.success(); // double light buzz for success
haptics.error();   // heavy buzz for validation failure
```

### 3.6. Local File I/O & Native Sharing
```typescript
import { fileService } from '@/services/file';

// Save and read files in SQLite JSI storage
await fileService.saveFile('report.txt', 'Content...');
const content = await fileService.readFile('report.txt');

// Save and read typed JSON
await fileService.saveJson('config.json', { theme: 'dark', version: 1 });
const config = await fileService.readJson<{ theme: string }>('config.json');

// Export or share file externally via OS Share Sheet
await fileService.exportFile('report.txt');
```

