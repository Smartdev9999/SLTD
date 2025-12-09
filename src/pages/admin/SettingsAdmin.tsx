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
import { Textarea } from '@/components/ui/textarea';

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
  
  // Contact settings
  const [contactAddress, setContactAddress] = useState({ en: '', la: '', th: '', zh: '' });
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [officeHours, setOfficeHours] = useState({ en: '', la: '', th: '', zh: '' });
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');

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

      // Load contact settings
      const addressSetting = data?.find(s => s.setting_key === 'contact_address');
      const phoneSetting = data?.find(s => s.setting_key === 'contact_phone');
      const emailSetting = data?.find(s => s.setting_key === 'contact_email');
      const hoursSetting = data?.find(s => s.setting_key === 'contact_office_hours');
      const mapSetting = data?.find(s => s.setting_key === 'google_maps_url');
      const fbSetting = data?.find(s => s.setting_key === 'facebook_url');
      const liSetting = data?.find(s => s.setting_key === 'linkedin_url');
      const ttSetting = data?.find(s => s.setting_key === 'tiktok_url');

      if (addressSetting) {
        setContactAddress({
          en: addressSetting.value_en || '',
          la: addressSetting.value_la || '',
          th: addressSetting.value_th || '',
          zh: addressSetting.value_zh || '',
        });
      }
      if (phoneSetting) setContactPhone(phoneSetting.value_en || '');
      if (emailSetting) setContactEmail(emailSetting.value_en || '');
      if (hoursSetting) {
        setOfficeHours({
          en: hoursSetting.value_en || '',
          la: hoursSetting.value_la || '',
          th: hoursSetting.value_th || '',
          zh: hoursSetting.value_zh || '',
        });
      }
      if (mapSetting) setGoogleMapsUrl(mapSetting.value_en || '');
      if (fbSetting) setFacebookUrl(fbSetting.value_en || '');
      if (liSetting) setLinkedinUrl(liSetting.value_en || '');
      if (ttSetting) setTiktokUrl(ttSetting.value_en || '');
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

  const saveSimpleSetting = async (key: string, value: string) => {
    const existingSetting = settings.find(s => s.setting_key === key);
    if (existingSetting) {
      await supabase
        .from('site_settings')
        .update({ value_en: value })
        .eq('id', existingSetting.id);
    } else {
      await supabase
        .from('site_settings')
        .insert({ setting_key: key, value_en: value });
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

      // Save contact settings
      await saveSetting('contact_address', contactAddress);
      await saveSimpleSetting('contact_phone', contactPhone);
      await saveSimpleSetting('contact_email', contactEmail);
      await saveSetting('contact_office_hours', officeHours);
      await saveSimpleSetting('google_maps_url', googleMapsUrl);
      await saveSimpleSetting('facebook_url', facebookUrl);
      await saveSimpleSetting('linkedin_url', linkedinUrl);
      await saveSimpleSetting('tiktok_url', tiktokUrl);

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

        {/* Contact Information Section */}
        <div className="pt-6 border-t">
          <h2 className="text-2xl font-display mb-6">Contact Information</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Address */}
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Your company's physical address</CardDescription>
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
                  <Textarea
                    value={contactAddress.en}
                    onChange={(e) => setContactAddress({ ...contactAddress, en: e.target.value })}
                    placeholder="Address in English"
                    rows={3}
                  />
                </TabsContent>
                <TabsContent value="la" className="mt-4">
                  <Textarea
                    value={contactAddress.la}
                    onChange={(e) => setContactAddress({ ...contactAddress, la: e.target.value })}
                    placeholder="ທີ່ຢູ່ເປັນພາສາລາວ"
                    className="font-lao"
                    rows={3}
                  />
                </TabsContent>
                <TabsContent value="th" className="mt-4">
                  <Textarea
                    value={contactAddress.th}
                    onChange={(e) => setContactAddress({ ...contactAddress, th: e.target.value })}
                    placeholder="ที่อยู่เป็นภาษาไทย"
                    rows={3}
                  />
                </TabsContent>
                <TabsContent value="zh" className="mt-4">
                  <Textarea
                    value={contactAddress.zh}
                    onChange={(e) => setContactAddress({ ...contactAddress, zh: e.target.value })}
                    placeholder="地址（中文）"
                    rows={3}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Phone & Email */}
          <Card>
            <CardHeader>
              <CardTitle>Phone & Email</CardTitle>
              <CardDescription>Contact details for customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="020 5717 1631"
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="info@company.com"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Office Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Office Hours</CardTitle>
            <CardDescription>When your office is open for business</CardDescription>
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
                  value={officeHours.en}
                  onChange={(e) => setOfficeHours({ ...officeHours, en: e.target.value })}
                  placeholder="Mon - Fri: 8:00 AM - 5:00 PM"
                />
              </TabsContent>
              <TabsContent value="la" className="mt-4">
                <Input
                  value={officeHours.la}
                  onChange={(e) => setOfficeHours({ ...officeHours, la: e.target.value })}
                  placeholder="ຈັນ - ສຸກ: 8:00 - 17:00"
                  className="font-lao"
                />
              </TabsContent>
              <TabsContent value="th" className="mt-4">
                <Input
                  value={officeHours.th}
                  onChange={(e) => setOfficeHours({ ...officeHours, th: e.target.value })}
                  placeholder="จันทร์ - ศุกร์: 8:00 - 17:00"
                />
              </TabsContent>
              <TabsContent value="zh" className="mt-4">
                <Input
                  value={officeHours.zh}
                  onChange={(e) => setOfficeHours({ ...officeHours, zh: e.target.value })}
                  placeholder="周一至周五：8:00 - 17:00"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Google Maps */}
        <Card>
          <CardHeader>
            <CardTitle>Google Maps</CardTitle>
            <CardDescription>Embed URL for Google Maps (get this from Google Maps Share → Embed)</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              rows={2}
            />
          </CardContent>
        </Card>

        {/* Social Media Section */}
        <div className="pt-6 border-t">
          <h2 className="text-2xl font-display mb-6">Social Media Links</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Facebook</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/yourpage"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LinkedIn</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TikTok</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                placeholder="https://tiktok.com/@yourhandle"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsAdmin;