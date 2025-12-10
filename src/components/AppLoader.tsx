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
    // Only show content when BOTH i18n is ready AND settings are loaded
    if (i18nReady && !settingsLoading) {
      // Small delay to ensure all content is rendered with correct translations
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [i18nReady, settingsLoading]);

  // Fallback: show content after max 2 seconds regardless
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(maxTimer);
  }, []);

  return (
    <>
      {/* Loading spinner - shown while not ready */}
      {!isReady && (
        <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {/* Content - always rendered but visibility controlled */}
      <div style={{ 
        visibility: isReady ? 'visible' : 'hidden',
        opacity: isReady ? 1 : 0,
      }}>
        {children}
      </div>
    </>
  );
};
