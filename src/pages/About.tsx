import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { CheckCircle2, Target, Eye, Heart, History, Users, Loader2 } from 'lucide-react';
import { useAboutContent } from '@/hooks/useAboutContent';

export const About = () => {
  const { t } = useTranslation();
  const { getSection, isLoading } = useAboutContent();

  const values = [
    { key: 'safety', icon: CheckCircle2 },
    { key: 'excellence', icon: Target },
    { key: 'integrity', icon: Heart },
    { key: 'innovation', icon: Eye },
  ];

  // Get dynamic content from database
  const heroSection = getSection('hero');
  const visionSection = getSection('vision');
  const missionSection = getSection('mission');
  const historySection = getSection('history');
  const teamSection = getSection('team');

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('about.sectionLabel')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            {heroSection?.title || (
              <>
                {t('about.title1')}
                <br />
                <span className="text-primary">{t('about.title2')}</span>
              </>
            )}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {heroSection?.content || t('about.description')}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <Eye className="w-12 h-12 text-primary mb-4" />
                <h2 className="font-display text-2xl text-foreground mb-4">
                  {visionSection?.title || t('about.vision.title')}
                </h2>
                <p className="text-muted-foreground">
                  {visionSection?.content || t('about.vision.content')}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h2 className="font-display text-2xl text-foreground mb-4">
                  {missionSection?.title || t('about.mission.title')}
                </h2>
                <p className="text-muted-foreground">
                  {missionSection?.content || t('about.mission.content')}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="font-display text-3xl text-foreground mb-8 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ key, icon: Icon }) => (
              <div key={key} className="bg-card border border-border rounded-lg p-6 text-center">
                <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground">
                  {t(`about.values.${key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <History className="w-12 h-12 text-primary mb-4" />
              <h2 className="font-display text-3xl text-foreground mb-4">
                {historySection?.title || t('about.history.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {historySection?.content || t('about.history.content')}
              </p>
            </div>
            <div className="bg-accent rounded-lg p-8">
              <div className="font-display text-6xl text-primary mb-4">25+</div>
              <p className="text-muted-foreground">{t('hero.stats.experience')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl text-foreground mb-4">
              {teamSection?.title || t('about.team.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {teamSection?.content || t('about.team.content')}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
