import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Upload, Image as ImageIcon } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface SiteSetting {
  id: string;
  setting_key: string;
  value_en: string | null;
  value_la: string | null;
  value_th: string | null;
  value_zh: string | null;
  image_url: string | null;
}

const SettingsAdmin = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState({ en: '', la: '', th: '', zh: '' });
  const [tagline, setTagline] = useState({ en: '', la: '', th: '', zh: '' });
  const [logoUrl, setLogoUrl] = useState('');

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) {
      toast.error('Failed to load settings');
      console.error(error);
    } else {
      setSettings(data || []);
      
      // Populate form state
      const companyNameSetting = data?.find(s => s.setting_key === 'company_name');
      const taglineSetting = data?.find(s => s.setting_key === 'tagline');
      const logoSetting = data?.find(s => s.setting_key === 'logo');

      if (companyNameSetting) {
        setCompanyName({
          en: companyNameSetting.value_en || '',
          la: companyNameSetting.value_la || '',
          th: companyNameSetting.value_th || '',
          zh: companyNameSetting.value_zh || '',
        });
      }

      if (taglineSetting) {
        setTagline({
          en: taglineSetting.value_en || '',
          la: taglineSetting.value_la || '',
          th: taglineSetting.value_th || '',
          zh: taglineSetting.value_zh || '',
        });
      }

      if (logoSetting) {
        setLogoUrl(logoSetting.image_url || '');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveSetting = async (key: string, values: { en: string; la: string; th: string; zh: string }, imageUrl?: string) => {
    const existingSetting = settings.find(s => s.setting_key === key);

    if (existingSetting) {
      const { error } = await supabase
        .from('site_settings')
        .update({
          value_en: values.en,
          value_la: values.la,
          value_th: values.th,
          value_zh: values.zh,
          ...(imageUrl !== undefined && { image_url: imageUrl }),
        })
        .eq('id', existingSetting.id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('site_settings')
        .insert({
          setting_key: key,
          value_en: values.en,
          value_la: values.la,
          value_th: values.th,
          value_zh: values.zh,
          image_url: imageUrl || null,
        });

      if (error) throw error;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSetting('company_name', companyName);
      await saveSetting('tagline', tagline);
      
      // Save logo separately
      const logoSetting = settings.find(s => s.setting_key === 'logo');
      if (logoSetting) {
        await supabase
          .from('site_settings')
          .update({ image_url: logoUrl })
          .eq('id', logoSetting.id);
      } else if (logoUrl) {
        await supabase
          .from('site_settings')
          .insert({
            setting_key: 'logo',
            image_url: logoUrl,
          });
      }

      toast.success('Settings saved successfully');
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-display">Site Settings</h1>
            <p className="text-muted-foreground">Manage your website's branding and identity</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Company Logo
              </CardTitle>
              <CardDescription>Upload your company logo (recommended: 200x60px, PNG or SVG)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUpload
                value={logoUrl}
                onChange={(url) => setLogoUrl(url)}
                folder="branding"
              />
              {logoUrl && (
                <Button variant="outline" size="sm" onClick={() => setLogoUrl('')}>
                  Remove Logo
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Company Name */}
          <Card>
            <CardHeader>
              <CardTitle>Company Name</CardTitle>
              <CardDescription>The name displayed across your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="en">EN</TabsTrigger>
                  <TabsTrigger value="la">LA</TabsTrigger>
                  <TabsTrigger value="th">TH</TabsTrigger>
                  <TabsTrigger value="zh">ZH</TabsTrigger>
                </TabsList>
                <TabsContent value="en" className="mt-4">
                  <Input
                    value={companyName.en}
                    onChange={(e) => setCompanyName({ ...companyName, en: e.target.value })}
                    placeholder="Company name in English"
                  />
                </TabsContent>
                <TabsContent value="la" className="mt-4">
                  <Input
                    value={companyName.la}
                    onChange={(e) => setCompanyName({ ...companyName, la: e.target.value })}
                    placeholder="ຊື່ບໍລິສັດເປັນພາສາລາວ"
                    className="font-lao"
                  />
                </TabsContent>
                <TabsContent value="th" className="mt-4">
                  <Input
                    value={companyName.th}
                    onChange={(e) => setCompanyName({ ...companyName, th: e.target.value })}
                    placeholder="ชื่อบริษัทเป็นภาษาไทย"
                  />
                </TabsContent>
                <TabsContent value="zh" className="mt-4">
                  <Input
                    value={companyName.zh}
                    onChange={(e) => setCompanyName({ ...companyName, zh: e.target.value })}
                    placeholder="公司名称（中文）"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Tagline */}
        <Card>
          <CardHeader>
            <CardTitle>Tagline / Slogan</CardTitle>
            <CardDescription>A short description that appears below your company name</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="en">EN</TabsTrigger>
                <TabsTrigger value="la">LA</TabsTrigger>
                <TabsTrigger value="th">TH</TabsTrigger>
                <TabsTrigger value="zh">ZH</TabsTrigger>
              </TabsList>
              <TabsContent value="en" className="mt-4">
                <Input
                  value={tagline.en}
                  onChange={(e) => setTagline({ ...tagline, en: e.target.value })}
                  placeholder="Your tagline in English"
                />
              </TabsContent>
              <TabsContent value="la" className="mt-4">
                <Input
                  value={tagline.la}
                  onChange={(e) => setTagline({ ...tagline, la: e.target.value })}
                  placeholder="ຄຳຂວັນເປັນພາສາລາວ"
                  className="font-lao"
                />
              </TabsContent>
              <TabsContent value="th" className="mt-4">
                <Input
                  value={tagline.th}
                  onChange={(e) => setTagline({ ...tagline, th: e.target.value })}
                  placeholder="สโลแกนเป็นภาษาไทย"
                />
              </TabsContent>
              <TabsContent value="zh" className="mt-4">
                <Input
                  value={tagline.zh}
                  onChange={(e) => setTagline({ ...tagline, zh: e.target.value })}
                  placeholder="标语（中文）"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SettingsAdmin;