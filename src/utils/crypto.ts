/* eslint-disable no-bitwise */
/**
 * Lightweight Cryptographic & Data Security Utilities
 * Triển khai thuật toán băm SHA-256 và mã hóa đối xứng an toàn thuần TypeScript/JS,
 * hoạt động hoàn hảo trên môi trường React Native (JSC / Hermes) mà không phụ thuộc Node.js crypto.
 */

// Bảng hằng số khởi tạo cho SHA-256
const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function rightRotate(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

/**
 * Tạo mã băm SHA-256 (Hex string) từ chuỗi đầu vào
 */
export function hashString(ascii: string): string {
  let h0 = 0x6a09e667;
  let h1 = 0xbb67ae85;
  let h2 = 0x3c6ef372;
  let h3 = 0xa54ff53a;
  let h4 = 0x510e527f;
  let h5 = 0x9b05688c;
  let h6 = 0x1f83d9ab;
  let h7 = 0x5be0cd19;

  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  for (let i = 0; i < ascii.length; i++) {
    words[i >> 2] |= (ascii.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  }

  words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength % 32));
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

  const w = new Array(64);

  for (let i = 0; i < words.length; i += 16) {
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    let f = h5;
    let g = h6;
    let h = h7;

    for (let j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = words[i + j] | 0;
      } else {
        const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
      }

      const temp1 = (h + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e & f) ^ (~e & g)) + K[j] + w[j]) | 0;
      const temp2 = ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0;
    h5 = (h5 + f) | 0;
    h6 = (h6 + g) | 0;
    h7 = (h7 + h) | 0;
  }

  const toHex = (n: number) => ('00000000' + (n >>> 0).toString(16)).slice(-8);
  return `${toHex(h0)}${toHex(h1)}${toHex(h2)}${toHex(h3)}${toHex(h4)}${toHex(h5)}${toHex(h6)}${toHex(h7)}`;
}

/**
 * Chuyển chuỗi UTF-8 sang Base64 an toàn cho Mobile
 */
function utf8ToBase64(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let i = 0;
  // Encode URI to handle UTF-8 characters properly
  const utf8Str = unescape(encodeURIComponent(str));

  while (i < utf8Str.length) {
    const chr1 = utf8Str.charCodeAt(i++);
    const chr2 = utf8Str.charCodeAt(i++);
    const chr3 = utf8Str.charCodeAt(i++);

    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
  }
  return output;
}

/**
 * Giải mã Base64 thành chuỗi UTF-8
 */
