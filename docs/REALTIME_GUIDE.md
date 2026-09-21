# Hướng Dẫn & Đề Xuất Công Nghệ Thời Gian Thực (Real-Time Architecture Guide)

Tài liệu này phân tích, so sánh và hướng dẫn tích hợp 3 giải pháp truyền thông thời gian thực phổ biến: **WebSocket**, **Server-Sent Events (SSE)**, và **WebRTC** cho các ứng dụng di động React Native.

---

## 1. Bảng So Sánh & Lựa Chọn Giải Pháp

| Tiêu chí | WebSocket | Server-Sent Events (SSE) | WebRTC |
| :--- | :--- | :--- | :--- |
| **Chiều truyền dữ liệu** | Hai chiều (Full-Duplex) | Một chiều (Server -> Client) | Ngang hàng (P2P Mesh / SFU) |
| **Giao thức mạng** | TCP (Upgrade qua HTTP) | HTTP/1.1 hoặc HTTP/2 Streaming | UDP / RTP (DataChannel qua SCTP) |
| **Độ trễ (Latency)** | Cực thấp (~20-50ms) | Rất thấp (~50-100ms) | Siêu thấp (<20ms P2P) |
| **Tiêu tốn pin & CPU** | Thấp - Trung bình | Rất thấp (dựa trên HTTP chuẩn) | Cao (mã hóa/giải mã video/audio) |
| **Hỗ trợ trong RN Base** | **Đã tích hợp sẵn (`socketService`)** | **Hỗ trợ qua fetch/ReadableStream** | **Có lộ trình tích hợp Native** |
| **Trường hợp khuyên dùng** | 💬 Chat trực tiếp<br>🔔 Thông báo đẩy in-app<br>📍 Tọa độ giao hàng / xe ôm<br>📈 Bảng giá tài chính / sàn giao dịch | 🤖 **AI Token Streaming (ChatGPT, Gemini)**<br>📰 Bảng tin tin tức một chiều<br>⏳ Theo dõi tiến trình tải đơn hàng | 📹 **Gọi Video 1-1 / Hội nghị**<br>🎙️ Phòng đàm thoại âm thanh (Voice Room)<br>⚡ Truyền file trực tiếp P2P |

---

## 2. Chi Tiết Từng Công Nghệ & Cách Tích Hợp

### 2.1. WebSocket Service (Cốt Lõi Đã Sẵn Sàng Trong Base)
Base app đã tích hợp sẵn service hoàn chỉnh tại `src/services/realtime/socketService.ts`:
* **Tự động kết nối lại (Auto-reconnect with Exponential Backoff):** Khi điện thoại mất sóng hoặc chuyển đổi giữa WiFi và 4G, service tự động thử lại sau 1s, 2s, 4s, 8s.
* **Hàng đợi tin nhắn ngoại tuyến (Offline Message Queue):** Tin nhắn gửi đi khi mất mạng sẽ được lưu tạm và tự động gửi bù khi kết nối thành công.
* **Nhịp tim định kỳ (Heartbeat Ping/Pong):** Giữ kết nối socket không bị router hoặc firewall ngắt sau 30-60 giây nhàn rỗi.

```typescript
import { socketService } from '@/services/realtime';

// 1. Kết nối đến WebSocket Server
socketService.connect('wss://your-backend-api.com/ws');

// 2. Lắng nghe sự kiện
socketService.on('new_chat_message', (msg) => {
  console.log('Tin nhắn mới:', msg);
});

// 3. Gửi sự kiện lên server
socketService.emit('send_message', { text: 'Xin chào!', recipientId: 'user_123' });

// 4. Theo dõi trạng thái kết nối
socketService.onStateChange((state) => {
  console.log('Trạng thái Socket:', state); // 'connected' | 'reconnecting'...
});
```

---

### 2.2. Server-Sent Events (SSE) Cho Streaming AI
Khi ứng dụng cần tính năng trợ lý AI hiển thị từng ký tự gõ như ChatGPT, SSE là giải pháp gọn nhẹ nhất:

```typescript
export async function streamAiResponse(prompt: string, onChunk: (text: string) => void) {
  const response = await fetch('https://your-api.com/ai/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');

  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunkText = decoder.decode(value);
    onChunk(chunkText);
  }
}
```

---

### 2.3. WebRTC Cho Gọi Thoại & Gọi Video (P2P Call)

Để phát triển tính năng gọi Video trong tương lai:
1. **Thư viện Native:** Cài đặt `react-native-webrtc`.
2. **Cơ sở hạ tầng cần chuẩn bị:**
   - **Signaling Server (WebSocket):** Trao đổi thông tin kết nối ban đầu (SDP Offer, SDP Answer, ICE Candidates).
   - **STUN/TURN Server:** Máy chủ trung gian vượt tường lửa (NAT Traversal). Ví dụ: Coturn server hoặc dịch vụ Xirsys, Twilio.

```text
[Thiết bị A (Client)] <---(Signaling: WebSocket)---> [Signaling Server]
         |                                                    |
   (STUN/TURN)                                           (STUN/TURN)
         |                                                    |
         +=========== [Đường truyền Video/Audio P2P] =========+
```
