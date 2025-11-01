import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from './ui/card';
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Testimonials = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);

  const testimonials = [
    {
      name: 'Michael Schmidt',
      initials: 'MS',
      rating: 5,
      text: t('language') === 'de'
        ? 'Hervorragende Arbeit! Pünktlich, sauber und professionell. Sehr empfehlenswert!'
        : 'Excellent work! On time, clean and professional. Highly recommended!',
    },
    {
      name: 'Sarah Weber',
      initials: 'SW',
      rating: 5,
      text: t('language') === 'de'
        ? 'Unser Badezimmer sieht fantastisch aus. Vielen Dank für die tolle Beratung!'
        : 'Our bathroom looks fantastic. Thank you for the great advice!',
    },
    {
      name: 'Thomas Müller',
      initials: 'TM',
      rating: 5,
      text: t('language') === 'de'
        ? 'Sehr zufrieden mit der Qualität der Arbeit. Faire Preise und freundliches Team.'
        : 'Very satisfied with the quality of work. Fair prices and friendly team.',
    },
    {
      name: 'Anna Fischer',
      initials: 'AF',
      rating: 5,
      text: t('language') === 'de'
        ? 'Perfekte Ausführung unseres Küchenprojekts. Absolut empfehlenswert!'
        : 'Perfect execution of our kitchen project. Absolutely recommendable!',
    },
  ];

  return (
    <section 
      id="testimonials" 
      className="py-24 relative overflow-hidden"
    >
      {/* Marble background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F7F6F3 0%, #EAE8E3 50%, #F7F6F3 100%)',
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-16`}>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#1E3D59' }}
          >
            {t('language') === 'de' ? 'Kundenstimmen' : 'Customer Testimonials'}
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6F6F6F' }}
          >
            {t('language') === 'de'
              ? 'Was unsere zufriedenen Kunden über uns sagen'
              : 'What our satisfied customers say about us'}
          </p>
        </div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div 
                  className="p-8 h-full bg-white rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    border: '1px solid #E0DED9',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  {/* Orange quotation mark with breathing animation */}
                  <Quote 
                    className="w-12 h-12 mb-4 animate-breathe"
                    style={{ color: '#E8752B' }}
                  />
                  
                  <p 
                    className="mb-6 italic"
                    style={{ 
                      color: '#6F6F6F',
                      lineHeight: '1.8',
                      fontSize: '1.05rem'
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                  
                  {/* Orange divider */}
                  <div 
                    className="w-12 h-0.5 mb-4"
                    style={{ backgroundColor: '#E8752B' }}
                  ></div>
                  
                  {/* Avatar and name */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{ backgroundColor: '#E8752B' }}
                    >
                      {testimonial.initials}
                    </div>
                    <p 
                      className="font-semibold"
                      style={{ color: '#1E3D59' }}
                    >
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
