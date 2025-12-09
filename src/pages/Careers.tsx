import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { MapPin, Clock, ArrowRight, Heart, Users, Zap, Coffee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCareers } from '@/hooks/useCareers';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const benefits = [
  { icon: Heart, titleKey: 'healthInsurance', descKey: 'healthInsuranceDesc' },
  { icon: Users, titleKey: 'teamEnvironment', descKey: 'teamEnvironmentDesc' },
  { icon: Zap, titleKey: 'growthOpportunities', descKey: 'growthOpportunitiesDesc' },
  { icon: Coffee, titleKey: 'workLifeBalance', descKey: 'workLifeBalanceDesc' },
];

export const Careers = () => {
  const { t } = useTranslation();
  const { careers, isLoading } = useCareers();
  const { companyName } = useSiteSettings();

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
            {benefits.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="bg-card border border-border rounded-lg p-6 text-center">
                <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">{t(`careers.${titleKey}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`careers.${descKey}`)}</p>
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
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-lg">
              {t('careers.noOpenings')}
            </div>
          ) : (
            <div className="space-y-4">
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary transition-colors"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-display text-xl text-foreground">
                        {career.title}
                      </h3>
                      {career.department && (
                        <Badge variant="secondary">{career.department}</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {career.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {career.location}
                        </span>
                      )}
                      {career.employment_type && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {career.employment_type}
                        </span>
                      )}
                    </div>
                    {career.description && (
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                        {career.description}
                      </p>
                    )}
                  </div>
                  <Button>
                    {t('careers.applyNow')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          )}
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
              {t('careers.cultureDescription', { company: companyName || 'LSTD' })}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
