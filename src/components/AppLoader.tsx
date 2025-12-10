import { useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface AppLoaderProps {
  children: ReactNode;
}

export const AppLoader = ({ children }: AppLoaderProps) => {
  const { ready: i18nReady } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  // Hide loader when i18n is ready (don't wait for settings - they can load after)
  useEffect(() => {
    if (i18nReady) {
      const timer = setTimeout(() => {
        hideInitialLoader();
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [i18nReady]);

  // Fallback: force show content after max 2 seconds no matter what
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      hideInitialLoader();
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(maxTimer);
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};

function hideInitialLoader() {
  const initialLoader = document.getElementById('initial-loader');
  if (initialLoader) {
    initialLoader.classList.add('hidden');
    setTimeout(() => initialLoader.remove(), 300);
  }
}
