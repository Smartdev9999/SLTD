import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFrontEdit } from '@/contexts/FrontEditContext';
import { useTranslation } from 'react-i18next';

export const FrontEditToggle = () => {
  const { isEditMode, toggleEditMode, canEdit } = useFrontEdit();
  const { t } = useTranslation();

  if (!canEdit) return null;

  return (
    <Button
      onClick={toggleEditMode}
      variant={isEditMode ? 'default' : 'outline'}
      size="sm"
      className="fixed bottom-6 right-6 z-50 shadow-lg gap-2"
    >
      <Pencil className="w-4 h-4" />
      {isEditMode ? 'Exit Edit Mode' : 'Edit Page'}
    </Button>
  );
};
