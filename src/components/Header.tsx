import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/front-edit";
import { useQueryClient } from "@tanstack/react-query";
import { useFrontEdit } from "@/contexts/FrontEditContext";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t, i18n } = useTranslation();
  const { companyName, tagline, logoUrl, settings } = useSiteSettings();
  const queryClient = useQueryClient();
  const { isEditMode, toggleEditMode, canEdit } = useFrontEdit();
  const location = useLocation();

  // Scroll detection for hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // At top - always show
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide (only after scrolling 100px)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    { name: t('nav.gallery'), href: "/gallery" },
    { name: t('nav.news'), href: "/news" },
    { name: t('nav.careers'), href: "/careers" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="container flex items-center justify-between py-4">
          {/* Logo & Company Name */}
          <Link to="/" className="flex items-center gap-3">
            <EditableImage
              settingKey="logo"
              currentUrl={logoUrl}
              onUpdate={handleUpdate}
            >
              {logoUrl ? (
                <img src={logoUrl} alt={companyName || 'Logo'} className="w-10 h-10 object-contain rounded" />
              ) : (
                <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                  <span className="font-display text-lg text-primary-foreground">
                    {(companyName || 'LS').substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </EditableImage>
            <EditableText
              settingKey="company_name"
              currentValue={getMultilingualValue('company_name')}
              onUpdate={handleUpdate}
            >
              <span className="font-display text-xl text-white tracking-wider">
                {companyName || 'LSTD'}
              </span>
            </EditableText>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActiveLink(item.href)
                    ? 'text-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                {isActiveLink(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            {canEdit && (
              <Button
                onClick={toggleEditMode}
                variant={isEditMode ? 'default' : 'ghost'}
                size="sm"
                className={`gap-2 ${!isEditMode ? 'text-white/80 hover:text-white hover:bg-white/10' : ''}`}
              >
                <Pencil className="w-4 h-4" />
                {isEditMode ? t('nav.exitEdit') : t('nav.editPage')}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10">
            <div className="container py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block py-3 px-4 rounded-lg transition-colors ${
                    isActiveLink(item.href)
                      ? 'text-primary bg-white/5'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="px-4">
                  <LanguageSwitcher />
                </div>
                {canEdit && (
                  <Button
                    onClick={() => { toggleEditMode(); setMobileMenuOpen(false); }}
                    variant={isEditMode ? 'default' : 'ghost'}
                    className={`w-full gap-2 ${!isEditMode ? 'text-white/80 hover:text-white hover:bg-white/10' : ''}`}
                  >
                    <Pencil className="w-4 h-4" />
                    {isEditMode ? t('nav.exitEdit') : t('nav.editPage')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
