import { forwardRef } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export const ContactMap = forwardRef<HTMLElement>((_, ref) => {
  const { getSetting } = useSiteSettings();
  const mapUrl = getSetting('google_maps_url');

  if (!mapUrl) {
    return null;
  }

  return (
    <section ref={ref} className="pb-0">
      <div className="w-full h-[400px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>
    </section>
  );
});

ContactMap.displayName = 'ContactMap';