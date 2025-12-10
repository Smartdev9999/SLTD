import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { CheckCircle2, Target, Eye, Heart, History, Users, Loader2 } from 'lucide-react';
import { useAboutContent } from '@/hooks/useAboutContent';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import { EditableTableImage } from '@/components/front-edit/EditableTableImage';

export const About = () => {
  const { t } = useTranslation();
  const { getSection, getSectionRaw, isLoading, refetch } = useAboutContent();

  const values = [
    { key: 'safety', icon: CheckCircle2 },
    { key: 'excellence', icon: Target },
    { key: 'integrity', icon: Heart },
    { key: 'innovation', icon: Eye },
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
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('about.sectionLabel')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
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
              <>
                {t('about.title1')}
                <br />
                <span className="text-primary">{t('about.title2')}</span>
              </>
            )}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
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
                {visionRaw && (
                  <EditableTableImage
                    tableName="about_content"
                    recordId={visionRaw.id}
                    currentUrl={visionRaw.image_url}
                    onUpdate={refetch}
                    className="w-full aspect-video mb-4 rounded-lg overflow-hidden"
                  >
                    {visionRaw.image_url ? (
                      <img src={visionRaw.image_url} alt="Vision" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-accent flex items-center justify-center">
                        <Eye className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </EditableTableImage>
                )}
                {!visionRaw && <Eye className="w-12 h-12 text-primary mb-4" />}
                <h2 className="font-display text-2xl text-foreground mb-4">
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
                <p className="text-muted-foreground">
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
              <div className="bg-card border border-border rounded-lg p-8">
                {missionRaw && (
                  <EditableTableImage
                    tableName="about_content"
                    recordId={missionRaw.id}
                    currentUrl={missionRaw.image_url}
                    onUpdate={refetch}
                    className="w-full aspect-video mb-4 rounded-lg overflow-hidden"
                  >
                    {missionRaw.image_url ? (
                      <img src={missionRaw.image_url} alt="Mission" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-accent flex items-center justify-center">
                        <Target className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </EditableTableImage>
                )}
                {!missionRaw && <Target className="w-12 h-12 text-primary mb-4" />}
                <h2 className="font-display text-2xl text-foreground mb-4">
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
                <p className="text-muted-foreground">
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
              {historyRaw && (
                <EditableTableImage
                  tableName="about_content"
                  recordId={historyRaw.id}
                  currentUrl={historyRaw.image_url}
                  onUpdate={refetch}
                  className="w-full aspect-video mb-4 rounded-lg overflow-hidden"
                >
                  {historyRaw.image_url ? (
                    <img src={historyRaw.image_url} alt="History" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-accent flex items-center justify-center">
                      <History className="w-12 h-12 text-primary" />
                    </div>
                  )}
                </EditableTableImage>
              )}
              {!historyRaw && <History className="w-12 h-12 text-primary mb-4" />}
              <h2 className="font-display text-3xl text-foreground mb-4">
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
              <p className="text-muted-foreground text-lg">
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
            {teamRaw && (
              <EditableTableImage
                tableName="about_content"
                recordId={teamRaw.id}
                currentUrl={teamRaw.image_url}
                onUpdate={refetch}
                className="w-full aspect-video mb-6 rounded-lg overflow-hidden"
              >
                {teamRaw.image_url ? (
                  <img src={teamRaw.image_url} alt="Team" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-accent flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                )}
              </EditableTableImage>
            )}
            {!teamRaw && <Users className="w-12 h-12 text-primary mx-auto mb-4" />}
            <h2 className="font-display text-3xl text-foreground mb-4">
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
            <p className="text-muted-foreground text-lg">
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