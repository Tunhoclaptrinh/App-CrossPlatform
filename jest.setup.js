// Mock react-native-screens
try {
  require('react-native-screens/mock');
} catch (e) {}

// Mock async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock op-sqlite
jest.mock('@op-engineering/op-sqlite', () => {
  const store = new Map();
  return {
    open: jest.fn(() => ({
      execute: jest.fn((query, params = []) => {
        const lower = query.toLowerCase().trim();
        if (lower.startsWith('insert or replace into app_files')) {
          const [filename, content, size, mimeType, updatedAt] = params;
          store.set(filename, {
            filename,
            content,
            size,
            mime_type: mimeType,
            updated_at: updatedAt,
          });
          return { rowsAffected: 1, rows: [] };
        }
        if (lower.startsWith('select content from app_files where filename = ?')) {
          const file = store.get(params[0]);
          return {
            rows: file ? [{ content: file.content }] : [],
            rowsAffected: 0,
          };
        }
        if (lower.startsWith('select filename, size, mime_type, updated_at from app_files')) {
          const all = Array.from(store.values()).map((f) => ({
            filename: f.filename,
            size: f.size,
            mime_type: f.mime_type,
            updated_at: f.updated_at,
          }));
          return { rows: all, rowsAffected: 0 };
        }
        if (lower.startsWith('delete from app_files where filename = ?')) {
          const existed = store.delete(params[0]);
          return { rowsAffected: existed ? 1 : 0, rows: [] };
        }
        return { rows: [], rowsAffected: 0 };
      }),
      executeAsync: jest.fn(() => Promise.resolve({ rows: [], rowsAffected: 0 })),
      close: jest.fn(),
    })),
  };
});