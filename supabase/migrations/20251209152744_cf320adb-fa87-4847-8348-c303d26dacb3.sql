-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create news table
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_la TEXT,
  title_th TEXT,
  title_zh TEXT,
  content_en TEXT,
  content_la TEXT,
  content_th TEXT,
  content_zh TEXT,
  excerpt_en TEXT,
  excerpt_la TEXT,
  excerpt_th TEXT,
  excerpt_zh TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_la TEXT,
  title_th TEXT,
  title_zh TEXT,
  description_en TEXT,
  description_la TEXT,
  description_th TEXT,
  description_zh TEXT,
  image_url TEXT,
  location TEXT,
  year TEXT,
  status TEXT DEFAULT 'ongoing',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_la TEXT,
  title_th TEXT,
  title_zh TEXT,
  description_en TEXT,
  description_la TEXT,
  description_th TEXT,
  description_zh TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create careers table
CREATE TABLE public.careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_la TEXT,
  title_th TEXT,
  title_zh TEXT,
  description_en TEXT,
  description_la TEXT,
  description_th TEXT,
  description_zh TEXT,
  requirements_en TEXT,
  requirements_la TEXT,
  requirements_th TEXT,
  requirements_zh TEXT,
  location TEXT,
  department TEXT,
  employment_type TEXT DEFAULT 'full-time',
  active BOOLEAN DEFAULT true,
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create about_content table for About page sections
CREATE TABLE public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  title_en TEXT,
  title_la TEXT,
  title_th TEXT,
  title_zh TEXT,
  content_en TEXT,
  content_la TEXT,
  content_th TEXT,
  content_zh TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'editor')
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- News policies (public read for published, admin/editor for write)
CREATE POLICY "Anyone can view published news" ON public.news
  FOR SELECT USING (published = true);

CREATE POLICY "Admins and editors can view all news" ON public.news
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage news" ON public.news
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- Projects policies (public read, admin/editor for write)
CREATE POLICY "Anyone can view projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage projects" ON public.projects
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- Services policies (public read, admin/editor for write)
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Admins and editors can view all services" ON public.services
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage services" ON public.services
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- Careers policies (public read for active, admin/editor for write)
CREATE POLICY "Anyone can view active careers" ON public.careers
  FOR SELECT USING (active = true);

CREATE POLICY "Admins and editors can view all careers" ON public.careers
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage careers" ON public.careers
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- About content policies (public read, admin/editor for write)
CREATE POLICY "Anyone can view about content" ON public.about_content
  FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage about content" ON public.about_content
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies for media bucket
CREATE POLICY "Anyone can view media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Admins and editors can upload media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can delete media" ON storage.objects
  FOR DELETE USING (bucket_id = 'media' AND public.is_admin_or_editor(auth.uid()));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Timestamp triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON public.careers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();