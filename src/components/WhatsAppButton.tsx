import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Phone number will be customized by user later
    const phoneNumber = ''; // Add phone number in format: 491234567890
    const message = encodeURIComponent('Hello! I would like to inquire about your tile services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 bg-[#25D366] hover:bg-[#20BD5C] text-white p-0 border-4 border-white"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={32} strokeWidth={2.5} />
    </Button>
  );
};
