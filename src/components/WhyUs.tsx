import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Shield, Clock, Award, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

export const WhyUs = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);

  const features = [
    {
      icon: Award,
      title: t('language') === 'de' ? 'Meisterqualität' : 'Master Quality',
      description: t('language') === 'de' 
        ? 'Zertifizierter Meisterbetrieb mit über 20 Jahren Erfahrung'
        : 'Certified master craftsman with over 20 years of experience',
    },
    {
      icon: Clock,
      title: t('language') === 'de' ? 'Pünktlichkeit' : 'Punctuality',
      description: t('language') === 'de'
        ? 'Termingerechte Fertigstellung aller Projekte'
        : 'On-time completion of all projects',
    },
    {
      icon: Shield,
      title: t('language') === 'de' ? 'Garantie' : 'Warranty',
      description: t('language') === 'de'
        ? 'Umfassende Garantie auf alle Arbeiten'
        : 'Comprehensive warranty on all work',
    },
    {
      icon: CheckCircle,
      title: t('language') === 'de' ? 'Zufriedenheit' : 'Satisfaction',
      description: t('language') === 'de'
        ? '100% Kundenzufriedenheit ist unser Ziel'
        : '100% customer satisfaction is our goal',
    },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t('language') === 'de' ? 'Warum Fliesen Demirel?' : 'Why Fliesen Demirel?'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('language') === 'de'
              ? 'Vertrauen Sie auf Qualität, Erfahrung und Zuverlässigkeit'
              : 'Trust in quality, experience and reliability'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemAnimation = useScrollAnimation(0.2);
            return (
              <div
                key={index}
                ref={itemAnimation.ref}
                className={`scroll-scale ${itemAnimation.isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="p-8 text-center hover-lift h-full border-2 hover:border-accent transition-all duration-300 group">
                  <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
