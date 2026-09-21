/**
 * File Helpers & MIME Validation Utilities
 * Cung cấp tiện ích tra cứu MIME type, phân loại tệp và kiểm tra ràng buộc dung lượng.
 */

const MIME_MAP: Record<string, string> = {
  // Images
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  bmp: 'image/bmp',

  // Documents
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
  csv: 'text/csv',
  json: 'application/json',

  // Audio / Video / Archives
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
};

/**
 * Tra cứu MIME type tương ứng theo tên tệp
 */
export function getMimeType(filename: string): string {
  if (!filename) return 'application/octet-stream';
  const clean = filename.split('?')[0].split('#')[0];
  const ext = clean.split('.').pop()?.toLowerCase() || '';
  return MIME_MAP[ext] || 'application/octet-stream';
}

/**
 * Kiểm tra xem tệp có phải là hình ảnh hay không
 */
export function isImageFile(filename: string): boolean {
  const mime = getMimeType(filename);
  return mime.startsWith('image/');
}

/**
 * Kiểm tra xem tệp có phải là tài liệu văn phòng hay PDF không
 */
export function isDocumentFile(filename: string): boolean {
  const mime = getMimeType(filename);
  return (
    mime === 'application/pdf' ||
    mime.includes('word') ||
    mime.includes('spreadsheet') ||
    mime.includes('presentation') ||
    mime === 'text/plain' ||
    mime === 'text/csv'
  );
}

export interface FileConstraintOptions {
  maxSizeInMb?: number;
  allowedExtensions?: string[];
}

export interface FileConstraintResult {
  valid: boolean;
  error?: string;
}

/**
 * Kiểm tra các ràng buộc về dung lượng và định dạng mở rộng của tệp
 */
export function checkFileConstraints(
  filename: string,
  sizeInBytes: number,
  options: FileConstraintOptions = {}
): FileConstraintResult {
  const { maxSizeInMb = 10, allowedExtensions } = options;

  if (sizeInBytes > maxSizeInMb * 1024 * 1024) {
    return {
      valid: false,
      error: `Tệp vượt quá dung lượng tối đa cho phép (${maxSizeInMb} MB)`,
    };
  }

  if (allowedExtensions && allowedExtensions.length > 0) {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const normalizedAllowed = allowedExtensions.map((e) => e.replace('.', '').toLowerCase());
    if (!normalizedAllowed.includes(ext)) {
      return {
        valid: false,
        error: `Định dạng tệp .${ext} không nằm trong danh sách cho phép (${normalizedAllowed.join(', ')})`,
      };
    }
  }

  return { valid: true };
}

export const fileUtils = {
  getMimeType,
  isImageFile,
  isDocumentFile,
  checkFileConstraints,
};
