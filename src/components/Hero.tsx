import { ArrowRight, Building2, MapPin, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/front-edit/EditableText";
import { EditableImage } from "@/components/front-edit/EditableImage";

export const Hero = () => {
  const { t } = useTranslation();
  const { getSetting, getSettingAllLanguages, getSettingImage, refetch } = useSiteSettings();

  const heroBackgroundImage = getSettingImage('hero_background_image');

  // Get dynamic values from settings, fallback to translations
  const badge = getSetting('hero_badge') || t('hero.badge');
  const title1 = getSetting('hero_title1') || t('hero.title1');
  const title2 = getSetting('hero_title2') || t('hero.title2');
  const title3 = getSetting('hero_title3') || t('hero.title3');
  const subtitle = getSetting('hero_subtitle') || t('hero.subtitle');

  const stats = [
    { 
      icon: Building2, 
      valueKey: 'hero_stat1_value',
      labelKey: 'hero_stat1_label',
      value: getSetting('hero_stat1_value') || "25+", 
      label: getSetting('hero_stat1_label') || t('hero.stats.experience')
    },
    { 
      icon: MapPin, 
      valueKey: 'hero_stat2_value',
      labelKey: 'hero_stat2_label',
      value: getSetting('hero_stat2_value') || "18", 
      label: getSetting('hero_stat2_label') || t('hero.stats.certifications')
    },
    { 
      icon: Banknote, 
      valueKey: 'hero_stat3_value',
      labelKey: 'hero_stat3_label',
      value: getSetting('hero_stat3_value') || "10M+", 
      label: getSetting('hero_stat3_label') || t('hero.stats.professionals')
    },
  ];

  const getEditableValues = (key: string, fallback: string) => {
    const allLangs = getSettingAllLanguages(key);
    return {
      en: allLangs?.en || fallback,
      la: allLangs?.la || fallback,
      th: allLangs?.th || fallback,
      zh: allLangs?.zh || fallback,
    };
  };

  return (
    <section className="relative min-h-screen flex items-center hero-gradient pt-32 overflow-hidden">
      {/* Background Image */}
      <EditableImage
        settingKey="hero_background_image"
        currentUrl={heroBackgroundImage}
        onUpdate={refetch}
        className="absolute inset-0 z-0"
      >
        {heroBackgroundImage ? (
          <img 
            src={heroBackgroundImage} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </EditableImage>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-foreground/60 z-[1]" />
      
      <div className="absolute inset-0 opacity-10 z-[2]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-64 bg-primary z-[3]" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Building2 className="w-4 h-4" />
            <EditableText
              settingKey="hero_badge"
              currentValue={getEditableValues('hero_badge', t('hero.badge'))}
              onUpdate={refetch}
            >
              {badge}
            </EditableText>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-background leading-none mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <EditableText
              settingKey="hero_title1"
              currentValue={getEditableValues('hero_title1', t('hero.title1'))}
              onUpdate={refetch}
            >
              {title1}
            </EditableText>
            <br />
            <span className="text-primary">
              <EditableText
                settingKey="hero_title2"
                currentValue={getEditableValues('hero_title2', t('hero.title2'))}
                onUpdate={refetch}
              >
                {title2}
              </EditableText>
            </span>
            <br />
            <EditableText
              settingKey="hero_title3"
              currentValue={getEditableValues('hero_title3', t('hero.title3'))}
              onUpdate={refetch}
            >
              {title3}
            </EditableText>
          </h1>
          
          <p className="text-lg md:text-xl text-background/70 max-w-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <EditableText
              settingKey="hero_subtitle"
              currentValue={getEditableValues('hero_subtitle', t('hero.subtitle'))}
              onUpdate={refetch}
              multiline
            >
              {subtitle}
            </EditableText>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="text-base px-8" asChild>
              <Link to="/services">
                {t('hero.viewCourses')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-background/30 text-background hover:bg-background/10 hover:text-background" asChild>
              <Link to="/contact">
                {t('hero.requestQuote')}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <stat.icon className="w-6 h-6 text-primary mb-2 mx-auto sm:mx-0" />
                <div className="font-display text-3xl md:text-4xl text-background">
                  <EditableText
                    settingKey={stat.valueKey}
                    currentValue={getEditableValues(stat.valueKey, stat.value)}
                    onUpdate={refetch}
                  >
                    {stat.value}
                  </EditableText>
                </div>
                <div className="text-sm text-background/60">
                  <EditableText
                    settingKey={stat.labelKey}
                    currentValue={getEditableValues(stat.labelKey, stat.label)}
                    onUpdate={refetch}
                  >
                    {stat.label}
                  </EditableText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};