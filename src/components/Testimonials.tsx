import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from './ui/card';
import { Star } from 'lucide-react';
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
      rating: 5,
      text: t('language') === 'de'
        ? 'Hervorragende Arbeit! Pünktlich, sauber und professionell. Sehr empfehlenswert!'
        : 'Excellent work! On time, clean and professional. Highly recommended!',
    },
    {
      name: 'Sarah Weber',
      rating: 5,
      text: t('language') === 'de'
        ? 'Unser Badezimmer sieht fantastisch aus. Vielen Dank für die tolle Beratung!'
        : 'Our bathroom looks fantastic. Thank you for the great advice!',
    },
    {
      name: 'Thomas Müller',
      rating: 5,
      text: t('language') === 'de'
        ? 'Sehr zufrieden mit der Qualität der Arbeit. Faire Preise und freundliches Team.'
        : 'Very satisfied with the quality of work. Fair prices and friendly team.',
    },
    {
      name: 'Anna Fischer',
      rating: 5,
      text: t('language') === 'de'
        ? 'Perfekte Ausführung unseres Küchenprojekts. Absolut empfehlenswert!'
        : 'Perfect execution of our kitchen project. Absolutely recommendable!',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t('language') === 'de' ? 'Kundenstimmen' : 'Customer Testimonials'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('language') === 'de'
              ? 'Was unsere zufriedenen Kunden über uns sagen'
              : 'What our satisfied customers say about us'}
          </p>
        </div>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <Card className="p-8 h-full border-2 hover:border-accent transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-primary">— {testimonial.name}</p>
                </Card>
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
