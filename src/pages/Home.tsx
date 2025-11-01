import { useLanguage } from '@/contexts/LanguageContext';
import { Hero3DAnimation } from '@/components/Hero3DAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { WhyUs } from '@/components/WhyUs';
import { Portfolio } from '@/components/Portfolio';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { QuickQuote } from '@/components/QuickQuote';
import { MapSection } from '@/components/MapSection';
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
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        <Hero3DAnimation />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent-light))_0%,transparent_50%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-10"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-20">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-block p-6 rounded-3xl bg-card/80 backdrop-blur-sm shadow-elegant">
              <img 
                src={logo} 
                alt="Fliesen Demirel" 
                className="h-32 md:h-40 lg:h-48 w-auto mx-auto"
              />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            <span className="text-gradient-gold">{t('heroTitle')}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-foreground/80 animate-fade-in font-medium max-w-4xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          
          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl mb-12 text-muted-foreground animate-fade-in max-w-3xl mx-auto">
            {t('heroDescription')}
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-in">
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="bg-gradient-to-r from-accent to-[hsl(var(--accent-hover))] hover:shadow-glow text-white px-10 py-7 text-lg rounded-2xl group transition-all duration-500 hover:scale-105 shadow-elegant"
            >
              <span className="flex items-center font-semibold">
                {t('heroButton')}
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </span>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-in opacity-70">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>{t('language') === 'de' ? '20+ Jahre Erfahrung' : '20+ Years Experience'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>{t('language') === 'de' ? '100% Kundenzufriedenheit' : '100% Customer Satisfaction'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>{t('language') === 'de' ? 'Meisterbetrieb' : 'Master Craftsman'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <WhyUs />

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div ref={servicesTitle.ref} className={`scroll-fade-in ${servicesTitle.isVisible ? 'visible' : ''}`}>
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                {t('language') === 'de' ? 'UNSERE LEISTUNGEN' : 'OUR SERVICES'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gradient">
              {t('servicesTitle')}
            </h2>
            <p className="text-center text-muted-foreground mb-20 text-lg md:text-xl max-w-3xl mx-auto">
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
                    <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-card group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                      {t('language') === 'de' ? 'SPEZIALISIERT' : 'SPECIALIZED'}
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">{service.title}</h3>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <Portfolio />

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Section */}
      <section id="about" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div ref={aboutTitle.ref} className={`scroll-fade-in ${aboutTitle.isVisible ? 'visible' : ''}`}>
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                {t('language') === 'de' ? 'ÜBER UNS' : 'ABOUT US'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gradient">
              {t('aboutTitle')}
            </h2>
          </div>
          <div className={`scroll-scale ${aboutTitle.isVisible ? 'visible' : ''}`}>
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card space-y-8">
              <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
                {t('language') === 'de' 
                  ? 'Fliesen Demirel Meisterbetrieb ist Ihr verlässlicher Partner für hochwertige Fliesenarbeiten in Berlin und Umgebung. Mit über 20 Jahren Erfahrung vereinen wir traditionelles Handwerk mit modernen Techniken.'
                  : 'Fliesen Demirel Meisterbetrieb is your reliable partner for high-quality tile work in Berlin and surrounding areas. With over 20 years of experience, we combine traditional craftsmanship with modern techniques.'}
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                {t('language') === 'de'
                  ? 'Unser erfahrenes Team legt großen Wert auf Präzision, Qualität und Kundenzufriedenheit. Ob privat oder gewerblich – wir realisieren Ihr Fliesenprojekt professionell und termingerecht.'
                  : 'Our experienced team places great emphasis on precision, quality and customer satisfaction. Whether private or commercial - we realize your tile project professionally and on schedule.'}
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                {t('language') === 'de'
                  ? 'Von der Beratung über die Materialauswahl bis zur finalen Ausführung begleiten wir Sie kompetent durch jeden Schritt Ihres Projekts.'
                  : 'From consultation to material selection to final execution, we competently guide you through every step of your project.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote Section */}
      <QuickQuote />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div ref={contactTitle.ref} className={`scroll-fade-in ${contactTitle.isVisible ? 'visible' : ''}`}>
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                {t('language') === 'de' ? 'KONTAKT' : 'CONTACT'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gradient">
              {t('contactTitle')}
            </h2>
            <p className="text-center text-muted-foreground mb-20 text-lg md:text-xl max-w-2xl mx-auto">
              {t('contactSubtitle')}
            </p>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 scroll-scale ${contactTitle.isVisible ? 'visible' : ''}`}>
            {contactInfo.map((item, index) => (
              <Card
                key={index}
                className="p-8 hover-lift cursor-pointer border border-border hover:border-accent transition-all duration-300 bg-card rounded-2xl shadow-card hover:shadow-elegant group"
                onClick={() => window.open(item.href, item.icon === Globe ? '_blank' : '_self')}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="font-semibold text-lg text-foreground">{item.value}</div>
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

      {/* Map Section */}
      <MapSection />

      <Footer />
    </div>
  );
};

export default Home;
