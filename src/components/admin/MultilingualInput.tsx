import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Languages, Loader2 } from 'lucide-react';
import { translateFromEnglish } from '@/services/translationService';
import { toast } from 'sonner';

interface MultilingualInputProps {
  label: string;
  values: {
    en: string;
    la: string;
    th: string;
    zh: string;
  };
  onChange: (lang: 'en' | 'la' | 'th' | 'zh', value: string) => void;
  type?: 'input' | 'textarea';
  required?: boolean;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'la', name: 'ລາວ', flag: '🇱🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
] as const;

export const MultilingualInput = ({ 
  label, 
  values, 
  onChange, 
  type = 'input',
  required = false 
}: MultilingualInputProps) => {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleAutoTranslate = async () => {
    if (!values.en.trim()) {
      toast.error('Please enter English text first');
      return;
    }

    setIsTranslating(true);
    try {
      const result = await translateFromEnglish(values.en);
      
      if (result.translations.la) onChange('la', result.translations.la);
      if (result.translations.th) onChange('th', result.translations.th);
      if (result.translations.zh) onChange('zh', result.translations.zh);
      
      if (result.success) {
        toast.success('Translations completed');
      } else {
        toast.warning('Some translations may have failed');
      }
    } catch (error) {
      toast.error('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAutoTranslate}
          disabled={isTranslating || !values.en.trim()}
          className="text-xs h-7"
        >
          {isTranslating ? (
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          ) : (
            <Languages className="h-3 w-3 mr-1" />
          )}
          Auto-Translate
        </Button>
      </div>
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code} className="text-xs">
              {lang.flag} {lang.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code} className="mt-2">
            {type === 'input' ? (
              <Input
                value={values[lang.code]}
                onChange={(e) => onChange(lang.code, e.target.value)}
                placeholder={`${label} in ${lang.name}`}
                required={required && lang.code === 'en'}
              />
            ) : (
              <Textarea
                value={values[lang.code]}
                onChange={(e) => onChange(lang.code, e.target.value)}
                placeholder={`${label} in ${lang.name}`}
                rows={4}
                required={required && lang.code === 'en'}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};