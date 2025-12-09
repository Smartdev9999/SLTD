import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { MultilingualInput } from '@/components/admin/MultilingualInput';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface AboutItem {
  id: string;
  section_key: string;
  title_en: string | null;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  content_en: string | null;
  content_la: string | null;
  content_th: string | null;
  content_zh: string | null;
  image_url: string | null;
  sort_order: number | null;
  created_at: string;
}

const AboutAdmin = () => {
  const [aboutSections, setAboutSections] = useState<AboutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AboutItem | null>(null);
  
  const [formData, setFormData] = useState({
    section_key: '',
    title: { en: '', la: '', th: '', zh: '' },
    content: { en: '', la: '', th: '', zh: '' },
    image_url: '',
    sort_order: 0,
  });

  const fetchAboutSections = async () => {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      toast.error('Failed to load about content');
      console.error(error);
    } else {
      setAboutSections(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAboutSections();
  }, []);

  const resetForm = () => {
    setFormData({
      section_key: '',
      title: { en: '', la: '', th: '', zh: '' },
      content: { en: '', la: '', th: '', zh: '' },
      image_url: '',
      sort_order: 0,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: AboutItem) => {
    setEditingItem(item);
    setFormData({
      section_key: item.section_key,
      title: { 
        en: item.title_en || '', 
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
      image_url: item.image_url || '',
      sort_order: item.sort_order || 0,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.section_key.trim()) {
      toast.error('Section key is required');
      return;
    }

    const payload = {
      section_key: formData.section_key,
      title_en: formData.title.en || null,
      title_la: formData.title.la || null,
      title_th: formData.title.th || null,
      title_zh: formData.title.zh || null,
      content_en: formData.content.en || null,
      content_la: formData.content.la || null,
      content_th: formData.content.th || null,
      content_zh: formData.content.zh || null,
      image_url: formData.image_url || null,
      sort_order: formData.sort_order,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('about_content')
        .update(payload)
        .eq('id', editingItem.id);
      
      if (error) {
        toast.error('Failed to update section');
        console.error(error);
      } else {
        toast.success('Section updated successfully');
        fetchAboutSections();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from('about_content').insert(payload);
      
      if (error) {
        if (error.code === '23505') {
          toast.error('A section with this key already exists');
        } else {
          toast.error('Failed to create section');
          console.error(error);
        }
      } else {
        toast.success('Section created successfully');
        fetchAboutSections();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    
    const { error } = await supabase.from('about_content').delete().eq('id', id);
    
    if (error) {
      toast.error('Failed to delete section');
      console.error(error);
    } else {
      toast.success('Section deleted successfully');
      fetchAboutSections();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display">About Page</h1>
            <p className="text-muted-foreground">Manage About page sections</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Section</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Section' : 'Create Section'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section Key <span className="text-destructive">*</span></Label>
                    <Input
                      value={formData.section_key}
                      onChange={(e) => setFormData(prev => ({ ...prev, section_key: e.target.value }))}
                      placeholder="e.g., mission, vision, history"
                      disabled={!!editingItem}
                    />
                    <p className="text-xs text-muted-foreground">Unique identifier for this section</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
                
                <MultilingualInput
                  label="Title"
                  values={formData.title}
                  onChange={(lang, value) => setFormData(prev => ({
                    ...prev,
                    title: { ...prev.title, [lang]: value }
                  }))}
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
                  <Label>Image</Label>
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                    folder="about"
                  />
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
        ) : aboutSections.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No about sections yet. Create sections like mission, vision, history, etc.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {aboutSections.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-4">
                    {item.image_url && (
                      <img src={item.image_url} alt="" className="h-16 w-24 object-cover rounded" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{item.title_en || item.section_key}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Key: {item.section_key} • Order: {item.sort_order}
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

export default AboutAdmin;
