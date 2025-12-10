import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface AboutContent {
  id: string;
  section_key: string;
  title_en: string | null;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  content_en: string | null;
  content_la: string | null;
  content_th: string | null;
  content_zh: string | null;
  image_url: string | null;
  sort_order: number | null;
}

export const useAboutContent = () => {
  const { i18n } = useTranslation();

  const { data: sections, isLoading, error, refetch } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as AboutContent[];
    },
  });

  const getLocalizedField = (section: AboutContent, field: 'title' | 'content'): string => {
    const lang = i18n.language;
    const fieldMap = {
      en: field === 'title' ? section.title_en : section.content_en,
      la: field === 'title' ? section.title_la : section.content_la,
      th: field === 'title' ? section.title_th : section.content_th,
      zh: field === 'title' ? section.title_zh : section.content_zh,
    };
    return fieldMap[lang as keyof typeof fieldMap] || fieldMap.en || '';
  };

  const getSection = (key: string) => {
    const section = sections?.find(s => s.section_key === key);
    if (!section) return null;
    return {
      ...section,
      title: getLocalizedField(section, 'title'),
      content: getLocalizedField(section, 'content'),
    };
  };

  const getSectionRaw = (key: string): AboutContent | null => {
    return sections?.find(s => s.section_key === key) || null;
  };

  return {
    sections,
    isLoading,
    error,
    refetch,
    getSection,
    getSectionRaw,
    getLocalizedField,
  };
};
