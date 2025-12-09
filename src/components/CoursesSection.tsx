import { CourseCard } from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const courseKeys = ['osha10', 'osha30', 'forklift', 'confined', 'fall', 'hazmat'] as const;

const courseMeta = [
  { duration: "Nationwide", participants: "24/7 Operations", certification: "Full Service", featured: false },
  { duration: "All Provinces", participants: "High Capacity", certification: "Full Service", featured: true },
  { duration: "Major Routes", participants: "Instant Processing", certification: "Technology", featured: false },
  { duration: "Real-time", participants: "Government Partners", certification: "Analytics", featured: false },
  { duration: "All Sites", participants: "Expert Team", certification: "Maintenance", featured: false },
  { duration: "On Demand", participants: "Custom Solutions", certification: "Advisory", featured: false },
];

export const CoursesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              {t('courses.sectionLabel')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              {t('courses.title1')}
              <br />
              <span className="text-primary">{t('courses.title2')}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            {t('courses.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courseKeys.map((key, index) => (
            <CourseCard
              key={key}
              title={t(`courses.list.${key}.title`)}
              description={t(`courses.list.${key}.description`)}
              duration={courseMeta[index].duration}
              participants={courseMeta[index].participants}
              certification={courseMeta[index].certification}
              featured={courseMeta[index].featured}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/services">
              {t('courses.viewAll')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
