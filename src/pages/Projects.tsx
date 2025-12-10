import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { Building2, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/hooks/useProjects';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import { EditableTableImage } from '@/components/front-edit/EditableTableImage';
import heroImage from '@/assets/hero-projects.jpg';

export const Projects = () => {
  const { t } = useTranslation();
  const { projects, isLoading, refetch } = useProjects();

  return (
    <PageLayout>
      {/* Hero Section - Full Width with Background Image */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
        <div className="container relative z-10 text-center py-20">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">
            {t('projects.subtitle')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-background mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </div>
      </section>

      {/* Projects Grid - Clean Cards */}
      <section className="py-20">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {t('common.noData')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <EditableTableImage
                    tableName="projects"
                    recordId={project.id}
                    currentUrl={project.image_url}
                    onUpdate={refetch}
                    className="aspect-[16/10] bg-muted overflow-hidden"
                  >
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </EditableTableImage>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant={project.status === 'ongoing' ? 'default' : 'secondary'}>
                        {project.status === 'ongoing' ? t('projects.ongoing') : t('projects.completed')}
                      </Badge>
                      {project.year && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {project.year}
                        </span>
                      )}
                      {project.location && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-2xl text-foreground mb-3">
                      <EditableTableText
                        tableName="projects"
                        recordId={project.id}
                        fieldPrefix="title"
                        currentValue={{
                          en: project.title_en || '',
                          la: project.title_la || '',
                          th: project.title_th || '',
                          zh: project.title_zh || '',
                        }}
                        onUpdate={refetch}
                      >
                        {project.title}
                      </EditableTableText>
                    </h2>

                    <p className="text-muted-foreground line-clamp-3">
                      <EditableTableText
                        tableName="projects"
                        recordId={project.id}
                        fieldPrefix="description"
                        currentValue={{
                          en: project.description_en || '',
                          la: project.description_la || '',
                          th: project.description_th || '',
                          zh: project.description_zh || '',
                        }}
                        onUpdate={refetch}
                        multiline
                      >
                        {project.description}
                      </EditableTableText>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
