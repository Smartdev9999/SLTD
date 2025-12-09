import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { SocialLinks } from './SocialLinks';
import { EditableText } from '@/components/front-edit';
import { useQueryClient } from '@tanstack/react-query';

export const ContactInfo = () => {
  const { t } = useTranslation();
  const { getSetting, settings } = useSiteSettings();
  const queryClient = useQueryClient();

  const address = getSetting('contact_address');
  const phone = getSetting('contact_phone');
  const email = getSetting('contact_email');
  const officeHours = getSetting('contact_office_hours');

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
          <EditableText
            settingKey="contact_address"
            currentValue={getMultilingualValue('contact_address')}
            onUpdate={handleUpdate}
            multiline
          >
            <p className="text-muted-foreground whitespace-pre-line">
              {address || 'Address not set'}
            </p>
          </EditableText>
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
          <EditableText
            settingKey="contact_phone"
            currentValue={{ en: phone || '', la: phone || '', th: phone || '', zh: phone || '' }}
            onUpdate={handleUpdate}
          >
            <a 
              href={`tel:${phone?.replace(/\s/g, '')}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {phone || 'Phone not set'}
            </a>
          </EditableText>
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
          <EditableText
            settingKey="contact_email"
            currentValue={{ en: email || '', la: email || '', th: email || '', zh: email || '' }}
            onUpdate={handleUpdate}
          >
            <a 
              href={`mailto:${email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {email || 'Email not set'}
            </a>
          </EditableText>
        </div>
      </div>

      {/* Office Hours */}
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
          <EditableText
            settingKey="contact_office_hours"
            currentValue={getMultilingualValue('contact_office_hours')}
            onUpdate={handleUpdate}
          >
            <p className="text-muted-foreground">
              {officeHours || 'Hours not set'}
            </p>
          </EditableText>
        </div>
      </div>

      {/* Social Media */}
      <SocialLinks />
    </div>
  );
};
