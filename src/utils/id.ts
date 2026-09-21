/* eslint-disable no-bitwise */
/**
 * Unique ID Generation Utilities
 * Cung cấp các phương thức sinh định danh ngẫu nhiên chuẩn RFC4122 UUID v4,
 * NanoID URL-friendly, và mã rút gọn cho giao dịch / bản ghi offline.
 */

/**
 * Sinh chuỗi UUID v4 chuẩn RFC4122 (VD: 3b241101-e2bb-4255-8caf-4136c566a964)
 */
export function generateId(prefix?: string): string {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const uuid = template.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return prefix ? `${prefix}_${uuid}` : uuid;
}

/**
 * Sinh chuỗi NanoID ngắn gọn, an toàn trên URL (VD: V1StGXR8_Z5jdHi6B-myT)
 */
export function generateNanoId(size: number = 21): string {
  const alphabet = 'useandom-26T1983_40STAkjlqyfzhbvgc5PQrqsNxXrZ';
  let id = '';
  for (let i = 0; i < size; i++) {
    id += alphabet[(Math.random() * alphabet.length) | 0];
  }
  return id;
}

/**
 * Sinh mã rút gọn gồm chữ hoa và số (dành cho mã đơn hàng, OTP, reference code)
 */
export function generateShortCode(length: number = 6): string {
  const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Sinh ID sắp xếp theo thời gian (Timestamp-based sortable ID)
 */
export function generateTimestampId(prefix?: string): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  const id = `${timestamp}_${randomPart}`;
  return prefix ? `${prefix}_${id}` : id;
}
