import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import bathroomTiles from '@/assets/bathroom-tiles.jpg';
import kitchenTiles from '@/assets/kitchen-tiles.jpg';
import tilesHero from '@/assets/tiles-hero.jpg';
import { useState } from 'react';

export const Portfolio = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    {
      image: bathroomTiles,
      title: t('language') === 'de' ? 'Modernes Badezimmer' : 'Modern Bathroom',
      category: t('language') === 'de' ? 'Badezimmer' : 'Bathroom',
    },
    {
      image: kitchenTiles,
      title: t('language') === 'de' ? 'Stilvolle Küche' : 'Stylish Kitchen',
      category: t('language') === 'de' ? 'Küche' : 'Kitchen',
    },
    {
      image: tilesHero,
      title: t('language') === 'de' ? 'Gewerbeprojekt' : 'Commercial Project',
      category: t('language') === 'de' ? 'Gewerbe' : 'Commercial',
    },
    {
      image: bathroomTiles,
      title: t('language') === 'de' ? 'Luxusbad' : 'Luxury Bath',
      category: t('language') === 'de' ? 'Badezimmer' : 'Bathroom',
    },
    {
      image: kitchenTiles,
      title: t('language') === 'de' ? 'Designer-Küche' : 'Designer Kitchen',
      category: t('language') === 'de' ? 'Küche' : 'Kitchen',
    },
    {
      image: tilesHero,
      title: t('language') === 'de' ? 'Büroraum' : 'Office Space',
      category: t('language') === 'de' ? 'Gewerbe' : 'Commercial',
    },
  ];

  return (
    <>
      <section id="portfolio" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-16`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {t('language') === 'de' ? 'Unsere Projekte' : 'Our Projects'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('language') === 'de'
                ? 'Entdecken Sie einige unserer erfolgreich abgeschlossenen Projekte'
                : 'Discover some of our successfully completed projects'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const itemAnimation = useScrollAnimation(0.2);
              return (
                <div
                  key={index}
                  ref={itemAnimation.ref}
                  className={`scroll-scale ${itemAnimation.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer shadow-elegant hover:shadow-2xl transition-all duration-500"
                    onClick={() => setSelectedImage(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="text-accent text-sm font-semibold mb-2">{project.category}</span>
                      <h3 className="text-white text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Project preview" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
