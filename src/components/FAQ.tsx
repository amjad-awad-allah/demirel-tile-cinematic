import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.2);

  const faqs = t('language') === 'de' ? [
    {
      question: 'Wie lange dauert eine typische Fliesenverlegung?',
      answer: 'Die Dauer hängt von der Größe des Projekts ab. Ein durchschnittliches Badezimmer (6-8 m²) dauert etwa 3-5 Tage. Wir erstellen Ihnen gerne einen genauen Zeitplan.',
    },
    {
      question: 'Bieten Sie eine Garantie auf Ihre Arbeit?',
      answer: 'Ja, wir bieten eine umfassende Garantie auf alle unsere Arbeiten. Die genauen Bedingungen besprechen wir vor Projektbeginn mit Ihnen.',
    },
    {
      question: 'Muss ich die Fliesen selbst kaufen?',
      answer: 'Nein, wir beraten Sie bei der Auswahl und können die Fliesen für Sie beschaffen. Sie können aber auch eigene Materialien mitbringen.',
    },
    {
      question: 'Arbeiten Sie auch am Wochenende?',
      answer: 'Nach Absprache können wir auch Wochenendtermine vereinbaren, insbesondere bei dringenden Projekten.',
    },
    {
      question: 'Wie erfolgt die Abrechnung?',
      answer: 'Nach der kostenlosen Besichtigung erhalten Sie ein detailliertes Angebot. Die Zahlung erfolgt üblicherweise nach Fertigstellung und Ihrer Zufriedenheit.',
    },
  ] : [
    {
      question: 'How long does a typical tile installation take?',
      answer: 'The duration depends on the size of the project. An average bathroom (6-8 m²) takes about 3-5 days. We are happy to create a precise schedule for you.',
    },
    {
      question: 'Do you offer a warranty on your work?',
      answer: 'Yes, we offer a comprehensive warranty on all our work. We will discuss the exact conditions with you before the project starts.',
    },
    {
      question: 'Do I have to buy the tiles myself?',
      answer: 'No, we advise you on the selection and can procure the tiles for you. However, you can also bring your own materials.',
    },
    {
      question: 'Do you also work on weekends?',
      answer: 'By arrangement, we can also schedule weekend appointments, especially for urgent projects.',
    },
    {
      question: 'How does billing work?',
      answer: 'After the free inspection, you will receive a detailed quote. Payment is usually made after completion and your satisfaction.',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div ref={animation.ref} className={`scroll-fade-in ${animation.isVisible ? 'visible' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t('language') === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('language') === 'de'
              ? 'Antworten auf die wichtigsten Fragen'
              : 'Answers to the most important questions'}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
