import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface Project {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  image_url: string | null;
  location: string | null;
  year: string | null;
  status: string | null;
  featured: boolean | null;
}

export const useProjects = () => {
  const { i18n } = useTranslation();

  const { data: projects, isLoading, error, refetch } = useQuery({
    queryKey: ['projects-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    },
  });

  const getLocalizedProject = (project: Project) => {
    const lang = i18n.language;
    const titleMap = {
      en: project.title_en,
      la: project.title_la || project.title_en,
      th: project.title_th || project.title_en,
      zh: project.title_zh || project.title_en,
    };
    const descMap = {
      en: project.description_en,
      la: project.description_la || project.description_en,
      th: project.description_th || project.description_en,
      zh: project.description_zh || project.description_en,
    };
    return {
      ...project,
      title: titleMap[lang as keyof typeof titleMap] || project.title_en,
      description: descMap[lang as keyof typeof descMap] || project.description_en || '',
    };
  };

  const localizedProjects = projects?.map(getLocalizedProject) || [];

  return {
    projects: localizedProjects,
    isLoading,
    error,
    refetch,
  };
};
