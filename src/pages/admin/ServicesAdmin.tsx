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
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ServiceItem {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  icon: string | null;
  sort_order: number | null;
  active: boolean | null;
  created_at: string;
}

const ServicesAdmin = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  
  const [formData, setFormData] = useState({
    title: { en: '', la: '', th: '', zh: '' },
    description: { en: '', la: '', th: '', zh: '' },
    icon: '',
    sort_order: 0,
    active: true,
  });

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      toast.error('Failed to load services');
      console.error(error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setFormData({
      title: { en: '', la: '', th: '', zh: '' },
      description: { en: '', la: '', th: '', zh: '' },
      icon: '',
      sort_order: 0,
      active: true,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: ServiceItem) => {
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
      icon: item.icon || '',
      sort_order: item.sort_order || 0,
      active: item.active ?? true,
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
      icon: formData.icon || null,
      sort_order: formData.sort_order,
      active: formData.active,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('services')
        .update(payload)
        .eq('id', editingItem.id);
      
      if (error) {
        toast.error('Failed to update service');
        console.error(error);
      } else {
        toast.success('Service updated successfully');
        fetchServices();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from('services').insert(payload);
      
      if (error) {
        toast.error('Failed to create service');
        console.error(error);
      } else {
        toast.success('Service created successfully');
        fetchServices();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    const { error } = await supabase.from('services').delete().eq('id', id);
    
    if (error) {
      toast.error('Failed to delete service');
      console.error(error);
    } else {
      toast.success('Service deleted successfully');
      fetchServices();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display">Services</h1>
            <p className="text-muted-foreground">Manage company services</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Service</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Service' : 'Create Service'}</DialogTitle>
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
                    <Label>Icon (Lucide icon name)</Label>
                    <Input
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="e.g., car, building, wallet"
                    />
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
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="active">Active</Label>
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
        ) : services.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No services yet. Create your first one!
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {services.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.title_en}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Order: {item.sort_order} • {item.active ? 'Active' : 'Inactive'}
                      {item.icon && ` • Icon: ${item.icon}`}
                    </p>
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

export default ServicesAdmin;
