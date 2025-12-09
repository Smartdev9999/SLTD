import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { Calendar, ArrowRight, Newspaper, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const newsItems = [
  {
    id: 1,
    type: 'article',
    title: 'LSTD Launches New Advanced Safety Training Program',
    excerpt: 'Our latest training program introduces cutting-edge safety techniques for industrial environments.',
    date: '2024-01-15',
    image: null,
  },
  {
    id: 2,
    type: 'press',
    title: 'LSTD Partners with National Safety Council',
    excerpt: 'Strategic partnership to enhance safety standards across the region.',
    date: '2024-01-10',
    image: null,
  },
  {
    id: 3,
    type: 'article',
    title: 'Understanding New OSHA Regulations for 2024',
    excerpt: 'A comprehensive guide to the latest OSHA updates and compliance requirements.',
    date: '2024-01-05',
    image: null,
  },
  {
    id: 4,
    type: 'press',
    title: 'LSTD Celebrates 25 Years of Excellence',
    excerpt: 'Marking a quarter century of commitment to workplace safety.',
    date: '2023-12-20',
    image: null,
  },
];

export const News = () => {
  const { t } = useTranslation();

  const articles = newsItems.filter(item => item.type === 'article');
  const pressReleases = newsItems.filter(item => item.type === 'press');

  const NewsCard = ({ item }: { item: typeof newsItems[0] }) => (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-accent flex items-center justify-center">
        <Newspaper className="w-12 h-12 text-primary/30" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          {new Date(item.date).toLocaleDateString()}
        </div>
        <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
        <Button variant="link" className="p-0 h-auto text-primary">
          {t('news.readMore')}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );

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
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
              <TabsTrigger value="articles">{t('news.articles')}</TabsTrigger>
              <TabsTrigger value="press">{t('news.pressReleases')}</TabsTrigger>
              <TabsTrigger value="gallery">{t('news.gallery')}</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="articles">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="press">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pressReleases.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="aspect-square bg-accent rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-primary/30" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageLayout>
  );
};

export default News;
