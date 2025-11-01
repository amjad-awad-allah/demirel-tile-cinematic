import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: t('email'),
      value: 'info@fliesen-demirel.de',
      href: 'mailto:info@fliesen-demirel.de',
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+49 123 456 7890',
      href: 'tel:+491234567890',
    },
    {
      icon: Globe,
      label: t('website'),
      value: 'www.fliesen-demirel.de',
      href: 'https://www.fliesen-demirel.de',
    },
    {
      icon: MapPin,
      label: t('language') === 'de' ? 'Adresse' : 'Address',
      value: 'Musterstraße 123, 12345 Berlin',
      href: 'https://maps.google.com/?q=Berlin',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold text-center mb-4 text-gradient">
          {t('contactTitle')}
        </h1>
        <p className="text-center text-muted-foreground mb-16 text-xl">
          {t('contactSubtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {contactInfo.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover-lift cursor-pointer border-2 hover:border-accent transition-colors"
              onClick={() => window.open(item.href, '_blank')}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  <div className="font-semibold">{item.value}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            {t('language') === 'de' 
              ? 'Oder kontaktieren Sie uns direkt über WhatsApp mit dem Button rechts unten!'
              : 'Or contact us directly via WhatsApp using the button at the bottom right!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
