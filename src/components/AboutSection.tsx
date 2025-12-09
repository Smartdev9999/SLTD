import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAboutContent } from "@/hooks/useAboutContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackFeatureKeys = ['osha', 'certified', 'flexible', 'customized', 'bilingual', 'digital'] as const;

export const AboutSection = () => {
  const { t } = useTranslation();
  const { sections, isLoading, getSection } = useAboutContent();
  const { getSetting } = useSiteSettings();

  // Get main about content
  const mainContent = getSection('home_main');
  
  // Get feature sections (feature_*)
  const featureSections = sections?.filter(s => s.section_key.startsWith('feature_')) || [];

  // Get years experience from settings
  const yearsValue = getSetting('hero_stat1_value') || "25+";
  const yearsLabel = getSetting('hero_stat1_label') || t('hero.stats.experience');

  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] bg-accent rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-accent to-foreground/80 flex items-center justify-center">
                <span className="font-display text-6xl text-primary opacity-20">LSTD</span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
              <div className="font-display text-5xl">{yearsValue}</div>
              <div className="text-primary-foreground/80 text-sm">{yearsLabel}</div>
            </div>
          </div>
          
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              {t('about.sectionLabel')}
            </p>
            
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-3/4 mb-2" />
                <Skeleton className="h-12 w-1/2 mb-6" />
                <Skeleton className="h-24 w-full mb-8" />
              </>
            ) : mainContent ? (
              <>
                <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                  {mainContent.title}
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {mainContent.content}
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                  {t('about.title1')}
                  <br />
                  <span className="text-primary">{t('about.title2')}</span>
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t('about.description')}
                </p>
              </>
            )}
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full" />
                ))
              ) : featureSections.length > 0 ? (
                featureSections.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">
                      {feature.title_en || feature.section_key.replace('feature_', '')}
                    </span>
                  </div>
                ))
              ) : (
                fallbackFeatureKeys.map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{t(`about.features.${key}`)}</span>
                  </div>
                ))
              )}
            </div>
            
            <Button size="lg" asChild>
              <Link to="/about">
                {t('about.learnMore')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
