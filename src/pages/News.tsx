import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { Calendar, ArrowRight, Newspaper, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNews } from '@/hooks/useNews';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import { EditableTableImage } from '@/components/front-edit/EditableTableImage';
import heroImage from '@/assets/hero-news.jpg';

export const News = () => {
  const { t } = useTranslation();
  const { news, rawNews, isLoading, refetch } = useNews();

  const getRawItem = (id: string) => rawNews.find(n => n.id === id);

  const NewsCard = ({ item }: { item: typeof news[0] }) => {
    const raw = getRawItem(item.id);
    
    return (
      <div className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all">
        <EditableTableImage
          tableName="news"
          recordId={item.id}
          currentUrl={item.image_url}
          onUpdate={refetch}
          className="aspect-[16/10] bg-muted overflow-hidden"
        >
          {item.image_url ? (
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Newspaper className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
        </EditableTableImage>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            {item.published_at 
              ? new Date(item.published_at).toLocaleDateString() 
              : new Date(item.created_at).toLocaleDateString()}
          </div>
          <h3 className="font-display text-xl text-foreground mb-3 line-clamp-2">
            {raw ? (
              <EditableTableText
                tableName="news"
                recordId={item.id}
                fieldPrefix="title"
                currentValue={{
                  en: raw.title_en || '',
                  la: raw.title_la || '',
                  th: raw.title_th || '',
                  zh: raw.title_zh || '',
                }}
                onUpdate={refetch}
              >
                {item.title}
              </EditableTableText>
            ) : (
              item.title
            )}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {raw ? (
              <EditableTableText
                tableName="news"
                recordId={item.id}
                fieldPrefix="excerpt"
                currentValue={{
                  en: raw.excerpt_en || '',
                  la: raw.excerpt_la || '',
                  th: raw.excerpt_th || '',
                  zh: raw.excerpt_zh || '',
                }}
                onUpdate={refetch}
                multiline
              >
                {item.excerpt}
              </EditableTableText>
            ) : (
              item.excerpt
            )}
          </p>
          <Button variant="ghost" className="p-0 h-auto text-primary">
            {t('news.readMore')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageLayout>
      {/* Hero Section - Full Width with Background Image */}
      <section 
        className="relative min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/70" />
        <div className="container relative z-10 text-center py-20">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">
            {t('news.subtitle')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-background mb-6">
            {t('news.title')}
          </h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            {t('news.description')}
          </p>
        </div>
      </section>

      {/* News Grid - Clean Layout */}
      <section className="py-20">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {t('news.noNews')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map(item => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default News;
