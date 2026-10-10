import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Smartphone,
  Cpu,
  FileText,
  Settings2,
  LayoutGrid,
  Activity,
  Coffee,
  Send,
  Music,
  ShoppingCart,
  Zap,
} from 'lucide-react-native';
import type { LayoutPresetKey, MiddleContentMode } from './types';

export const PRESET_OPTIONS: Array<{
  id: LayoutPresetKey;
  label: string;
  badge: string;
  desc: string;
}> = [
  {
    id: 'classic',
    label: 'Chuẩn Mobile',
    badge: 'Classic',
    desc: 'Header đỉnh + BottomNav đáy kèm FAB nhô cao chuẩn mực.',
  },
  {
    id: 'inverted',
    label: 'Đảo Vị Trí (Arc)',
    badge: 'Reachability',
    desc: 'BottomNav đưa lên đỉnh làm Tab Bar; Header đưa xuống đáy làm Command Bar.',
  },
  {
    id: 'floating',
    label: 'Ốc Đảo Nổi',
    badge: 'Floating Islands',
    desc: 'Cả Header và Nav co lại dạng viên thuốc nổi, cách đều mép viền.',
  },
  {
    id: 'glass',
    label: 'Liquid Glass',
    badge: 'Translucent',
    desc: 'Kính mờ xuyên thấu, nội dung cuộn mờ lướt bên dưới 2 thanh dock.',
  },
  {
    id: 'bottom-only',
    label: 'Chỉ Dock Đáy',
    badge: 'Thumb Reach',
    desc: 'Ẩn Header, tối đa không gian đọc, tập trung thao tác 1 tay ở đáy.',
  },
  {
    id: 'top-only',
    label: 'Chỉ Header Đỉnh',
    badge: 'Reader View',
    desc: 'Ẩn BottomNav, tối ưu cho chế độ đọc toàn màn hình & tài liệu dài.',
  },
];

export const CONTENT_MODES: Array<{
  id: MiddleContentMode;
  label: string;
  icon: any;
}> = [
  { id: 'sensors', label: 'Cảm biến IoT', icon: Cpu },
  { id: 'article', label: 'Bài viết & Đọc', icon: FileText },
  { id: 'bento', label: 'Bento Glass', icon: LayoutGrid },
  { id: 'forms', label: 'Form Nhập Liệu', icon: Settings2 },
  { id: 'feed', label: 'Giao Dịch Feed', icon: Activity },
];

export const renderNavHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Smartphone size={size} color={color} strokeWidth={2} />
);
export const renderNavTelemetryIcon = ({ color, size }: { color: string; size: number }) => (
  <Cpu size={size} color={color} strokeWidth={2} />
);
export const renderNavReportsIcon = ({ color, size }: { color: string; size: number }) => (
  <FileText size={size} color={color} strokeWidth={2} />
);
export const renderNavSettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <Settings2 size={size} color={color} strokeWidth={2} />
);

export const BAR_PERCENT_STYLES = StyleSheet.create({
  p30: { height: '30%' },
  p40: { height: '40%' },
  p60: { height: '60%' },
  p65: { height: '65%' },
  p75: { height: '75%' },
  p80: { height: '80%' },
  p85: { height: '85%' },
  p92: { height: '92%' },
  p95: { height: '95%' },
  p100: { height: '100%' },
});

export const BENTO_BARS = [
  { key: 0, style: BAR_PERCENT_STYLES.p40, isHighlight: false },
  { key: 1, style: BAR_PERCENT_STYLES.p65, isHighlight: false },
  { key: 2, style: BAR_PERCENT_STYLES.p30, isHighlight: false },
  { key: 3, style: BAR_PERCENT_STYLES.p85, isHighlight: false },
  { key: 4, style: BAR_PERCENT_STYLES.p95, isHighlight: false },
  { key: 5, style: BAR_PERCENT_STYLES.p75, isHighlight: false },
  { key: 6, style: BAR_PERCENT_STYLES.p100, isHighlight: true },
  { key: 7, style: BAR_PERCENT_STYLES.p60, isHighlight: false },
  { key: 8, style: BAR_PERCENT_STYLES.p80, isHighlight: false },
  { key: 9, style: BAR_PERCENT_STYLES.p92, isHighlight: false },
];

export const FEED_DATA = [
  { icon: Coffee, title: 'Highlands Coffee Hub', sub: 'Thanh toán QR • 10:45', amount: '-65,000 ₫', plus: false },
  { icon: Send, title: 'Lương Định Kỳ Tháng 10', sub: 'Chuyển khoản hệ thống • 09:00', amount: '+35,000,000 ₫', plus: true },
  { icon: Music, title: 'Spotify Premium Family', sub: 'Gia hạn dịch vụ • Hôm qua', amount: '-99,000 ₫', plus: false },
  { icon: ShoppingCart, title: 'Thiết Bị Cảm Biến IoT', sub: 'Mua sắm linh kiện • 08/10', amount: '-1,450,000 ₫', plus: false },
  { icon: Zap, title: 'Thưởng Hoàn Thành Sprint', sub: 'Bonus hiệu năng • 07/10', amount: '+5,000,000 ₫', plus: true },
];
