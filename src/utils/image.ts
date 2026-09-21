/**
 * Image Utilities & Helpers
 * Cung cấp các tiện ích xử lý định dạng Data URI, kích thước ảnh,
 * phần mở rộng và link ảnh placeholder dự phòng.
 */

/**
 * Chuẩn hóa chuỗi base64 thành Data URI hoàn chỉnh cho thẻ <Image source={{ uri }} />
 */
export function formatDataUri(base64: string, mimeType: string = 'image/jpeg'): string {
  if (!base64) return '';
  if (base64.startsWith('data:image/')) return base64;
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Kiểm tra xem chuỗi có phải là Data URI Base64 hợp lệ không
 */
export function isBase64Image(str: string): boolean {
  if (!str) return false;
  return str.startsWith('data:image/') && str.includes(';base64,');
}

/**
 * Rà soát dung lượng tệp ảnh có vượt quá giới hạn MB cho phép không
 */
export function validateImageSize(sizeInBytes: number, maxMb: number = 5): boolean {
  const maxBytes = maxMb * 1024 * 1024;
  return sizeInBytes > 0 && sizeInBytes <= maxBytes;
}

/**
 * Trích xuất phần mở rộng của ảnh từ tên file hoặc URI (VD: 'avatar.png' -> 'png')
 */
export function getImageExtension(uriOrName: string): string {
  if (!uriOrName) return 'jpg';
  const clean = uriOrName.split('?')[0].split('#')[0];
  const parts = clean.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return 'jpg';
}

/**
 * Tạo URL ảnh placeholder chuẩn SVG/PNG dự phòng khi ảnh tải lỗi
 */
export function generatePlaceholder(width: number = 300, height: number = 200, text?: string): string {
  const label = encodeURIComponent(text || `${width}x${height}`);
  return `https://placehold.co/${width}x${height}/2563eb/ffffff?text=${label}`;
}

export const imageHelper = {
  formatDataUri,
  isBase64Image,
  validateImageSize,
  getImageExtension,
  generatePlaceholder,
};
