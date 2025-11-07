import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const MapSection = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-12`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t('language') === 'de' ? 'Besuchen Sie uns' : 'Visit Us'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('language') === 'de' ? 'Standort Herten' : 'Location Herten'}
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-elegant">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155421.21998033147!2d13.23288842329101!3d52.50642537822315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e373f035901%3A0x42120465b5e3b70!2sBerlin%2C%20Germany!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Fliesen Demirel Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
