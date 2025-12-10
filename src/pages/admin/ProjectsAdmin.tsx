import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { MultilingualInput } from '@/components/admin/MultilingualInput';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ProjectItem {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  image_url: string | null;
  location: string | null;
  year: string | null;
  status: string | null;
  featured: boolean | null;
  created_at: string;
}

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  
  const [formData, setFormData] = useState({
    title: { en: '', la: '', th: '', zh: '' },
    description: { en: '', la: '', th: '', zh: '' },
    image_url: '',
    location: '',
    year: '',
    status: 'ongoing',
    featured: false,
  });

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load projects');
      console.error(error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setFormData({
      title: { en: '', la: '', th: '', zh: '' },
      description: { en: '', la: '', th: '', zh: '' },
      image_url: '',
      location: '',
      year: '',
      status: 'ongoing',
      featured: false,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: ProjectItem) => {
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
      image_url: item.image_url || '',
      location: item.location || '',
      year: item.year || '',
      status: item.status || 'ongoing',
      featured: item.featured || false,
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
      description_en: formData.description.en || null,
      description_la: formData.description.la || null,
      description_th: formData.description.th || null,
      description_zh: formData.description.zh || null,
      image_url: formData.image_url || null,
      location: formData.location || null,
      year: formData.year || null,
      status: formData.status,
      featured: formData.featured,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', editingItem.id);
      
      if (error) {
        toast.error('Failed to update project');
        console.error(error);
      } else {
        toast.success('Project updated successfully');
        fetchProjects();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from('projects').insert(payload);
      
      if (error) {
        toast.error('Failed to create project');
        console.error(error);
      } else {
        toast.success('Project created successfully');
        fetchProjects();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const { error } = await supabase.from('projects').delete().eq('id', id);
    
    if (error) {
      toast.error('Failed to delete project');
      console.error(error);
    } else {
      toast.success('Project deleted successfully');
      fetchProjects();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display">Projects</h1>
            <p className="text-muted-foreground">Manage company projects</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Project</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Project' : 'Create Project'}</DialogTitle>
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
                  label="Description"
                  values={formData.description}
                  onChange={(lang, value) => setFormData(prev => ({
                    ...prev,
                    description: { ...prev.description, [lang]: value }
                  }))}
                  type="textarea"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Vientiane"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="e.g., 2024"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                    folder="projects"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
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
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No projects yet. Create your first one!
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {projects.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-24 bg-muted rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt="" 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<span class="text-xs text-muted-foreground">No image</span>';
                          }}
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">No image</span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title_en}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {item.location} • {item.year} • {item.status}
                        {item.featured && ' • Featured'}
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

export default ProjectsAdmin;
