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
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CareerItem {
  id: string;
  title_en: string;
  title_la: string | null;
  title_th: string | null;
  title_zh: string | null;
  description_en: string | null;
  description_la: string | null;
  description_th: string | null;
  description_zh: string | null;
  requirements_en: string | null;
  requirements_la: string | null;
  requirements_th: string | null;
  requirements_zh: string | null;
  location: string | null;
  department: string | null;
  employment_type: string | null;
  active: boolean | null;
  deadline: string | null;
  created_at: string;
}

const CareersAdmin = () => {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CareerItem | null>(null);
  
  const [formData, setFormData] = useState({
    title: { en: '', la: '', th: '', zh: '' },
    description: { en: '', la: '', th: '', zh: '' },
    requirements: { en: '', la: '', th: '', zh: '' },
    location: '',
    department: '',
    employment_type: 'full-time',
    active: true,
    deadline: '',
  });

  const fetchCareers = async () => {
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load careers');
      console.error(error);
    } else {
      setCareers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const resetForm = () => {
    setFormData({
      title: { en: '', la: '', th: '', zh: '' },
      description: { en: '', la: '', th: '', zh: '' },
      requirements: { en: '', la: '', th: '', zh: '' },
      location: '',
      department: '',
      employment_type: 'full-time',
      active: true,
      deadline: '',
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: CareerItem) => {
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
      requirements: { 
        en: item.requirements_en || '', 
        la: item.requirements_la || '', 
        th: item.requirements_th || '', 
        zh: item.requirements_zh || '' 
      },
      location: item.location || '',
      department: item.department || '',
      employment_type: item.employment_type || 'full-time',
      active: item.active ?? true,
      deadline: item.deadline ? item.deadline.split('T')[0] : '',
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
      requirements_en: formData.requirements.en || null,
      requirements_la: formData.requirements.la || null,
      requirements_th: formData.requirements.th || null,
      requirements_zh: formData.requirements.zh || null,
      location: formData.location || null,
      department: formData.department || null,
      employment_type: formData.employment_type,
      active: formData.active,
      deadline: formData.deadline || null,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('careers')
        .update(payload)
        .eq('id', editingItem.id);
      
      if (error) {
        toast.error('Failed to update career');
        console.error(error);
      } else {
        toast.success('Career updated successfully');
        fetchCareers();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from('careers').insert(payload);
      
      if (error) {
        toast.error('Failed to create career');
        console.error(error);
      } else {
        toast.success('Career created successfully');
        fetchCareers();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career listing?')) return;
    
    const { error } = await supabase.from('careers').delete().eq('id', id);
    
    if (error) {
      toast.error('Failed to delete career');
      console.error(error);
    } else {
      toast.success('Career deleted successfully');
      fetchCareers();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display">Careers</h1>
            <p className="text-muted-foreground">Manage job openings</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Job</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Job' : 'Create Job'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <MultilingualInput
                  label="Job Title"
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
                
                <MultilingualInput
                  label="Requirements"
                  values={formData.requirements}
                  onChange={(lang, value) => setFormData(prev => ({
                    ...prev,
                    requirements: { ...prev.requirements, [lang]: value }
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
                    <Label>Department</Label>
                    <Input
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="e.g., Operations"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <Select value={formData.employment_type} onValueChange={(value) => setFormData(prev => ({ ...prev, employment_type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Application Deadline</Label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="active">Active (visible on website)</Label>
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
        ) : careers.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No job openings yet. Create your first one!
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {careers.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.title_en}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.department} • {item.location} • {item.employment_type}
                      {item.active ? '' : ' • Inactive'}
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

export default CareersAdmin;
