# Lộ Trình Mở Rộng & Hướng Dẫn Tích Hợp Native Nâng Cao (Expansion Roadmap)

Tài liệu này hướng dẫn chi tiết cách nâng cấp dự án từ **Kiến trúc Core hiện tại** sang các tính năng đòi hỏi thư viện Native chuyên sâu khi dự án thực tế phát sinh nhu cầu.

---

## 1. Tích Hợp Thư Viện Chọn & Chụp Ảnh Native (`react-native-image-picker`)

Khi dự án cần chụp ảnh trực tiếp từ Camera máy thật hoặc chọn ảnh/video từ Album thiết bị:

### Bước 1: Cài đặt thư viện
```bash
npm install react-native-image-picker
```

### Bước 2: Cấu hình Android
Mở file `android/app/src/main/AndroidManifest.xml` và thêm các quyền (nếu chưa có):
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<!-- Cho Android 12 trở xuống -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
```

### Bước 3: Cấu hình iOS
Mở file `ios/ReactNative/Info.plist` và thêm các khóa xin quyền:
```xml
<key>NSCameraUsageDescription</key>
<string>Ứng dụng cần sử dụng Camera để chụp ảnh đại diện và hồ sơ.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Ứng dụng cần truy cập Thư viện ảnh để tải ảnh lên.</string>
```

### Bước 4: Code mẫu sử dụng với `imageHelper`
```typescript
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { formatDataUri, validateImageSize } from '@/utils';

// Chụp ảnh từ camera
export const takePhoto = async () => {
  const result = await launchCamera({
    mediaType: 'photo',
    quality: 0.8,
    includeBase64: true,
  });

  if (result.assets && result.assets.length > 0) {
    const asset = result.assets[0];
    if (asset.fileSize && !validateImageSize(asset.fileSize, 5)) {
      alert('Ảnh vượt quá 5MB!');
      return null;
    }
    return formatDataUri(asset.base64 || '', asset.type || 'image/jpeg');
  }
  return null;
};
```

---

## 2. Tích Hợp Trình Duyệt Webview Native (`react-native-webview`)

Khi dự án cần nhúng cổng thanh toán (VNPay, Momo, Stripe), xác thực mạng xã hội (OAuth 2.0) hoặc hiển thị nội dung HTML/CSS động phức tạp:

### Bước 1: Cài đặt
```bash
npm install react-native-webview
```
*Lưu ý:* Với iOS chạy `cd ios && pod install`, với Android New Architecture hệ thống sẽ tự động liên kết TurboModule.

### Bước 2: Thay thế lõi trong `src/components/common/AppWebView/AppWebView.tsx`
Thay thế phần `contentArea` bằng thẻ native `<WebView />`:
```tsx
import { WebView } from 'react-native-webview';

<WebView
  source={{ uri: url }}
  startInLoadingState={true}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  onNavigationStateChange={(navState) => {
    console.log('Current URL:', navState.url);
  }}
/>
```

---

## 3. Xây Dựng Widget Ngoài Màn Hình Chính (Home Screen Widgets)

Kiến trúc hiện tại đã có `widgetBridgeService` tự động kết xuất dữ liệu snapshot vào file `widget_snapshot.json` và `AsyncStorage`. Dưới đây là cách kết nối với Widget Native:

### 3.1. Android AppWidgetProvider (Kotlin)

1. Tạo file XML layout tại `android/app/src/main/res/layout/app_widget_layout.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    android:background="@drawable/widget_background">

    <TextView
        android:id="@+id/widget_title"
        android:text="Base App Widget"
        android:textStyle="bold"
        android:textColor="#FFFFFF"
        android:textSize="16sp" />

    <TextView
        android:id="@+id/widget_counter"
        android:text="Count: 0"
        android:textColor="#93C5FD"
        android:textSize="24sp" />
</LinearLayout>
```

2. Tạo `AppWidget.kt` đọc file `widget_snapshot.json` do `fileService` xuất:
```kotlin
package com.reactnative

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import org.json.JSONObject
import java.io.File

class AppWidget : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.app_widget_layout)

            // Đọc snapshot từ thư mục file SQLite/Database
            try {
                val file = File(context.filesDir, "widget_snapshot.json")
                if (file.exists()) {
                    val json = JSONObject(file.readText())
                    val counter = json.optInt("activeCount", 0)
                    views.setTextViewText(R.id.widget_counter, "Counter: $counter")
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
```

### 3.2. iOS WidgetKit (SwiftUI)

1. Trong Xcode, thêm Target mới: **File -> New -> Target -> Widget Extension** (đặt tên là `AppWidgetExtension`).
2. Bật tính năng **App Groups** cho cả Target chính và Widget Target (ví dụ: `group.com.yourcompany.app`).
3. Trong Widget SwiftUI, đọc dữ liệu từ `UserDefaults(suiteName: "group.com.yourcompany.app")`.

---

## 4. Tích Hợp Sinh Trắc Học Native Chuyên Sâu (`react-native-biometrics`)

Kiến trúc hiện tại trong `src/services/biometrics/` đã có sẵn Interface và Fallback xác thực tương thích 100%. Khi cần kích hoạt bảo mật phần cứng KeyStore/Keychain Native:

### Bước 1: Cài đặt
```bash
npm install react-native-biometrics
```

### Bước 2: Chạy lại ứng dụng Android / iOS
```bash
npm run android
# hoặc
npm run ios
```
Lúc này, `biometricService` sẽ tự động phát hiện `NativeModules.ReactNativeBiometrics` và gọi cảm biến vân tay/Face ID phần cứng thật mà không cần thay đổi bất kỳ dòng code UI nào!
