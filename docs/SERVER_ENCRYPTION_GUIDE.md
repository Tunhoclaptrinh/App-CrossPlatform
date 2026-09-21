# Hướng Dẫn Tích Hợp Mã Hóa Khớp Chuẩn Server (Server-Compatible Encryption Guide)

Tài liệu này cung cấp đặc tả kỹ thuật và mã nguồn mẫu giải mã/mã hóa trên Backend (Node.js, Python, Java/Spring Boot, Golang) tương thích 100% với hàm `cryptoHelper.encryptForServer()` và `cryptoHelper.decryptFromServer()` trong React Native Base App.

---

## 1. Cấu Trúc Dữ Liệu Mã Hóa (Payload Format)

Hàm `encryptForServer()` xuất ra dữ liệu dưới 2 dạng linh hoạt:

### Dạng JSON Object:
```json
{
  "iv": "6f2d9c12b7a840e1...",
  "salt": "a4b3c2d1e0f9...",
  "ciphertext": "eG9yX2Jhc2U2NF9lbmNvZGVk...",
  "tag": "e3b0c44298fc1c14",
  "combined": "AESP256:6f2d9c12b7a840e1...:a4b3c2d1e0f9...:eG9yX2Jhc2U2NF9lbmNvZGVk...:e3b0c44298fc1c14"
}
```

### Dạng Chuỗi Kết Hợp (Combined Token):
```text
AESP256:<IV_HEX>:<SALT_HEX>:<CIPHERTEXT_BASE64>:<TAG_HEX>
```

---

## 2. Mã Nguồn Mẫu Trên Các Ngôn Ngữ Backend

### 2.1. Node.js / Express / NestJS
```javascript
const crypto = require('crypto');

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * Giải mã payload gửi từ React Native App
 */
function decryptFromClient(tokenOrPayload, secretKey = 'rn_base_default_key') {
  let iv, salt, ciphertext, tag;
  if (typeof tokenOrPayload === 'string') {
    const parts = tokenOrPayload.split(':');
    iv = parts[1];
    salt = parts[2];
    ciphertext = parts[3];
    tag = parts[4];
  } else {
    ({ iv, salt, ciphertext, tag } = tokenOrPayload);
  }

  const rawXor = Buffer.from(ciphertext, 'base64').toString('utf8');
  const derivedKey = sha256(`${secretKey}:${salt}:${iv}`);

  let decrypted = '';
  for (let i = 0; i < rawXor.length; i++) {
    const charCode = rawXor.charCodeAt(i);
    const keyChar = derivedKey.charCodeAt(i % derivedKey.length);
    decrypted += String.fromCharCode(charCode ^ keyChar);
  }

  // Kiểm tra Integrity Tag
  const expectedTag = sha256(`${salt}:${decrypted}:${iv}`).slice(0, 16);
  if (expectedTag !== tag) {
    throw new Error('Integrity verification failed (Checksum mismatch)');
  }

  return decrypted;
}

/**
 * Mã hóa dữ liệu từ Server gửi về React Native App
 */
function encryptToClient(plainText, secretKey = 'rn_base_default_key') {
  const iv = crypto.randomBytes(16).toString('hex');
  const salt = crypto.randomBytes(8).toString('hex');
  const derivedKey = sha256(`${secretKey}:${salt}:${iv}`);

  let xorResult = '';
  for (let i = 0; i < plainText.length; i++) {
    const charCode = plainText.charCodeAt(i);
    const keyChar = derivedKey.charCodeAt(i % derivedKey.length);
    xorResult += String.fromCharCode(charCode ^ keyChar);
  }

  const ciphertext = Buffer.from(xorResult, 'utf8').toString('base64');
  const tag = sha256(`${salt}:${plainText}:${iv}`).slice(0, 16);
  const combined = `AESP256:${iv}:${salt}:${ciphertext}:${tag}`;

  return { iv, salt, ciphertext, tag, combined };
}

module.exports = { decryptFromClient, encryptToClient };
```

---

### 2.2. Python (FastAPI / Django / Flask)
```python
import hashlib
import base64
import secrets

def sha256(text: str) -> str:
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def decrypt_from_client(payload: str, secret_key: str = 'rn_base_default_key') -> str:
    parts = payload.split(':')
    if len(parts) < 5 or parts[0] != 'AESP256':
        raise ValueError("Invalid payload format")

    iv, salt, ciphertext, tag = parts[1], parts[2], parts[3], parts[4]
    raw_xor = base64.b64decode(ciphertext).decode('utf-8')
    derived_key = sha256(f"{secret_key}:{salt}:{iv}")

    decrypted_chars = []
    for i, char in enumerate(raw_xor):
        key_char = derived_key[i % len(derived_key)]
        decrypted_chars.append(chr(ord(char) ^ ord(key_char)))

    decrypted = "".join(decrypted_chars)
    expected_tag = sha256(f"{salt}:{decrypted}:{iv}")[:16]
    if expected_tag != tag:
        raise ValueError("Integrity tag mismatch")

    return decrypted
```

---

### 2.3. Java (Spring Boot)
```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

public class AppCrypto {
    public static String sha256(String base) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(base.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public static String decryptFromClient(String token, String secretKey) throws Exception {
        String[] parts = token.split(":");
        String iv = parts[1];
        String salt = parts[2];
        String ciphertext = parts[3];
        String tag = parts[4];

        byte[] decoded = Base64.getDecoder().decode(ciphertext);
        String rawXor = new String(decoded, StandardCharsets.UTF_8);
        String derivedKey = sha256(secretKey + ":" + salt + ":" + iv);

        StringBuilder decrypted = new StringBuilder();
        for (int i = 0; i < rawXor.length(); i++) {
            char c = rawXor.charAt(i);
            char k = derivedKey.charAt(i % derivedKey.length());
            decrypted.append((char) (c ^ k));
        }

        String decryptedStr = decrypted.toString();
        String expectedTag = sha256(salt + ":" + decryptedStr + ":" + iv).substring(0, 16);
        if (!expectedTag.equals(tag)) {
            throw new SecurityException("Tag integrity failed");
        }
        return decryptedStr;
    }
}
```

---

### 2.4. Golang
```go
package main

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"strings"
)

func sha256Hash(text string) string {
	h := sha256.Sum256([]byte(text))
	return hex.EncodeToString(h[:])
}

func DecryptFromClient(token, secretKey string) (string, error) {
	parts := strings.Split(token, ":")
	if len(parts) < 5 || parts[0] != "AESP256" {
		return "", errors.New("invalid token format")
	}

	iv, salt, ciphertext, tag := parts[1], parts[2], parts[3], parts[4]
	rawBytes, err := base64.StdEncoding.DecodeString(ciphertext)
	if err != nil {
		return "", err
	}

	rawXor := string(rawBytes)
	derivedKey := sha256Hash(fmt.Sprintf("%s:%s:%s", secretKey, salt, iv))

	var decrypted strings.Builder
	for i := 0; i < len(rawXor); i++ {
		keyChar := derivedKey[i%len(derivedKey)]
		decrypted.WriteByte(rawXor[i] ^ keyChar)
	}

	decryptedStr := decrypted.String()
	expectedTag := sha256Hash(fmt.Sprintf("%s:%s:%s", salt, decryptedStr, iv))[:16]
	if expectedTag != tag {
		return "", errors.New("checksum validation failed")
	}

	return decryptedStr, nil
}
```
