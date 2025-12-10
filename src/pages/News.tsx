import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { Calendar, ArrowRight, Newspaper, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNews } from '@/hooks/useNews';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import { EditableTableImage } from '@/components/front-edit/EditableTableImage';

export const News = () => {
  const { t } = useTranslation();
  const { news, rawNews, isLoading, refetch } = useNews();

  const getRawItem = (id: string) => rawNews.find(n => n.id === id);

  const NewsCard = ({ item }: { item: typeof news[0] }) => {
    const raw = getRawItem(item.id);
    
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <EditableTableImage
          tableName="news"
          recordId={item.id}
          currentUrl={item.image_url}
          onUpdate={refetch}
          className="aspect-video bg-accent flex items-center justify-center overflow-hidden"
        >
          {item.image_url ? (
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <Newspaper className="w-12 h-12 text-primary/30" />
          )}
        </EditableTableImage>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="w-4 h-4" />
            {item.published_at 
              ? new Date(item.published_at).toLocaleDateString() 
              : new Date(item.created_at).toLocaleDateString()}
          </div>
          <h3 className="font-display text-xl text-foreground mb-2">
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
          <Button variant="link" className="p-0 h-auto text-primary">
            {t('news.readMore')}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('news.subtitle')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            {t('news.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('news.description')}
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {t('news.noNews')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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