import { useState, ReactNode } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useFrontEdit } from '@/contexts/FrontEditContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EditableTableTextProps {
  children: ReactNode;
  tableName: 'services' | 'projects' | 'about_content' | 'news' | 'careers';
  recordId: string;
  fieldPrefix: 'title' | 'description' | 'content' | 'excerpt' | 'requirements';
  currentValue: {
    en: string;
    la: string;
    th: string;
    zh: string;
  };
  onUpdate?: () => void;
  multiline?: boolean;
  className?: string;
}

export const EditableTableText = ({
  children,
  tableName,
  recordId,
  fieldPrefix,
  currentValue,
  onUpdate,
  multiline = false,
  className = '',
}: EditableTableTextProps) => {
  const { isEditMode } = useFrontEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(currentValue);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        [`${fieldPrefix}_en`]: values.en,
        [`${fieldPrefix}_la`]: values.la,
        [`${fieldPrefix}_th`]: values.th,
        [`${fieldPrefix}_zh`]: values.zh,
      };

      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('id', recordId);

      if (error) throw error;

      toast.success('Content updated successfully');
      setIsEditing(false);
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to update content');
      console.error('Update error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isEditMode) {
    return <>{children}</>;
  }

  const InputComponent = multiline ? Textarea : Input;

  return (
    <>
      <span
        className={`relative cursor-pointer group inline-block ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsEditing(true);
        }}
      >
        <span className="relative">
          {children}
          <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground rounded-full p-1 z-10">
            <Pencil className="w-3 h-3" />
          </span>
        </span>
        <span className="absolute inset-0 border-2 border-dashed border-primary/50 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Edit {fieldPrefix.charAt(0).toUpperCase() + fieldPrefix.slice(1)}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="en">EN</TabsTrigger>
              <TabsTrigger value="la">LA</TabsTrigger>
              <TabsTrigger value="th">TH</TabsTrigger>
              <TabsTrigger value="zh">ZH</TabsTrigger>
            </TabsList>
            <TabsContent value="en" className="mt-4">
              <InputComponent
                value={values.en}
                onChange={(e) => setValues({ ...values, en: e.target.value })}
                placeholder="English"
                rows={multiline ? 4 : undefined}
              />
            </TabsContent>
            <TabsContent value="la" className="mt-4">
              <InputComponent
                value={values.la}
                onChange={(e) => setValues({ ...values, la: e.target.value })}
                placeholder="ພາສາລາວ"
                className="font-lao"
                rows={multiline ? 4 : undefined}
              />
            </TabsContent>
            <TabsContent value="th" className="mt-4">
              <InputComponent
                value={values.th}
                onChange={(e) => setValues({ ...values, th: e.target.value })}
                placeholder="ภาษาไทย"
                rows={multiline ? 4 : undefined}
              />
            </TabsContent>
            <TabsContent value="zh" className="mt-4">
              <InputComponent
                value={values.zh}
                onChange={(e) => setValues({ ...values, zh: e.target.value })}
                placeholder="中文"
                rows={multiline ? 4 : undefined}
              />
            </TabsContent>
          </Tabs>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={saving}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Check className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};