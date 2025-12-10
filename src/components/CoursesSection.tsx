import { CourseCard } from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { EditableTableText } from "@/components/front-edit/EditableTableText";

export const CoursesSection = () => {
  const { t } = useTranslation();
  const { services, isLoading, refetch } = useServices();

  // Take first 6 services for homepage display
  const displayServices = services.slice(0, 6);

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
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-6 rounded-lg border border-border">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : displayServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayServices.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  <EditableTableText
                    tableName="services"
                    recordId={service.id}
                    fieldPrefix="title"
                    currentValue={{
                      en: service.title_en || '',
                      la: service.title_la || '',
                      th: service.title_th || '',
                      zh: service.title_zh || '',
                    }}
                    onUpdate={refetch}
                  >
                    {service.title}
                  </EditableTableText>
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  <EditableTableText
                    tableName="services"
                    recordId={service.id}
                    fieldPrefix="description"
                    currentValue={{
                      en: service.description_en || '',
                      la: service.description_la || '',
                      th: service.description_th || '',
                      zh: service.description_zh || '',
                    }}
                    onUpdate={refetch}
                    multiline
                  >
                    {service.description}
                  </EditableTableText>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground mb-12">
            {t('courses.noServices', 'No services available')}
          </div>
        )}
        
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