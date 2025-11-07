import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const MapSection = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div
          ref={animation.ref}
          className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-12`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t('language') === 'de' ? 'Besuchen Sie uns' : 'Visit Us'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('language') === 'de' ? 'Standort Herten' : 'Location Herten'}
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-elegant">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=Allensteiner+Str.+6,+45701+Herten&key=YOUR_API_KEY&zoom=15"
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
