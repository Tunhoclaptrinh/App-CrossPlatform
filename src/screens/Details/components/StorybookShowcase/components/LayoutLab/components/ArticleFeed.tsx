import React from 'react';
import { View } from 'react-native';
import { User } from 'lucide-react-native';
import {
  AppText,
  AppCard,
  AppBadge,
  AppAccordion,
} from '@/components';
import type { ArticleFeedProps } from '../types';

export const ArticleFeed: React.FC<ArticleFeedProps> = React.memo(({
  themeColors: _themeColors,
  styles,
}) => {
  return (
    <View style={styles.contentBody}>
      {/* Article Hero Banner */}
      <AppCard variant="glass" style={styles.articleHeroBanner}>
        <AppBadge label="BÁO CÁO CÔNG NGHỆ 2026" variant="primary" size="sm" />
        <AppText style={styles.articleMainTitle}>
          Kiến Trúc Giao Diện Đa Nền Tảng & Trải Nghiệm Thao Tác Một Tay
        </AppText>
        <View style={styles.authorRow}>
          <View style={styles.authorAvatar}>
            <User size={14} color="#FFFFFF" strokeWidth={2.4} />
          </View>
          <AppText style={styles.authorName}>
            Kỹ Sư Trưởng UX/UI • 6 phút đọc • Cập nhật hôm nay
          </AppText>
        </View>
      </AppCard>

      {/* Article Text Content */}
      <AppCard style={styles.articleBodyCard}>
        <AppText style={styles.paragraphHeading}>
          1. Đảo Vị Trí Thanh Điều Khiển: Tại Sao Arc & Safari Làm Đúng?
        </AppText>
        <AppText style={styles.paragraphText}>
          Khi kích thước màn hình smartphone ngày càng vượt ngưỡng 6.7 inch, ngón tay cái của người dùng không thể vươn tới 30% góc trên màn hình một cách thoải mái. Quy luật Fitts (Fitts’s Law) chỉ ra rằng thời gian tiếp cận một nút bấm phụ thuộc vào khoảng cách và kích thước vùng chạm.
        </AppText>

        <View style={styles.quoteBlock}>
          <AppText style={styles.quoteText}>
            “Đưa thanh điều khiển (Command Bar) xuống đáy và thanh tiêu đề/danh mục lên đỉnh mang lại độ linh hoạt công thái học tối ưu nhất cho thế hệ màn hình dài.”
          </AppText>
        </View>

        <AppText style={styles.paragraphHeading}>
          2. Độ Nhô Của Nút Giữa (FAB Lift Offset)
        </AppText>
        <AppText style={styles.paragraphText}>
          Một nút FAB nhô cao vừa phải (từ 18px đến 28px) tạo điểm neo thị giác mạnh mẽ, giúp người dùng nhận thức ngay hành động trung tâm mà không cần liếc mắt tìm kiếm.
        </AppText>
      </AppCard>

      {/* Interactive FAQ Accordion */}
      <View style={styles.faqWrap}>
        <AppText style={styles.faqSectionTitle}>
          Câu Hỏi Thường Gặp (Layout Clearance FAQ)
        </AppText>
        <AppAccordion
          title="Khi nào nên dùng chế độ Ốc Đảo Nổi (Floating Island)?"
          size="sm"
          defaultExpanded
        >
          <AppText style={styles.accordionInner}>
            Chế độ Floating Island lý tưởng cho các ứng dụng chú trọng cảm giác hiện đại, trẻ trung, hiển thị tối đa nền kính mờ xung quanh.
          </AppText>
        </AppAccordion>
        <AppAccordion
          title="Nút FAB nhô cao có cản trở nội dung cuộn bên dưới không?"
          size="sm"
        >
          <AppText style={styles.accordionInner}>
            Không, cơ chế Smart Auto Clearance của hệ thống tự động cộng thêm phần nhô (fabLiftOffset) vào padding đáy của ScrollView, đảm bảo phần tử cuối cùng luôn cuộn lọt qua nút FAB.
          </AppText>
        </AppAccordion>
      </View>
    </View>
  );
});
