import { useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface AppLoaderProps {
  children: ReactNode;
}

export const AppLoader = ({ children }: AppLoaderProps) => {
  const { ready } = useTranslation();
  const { isLoading: settingsLoading } = useSiteSettings();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content when both translations and settings are ready
    if (ready && !settingsLoading) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [ready, settingsLoading]);

  // Always show content after a maximum of 1 second to prevent infinite loading
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    return () => clearTimeout(maxTimer);
  }, []);

  if (!showContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
