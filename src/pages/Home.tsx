import { useLanguage } from '@/contexts/LanguageContext';
import { HeroTileAnimation } from '@/components/HeroTileAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import logo from '@/assets/logo-transparent.svg';
import tilesHero from '@/assets/tiles-hero.jpg';
import bathroomTiles from '@/assets/bathroom-tiles.jpg';
import kitchenTiles from '@/assets/kitchen-tiles.jpg';

const Home = () => {
  const { t } = useLanguage();

  // Scroll animations for different sections
  const servicesTitle = useScrollAnimation();
  const aboutTitle = useScrollAnimation();
  const contactTitle = useScrollAnimation();

  const services = [
    {
      title: t('bathroom'),
      description: t('bathroomDesc'),
      image: bathroomTiles,
    },
    {
      title: t('kitchen'),
      description: t('kitchenDesc'),
      image: kitchenTiles,
    },
    {
      title: t('commercial'),
      description: t('commercialDesc'),
      image: tilesHero,
    },
  ];

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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1A1E24]">
        <HeroTileAnimation />
        
        {/* Dark overlay for text clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-[5]"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <img 
              src={logo} 
              alt="Fliesen Demirel" 
              className="h-32 w-auto mx-auto mb-6 drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in drop-shadow-lg">
            {t('heroTitle')}
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-white/90 animate-fade-in drop-shadow-md">
            {t('heroSubtitle')}
          </p>
          
          <p className="text-lg mb-8 text-white/80 animate-fade-in drop-shadow-md">
            {t('heroDescription')}
          </p>
          
          <Button 
            onClick={scrollToContact}
            size="lg" 
            className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-white shadow-glow animate-fade-in group transition-all duration-300"
          >
            {t('heroButton')}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div ref={servicesTitle.ref} className={`scroll-fade-in ${servicesTitle.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
              {t('servicesTitle')}
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const animation = useScrollAnimation(0.2);
              return (
                <div
                  key={index}
                  ref={animation.ref}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-12 items-center ${
                    index % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'
                  } ${animation.isVisible ? 'visible' : ''}`}
                >
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] shadow-elegant">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <div ref={aboutTitle.ref} className={`scroll-fade-in ${aboutTitle.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
              {t('aboutTitle')}
            </h2>
          </div>
          <div className={`prose prose-lg mx-auto text-muted-foreground scroll-scale ${aboutTitle.isVisible ? 'visible' : ''}`}>
            <p className="text-lg leading-relaxed mb-6">
              {t('language') === 'de' 
                ? 'Fliesen Demirel Meisterbetrieb ist Ihr verlässlicher Partner für hochwertige Fliesenarbeiten in Berlin und Umgebung. Mit über 20 Jahren Erfahrung vereinen wir traditionelles Handwerk mit modernen Techniken.'
                : 'Fliesen Demirel Meisterbetrieb is your reliable partner for high-quality tile work in Berlin and surrounding areas. With over 20 years of experience, we combine traditional craftsmanship with modern techniques.'}
            </p>
            <p className="text-lg leading-relaxed mb-6">
              {t('language') === 'de'
                ? 'Unser erfahrenes Team legt großen Wert auf Präzision, Qualität und Kundenzufriedenheit. Ob privat oder gewerblich – wir realisieren Ihr Fliesenprojekt professionell und termingerecht.'
                : 'Our experienced team places great emphasis on precision, quality and customer satisfaction. Whether private or commercial - we realize your tile project professionally and on schedule.'}
            </p>
            <p className="text-lg leading-relaxed">
              {t('language') === 'de'
                ? 'Von der Beratung über die Materialauswahl bis zur finalen Ausführung begleiten wir Sie kompetent durch jeden Schritt Ihres Projekts.'
                : 'From consultation to material selection to final execution, we competently guide you through every step of your project.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div ref={contactTitle.ref} className={`scroll-fade-in ${contactTitle.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
              {t('contactTitle')}
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-xl">
              {t('contactSubtitle')}
            </p>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 scroll-scale ${contactTitle.isVisible ? 'visible' : ''}`}>
            {contactInfo.map((item, index) => (
              <Card
                key={index}
                className="p-6 hover-lift cursor-pointer border-2 hover:border-accent transition-colors"
                onClick={() => window.open(item.href, item.icon === Globe ? '_blank' : '_self')}
                style={{ transitionDelay: `${index * 100}ms` }}
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
      </section>

      <Footer />
    </div>
  );
};

export default Home;
