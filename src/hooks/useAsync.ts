import { useState, useCallback, useEffect } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | string | null;
  execute: (...args: any[]) => Promise<T | null>;
}

/**
 * Hook bọc việc gọi bất kỳ hàm bất đồng bộ nào (API, SQLite, Storage)
 * Tự động quản lý 3 trạng thái: loading, error, data.
 * 
 * @example
 * const { data: users, loading, error, execute: fetchUsers } = useAsync(async () => {
 *   const res = await apiClient.get('/users');
 *   return res.data;
 * }, true); // true = tự chạy ngay khi mount
 * 
 * if (loading) return <LoadingOverlay />;
 * if (error) return <EmptyState title="Lỗi tải dữ liệu" />;
 */
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate: boolean = false
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | string | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (err: any) {
        setError(err?.message || 'Có lỗi xảy ra trong quá trình xử lý');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute };
}