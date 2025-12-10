import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useServices } from "@/hooks/useServices";
import { EditableText, EditableImage } from "@/components/front-edit";
import { useQueryClient } from "@tanstack/react-query";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const { companyName, tagline, logoUrl, settings, getSetting } = useSiteSettings();
  const { services: localizedServices } = useServices();
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

  const quickLinks = [
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.projects'), href: "/projects" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  // Get first 6 services for footer display
  const footerServices = localizedServices.slice(0, 6);

  // Get contact info from settings with defaults
  const footerAddress = getSetting('footer_address') || '123 Government Center\nVientiane Capital\nLao PDR';
  const footerPhone = getSetting('footer_phone') || '(123) 456-7890';
  const footerEmail = getSetting('footer_email') || 'info@lstd.la';
  const footerHours = getSetting('footer_hours') || 'Mon - Fri: 8:00 AM - 5:00 PM\nSat: By Appointment';
  const footerDescription = getSetting('footer_description') || t('footer.description');

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <EditableImage
                settingKey="logo"
                currentUrl={logoUrl}
                onUpdate={handleUpdate}
              >
                {logoUrl ? (
                  <img src={logoUrl} alt={companyName || 'Logo'} className="w-10 h-10 object-contain rounded-md" />
                ) : (
                  <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                    <span className="font-display text-xl text-primary-foreground">
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
                  <span className="font-display text-xl text-accent-foreground">{companyName || 'LSTD'}</span>
                </EditableText>
                <EditableText
                  settingKey="tagline"
                  currentValue={getMultilingualValue('tagline')}
                  onUpdate={handleUpdate}
                >
                  <p className="text-xs text-muted-foreground">{tagline || t('header.tagline')}</p>
                </EditableText>
              </div>
            </div>
            <EditableText
              settingKey="footer_description"
              currentValue={getMultilingualValue('footer_description')}
              onUpdate={handleUpdate}
              multiline
            >
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {footerDescription}
              </p>
            </EditableText>
            <div className="flex gap-4">
              {["FB", "LI", "TW"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-muted/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-accent-foreground mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-accent-foreground mb-6">{t('footer.popularCourses')}</h4>
            <ul className="space-y-3">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-accent-foreground mb-6">{t('footer.contactUs')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <EditableText
                  settingKey="footer_address"
                  currentValue={getMultilingualValue('footer_address')}
                  onUpdate={handleUpdate}
                  multiline
                >
                  <span className="text-muted-foreground text-sm whitespace-pre-line">
                    {footerAddress}
                  </span>
                </EditableText>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <EditableText
                  settingKey="footer_phone"
                  currentValue={getMultilingualValue('footer_phone')}
                  onUpdate={handleUpdate}
                >
                  <a href={`tel:${footerPhone.replace(/[^+\d]/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {footerPhone}
                  </a>
                </EditableText>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <EditableText
                  settingKey="footer_email"
                  currentValue={getMultilingualValue('footer_email')}
                  onUpdate={handleUpdate}
                >
                  <a href={`mailto:${footerEmail}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {footerEmail}
                  </a>
                </EditableText>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <EditableText
                  settingKey="footer_hours"
                  currentValue={getMultilingualValue('footer_hours')}
                  onUpdate={handleUpdate}
                  multiline
                >
                  <span className="text-muted-foreground text-sm whitespace-pre-line">
                    {footerHours}
                  </span>
                </EditableText>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-muted/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {companyName || 'LSTD'}. {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              {t('footer.privacy')}
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
