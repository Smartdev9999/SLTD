import { useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface AppLoaderProps {
  children: ReactNode;
}

export const AppLoader = ({ children }: AppLoaderProps) => {
  const { ready: i18nReady } = useTranslation();
  const { isLoading: settingsLoading } = useSiteSettings();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only proceed when BOTH i18n is ready AND settings are loaded
    if (i18nReady && !settingsLoading) {
      // Small delay to ensure translations are applied to all components
      const timer = setTimeout(() => {
        // Hide the initial HTML loader
        const initialLoader = document.getElementById('initial-loader');
        if (initialLoader) {
          initialLoader.classList.add('hidden');
          // Remove from DOM after animation
          setTimeout(() => {
            initialLoader.remove();
          }, 300);
        }
        setIsReady(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [i18nReady, settingsLoading]);

  // Fallback: force show content after max 3 seconds
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      const initialLoader = document.getElementById('initial-loader');
      if (initialLoader) {
        initialLoader.classList.add('hidden');
        setTimeout(() => initialLoader.remove(), 300);
      }
      setIsReady(true);
    }, 3000);
    return () => clearTimeout(maxTimer);
  }, []);

  // Don't render children until ready - this is the key!
  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};
