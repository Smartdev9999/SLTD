import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface Career {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  requirements_en: string | null;
  requirements_la: string | null;
  requirements_th: string | null;
  requirements_zh: string | null;
  location: string | null;
  department: string | null;
  employment_type: string | null;
  deadline: string | null;
  active: boolean | null;
}

export const useCareers = () => {
  const { i18n } = useTranslation();

  const { data: careers, isLoading, error } = useQuery({
    queryKey: ['careers-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Career[];
    },
  });

  const getLocalizedCareer = (career: Career) => {
    const lang = i18n.language;
    const titleMap = {
      en: career.title_en,
      la: career.title_la || career.title_en,
      th: career.title_th || career.title_en,
      zh: career.title_zh || career.title_en,
    };
    const descMap = {
      en: career.description_en,
      la: career.description_la || career.description_en,
      th: career.description_th || career.description_en,
      zh: career.description_zh || career.description_en,
    };
    const reqMap = {
      en: career.requirements_en,
      la: career.requirements_la || career.requirements_en,
      th: career.requirements_th || career.requirements_en,
      zh: career.requirements_zh || career.requirements_en,
    };
    return {
      ...career,
      title: titleMap[lang as keyof typeof titleMap] || career.title_en,
      description: descMap[lang as keyof typeof descMap] || career.description_en || '',
      requirements: reqMap[lang as keyof typeof reqMap] || career.requirements_en || '',
    };
  };

  const localizedCareers = careers?.map(getLocalizedCareer) || [];

  return {
    careers: localizedCareers,
    isLoading,
    error,
  };
};
