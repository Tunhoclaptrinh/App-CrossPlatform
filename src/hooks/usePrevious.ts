import { useEffect, useRef } from 'react';

/**
 * Hook ghi nhớ giá trị trước đó (Previous Value) của một state hoặc prop
 * 
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * console.log(`Hiện tại: ${count}, Trước đó: ${prevCount}`);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}