import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  return (
    <div className="space-y-2">
      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
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
