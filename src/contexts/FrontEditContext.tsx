import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface FrontEditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  canEdit: boolean;
}

const FrontEditContext = createContext<FrontEditContextType | undefined>(undefined);

export const FrontEditProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { isEditor } = useAuth();

  const toggleEditMode = () => {
    if (isEditor) {
      setIsEditMode(prev => !prev);
    }
  };

  return (
    <FrontEditContext.Provider value={{ isEditMode, toggleEditMode, canEdit: isEditor }}>
      {children}
    </FrontEditContext.Provider>
  );
};

export const useFrontEdit = () => {
  const context = useContext(FrontEditContext);
  if (context === undefined) {
    throw new Error('useFrontEdit must be used within a FrontEditProvider');
  }
  return context;
};
