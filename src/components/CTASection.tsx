import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/10 skew-x-12 translate-x-1/4" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl text-background mb-6">
            {t('cta.title1')}
            <br />
            <span className="text-primary">{t('cta.title2')}</span>
          </h2>
          
          <p className="text-background/70 text-lg mb-10 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8" asChild>
              <Link to="/contact">
                {t('cta.schedule')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 bg-transparent border-background/30 text-background hover:bg-background/10 hover:text-background"
              asChild
            >
              <a href="tel:+1234567890">
                <Phone className="w-5 h-5 mr-2" />
                {t('cta.call')} (123) 456-7890
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
