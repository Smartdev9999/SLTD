-- Create gallery table for photos
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_la TEXT,
  title_th TEXT,
  title_zh TEXT,
  description_en TEXT,
  description_la TEXT,
  description_th TEXT,
  description_zh TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Anyone can view gallery
CREATE POLICY "Anyone can view gallery" 
ON public.gallery 
FOR SELECT 
USING (true);

-- Admins and editors can manage gallery
CREATE POLICY "Admins and editors can manage gallery" 
ON public.gallery 
FOR ALL 
USING (is_admin_or_editor(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_gallery_updated_at
BEFORE UPDATE ON public.gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();