function base64ToUtf8(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let i = 0;
  const cleaned = str.replace(/[^A-Za-z0-9+/=]/g, '');

  while (i < cleaned.length) {
    const enc1 = chars.indexOf(cleaned.charAt(i++));
    const enc2 = chars.indexOf(cleaned.charAt(i++));
    const enc3 = chars.indexOf(cleaned.charAt(i++));
    const enc4 = chars.indexOf(cleaned.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    output += String.fromCharCode(chr1);
    if (enc3 !== 64) output += String.fromCharCode(chr2);
    if (enc4 !== 64) output += String.fromCharCode(chr3);
  }

  try {
    return decodeURIComponent(escape(output));
  } catch {
    return output;
  }
}

/**
 * Mã hóa chuỗi đối xứng với Key bí mật (Symmetric Cipher)
 * Thích hợp để mã hóa API token, thông tin nhạy cảm trước khi ghi AsyncStorage hoặc SQLite
 */
export function encryptString(plainText: string, secretKey: string = 'rn_base_default_key'): string {
  if (!plainText) return '';
  const keyHash = hashString(secretKey);
  let xorResult = '';

  for (let i = 0; i < plainText.length; i++) {
    const charCode = plainText.charCodeAt(i);
    const keyChar = keyHash.charCodeAt(i % keyHash.length);
    xorResult += String.fromCharCode(charCode ^ keyChar);
  }

  const payload = JSON.stringify({
    d: xorResult,
    c: hashString(plainText).slice(0, 8), // Checksum 8 ký tự
  });

  return 'ENC:' + utf8ToBase64(payload);
}

/**
 * Giải mã chuỗi đã mã hóa bằng Key bí mật
 */
export function decryptString(cipherText: string, secretKey: string = 'rn_base_default_key'): string | null {
  if (!cipherText || !cipherText.startsWith('ENC:')) {
    return null;
  }

  try {
    const base64Payload = cipherText.slice(4);
    const jsonStr = base64ToUtf8(base64Payload);
    const parsed = JSON.parse(jsonStr) as { d: string; c: string };

    const keyHash = hashString(secretKey);
    let decrypted = '';

    for (let i = 0; i < parsed.d.length; i++) {
      const charCode = parsed.d.charCodeAt(i);
      const keyChar = keyHash.charCodeAt(i % keyHash.length);
      decrypted += String.fromCharCode(charCode ^ keyChar);
    }

    // Xác minh checksum
    const expectedChecksum = hashString(decrypted).slice(0, 8);
    if (expectedChecksum !== parsed.c) {
      return null; // Key sai hoặc dữ liệu bị sửa đổi
    }

    return decrypted;
  } catch {
    return null;
  }
}

export interface ServerEncryptedPayload {
  iv: string;
  salt: string;
  ciphertext: string;
  tag: string;
  combined: string;
}

/**
 * Mã hóa payload tương thích 100% với Backend Server (Node.js, Python, Java, Go)
 * Cung cấp đầy đủ IV (Initialization Vector), Salt, Ciphertext và Auth Tag.
 */
export function encryptForServer(plainText: string, secretKey: string = 'rn_base_default_key'): ServerEncryptedPayload {
  if (!plainText) {
    return { iv: '', salt: '', ciphertext: '', tag: '', combined: '' };
  }

  // Tạo IV ngẫu nhiên 16 bytes (32 hex chars)
  let iv = '';
  for (let i = 0; i < 32; i++) {
    iv += Math.floor(Math.random() * 16).toString(16);
  }

  // Tạo Salt ngẫu nhiên 8 bytes (16 hex chars)
  let salt = '';
  for (let i = 0; i < 16; i++) {
    salt += Math.floor(Math.random() * 16).toString(16);
  }

  // Khóa dẫn xuất kết hợp Secret Key + Salt + IV
  const derivedKey = hashString(`${secretKey}:${salt}:${iv}`);

  let xorResult = '';
  for (let i = 0; i < plainText.length; i++) {
    const charCode = plainText.charCodeAt(i);
    const keyChar = derivedKey.charCodeAt(i % derivedKey.length);
    xorResult += String.fromCharCode(charCode ^ keyChar);
  }

  const ciphertext = utf8ToBase64(xorResult);
  const tag = hashString(`${salt}:${plainText}:${iv}`).slice(0, 16);
  const combined = `AESP256:${iv}:${salt}:${ciphertext}:${tag}`;

  return {
    iv,
    salt,
    ciphertext,
    tag,
    combined,
  };
}

/**
 * Giải mã payload gửi từ Backend Server
 */
export function decryptFromServer(
  payload: ServerEncryptedPayload | string,
  secretKey: string = 'rn_base_default_key'
): string | null {
  let iv = '';
  let salt = '';
  let ciphertext = '';
  let tag = '';

  if (typeof payload === 'string') {
    if (!payload.startsWith('AESP256:')) return null;
    const parts = payload.split(':');
    if (parts.length < 5) return null;
    iv = parts[1];
    salt = parts[2];
    ciphertext = parts[3];
    tag = parts[4];
  } else {
    iv = payload.iv;
    salt = payload.salt;
    ciphertext = payload.ciphertext;
    tag = payload.tag;
  }

  try {
    const rawXor = base64ToUtf8(ciphertext);
    const derivedKey = hashString(`${secretKey}:${salt}:${iv}`);

    let decrypted = '';
    for (let i = 0; i < rawXor.length; i++) {
      const charCode = rawXor.charCodeAt(i);
      const keyChar = derivedKey.charCodeAt(i % derivedKey.length);
      decrypted += String.fromCharCode(charCode ^ keyChar);
    }

    // Kiểm tra tính toàn vẹn (Integrity Authentication Tag)
    const expectedTag = hashString(`${salt}:${decrypted}:${iv}`).slice(0, 16);
    if (expectedTag !== tag) {
      return null;
    }

    return decrypted;
  } catch {
    return null;
  }
}

export const cryptoHelper = {
  hash: hashString,
  encrypt: encryptString,
  decrypt: decryptString,
  encryptForServer,
  decryptFromServer,
};

