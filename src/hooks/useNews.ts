import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface NewsItem {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  content_en: string | null;
  content_la: string | null;
  content_th: string | null;
  content_zh: string | null;
  excerpt_en: string | null;
  excerpt_la: string | null;
  excerpt_th: string | null;
  excerpt_zh: string | null;
  image_url: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string;
}

export const useNews = () => {
  const { i18n } = useTranslation();

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  const getLocalizedNews = (item: NewsItem) => {
    const lang = i18n.language;
    const titleMap = {
      en: item.title_en,
      la: item.title_la || item.title_en,
      th: item.title_th || item.title_en,
      zh: item.title_zh || item.title_en,
    };
    const excerptMap = {
      en: item.excerpt_en,
      la: item.excerpt_la || item.excerpt_en,
      th: item.excerpt_th || item.excerpt_en,
      zh: item.excerpt_zh || item.excerpt_en,
    };
    const contentMap = {
      en: item.content_en,
      la: item.content_la || item.content_en,
      th: item.content_th || item.content_en,
      zh: item.content_zh || item.content_en,
    };
    return {
      ...item,
      title: titleMap[lang as keyof typeof titleMap] || item.title_en,
      excerpt: excerptMap[lang as keyof typeof excerptMap] || item.excerpt_en || '',
      content: contentMap[lang as keyof typeof contentMap] || item.content_en || '',
    };
  };

  const localizedNews = news?.map(getLocalizedNews) || [];

  return {
    news: localizedNews,
    isLoading,
    error,
  };
};
