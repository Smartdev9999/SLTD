import { useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface AppLoaderProps {
  children: ReactNode;
}

export const AppLoader = ({ children }: AppLoaderProps) => {
  const { ready: i18nReady } = useTranslation();
  const { isLoading: settingsLoading, logoUrl } = useSiteSettings();
  const [isReady, setIsReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only proceed when BOTH i18n is ready AND settings are loaded
    if (i18nReady && !settingsLoading) {
      // Start fade out animation
      setFadeOut(true);
      // After animation completes, remove loader
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [i18nReady, settingsLoading]);

  // Fallback: force show content after max 3 seconds
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsReady(true), 400);
    }, 3000);
    return () => clearTimeout(maxTimer);
  }, []);

  // Don't render children until ready
  if (!isReady) {
    return (
      <div 
        className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-opacity duration-300 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Logo */}
        {logoUrl && (
          <img 
            src={logoUrl} 
            alt="Loading" 
            className="h-16 w-auto mb-8 animate-pulse"
          />
        )}
        
        {/* Modern Loading Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 rounded-full border-4 border-muted" />
          {/* Spinning arc */}
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          {/* Inner pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-primary/20 rounded-full animate-ping" />
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-1.5 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
