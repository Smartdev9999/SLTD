import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { MapPin, Clock, ArrowRight, Heart, Users, Zap, Coffee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCareers } from '@/hooks/useCareers';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import heroImage from '@/assets/hero-careers.jpg';

const benefits = [
  { icon: Heart, titleKey: 'healthInsurance', descKey: 'healthInsuranceDesc' },
  { icon: Users, titleKey: 'teamEnvironment', descKey: 'teamEnvironmentDesc' },
  { icon: Zap, titleKey: 'growthOpportunities', descKey: 'growthOpportunitiesDesc' },
  { icon: Coffee, titleKey: 'workLifeBalance', descKey: 'workLifeBalanceDesc' },
];

export const Careers = () => {
  const { t } = useTranslation();
  const { careers, rawCareers, isLoading, refetch } = useCareers();
  const { companyName } = useSiteSettings();

  const getRawCareer = (id: string) => rawCareers.find(c => c.id === id);

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
            {t('careers.subtitle')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-background mb-6">
            {t('careers.title')}
          </h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            {t('careers.description')}
          </p>
        </div>
      </section>

      {/* Benefits - Clean Grid */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-12 text-center">
            {t('careers.benefits')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="text-center group">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{t(`careers.${titleKey}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`careers.${descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions - Clean Cards */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-12">
            {t('careers.openPositions')}
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {t('careers.noOpenings')}
            </div>
          ) : (
            <div className="space-y-6">
              {careers.map((career) => {
                const raw = getRawCareer(career.id);
                return (
                  <div
                    key={career.id}
                    className="bg-card rounded-lg p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display text-2xl text-foreground">
                          {raw ? (
                            <EditableTableText
                              tableName="careers"
                              recordId={career.id}
                              fieldPrefix="title"
                              currentValue={{
                                en: raw.title_en || '',
                                la: raw.title_la || '',
                                th: raw.title_th || '',
                                zh: raw.title_zh || '',
                              }}
                              onUpdate={refetch}
                            >
                              {career.title}
                            </EditableTableText>
                          ) : (
                            career.title
                          )}
                        </h3>
                        {career.department && (
                          <Badge variant="secondary" className="text-xs">{career.department}</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
                        {career.location && (
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {career.location}
                          </span>
                        )}
                        {career.employment_type && (
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {career.employment_type}
                          </span>
                        )}
                      </div>
                      {career.description && (
                        <p className="text-muted-foreground line-clamp-2">
                          {raw ? (
                            <EditableTableText
                              tableName="careers"
                              recordId={career.id}
                              fieldPrefix="description"
                              currentValue={{
                                en: raw.description_en || '',
                                la: raw.description_la || '',
                                th: raw.description_th || '',
                                zh: raw.description_zh || '',
                              }}
                              onUpdate={refetch}
                              multiline
                            >
                              {career.description}
                            </EditableTableText>
                          ) : (
                            career.description
                          )}
                        </p>
                      )}
                    </div>
                    <Button size="lg" className="shrink-0">
                      {t('careers.applyNow')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Culture Section - Minimal */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              {t('careers.culture')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('careers.cultureDescription', { company: companyName || 'LSTD' })}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
