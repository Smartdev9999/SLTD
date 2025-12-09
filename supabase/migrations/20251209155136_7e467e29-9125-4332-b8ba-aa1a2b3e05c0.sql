-- Create site settings table
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  value_en text,
  value_la text,
  value_th text,
  value_zh text,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins and editors can manage settings
CREATE POLICY "Admins and editors can manage site settings"
ON public.site_settings
FOR ALL
USING (is_admin_or_editor(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (setting_key, value_en, value_la, value_th, value_zh)
VALUES 
  ('company_name', 'LSTD', 'LSTD', 'LSTD', 'LSTD'),
  ('tagline', 'Public Works & Transportation Revenue Collection', 'ການເກັບລາຍຮັບວຽກງານສາທາລະນະ ແລະ ການຂົນສົ່ງ', 'การจัดเก็บรายได้งานสาธารณะและการขนส่ง', '公共工程与交通收入征收');