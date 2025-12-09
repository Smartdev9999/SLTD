import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface SiteSetting {
  id: string;
  setting_key: string;
  value_en: string | null;
  value_la: string | null;
  value_th: string | null;
  value_zh: string | null;
  image_url: string | null;
}

export const useSiteSettings = () => {
  const { i18n } = useTranslation();

  const { data: settings, isLoading, error, refetch } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      return data as SiteSetting[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const getSetting = (key: string): string => {
    const setting = settings?.find(s => s.setting_key === key);
    if (!setting) return '';

    const lang = i18n.language;
    switch (lang) {
      case 'la':
        return setting.value_la || setting.value_en || '';
      case 'th':
        return setting.value_th || setting.value_en || '';
      case 'zh':
        return setting.value_zh || setting.value_en || '';
      default:
        return setting.value_en || '';
    }
  };

  const getSettingImage = (key: string): string | null => {
    const setting = settings?.find(s => s.setting_key === key);
    return setting?.image_url || null;
  };

  return {
    settings,
    isLoading,
    error,
    refetch,
    getSetting,
    getSettingImage,
    companyName: getSetting('company_name'),
    tagline: getSetting('tagline'),
    logoUrl: getSettingImage('logo'),
  };
};