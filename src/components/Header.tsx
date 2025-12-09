import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/front-edit";
import { useQueryClient } from "@tanstack/react-query";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { companyName, tagline, logoUrl, settings } = useSiteSettings();
  const queryClient = useQueryClient();

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['site-settings'] });
  };

  const getMultilingualValue = (key: string) => {
    const setting = settings?.find(s => s.setting_key === key);
    return {
      en: setting?.value_en || '',
      la: setting?.value_la || '',
      th: setting?.value_th || '',
      zh: setting?.value_zh || '',
    };
  };

  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.projects'), href: "/projects" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.news'), href: "/news" },
    { name: t('nav.careers'), href: "/careers" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-accent text-accent-foreground text-sm py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t('header.phone')}</span>
            </a>
            <a href="mailto:info@lstd.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">{t('header.email')}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden md:inline">{t('header.tagline')}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <EditableImage
              settingKey="logo"
              currentUrl={logoUrl}
              onUpdate={handleUpdate}
            >
              {logoUrl ? (
                <img src={logoUrl} alt={companyName || 'Logo'} className="w-12 h-12 object-contain rounded-md" />
              ) : (
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                  <span className="font-display text-2xl text-primary-foreground">
                    {(companyName || 'LS').substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </EditableImage>
            <div>
              <EditableText
                settingKey="company_name"
                currentValue={getMultilingualValue('company_name')}
                onUpdate={handleUpdate}
              >
                <span className="font-display text-2xl text-foreground tracking-wider">
                  {companyName || 'LSTD'}
                </span>
              </EditableText>
              <EditableText
                settingKey="tagline"
                currentValue={getMultilingualValue('tagline')}
                onUpdate={handleUpdate}
              >
                <p className="text-xs text-muted-foreground -mt-1">{tagline || t('header.tagline')}</p>
              </EditableText>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/auth">
              <Button variant="outline" size="sm">{t('nav.login')}</Button>
            </Link>
            <Button size="sm">{t('nav.bookTraining')}</Button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="container py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Link to="/auth" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">{t('nav.login')}</Button>
                </Link>
                <Button className="flex-1">{t('nav.bookTraining')}</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
