import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { GraduationCap, Shield, ClipboardCheck, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    key: 'training',
    icon: GraduationCap,
    features: ['OSHA Certification Programs', 'Custom Training Development', 'On-site Training', 'Online Learning'],
  },
  {
    key: 'consulting',
    icon: Shield,
    features: ['Safety Program Development', 'Risk Assessment', 'Regulatory Compliance', 'Safety Culture Building'],
  },
  {
    key: 'auditing',
    icon: ClipboardCheck,
    features: ['Facility Safety Audits', 'Compliance Gap Analysis', 'Corrective Action Plans', 'Follow-up Inspections'],
  },
  {
    key: 'custom',
    icon: Settings,
    features: ['Industry-specific Solutions', 'Multilingual Training', 'Equipment Certification', 'Emergency Response'],
  },
];

export const Services = () => {
  const { t } = useTranslation();

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
          <div className="grid md:grid-cols-2 gap-8">
            {services.map(({ key, icon: Icon, features }) => (
              <div
                key={key}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-colors"
              >
                <Icon className="w-12 h-12 text-primary mb-6" />
                <h2 className="font-display text-2xl text-foreground mb-4">
                  {t(`services.categories.${key}`)}
                </h2>
                <ul className="space-y-3 mb-6">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    {t('common.viewMore')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
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
