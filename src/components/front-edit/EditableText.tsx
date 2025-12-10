import { useState, ReactNode } from 'react';
import { Pencil, Check, X, Loader2 } from 'lucide-react';
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
import { translateFromEnglish } from '@/services/translationService';

interface EditableTextProps {
  children: ReactNode;
  settingKey: string;
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

export const EditableText = ({
  children,
  settingKey,
  currentValue,
  onUpdate,
  multiline = false,
  className = '',
}: EditableTextProps) => {
  const { isEditMode } = useFrontEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(currentValue);
  const [saving, setSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSave = async () => {
    let finalValues = { ...values };

    // Auto-translate if English has content but other languages are empty
    if (values.en.trim() && (!values.la.trim() || !values.th.trim() || !values.zh.trim())) {
      setIsTranslating(true);
      try {
        const result = await translateFromEnglish(values.en);
        if (!values.la.trim() && result.translations.la) finalValues.la = result.translations.la;
        if (!values.th.trim() && result.translations.th) finalValues.th = result.translations.th;
        if (!values.zh.trim() && result.translations.zh) finalValues.zh = result.translations.zh;
        setValues(finalValues);
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsTranslating(false);
      }
    }

    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('setting_key', settingKey)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('site_settings')
          .update({
            value_en: finalValues.en,
            value_la: finalValues.la,
            value_th: finalValues.th,
            value_zh: finalValues.zh,
          })
          .eq('id', existing.id);
      } else {
        await supabase.from('site_settings').insert({
          setting_key: settingKey,
          value_en: finalValues.en,
          value_la: finalValues.la,
          value_th: finalValues.th,
          value_zh: finalValues.zh,
        });
      }

      toast.success('Content updated successfully');
      setIsEditing(false);
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to update content');
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
        onClick={() => setIsEditing(true)}
      >
        <span className="relative">
          {children}
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg z-10 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            <Pencil className="w-3 h-3" />
          </span>
        </span>
        <span className="absolute inset-0 border-2 border-dashed border-primary/40 rounded pointer-events-none group-hover:border-primary group-hover:bg-primary/5 transition-all duration-200" />
      </span>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
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
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={saving || isTranslating}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || isTranslating}>
              {isTranslating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              {isTranslating ? 'Translating...' : saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
