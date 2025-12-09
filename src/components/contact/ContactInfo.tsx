import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { SocialLinks } from './SocialLinks';

export const ContactInfo = () => {
  const { t } = useTranslation();
  const { getSetting } = useSiteSettings();

  const address = getSetting('contact_address');
  const phone = getSetting('contact_phone');
  const email = getSetting('contact_email');
  const officeHours = getSetting('contact_office_hours');

  return (
    <div className="space-y-8">
      {/* Address */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl text-foreground mb-2">
            {t('contact.info.address')}
          </h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {address || 'Address not set'}
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl text-foreground mb-2">
            {t('contact.info.phone')}
          </h3>
          <a 
            href={`tel:${phone?.replace(/\s/g, '')}`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {phone || 'Phone not set'}
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl text-foreground mb-2">
            {t('contact.info.email')}
          </h3>
          <a 
            href={`mailto:${email}`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {email || 'Email not set'}
          </a>
        </div>
      </div>

      {/* Office Hours */}
      {officeHours && (
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-xl text-foreground mb-2">
              {t('contact.info.hours')}
            </h3>
            <p className="text-muted-foreground">
              {officeHours}
            </p>
          </div>
        </div>
      )}

      {/* Social Media */}
      <SocialLinks />
    </div>
  );
};
