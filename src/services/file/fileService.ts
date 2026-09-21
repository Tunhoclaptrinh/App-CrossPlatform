import { database } from '@/services/database/sqlite';
import { shareHelper } from '@/utils/share';
import type { FileInfo } from './types';

/**
 * Universal Local File Management & Document Storage Service
 * Luu tru file noi bo voi SQLite JSI, ho tro doc, ghi, xoa va xuat file ra ngoai ung dung qua Native Share Sheet.
 */
export const fileService = {
  async init(): Promise<void> {
    try {
      const db = database.getDb();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS app_files (
          filename TEXT PRIMARY KEY NOT NULL,
          content TEXT NOT NULL,
          size INTEGER NOT NULL,
          mime_type TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        );
      `);
    } catch (e) {
      console.error('[fileService] Error initializing files table:', e);
    }
  },

  /**
   * Luu noi dung van ban / string vao file cuc bo
   */
  async saveFile(
    filename: string,
    content: string,
    mimeType: string = 'text/plain'
  ): Promise<FileInfo> {
    await this.init();
    const size = typeof Blob !== 'undefined' ? new Blob([content]).size : content.length;
    const updatedAt = Date.now();

    await database.executeUpdate(
      `INSERT OR REPLACE INTO app_files (filename, content, size, mime_type, updated_at)
       VALUES (?, ?, ?, ?, ?);`,
      [filename, content, size, mimeType, updatedAt]
    );

    return {
      id: filename,
      filename,
      size,
      mimeType,
      updatedAt,
    };
  },

  /**
   * Doc noi dung file duoi dang text
   */
  async readFile(filename: string): Promise<string | null> {
    await this.init();
    const rows = await database.executeQuery<{ content: string }>(
      'SELECT content FROM app_files WHERE filename = ? LIMIT 1;',
      [filename]
    );
    return rows.length > 0 ? rows[0].content : null;
  },

  /**
   * Luu du lieu Object duoi dang file JSON
   */
  async saveJson<T>(filename: string, data: T): Promise<FileInfo> {
    return this.saveFile(filename, JSON.stringify(data, null, 2), 'application/json');
  },

  /**
   * Doc file JSON va parse thanh Object
   */
  async readJson<T>(filename: string): Promise<T | null> {
    const raw = await this.readFile(filename);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  /**
   * Xoa file cuc bo theo ten file
   */
  async deleteFile(filename: string): Promise<boolean> {
    await this.init();
    const affected = await database.executeUpdate(
      'DELETE FROM app_files WHERE filename = ?;',
      [filename]
    );
    return (affected || 0) > 0;
  },

  /**
   * Danh sach tat ca file dang luu trong thiet bi
   */
  async listFiles(): Promise<FileInfo[]> {
    await this.init();
    const rows = await database.executeQuery<{
      filename: string;
      size: number;
      mime_type: string;
      updated_at: number;
    }>('SELECT filename, size, mime_type, updated_at FROM app_files ORDER BY updated_at DESC;');

    return rows.map((r) => ({
      id: r.filename,
      filename: r.filename,
      size: r.size,
      mimeType: r.mime_type,
      updatedAt: r.updated_at,
    }));
  },

  /**
   * Xuat file / Chia se file ra ngoai qua Native Share Sheet
   */
  async exportFile(filename: string): Promise<boolean> {
    const content = await this.readFile(filename);
    if (!content) return false;
    return shareHelper.shareText(filename, content);
  },
};
