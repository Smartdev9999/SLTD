import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface GalleryItem {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  image_url: string;
  category: string | null;
  featured: boolean | null;
  sort_order: number | null;
}

export const useGallery = () => {
  const { i18n } = useTranslation();

  const { data: gallery, isLoading, error, refetch } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  const getLocalizedItem = (item: GalleryItem) => {
    const lang = i18n.language;
    const titleMap = {
      en: item.title_en,
      la: item.title_la || item.title_en,
      th: item.title_th || item.title_en,
      zh: item.title_zh || item.title_en,
    };
    const descMap = {
      en: item.description_en,
      la: item.description_la || item.description_en,
      th: item.description_th || item.description_en,
      zh: item.description_zh || item.description_en,
    };
    return {
      ...item,
      title: titleMap[lang as keyof typeof titleMap] || item.title_en,
      description: descMap[lang as keyof typeof descMap] || item.description_en || '',
    };
  };

  const localizedGallery = gallery?.map(getLocalizedItem) || [];
  const categories = [...new Set(gallery?.map(item => item.category).filter(Boolean))] as string[];

  return {
    gallery: localizedGallery,
    rawGallery: gallery || [],
    categories,
    isLoading,
    error,
    refetch,
  };
};
