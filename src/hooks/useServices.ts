import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface Service {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  icon: string | null;
  sort_order: number | null;
  active: boolean | null;
}

export const useServices = () => {
  const { i18n } = useTranslation();

  const { data: services, isLoading, error, refetch } = useQuery({
    queryKey: ['services-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Service[];
    },
  });

  const getLocalizedService = (service: Service) => {
    const lang = i18n.language;
    const titleMap = {
      en: service.title_en,
      la: service.title_la || service.title_en,
      th: service.title_th || service.title_en,
      zh: service.title_zh || service.title_en,
    };
    const descMap = {
      en: service.description_en,
      la: service.description_la || service.description_en,
      th: service.description_th || service.description_en,
      zh: service.description_zh || service.description_en,
    };
    return {
      ...service,
      title: titleMap[lang as keyof typeof titleMap] || service.title_en,
      description: descMap[lang as keyof typeof descMap] || service.description_en || '',
    };
  };

  const localizedServices = services?.map(getLocalizedService) || [];

  return {
    services: localizedServices,
    isLoading,
    error,
    refetch,
  };
};
