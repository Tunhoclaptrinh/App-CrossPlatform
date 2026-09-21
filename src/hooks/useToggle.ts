import { useState, useCallback } from 'react';

/**
 * Hook quản lý trạng thái boolean (Bật/Tắt) tiện lợi không cần viết boilerplate
 * 
 * @example
 * const [isModalOpen, toggleModal, setModalOpen] = useToggle(false);
 * 
 * <Button onPress={toggleModal}>Mở / Đóng Modal</Button>
 * <Button onPress={() => setModalOpen(false)}>Đóng</Button>
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle, setValue];
}