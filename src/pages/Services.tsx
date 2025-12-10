import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import type { LucideProps } from 'lucide-react';
import heroImage from '@/assets/hero-services.jpg';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  // Check if the icon exists in the imports
  if (!dynamicIconImports[name]) {
    return <div className="w-8 h-8 bg-primary/20 rounded" />;
  }
  
  const LucideIcon = lazy(dynamicIconImports[name]);
  return (
    <Suspense fallback={<div className="w-8 h-8 bg-muted rounded animate-pulse" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export const Services = () => {
  const { t } = useTranslation();
  const { services, rawServices, isLoading, refetch } = useServices();

  const getRawService = (id: string) => rawServices.find(s => s.id === id);

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
            {t('services.subtitle')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-background mb-6">
            {t('services.title')}
          </h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>
      </section>

      {/* Services Grid - Clean Minimal Cards */}
      <section className="py-20">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {t('common.noData')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const raw = getRawService(service.id);
                return (
                  <div
                    key={service.id}
                    className="group p-8 rounded-lg hover:bg-muted transition-colors"
                  >
                    {service.icon && (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <DynamicIcon 
                          name={service.icon as keyof typeof dynamicIconImports} 
                          className="w-8 h-8 text-primary" 
                        />
                      </div>
                    )}
                    <h2 className="font-display text-2xl text-foreground mb-4">
                      {raw ? (
                        <EditableTableText
                          tableName="services"
                          recordId={service.id}
                          fieldPrefix="title"
                          currentValue={{
                            en: raw.title_en || '',
                            la: raw.title_la || '',
                            th: raw.title_th || '',
                            zh: raw.title_zh || '',
                          }}
                          onUpdate={refetch}
                        >
                          {service.title}
                        </EditableTableText>
                      ) : (
                        service.title
                      )}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {raw ? (
                        <EditableTableText
                          tableName="services"
                          recordId={service.id}
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
                          {service.description}
                        </EditableTableText>
                      ) : (
                        service.description
                      )}
                    </p>
                    <Button variant="ghost" className="p-0 h-auto text-primary group-hover:gap-3 transition-all" asChild>
                      <Link to="/contact">
                        {t('common.viewMore')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Full Width Dark */}
      <section 
        className="py-24 hero-gradient"
      >
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl text-background mb-6">
            {t('cta.title1')}
            <br />
            <span className="text-primary">{t('cta.title2')}</span>
          </h2>
          <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
            {t('cta.description')}
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link to="/contact">
              {t('cta.schedule')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
