import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { CheckCircle2, Target, Eye, Heart, History, Users, Loader2 } from 'lucide-react';
import { useAboutContent } from '@/hooks/useAboutContent';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import { EditableTableImage } from '@/components/front-edit/EditableTableImage';
import heroImage from '@/assets/hero-about.jpg';

export const About = () => {
  const { t } = useTranslation();
  const { getSection, getSectionRaw, isLoading, refetch } = useAboutContent();

  const values = [
    { key: 'safety', icon: CheckCircle2, color: 'bg-green-500/10 text-green-600' },
    { key: 'excellence', icon: Target, color: 'bg-blue-500/10 text-blue-600' },
    { key: 'integrity', icon: Heart, color: 'bg-red-500/10 text-red-600' },
    { key: 'innovation', icon: Eye, color: 'bg-purple-500/10 text-purple-600' },
  ];

  // Get dynamic content from database
  const heroSection = getSection('hero');
  const heroRaw = getSectionRaw('hero');
  const visionSection = getSection('vision');
  const visionRaw = getSectionRaw('vision');
  const missionSection = getSection('mission');
  const missionRaw = getSectionRaw('mission');
  const historySection = getSection('history');
  const historyRaw = getSectionRaw('history');
  const teamSection = getSection('team');
  const teamRaw = getSectionRaw('team');

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
            {t('about.sectionLabel')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-background mb-6">
            {heroRaw ? (
              <EditableTableText
                tableName="about_content"
                recordId={heroRaw.id}
                fieldPrefix="title"
                currentValue={{
                  en: heroRaw.title_en || '',
                  la: heroRaw.title_la || '',
                  th: heroRaw.title_th || '',
                  zh: heroRaw.title_zh || '',
                }}
                onUpdate={refetch}
              >
                {heroSection?.title || t('about.title1')}
              </EditableTableText>
            ) : (
              t('about.title1')
            )}
          </h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            {heroRaw ? (
              <EditableTableText
                tableName="about_content"
                recordId={heroRaw.id}
                fieldPrefix="content"
                currentValue={{
                  en: heroRaw.content_en || '',
                  la: heroRaw.content_la || '',
                  th: heroRaw.content_th || '',
                  zh: heroRaw.content_zh || '',
                }}
                onUpdate={refetch}
                multiline
              >
                {heroSection?.content || t('about.description')}
              </EditableTableText>
            ) : (
              t('about.description')
            )}
          </p>
        </div>
      </section>

      {/* Vision & Mission - Clean Cards */}
      <section className="py-20">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 rounded-lg bg-muted">
                {visionRaw && (
                  <EditableTableImage
                    tableName="about_content"
                    recordId={visionRaw.id}
                    currentUrl={visionRaw.image_url}
                    onUpdate={refetch}
                    className="w-full aspect-video mb-6 rounded-lg overflow-hidden"
                  >
                    {visionRaw.image_url ? (
                      <img src={visionRaw.image_url} alt="Vision" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-accent/50 flex items-center justify-center">
                        <Eye className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </EditableTableImage>
                )}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-3xl text-foreground mb-4">
                  {visionRaw ? (
                    <EditableTableText
                      tableName="about_content"
                      recordId={visionRaw.id}
                      fieldPrefix="title"
                      currentValue={{
                        en: visionRaw.title_en || '',
                        la: visionRaw.title_la || '',
                        th: visionRaw.title_th || '',
                        zh: visionRaw.title_zh || '',
                      }}
                      onUpdate={refetch}
                    >
                      {visionSection?.title || t('about.vision.title')}
                    </EditableTableText>
                  ) : (
                    t('about.vision.title')
                  )}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {visionRaw ? (
                    <EditableTableText
                      tableName="about_content"
                      recordId={visionRaw.id}
                      fieldPrefix="content"
                      currentValue={{
                        en: visionRaw.content_en || '',
                        la: visionRaw.content_la || '',
                        th: visionRaw.content_th || '',
                        zh: visionRaw.content_zh || '',
                      }}
                      onUpdate={refetch}
                      multiline
                    >
                      {visionSection?.content || t('about.vision.content')}
                    </EditableTableText>
                  ) : (
                    t('about.vision.content')
                  )}
                </p>
              </div>
              <div className="p-10 rounded-lg bg-muted">
                {missionRaw && (
                  <EditableTableImage
                    tableName="about_content"
                    recordId={missionRaw.id}
                    currentUrl={missionRaw.image_url}
                    onUpdate={refetch}
                    className="w-full aspect-video mb-6 rounded-lg overflow-hidden"
                  >
                    {missionRaw.image_url ? (
                      <img src={missionRaw.image_url} alt="Mission" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-accent/50 flex items-center justify-center">
                        <Target className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </EditableTableImage>
                )}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-3xl text-foreground mb-4">
                  {missionRaw ? (
                    <EditableTableText
                      tableName="about_content"
                      recordId={missionRaw.id}
                      fieldPrefix="title"
                      currentValue={{
                        en: missionRaw.title_en || '',
                        la: missionRaw.title_la || '',
                        th: missionRaw.title_th || '',
                        zh: missionRaw.title_zh || '',
                      }}
                      onUpdate={refetch}
                    >
                      {missionSection?.title || t('about.mission.title')}
                    </EditableTableText>
                  ) : (
                    t('about.mission.title')
                  )}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {missionRaw ? (
                    <EditableTableText
                      tableName="about_content"
                      recordId={missionRaw.id}
                      fieldPrefix="content"
                      currentValue={{
                        en: missionRaw.content_en || '',
                        la: missionRaw.content_la || '',
                        th: missionRaw.content_th || '',
                        zh: missionRaw.content_zh || '',
                      }}
                      onUpdate={refetch}
                      multiline
                    >
                      {missionSection?.content || t('about.mission.content')}
                    </EditableTableText>
                  ) : (
                    t('about.mission.content')
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Core Values - Colored Cards */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-12 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ key, icon: Icon, color }) => (
              <div key={key} className="bg-card rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl text-foreground">
                  {t(`about.values.${key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History - Split Layout */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {historyRaw && (
                <EditableTableImage
                  tableName="about_content"
                  recordId={historyRaw.id}
                  currentUrl={historyRaw.image_url}
                  onUpdate={refetch}
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden"
                >
                  {historyRaw.image_url ? (
                    <img src={historyRaw.image_url} alt="History" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <History className="w-16 h-16 text-primary" />
                    </div>
                  )}
                </EditableTableImage>
              )}
            </div>
            <div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <History className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                {historyRaw ? (
                  <EditableTableText
                    tableName="about_content"
                    recordId={historyRaw.id}
                    fieldPrefix="title"
                    currentValue={{
                      en: historyRaw.title_en || '',
                      la: historyRaw.title_la || '',
                      th: historyRaw.title_th || '',
                      zh: historyRaw.title_zh || '',
                    }}
                    onUpdate={refetch}
                  >
                    {historySection?.title || t('about.history.title')}
                  </EditableTableText>
                ) : (
                  t('about.history.title')
                )}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {historyRaw ? (
                  <EditableTableText
                    tableName="about_content"
                    recordId={historyRaw.id}
                    fieldPrefix="content"
                    currentValue={{
                      en: historyRaw.content_en || '',
                      la: historyRaw.content_la || '',
                      th: historyRaw.content_th || '',
                      zh: historyRaw.content_zh || '',
                    }}
                    onUpdate={refetch}
                    multiline
                  >
                    {historySection?.content || t('about.history.content')}
                  </EditableTableText>
                ) : (
                  t('about.history.content')
                )}
              </p>
              <div className="flex items-center gap-6">
                <div className="font-display text-6xl text-primary">25+</div>
                <p className="text-muted-foreground">{t('hero.stats.experience')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Minimal */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {teamRaw && (
              <EditableTableImage
                tableName="about_content"
                recordId={teamRaw.id}
                currentUrl={teamRaw.image_url}
                onUpdate={refetch}
                className="w-full aspect-video mb-10 rounded-lg overflow-hidden"
              >
                {teamRaw.image_url ? (
                  <img src={teamRaw.image_url} alt="Team" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-accent/50 flex items-center justify-center">
                    <Users className="w-16 h-16 text-primary" />
                  </div>
                )}
              </EditableTableImage>
            )}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              {teamRaw ? (
                <EditableTableText
                  tableName="about_content"
                  recordId={teamRaw.id}
                  fieldPrefix="title"
                  currentValue={{
                    en: teamRaw.title_en || '',
                    la: teamRaw.title_la || '',
                    th: teamRaw.title_th || '',
                    zh: teamRaw.title_zh || '',
                  }}
                  onUpdate={refetch}
                >
                  {teamSection?.title || t('about.team.title')}
                </EditableTableText>
              ) : (
                t('about.team.title')
              )}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {teamRaw ? (
                <EditableTableText
                  tableName="about_content"
                  recordId={teamRaw.id}
                  fieldPrefix="content"
                  currentValue={{
                    en: teamRaw.content_en || '',
                    la: teamRaw.content_la || '',
                    th: teamRaw.content_th || '',
                    zh: teamRaw.content_zh || '',
                  }}
                  onUpdate={refetch}
                  multiline
                >
                  {teamSection?.content || t('about.team.content')}
                </EditableTableText>
              ) : (
                t('about.team.content')
              )}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
