import { ArrowRight, Building2, MapPin, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const stats = [
  { icon: Building2, value: "25+", labelKey: "experience" },
  { icon: MapPin, value: "18", labelKey: "certifications" },
  { icon: Banknote, value: "10M+", labelKey: "professionals" },
];

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center hero-gradient pt-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-64 bg-primary" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Building2 className="w-4 h-4" />
            {t('hero.badge')}
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-background leading-none mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t('hero.title1')}
            <br />
            <span className="text-primary">{t('hero.title2')}</span>
            <br />
            {t('hero.title3')}
          </h1>
          
          <p className="text-lg md:text-xl text-background/70 max-w-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t('hero.subtitle')}
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
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center sm:text-left">
                <stat.icon className="w-6 h-6 text-primary mb-2 mx-auto sm:mx-0" />
                <div className="font-display text-3xl md:text-4xl text-background">{stat.value}</div>
                <div className="text-sm text-background/60">{t(`hero.stats.${stat.labelKey}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
