import { useEffect, ReactNode } from 'react';

interface AppLoaderProps {
  children: ReactNode;
}

export const AppLoader = ({ children }: AppLoaderProps) => {
  // Hide the initial HTML loader immediately when React renders
  useEffect(() => {
    // Small delay for smooth transition
    const timer = setTimeout(() => {
      hideInitialLoader();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Always render children - React is ready
  return <>{children}</>;
};

function hideInitialLoader() {
  const initialLoader = document.getElementById('initial-loader');
  if (initialLoader) {
    initialLoader.classList.add('hidden');
    setTimeout(() => initialLoader.remove(), 300);
  }
}
