import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { AppText } from '../../AppText';
import { AppScrollView } from '../../AppScrollView';
import { haptics } from '@/utils/haptics';
import { styles } from '../styles';
import type { AppHeaderSuggestion, AppHeaderExpansionHelpers } from '../types';

export interface HeaderDropdownSuggestionsProps {
  visible: boolean;
  top: number;
  isDark?: boolean;
  suggestions?: AppHeaderSuggestion[];
  searchValue?: string;
  renderExpandedBottom?: (helpers: AppHeaderExpansionHelpers) => React.ReactNode;
  expandedBottomContent?: React.ReactNode;
  searchSuggestions?: React.ReactNode | ((query: string) => React.ReactNode);
  expansionHelpers: AppHeaderExpansionHelpers;
  textColor?: string;
  subtextColor?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const HeaderDropdownSuggestions: React.FC<HeaderDropdownSuggestionsProps> = React.memo(({
  visible,
  top,
  isDark = false,
  suggestions,
  searchValue = '',
  renderExpandedBottom,
  expandedBottomContent,
  searchSuggestions,
  expansionHelpers,
  textColor,
  subtextColor,
  style,
  containerStyle,
}) => {
  if (!visible) return null;

  const filteredSuggestions = suggestions
    ? suggestions.filter(
      (s) =>
        !searchValue ||
        s.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        (s.sublabel && s.sublabel.toLowerCase().includes(searchValue.toLowerCase()))
    )
    : [];

  const hasContent = Boolean(
    expandedBottomContent ||
    renderExpandedBottom ||
    searchSuggestions ||
    (suggestions && filteredSuggestions.length > 0)
  );

  if (!hasContent) return null;

  const dynamicPositionStyle = { top };

  return (
    <View
      style={[
        styles.suggestionsDropdown,
        isDark ? styles.suggestionsDropdownDark : styles.suggestionsDropdownLight,
        dynamicPositionStyle,
        style,
        containerStyle,
      ]}
    >
      <AppScrollView
        style={styles.suggestionsScrollView}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        indicatorThickness={2.5}
      >
        {renderExpandedBottom
          ? renderExpandedBottom(expansionHelpers)
          : expandedBottomContent
            ? expandedBottomContent
            : typeof searchSuggestions === 'function'
              ? searchSuggestions(searchValue)
              : searchSuggestions
                ? searchSuggestions
                : (
                  <View style={styles.suggestionsList}>
                    {filteredSuggestions.map((item, idx) => (
                      <TouchableOpacity
                        key={item.id || idx}
                        activeOpacity={0.7}
                        onPress={() => {
                          haptics.light();
                          item.onPress();
                        }}
                        style={[
                          styles.suggestionItem,
                          idx > 0 && (isDark ? styles.suggestionBorderDark : styles.suggestionBorderLight),
                        ]}
                      >
                        {item.icon && <View style={styles.suggestionIcon}>{item.icon}</View>}
                        <View style={styles.suggestionTextContainer}>
                          <AppText
                            style={[
                              styles.suggestionLabel,
                              textColor ? { color: textColor } : null,
                            ]}
                            numberOfLines={1}
                          >
                            {item.label}
                          </AppText>
                          {item.sublabel ? (
                            <AppText
                              style={[
                                styles.suggestionSublabel,
                                subtextColor ? { color: subtextColor } : null,
                              ]}
                              numberOfLines={1}
                            >
                              {item.sublabel}
                            </AppText>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
      </AppScrollView>
    </View>
  );
});

HeaderDropdownSuggestions.displayName = 'HeaderDropdownSuggestions';
