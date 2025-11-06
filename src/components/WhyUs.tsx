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
      title: t('masterQuality'),
      description: t('masterQualityDesc'),
    },
    {
      icon: Clock,
      title: t('punctuality'),
      description: t('punctualityDesc'),
    },
    {
      icon: Shield,
      title: t('warranty'),
      description: t('warrantyDesc'),
    },
    {
      icon: CheckCircle,
      title: t('satisfaction'),
      description: t('satisfactionDesc'),
    },
  ];

  return (
    <section 
      id="why-us" 
      className="py-24"
      style={{ backgroundColor: '#F9F8F6' }}
    >
      <div className="container mx-auto px-4">
        <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-16`}>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#1E3D59' }}
          >
            {t('whyUsTitle')}
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6F6F6F' }}
          >
            {t('whyUsSubtitle')}
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
                <Card 
                  className="p-8 text-center h-full border-0 group transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-20"
                    style={{
                      backgroundColor: 'rgba(232, 117, 43, 0.1)',
                    }}
                  >
                    <feature.icon 
                      className="w-8 h-8 transition-colors duration-300 group-hover:text-[#E8752B]"
                      style={{ color: '#1E3D59' }}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: '#1E3D59' }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6F6F6F' }}>
                    {feature.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
