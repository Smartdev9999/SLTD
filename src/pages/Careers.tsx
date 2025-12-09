import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Users, Zap, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const openPositions = [
  {
    id: 1,
    title: 'Senior Safety Trainer',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    department: 'Training',
  },
  {
    id: 2,
    title: 'Safety Consultant',
    location: 'Remote',
    type: 'Full-time',
    department: 'Consulting',
  },
  {
    id: 3,
    title: 'Training Coordinator',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    department: 'Operations',
  },
  {
    id: 4,
    title: 'Marketing Specialist',
    location: 'Vientiane, Laos',
    type: 'Part-time',
    department: 'Marketing',
  },
];

const benefits = [
  { icon: Heart, title: 'Health Insurance', description: 'Comprehensive medical coverage for you and family' },
  { icon: Users, title: 'Team Environment', description: 'Collaborative and supportive workplace culture' },
  { icon: Zap, title: 'Growth Opportunities', description: 'Professional development and career advancement' },
  { icon: Coffee, title: 'Work-Life Balance', description: 'Flexible hours and generous leave policies' },
];

export const Careers = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('careers.subtitle')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            {t('careers.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('careers.description')}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-foreground mb-8 text-center">
            {t('careers.benefits')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-card border border-border rounded-lg p-6 text-center">
                <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="font-display text-3xl text-foreground mb-8">
            {t('careers.openPositions')}
          </h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div
                key={position.id}
                className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-display text-xl text-foreground">
                      {position.title}
                    </h3>
                    <Badge variant="secondary">{position.department}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {position.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {position.type}
                    </span>
                  </div>
                </div>
                <Button>
                  {t('careers.applyNow')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl text-foreground mb-4">
              {t('careers.culture')}
            </h2>
            <p className="text-muted-foreground text-lg">
              At LSTD, we believe in fostering a culture of continuous learning, collaboration, 
              and dedication to safety excellence. Join us in making workplaces safer around the world.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
