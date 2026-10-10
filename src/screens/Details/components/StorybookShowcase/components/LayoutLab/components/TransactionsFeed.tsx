import React from 'react';
import { View } from 'react-native';
import {
  AppText,
  AppCard,
  AppBadge,
} from '@/components';
import { FEED_DATA } from '../constants';
import type { TransactionsFeedProps } from '../types';

export const TransactionsFeed: React.FC<TransactionsFeedProps> = React.memo(({
  styles,
}) => {
  return (
    <View style={styles.contentBody}>
      {/* Wallet Balance Hero Card */}
      <AppCard style={styles.walletHeroCard}>
        <AppText style={styles.walletTag}>TÀI KHOẢN VÍ ĐIỀU HÀNH</AppText>
        <AppText style={styles.walletBalance}>
          45,820,000 ₫
        </AppText>
        <View style={styles.walletMetaRow}>
          <AppBadge label="Thẻ Doanh Nghiệp • Active" variant="success" size="sm" />
          <AppText style={styles.walletSubtext}>
            Hạn mức: 200,000,000 ₫
          </AppText>
        </View>
      </AppCard>

      {/* Transaction Feed Items */}
      <AppCard style={styles.feedCard}>
        <AppText style={styles.feedTitle}>
          Giao Dịch Gần Nhất (10 Mục Mới Nhất)
        </AppText>

        {FEED_DATA.map((item, index) => {
          const IconComp = item.icon;
          return (
            <View key={index} style={styles.feedItemRow}>
              <View style={[styles.feedItemIconBox, item.plus ? styles.feedIconBoxGreen : styles.feedIconBoxIndigo]}>
                <IconComp size={16} color={item.plus ? '#10B981' : '#6366F1'} strokeWidth={2.3} />
              </View>
              <View style={styles.feedItemTextCol}>
                <AppText style={styles.feedItemTitle}>{item.title}</AppText>
                <AppText style={styles.feedItemSub}>{item.sub}</AppText>
              </View>
              <AppText style={[styles.feedItemAmount, item.plus ? styles.feedAmountGreen : styles.feedAmountNormal]}>
                {item.amount}
              </AppText>
            </View>
          );
        })}
      </AppCard>
    </View>
  );
});
