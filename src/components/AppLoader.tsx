import { useEffect, useState, ReactNode } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface AppLoaderProps {
  children: ReactNode;
}

export const AppLoader = ({ children }: AppLoaderProps) => {
  const { isLoading: settingsLoading } = useSiteSettings();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content when settings are loaded
    if (!settingsLoading) {
      setShowContent(true);
    }
  }, [settingsLoading]);

  // Always show content after a maximum of 800ms to prevent infinite loading
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    return () => clearTimeout(maxTimer);
  }, []);

  if (!showContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
