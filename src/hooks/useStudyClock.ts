import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

/** Refresh deadlines on the minute and immediately after returning to the app. */
export function useStudyClock() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = setInterval(update, 60000);
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') update();
    });
    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, []);
  return now;
}
