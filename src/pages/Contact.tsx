import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('contact.form.success'),
      description: "We'll get back to you soon!",
    });
    
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('contact.subtitle')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('contact.description')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    t('contact.form.sending')
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.form.send')}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  {t('footer.contactUs')}
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground mb-1">{t('contact.info.address')}</p>
                      <p className="text-muted-foreground">
                        123 Industrial Parkway<br />
                        Suite 100<br />
                        Vientiane, Laos
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">{t('contact.info.phone')}</p>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                        (123) 456-7890
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">{t('contact.info.email')}</p>
                      <a href="mailto:info@lstd.com" className="text-muted-foreground hover:text-primary transition-colors">
                        info@lstd.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">{t('contact.info.hours')}</p>
                      <p className="text-muted-foreground">
                        Mon - Fri: 7:00 AM - 5:00 PM<br />
                        Sat: By Appointment
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map Placeholder */}
              <div className="bg-accent rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-2" />
                  <p className="text-muted-foreground">Google Maps Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
