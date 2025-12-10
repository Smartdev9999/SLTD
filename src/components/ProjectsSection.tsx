import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { EditableTableText } from "@/components/front-edit/EditableTableText";
import { EditableTableImage } from "@/components/front-edit/EditableTableImage";

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const { projects, isLoading, refetch } = useProjects();

  // Get featured projects only
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'ongoing':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'planned':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string | null) => {
    switch (status) {
      case 'completed':
        return t('projects.status.completed', 'Completed');
      case 'ongoing':
        return t('projects.status.ongoing', 'Ongoing');
      case 'planned':
        return t('projects.status.planned', 'Planned');
      default:
        return status;
    }
  };

  if (!isLoading && featuredProjects.length === 0) {
    return null; // Don't render section if no featured projects
  }

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              {t('projects.sectionLabel', 'Featured Projects')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              {t('projects.title1', 'Our Key')}
              <br />
              <span className="text-primary">{t('projects.title2', 'Initiatives')}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            {t('projects.description', 'Explore our major infrastructure and revenue collection projects transforming transportation across the nation.')}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-6 rounded-lg border border-border">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              <EditableTableImage
                  tableName="projects"
                  recordId={project.id}
                  currentUrl={project.image_url}
                  onUpdate={refetch}
                  className="aspect-video overflow-hidden"
                >
                  {project.image_url ? (
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent to-muted flex items-center justify-center">
                      <span className="font-display text-4xl text-primary/20">LSTD</span>
                    </div>
                  )}
                </EditableTableImage>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
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
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
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
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {project.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/projects">
              {t('projects.viewAll', 'View All Projects')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};