import { useLanguage } from '@/contexts/LanguageContext';
import { Hero3DAnimation } from '@/components/Hero3DAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { WhyUs } from '@/components/WhyUs';
import { Portfolio } from '@/components/Portfolio';
import { Testimonials } from '@/components/Testimonials';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import logo from '@/assets/logo-no-slogan.svg';
import tilesHero from '@/assets/tiles-hero.jpg';
import bathroomTiles from '@/assets/bathroom-tiles.jpg';
import kitchenTiles from '@/assets/kitchen-tiles.jpg';
import iconOrange from '@/assets/icon-orange.svg';
import iconNavy from '@/assets/icon-navy.svg';
import iconGray from '@/assets/icon-gray.svg';

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
      icon: iconOrange,
    },
    {
      title: t('kitchen'),
      description: t('kitchenDesc'),
      image: kitchenTiles,
      icon: iconNavy,
    },
    {
      title: t('commercial'),
      description: t('commercialDesc'),
      image: tilesHero,
      icon: iconGray,
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
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
        <Hero3DAnimation />
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
            <img 
              src={logo} 
              alt="Fliesen Demirel" 
              className="h-32 sm:h-40 md:h-56 lg:h-72 w-auto mx-auto drop-shadow-2xl"
            />
          </div>
          
          {/* Semi-transparent overlay behind text with orange border */}
          <div className="relative">
            <div 
              className="absolute inset-0 -m-4 sm:-m-6 md:-m-8 rounded-2xl sm:rounded-3xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.87)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                borderTop: '2px solid #E8752B'
              }}
            ></div>
            
            <div className="relative px-2 sm:px-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 text-primary animate-fade-in drop-shadow-lg">
                {t('heroTitle')}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 text-primary/90 animate-fade-in drop-shadow-md max-w-3xl mx-auto">
                {t('heroSubtitle')}
              </p>
              
              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 text-primary/80 animate-fade-in drop-shadow-md max-w-2xl mx-auto">
                {t('heroDescription')}
              </p>
              
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="text-white animate-fade-in group transition-all duration-300 relative overflow-hidden border-0 hover:scale-105 hover:shadow-2xl text-sm sm:text-base px-6 sm:px-8"
                style={{
                  background: 'linear-gradient(90deg, #E8752B, #D66C28)',
                  boxShadow: '0 4px 14px rgba(232, 117, 43, 0.4)'
                }}
              >
                <span className="relative z-10 flex items-center">
                  {t('heroButton')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(90deg, #D66C28, #C85F22)',
                    boxShadow: '0 0 20px rgba(232, 117, 43, 0.6)'
                  }}
                ></span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <WhyUs />

      {/* Services Section */}
      <section id="services" className="py-24" style={{ backgroundColor: '#FAF9F7' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div ref={servicesTitle.ref} className={`text-center mb-16 scroll-fade-in ${servicesTitle.isVisible ? 'visible' : ''}`}>
            <div className="section-underline mx-auto"></div>
            <h2 className="section-title mb-4">
              {t('servicesTitle')}
            </h2>
            <p className="section-subtitle text-lg max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="space-y-0">
            {services.map((service, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const animation = useScrollAnimation(0.2);
              return (
                <div
                  key={index}
                  ref={animation.ref}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-0 items-stretch ${animation.isVisible ? 'visible' : ''}`}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F7F6F3'
                  }}
                >
                  <div 
                    className={`flex-1 ${
                      index % 2 === 0 ? 'animate-fade-up' : 'animate-slide-in-right'
                    } ${animation.isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '0.2s' }}
                  >
                    <div className="relative w-full h-full min-h-[400px]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div 
                    className={`flex-1 flex flex-col justify-center p-12 md:p-16 ${
                      index % 2 === 0 ? 'animate-slide-in-right' : 'animate-fade-up'
                    } ${animation.isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '0.4s' }}
                  >
                    <div className="max-w-lg">
                      <div className="flex items-center gap-4 mb-2">
                        <img 
                          src={service.icon} 
                          alt="" 
                          className="w-10 h-10 md:w-12 md:h-12"
                        />
                        <h3 
                          className="text-3xl md:text-4xl font-bold"
                          style={{ color: '#1E3D59' }}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <div 
                        className="w-10 h-0.5 mb-6"
                        style={{ backgroundColor: '#E8752B' }}
                      ></div>
                      <p 
                        className="text-lg leading-relaxed"
                        style={{ color: '#6F6F6F', lineHeight: '1.8' }}
                      >
                        {service.description}
                      </p>
                    </div>
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
      <section id="about" className="py-24 relative overflow-hidden">
        {/* Top-to-bottom gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF9F7 100%)',
          }}
        ></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div ref={aboutTitle.ref} className={`text-center mb-12 scroll-fade-in ${aboutTitle.isVisible ? 'visible' : ''}`}>
            <div className="section-underline mx-auto"></div>
            <h2 className="section-title mb-4">
              {t('aboutTitle')}
            </h2>
          </div>
          <div className={`scroll-scale ${aboutTitle.isVisible ? 'visible' : ''}`}>
            <p 
              className="text-xl leading-relaxed mb-6 font-semibold text-center"
              style={{ color: '#1E3D59', lineHeight: '1.8' }}
            >
              {t('language') === 'de' 
                ? 'Fliesen Demirel Meisterbetrieb ist Ihr verlässlicher Partner für hochwertige Fliesenarbeiten in Berlin und Umgebung.'
                : 'Fliesen Demirel Meisterbetrieb is your reliable partner for high-quality tile work in Berlin and surrounding areas.'}
            </p>
            <p 
              className="text-lg leading-relaxed mb-6 text-center"
              style={{ color: '#6F6F6F', lineHeight: '1.8' }}
            >
              {t('language') === 'de' 
                ? 'Mit über 20 Jahren Erfahrung vereinen wir traditionelles Handwerk mit modernen Techniken.'
                : 'With over 20 years of experience, we combine traditional craftsmanship with modern techniques.'}
            </p>
            <p 
              className="text-lg leading-relaxed mb-6 text-center"
              style={{ color: '#6F6F6F', lineHeight: '1.8' }}
            >
              {t('language') === 'de'
                ? 'Unser erfahrenes Team legt großen Wert auf Präzision, Qualität und Kundenzufriedenheit. Ob privat oder gewerblich – wir realisieren Ihr Fliesenprojekt professionell und termingerecht.'
                : 'Our experienced team places great emphasis on precision, quality and customer satisfaction. Whether private or commercial - we realize your tile project professionally and on schedule.'}
            </p>
            <p 
              className="text-lg leading-relaxed text-center"
              style={{ color: '#6F6F6F', lineHeight: '1.8' }}
            >
              {t('language') === 'de'
                ? 'Von der Beratung über die Materialauswahl bis zur finalen Ausführung begleiten wir Sie kompetent durch jeden Schritt Ihres Projekts.'
                : 'From consultation to material selection to final execution, we competently guide you through every step of your project.'}
            </p>
          </div>
        </div>
      </section>


      {/* Contact Section - Marble Tiling Theme */}
      <section id="contact" className="py-24 relative overflow-hidden marble-texture">
        {/* Gradient overlay for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(250, 249, 247, 0.92) 0%, rgba(243, 240, 236, 0.92) 100%)',
          }}
        ></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div ref={contactTitle.ref} className={`text-center mb-8 scroll-fade-in ${contactTitle.isVisible ? 'visible' : ''}`}>
            <div className="section-underline mx-auto"></div>
            <h2 className="section-title mb-3">
              {t('contactTitle')}
            </h2>
            <p className="section-subtitle text-xl mb-2">
              {t('language') === 'de' 
                ? 'Bereit, Ihren Raum zu verwandeln?'
                : 'Ready to transform your space?'}
            </p>
            <p 
              className="text-sm italic mt-4"
              style={{ color: '#999999' }}
            >
              {t('language') === 'de' 
                ? 'Wir freuen uns auf Ihr Projekt.'
                : 'We look forward to your project.'}
            </p>
          </div>

          {/* Contact Tile Cards */}
          <div className={`flex flex-wrap justify-center gap-6 mb-12 scroll-scale ${contactTitle.isVisible ? 'visible' : ''}`}>
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="contact-tile-card p-6 cursor-pointer tile-animate"
                onClick={() => window.open(item.href, '_self')}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="contact-icon-bg">
                    <item.icon 
                      className="w-5 h-5"
                      style={{ color: '#E8752B' }}
                    />
                  </div>
                  <div className="flex-1">
                    <div 
                      className="text-xs uppercase tracking-wider mb-1"
                      style={{ color: '#999999' }}
                    >
                      {item.label}
                    </div>
                    <div 
                      className="font-semibold text-sm"
                      style={{ color: '#1E3D59' }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="mt-8 text-center">
            <p 
              className="text-sm"
              style={{ color: '#6F6F6F' }}
            >
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
