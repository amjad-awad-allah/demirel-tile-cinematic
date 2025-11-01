import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import bathroomTiles from '@/assets/bathroom-tiles.jpg';
import kitchenTiles from '@/assets/kitchen-tiles.jpg';
import tilesHero from '@/assets/tiles-hero.jpg';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

export const Portfolio = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [visibleTiles, setVisibleTiles] = useState<boolean[]>([]);

  const projects = [
    {
      image: bathroomTiles,
      title: t('language') === 'de' ? 'Badezimmer Projekt, Berlin' : 'Bathroom Project, Berlin',
      category: t('language') === 'de' ? 'Badezimmer' : 'Bathroom',
      location: 'Berlin',
      description: t('language') === 'de' ? 'Moderne Badgestaltung mit hochwertigen Fliesen' : 'Modern bathroom design with high-quality tiles',
    },
    {
      image: kitchenTiles,
      title: t('language') === 'de' ? 'Küche Projekt, München' : 'Kitchen Project, Munich',
      category: t('language') === 'de' ? 'Küche' : 'Kitchen',
      location: 'München',
      description: t('language') === 'de' ? 'Stilvolle Küchengestaltung' : 'Stylish kitchen design',
    },
    {
      image: tilesHero,
      title: t('language') === 'de' ? 'Gewerbe Projekt, Hamburg' : 'Commercial Project, Hamburg',
      category: t('language') === 'de' ? 'Gewerbe' : 'Commercial',
      location: 'Hamburg',
      description: t('language') === 'de' ? 'Professionelle Fliesenverlegung' : 'Professional tile installation',
    },
    {
      image: bathroomTiles,
      title: t('language') === 'de' ? 'Luxusbad Projekt, Frankfurt' : 'Luxury Bath Project, Frankfurt',
      category: t('language') === 'de' ? 'Badezimmer' : 'Bathroom',
      location: 'Frankfurt',
      description: t('language') === 'de' ? 'Elegantes Luxusbad' : 'Elegant luxury bathroom',
    },
    {
      image: kitchenTiles,
      title: t('language') === 'de' ? 'Designer-Küche, Köln' : 'Designer Kitchen, Cologne',
      category: t('language') === 'de' ? 'Küche' : 'Kitchen',
      location: 'Köln',
      description: t('language') === 'de' ? 'Hochwertige Designküche' : 'High-end design kitchen',
    },
    {
      image: tilesHero,
      title: t('language') === 'de' ? 'Büroraum Projekt, Stuttgart' : 'Office Space Project, Stuttgart',
      category: t('language') === 'de' ? 'Gewerbe' : 'Commercial',
      location: 'Stuttgart',
      description: t('language') === 'de' ? 'Moderne Bürogestaltung' : 'Modern office design',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleTiles((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const tiles = document.querySelectorAll('[data-tile]');
    tiles.forEach((tile) => observer.observe(tile));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="portfolio" className="py-24" style={{ backgroundColor: '#F7F6F3' }}>
        <div className="container mx-auto px-4">
          <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-16`}>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4" style={{ color: '#1E3D59' }}>
              {t('language') === 'de' ? 'Unsere Projekte' : 'Our Projects'}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6F6F6F' }}>
              {t('language') === 'de'
                ? 'Entdecken Sie unsere Arbeiten – jedes Detail erzählt Qualität.'
                : 'Discover our work – every detail tells quality.'}
            </p>
          </div>

          {/* Laminate Floor Pattern Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-1">
              {/* Row 1 */}
              <div className="flex gap-1">
                <div
                  data-tile
                  data-index="0"
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-600 ${
                    visibleTiles[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    flex: '2',
                    aspectRatio: '3/2',
                    border: '2px solid #E0DED9',
                    borderRadius: '4px'
                  }}
                  onClick={() => setSelectedProject(projects[0])}
                >
                  <img
                    src={projects[0].image}
                    alt={projects[0].title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6"
                    style={{ backgroundColor: 'rgba(193,143,89,0.25)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: '#1E3D59' }}>
                      {projects[0].title}
                    </h3>
                  </div>
                </div>
                <div
                  data-tile
                  data-index="1"
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-600 ${
                    visibleTiles[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    flex: '1',
                    aspectRatio: '3/2',
                    border: '2px solid #E0DED9',
                    borderRadius: '4px'
                  }}
                  onClick={() => setSelectedProject(projects[1])}
                >
                  <img
                    src={projects[1].image}
                    alt={projects[1].title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6"
                    style={{ backgroundColor: 'rgba(193,143,89,0.25)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: '#1E3D59' }}>
                      {projects[1].title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-1" style={{ marginLeft: '15%' }}>
                <div
                  data-tile
                  data-index="2"
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-600 ${
                    visibleTiles[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    flex: '1',
                    aspectRatio: '3/2',
                    border: '2px solid #E0DED9',
                    borderRadius: '4px'
                  }}
                  onClick={() => setSelectedProject(projects[2])}
                >
                  <img
                    src={projects[2].image}
                    alt={projects[2].title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6"
                    style={{ backgroundColor: 'rgba(193,143,89,0.25)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: '#1E3D59' }}>
                      {projects[2].title}
                    </h3>
                  </div>
                </div>
                <div
                  data-tile
                  data-index="3"
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-600 ${
                    visibleTiles[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    flex: '2',
                    aspectRatio: '3/2',
                    border: '2px solid #E0DED9',
                    borderRadius: '4px'
                  }}
                  onClick={() => setSelectedProject(projects[3])}
                >
                  <img
                    src={projects[3].image}
                    alt={projects[3].title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6"
                    style={{ backgroundColor: 'rgba(193,143,89,0.25)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: '#1E3D59' }}>
                      {projects[3].title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex gap-1">
                <div
                  data-tile
                  data-index="4"
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-600 ${
                    visibleTiles[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    flex: '2',
                    aspectRatio: '3/2',
                    border: '2px solid #E0DED9',
                    borderRadius: '4px'
                  }}
                  onClick={() => setSelectedProject(projects[4])}
                >
                  <img
                    src={projects[4].image}
                    alt={projects[4].title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6"
                    style={{ backgroundColor: 'rgba(193,143,89,0.25)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: '#1E3D59' }}>
                      {projects[4].title}
                    </h3>
                  </div>
                </div>
                <div
                  data-tile
                  data-index="5"
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-600 ${
                    visibleTiles[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    flex: '1',
                    aspectRatio: '3/2',
                    border: '2px solid #E0DED9',
                    borderRadius: '4px'
                  }}
                  onClick={() => setSelectedProject(projects[5])}
                >
                  <img
                    src={projects[5].image}
                    alt={projects[5].title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6"
                    style={{ backgroundColor: 'rgba(193,143,89,0.25)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: '#1E3D59' }}>
                      {projects[5].title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-400">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold" style={{ color: '#1E3D59' }}>
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedProject?.image}
              alt={selectedProject?.title}
              className="w-full rounded-lg"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold px-3 py-1 rounded-full text-sm" 
                  style={{ backgroundColor: 'rgba(193,143,89,0.2)', color: '#1E3D59' }}>
                  {selectedProject?.category}
                </span>
                <span style={{ color: '#6F6F6F' }}>• {selectedProject?.location}</span>
              </div>
              <p className="text-base" style={{ color: '#6F6F6F' }}>
                {selectedProject?.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
