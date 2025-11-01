import { useLanguage } from '@/contexts/LanguageContext';
import { HeroTileAnimation } from '@/components/HeroTileAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.svg';
import tilesHero from '@/assets/tiles-hero.jpg';
import bathroomTiles from '@/assets/bathroom-tiles.jpg';
import kitchenTiles from '@/assets/kitchen-tiles.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroTileAnimation />
        
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
          
          <Link to="/services">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white shadow-glow animate-fade-in group"
            >
              {t('heroButton')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gradient">
            {t('servicesTitle')}
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            {t('servicesSubtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bathroom */}
            <div className="group hover-lift cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                <img 
                  src={bathroomTiles} 
                  alt={t('bathroom')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('bathroom')}</h3>
              <p className="text-muted-foreground">{t('bathroomDesc')}</p>
            </div>

            {/* Kitchen */}
            <div className="group hover-lift cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                <img 
                  src={kitchenTiles} 
                  alt={t('kitchen')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('kitchen')}</h3>
              <p className="text-muted-foreground">{t('kitchenDesc')}</p>
            </div>

            {/* Commercial */}
            <div className="group hover-lift cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                <img 
                  src={tilesHero} 
                  alt={t('commercial')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('commercial')}</h3>
              <p className="text-muted-foreground">{t('commercialDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
