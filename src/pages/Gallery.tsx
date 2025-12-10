import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useGallery } from '@/hooks/useGallery';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, ZoomIn } from 'lucide-react';
import { EditableTableImage } from '@/components/front-edit/EditableTableImage';
import { EditableTableText } from '@/components/front-edit/EditableTableText';
import heroGallery from '@/assets/hero-gallery.jpg';

// Fallback images
import projectPartnership from '@/assets/project-partnership.jpg';
import projectEcommerce from '@/assets/project-ecommerce-new.jpg';
import projectWarehouse from '@/assets/project-warehouse.jpg';
import projectLogistics from '@/assets/project-logistics.jpg';

const fallbackImages = [projectPartnership, projectEcommerce, projectWarehouse, projectLogistics];

const Gallery = () => {
  const { t } = useTranslation();
  const { gallery, categories, isLoading, refetch, rawGallery } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const filteredGallery = selectedCategory
    ? gallery.filter(item => item.category === selectedCategory)
    : gallery;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroGallery})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        <div className="container relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
            {t('gallery.subtitle', 'Photo Collection')}
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6">
            {t('gallery.title', 'GALLERY')}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t('gallery.description', 'Browse our collection of photos showcasing our operations, team, and achievements.')}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="py-8 bg-muted/30 border-b">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                {t('common.all', 'All')}
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-16 flex-1">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t('gallery.noPhotos', 'No photos available yet. Check back soon!')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.map((item, index) => {
                const rawItem = rawGallery.find(r => r.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer"
                    onClick={() => setLightboxImage({ url: item.image_url || fallbackImages[index % fallbackImages.length], title: item.title })}
                  >
                    <EditableTableImage
                      tableName="gallery"
                      recordId={item.id}
                      currentUrl={item.image_url}
                      onUpdate={refetch}
                      className="w-full h-full"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImages[index % fallbackImages.length];
                        }}
                      />
                    </EditableTableImage>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <ZoomIn className="absolute top-4 right-4 w-6 h-6 text-white" />
                      <EditableTableText
                        tableName="gallery"
                        recordId={item.id}
                        fieldPrefix="title"
                        currentValue={{
                          en: rawItem?.title_en || '',
                          la: rawItem?.title_la || '',
                          th: rawItem?.title_th || '',
                          zh: rawItem?.title_zh || '',
                        }}
                        onUpdate={refetch}
                      >
                        <h3 className="font-display text-lg text-white">{item.title}</h3>
                      </EditableTableText>
                      {item.description && (
                        <EditableTableText
                          tableName="gallery"
                          recordId={item.id}
                          fieldPrefix="description"
                          currentValue={{
                            en: rawItem?.description_en || '',
                            la: rawItem?.description_la || '',
                            th: rawItem?.description_th || '',
                            zh: rawItem?.description_zh || '',
                          }}
                          onUpdate={refetch}
                          multiline
                        >
                          <p className="text-white/70 text-sm mt-1 line-clamp-2">{item.description}</p>
                        </EditableTableText>
                      )}
                      {item.category && (
                        <span className="inline-block mt-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded capitalize">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">{lightboxImage?.title}</DialogTitle>
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          {lightboxImage && (
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
