import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { Building2, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/hooks/useProjects';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import { EditableTableImage } from '@/components/front-edit/EditableTableImage';

export const Projects = () => {
  const { t } = useTranslation();
  const { projects, isLoading, refetch } = useProjects();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('projects.subtitle')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('projects.description')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {t('common.noData')}
            </div>
          ) : (
            <div className="space-y-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Image */}
                    <div className="lg:w-1/3">
                      <EditableTableImage
                        tableName="projects"
                        recordId={project.id}
                        currentUrl={project.image_url}
                        onUpdate={refetch}
                        className="aspect-video bg-accent rounded-lg flex items-center justify-center overflow-hidden"
                      >
                        {project.image_url ? (
                          <img 
                            src={project.image_url} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-16 h-16 text-primary/30" />
                        )}
                      </EditableTableImage>
                    </div>

                    {/* Content */}
                    <div className="lg:w-2/3">
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

                      <p className="text-muted-foreground">
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