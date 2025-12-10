import { ArrowRight, Truck, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/front-edit/EditableText";
import { EditableImage } from "@/components/front-edit/EditableImage";
import heroHomeImage from "@/assets/hero-home.jpg";

export const Hero = () => {
  const { t } = useTranslation();
  const { getSetting, getSettingAllLanguages, getSettingImage, refetch, isLoading } = useSiteSettings();

  const heroBackgroundImage = getSettingImage('hero_background_image');

  // Get dynamic values from settings, fallback to translations
  const badge = getSetting('hero_badge') || t('hero.badge');
  const title1 = getSetting('hero_title1') || t('hero.title1');
  const title2 = getSetting('hero_title2') || t('hero.title2');
  const title3 = getSetting('hero_title3') || t('hero.title3');
  const subtitle = getSetting('hero_subtitle') || t('hero.subtitle');

  const stats = [
    { 
      icon: Truck, 
      valueKey: 'hero_stat1_value',
      labelKey: 'hero_stat1_label',
      value: getSetting('hero_stat1_value') || "15+", 
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
      icon: Package, 
      valueKey: 'hero_stat3_value',
      labelKey: 'hero_stat3_label',
      value: getSetting('hero_stat3_value') || "1M+", 
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

  // Use database image if available, otherwise use static image
  const backgroundImage = heroBackgroundImage || heroHomeImage;

  // Show loading state with background but hide text until loaded
  const contentOpacity = isLoading ? 'opacity-0' : 'opacity-100';

  return (
    <section className="relative min-h-[100svh] flex items-end pb-16 md:pb-24 overflow-hidden">
      {/* Background Image */}
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <EditableImage
        settingKey="hero_background_image"
        currentUrl={heroBackgroundImage}
        onUpdate={refetch}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="w-full h-full" />
      </EditableImage>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-[1]" />
      
      {/* Accent line */}
      <div className="absolute left-0 bottom-1/3 w-2 h-64 bg-primary z-[3]" />
      
      <div className={`container relative z-10 transition-opacity duration-300 ${contentOpacity}`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
            <Truck className="w-4 h-4" />
            <EditableText
              settingKey="hero_badge"
              currentValue={getEditableValues('hero_badge', t('hero.badge'))}
              onUpdate={refetch}
            >
              {badge}
            </EditableText>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
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
          
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
              <Link to="/contact">
                {t('hero.requestQuote')}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <stat.icon className="w-6 h-6 text-primary mb-2 mx-auto sm:mx-0" />
                <div className="font-display text-3xl md:text-4xl text-white">
                  <EditableText
                    settingKey={stat.valueKey}
                    currentValue={getEditableValues(stat.valueKey, stat.value)}
                    onUpdate={refetch}
                  >
                    {stat.value}
                  </EditableText>
                </div>
                <div className="text-sm text-white/70">
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