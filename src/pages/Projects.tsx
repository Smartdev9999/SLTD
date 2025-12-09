import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { Building2, Calendar, CheckCircle, Clock, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 1,
    titleKey: 'National Safety Standards Initiative',
    status: 'completed',
    year: '2020-2023',
    description: 'Comprehensive safety training program developed in partnership with government agencies.',
    milestones: ['Phase 1: Research', 'Phase 2: Development', 'Phase 3: Implementation'],
  },
  {
    id: 2,
    titleKey: 'Industrial Zone Safety Program',
    status: 'ongoing',
    year: '2022-Present',
    description: 'Ongoing safety compliance program for major industrial zones.',
    milestones: ['Safety Audits', 'Training Deployment', 'Certification'],
  },
  {
    id: 3,
    titleKey: 'Construction Safety Excellence',
    status: 'completed',
    year: '2019-2021',
    description: 'Award-winning construction safety training initiative.',
    milestones: ['Curriculum Design', 'Pilot Program', 'National Rollout'],
  },
];

export const Projects = () => {
  const { t } = useTranslation();

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
          <div className="space-y-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Image placeholder */}
                  <div className="lg:w-1/3">
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-primary/30" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant={project.status === 'ongoing' ? 'default' : 'secondary'}>
                        {project.status === 'ongoing' ? t('projects.ongoing') : t('projects.completed')}
                      </Badge>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl text-foreground mb-3">
                      {project.titleKey}
                    </h2>

                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>

                    {/* Milestones */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-foreground mb-3">
                        {t('projects.milestones')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.milestones.map((milestone, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-1 text-sm bg-muted px-3 py-1 rounded-full"
                          >
                            {project.status === 'completed' ? (
                              <CheckCircle className="w-3 h-3 text-primary" />
                            ) : (
                              <Clock className="w-3 h-3 text-muted-foreground" />
                            )}
                            {milestone}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      <Image className="w-4 h-4 mr-2" />
                      {t('projects.viewGallery')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
