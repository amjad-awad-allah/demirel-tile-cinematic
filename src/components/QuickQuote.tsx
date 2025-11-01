import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Calculator } from 'lucide-react';

export const QuickQuote = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);

  const handleQuoteClick = () => {
    const message = t('language') === 'de'
      ? 'Hallo! Ich möchte gerne ein Angebot für Fliesenarbeiten erhalten.'
      : 'Hello! I would like to receive a quote for tile work.';
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div 
          ref={animation.ref} 
          className={`scroll-scale ${animation.isVisible ? 'visible' : ''} max-w-4xl mx-auto`}
        >
          <Card className="p-12 text-center bg-white/10 backdrop-blur-sm border-white/20">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('language') === 'de' ? 'Kostenloses Angebot anfordern' : 'Request Free Quote'}
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              {t('language') === 'de'
                ? 'Erhalten Sie innerhalb von 24 Stunden ein unverbindliches Angebot für Ihr Projekt'
                : 'Receive a non-binding quote for your project within 24 hours'}
            </p>
            <Button
              size="lg"
              onClick={handleQuoteClick}
              className="bg-accent hover:bg-accent/90 text-white shadow-glow text-lg px-8 py-6 group"
            >
              <Calculator className="mr-2 group-hover:rotate-12 transition-transform" />
              {t('language') === 'de' ? 'Jetzt Angebot erhalten' : 'Get Quote Now'}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
