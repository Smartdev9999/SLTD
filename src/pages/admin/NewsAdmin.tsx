import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { MultilingualInput } from '@/components/admin/MultilingualInput';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NewsItem {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  content_en: string | null;
  content_la: string | null;
  content_th: string | null;
  content_zh: string | null;
  excerpt_en: string | null;
  excerpt_la: string | null;
  excerpt_th: string | null;
  excerpt_zh: string | null;
  image_url: string | null;
  published: boolean | null;
  created_at: string;
}

const NewsAdmin = () => {
  const { user } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  
  const [formData, setFormData] = useState({
    title: { en: '', la: '', th: '', zh: '' },
    content: { en: '', la: '', th: '', zh: '' },
    excerpt: { en: '', la: '', th: '', zh: '' },
    image_url: '',
    published: false,
  });

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load news');
      console.error(error);
    } else {
      setNews(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setFormData({
      title: { en: '', la: '', th: '', zh: '' },
      content: { en: '', la: '', th: '', zh: '' },
      excerpt: { en: '', la: '', th: '', zh: '' },
      image_url: '',
      published: false,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: { 
        en: item.title_en, 
        la: item.title_la || '', 
        th: item.title_th || '', 
        zh: item.title_zh || '' 
      },
      content: { 
        en: item.content_en || '', 
        la: item.content_la || '', 
        th: item.content_th || '', 
        zh: item.content_zh || '' 
      },
      excerpt: { 
        en: item.excerpt_en || '', 
        la: item.excerpt_la || '', 
        th: item.excerpt_th || '', 
        zh: item.excerpt_zh || '' 
      },
      image_url: item.image_url || '',
      published: item.published || false,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.en.trim()) {
      toast.error('English title is required');
      return;
    }

    const payload = {
      title_en: formData.title.en,
      title_la: formData.title.la || null,
      title_th: formData.title.th || null,
      title_zh: formData.title.zh || null,
      content_en: formData.content.en || null,
      content_la: formData.content.la || null,
      content_th: formData.content.th || null,
      content_zh: formData.content.zh || null,
      excerpt_en: formData.excerpt.en || null,
      excerpt_la: formData.excerpt.la || null,
      excerpt_th: formData.excerpt.th || null,
      excerpt_zh: formData.excerpt.zh || null,
      image_url: formData.image_url || null,
      published: formData.published,
      published_at: formData.published ? new Date().toISOString() : null,
      author_id: user?.id,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('news')
        .update(payload)
        .eq('id', editingItem.id);
      
      if (error) {
        toast.error('Failed to update news');
        console.error(error);
      } else {
        toast.success('News updated successfully');
        fetchNews();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from('news').insert(payload);
      
      if (error) {
        toast.error('Failed to create news');
        console.error(error);
      } else {
        toast.success('News created successfully');
        fetchNews();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    
    const { error } = await supabase.from('news').delete().eq('id', id);
    
    if (error) {
      toast.error('Failed to delete news');
      console.error(error);
    } else {
      toast.success('News deleted successfully');
      fetchNews();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display">News</h1>
            <p className="text-muted-foreground">Manage news articles</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add News</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit News' : 'Create News'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  label="Excerpt"
                  values={formData.excerpt}
                  onChange={(lang, value) => setFormData(prev => ({
                    ...prev,
                    excerpt: { ...prev.excerpt, [lang]: value }
                  }))}
                  type="textarea"
                />
                
                <MultilingualInput
                  label="Content"
                  values={formData.content}
                  onChange={(lang, value) => setFormData(prev => ({
                    ...prev,
                    content: { ...prev.content, [lang]: value }
                  }))}
                  type="textarea"
                />
                
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                    folder="news"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingItem ? 'Update' : 'Create'}
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
        ) : news.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No news articles yet. Create your first one!
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {news.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-4">
                    {item.image_url && (
                      <img src={item.image_url} alt="" className="h-16 w-24 object-cover rounded" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{item.title_en}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()} • 
                        {item.published ? ' Published' : ' Draft'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default NewsAdmin;
