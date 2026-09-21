import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

export interface KeyboardState {
  isKeyboardVisible: boolean;
  keyboardHeight: number;
  dismiss: () => void;
}

/**
 * Hook theo dõi trạng thái bàn phím ảo trên thiết bị
 * 
 * @example
 * const { isKeyboardVisible, keyboardHeight, dismiss } = useKeyboard();
 * 
 * if (isKeyboardVisible) {
 *   // Ẩn thanh bottom tab hoặc nâng khung chat lên cao hơn keyboardHeight
 * }
 */
export function useKeyboard(): KeyboardState {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: KeyboardEvent) => {
      setIsKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onHide = () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return {
    isKeyboardVisible,
    keyboardHeight,
    dismiss: Keyboard.dismiss,
  };
}