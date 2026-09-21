# AGENTS.md — Workspace Guidelines & Rules for AI Agents

Welcome AI Agent. This repository is a production-ready **Universal React Native Base Application** (TypeScript + React Native 0.87+ New Architecture).

## ⚠️ Mandatory Rules for Any Refactoring or Code Updates

1. **Synchronize Documentation & Skills**:
   - Whenever you add, modify, or refactor any code (components, hooks, state, services, routes):
     - MUST update `.agents/skills/react-native-base/SKILL.md`
     - MUST update `docs/CONVENTIONS.md`
     - MUST update `README.md`
2. **Unified Global State (`src/hooks/useAppStore.ts`)**:
   - All global state (Theme, Language, User, Tokens) must be managed centrally in `useAppStore` with Zustand + AsyncStorage persistence.
   - Do not create fragmented storage listeners or rogue state managers.
3. **Strictly No Inline Styles**:
   - Always place styles in a companion `styles.ts` file using `StyleSheet.create()`.
   - Always use design tokens from `@/constants` (`Colors`, `Spacing`, `BorderRadius`, `Typography`, `Shadows`).
4. **Always Wrap Screens with `ScreenWrapper`**:
   - Ensure SafeArea, keyboard handling, and Dark Mode responsiveness.
5. **Quality Verification Gates (Pre-flight Checklist)**:
   - Before completing any task, you must execute and verify:
     1. `npm run lint` -> **Must pass with 0 errors, 0 warnings**
     2. `npx tsc --noEmit` -> **Must pass with 0 errors**
     3. `npm test` -> **Must pass 100%**

Detailed specifications are available in `.agents/rules/maintenance.md`, `docs/CONVENTIONS.md`, and `.agents/skills/react-native-base/SKILL.md`.