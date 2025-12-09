import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);
  return (
    <Suspense fallback={<div className="w-12 h-12 bg-muted rounded animate-pulse" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export const Services = () => {
  const { t } = useTranslation();
  const { services, isLoading } = useServices();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('services.subtitle')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            {t('services.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('services.description')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {t('common.noData')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-colors"
                >
                  {service.icon && (
                    <DynamicIcon 
                      name={service.icon as keyof typeof dynamicIconImports} 
                      className="w-12 h-12 text-primary mb-6" 
                    />
                  )}
                  <h2 className="font-display text-2xl text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/contact">
                      {t('common.viewMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl text-background mb-6">
            {t('cta.title1')}
            <br />
            <span className="text-primary">{t('cta.title2')}</span>
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <Button size="lg" asChild>
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
