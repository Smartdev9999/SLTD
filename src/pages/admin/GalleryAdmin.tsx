import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { MultilingualInput } from '@/components/admin/MultilingualInput';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Image } from 'lucide-react';

interface GalleryItem {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  image_url: string;
  category: string | null;
  featured: boolean | null;
  sort_order: number | null;
  created_at: string;
}

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  
  const [formData, setFormData] = useState({
    title: { en: '', la: '', th: '', zh: '' },
    description: { en: '', la: '', th: '', zh: '' },
    image_url: '',
    category: '',
    featured: false,
    sort_order: 0,
  });

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load gallery');
      console.error(error);
    } else {
      setGallery(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setFormData({
      title: { en: '', la: '', th: '', zh: '' },
      description: { en: '', la: '', th: '', zh: '' },
      image_url: '',
      category: '',
      featured: false,
      sort_order: 0,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: { 
        en: item.title_en, 
        la: item.title_la || '', 
        th: item.title_th || '', 
        zh: item.title_zh || '' 
      },
      description: { 
        en: item.description_en || '', 
        la: item.description_la || '', 
        th: item.description_th || '', 
        zh: item.description_zh || '' 
      },
      image_url: item.image_url,
      category: item.category || '',
      featured: item.featured || false,
      sort_order: item.sort_order || 0,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.en.trim()) {
      toast.error('English title is required');
      return;
    }

    if (!formData.image_url.trim()) {
      toast.error('Image is required');
      return;
    }

    const payload = {
      title_en: formData.title.en,
      title_la: formData.title.la || null,
      title_th: formData.title.th || null,
      title_zh: formData.title.zh || null,
      description_en: formData.description.en || null,
      description_la: formData.description.la || null,
      description_th: formData.description.th || null,
      description_zh: formData.description.zh || null,
      image_url: formData.image_url,
      category: formData.category || null,
      featured: formData.featured,
      sort_order: formData.sort_order,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('gallery')
        .update(payload)
        .eq('id', editingItem.id);
      
      if (error) {
        toast.error('Failed to update gallery item');
        console.error(error);
      } else {
        toast.success('Gallery item updated successfully');
        fetchGallery();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from('gallery').insert(payload);
      
      if (error) {
        toast.error('Failed to create gallery item');
        console.error(error);
      } else {
        toast.success('Gallery item created successfully');
        fetchGallery();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    
    if (error) {
      toast.error('Failed to delete gallery item');
      console.error(error);
    } else {
      toast.success('Gallery item deleted successfully');
      fetchGallery();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display">Gallery</h1>
            <p className="text-muted-foreground">Manage gallery photos</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Photo</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Photo' : 'Add Photo'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Photo <span className="text-destructive">*</span></Label>
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                    folder="gallery"
                  />
                </div>

                <MultilingualInput
                  label="Title"
                  values={formData.title}
                  onChange={(lang, value) => setFormData(prev => ({
                    ...prev,
                    title: { ...prev.title, [lang]: value }
                  }))}
                  required
                />
                
                <MultilingualInput
                  label="Description"
                  values={formData.description}
                  onChange={(lang, value) => setFormData(prev => ({
                    ...prev,
                    description: { ...prev.description, [lang]: value }
                  }))}
                  type="textarea"
                />
                
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Warehouse, Fleet, Team"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingItem ? 'Update' : 'Add'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : gallery.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              No photos yet. Add your first one!
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <img 
                    src={item.image_url} 
                    alt={item.title_en} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-sm text-muted-foreground">Image not found</span></div>';
                    }}
                  />
                  {item.featured && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base truncate">{item.title_en}</CardTitle>
                      {item.category && (
                        <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(item)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryAdmin;
