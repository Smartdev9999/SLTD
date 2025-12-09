import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const Footer = () => {
  const { t } = useTranslation();
  const { companyName, tagline, logoUrl } = useSiteSettings();

  const quickLinks = [
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.projects'), href: "/projects" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const services = [
    "Toll Collection",
    "Fee Management",
    "Electronic Payments",
    "Revenue Reporting",
    "Infrastructure Support",
    "Consulting",
  ];

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              {logoUrl ? (
                <img src={logoUrl} alt={companyName || 'Logo'} className="w-10 h-10 object-contain rounded-md" />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <span className="font-display text-xl text-primary-foreground">
                    {(companyName || 'LS').substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <span className="font-display text-xl text-accent-foreground">{companyName || 'LSTD'}</span>
                <p className="text-xs text-muted-foreground">{tagline || t('header.tagline')}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
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
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service}
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
                <span className="text-muted-foreground text-sm">
                  123 Government Center<br />
                  Vientiane Capital<br />
                  Lao PDR
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@lstd.la" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  info@lstd.la
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Sat: By Appointment
                </span>
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
