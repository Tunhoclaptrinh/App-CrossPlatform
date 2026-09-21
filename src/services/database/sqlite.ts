import { open, DB, QueryResult } from '@op-engineering/op-sqlite';

let dbInstance: DB | null = null;

export const database = {
  getDb(name: string = 'app_local.db'): DB {
    if (!dbInstance) {
      dbInstance = open({ name });
    }
    return dbInstance;
  },

  async initTables(): Promise<void> {
    try {
      const db = this.getDb();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS notes (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          content TEXT,
          created_at INTEGER NOT NULL
        );
      `);
    } catch (e) {
      console.error('[database] Error initializing tables:', e);
    }
  },

  async executeQuery<T = any>(query: string, params?: any[]): Promise<T[]> {
    try {
      const db = this.getDb();
      const result: QueryResult = await db.execute(query, params);
      return (result.rows || []) as unknown as T[];
    } catch (e) {
      console.error('[database] Error executing query:', query, e);
      return [];
    }
  },

  async executeUpdate(query: string, params?: any[]): Promise<number | undefined> {
    try {
      const db = this.getDb();
      const result: QueryResult = await db.execute(query, params);
      return result.rowsAffected;
    } catch (e) {
      console.error('[database] Error executing update:', query, e);
      return 0;
    }
  },
};